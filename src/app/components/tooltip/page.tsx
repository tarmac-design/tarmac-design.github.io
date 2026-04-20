'use client';

import { MdxProvider } from '@/components/MdxProvider';
import TooltipContent from './content.mdx';

export default function TooltipPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Tooltip</h1>
        <p className="text-lg text-neutral-600">
          Tooltips display brief, informative text when users hover over or focus on an element.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <TooltipContent />
        </MdxProvider>
      </div>
    </div>
  );
}
