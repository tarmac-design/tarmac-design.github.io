'use client';
import { useState, useEffect, useCallback } from 'react';
import { PageShell } from '@/components/PageShell';
import { Info, DoDont } from '@/components/mdx';

/* ─── Logo data from Figma ─── */
type LogoVariant = 'Logo' | 'Logomark' | 'Pictorial';
type LogoStyle = 'Light' | 'Dark';
type LogoSize = '14px' | '16px' | '24px' | '28px' | '34px' | '48px';

type LogoToken = {
  variant: LogoVariant;
  style: LogoStyle;
  size: LogoSize;
  width: number;
  height: number;
  description: string;
};

const logoSizes: LogoSize[] = ['14px', '16px', '24px', '28px', '34px', '48px'];

/* Dimensions from Figma: Logo (wordmark) has aspect ratio ~6.65:1, Logomark ~0.73:1, Pictorial 1:1 */
function getDimensions(variant: LogoVariant, size: LogoSize): { width: number; height: number } {
  const h = parseInt(size);
  if (variant === 'Logo') return { width: Math.round(h * 6.646), height: h };
  if (variant === 'Logomark') return { width: Math.round(h * 0.729), height: h };
  return { width: h, height: h }; // Pictorial is square
}

const allTokens: LogoToken[] = (['Logo', 'Logomark', 'Pictorial'] as LogoVariant[]).flatMap(variant =>
  (['Light', 'Dark'] as LogoStyle[]).flatMap(style =>
    logoSizes.map(size => {
      const dims = getDimensions(variant, size);
      return {
        variant,
        style,
        size,
        width: dims.width,
        height: dims.height,
        description: variant === 'Logo'
          ? 'Full wordmark — headers, dashboards, brand-forward surfaces'
          : variant === 'Logomark'
            ? 'Compact symbol — nav bars, app launchers, favicons, dense UI'
            : 'Pictorial mark — square icon contexts, app icons, social media',
      };
    })
  )
);

const variantDescriptions: Record<LogoVariant, { title: string; subtitle: string }> = {
  Logo: {
    title: 'Logo (Wordmark)',
    subtitle: 'Full brand name — headers, dashboards, brand surfaces',
  },
  Logomark: {
    title: 'Logomark',
    subtitle: 'Compact symbol — nav bars, favicons, dense UI',
  },
  Pictorial: {
    title: 'Pictorial',
    subtitle: 'Square icon — app icons, social media, avatars',
  },
};

/* ─── Logo Placeholder ─── */
/* Replace the inner content of this component with actual Delhivery SVG logos when available */
function DelhiveryLogoSVG({ variant, style: logoStyle, width, height, fullFill }: { variant: LogoVariant; style: LogoStyle; width: number; height: number; fullFill?: boolean }) {
  const isDark = logoStyle === 'Dark';
  const borderColor = isDark ? '#444' : '#d0d0d0';
  const bg = isDark ? '#2a2c30' : '#f0f0f0';
  const textColor = isDark ? '#888' : '#999';
  const pathColor = isDark ? '#666' : '#bbb';
  const variantSlug = variant === 'Logo' ? 'logo' : variant === 'Logomark' ? 'logomark' : 'pictorial';
  const filePath = `/logos/dlv-${variantSlug}-${logoStyle.toLowerCase()}.svg`;

  // Full fill mode — stretches to fill parent container
  if (fullFill) {
    return (
      <div style={{
        width: '100%', height: '100%', background: bg,
        border: `1.5px dashed ${borderColor}`, borderRadius: 'inherit',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 4,
      }}>
        <svg width="22" height="18" viewBox="0 0 20 16" fill="none">
          <rect x="1" y="1" width="18" height="14" rx="2" stroke={borderColor} strokeWidth="1.2" />
          <circle cx="7" cy="6" r="2" stroke={pathColor} strokeWidth="1" />
          <path d="M1 12l5-4 3 2.5 4-3.5 6 5" stroke={pathColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: 10, color: textColor, fontFamily: 'monospace', lineHeight: 1 }}>{filePath}</span>
      </div>
    );
  }

  // Small sizes: just a colored box with no text
  if (height <= 16) {
    return (
      <div style={{
        width, height, background: bg,
        border: `1px dashed ${borderColor}`, borderRadius: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width={Math.min(10, width - 4)} height={Math.min(8, height - 4)} viewBox="0 0 10 8" fill="none">
          <rect x="0.5" y="0.5" width="9" height="7" rx="1" stroke={borderColor} strokeDasharray="2 1" />
          <path d="M3 5.5L5 3L7 5.5" stroke={pathColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <div style={{
      width, height, background: bg,
      border: `1px dashed ${borderColor}`, borderRadius: 4,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: Math.max(1, height * 0.06), padding: '0 4px',
    }}>
      <svg width={Math.min(20, height * 0.35)} height={Math.min(16, height * 0.28)} viewBox="0 0 20 16" fill="none">
        <rect x="1" y="1" width="18" height="14" rx="2" stroke={borderColor} strokeWidth="1.2" />
        <circle cx="7" cy="6" r="2" stroke={pathColor} strokeWidth="1" />
        <path d="M1 12l5-4 3 2.5 4-3.5 6 5" stroke={pathColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{
        fontSize: Math.max(7, Math.min(9, height * 0.2)),
        color: textColor, fontFamily: 'monospace',
        whiteSpace: 'nowrap', overflow: 'hidden',
        textOverflow: 'ellipsis', maxWidth: '100%',
        lineHeight: 1,
      }}>
        {filePath}
      </span>
    </div>
  );
}

/* ─── Logo Popup ─── */
function LogoPopup({ items, index, onClose, onNav }: {
  items: LogoToken[]; index: number; onClose: () => void; onNav: (dir: -1 | 1) => void;
}) {
  const item = items[index];
  const [copied, setCopied] = useState(false);
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && index > 0) onNav(-1);
    if (e.key === 'ArrowRight' && index < items.length - 1) onNav(1);
  }, [onClose, onNav, index, items.length]);
  useEffect(() => { window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey); }, [handleKey]);

  const tokenName = `DLV_${item.variant === 'Logo' ? 'logo' : item.variant === 'Logomark' ? 'logomark' : 'pictorial'}.${item.style.toLowerCase()}.${item.size}`;
  const bgColor = item.style === 'Light' ? '#FFFFFF' : '#1B1D22';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {index > 0 && <button onClick={(e) => { e.stopPropagation(); onNav(-1); }} className="absolute left-4 sm:left-8 z-10 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>}
      {index < items.length - 1 && <button onClick={(e) => { e.stopPropagation(); onNav(1); }} className="absolute right-4 sm:right-8 z-10 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>}
      <div className="relative z-10 w-[90vw] max-w-lg rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--color-outline)' }} onClick={(e) => e.stopPropagation()}>
        {/* Preview area */}
        <div className="flex items-center justify-center py-12 px-8" style={{ background: bgColor, border: `1px dashed ${item.style === 'Light' ? '#e0e0e0' : '#434651'}` }}>
          <DelhiveryLogoSVG variant={item.variant} style={item.style} width={item.width * 2} height={item.height * 2} />
        </div>
        {/* Info */}
        <div className="p-5" style={{ background: 'var(--color-surface)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <code className="text-base font-semibold block" style={{ color: 'var(--color-on-surface)' }}>{tokenName}</code>
              <span className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{item.variant} · {item.style} · {item.size}</span>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(tokenName); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium shrink-0" style={{ background: copied ? '#1BA86E' : 'var(--color-surface-variant)', color: copied ? '#fff' : 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
              {copied ? 'Copied!' : 'Copy Token'}
            </button>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{item.description}</p>
          <div className="flex gap-2 mt-3 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
            <span className="px-2 py-1 rounded" style={{ background: 'var(--color-surface-container-low)' }}>{item.width}×{item.height}px</span>
            <span className="px-2 py-1 rounded" style={{ background: 'var(--color-surface-container-low)' }}>SVG</span>
          </div>
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
  const [variantFilter, setVariantFilter] = useState<'All' | LogoVariant>('All');
  const [styleFilter, setStyleFilter] = useState<LogoStyle>('Light');
  const [popup, setPopup] = useState<{ index: number } | null>(null);

  const filtered = allTokens.filter(t =>
    (variantFilter === 'All' || t.variant === variantFilter) &&
    t.style === styleFilter
  );

  return (
    <div className="mdx-content">
      {popup && (
        <LogoPopup items={filtered} index={popup.index} onClose={() => setPopup(null)}
          onNav={(dir) => { const n = popup.index + dir; if (n >= 0 && n < filtered.length) setPopup({ index: n }); }} />
      )}

      {/* ── Logo Types — static display, no selection ── */}
      <h2>Logo Types</h2>
      <p>Three standardized forms for every product logo.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {(['Logo', 'Logomark', 'Pictorial'] as LogoVariant[]).map((v) => {
          const info = variantDescriptions[v];
          return (
            <div key={v} className="rounded-xl border overflow-hidden"
              style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
              <div className="w-full h-20" style={{ background: '#FFFFFF', borderRadius: '12px 12px 0 0' }}>
                <DelhiveryLogoSVG variant={v} style="Light" width={0} height={0} fullFill />
              </div>
              <div className="p-4">
                <h3 className="text-xs font-semibold mb-0.5" style={{ color: 'var(--color-on-surface)' }}>{info.title}</h3>
                <p className="text-[11px] leading-tight" style={{ color: 'var(--color-on-surface-variant)' }}>{info.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Filter row: variant pills left, Light/Dark toggle right ── */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {(['All', 'Logo', 'Logomark', 'Pictorial'] as const).map((v) => (
            <button key={v} onClick={() => setVariantFilter(v)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={{
                backgroundColor: variantFilter === v ? 'var(--color-on-surface)' : 'transparent',
                color: variantFilter === v ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
                border: `1px solid ${variantFilter === v ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
              }}>{v}</button>
          ))}
        </div>
        {/* Light / Dark toggle — segmented control, always one active */}
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

      {/* ── Delhivery Logo grid — filtered by variant ── */}
      <h2>Delhivery Logo</h2>
      <p>3 variants × 2 styles × 6 sizes = 36 logo tokens. Click any to view details.</p>

      {(['Logo', 'Logomark', 'Pictorial'] as LogoVariant[])
        .filter(v => variantFilter === 'All' || variantFilter === v)
        .map((variant) => {
          const variantTokens = filtered.filter(t => t.variant === variant);
          if (variantTokens.length === 0) return null;
          return (
            <div key={variant} className="mb-6">
              <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>
                DLV_{variant === 'Logo' ? 'Logo' : variant === 'Logomark' ? 'Logomark' : 'Pictorial'}
              </h3>
              <p className="text-xs mb-4" style={{ color: 'var(--color-on-surface-variant)' }}>{variantDescriptions[variant].subtitle}</p>

              <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-outline)' }}>
                <div className="grid py-3 px-4" style={{
                  gridTemplateColumns: '1fr 1fr 1fr',
                  background: 'var(--color-surface-container-low)',
                  borderBottom: '1px solid var(--color-outline)',
                }}>
                  <span className="text-xs font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>Style</span>
                  <span className="text-xs font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>Size</span>
                  <span className="text-xs font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>Preview</span>
                </div>
                {variantTokens.map((t, i) => {
                  const globalIdx = filtered.indexOf(t);
                  const bgColor = t.style === 'Light' ? '#FFFFFF' : '#1B1D22';
                  return (
                    <button key={`${t.variant}-${t.style}-${t.size}`} onClick={() => setPopup({ index: globalIdx })}
                      className="grid items-center py-4 px-4 w-full text-left transition-colors hover:bg-black/5"
                      style={{
                        gridTemplateColumns: '1fr 1fr 1fr',
                        borderBottom: i < variantTokens.length - 1 ? '1px solid var(--color-outline)' : 'none',
                      }}>
                      <code className="text-xs px-2 py-1 rounded-md inline-block w-fit" style={{ background: 'var(--color-surface-variant)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
                        {t.style}
                      </code>
                      <span className="text-xs font-mono" style={{ color: 'var(--color-on-surface)' }}>{t.size}</span>
                      <div className="flex items-center">
                        <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg" style={{ background: bgColor, border: `1px dashed ${t.style === 'Light' ? '#e0e0e0' : '#434651'}` }}>
                          <DelhiveryLogoSVG variant={t.variant} style={t.style} width={t.width} height={t.height} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

      <h2>Size Reference</h2>
      <p>All 6 sizes at a glance for the {variantFilter === 'All' ? 'full wordmark' : variantFilter === 'Logo' ? 'full wordmark' : variantFilter.toLowerCase()}.</p>
      <div className="flex flex-col gap-4 p-6 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
        {logoSizes.map((size) => {
          const v = variantFilter === 'All' ? 'Logo' : variantFilter;
          const dims = getDimensions(v, size);
          return (
            <div key={size} className="flex items-center gap-4">
              <span className="text-xs font-mono w-12 text-right shrink-0" style={{ color: 'var(--color-on-surface-variant)' }}>{size}</span>
              <div className="inline-flex items-center px-3 py-1.5 rounded" style={{ background: '#FFFFFF' }}>
                <DelhiveryLogoSVG variant={v} style="Light" width={dims.width} height={dims.height} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Tab: Usage ─── */
function UsageTab() {
  return (
    <div className="mdx-content">
      <h2>Overview</h2>
      <Info>Logos are treated as system components, not static assets. Each product within the portfolio can have its own logo, but all logos follow a shared structure, sizing logic, and usage rules to ensure consistency, recognizability, and scalability across platforms.</Info>

      <h2>Principles</h2>
      <ul>
        <li><strong>Systematic, not decorative</strong> — Logos are functional UI elements with defined sizes, styles, and placement rules</li>
        <li><strong>Consistent across products</strong> — All product logos follow the same 3-variant structure (Wordmark, Logomark, Pictorial)</li>
        <li><strong>Context-driven selection</strong> — Choose the variant based on available space, visibility needs, and surface type</li>
        <li><strong>Scale with purpose</strong> — 6 predefined sizes ensure logos remain crisp and proportional at every scale</li>
        <li><strong>Style-aware</strong> — Light and Dark variants ensure visibility across all background contexts</li>
      </ul>

      <h2>Variant Selection Guide</h2>
      <table>
        <thead><tr><th>Variant</th><th>When to Use</th><th>Examples</th></tr></thead>
        <tbody>
          <tr><td>Logo (Wordmark)</td><td>Space allows, clear identification needed</td><td>Headers, dashboards, brand surfaces, login screens</td></tr>
          <tr><td>Logomark</td><td>Constrained space, recognition sufficient</td><td>Nav bars, app launchers, favicons, dense UI</td></tr>
          <tr><td>Pictorial</td><td>Square icon contexts</td><td>App icons, social media, compact placements</td></tr>
        </tbody>
      </table>

      <h2>Size Guidelines</h2>
      <table>
        <thead><tr><th>Size</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>14px</td><td>Micro contexts — footnotes, watermarks, dense metadata</td></tr>
          <tr><td>16px</td><td>Compact UI — breadcrumbs, inline references, small badges</td></tr>
          <tr><td>24px</td><td>Standard — navigation bars, toolbars, card headers</td></tr>
          <tr><td>28px</td><td>Prominent — section headers, sidebar branding</td></tr>
          <tr><td>34px</td><td>Large — page headers, hero sections, onboarding</td></tr>
          <tr><td>48px</td><td>Display — splash screens, marketing, brand-forward surfaces</td></tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <ul>
        <li>Always include meaningful <code>alt</code> text describing the brand (e.g., &ldquo;Delhivery logo&rdquo;)</li>
        <li>Ensure sufficient contrast between logo and background — use Light on dark surfaces, Dark on light surfaces</li>
        <li>Do not reduce logo below 14px — legibility degrades at smaller sizes</li>
        <li>Logos should not be the sole means of navigation — always pair with text labels</li>
      </ul>

      <h2>Do&apos;s &amp; Don&apos;ts</h2>
      <DoDont slug="logo"
        doItems={[
          'Use predefined sizes from the token scale (14–48px)',
          'Choose Light/Dark style based on background contrast',
          'Use the Wordmark when space allows for full identification',
          'Maintain clear space around the logo equal to the logomark height',
        ]}
        dontItems={[
          'Stretch, skew, or rotate the logo',
          'Use arbitrary sizes outside the defined scale',
          'Place a Light logo on a light background (or Dark on dark)',
          'Add effects like shadows, glows, or outlines to the logo',
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
      <pre><code>{`import { DelhiveryLogo } from '@tarmac/design-system';

// Full wordmark
<DelhiveryLogo variant="logo" style="light" size={48} />

// Logomark
<DelhiveryLogo variant="logomark" style="dark" size={24} />

// Pictorial
<DelhiveryLogo variant="pictorial" style="light" size={34} />`}</code></pre>

      <h2>Props</h2>
      <pre><code>{`type DelhiveryLogoProps = {
  variant: 'logo' | 'logomark' | 'pictorial';
  style: 'light' | 'dark';
  size: 14 | 16 | 24 | 28 | 34 | 48;
  className?: string;
  alt?: string;  // defaults to "Delhivery logo"
};`}</code></pre>

      <h2>HTML / SVG</h2>
      <pre><code>{`<!-- Wordmark (light) -->
<img src="/logos/delhivery-logo-light.svg"
     alt="Delhivery logo"
     height="24" />

<!-- Logomark (dark) -->
<img src="/logos/delhivery-logomark-dark.svg"
     alt="Delhivery"
     height="24" />

<!-- Pictorial -->
<img src="/logos/delhivery-pictorial.svg"
     alt="Delhivery"
     width="24" height="24" />`}</code></pre>

      <h2>Token Naming</h2>
      <pre><code>{`// Pattern: DLV_{variant}.{style}.{size}
// Examples:
DLV_logo.light.48px
DLV_logo.dark.24px
DLV_logomark.light.16px
DLV_logomark.dark.34px
DLV_pictorial.light.28px
DLV_pictorial.dark.48px`}</code></pre>

      <h2>Clear Space</h2>
      <pre><code>{`/* Minimum clear space = logomark height */
.logo-container {
  padding: var(--logo-clearspace, 24px);
}

/* Example with 24px logo */
.logo-wrapper {
  padding: 24px; /* equal to logo height */
}`}</code></pre>
    </div>
  );
}

/* ─── Main Page ─── */
export default function LogoPage() {
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
    <PageShell title="Logos"
      description="A logo is a visual representation of a brand or app (product). It can be a word or an image, or a combination of both. 3 variants (Wordmark, Logomark, Pictorial) × 2 styles (Light, Dark) × 6 sizes (14–48px)."
      tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
