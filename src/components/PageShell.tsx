'use client';

import { MdxProvider } from '@/components/MdxProvider';

export function PageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        {description && (
          <p className="text-lg text-neutral-600">{description}</p>
        )}
      </div>
      <div className="mdx-content">
        <MdxProvider>{children}</MdxProvider>
      </div>
    </div>
  );
}
