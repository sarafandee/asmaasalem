const rateLimitMap = new Map<string, number[]>();

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW = 60 * 60 * 1000; // 1 hour

export function isRateLimited(
  ip: string,
  limit: number = DEFAULT_LIMIT,
  windowMs: number = DEFAULT_WINDOW
): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);
  rateLimitMap.set(ip, recent);
  if (recent.length >= limit) return true;
  recent.push(now);
  return false;
}

export function getClientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
