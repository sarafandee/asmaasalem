'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import clsx from 'clsx';

interface ChatSession {
  id: string;
  title: string;
  updatedAt: string;
}

interface ChatSidebarProps {
  locale: string;
  sessions: ChatSession[];
  labels: {
    newChat: string;
    chatSessions: string;
    noChatSessions: string;
    deleteSession: string;
    confirmDeleteSession: string;
    documents: string;
  };
}

export function ChatSidebar({ locale, sessions, labels }: ChatSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [items, setItems] = useState(sessions);

  const handleNewChat = async () => {
    const res = await fetch('/api/rag/chat/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New Chat' }),
    });

    if (res.ok) {
      const session = await res.json();
      setItems((prev) => [session, ...prev]);
      router.push(`/${locale}/dashboard/knowledge/chat/${session.id}`);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(labels.confirmDeleteSession)) return;

    await fetch(`/api/rag/chat/sessions/${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((s) => s.id !== id));

    if (pathname.includes(id)) {
      router.push(`/${locale}/dashboard/knowledge/chat`);
    }
  };

  return (
    <div className="flex h-full w-64 flex-col border-e border-sand bg-cream/50">
      <div className="border-b border-sand p-3">
        <button
          onClick={handleNewChat}
          className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          + {labels.newChat}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {items.length === 0 ? (
          <p className="p-3 text-center text-xs text-warm-gray">
            {labels.noChatSessions}
          </p>
        ) : (
          <ul className="space-y-1">
            {items.map((session) => {
              const isActive = pathname.includes(session.id);
              return (
                <li key={session.id}>
                  <Link
                    href={`/${locale}/dashboard/knowledge/chat/${session.id}`}
                    className={clsx(
                      'group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                        : 'text-warm-gray hover:bg-sand hover:text-charcoal',
                    )}
                  >
                    <span className="truncate">{session.title}</span>
                    <button
                      onClick={(e) => handleDelete(e, session.id)}
                      className="hidden shrink-0 text-xs text-red-400 hover:text-red-600 group-hover:inline"
                      title={labels.deleteSession}
                    >
                      &#x2715;
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-sand p-3">
        <Link
          href={`/${locale}/dashboard/knowledge`}
          className="flex items-center gap-2 text-sm text-warm-gray transition-colors hover:text-charcoal"
        >
          &#8592; {labels.documents}
        </Link>
      </div>
    </div>
  );
}
