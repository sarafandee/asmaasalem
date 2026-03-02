import { NextRequest, NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';
import { eq, asc } from 'drizzle-orm';
import { streamText, generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { db } from '@/lib/db';
import { chatSessions, chatMessages } from '@/lib/db/schema';
import { getSessionUser } from '@/lib/auth';
import { retrieveChunks } from '@/lib/rag/retrieval';

// Lazy init to avoid capturing undefined env vars at build time
function getOpenRouter() {
  return createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });
}

const SYSTEM_PROMPT = `You are a knowledgeable assistant helping analyze documents from a personal knowledge base. Your role is to answer questions based on the provided document excerpts.

Rules:
- Base your answers on the provided document context
- Always cite which document and page number your answer comes from using [Document: "name", Page: N] format
- If the answer is not found in the provided context, say so clearly
- Respond in the same language the user writes in (Arabic or English)
- Be thorough but concise
- When referencing visual content (diagrams, charts), describe what the visual shows`;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId } = await params;
    const session = db.select().from(chatSessions).where(eq(chatSessions.id, sessionId)).get();

    if (!session) {
      return NextResponse.json({ error: 'Session not found.' }, { status: 404 });
    }

    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required.' }, { status: 400 });
    }

    const latestUserMessage = messages[messages.length - 1];
    if (latestUserMessage.role !== 'user') {
      return NextResponse.json({ error: 'Last message must be from user.' }, { status: 400 });
    }

    // Extract text from either content (curl/v5) or parts (AI SDK v6) format
    const userText: string =
      latestUserMessage.content ||
      latestUserMessage.parts
        ?.filter((p: { type: string }) => p.type === 'text')
        .map((p: { text: string }) => p.text)
        .join('') ||
      '';

    if (!userText.trim()) {
      return NextResponse.json({ error: 'Empty message.' }, { status: 400 });
    }

    // Save user message
    db.insert(chatMessages).values({
      id: createId(),
      sessionId,
      role: 'user',
      content: userText,
    }).run();

    // Retrieve relevant chunks
    console.log('[RAG Chat] Retrieving chunks for:', userText.slice(0, 100));
    const chunks = await retrieveChunks(userText);
    console.log('[RAG Chat] Retrieved', chunks.length, 'chunks');

    // Build context block from retrieved chunks
    const contextBlock = chunks.length > 0
      ? chunks.map((chunk, i) =>
          `[Source ${i + 1}: "${chunk.documentName}" - Page ${chunk.pageNumber ?? 'N/A'}${chunk.sectionHeader ? ` - ${chunk.sectionHeader}` : ''}]\n${chunk.content}`
        ).join('\n\n---\n\n')
      : 'No relevant document excerpts found for this query.';

    // Build messages for the model
    // Include previous messages for conversation context (last 10)
    const previousMessages = db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(asc(chatMessages.createdAt))
      .all();

    const conversationHistory = previousMessages.slice(-10).map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    // Replace last user message with augmented version
    const augmentedMessages = [
      ...conversationHistory.slice(0, -1),
      {
        role: 'user' as const,
        content: `Context from documents:\n\n${contextBlock}\n\n---\n\nQuestion: ${userText}`,
      },
    ];

    // Auto-generate title on first message
    const messageCount = previousMessages.filter((m) => m.role === 'user').length;
    if (messageCount <= 1) {
      generateText({
        model: getOpenRouter()('anthropic/claude-sonnet-4'),
        prompt: `Generate a short title (max 6 words, no quotes) for a chat session that starts with this question: "${userText}"`,
        maxOutputTokens: 30,
      }).then((titleResult) => {
        db.update(chatSessions)
          .set({ title: titleResult.text.trim(), updatedAt: new Date() })
          .where(eq(chatSessions.id, sessionId))
          .run();
      }).catch((err) => {
        console.error('[RAG Chat] Title generation failed:', err);
      });
    }

    // Update session timestamp
    db.update(chatSessions)
      .set({ updatedAt: new Date() })
      .where(eq(chatSessions.id, sessionId))
      .run();

    // Stream the response
    console.log('[RAG Chat] Starting streamText with', augmentedMessages.length, 'messages');
    const provider = getOpenRouter();
    const result = streamText({
      model: provider('anthropic/claude-sonnet-4'),
      system: SYSTEM_PROMPT,
      messages: augmentedMessages,
      maxOutputTokens: 2048,
      onError: ({ error }) => {
        console.error('[RAG Chat] Stream error:', error);
      },
      onFinish: async ({ text }) => {
        console.log('[RAG Chat] Stream finished, text length:', text?.length ?? 0);
        // Save assistant message
        db.insert(chatMessages).values({
          id: createId(),
          sessionId,
          role: 'assistant',
          content: text,
          sourceChunkIds: JSON.stringify(chunks.map((c) => c.id)),
        }).run();
      },
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error('[RAG Chat] Route error:', err);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
