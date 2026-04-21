'use client';

import { MdxProvider } from '@/components/MdxProvider';
import { TableOfContents } from '@/components/TableOfContents';
import { PageFooter } from '@/components/PageFooter';

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
      <div className="ml-[calc(var(--sidebar-width)+32px)] mr-[240px] xl:mr-[280px] max-w-3xl px-8 py-10">
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
      <PageFooter />
      <TableOfContents />
    </>
  );
}
