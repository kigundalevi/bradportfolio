'use client';

import { Download } from 'lucide-react';

interface DownloadProps {
  className?: string;
}

export function Download({ className }: DownloadProps) {
  return <Download className={className} />;
}