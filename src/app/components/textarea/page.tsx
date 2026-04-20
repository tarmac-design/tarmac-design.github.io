'use client';

import { MdxProvider } from '@/components/MdxProvider';
import TextareaContent from './content.mdx';

export default function TextareaPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Textarea</h1>
        <p className="text-lg text-neutral-600">
          Textareas allow users to enter multi-line text content.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <TextareaContent />
        </MdxProvider>
      </div>
    </div>
  );
}
