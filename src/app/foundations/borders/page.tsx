'use client';
import { useState, useEffect, useCallback } from 'react';
import { PageShell } from '@/components/PageShell';
import { Info, DoDont } from '@/components/mdx';

/* ─── Border data from Figma ─── */
type BorderToken = { token: string; value: string; px: number; purpose: string };

const borderScale: BorderToken[] = [
  { token: 'stroke.small', value: '0.5px', px: 0.5, purpose: 'Ultra-subtle separators, table grids, low-emphasis dividers' },
  { token: 'stroke.default', value: '1px', px: 1, purpose: 'Default border for UI components and containers' },
  { token: 'stroke.medium', value: '1.5px', px: 1.5, purpose: 'High-emphasis interactive states, active boundaries, focus outlines' },
  { token: 'stroke.large', value: '2px', px: 2, purpose: 'Strong structural separation, important emphasis elements' },
  { token: 'stroke.xlarge', value: '4px', px: 4, purpose: 'Rare use — hero, overlays, high-priority interaction or identity elements' },
];

const borderStates = [
  { state: 'Default', purpose: 'Neutral or semantic color at standard thickness' },
  { state: 'Hovered', purpose: 'Slightly stronger contrast and/or thicker stroke' },
  { state: 'Pressed', purpose: 'Highest-emphasis state border' },
  { state: 'Disabled', purpose: 'Reduced contrast, minimal visual presence' },
];

/* ─── Border Popup ─── */
function BorderPopup({ items, index, onClose, onNav }: {
  items: BorderToken[]; index: number; onClose: () => void; onNav: (dir: -1 | 1) => void;
}) {
  const item = items[index];
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
          <div className="w-[240px] h-[72px] rounded-lg" style={{
            border: `${item.px}px solid var(--color-on-surface)`,
            boxShadow: '0 0 12px 3px rgba(255,255,255,0.08)',
          }} />
        </div>
        <div className="p-5" style={{ background: 'var(--color-surface)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <code className="text-lg font-semibold block" style={{ color: 'var(--color-on-surface)' }}>{item.token}</code>
              <span className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{item.value}</span>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(item.token); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium shrink-0"
              style={{ background: copied ? '#1BA86E' : 'var(--color-surface-variant)', color: copied ? '#fff' : 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
              {copied ? 'Copied!' : 'Copy Token'}
            </button>
          </div>
          <p className="text-sm mb-3" style={{ color: 'var(--color-on-surface-variant)' }}>{item.purpose}</p>
          <div className="text-center mt-2">
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
        <BorderPopup items={borderScale} index={popup.index} onClose={() => setPopup(null)}
          onNav={(dir) => { const n = popup.index + dir; if (n >= 0 && n < borderScale.length) setPopup({ index: n }); }} />
      )}

      <h2>Border Stroke Scale</h2>
      <p>5 stroke widths from ultra-subtle (0.5px) to high-emphasis (4px). Click any to view details.</p>

      {/* Figma-accurate 3-column layout: Token | Value | Representation */}
      <div className="rounded-xl border overflow-hidden mb-8" style={{ borderColor: 'var(--color-outline)' }}>
        <div className="grid grid-cols-3 py-3 px-4" style={{ background: 'var(--color-surface-container-low)', borderBottom: '1px solid var(--color-outline)' }}>
          <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>Token</span>
          <span className="text-sm font-medium text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Value</span>
          <span className="text-sm font-medium text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Representation</span>
        </div>
        {borderScale.map((b, i) => (
          <button key={b.token} onClick={() => setPopup({ index: i })}
            className="grid grid-cols-3 items-center py-5 px-4 w-full text-left transition-colors hover:bg-black/5"
            style={{ borderBottom: i < borderScale.length - 1 ? '1px solid var(--color-outline)' : 'none' }}>
            <div>
              <code className="text-xs px-3 py-1.5 rounded-md font-medium" style={{ background: 'var(--color-surface-variant)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
                {b.token}
              </code>
            </div>
            <div className="text-center">
              <span className="text-sm font-mono" style={{ color: 'var(--color-on-surface)' }}>{b.value}</span>
            </div>
            <div className="flex justify-center">
              <div className="w-[200px] h-[52px] rounded-lg" style={{
                border: `${b.px}px solid var(--color-on-surface)`,
                boxShadow: '0 0 8px 2px rgba(255,255,255,0.06)',
              }} />
            </div>
          </button>
        ))}
      </div>

      <h2>Border States</h2>
      <table>
        <thead><tr><th>State</th><th>Purpose</th></tr></thead>
        <tbody>
          {borderStates.map((s) => (
            <tr key={s.state}><td><code>{s.state}</code></td><td>{s.purpose}</td></tr>
          ))}
        </tbody>
      </table>

      <h2>Semantic Border Types</h2>
      <p>Four semantic border types, each applied consistently across components:</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Success', color: '#1BA86E', desc: 'Positive confirmation' },
          { label: 'Error', color: '#DC143C', desc: 'Critical validation or failure' },
          { label: 'Warning', color: '#CF9F02', desc: 'Cautionary or attention-required' },
          { label: 'Link / Info', color: '#2396FB', desc: 'Informative or navigational' },
        ].map((t) => (
          <div key={t.label} className="p-4 rounded-lg" style={{ border: `2px solid ${t.color}` }}>
            <div className="text-sm font-semibold mb-1" style={{ color: t.color }}>{t.label}</div>
            <div className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{t.desc}</div>
          </div>
        ))}
      </div>
      <p style={{ color: 'var(--color-on-surface-variant)' }}>Each semantic type adapts across light and dark modes, with tonal steps for disabled → primary → secondary → tertiary usage.</p>
    </div>
  );
}

/* ─── Tab: Usage ─── */
function UsageTab() {
  return (
    <div className="mdx-content">
      <h2>Overview</h2>
      <Info>Borders help define structure, separation, and hierarchy across the interface. They guide the eye, reinforce component states, and provide clarity without overwhelming the layout.</Info>

      <h2>Principles</h2>
      <ul>
        <li><strong>Clarity Over Decoration</strong> — Borders exist to guide the eye, not to add style or noise</li>
        <li><strong>Light First</strong> — Thin strokes are preferred to maintain a clean, balanced visual tone</li>
        <li><strong>Hierarchy Through Weight</strong> — Thicker borders imply stronger separation or interaction significance</li>
        <li><strong>Consistency Across Surfaces</strong> — The same border weight should communicate the same purpose everywhere</li>
        <li><strong>Integrate With Radius &amp; Spacing</strong> — Borders reinforce, not disrupt, the structural system</li>
      </ul>

      <h2>Accessibility</h2>
      <p>Borders improve usability by:</p>
      <ul>
        <li>Reinforcing visual grouping</li>
        <li>Separating layers and interactive elements</li>
        <li>Improving contrast where shadows are insufficient</li>
        <li>Supporting scannability in dense layouts</li>
        <li>Guiding focus across workflows</li>
      </ul>
      <Info>Thin but clear borders reduce cognitive load — especially in complex operational UI — ensuring users never have to &ldquo;guess&rdquo; structure.</Info>

      <h2>Do&apos;s &amp; Don&apos;ts</h2>
      <DoDont slug="borders"
        doItems={[
          'Use 1px as the default border for most components',
          'Use semantic border colors for success, error, warning, and info states',
          'Increase border weight for focus and active states',
          'Keep borders consistent within the same component group',
        ]}
        dontItems={[
          'Use borders purely for decoration',
          'Apply 4px borders to standard UI components',
          'Mix border weights arbitrarily within the same context',
          'Use borders when spacing or background color can achieve the same separation',
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
  --stroke-small: 0.5px;
  --stroke-default: 1px;
  --stroke-medium: 1.5px;
  --stroke-large: 2px;
  --stroke-xlarge: 4px;
}`}</code></pre>

      <h2>Usage Examples</h2>
      <pre><code>{`/* Default component border */
.card {
  border: var(--stroke-default) solid var(--color-border-default);
}

/* Focus state */
.input:focus {
  border: var(--stroke-medium) solid var(--color-primary);
}

/* Subtle divider */
.divider {
  border-top: var(--stroke-small) solid var(--color-outline);
}

/* High-emphasis selection */
.selected {
  border: var(--stroke-large) solid var(--color-primary);
}

/* Semantic borders */
.error-border { border-color: var(--color-error); }
.success-border { border-color: var(--color-success); }
.warning-border { border-color: var(--color-warning); }
.info-border { border-color: var(--color-info); }`}</code></pre>

      <h2>Tailwind Utilities</h2>
      <pre><code>{`<!-- Default border -->
<div class="border border-outline">...</div>

<!-- Focus ring -->
<input class="focus:border-[1.5px] focus:border-primary" />

<!-- Semantic -->
<div class="border-2 border-red-500">Error</div>
<div class="border-2 border-green-500">Success</div>`}</code></pre>
    </div>
  );
}

/* ─── Main Page ─── */
export default function BordersPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Changelog', content: (
      <div className="mdx-content py-4">
        <p style={{ color: 'var(--color-on-surface-variant)' }}>No changelog entries yet. Updates will appear here as the border system evolves.</p>
      </div>
    )},
  ];

  return (
    <PageShell
      title="Borders"
      description="TARMAC's border system — 5 stroke widths (0.5–4px) with semantic types for success, error, warning, and info, supporting default, hovered, pressed, and disabled states."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
