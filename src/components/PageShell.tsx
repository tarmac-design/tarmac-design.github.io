'use client';

import { MdxProvider } from '@/components/MdxProvider';
import { PageFooter } from '@/components/PageFooter';
import { TableOfContents } from '@/components/TableOfContents';

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
    <>
      <TableOfContents />
      <div className="max-w-3xl mx-auto px-6 sm:px-8 xl:mr-56 py-10 animate-fade-in">
        <div className="mb-8">
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
            style={{ color: 'var(--color-on-surface)' }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl"
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
      <PageFooter />
    </>
  );
}
