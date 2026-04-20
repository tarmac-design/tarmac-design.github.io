'use client';

import { MdxProvider } from '@/components/MdxProvider';
import InputContent from './content.mdx';

export default function InputPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Input</h1>
        <p className="text-lg text-neutral-600">
          Text inputs allow users to enter and edit single-line text data.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <InputContent />
        </MdxProvider>
      </div>
    </div>
  );
}
