'use client';

import { MdxProvider } from '@/components/MdxProvider';
import ModalContent from './content.mdx';

export default function ModalPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Modal</h1>
        <p className="text-lg text-neutral-600">
          Modals are dialog overlays that require user attention before returning to the main content.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <ModalContent />
        </MdxProvider>
      </div>
    </div>
  );
}
