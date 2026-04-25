'use client';

import { type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="navigation" />
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
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

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
