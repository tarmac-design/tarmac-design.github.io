'use client';

import { StorybookEmbed } from '@/components/mdx';
import { storybookVariants, getIframeUrl, getStorybookUrl } from '@/components/storybookVariants';

export function StorybookVariantViewer({ slug }: { slug: string }) {
  const variants = storybookVariants[slug];
  if (!variants || variants.length === 0) return null;

  return (
    <div>
      {variants.map((v) => (
        <div key={v.id} style={{ marginBottom: 40 }}>
          <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 8, fontSize: 18 }}>{v.label}</h3>
          <StorybookEmbed
            url={getIframeUrl(v.id)}
            storybookUrl={getStorybookUrl(v.id)}
            height={360}
            title={v.label}
          />
        </div>
      ))}
    </div>
  );
}
