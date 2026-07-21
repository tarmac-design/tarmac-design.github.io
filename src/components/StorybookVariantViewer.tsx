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

      {/* Variant previews — single column */}
      {variants.slice(1).map((v: StoryVariant) => (
        <div key={v.id} style={{ marginBottom: 24 }}>
          <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--color-outline)', background: '#fff' }}>
            <iframe
              src={`${STORYBOOK_BASE}/iframe.html?id=${v.id}&viewMode=story&shortcuts=false`}
              style={{ width: '100%', height: '300px', border: 'none', display: 'block' }}
              title={v.label}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
          <p style={{ marginTop: '6px', fontSize: '13px', fontWeight: 500, color: 'var(--color-on-surface-variant)' }}>{v.label}</p>
        </div>
      ))}

      {/* If only 1 variant (just playground), show it here */}
      {variants.length === 1 && (
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginBottom: '1.5rem', background: '#fff' }}>
          <iframe
            src={`${STORYBOOK_BASE}/iframe.html?id=${playgroundId}&viewMode=story&shortcuts=false`}
            style={{ width: '100%', height: '350px', border: 'none', display: 'block' }}
            title={`${slug} playground`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      )}

      {/* Platform links */}
      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-outline)' }}>
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
