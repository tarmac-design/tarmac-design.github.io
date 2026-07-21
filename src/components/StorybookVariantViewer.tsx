'use client';

import { storybookVariants, type StoryVariant } from '@/components/storybookVariants';

const STORYBOOK_BASE = 'https://tarmac-storybook.delhivery.com/storybook/sb';

export function StorybookVariantViewer({ slug }: { slug: string }) {
  const variants = storybookVariants[slug];
  if (!variants || variants.length === 0) return null;

  const playgroundId = variants[0]?.id || '';

  return (
    <div>
      <h2>Playground</h2>

      {/* Main interactive playground */}
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginBottom: '1.5rem', background: '#fff' }}>
        <iframe
          src={`${STORYBOOK_BASE}/iframe.html?id=${playgroundId}&viewMode=story&shortcuts=false`}
          style={{ width: '100%', height: '400px', border: 'none', display: 'block' }}
          title={`${slug} playground`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>

      {/* Platform links */}
      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-outline)' }}>
        <p style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', marginBottom: '8px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Available on</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { label: 'React', href: `${STORYBOOK_BASE}/index.html?path=/story/${playgroundId}` },
            { label: 'Angular', href: '#' },
            { label: 'Android', href: '#' },
            { label: 'iOS', href: '#' },
          ].map((p) => (
            <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
              style={{ padding: '3px 10px', fontSize: '11px', fontWeight: 500, borderRadius: '6px', border: '1px solid var(--color-outline)', color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>
              {p.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
