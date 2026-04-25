'use client';
import { useState, useEffect, useCallback } from 'react';
import { PageShell } from '@/components/PageShell';
import { Info, DoDont } from '@/components/mdx';

/* ─── Divider data from Figma ─── */
type DividerToken = { type: 'Line' | 'Dash'; size: string; px: number; placement: string; purpose: string };

const dividerTokens: DividerToken[] = [
  { type: 'Line', size: '0.5px', px: 0.5, placement: 'Lists, tables, menus, cards, inline content groups', purpose: 'Provides light structure without visual weight' },
  { type: 'Line', size: '1px', px: 1, placement: 'Section breaks, toolbars, navigation regions, page-level grouping', purpose: 'Defines stronger separation between content zones' },
  { type: 'Line', size: '1.5px', px: 1.5, placement: 'High-emphasis structural dividers', purpose: 'Strong visual separation for major sections' },
  { type: 'Dash', size: '0.5px', px: 0.5, placement: 'Lists, tables, inline content groups', purpose: 'Subtle dashed separation for lightweight grouping' },
  { type: 'Dash', size: '1px', px: 1, placement: 'Section breaks, toolbars, navigation regions', purpose: 'Dashed separation for content zones' },
  { type: 'Dash', size: '1.5px', px: 1.5, placement: 'High-emphasis structural dividers', purpose: 'Strong dashed separation for major sections' },
];

/* ─── Divider Popup ─── */
function DividerPopup({ items, index, onClose, onNav }: {
  items: DividerToken[]; index: number; onClose: () => void; onNav: (dir: -1 | 1) => void;
}) {
  const item = items[index];
  const [copied, setCopied] = useState(false);
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && index > 0) onNav(-1);
    if (e.key === 'ArrowRight' && index < items.length - 1) onNav(1);
  }, [onClose, onNav, index, items.length]);
  useEffect(() => { window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey); }, [handleKey]);

  const borderStyle = item.type === 'Dash' ? 'dashed' : 'solid';
  const cssValue = `${item.px}px ${borderStyle} var(--color-outline)`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {index > 0 && <button onClick={(e) => { e.stopPropagation(); onNav(-1); }} className="absolute left-4 sm:left-8 z-10 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>}
      {index < items.length - 1 && <button onClick={(e) => { e.stopPropagation(); onNav(1); }} className="absolute right-4 sm:right-8 z-10 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>}
      <div className="relative z-10 w-[90vw] max-w-md rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--color-outline)' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col items-center justify-center py-14 gap-6" style={{ background: 'var(--color-surface-container-low)' }}>
          {/* Horizontal preview */}
          <div className="w-64" style={{ borderTop: cssValue }} />
          {/* Vertical preview */}
          <div className="flex items-center gap-4">
            <div className="h-16" style={{ borderLeft: cssValue }} />
            <span className="text-[10px]" style={{ color: 'var(--color-on-surface-variant)' }}>vertical</span>
          </div>
        </div>
        <div className="p-5" style={{ background: 'var(--color-surface)' }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-lg font-semibold block" style={{ color: 'var(--color-on-surface)' }}>{item.type} · {item.size}</span>
              <span className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{item.placement}</span>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(cssValue); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium shrink-0" style={{ background: copied ? '#1BA86E' : 'var(--color-surface-variant)', color: copied ? '#fff' : 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
              {copied ? 'Copied!' : 'Copy CSS'}
            </button>
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>{item.purpose}</p>
          <div className="text-center mt-3"><span className="text-[11px] font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>{index + 1} / {items.length}</span></div>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.1)', color: 'var(--color-on-surface)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Tab: Examples ─── */
function ExamplesTab() {
  const [popup, setPopup] = useState<{ index: number } | null>(null);
  const [typeFilter, setTypeFilter] = useState<'All' | 'Line' | 'Dash'>('All');
  const filtered = typeFilter === 'All' ? dividerTokens : dividerTokens.filter(d => d.type === typeFilter);

  return (
    <div className="mdx-content">
      {popup && (
        <DividerPopup items={filtered} index={popup.index} onClose={() => setPopup(null)}
          onNav={(dir) => { const n = popup.index + dir; if (n >= 0 && n < filtered.length) setPopup({ index: n }); }} />
      )}

      <div className="flex gap-2 mb-6">
        {(['All', 'Line', 'Dash'] as const).map((t) => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: typeFilter === t ? 'var(--color-on-surface)' : 'transparent',
              color: typeFilter === t ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
              border: `1px solid ${typeFilter === t ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
            }}>{t}</button>
        ))}
      </div>

      <h2>Divider Types</h2>
      <p>2 styles (Line, Dash) × 3 sizes (0.5px, 1px, 1.5px). Click any to view details.</p>

      {/* Visual grid matching Figma layout */}
      <div className="rounded-xl border overflow-hidden mb-8" style={{ borderColor: 'var(--color-outline)' }}>
        <div className="grid grid-cols-4 py-3 px-4" style={{ background: 'var(--color-surface-container-low)', borderBottom: '1px solid var(--color-outline)' }}>
          <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>Type</span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>Size</span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>Preview</span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>Placement</span>
        </div>
        {filtered.map((d, i) => (
          <button key={`${d.type}-${d.size}`} onClick={() => setPopup({ index: i })}
            className="grid grid-cols-4 items-center py-5 px-4 w-full text-left transition-colors hover:bg-black/5"
            style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--color-outline)' : 'none' }}>
            <code className="text-xs px-2 py-1 rounded-md inline-block w-fit" style={{ background: 'var(--color-surface-variant)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
              {d.type}
            </code>
            <span className="text-sm font-mono" style={{ color: 'var(--color-on-surface)' }}>{d.size}</span>
            <div className="pr-4">
              <div style={{ borderTop: `${d.px}px ${d.type === 'Dash' ? 'dashed' : 'solid'} var(--color-on-surface-variant)` }} />
            </div>
            <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{d.placement}</span>
          </button>
        ))}
      </div>

      <h2>Orientation</h2>
      <p>Dividers work both horizontally and vertically.</p>
      <div className="flex gap-8 items-center p-6 rounded-xl border mb-6" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
        <div className="flex-1">
          <div className="text-xs mb-2 font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>Horizontal</div>
          <div className="space-y-4">
            <div style={{ borderTop: '0.5px solid var(--color-on-surface-variant)' }} />
            <div style={{ borderTop: '1px solid var(--color-on-surface-variant)' }} />
            <div style={{ borderTop: '1px dashed var(--color-on-surface-variant)' }} />
          </div>
        </div>
        <div className="flex gap-6 items-stretch h-24">
          <div className="text-xs font-medium self-start" style={{ color: 'var(--color-on-surface-variant)' }}>Vertical</div>
          <div style={{ borderLeft: '0.5px solid var(--color-on-surface-variant)' }} />
          <div style={{ borderLeft: '1px solid var(--color-on-surface-variant)' }} />
          <div style={{ borderLeft: '1px dashed var(--color-on-surface-variant)' }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Tab: Usage ─── */
function UsageTab() {
  return (
    <div className="mdx-content">
      <h2>Overview</h2>
      <Info>Dividers provide visual separation between related content. They are intentionally lightweight and unobtrusive — their purpose is to guide the eye, not dominate the interface.</Info>

      <h2>Principles</h2>
      <ul>
        <li><strong>Separation, not decoration</strong> — Dividers exist only when spacing alone cannot define structure. If hierarchy reads clearly without a line, prefer removing it</li>
        <li><strong>Subtle by default</strong> — Dividers use thin, low-contrast strokes so content remains the primary visual element</li>
        <li><strong>Hierarchy-aware</strong> — Dividers support levels of grouping (sections, subsections, inline content) without adding unnecessary complexity</li>
        <li><strong>Theme-consistent</strong> — Divider tone adjusts between light and dark themes while maintaining clear visibility</li>
      </ul>

      <h2>Accessibility</h2>
      <ul>
        <li>Dividers should maintain sufficient contrast with the background</li>
        <li>Avoid placing dividers too close to text — allow optical breathing room</li>
        <li>Do not rely on dividers as the only grouping signal — pair with spacing, headings, or layout</li>
        <li>Ensure dividers remain visible at zoom levels above 125%</li>
        <li>Dividers support accessibility by reinforcing structure, not signaling interaction</li>
      </ul>

      <h2>Do&apos;s &amp; Don&apos;ts</h2>
      <DoDont slug="dividers"
        doItems={[
          'Use 0.5px for subtle inline separation (lists, tables)',
          'Use 1px for section-level breaks',
          'Pair dividers with spacing for clear visual hierarchy',
          'Ensure dividers are visible in both light and dark modes',
        ]}
        dontItems={[
          'Use dividers when spacing alone provides enough separation',
          'Stack multiple dividers close together',
          'Use dividers as the only grouping signal',
          'Apply heavy dividers to lightweight content areas',
        ]}
      />
    </div>
  );
}

/* ─── Tab: Code ─── */
function CodeTab() {
  return (
    <div className="mdx-content">
      <h2>CSS</h2>
      <pre><code>{`/* Horizontal dividers */
.divider-subtle {
  border-top: 0.5px solid var(--color-outline);
}
.divider-default {
  border-top: 1px solid var(--color-outline);
}
.divider-strong {
  border-top: 1.5px solid var(--color-outline);
}

/* Dashed variants */
.divider-dashed {
  border-top: 1px dashed var(--color-outline);
}

/* Vertical divider */
.divider-vertical {
  border-left: 1px solid var(--color-outline);
  align-self: stretch;
}`}</code></pre>

      <h2>React Component</h2>
      <pre><code>{`function Divider({
  size = 1,
  type = 'solid',
  orientation = 'horizontal',
}: {
  size?: 0.5 | 1 | 1.5;
  type?: 'solid' | 'dashed';
  orientation?: 'horizontal' | 'vertical';
}) {
  const style = orientation === 'horizontal'
    ? { borderTop: \`\${size}px \${type} var(--color-outline)\` }
    : { borderLeft: \`\${size}px \${type} var(--color-outline)\`, alignSelf: 'stretch' as const };

  return <div style={style} role="separator" />;
}

// Usage
<Divider />
<Divider size={0.5} type="dashed" />
<Divider orientation="vertical" />`}</code></pre>

      <h2>Tailwind</h2>
      <pre><code>{`<!-- Horizontal -->
<hr class="border-t border-outline" />

<!-- Dashed -->
<hr class="border-t border-dashed border-outline" />

<!-- Vertical (in flex container) -->
<div class="border-l border-outline self-stretch" />`}</code></pre>
    </div>
  );
}

/* ─── Main Page ─── */
export default function DividersPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Changelog', content: (
      <div className="mdx-content py-4">
        <p style={{ color: 'var(--color-on-surface-variant)' }}>No changelog entries yet.</p>
      </div>
    )},
  ];

  return (
    <PageShell title="Dividers"
      description="TARMAC's divider system — 2 styles (Line, Dash) × 3 sizes (0.5px, 1px, 1.5px) for horizontal and vertical separation across layouts."
      tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
