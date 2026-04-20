'use client';

import { MdxProvider } from '@/components/MdxProvider';
import TypographyContent from './content.mdx';

export default function TypographyPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mdx-content">
        <MdxProvider>
          <TypographyContent />
        </MdxProvider>
      </div>
    </div>
  );
}
