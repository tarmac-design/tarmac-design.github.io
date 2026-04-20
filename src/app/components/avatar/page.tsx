'use client';

import { MdxProvider } from '@/components/MdxProvider';
import AvatarContent from './content.mdx';

export default function AvatarPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Avatar</h1>
        <p className="text-lg text-neutral-600">
          Avatars represent users or entities with images, initials, or icons.
        </p>
      </div>
      <div className="mdx-content">
        <MdxProvider>
          <AvatarContent />
        </MdxProvider>
      </div>
    </div>
  );
}
