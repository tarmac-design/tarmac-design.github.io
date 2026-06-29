'use client';

import { useState } from 'react';
import { StorybookEmbed } from '@/components/mdx';
import { storybookVariants, getIframeUrl, getStorybookUrl, type Framework } from '@/components/storybookVariants';

export function StorybookVariantViewer({ slug }: { slug: string }) {
  const [framework, setFramework] = useState<Framework>('react');
  const variants = storybookVariants[slug];
  if (!variants || variants.length === 0) return null;

  return (
    <div>
      {/* Framework Tabs */}
      <div className="flex gap-0 mb-6" style={{ borderBottom: '1px solid var(--color-outline)' }}>
        <button
          onClick={() => setFramework('react')}
          className="px-4 py-2 text-sm font-medium transition-colors"
          style={{
            color: framework === 'react' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
            borderBottom: framework === 'react' ? '2px solid var(--color-primary)' : '2px solid transparent',
            background: 'none',
            border: 'none',
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid',
            borderBottomColor: framework === 'react' ? 'var(--color-primary)' : 'transparent',
            cursor: 'pointer',
          }}
        >
          React
        </button>
        <button
          onClick={() => setFramework('angular')}
          className="px-4 py-2 text-sm font-medium transition-colors"
          style={{
            color: framework === 'angular' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
            background: 'none',
            border: 'none',
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid',
            borderBottomColor: framework === 'angular' ? 'var(--color-primary)' : 'transparent',
            cursor: 'pointer',
          }}
        >
          Angular
        </button>
      </div>

      {/* Variant Embeds */}
      {variants.map((v) => (
        <div key={`${framework}-${v.id}`} style={{ marginBottom: 40 }}>
          <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 8, fontSize: 18 }}>{v.label}</h3>
          <StorybookEmbed
            url={getIframeUrl(v.id, framework)}
            storybookUrl={getStorybookUrl(v.id, framework)}
            height={360}
            title={v.label}
          />
        </div>
      ))}
    </div>
  );
}
