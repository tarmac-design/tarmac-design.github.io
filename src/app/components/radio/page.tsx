'use client';

import { MdxProvider } from '@/components/MdxProvider';
import RadioContent from './content.mdx';

export default function RadioPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Radio</h1>
        <p className="text-lg text-neutral-600">
          Radio buttons let users select exactly one option from a group of choices.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <RadioContent />
        </MdxProvider>
      </div>
    </div>
  );
}
