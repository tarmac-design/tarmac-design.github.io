'use client';

import { MdxProvider } from '@/components/MdxProvider';
import ToggleContent from './content.mdx';

export default function TogglePage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Toggle</h1>
        <p className="text-lg text-neutral-600">
          Toggles (switches) allow users to turn a setting on or off with immediate effect.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <ToggleContent />
        </MdxProvider>
      </div>
    </div>
  );
}
