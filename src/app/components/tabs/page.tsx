'use client';

import { MdxProvider } from '@/components/MdxProvider';
import TabsContent from './content.mdx';

export default function TabsPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Tabs</h1>
        <p className="text-lg text-neutral-600">
          Tabs organize content into separate views where only one view is visible at a time.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <TabsContent />
        </MdxProvider>
      </div>
    </div>
  );
}
