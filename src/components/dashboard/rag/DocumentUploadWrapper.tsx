'use client';

import { useRouter } from 'next/navigation';
import { DocumentUpload } from './DocumentUpload';

interface DocumentUploadWrapperProps {
  labels: {
    dragDrop: string;
    browse: string;
    uploading: string;
    processing: string;
    maxSize: string;
    supportedTypes: string;
  };
}

export function DocumentUploadWrapper({ labels }: DocumentUploadWrapperProps) {
  const router = useRouter();

  return (
    <DocumentUpload
      labels={labels}
      onUploadComplete={() => router.refresh()}
    />
  );
}
