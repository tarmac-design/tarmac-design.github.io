'use client';

import { MdxProvider } from '@/components/MdxProvider';
import SpacingContent from './content.mdx';

export default function SpacingPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mdx-content">
        <MdxProvider>
          <SpacingContent />
        </MdxProvider>
      </div>
    </div>
  );
}
