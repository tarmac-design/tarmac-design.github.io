'use client';

import { MdxProvider } from '@/components/MdxProvider';
import ButtonContent from './content.mdx';

export default function ButtonPage() {
  return (
    <div className="ml-[var(--sidebar-width)] max-w-4xl px-10 py-12">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-3"
          style={{ color: 'var(--color-on-surface)' }}
        >
          Button
        </h1>
        <p
          className="text-lg"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
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
