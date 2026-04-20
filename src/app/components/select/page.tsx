'use client';

import { MdxProvider } from '@/components/MdxProvider';
import SelectContent from './content.mdx';

export default function SelectPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Select</h1>
        <p className="text-lg text-neutral-600">
          Select dropdowns let users choose one option from a collapsible list.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <SelectContent />
        </MdxProvider>
      </div>
    </div>
  );
}
