'use client';
import { useState, useEffect, useCallback } from 'react';
import { PageShell } from '@/components/PageShell';
import { Info, DoDont } from '@/components/mdx';

/* ─── Radius data from Figma ─── */
type RadiusToken = { size: string; token: string; value: string; px: number; purpose: string };

const radiusScale: RadiusToken[] = [
  { size: 'minus', token: 'radius.none', value: '0px', px: 0, purpose: 'Full sharp ends' },
  { size: 'small', token: 'radius.small', value: '2px', px: 2, purpose: 'Small detail elements: badges, checkboxes, status indicators, keyboard hints' },
  { size: 'default', token: 'radius.default', value: '4px', px: 4, purpose: 'Labels, tags, timestamps, tooltips, compact buttons, small imagery' },
  { size: 'medium', token: 'radius.medium', value: '8px', px: 8, purpose: 'Buttons, inputs, selects, navigation items, cards, panels, dropdown menus, floating UI' },
  { size: 'large', token: 'radius.large', value: '12px', px: 12, purpose: 'Large layout containers: modals, tables, dashboards, in-page sections' },
  { size: 'xlarge', token: 'radius.xlarge', value: '16px', px: 16, purpose: 'Rich media containers & immersive content' },
  { size: 'max', token: 'radius.max', value: '999px', px: 999, purpose: 'Fully circular elements: avatars, user tokens, reaction icons' },
];

/* ─── Visual radius preview ─── */
function RadiusPreview({ token, px, onClick }: { token: string; px: number; onClick?: () => void }) {
  const r = px === 999 ? '999px' : `${px}px`;
  return (
    <button className="flex flex-col items-center gap-2 cursor-pointer group" onClick={onClick}>
      <div
        className="w-24 h-14 border-2 transition-all group-hover:scale-110 group-hover:shadow-lg"
        style={{ borderRadius: r, borderColor: 'var(--color-primary)', background: 'var(--color-primary)', opacity: 0.12 }}
      />
      <code className="text-[10px]" style={{ color: 'var(--color-on-surface-variant)' }}>{token}</code>
      <span className="text-[10px] font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>{px === 999 ? '999px' : `${px}px`}</span>
    </button>
  );
}

/* ─── Radius Popup ─── */
function RadiusPopup({ items, index, onClose, onNav }: {
  items: RadiusToken[]; index: number; onClose: () => void; onNav: (dir: -1 | 1) => void;
}) {
  const item = items[index];
  const r = item.px === 999 ? '999px' : `${item.px}px`;
  const [copied, setCopied] = useState(false);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && index > 0) onNav(-1);
    if (e.key === 'ArrowRight' && index < items.length - 1) onNav(1);
  }, [onClose, onNav, index, items.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {index > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onNav(-1); }}
          className="absolute left-4 sm:left-8 z-10 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      {index < items.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNav(1); }}
          className="absolute right-4 sm:right-8 z-10 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}
      <div className="relative z-10 w-[90vw] max-w-md rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--color-outline)' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center py-12" style={{ background: 'var(--color-surface-container-low)' }}>
          <div className="w-48 h-28 border-2" style={{
            borderRadius: r,
            background: 'color-mix(in srgb, var(--color-primary) 55%, transparent)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 0 12px 3px rgba(255,255,255,0.08), 0 0 4px 1px rgba(255,255,255,0.05)',
          }} />
        </div>
        <div className="p-5" style={{ background: 'var(--color-surface)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <code className="text-lg font-semibold block" style={{ color: 'var(--color-on-surface)' }}>{item.token}</code>
              <span className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{item.value} · {item.size}</span>
            </div>
            <button onClick={handleCopy} className="px-3 py-1.5 rounded-lg text-xs font-medium shrink-0"
              style={{ background: copied ? '#1BA86E' : 'var(--color-surface-variant)', color: copied ? '#fff' : 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
              {copied ? 'Copied!' : 'Copy Token'}
            </button>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{item.purpose}</p>
          <div className="flex gap-3 items-end mt-4 pt-3 border-t" style={{ borderColor: 'var(--color-outline)' }}>
            {[24, 40, 64, 96].map(w => (
              <div key={w} style={{
                width: w, height: w * 0.6, borderRadius: r,
                background: 'color-mix(in srgb, var(--color-primary) 55%, transparent)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 0 8px 2px rgba(255,255,255,0.06)',
              }} />
            ))}
          </div>
          <div className="text-center mt-3">
            <span className="text-[11px] font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>{index + 1} / {items.length}</span>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.1)', color: 'var(--color-on-surface)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Tab: Examples ─── */
function ExamplesTab() {
  const [popup, setPopup] = useState<{ index: number } | null>(null);

  return (
    <div className="mdx-content">
      {popup && (
        <RadiusPopup items={radiusScale} index={popup.index} onClose={() => setPopup(null)}
          onNav={(dir) => { const n = popup.index + dir; if (n >= 0 && n < radiusScale.length) setPopup({ index: n }); }} />
      )}

      <h2>Radius Scale</h2>
      <p>Corner rounding system from sharp (0px) to fully circular (999px). Click any to view details.</p>

      {/* Figma-accurate 3-column layout: Token | Radius | Representation */}
      <div className="rounded-xl border overflow-hidden mb-8" style={{ borderColor: 'var(--color-outline)' }}>
        {/* Header */}
        <div className="grid grid-cols-3 py-3 px-4" style={{ background: 'var(--color-surface-container-low)', borderBottom: '1px solid var(--color-outline)' }}>
          <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>Token</span>
          <span className="text-sm font-medium text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Radius</span>
          <span className="text-sm font-medium text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Representation</span>
        </div>
        {/* Rows */}
        {radiusScale.map((r, i) => {
          const rad = r.px === 999 ? '999px' : `${r.px}px`;
          return (
            <button
              key={r.token}
              onClick={() => setPopup({ index: i })}
              className="grid grid-cols-3 items-center py-4 px-4 w-full text-left transition-colors hover:bg-black/5"
              style={{ borderBottom: i < radiusScale.length - 1 ? '1px solid var(--color-outline)' : 'none' }}
            >
              {/* Token pill */}
              <div>
                <code className="text-xs px-3 py-1.5 rounded-md font-medium" style={{ background: 'var(--color-surface-variant)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
                  {r.token}
                </code>
              </div>
              {/* Value */}
              <div className="text-center">
                <span className="text-sm font-mono" style={{ color: 'var(--color-on-surface)' }}>{r.value}</span>
              </div>
              {/* Representation rectangle with glow */}
              <div className="flex justify-center">
                <div
                  className="w-[120px] h-[44px]"
                  style={{
                    borderRadius: rad,
                    background: 'color-mix(in srgb, var(--color-primary) 55%, transparent)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 0 12px 3px rgba(255,255,255,0.08), 0 0 4px 1px rgba(255,255,255,0.05)',
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <h2>Usage by Size</h2>
      <p>See how each radius value looks applied to different element sizes.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {radiusScale.filter(r => r.px > 0).map((r) => (
          <div key={r.token} className="p-4 border rounded-lg" style={{ borderColor: 'var(--color-outline)' }}>
            <div className="flex items-center gap-3 mb-3">
              <code className="text-xs font-semibold" style={{ color: 'var(--color-on-surface)' }}>{r.token}</code>
              <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{r.value}</span>
            </div>
            <div className="flex gap-2 items-end">
              <div className="w-8 h-8" style={{ borderRadius: r.px === 999 ? '999px' : `${r.px}px`, background: 'var(--color-primary)', opacity: 0.2 }} />
              <div className="w-16 h-10" style={{ borderRadius: r.px === 999 ? '999px' : `${r.px}px`, background: 'var(--color-primary)', opacity: 0.2 }} />
              <div className="w-24 h-12" style={{ borderRadius: r.px === 999 ? '999px' : `${r.px}px`, background: 'var(--color-primary)', opacity: 0.2 }} />
              <div className="flex-1 h-8" style={{ borderRadius: r.px === 999 ? '999px' : `${r.px}px`, background: 'var(--color-primary)', opacity: 0.2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Tab: Usage ─── */
function UsageTab() {
  return (
    <div className="mdx-content">
      <h2>Overview</h2>
      <Info>Radius defines the corner rounding system across the Tarmac Design System. It establishes how shape, geometry, and softness are applied to components, creating a consistent visual character that feels functional, human, and approachable.</Info>

      <h2>Principles</h2>
      <ul>
        <li><strong>Functional Softness</strong> — Corners are rounded just enough to feel approachable, without sacrificing precision</li>
        <li><strong>Hierarchy Through Shape</strong> — Different radius values communicate different levels of interaction, containment, and importance</li>
        <li><strong>Consistency Over Expression</strong> — The same semantic intent applies everywhere, not arbitrarily</li>
        <li><strong>Accessibility Through Recognition</strong> — Repeated shape language helps users recognise patterns faster</li>
        <li><strong>Scale with Purpose</strong> — Larger elements use larger radii to maintain proportion and visual balance</li>
      </ul>

      <h2>Accessibility &amp; Readability</h2>
      <p>Corner radius contributes to accessibility by:</p>
      <ul>
        <li>Improving perceptual grouping</li>
        <li>Making interactive elements easier to identify</li>
        <li>Reducing visual harshness in dense UI</li>
        <li>Supporting familiarity across repeated patterns</li>
      </ul>
      <p>Consistent geometry helps users quickly understand what is clickable, what is content, and what is structural.</p>

      <h2>Do&apos;s &amp; Don&apos;ts</h2>
      <DoDont slug="radius"
        doItems={[
          'Use radius tokens consistently across all components',
          'Match radius to element size — larger elements get larger radii',
          'Use radius.none (0px) intentionally for sharp-edged elements',
          'Use radius.max (999px) only for circular elements like avatars',
        ]}
        dontItems={[
          'Use arbitrary radius values outside the scale',
          'Apply large radii to small elements — it distorts the shape',
          'Mix different radius values within the same component group',
          'Use radius purely for decoration without functional purpose',
        ]}
      />
    </div>
  );
}

/* ─── Tab: Code ─── */
function CodeTab() {
  return (
    <div className="mdx-content">
      <h2>CSS Custom Properties</h2>
      <pre><code>{`:root {
  --radius-none: 0px;
  --radius-small: 2px;
  --radius-default: 4px;
  --radius-medium: 8px;
  --radius-large: 12px;
  --radius-xlarge: 16px;
  --radius-max: 999px;
}`}</code></pre>

      <h2>JavaScript / TypeScript</h2>
      <pre><code>{`import { radius } from '@tarmac/design-system/tokens';

// radius.none    → '0px'
// radius.small   → '2px'
// radius.default → '4px'
// radius.medium  → '8px'
// radius.large   → '12px'
// radius.xlarge  → '16px'
// radius.max     → '999px'`}</code></pre>

      <h2>Tailwind Config</h2>
      <pre><code>{`// tailwind.config.ts
export default {
  theme: {
    borderRadius: {
      none: '0px',
      sm: '2px',      // radius.small
      DEFAULT: '4px',  // radius.default
      md: '8px',       // radius.medium
      lg: '12px',      // radius.large
      xl: '16px',      // radius.xlarge
      full: '999px',   // radius.max
    },
  },
};`}</code></pre>

      <h2>Usage Examples</h2>
      <pre><code>{`/* Button */
.btn { border-radius: var(--radius-medium); }

/* Card */
.card { border-radius: var(--radius-large); }

/* Avatar */
.avatar { border-radius: var(--radius-max); }

/* Badge */
.badge { border-radius: var(--radius-small); }

/* Modal */
.modal { border-radius: var(--radius-large); }`}</code></pre>
    </div>
  );
}

/* ─── Main Page ─── */
export default function RadiusPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Changelog', content: (
      <div className="mdx-content py-4">
        <p style={{ color: 'var(--color-on-surface-variant)' }}>No changelog entries yet. Updates will appear here as the radius system evolves.</p>
      </div>
    )},
  ];

  return (
    <PageShell
      title="Radius"
      description="TARMAC's corner rounding system — 7 tokens from sharp (0px) to circular (999px), defining shape hierarchy across all components."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
