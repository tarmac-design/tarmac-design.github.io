'use client';

import { MdxProvider } from '@/components/MdxProvider';
import ColorsContent from './content.mdx';

export default function ColorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mdx-content">
        <MdxProvider>
          <ColorsContent />
        </MdxProvider>
      </div>
    </div>
  );
}
