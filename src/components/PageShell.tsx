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
      <div className="content-area">
        {/* Title banner */}
        <div
          className="relative overflow-hidden rounded-2xl mx-8 mt-10 mb-8 px-8 py-10"
          style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 8%, var(--color-surface-container-low)), color-mix(in srgb, var(--color-secondary) 6%, var(--color-surface-container-low)))',
            border: '1px solid var(--color-outline)',
          }}
        >
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
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

        <div className="px-8 pb-10">
          <div className="max-w-3xl mx-auto">
            <div className="mdx-content">
              <MdxProvider>{children}</MdxProvider>
            </div>
          </div>
        </div>
      </div>
      <PageFooter />
    </>
  );
}
