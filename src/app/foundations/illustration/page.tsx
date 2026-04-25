'use client';
import { useState, useEffect, useCallback } from 'react';
import { PageShell } from '@/components/PageShell';
import { Info, DoDont } from '@/components/mdx';

/* ─── Illustration data from Figma ─── */
type IllustrationCategory = 'Vehicles' | 'Vehicle Top View' | 'Scenes' | 'Icons' | 'Profiles' | 'Packages' | 'Additional';
type IllustrationStyle = 'Light' | 'Dark';

type IllustrationItem = {
  name: string;
  category: IllustrationCategory;
  style: IllustrationStyle;
  width: number;
  height: number;
  path: string;
};

const categories: { key: IllustrationCategory; label: string; description: string }[] = [
  { key: 'Vehicles', label: 'Vehicles', description: 'Side-view vehicle illustrations — scooters, rickshaws, trucks, autos' },
  { key: 'Vehicle Top View', label: 'Vehicle Top View', description: 'Top-down vehicle icons for maps and tracking' },
  { key: 'Scenes', label: 'Scenes', description: 'Delivery scenes and contextual illustrations' },
  { key: 'Icons', label: 'Icons & Stickers', description: 'Illustrative icons for UI elements and stickers' },
  { key: 'Profiles', label: 'Profiles', description: 'Character and profile illustrations' },
  { key: 'Packages', label: 'Packages', description: 'Package and content type illustrations' },
  { key: 'Additional', label: 'Additional', description: 'Supplementary illustrations and assets' },
];

function buildItems(): IllustrationItem[] {
  const items: IllustrationItem[] = [];
  const styles: IllustrationStyle[] = ['Light', 'Dark'];

  // Vehicles — 4 types × 3 variants × 2 styles
  const vehicleTypes = ['Scooter', 'Rickshaw', 'Truck', 'Auto'];
  for (const style of styles) {
    for (const type of vehicleTypes) {
      for (let i = 1; i <= 3; i++) {
        items.push({ name: `${type} ${i}`, category: 'Vehicles', style, width: 140, height: 140, path: `/illustrations/vehicles/${type.toLowerCase()}-${i}-${style.toLowerCase()}.svg` });
      }
    }
  }

  // Vehicle Top View — small (100×100) and large (180×180)
  const topViewSmall = ['Bike', 'Auto', 'Truck', 'Rickshaw', 'Plane'];
  for (const style of styles) {
    for (const name of topViewSmall) {
      items.push({ name, category: 'Vehicle Top View', style, width: 100, height: 100, path: `/illustrations/top-view/${name.toLowerCase()}-${style.toLowerCase()}.svg` });
    }
  }

  // Scenes
  const scenes = ['Delivery at Door', 'Rider with Package', 'Warehouse', 'Route Map'];
  for (const style of styles) {
    for (const name of scenes) {
      items.push({ name, category: 'Scenes', style, width: 360, height: 240, path: `/illustrations/scenes/${name.toLowerCase().replace(/ /g, '-')}-${style.toLowerCase()}.svg` });
    }
  }

  // Icons & Stickers — 3×6 grid
  const iconNames = ['Location Pin', 'Package Box', 'Delivery Van', 'Clock', 'Shield Check', 'Star Rating', 'Barcode', 'QR Code', 'Weight Scale', 'Route Path', 'Warehouse', 'Support Chat', 'Payment', 'Tracking', 'Returns', 'Notification', 'Calendar', 'Document'];
  for (const style of styles) {
    for (const name of iconNames) {
      items.push({ name, category: 'Icons', style, width: 117, height: 117, path: `/illustrations/icons/${name.toLowerCase().replace(/ /g, '-')}-${style.toLowerCase()}.svg` });
    }
  }

  // Profiles
  const profiles = ['Rider Male', 'Rider Female', 'Customer Male', 'Customer Female', 'Support Agent', 'Warehouse Staff', 'Driver', 'Manager', 'Delivery Partner'];
  for (const name of profiles) {
    items.push({ name, category: 'Profiles', style: 'Light', width: 64, height: 64, path: `/illustrations/profiles/${name.toLowerCase().replace(/ /g, '-')}.svg` });
  }

  // Packages
  const packages = ['Package L1', 'Package L2', 'Package L3', 'Content L1', 'Content L2', 'Content L3'];
  for (const style of styles) {
    for (const name of packages) {
      items.push({ name, category: 'Packages', style, width: 100, height: 100, path: `/illustrations/packages/${name.toLowerCase().replace(/ /g, '-')}-${style.toLowerCase()}.svg` });
    }
  }

  // Additional
  for (let i = 1; i <= 20; i++) {
    items.push({ name: `Asset ${i}`, category: 'Additional', style: 'Light', width: 200, height: 200, path: `/illustrations/additional/asset-${i}.svg` });
  }

  return items;
}

const allItems = buildItems();

/* ─── Placeholder Component ─── */
function IllustrationPlaceholder({ name, width, height, path, style: ilStyle }: { name: string; width: number; height: number; path: string; style: IllustrationStyle }) {
  const isDark = ilStyle === 'Dark';
  const borderColor = isDark ? '#444' : '#d0d0d0';
  const bg = isDark ? '#2a2c30' : '#f0f0f0';
  const textColor = isDark ? '#888' : '#999';
  const pathColor = isDark ? '#666' : '#bbb';

  return (
    <div style={{
      width: '100%', aspectRatio: `${width}/${height}`, background: bg,
      border: `1px dashed ${borderColor}`, borderRadius: 8,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 4, padding: 8, minHeight: 80,
    }}>
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
        <rect x="1" y="1" width="18" height="14" rx="2" stroke={borderColor} strokeWidth="1.2" />
        <circle cx="7" cy="6" r="2" stroke={pathColor} strokeWidth="1" />
        <path d="M1 12l5-4 3 2.5 4-3.5 6 5" stroke={pathColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 9, color: textColor, fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', lineHeight: 1 }}>
        {path.split('/').pop()}
      </span>
    </div>
  );
}

/* ─── Popup ─── */
function IllustrationPopup({ items, index, onClose, onNav }: {
  items: IllustrationItem[]; index: number; onClose: () => void; onNav: (dir: -1 | 1) => void;
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
        <div className="flex items-center justify-center p-8" style={{ background: item.style === 'Light' ? '#FFFFFF' : '#1B1D22' }}>
          <IllustrationPlaceholder name={item.name} width={item.width} height={item.height} path={item.path} style={item.style} />
        </div>
        <div className="p-5" style={{ background: 'var(--color-surface)' }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-base font-semibold block" style={{ color: 'var(--color-on-surface)' }}>{item.name}</span>
              <span className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{item.category} · {item.style} · {item.width}×{item.height}</span>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(item.path); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium shrink-0" style={{ background: copied ? '#1BA86E' : 'var(--color-surface-variant)', color: copied ? '#fff' : 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
              {copied ? 'Copied!' : 'Copy Path'}
            </button>
          </div>
          <code className="text-xs block mt-2 p-2 rounded" style={{ background: 'var(--color-surface-container-low)', color: 'var(--color-on-surface-variant)' }}>{item.path}</code>
          <div className="text-center mt-3"><span className="text-[11px] font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>{index + 1} / {items.length}</span></div>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.15)', color: item.style === 'Light' ? '#000' : '#fff' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Tab: Examples ─── */
function ExamplesTab() {
  const [categoryFilter, setCategoryFilter] = useState<'All' | IllustrationCategory>('All');
  const [styleFilter, setStyleFilter] = useState<IllustrationStyle>('Light');
  const [popup, setPopup] = useState<{ index: number } | null>(null);

  const filtered = allItems.filter(t =>
    (categoryFilter === 'All' || t.category === categoryFilter) &&
    t.style === styleFilter
  );

  return (
    <div className="mdx-content">
      {popup && (
        <IllustrationPopup items={filtered} index={popup.index} onClose={() => setPopup(null)}
          onNav={(dir) => { const n = popup.index + dir; if (n >= 0 && n < filtered.length) setPopup({ index: n }); }} />
      )}

      {/* Filter row */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setCategoryFilter('All')}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: categoryFilter === 'All' ? 'var(--color-on-surface)' : 'transparent',
              color: categoryFilter === 'All' ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
              border: `1px solid ${categoryFilter === 'All' ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
            }}>All</button>
          {categories.map((c) => (
            <button key={c.key} onClick={() => setCategoryFilter(c.key)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={{
                backgroundColor: categoryFilter === c.key ? 'var(--color-on-surface)' : 'transparent',
                color: categoryFilter === c.key ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
                border: `1px solid ${categoryFilter === c.key ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
              }}>{c.label}</button>
          ))}
        </div>
        {/* Light / Dark toggle */}
        <div className="flex items-center rounded-full shrink-0 overflow-hidden" style={{ border: '1px solid var(--color-outline)' }}>
          {(['Light', 'Dark'] as const).map((s) => (
            <button key={s} onClick={() => setStyleFilter(s)}
              className="px-3 py-1.5 text-xs font-medium transition-colors"
              style={{
                backgroundColor: styleFilter === s ? 'var(--color-on-surface)' : 'transparent',
                color: styleFilter === s ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
              }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Illustration grid by category */}
      {categories
        .filter(c => categoryFilter === 'All' || categoryFilter === c.key)
        .map((cat) => {
          const catItems = filtered.filter(t => t.category === cat.key);
          if (catItems.length === 0) return null;

          // Determine grid columns based on item size
          const cols = cat.key === 'Scenes' ? 'grid-cols-1 sm:grid-cols-2'
            : cat.key === 'Additional' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
            : cat.key === 'Profiles' ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9'
            : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6';

          return (
            <div key={cat.key} className="mb-8">
              <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>{cat.label}</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--color-on-surface-variant)' }}>{cat.description}</p>
              <div className={`grid ${cols} gap-3`}>
                {catItems.map((item, i) => {
                  const globalIdx = filtered.indexOf(item);
                  return (
                    <button key={`${item.name}-${item.style}`} onClick={() => setPopup({ index: globalIdx })}
                      className="rounded-xl border overflow-hidden text-left transition-all hover:shadow-md group"
                      style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
                      <div className="w-full p-3" style={{ background: item.style === 'Light' ? '#FFFFFF' : '#1B1D22' }}>
                        <IllustrationPlaceholder name={item.name} width={item.width} height={item.height} path={item.path} style={item.style} />
                      </div>
                      <div className="px-3 py-2">
                        <span className="text-[11px] font-medium block truncate" style={{ color: 'var(--color-on-surface)' }}>{item.name}</span>
                        <span className="text-[10px]" style={{ color: 'var(--color-on-surface-variant)' }}>{item.width}×{item.height}</span>
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

/* ─── Tab: Usage ─── */
function UsageTab() {
  return (
    <div className="mdx-content">
      <h2>Overview</h2>
      <Info>Illustrations are purpose-built visual assets that support the Delhivery brand across products. They communicate context, guide users, and add personality — while maintaining consistency across light and dark themes.</Info>

      <h2>Principles</h2>
      <ul>
        <li><strong>Purposeful, not decorative</strong> — Every illustration serves a functional role: onboarding, empty states, status communication, or brand reinforcement</li>
        <li><strong>Consistent style</strong> — All illustrations follow the same visual language: line weight, color palette, and level of detail</li>
        <li><strong>Theme-aware</strong> — Light and Dark variants ensure illustrations work across all surface contexts</li>
        <li><strong>Scalable</strong> — Illustrations are vector-based (SVG) and work at multiple sizes without quality loss</li>
      </ul>

      <h2>Categories</h2>
      <table>
        <thead><tr><th>Category</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>Vehicles</td><td>Side-view vehicles for tracking, status, and delivery context</td></tr>
          <tr><td>Vehicle Top View</td><td>Map markers, real-time tracking overlays</td></tr>
          <tr><td>Scenes</td><td>Onboarding, empty states, success/error screens</td></tr>
          <tr><td>Icons &amp; Stickers</td><td>Illustrative UI elements, gamification, rewards</td></tr>
          <tr><td>Profiles</td><td>User avatars, role indicators, placeholder profiles</td></tr>
          <tr><td>Packages</td><td>Package types, content categories, shipment visuals</td></tr>
          <tr><td>Additional</td><td>Supplementary assets for marketing and brand surfaces</td></tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <ul>
        <li>Always provide meaningful <code>alt</code> text for illustrations</li>
        <li>Illustrations should not be the sole means of conveying information</li>
        <li>Ensure sufficient contrast between illustration and background in both themes</li>
        <li>Decorative illustrations should use <code>aria-hidden=&quot;true&quot;</code></li>
      </ul>

      <h2>Do&apos;s &amp; Don&apos;ts</h2>
      <DoDont slug="illustration"
        doItems={[
          'Use the correct Light/Dark variant for the current theme',
          'Use SVG format for scalability',
          'Pair illustrations with text for context',
          'Use consistent sizing within the same layout',
        ]}
        dontItems={[
          'Stretch or distort illustrations',
          'Use Light illustrations on light backgrounds without contrast',
          'Mix illustration styles from different systems',
          'Use illustrations as primary navigation elements',
        ]}
      />
    </div>
  );
}

/* ─── Tab: Code ─── */
function CodeTab() {
  return (
    <div className="mdx-content">
      <h2>React Component</h2>
      <pre><code>{`import { Illustration } from '@tarmac/design-system';

<Illustration
  name="scooter-1"
  category="vehicles"
  style="light"
  width={140}
  height={140}
/>`}</code></pre>

      <h2>HTML</h2>
      <pre><code>{`<img
  src="/illustrations/vehicles/scooter-1-light.svg"
  alt="Delivery scooter"
  width="140"
  height="140"
/>`}</code></pre>

      <h2>Directory Structure</h2>
      <pre><code>{`/illustrations/
├── vehicles/
│   ├── scooter-1-light.svg
│   ├── scooter-1-dark.svg
│   ├── rickshaw-1-light.svg
│   └── ...
├── top-view/
│   ├── bike-light.svg
│   ├── auto-dark.svg
│   └── ...
├── scenes/
│   ├── delivery-at-door-light.svg
│   └── ...
├── icons/
│   ├── location-pin-light.svg
│   └── ...
├── profiles/
│   ├── rider-male.svg
│   └── ...
├── packages/
│   ├── package-l1-light.svg
│   └── ...
└── additional/
    ├── asset-1.svg
    └── ...`}</code></pre>
    </div>
  );
}

/* ─── Main Page ─── */
export default function IllustrationPage() {
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
    <PageShell title="Illustration"
      description="Purpose-built visual assets for the Delhivery ecosystem — vehicles, scenes, icons, profiles, and packages across Light and Dark themes."
      tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
