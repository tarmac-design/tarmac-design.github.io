'use client';

import { MdxProvider } from '@/components/MdxProvider';
import IconographyContent from './content.mdx';

export default function IconographyPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mdx-content">
        <MdxProvider>
          <IconographyContent />
        </MdxProvider>
      </div>
    </div>
  );
}
