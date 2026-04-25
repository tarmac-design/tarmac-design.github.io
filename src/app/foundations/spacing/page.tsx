'use client';
import { useState, useEffect, useCallback } from 'react';
import { PageShell } from '@/components/PageShell';
import { Info, DoDont } from '@/components/mdx';

/* ─── Spacing data from Figma ─── */
type SpacingToken = { token: string; multiplier: string; px: number; group: 'Small' | 'Medium' | 'Large' };

const spacingScale: SpacingToken[] = [
  { token: 'space.0', multiplier: '0x', px: 0, group: 'Small' },
  { token: 'space.2', multiplier: '0.25x', px: 2, group: 'Small' },
  { token: 'space.4', multiplier: '0.5x', px: 4, group: 'Small' },
  { token: 'space.6', multiplier: '0.75x', px: 6, group: 'Small' },
  { token: 'space.8', multiplier: '1x', px: 8, group: 'Small' },
  { token: 'space.12', multiplier: '1.5x', px: 12, group: 'Medium' },
  { token: 'space.16', multiplier: '2x', px: 16, group: 'Medium' },
  { token: 'space.20', multiplier: '2.5x', px: 20, group: 'Medium' },
  { token: 'space.24', multiplier: '3x', px: 24, group: 'Medium' },
  { token: 'space.32', multiplier: '4x', px: 32, group: 'Medium' },
  { token: 'space.40', multiplier: '5x', px: 40, group: 'Large' },
  { token: 'space.48', multiplier: '6x', px: 48, group: 'Large' },
  { token: 'space.64', multiplier: '8x', px: 64, group: 'Large' },
  { token: 'space.80', multiplier: '10x', px: 80, group: 'Large' },
];

/* ─── Visual spacing bar ─── */
function SpacingBar({ px, token, onClick }: { px: number; token: string; onClick?: () => void }) {
  return (
    <button className="flex items-center gap-3 group cursor-pointer w-full text-left" title={`${token}: ${px}px`} onClick={onClick}>
      <code className="text-xs w-20 shrink-0 text-right" style={{ color: 'var(--color-on-surface-variant)' }}>{token}</code>
      <div className="flex-1 flex items-center gap-2">
        <div
          className="h-6 rounded transition-all group-hover:opacity-90 group-hover:shadow-md"
          style={{ width: Math.max(2, px * 3), background: 'var(--color-primary)', opacity: 0.7, minWidth: px === 0 ? 2 : undefined }}
        />
        <span className="text-[11px] font-mono shrink-0" style={{ color: 'var(--color-on-surface-variant)' }}>{px}px</span>
      </div>
    </button>
  );
}

/* ─── Spacing Popup ─── */
function SpacingPopup({ items, index, onClose, onNav }: {
  items: SpacingToken[]; index: number; onClose: () => void; onNav: (dir: -1 | 1) => void;
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
        <div className="flex items-center justify-center py-10" style={{ background: 'var(--color-surface-container-low)' }}>
          <div className="flex items-center gap-1">
            <div className="w-12 h-12 rounded" style={{ background: 'var(--color-primary)', opacity: 0.2 }} />
            <div className="h-12 rounded" style={{ width: Math.max(2, item.px * 2), background: 'var(--color-primary)', opacity: 0.6 }} />
            <div className="w-12 h-12 rounded" style={{ background: 'var(--color-primary)', opacity: 0.2 }} />
          </div>
        </div>
        <div className="p-5" style={{ background: 'var(--color-surface)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <code className="text-lg font-semibold block" style={{ color: 'var(--color-on-surface)' }}>{item.token}</code>
              <span className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{item.px}px · {item.multiplier} · {item.group}</span>
            </div>
            <button onClick={handleCopy} className="px-3 py-1.5 rounded-lg text-xs font-medium shrink-0"
              style={{ background: copied ? '#1BA86E' : 'var(--color-surface-variant)', color: copied ? '#fff' : 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
              {copied ? 'Copied!' : 'Copy Token'}
            </button>
          </div>
          {/* Scale strip */}
          <div className="flex gap-0.5 rounded-lg overflow-hidden mt-3">
            {items.map((s, i) => (
              <button key={s.token} onClick={() => onNav((i - index) as -1 | 1)} className="flex-1 h-5 transition-all"
                style={{ background: 'var(--color-primary)', opacity: i === index ? 0.7 : 0.15, outline: i === index ? '2px solid var(--color-primary)' : 'none', outlineOffset: '-1px',
                  borderRadius: i === 0 ? '4px 0 0 4px' : i === items.length - 1 ? '0 4px 4px 0' : '0' }} />
            ))}
          </div>
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
  const [activeGroup, setActiveGroup] = useState<'All' | 'Small' | 'Medium' | 'Large'>('All');
  const [popup, setPopup] = useState<{ index: number } | null>(null);
  const groups = ['All', 'Small', 'Medium', 'Large'] as const;

  const filtered = activeGroup === 'All' ? spacingScale : spacingScale.filter(s => s.group === activeGroup);

  return (
    <div className="mdx-content">
      <div className="flex gap-2 mb-6">
        {groups.map((g) => (
          <button key={g} onClick={() => setActiveGroup(g)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: activeGroup === g ? 'var(--color-on-surface)' : 'transparent',
              color: activeGroup === g ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
              border: `1px solid ${activeGroup === g ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
            }}>{g}</button>
        ))}
      </div>

      <h2>Spacing Scale</h2>
      <p>Built on an 8px base unit. All values are multiples of 8px, with 2px and 4px for fine-tuning. Click any to view details.</p>

      {/* Popup */}
      {popup && (
        <SpacingPopup items={filtered} index={popup.index} onClose={() => setPopup(null)}
          onNav={(dir) => { const n = popup.index + dir; if (n >= 0 && n < filtered.length) setPopup({ index: n }); }} />
      )}

      {/* Visual bars */}
      <div className="flex flex-col gap-2 mb-8">
        {filtered.map((s, i) => <SpacingBar key={s.token} px={s.px} token={s.token} onClick={() => setPopup({ index: i })} />)}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table>
          <thead><tr><th>Group</th><th>Token</th><th>Multiplier</th><th>Pixels</th><th>Visual</th></tr></thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.token}>
                <td><code className="text-xs">{s.group}</code></td>
                <td><code>{s.token}</code></td>
                <td>{s.multiplier}</td>
                <td>{s.px}px</td>
                <td>
                  <div className="h-3 rounded" style={{ width: Math.max(1, s.px), background: 'var(--color-primary)', opacity: 0.6 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Size Ranges</h2>

      <h3>Small (0–8px)</h3>
      <ul>
        <li>Spacing between small icons and text</li>
        <li>Inner padding in compact components (badges, icon buttons, table cells)</li>
        <li>Gaps between repeating UI elements (chips, tag groups, button groups)</li>
        <li>Form field padding and internal content spacing</li>
        <li>Tight vertical gaps inside cards and containers</li>
        <li>Spacing between triggers and elevated elements (menus, dropdowns, tooltips)</li>
      </ul>

      <h3>Medium (12–32px)</h3>
      <ul>
        <li>Padding inside primary components (buttons, cards, list items)</li>
        <li>Spacing between content groups within a component</li>
        <li>Separation between icons/avatars and text</li>
        <li>Spacing between stacked UI sections</li>
        <li>Layout spacing in standard page content</li>
      </ul>

      <h3>Large (40–80px)</h3>
      <ul>
        <li>Spacing between major page sections</li>
        <li>Page top-margins and structural dividers</li>
        <li>Hero areas and large modules</li>
        <li>Wide layout breathing room</li>
        <li>Guiding visual flow across dense dashboards</li>
      </ul>
    </div>
  );
}

/* ─── Tab: Usage ─── */
function UsageTab() {
  return (
    <div className="mdx-content">
      <h2>8px Base Unit</h2>
      <Info>All spacing values are multiples of 8px — providing flexibility without fragmentation. The 8px base unit forms a clear and scalable rhythm for all layouts.</Info>

      <h2>Principles</h2>
      <ul>
        <li><strong>Use spacing to define hierarchy, not decoration</strong> — Spacing communicates relationships between elements</li>
        <li><strong>Whitespace is functional, not empty space</strong> — It guides the eye and reduces cognitive load</li>
        <li><strong>Consistency improves learnability</strong> — Predictable spacing helps users build mental models</li>
        <li><strong>Spacing should support clarity at scale</strong> — Works across dense dashboards and simple pages alike</li>
      </ul>

      <h2>Accessibility &amp; Readability</h2>
      <p>Consistent spacing improves legibility, comprehension, and interaction accuracy. It supports accessibility by:</p>
      <ul>
        <li>Maintaining clear separation between elements</li>
        <li>Preventing visual overload in dense workflows</li>
        <li>Improving touch target spacing</li>
        <li>Enhancing scan patterns and reading flow</li>
        <li>Reducing cognitive load through predictable structure</li>
      </ul>
      <Info>Well-paced spacing ensures that content is not only functional, but also comfortable to use over long working sessions.</Info>

      <h2>Do&apos;s &amp; Don&apos;ts</h2>
      <DoDont slug="spacing"
        doItems={[
          'Use the 8px base unit for all spacing decisions',
          'Apply consistent spacing within component groups',
          'Use larger spacing to separate distinct sections',
          'Use 2–4px only for fine-tuning and precision alignment',
        ]}
        dontItems={[
          'Use arbitrary pixel values outside the scale',
          'Mix spacing scales within the same component',
          'Remove spacing between interactive elements',
          'Use large spacing values inside compact components',
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
  --space-0: 0px;
  --space-2: 2px;
  --space-4: 4px;
  --space-6: 6px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-32: 32px;
  --space-40: 40px;
  --space-48: 48px;
  --space-64: 64px;
  --space-80: 80px;
}`}</code></pre>

      <h2>JavaScript / TypeScript</h2>
      <pre><code>{`import { spacing } from '@tarmac/design-system/tokens';

// spacing[0]  → '0px'
// spacing[8]  → '8px'
// spacing[24] → '24px'
// spacing[64] → '64px'`}</code></pre>

      <h2>Tailwind Config</h2>
      <pre><code>{`// tailwind.config.ts
export default {
  theme: {
    spacing: {
      0: '0px',
      0.5: '2px',   // space.2
      1: '4px',     // space.4
      1.5: '6px',   // space.6
      2: '8px',     // space.8
      3: '12px',    // space.12
      4: '16px',    // space.16
      5: '20px',    // space.20
      6: '24px',    // space.24
      8: '32px',    // space.32
      10: '40px',   // space.40
      12: '48px',   // space.48
      16: '64px',   // space.64
      20: '80px',   // space.80
    },
  },
};`}</code></pre>

      <h2>Usage Examples</h2>
      <pre><code>{`/* Component padding */
.card {
  padding: var(--space-16);
  gap: var(--space-8);
}

/* Section spacing */
.section {
  margin-bottom: var(--space-48);
  padding: var(--space-32) var(--space-24);
}

/* Compact element */
.badge {
  padding: var(--space-2) var(--space-8);
  gap: var(--space-4);
}`}</code></pre>
    </div>
  );
}

/* ─── Main Page ─── */
export default function SpacingPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Changelog', content: (
      <div className="mdx-content py-4">
        <p style={{ color: 'var(--color-on-surface-variant)' }}>No changelog entries yet. Updates will appear here as the spacing system evolves.</p>
      </div>
    )},
  ];

  return (
    <PageShell
      title="Spacing"
      description="TARMAC's spacing system — built on an 8px base unit with 14 tokens across Small (0–8px), Medium (12–32px), and Large (40–80px) ranges for consistent visual rhythm."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
