'use client';

import { MdxProvider } from '@/components/MdxProvider';
import OverviewContent from './content.mdx';

export default function OverviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mdx-content">
        <MdxProvider>
          <OverviewContent />
        </MdxProvider>
      </div>
    </div>
  );
}
