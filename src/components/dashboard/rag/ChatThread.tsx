'use client';

import { useState, useEffect, useRef, useMemo, type FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';
import { ChatMessage } from './ChatMessage';

interface InitialMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatThreadProps {
  sessionId: string;
  initialMessages: InitialMessage[];
  labels: {
    askQuestion: string;
    send: string;
    thinking: string;
    noMessages: string;
  };
}

export function ChatThread({ sessionId, initialMessages, labels }: ChatThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  const transport = useMemo(
    () => new TextStreamChatTransport({
      api: `/api/rag/chat/sessions/${sessionId}/messages`,
    }),
    [sessionId],
  );

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: initialMessages.map((m) => ({
      id: m.id,
      role: m.role,
      parts: [{ type: 'text' as const, text: m.content }],
    })),
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    await sendMessage({ text });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-warm-gray">{labels.noMessages}</p>
          </div>
        ) : (
          messages.map((m) => {
            const textContent = m.parts
              ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
              .map((p) => p.text)
              .join('') || '';
            return (
              <ChatMessage
                key={m.id}
                role={m.role as 'user' | 'assistant'}
                content={textContent}
              />
            );
          })
        )}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-cream px-4 py-3 text-sm text-warm-gray">
              <span className="inline-flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-sand p-4">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={labels.askQuestion}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-sand bg-white px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-[var(--color-accent)] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? labels.thinking : labels.send}
          </button>
        </div>
      </form>
    </div>
  );
}
