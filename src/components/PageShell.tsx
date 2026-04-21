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
    <div className="ml-[var(--sidebar-width)] max-w-4xl px-10 py-12">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-3"
          style={{ color: 'var(--color-on-surface)' }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            {description}
          </p>
        )}
      </div>
      <div className="mdx-content">
        <MdxProvider>{children}</MdxProvider>
      </div>
    </div>
  );
}
