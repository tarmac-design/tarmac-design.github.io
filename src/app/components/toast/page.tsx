'use client';

import { MdxProvider } from '@/components/MdxProvider';
import ToastContent from './content.mdx';

export default function ToastPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Toast</h1>
        <p className="text-lg text-neutral-600">
          Toasts provide brief, non-intrusive feedback messages about an action or system event.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <ToastContent />
        </MdxProvider>
      </div>
    </div>
  );
}
