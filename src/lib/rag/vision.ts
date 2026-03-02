import OpenAI from 'openai';

const MODEL = 'anthropic/claude-sonnet-4';

let _client: OpenAI | null = null;
function getClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    });
  }
  return _client;
}

/**
 * Send a page image to Claude Vision and get a rich description
 * of all visual content (diagrams, charts, tables, illustrations).
 */
export async function describePageVisual(
  imageBuffer: Buffer,
  pageNumber: number,
): Promise<string> {
  const base64 = imageBuffer.toString('base64');
  const mimeType = 'image/png';

  const response = await getClient().chat.completions.create({
    model: MODEL,
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: `data:${mimeType};base64,${base64}`,
            },
          },
          {
            type: 'text',
            text: `This is page ${pageNumber} of a document. Describe all visual content on this page in detail, including any diagrams, charts, tables, color wheels, flowcharts, or illustrations. Include all text visible in the image. Be thorough and precise — this description will be used for semantic search.`,
          },
        ],
      },
    ],
  });

  return response.choices[0]?.message?.content || '';
}

/**
 * Heuristic: determine if a page likely has important visual content
 * that text extraction alone would miss.
 */
export function isVisualHeavyPage(pageText: string): boolean {
  const textLength = pageText.trim().length;

  // Very little text likely means the page is mostly visual
  if (textLength < 100) return true;

  // Check for visual-related keywords
  const visualKeywords = [
    'figure', 'diagram', 'chart', 'table', 'illustration',
    'graph', 'image', 'color wheel', 'flowchart', 'schema',
    'شكل', 'رسم', 'جدول', 'مخطط', 'صورة', // Arabic equivalents
  ];

  const lowerText = pageText.toLowerCase();
  return visualKeywords.some((kw) => lowerText.includes(kw));
}
