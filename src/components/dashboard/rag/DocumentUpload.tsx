'use client';

import { useState, useCallback } from 'react';
import clsx from 'clsx';

interface DocumentUploadProps {
  labels: {
    dragDrop: string;
    browse: string;
    uploading: string;
    processing: string;
    maxSize: string;
    supportedTypes: string;
  };
  onUploadComplete: () => void;
}

export function DocumentUpload({ labels, onUploadComplete }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback(async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      // Upload file
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/rag/documents', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        const data = await uploadRes.json();
        throw new Error(data.error || 'Upload failed');
      }

      const doc = await uploadRes.json();
      setUploading(false);
      setProcessing(true);

      // Trigger processing
      const processRes = await fetch(`/api/rag/documents/${doc.id}/process`, {
        method: 'POST',
      });

      if (!processRes.ok) {
        const data = await processRes.json();
        throw new Error(data.error || 'Processing failed');
      }

      setProcessing(false);
      onUploadComplete();
    } catch (err) {
      setUploading(false);
      setProcessing(false);
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  }, [onUploadComplete]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = '';
  }, [handleUpload]);

  const isActive = uploading || processing;

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={clsx(
          'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors',
          isDragging
            ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
            : 'border-sand bg-white hover:border-[var(--color-accent)]/40',
          isActive && 'pointer-events-none opacity-60',
        )}
      >
        {isActive ? (
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-sand border-t-[var(--color-accent)]" />
            <p className="text-sm font-medium text-charcoal">
              {uploading ? labels.uploading : labels.processing}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-3 text-3xl text-warm-gray">&#8593;</div>
            <p className="text-sm font-medium text-charcoal">{labels.dragDrop}</p>
            <label className="mt-3 cursor-pointer rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
              {labels.browse}
              <input
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            <p className="mt-3 text-xs text-warm-gray">
              {labels.supportedTypes} &middot; {labels.maxSize}
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
