import clsx from 'clsx';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={clsx(
        'flex',
        role === 'user' ? 'justify-end' : 'justify-start',
      )}
    >
      <div
        className={clsx(
          'max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          role === 'user'
            ? 'bg-[var(--color-accent)] text-white'
            : 'bg-cream text-charcoal',
        )}
      >
        <div className="whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );
}
