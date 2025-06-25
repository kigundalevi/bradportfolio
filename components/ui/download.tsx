'use client';

import { Download as DownloadIcon } from 'lucide-react';

interface DownloadProps {
  className?: string;
}

export function Download({ className }: DownloadProps) {
  return <DownloadIcon className={className} />;
}