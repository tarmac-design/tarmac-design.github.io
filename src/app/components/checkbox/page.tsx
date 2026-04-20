'use client';

import { MdxProvider } from '@/components/MdxProvider';
import CheckboxContent from './content.mdx';

export default function CheckboxPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Checkbox</h1>
        <p className="text-lg text-neutral-600">
          Checkboxes allow users to select one or more options from a set of choices.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <CheckboxContent />
        </MdxProvider>
      </div>
    </div>
  );
}
