'use client';

import { MdxProvider } from '@/components/MdxProvider';
import BadgeContent from './content.mdx';

export default function BadgePage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Badge</h1>
        <p className="text-lg text-neutral-600">
          Badges are small status indicators used to label, categorize, or show counts.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <BadgeContent />
        </MdxProvider>
      </div>
    </div>
  );
}
