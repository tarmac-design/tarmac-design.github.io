'use client';

import { useState } from 'react';
import { StorybookEmbed } from '@/components/mdx';
import { storybookVariants, getIframeUrl, getStorybookUrl } from '@/components/storybookVariants';

/**
 * Renders all Storybook story variants for a component.
 * Shows a dropdown to select which variant to view, plus an "All" option.
 */
export function StorybookVariantViewer({ slug }: { slug: string }) {
  const variants = storybookVariants[slug];
  const [selected, setSelected] = useState(0);

  if (!variants || variants.length === 0) return null;

  // If only 1 variant, just show it directly
  if (variants.length === 1) {
    return (
      <StorybookEmbed
        url={getIframeUrl(variants[0].id)}
        storybookUrl={getStorybookUrl(variants[0].id)}
        height={420}
        title={variants[0].label}
      />
    );
  }

  const selectStyle: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: 8,
    fontSize: 13,
    border: '1px solid var(--color-outline)',
    background: 'var(--color-surface)',
    color: 'var(--color-on-surface)',
    cursor: 'pointer',
    fontWeight: 500,
  };

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Variant selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)' }}>Variant:</span>
        <select
          value={selected}
          onChange={e => setSelected(Number(e.target.value))}
          style={selectStyle}
        >
          {variants.map((v, i) => (
            <option key={v.id} value={i}>{v.label}</option>
          ))}
        </select>
        {/* Quick variant pills */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {variants.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setSelected(i)}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                border: selected === i ? 'none' : '1px solid var(--color-outline)',
                background: selected === i ? 'var(--color-primary)' : 'transparent',
                color: selected === i ? '#fff' : 'var(--color-on-surface-variant)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Storybook embed for selected variant */}
      <StorybookEmbed
        url={getIframeUrl(variants[selected].id)}
        storybookUrl={getStorybookUrl(variants[selected].id)}
        height={420}
        title={variants[selected].label}
      />
    </div>
  );
}
