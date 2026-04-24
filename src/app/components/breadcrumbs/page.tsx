'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Variant colors ── */
const variantColors: Record<string, { link: string; current: string; divider: string }> = {
  black:     { link: '#0D0D0D', current: '#525252', divider: '#999' },
  blue:      { link: '#2396FB', current: '#0D6FD6', divider: '#93C5FD' },
  'dlv-red': { link: '#ED1B36', current: '#B91C2E', divider: '#F87171' },
};

const variantLabels: Record<string, string> = {
  black: 'Black', blue: 'Blue', 'dlv-red': 'DLV Red',
};

const sizeMap: Record<string, { fontSize: number; gap: number; height: number; iconSize: number }> = {
  sm: { fontSize: 12, gap: 4, height: 24, iconSize: 12 },
  lg: { fontSize: 16, gap: 8, height: 36, iconSize: 16 },
};

/* ── Icons ── */
function HomeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1L1 7h2v6h4V9h2v4h4V7h2L8 1z" />
    </svg>
  );
}

function FolderIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M1 3h5l2 2h7v8H1V3zm1 1v8h12V6H7.5L5.5 4H2z" />
    </svg>
  );
}

function ChevronDivider({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 1.5L6.5 5L3.5 8.5" />
    </svg>
  );
}

/* ── BreadcrumbsProps interface ── */
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  divider?: 'slash' | 'chevron';
  variant?: string;
  size?: 'sm' | 'lg';
  disabled?: boolean;
  ghost?: boolean;
  pill?: boolean;
}

/* ── BreadcrumbsDemo component ── */
function BreadcrumbsDemo({
  items,
  divider = 'slash',
  variant = 'black',
  size = 'sm',
  disabled = false,
  ghost = false,
  pill = false,
  theme,
}: BreadcrumbsProps & { theme: 'light' | 'dark' }) {
  const colors = variantColors[variant] || variantColors.black;
  const s = sizeMap[size] || sizeMap.sm;
  const darkMode = theme === 'dark';

  const linkColor = darkMode
    ? (variant === 'black' ? '#CCC' : colors.link)
    : colors.link;
  const currentColor = darkMode ? '#888' : colors.current;
  const dividerColor = darkMode ? '#555' : colors.divider;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{ opacity: disabled ? 0.4 : ghost ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
    >
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: s.gap,
          listStyle: 'none',
          margin: 0,
          padding: pill ? '4px 12px' : 0,
          background: pill
            ? (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)')
            : 'transparent',
          borderRadius: pill ? 999 : 0,
          border: ghost ? `1px dashed ${dividerColor}` : pill ? `1px solid ${darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}` : 'none',
          height: s.height,
          fontSize: s.fontSize,
          fontFamily: 'inherit',
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: s.gap }}>
              {i > 0 && (
                <span aria-hidden="true" style={{ color: dividerColor, display: 'flex', alignItems: 'center', fontSize: s.fontSize }}>
                  {divider === 'chevron' ? <ChevronDivider size={s.iconSize - 2} /> : '/'}
                </span>
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  style={{
                    color: currentColor,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {item.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <CrumbLink href={item.href || '#'} color={linkColor} icon={item.icon} label={item.label} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ── CrumbLink with hover underline ── */
function CrumbLink({ href, color, icon, label }: { href: string; color: string; icon?: ReactNode; label: string }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <a
      href={href}
      onClick={e => e.preventDefault()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        color,
        textDecoration: hovered ? 'underline' : 'none',
        opacity: pressed ? 0.7 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        transition: 'opacity 0.1s ease',
        cursor: 'pointer',
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {label}
    </a>
  );
}

/* ── Breadcrumbs Example Section with variant/divider controls ── */
function BreadcrumbsExampleSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: (props: {
    size: 'sm' | 'lg';
    theme: 'light' | 'dark';
    variant: string;
    divider: 'slash' | 'chevron';
  }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState<'sm' | 'lg'>('sm');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState('black');
  const [divider, setDivider] = useState<'slash' | 'chevron'>('slash');

  useEffect(() => { setTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);

  const bg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';
  const selectStyle: React.CSSProperties = {
    padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
    background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>{title}</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>{desc}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <select value={size} onChange={e => setSize(e.target.value as 'sm' | 'lg')} style={selectStyle}>
          <option value="sm">Small</option>
          <option value="lg">Large</option>
        </select>
        <select value={variant} onChange={e => setVariant(e.target.value)} style={selectStyle}>
          {Object.keys(variantColors).map(v => (
            <option key={v} value={v}>{variantLabels[v]}</option>
          ))}
        </select>
        <select value={divider} onChange={e => setDivider(e.target.value as 'slash' | 'chevron')} style={selectStyle}>
          <option value="slash">Slash (/)</option>
          <option value="chevron">Chevron (&gt;)</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {children({ size, theme, variant, divider })}
      </div>
    </div>
  );
}

/* ── Sample breadcrumb data ── */
const sampleItems2: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products' },
];
const sampleItems3: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Breadcrumbs' },
];
const sampleItems5: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Phones', href: '/products/electronics/phones' },
  { label: 'iPhone 15' },
];
const sampleItems8: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/electronics' },
  { label: 'Phones', href: '/phones' },
  { label: 'Apple', href: '/apple' },
  { label: 'iPhone', href: '/iphone' },
  { label: 'iPhone 15', href: '/iphone-15' },
  { label: 'Pro Max' },
];
const sampleItemsWithIcons: BreadcrumbItem[] = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Documents', href: '/docs', icon: <FolderIcon /> },
  { label: 'Projects', href: '/projects', icon: <FolderIcon /> },
  { label: 'Design System' },
];
const sampleItemsTrailingIcon: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Profile', icon: <FolderIcon /> },
];

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-breadcrumbs--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-breadcrumbs--playground"
        height={420}
        title="Breadcrumbs — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        Breadcrumbs provide hierarchical navigation showing the current page location
        within a site structure. They render as a horizontal row of text links separated
        by dividers, with the last item representing the current page (non-clickable).
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Styles</td><td>Black, Blue, DLV Red</td></tr>
          <tr><td>Dividers</td><td>Slash (/), Chevron (&gt;)</td></tr>
          <tr><td>Sizes</td><td>Small (12px), Large (16px)</td></tr>
          <tr><td>States</td><td>Default, Hover, Pressed, Disabled, Ghost</td></tr>
          <tr><td>Features</td><td>Leading icon, Trailing icon, Pill style, Crumb counts (2–8)</td></tr>
        </tbody>
      </table>

      <h2>Color Variants</h2>

      <BreadcrumbsExampleSection
        title="All Color Styles"
        desc="Three color styles for different brand contexts. Hover links to see underline interaction."
      >
        {({ size, theme, divider }) => (
          <>
            {Object.keys(variantColors).map(v => (
              <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 11, color: theme === 'dark' ? '#888' : '#666', fontWeight: 500 }}>{variantLabels[v]}</span>
                <BreadcrumbsDemo items={sampleItems3} variant={v} divider={divider} size={size} theme={theme} />
              </div>
            ))}
          </>
        )}
      </BreadcrumbsExampleSection>

      <h2>Divider Types</h2>

      <BreadcrumbsExampleSection
        title="Slash vs Chevron"
        desc="Two divider options: slash (/) for a classic look, chevron (>) for a directional feel."
      >
        {({ size, theme, variant }) => (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, color: theme === 'dark' ? '#888' : '#666', fontWeight: 500 }}>Slash</span>
              <BreadcrumbsDemo items={sampleItems3} variant={variant} divider="slash" size={size} theme={theme} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, color: theme === 'dark' ? '#888' : '#666', fontWeight: 500 }}>Chevron</span>
              <BreadcrumbsDemo items={sampleItems3} variant={variant} divider="chevron" size={size} theme={theme} />
            </div>
          </>
        )}
      </BreadcrumbsExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Small for compact layouts, Large for prominent navigation."
        sizes={['sm', 'lg'] as ('sm' | 'lg')[]}
      >
        {({ theme }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, color: (theme as string) === 'dark' ? '#888' : '#666', fontWeight: 500 }}>Small</span>
              <BreadcrumbsDemo items={sampleItems3} size="sm" theme={theme as 'light' | 'dark'} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, color: (theme as string) === 'dark' ? '#888' : '#666', fontWeight: 500 }}>Large</span>
              <BreadcrumbsDemo items={sampleItems3} size="lg" theme={theme as 'light' | 'dark'} />
            </div>
          </div>
        )}
      </ComponentExampleSection>

      <h2>States</h2>

      <BreadcrumbsExampleSection
        title="Default, Disabled & Ghost"
        desc="Breadcrumbs support disabled and ghost states for inactive or placeholder contexts."
      >
        {({ size, theme, variant, divider }) => (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, color: theme === 'dark' ? '#888' : '#666', fontWeight: 500 }}>Default</span>
              <BreadcrumbsDemo items={sampleItems3} variant={variant} divider={divider} size={size} theme={theme} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, color: theme === 'dark' ? '#888' : '#666', fontWeight: 500 }}>Disabled</span>
              <BreadcrumbsDemo items={sampleItems3} variant={variant} divider={divider} size={size} theme={theme} disabled />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, color: theme === 'dark' ? '#888' : '#666', fontWeight: 500 }}>Ghost</span>
              <BreadcrumbsDemo items={sampleItems3} variant={variant} divider={divider} size={size} theme={theme} ghost />
            </div>
          </>
        )}
      </BreadcrumbsExampleSection>

      <h2>With Icons</h2>

      <BreadcrumbsExampleSection
        title="Leading Icons"
        desc="Breadcrumb items can include leading icons for additional visual context."
      >
        {({ size, theme, variant, divider }) => (
          <BreadcrumbsDemo items={sampleItemsWithIcons} variant={variant} divider={divider} size={size} theme={theme} />
        )}
      </BreadcrumbsExampleSection>

      <BreadcrumbsExampleSection
        title="Trailing Icon on Current Page"
        desc="The current (last) item can also carry an icon."
      >
        {({ size, theme, variant, divider }) => (
          <BreadcrumbsDemo items={sampleItemsTrailingIcon} variant={variant} divider={divider} size={size} theme={theme} />
        )}
      </BreadcrumbsExampleSection>

      <h2>Pill Style</h2>

      <BreadcrumbsExampleSection
        title="Pill Container"
        desc="Breadcrumbs wrapped in a pill-shaped container for a contained look."
      >
        {({ size, theme, variant, divider }) => (
          <BreadcrumbsDemo items={sampleItems3} variant={variant} divider={divider} size={size} theme={theme} pill />
        )}
      </BreadcrumbsExampleSection>

      <h2>Crumb Counts</h2>

      <BreadcrumbsExampleSection
        title="2 to 8 Crumbs"
        desc="Breadcrumbs scale from minimal (2 items) to deep hierarchies (8 items)."
      >
        {({ size, theme, variant, divider }) => (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, color: theme === 'dark' ? '#888' : '#666', fontWeight: 500 }}>2 crumbs</span>
              <BreadcrumbsDemo items={sampleItems2} variant={variant} divider={divider} size={size} theme={theme} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, color: theme === 'dark' ? '#888' : '#666', fontWeight: 500 }}>3 crumbs</span>
              <BreadcrumbsDemo items={sampleItems3} variant={variant} divider={divider} size={size} theme={theme} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, color: theme === 'dark' ? '#888' : '#666', fontWeight: 500 }}>5 crumbs</span>
              <BreadcrumbsDemo items={sampleItems5} variant={variant} divider={divider} size={size} theme={theme} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, color: theme === 'dark' ? '#888' : '#666', fontWeight: 500 }}>8 crumbs</span>
              <BreadcrumbsDemo items={sampleItems8} variant={variant} divider={divider} size={size} theme={theme} />
            </div>
          </>
        )}
      </BreadcrumbsExampleSection>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 2 — Code                                   */
/* ─────────────────────────────────────────────── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { Breadcrumbs } from '@tarmac/design-system';`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`interface BreadcrumbItem {
  /** Display text for the crumb */
  label: string;
  /** Navigation URL — omit for the current (last) page */
  href?: string;
  /** Optional leading/trailing icon */
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  /** Array of breadcrumb items (last item = current page) */
  items: BreadcrumbItem[];
  /** Separator between crumbs */
  divider?: 'slash' | 'chevron';
  /** Color style */
  variant?: 'black' | 'blue' | 'dlv-red';
  /** Size preset */
  size?: 'sm' | 'lg';
  /** Disable all interactions */
  disabled?: boolean;
  /** Ghost / placeholder appearance */
  ghost?: boolean;
  /** Wrap in a pill-shaped container */
  pill?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Accessible label for the nav landmark */
  ariaLabel?: string;
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>items</td><td>BreadcrumbItem[]</td><td>—</td><td>Array of crumb objects. The last item is rendered as the current page (non-clickable, bold).</td></tr>
          <tr><td>divider</td><td>&apos;slash&apos; | &apos;chevron&apos;</td><td>&apos;slash&apos;</td><td>Separator character between crumbs. Slash renders &quot;/&quot;, chevron renders &quot;&gt;&quot;.</td></tr>
          <tr><td>variant</td><td>&apos;black&apos; | &apos;blue&apos; | &apos;dlv-red&apos;</td><td>&apos;black&apos;</td><td>Color style applied to links and dividers.</td></tr>
          <tr><td>size</td><td>&apos;sm&apos; | &apos;lg&apos;</td><td>&apos;sm&apos;</td><td>Controls font size, gap, and overall height.</td></tr>
          <tr><td>disabled</td><td>boolean</td><td>false</td><td>Reduces opacity and disables pointer events on all crumbs.</td></tr>
          <tr><td>ghost</td><td>boolean</td><td>false</td><td>Renders a dashed-border placeholder style at reduced opacity.</td></tr>
          <tr><td>pill</td><td>boolean</td><td>false</td><td>Wraps the breadcrumb trail in a pill-shaped container with subtle background.</td></tr>
          <tr><td>className</td><td>string</td><td>—</td><td>Additional CSS class for the root nav element.</td></tr>
          <tr><td>ariaLabel</td><td>string</td><td>&apos;Breadcrumb&apos;</td><td>Accessible label for the navigation landmark.</td></tr>
        </tbody>
      </table>

      <h3>BreadcrumbItem Properties</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>label</td><td>string</td><td>Display text for the breadcrumb link.</td></tr>
          <tr><td>href</td><td>string</td><td>Navigation URL. Omit for the current page (last item).</td></tr>
          <tr><td>icon</td><td>ReactNode</td><td>Optional icon rendered before the label text.</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>
      <pre><code>{`// Basic breadcrumb trail
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumbs' },
  ]}
/>

// Blue variant with chevron divider
<Breadcrumbs
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile' },
  ]}
  variant="blue"
  divider="chevron"
  size="lg"
/>

// With leading icons
<Breadcrumbs
  items={[
    { label: 'Home', href: '/', icon: <HomeIcon /> },
    { label: 'Docs', href: '/docs', icon: <FolderIcon /> },
    { label: 'API Reference' },
  ]}
  variant="dlv-red"
/>

// Pill style
<Breadcrumbs
  items={[
    { label: 'Store', href: '/store' },
    { label: 'Electronics', href: '/electronics' },
    { label: 'Laptops' },
  ]}
  pill
  divider="chevron"
/>

// Disabled state
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Loading...' },
  ]}
  disabled
/>

// Dynamic breadcrumbs from route segments
const segments = pathname.split('/').filter(Boolean);
const items = segments.map((seg, i) => ({
  label: seg.charAt(0).toUpperCase() + seg.slice(1),
  href: i < segments.length - 1 ? '/' + segments.slice(0, i + 1).join('/') : undefined,
}));
<Breadcrumbs items={items} divider="chevron" />`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Small</th><th>Large</th></tr></thead>
        <tbody>
          <tr><td>breadcrumb-font-size</td><td>12px</td><td>16px</td></tr>
          <tr><td>breadcrumb-height</td><td>24px</td><td>36px</td></tr>
          <tr><td>breadcrumb-gap</td><td>4px</td><td>8px</td></tr>
          <tr><td>breadcrumb-icon-size</td><td>12px</td><td>16px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Link Color</th><th>Current Color</th><th>Divider Color</th></tr></thead>
        <tbody>
          <tr><td>Black</td><td>#0D0D0D</td><td>#525252</td><td>#999999</td></tr>
          <tr><td>Blue</td><td>#2396FB</td><td>#0D6FD6</td><td>#93C5FD</td></tr>
          <tr><td>DLV Red</td><td>#ED1B36</td><td>#B91C2E</td><td>#F87171</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all breadcrumb variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-breadcrumbs--playground" target="_blank" rel="noopener noreferrer">
          TARMAC Storybook →
        </a>
      </p>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 3 — Usage                                  */
/* ─────────────────────────────────────────────── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Container</td><td>Wrapper nav element for the breadcrumb trail</td></tr>
          <tr><td>2</td><td>Breadcrumb Item</td><td>Individual clickable link in the trail</td></tr>
          <tr><td>3</td><td>Separator</td><td>Divider between items (slash or chevron)</td></tr>
          <tr><td>4</td><td>Current Item</td><td>Last item representing the current page (non-clickable, bold)</td></tr>
          <tr><td>5</td><td>Icon</td><td>Optional leading icon on any crumb item</td></tr>
          <tr><td>6</td><td>Pill Container</td><td>Optional rounded wrapper with subtle background</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To show the user&apos;s current location within a multi-level hierarchy</li>
        <li>To provide quick navigation back to parent pages</li>
        <li>On pages that are 3+ levels deep in the site structure</li>
        <li>In e-commerce category trees, documentation sites, and admin dashboards</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="breadcrumbs"
        doItems={[
          'Always start with the root/home page as the first crumb',
          'Make all items except the current page clickable',
          'Keep crumb labels short and descriptive (1–3 words)',
          'Use consistent divider style across the application',
          'Place breadcrumbs at the top of the page content area',
        ]}
        dontItems={[
          'Don\'t use breadcrumbs as the primary navigation',
          'Don\'t show breadcrumbs on single-level pages',
          'Don\'t use more than 8 crumbs without collapsing',
          'Don\'t mix divider styles within the same breadcrumb',
          'Don\'t make the current (last) item clickable',
        ]}
      />

      <h2>Style Guide</h2>
      <table>
        <thead><tr><th>Variant</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>Black</td><td>Default for most interfaces — neutral and high-contrast</td></tr>
          <tr><td>Blue</td><td>Matches link-heavy UIs or information-focused pages</td></tr>
          <tr><td>DLV Red</td><td>Brand-specific contexts or high-emphasis navigation</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should match the page title they link to</li>
        <li>Use title case for crumb labels (e.g., &quot;My Account&quot;)</li>
        <li>Avoid abbreviations unless universally understood</li>
        <li>Icons should reinforce the label, not replace it</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Role</td><td>navigation</td><td>Landmark for the breadcrumb region</td></tr>
          <tr><td>aria-label</td><td>&quot;Breadcrumb&quot;</td><td>Accessible name for the nav element</td></tr>
          <tr><td>aria-current</td><td>&quot;page&quot;</td><td>Marks the current page item</td></tr>
          <tr><td>Separator</td><td>aria-hidden=&quot;true&quot;</td><td>Hides decorative dividers from screen readers</td></tr>
          <tr><td>Keyboard</td><td>Tab</td><td>Navigate between breadcrumb links</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Link text meets WCAG AA against background</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Navigation</strong> — Primary site navigation for top-level pages</li>
        <li><strong>Tabs</strong> — Horizontal navigation within a single page context</li>
        <li><strong>Links</strong> — Standalone text links for inline navigation</li>
        <li><strong>Pagination</strong> — Sequential navigation for ordered content</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 4 — Changelog                              */
/* ─────────────────────────────────────────────── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added <code>pill</code> container style</li>
        <li>Added <code>ghost</code> and <code>disabled</code> states</li>
        <li>Added <code>chevron</code> divider option alongside slash</li>
        <li>Added leading and trailing icon support per crumb item</li>
        <li>New color variants: Blue, DLV Red</li>
        <li>Two size presets: Small (12px) and Large (16px)</li>
        <li>Improved accessibility with aria-current=&quot;page&quot; and aria-hidden separators</li>
        <li>Support for 2–8 crumb items</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with default breadcrumb trail</li>
        <li>Slash separator</li>
        <li>Single size (14px)</li>
        <li>Basic link hover underline interaction</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function BreadcrumbsPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Breadcrumbs"
      description="Breadcrumbs show the user's current location within a navigational hierarchy, rendered as a horizontal row of text links separated by dividers."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
