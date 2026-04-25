'use client';
import { useState, useEffect, useCallback } from 'react';
import { PageShell } from '@/components/PageShell';
import { Info, DoDont } from '@/components/mdx';

/* ─── Shadow data from Figma ─── */
type ShadowToken = { name: string; token: string; color: string; css: string; type: 'default' | 'raised' | 'inner' };

const lightShadows: ShadowToken[] = [
  { name: 'Primary', token: 'shadow.light.default.primary', color: 'alpha.black.10', css: '0 1px 3px rgba(0,0,0,0.10)', type: 'default' },
  { name: 'Secondary', token: 'shadow.light.default.secondary', color: 'alpha.black.15', css: '0 1px 2px rgba(0,0,0,0.15)', type: 'default' },
  { name: 'Primary', token: 'shadow.light.raised.primary', color: 'alpha.black.10', css: '0 4px 12px rgba(0,0,0,0.10)', type: 'raised' },
  { name: 'Secondary', token: 'shadow.light.raised.secondary', color: 'alpha.black.15', css: '0 2px 8px rgba(0,0,0,0.15)', type: 'raised' },
  { name: 'Primary', token: 'shadow.light.inner.primary', color: 'alpha.black.10', css: 'inset 0 2px 4px rgba(0,0,0,0.10)', type: 'inner' },
  { name: 'Secondary', token: 'shadow.light.inner.secondary', color: 'alpha.black.15', css: 'inset 0 1px 3px rgba(0,0,0,0.15)', type: 'inner' },
];

const darkShadows: ShadowToken[] = [
  { name: 'Primary', token: 'shadow.dark.default.primary', color: 'alpha.white.10', css: '0 1px 3px rgba(255,255,255,0.10)', type: 'default' },
  { name: 'Secondary', token: 'shadow.dark.default.secondary', color: 'alpha.white.15', css: '0 1px 2px rgba(255,255,255,0.15)', type: 'default' },
  { name: 'Primary', token: 'shadow.dark.raised.primary', color: 'alpha.white.10', css: '0 4px 12px rgba(255,255,255,0.10)', type: 'raised' },
  { name: 'Secondary', token: 'shadow.dark.raised.secondary', color: 'alpha.white.15', css: '0 2px 8px rgba(255,255,255,0.15)', type: 'raised' },
  { name: 'Primary', token: 'shadow.dark.inner.primary', color: 'alpha.white.10', css: 'inset 0 2px 4px rgba(255,255,255,0.10)', type: 'inner' },
  { name: 'Secondary', token: 'shadow.dark.inner.secondary', color: 'alpha.white.15', css: 'inset 0 1px 3px rgba(255,255,255,0.15)', type: 'inner' },
];

const elevationTypes = ['default', 'raised', 'inner'] as const;

/* ─── Shadow Popup ─── */
function ShadowPopup({ items, index, onClose, onNav }: {
  items: ShadowToken[]; index: number; onClose: () => void; onNav: (dir: -1 | 1) => void;
}) {
  const item = items[index];
  const [copied, setCopied] = useState(false);
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && index > 0) onNav(-1);
    if (e.key === 'ArrowRight' && index < items.length - 1) onNav(1);
  }, [onClose, onNav, index, items.length]);
  useEffect(() => { window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey); }, [handleKey]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {index > 0 && <button onClick={(e) => { e.stopPropagation(); onNav(-1); }} className="absolute left-4 sm:left-8 z-10 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>}
      {index < items.length - 1 && <button onClick={(e) => { e.stopPropagation(); onNav(1); }} className="absolute right-4 sm:right-8 z-10 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>}
      <div className="relative z-10 w-[90vw] max-w-md rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--color-outline)' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center py-14" style={{ background: 'var(--color-surface-container-low)' }}>
          <div className="w-56 h-32 rounded-xl" style={{ background: 'var(--color-surface)', boxShadow: item.css, border: '1px solid var(--color-outline)' }} />
        </div>
        <div className="p-5" style={{ background: 'var(--color-surface)' }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <code className="text-base font-semibold block" style={{ color: 'var(--color-on-surface)' }}>{item.token}</code>
              <span className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{item.name} · {item.type} · {item.color}</span>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(item.css); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium shrink-0" style={{ background: copied ? '#1BA86E' : 'var(--color-surface-variant)', color: copied ? '#fff' : 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
              {copied ? 'Copied!' : 'Copy CSS'}
            </button>
          </div>
          <code className="text-xs block mt-2 p-2 rounded" style={{ background: 'var(--color-surface-container-low)', color: 'var(--color-on-surface-variant)' }}>{item.css}</code>
          <div className="text-center mt-3"><span className="text-[11px] font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>{index + 1} / {items.length}</span></div>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.1)', color: 'var(--color-on-surface)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Shadow Section ─── */
function ShadowSection({ title, shadows, onSelect }: { title: string; shadows: ShadowToken[]; onSelect: (i: number) => void }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-on-surface)' }}>{title}</h3>
      {elevationTypes.map((type) => {
        const items = shadows.filter(s => s.type === type);
        if (items.length === 0) return null;
        return (
          <div key={type} className="mb-6">
            <h4 className="text-sm font-medium mb-3 capitalize" style={{ color: 'var(--color-on-surface-variant)' }}>{type}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((s) => {
                const globalIdx = shadows.indexOf(s);
                return (
                  <button key={s.token} onClick={() => onSelect(globalIdx)}
                    className="p-4 rounded-xl border text-left transition-all hover:scale-[1.02] group cursor-pointer"
                    style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-28 h-16 rounded-lg shrink-0" style={{ background: 'var(--color-surface)', boxShadow: s.css, border: '1px solid var(--color-outline)' }} />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold" style={{ color: 'var(--color-on-surface)' }}>{s.name}</div>
                        <code className="text-[10px] block truncate" style={{ color: 'var(--color-on-surface-variant)' }}>{s.token}</code>
                        <span className="text-[10px]" style={{ color: 'var(--color-on-surface-variant)' }}>{s.color}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Tab: Examples ─── */
function ExamplesTab() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [popup, setPopup] = useState<{ shadows: ShadowToken[]; index: number } | null>(null);
  const shadows = mode === 'light' ? lightShadows : darkShadows;

  return (
    <div className="mdx-content">
      {popup && (
        <ShadowPopup items={popup.shadows} index={popup.index} onClose={() => setPopup(null)}
          onNav={(dir) => { const n = popup.index + dir; if (n >= 0 && n < popup.shadows.length) setPopup({ ...popup, index: n }); }} />
      )}

      <div className="flex gap-2 mb-6">
        {(['light', 'dark'] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize"
            style={{
              backgroundColor: mode === m ? 'var(--color-on-surface)' : 'transparent',
              color: mode === m ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
              border: `1px solid ${mode === m ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
            }}>{m} Mode</button>
        ))}
      </div>

      <h2>Shadows — {mode === 'light' ? 'Light' : 'Dark'} Mode</h2>
      <p>3 elevation types (Default, Raised, Inner) × 2 levels (Primary, Secondary). Click any to view details and copy CSS.</p>

      <ShadowSection title={mode === 'light' ? 'Light Shadows' : 'Dark Shadows'} shadows={shadows}
        onSelect={(i) => setPopup({ shadows, index: i })} />
    </div>
  );
}

/* ─── Tab: Usage ─── */
function UsageTab() {
  return (
    <div className="mdx-content">
      <h2>Overview</h2>
      <Info>Shadows establish depth, hierarchy, and focus — helping users understand which elements sit above others. They are soft, minimal, and unobtrusive, adapting across light and dark modes.</Info>

      <h2>Principles</h2>
      <ul>
        <li><strong>Depth communicates hierarchy</strong> — Higher elevation = stronger shadow. Helps users understand interaction priority and layering</li>
        <li><strong>Functional, not decorative</strong> — Shadows bring interactive elements forward, separate floating layers, signal overlays, and indicate focus</li>
        <li><strong>Subtle and consistent</strong> — Shadows remain soft to maintain visual calm, especially at scale</li>
        <li><strong>Mode-aware</strong> — Shadow color and opacity adjust for light and dark UI backgrounds, avoiding harsh edges or halos</li>
      </ul>

      <h2>Elevation Types</h2>
      <table>
        <thead><tr><th>Type</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>Default</td><td>Subtle depth for cards, containers, and resting UI elements</td></tr>
          <tr><td>Raised</td><td>Elevated elements: dropdowns, popovers, floating actions, modals</td></tr>
          <tr><td>Inner</td><td>Inset depth for pressed states, input fields, recessed containers</td></tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <p>Shadows support usability but must not be the only indicator of state. Always pair with:</p>
      <ul>
        <li>Borders and focus rings</li>
        <li>Motion and transitions</li>
        <li>Color contrast</li>
      </ul>
      <Info>This ensures accessibility for low-vision users, high-contrast mode, and glare environments.</Info>

      <h2>Do&apos;s &amp; Don&apos;ts</h2>
      <DoDont slug="shadows"
        doItems={[
          'Use shadows to communicate elevation and layering',
          'Keep shadows soft and subtle',
          'Pair shadows with borders for accessibility',
          'Adjust shadow intensity between light and dark modes',
        ]}
        dontItems={[
          'Use shadows as the only indicator of interactive state',
          'Apply heavy shadows to flat UI elements',
          'Use colored shadows outside of brand-specific contexts',
          'Stack multiple shadow levels on the same element',
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
  /* Light mode */
  --shadow-default-primary: 0 1px 3px rgba(0,0,0,0.10);
  --shadow-default-secondary: 0 1px 2px rgba(0,0,0,0.15);
  --shadow-raised-primary: 0 4px 12px rgba(0,0,0,0.10);
  --shadow-raised-secondary: 0 2px 8px rgba(0,0,0,0.15);
  --shadow-inner-primary: inset 0 2px 4px rgba(0,0,0,0.10);
  --shadow-inner-secondary: inset 0 1px 3px rgba(0,0,0,0.15);
}

[data-theme="dark"] {
  --shadow-default-primary: 0 1px 3px rgba(255,255,255,0.10);
  --shadow-default-secondary: 0 1px 2px rgba(255,255,255,0.15);
  --shadow-raised-primary: 0 4px 12px rgba(255,255,255,0.10);
  --shadow-raised-secondary: 0 2px 8px rgba(255,255,255,0.15);
  --shadow-inner-primary: inset 0 2px 4px rgba(255,255,255,0.10);
  --shadow-inner-secondary: inset 0 1px 3px rgba(255,255,255,0.15);
}`}</code></pre>

      <h2>Usage</h2>
      <pre><code>{`/* Card */
.card { box-shadow: var(--shadow-default-primary); }

/* Dropdown */
.dropdown { box-shadow: var(--shadow-raised-primary); }

/* Input pressed */
.input:active { box-shadow: var(--shadow-inner-primary); }

/* Modal */
.modal { box-shadow: var(--shadow-raised-secondary); }`}</code></pre>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ShadowsPage() {
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
    <PageShell title="Shadows"
      description="TARMAC's shadow system — 3 elevation types (Default, Raised, Inner) with Primary and Secondary levels, adapting across light and dark modes."
      tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
