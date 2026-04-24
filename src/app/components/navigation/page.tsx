'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Nav Icons ── */
function HomeIcon({ color, size = 18 }: { color: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8l6-6 6 6" /><path d="M3 7.5V14h4v-4h2v4h4V7.5" /></svg>;
}
function GridIcon({ color, size = 18 }: { color: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5"><rect x="2" y="2" width="5" height="5" rx="1" /><rect x="9" y="2" width="5" height="5" rx="1" /><rect x="2" y="9" width="5" height="5" rx="1" /><rect x="9" y="9" width="5" height="5" rx="1" /></svg>;
}
function UserIcon({ color, size = 18 }: { color: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5"><circle cx="8" cy="5" r="3" /><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" strokeLinecap="round" /></svg>;
}
function SettingsIcon({ color, size = 18 }: { color: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5"><circle cx="8" cy="8" r="2" /><path d="M8 1v2m0 10v2M1 8h2m10 0h2M3 3l1.5 1.5m7 7L13 13M13 3l-1.5 1.5m-7 7L3 13" strokeLinecap="round" /></svg>;
}
function SearchNavIcon({ color, size = 18 }: { color: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>;
}

const navIcons = [HomeIcon, GridIcon, SearchNavIcon, UserIcon, SettingsIcon];
const navLabels = ['Home', 'Dashboard', 'Search', 'Profile', 'Settings'];

/* ── Navigation Preview ── */
function NavigationPreview({ variant = 'sidebar', theme }: { variant?: string; theme: 'light' | 'dark' }) {
  const [active, setActive] = useState(0);

  const bg = theme === 'dark' ? '#1E1E1E' : '#FFFFFF';
  const border = theme === 'dark' ? '#333' : '#E0E0E0';
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const subtext = theme === 'dark' ? '#888' : '#999';
  const activeBg = theme === 'dark' ? '#2A2A3A' : '#EBF5FF';
  const activeColor = '#2396FB';

  /* Breadcrumb Trail */
  if (variant === 'breadcrumb') {
    const crumbs = ['Home', 'Components', 'Navigation', 'Sidebar'];
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', background: bg, borderRadius: 8, border: `1px solid ${border}` }}>
        {crumbs.map((crumb, i) => (
          <span key={crumb} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              onClick={() => setActive(i)}
              style={{
                fontSize: 13, cursor: 'pointer',
                color: i === crumbs.length - 1 ? text : activeColor,
                fontWeight: i === crumbs.length - 1 ? 600 : 400,
              }}
            >
              {crumb}
            </span>
            {i < crumbs.length - 1 && <span style={{ color: subtext, fontSize: 12 }}>›</span>}
          </span>
        ))}
      </div>
    );
  }

  /* Top Tabs */
  if (variant === 'tabs') {
    return (
      <div style={{ background: bg, borderRadius: 8, border: `1px solid ${border}`, overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: `1px solid ${border}` }}>
          {navLabels.slice(0, 4).map((label, i) => (
            <button
              key={label}
              onClick={() => setActive(i)}
              style={{
                flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: 500,
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: active === i ? activeColor : subtext,
                borderBottom: active === i ? `2px solid ${activeColor}` : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{ padding: 20, fontSize: 13, color: subtext }}>
          Content for {navLabels[active]} tab
        </div>
      </div>
    );
  }

  /* Bottom Tab Bar */
  if (variant === 'bottom') {
    return (
      <div style={{ width: 320 }}>
        <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: '8px 8px 0 0', padding: 24, minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 13, color: subtext }}>Page content — {navLabels[active]}</span>
        </div>
        <div style={{ display: 'flex', background: bg, borderTop: `1px solid ${border}`, borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
          {navLabels.slice(0, 4).map((label, i) => {
            const Icon = navIcons[i];
            return (
              <button
                key={label}
                onClick={() => setActive(i)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                  padding: '8px 4px', background: 'transparent', border: 'none', cursor: 'pointer',
                  color: active === i ? activeColor : subtext,
                  transition: 'color 0.15s ease',
                }}
              >
                <Icon color={active === i ? activeColor : subtext} size={20} />
                <span style={{ fontSize: 10, fontWeight: active === i ? 600 : 400 }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* Sidebar (default) */
  return (
    <div style={{ display: 'flex', width: 400, height: 280, background: bg, borderRadius: 8, border: `1px solid ${border}`, overflow: 'hidden' }}>
      <div style={{ width: 180, borderRight: `1px solid ${border}`, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navLabels.map((label, i) => {
          const Icon = navIcons[i];
          return (
            <button
              key={label}
              onClick={() => setActive(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                borderRadius: 6, border: 'none', cursor: 'pointer',
                background: active === i ? activeBg : 'transparent',
                color: active === i ? activeColor : text,
                fontSize: 13, fontWeight: active === i ? 600 : 400,
                transition: 'all 0.15s ease',
                width: '100%', textAlign: 'left',
              }}
            >
              <Icon color={active === i ? activeColor : subtext} />
              {label}
            </button>
          );
        })}
      </div>
      <div style={{ flex: 1, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 13, color: subtext }}>{navLabels[active]} content area</span>
      </div>
    </div>
  );
}

/* ── Navigation Example Section ── */
function NavigationExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { theme: 'light' | 'dark'; variant: string }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState('sidebar');

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
        <select value={variant} onChange={e => setVariant(e.target.value)} style={selectStyle}>
          <option value="sidebar">Sidebar</option><option value="bottom">Bottom Tab Bar</option>
          <option value="breadcrumb">Breadcrumb Trail</option><option value="tabs">Top Tabs</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option><option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children({ theme, variant })}
      </div>
    </div>
  );
}

/* ─── TAB 1 — Examples ─── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="navigation" />
      <h2>Overview</h2>
      <p>Navigation components provide wayfinding through sidebar menus, bottom tab bars, breadcrumb trails, and top tabs. Click items to change the active state.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Sidebar, Bottom Tab Bar, Breadcrumb Trail, Top Tabs</td></tr>
          <tr><td>Features</td><td>Icons, Labels, Active indicator, Content area</td></tr>
          <tr><td>States</td><td>Default, Active, Hover</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>
      <NavigationExampleSection title="Navigation Patterns" desc="Switch between navigation variants. Click items to change the active state.">
        {({ theme, variant }) => <NavigationPreview variant={variant} theme={theme} />}
      </NavigationExampleSection>
    </>
  );
}

/* ─── TAB 2 — Code ─── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { Navigation, NavItem, SideNav, BottomNav, Breadcrumbs } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface NavigationProps {
  variant?: 'sidebar' | 'bottom' | 'breadcrumb' | 'tabs';
  items: NavItem[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  collapsed?: boolean;
}

interface NavItem {
  label: string;
  icon?: ReactNode;
  href?: string;
  badge?: number;
  disabled?: boolean;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Sidebar navigation
<SideNav
  items={[
    { label: 'Home', icon: <HomeIcon /> },
    { label: 'Dashboard', icon: <GridIcon /> },
    { label: 'Settings', icon: <SettingsIcon /> },
  ]}
  activeIndex={0}
  onChange={setActiveIndex}
/>

// Bottom tab bar
<BottomNav items={navItems} activeIndex={active} onChange={setActive} />

// Breadcrumb trail
<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Navigation' },
]} />

// Top tabs
<Navigation variant="tabs" items={tabItems} />`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>nav-sidebar-width</td><td>180px</td></tr>
          <tr><td>nav-item-padding</td><td>8px 12px</td></tr>
          <tr><td>nav-item-radius</td><td>6px</td></tr>
          <tr><td>nav-item-font-size</td><td>13px</td></tr>
          <tr><td>nav-icon-size</td><td>18px</td></tr>
          <tr><td>nav-bottom-height</td><td>56px</td></tr>
          <tr><td>nav-active-bg</td><td>var(--color-primary-container)</td></tr>
          <tr><td>nav-active-color</td><td>var(--color-primary)</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all navigation variants in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-navigation--playground" target="_blank" rel="noopener noreferrer">
          TARMAC Storybook →
        </a>
      </p>
    </>
  );
}

/* ─── TAB 3 — Usage ─── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Container</td><td>Wrapper for the navigation region</td></tr>
          <tr><td>2</td><td>Nav Item</td><td>Individual clickable navigation entry</td></tr>
          <tr><td>3</td><td>Icon</td><td>Leading visual for each item</td></tr>
          <tr><td>4</td><td>Label</td><td>Text name of the destination</td></tr>
          <tr><td>5</td><td>Active Indicator</td><td>Background highlight or underline for active item</td></tr>
          <tr><td>6</td><td>Badge</td><td>Optional notification count on an item</td></tr>
          <tr><td>7</td><td>Divider</td><td>Separator between breadcrumb segments</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>Sidebar for desktop apps with 5+ top-level sections</li>
        <li>Bottom tab bar for mobile apps with 3–5 primary destinations</li>
        <li>Breadcrumbs for deep hierarchical navigation</li>
        <li>Top tabs for switching between related content views</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="navigation"
        doItems={[
          'Limit bottom nav to 3–5 items maximum',
          'Use icons with labels for better recognition',
          'Highlight the active item clearly',
          'Keep sidebar navigation items scannable',
          'Use breadcrumbs for 3+ level hierarchies',
        ]}
        dontItems={[
          'Don\'t use more than one navigation pattern on the same page',
          'Don\'t hide primary navigation behind gestures',
          'Don\'t use icon-only navigation without tooltips',
          'Don\'t mix sidebar and bottom nav in the same app',
          'Don\'t use tabs for more than 6 items — use a dropdown instead',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>nav</td><td>aria-label</td><td>Describes the navigation purpose</td></tr>
          <tr><td>aria-current</td><td>&quot;page&quot;</td><td>Marks the active navigation item</td></tr>
          <tr><td>role</td><td>navigation / tablist</td><td>Semantic role based on variant</td></tr>
          <tr><td>Keyboard</td><td>Arrow keys, Tab, Enter</td><td>Navigate between items</td></tr>
          <tr><td>Focus</td><td>visible ring</td><td>Clear focus indicator on each item</td></tr>
          <tr><td>Breadcrumbs</td><td>aria-label=&quot;Breadcrumb&quot;</td><td>Identifies the breadcrumb trail</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Header</strong> — Top-level app header with navigation</li>
        <li><strong>Tabs</strong> — Content-level tab switching</li>
        <li><strong>Breadcrumbs</strong> — Standalone breadcrumb component</li>
        <li><strong>Side Drawer</strong> — Overlay navigation panel</li>
      </ul>
    </>
  );
}

/* ─── TAB 4 — Changelog ─── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added bottom tab bar variant</li>
        <li>Added breadcrumb trail variant</li>
        <li>Added top tabs variant</li>
        <li>Added badge support on nav items</li>
        <li>Added collapsed sidebar mode</li>
        <li>Improved keyboard navigation and focus management</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with sidebar navigation</li>
        <li>Icon and label support</li>
        <li>Active state indicator</li>
      </ul>
    </>
  );
}

/* ─── Page Export ─── */
export default function NavigationPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Navigation"
      description="Navigation components provide wayfinding through sidebars, bottom tabs, breadcrumbs, and top tabs."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
