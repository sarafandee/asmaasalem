'use client';

import { useState } from 'react';
import { DocumentStatusBadge } from './DocumentStatusBadge';

interface Document {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  status: string;
  pageCount: number | null;
  chunkCount: number | null;
  error: string | null;
  createdAt: string;
}

interface DocumentListProps {
  initialDocuments: Document[];
  labels: {
    fileName: string;
    fileSize: string;
    pages: string;
    chunks: string;
    status: string;
    uploadedAt: string;
    delete: string;
    reprocess: string;
    noDocuments: string;
    confirmDelete: string;
    pending: string;
    processing: string;
    completed: string;
    failed: string;
  };
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const statusLabelKey: Record<string, keyof DocumentListProps['labels']> = {
  pending: 'pending',
  processing: 'processing',
  completed: 'completed',
  failed: 'failed',
};

export function DocumentList({ initialDocuments, labels }: DocumentListProps) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [loading, setLoading] = useState<string | null>(null);

  const refreshDocuments = async () => {
    const res = await fetch('/api/rag/documents');
    if (res.ok) {
      setDocuments(await res.json());
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(labels.confirmDelete)) return;
    setLoading(id);
    try {
      await fetch(`/api/rag/documents/${id}`, { method: 'DELETE' });
      await refreshDocuments();
    } finally {
      setLoading(null);
    }
  };

  const handleReprocess = async (id: string) => {
    setLoading(id);
    try {
      await fetch(`/api/rag/documents/${id}/reprocess`, { method: 'POST' });
      await refreshDocuments();
    } finally {
      setLoading(null);
    }
  };

  if (documents.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-[var(--shadow-sm)]">
        <p className="text-warm-gray">{labels.noDocuments}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-sm)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-sand bg-cream/50">
            <th className="px-4 py-3 text-start font-medium text-warm-gray">{labels.fileName}</th>
            <th className="px-4 py-3 text-start font-medium text-warm-gray">{labels.fileSize}</th>
            <th className="px-4 py-3 text-start font-medium text-warm-gray">{labels.pages}</th>
            <th className="px-4 py-3 text-start font-medium text-warm-gray">{labels.chunks}</th>
            <th className="px-4 py-3 text-start font-medium text-warm-gray">{labels.status}</th>
            <th className="px-4 py-3 text-start font-medium text-warm-gray">{labels.uploadedAt}</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-b border-sand/50 last:border-0">
              <td className="px-4 py-3 font-medium text-charcoal">
                <div className="flex items-center gap-2">
                  <span className="text-base text-warm-gray">
                    {doc.fileType === 'pdf' ? '\u{1F4C4}' : '\u{1F4DD}'}
                  </span>
                  <span className="truncate max-w-48">{doc.fileName}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-warm-gray">{formatSize(doc.fileSize)}</td>
              <td className="px-4 py-3 text-warm-gray">{doc.pageCount ?? '—'}</td>
              <td className="px-4 py-3 text-warm-gray">{doc.chunkCount ?? '—'}</td>
              <td className="px-4 py-3">
                <DocumentStatusBadge
                  status={doc.status}
                  label={labels[statusLabelKey[doc.status] || 'pending']}
                />
                {doc.error && (
                  <p className="mt-1 text-xs text-red-500 truncate max-w-32" title={doc.error}>
                    {doc.error}
                  </p>
                )}
              </td>
              <td className="px-4 py-3 text-warm-gray">{formatDate(doc.createdAt)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {(doc.status === 'completed' || doc.status === 'failed') && (
                    <button
                      onClick={() => handleReprocess(doc.id)}
                      disabled={loading === doc.id}
                      className="text-xs text-[var(--color-accent)] hover:underline disabled:opacity-50"
                    >
                      {labels.reprocess}
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(doc.id)}
                    disabled={loading === doc.id}
                    className="text-xs text-red-500 hover:underline disabled:opacity-50"
                  >
                    {labels.delete}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
