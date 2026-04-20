'use client';

import { MdxProvider } from '@/components/MdxProvider';
import ButtonContent from './content.mdx';

export default function ButtonPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Button</h1>
        <p className="text-lg text-neutral-600">
          Buttons trigger actions and enable user interactions throughout the interface.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <ButtonContent />
        </MdxProvider>
      </div>
    </div>
  );
}
