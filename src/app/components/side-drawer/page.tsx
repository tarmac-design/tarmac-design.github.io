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
      <StorybookVariantViewer slug="side-drawer" />
    </>
  );
}

/* ── TAB 2 — Code ── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>
      <h2>Import</h2>
      <pre><code>{`import { SideDrawer } from '@tarmac/design-system';`}</code></pre>
      <h2>Component API</h2>
      <pre><code>{`interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  persistent?: boolean;
  width?: string | number;
  overlay?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

interface DrawerItemProps {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  destructive?: boolean;
}`}</code></pre>
      <h2>Basic Usage</h2>
      <pre><code>{`// Basic left drawer
<SideDrawer open={isOpen} onClose={() => setIsOpen(false)}>
  <DrawerItem icon={<HomeIcon />} label="Home" onClick={goHome} />
  <DrawerItem icon={<SettingsIcon />} label="Settings" />
</SideDrawer>

// Right drawer
<SideDrawer open={isOpen} onClose={close} position="right">
  <DetailPanel />
</SideDrawer>

// With header and footer
<SideDrawer
  open={isOpen}
  onClose={close}
  header={<UserProfile />}
  footer={<DrawerItem label="Sign Out" destructive />}
>
  <Navigation />
</SideDrawer>

// Persistent sidebar
<SideDrawer open persistent>
  <Navigation />
</SideDrawer>`}</code></pre>
      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>drawer-width</td><td>280px</td></tr>
          <tr><td>drawer-z-index</td><td>1200</td></tr>
          <tr><td>drawer-shadow</td><td>4px 0 16px rgba(0,0,0,0.15)</td></tr>
          <tr><td>drawer-overlay-color</td><td>rgba(0,0,0,0.4)</td></tr>
          <tr><td>drawer-transition</td><td>transform 0.25s ease</td></tr>
          <tr><td>drawer-item-radius</td><td>6px</td></tr>
        </tbody>
      </table>
      <h2>Storybook</h2>
      <p>
        Explore all side drawer variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-side-drawer--playground" target="_blank" rel="noopener noreferrer">TARMAC Storybook →</a>
      </p>
    </>
  );
}

/* ── TAB 3 — Usage ── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Overlay</td><td>Semi-transparent backdrop behind the drawer</td></tr>
          <tr><td>2</td><td>Drawer Panel</td><td>Slide-in container from left or right edge</td></tr>
          <tr><td>3</td><td>Header</td><td>Optional top section for branding or user info</td></tr>
          <tr><td>4</td><td>Navigation Items</td><td>Clickable menu items with icons and labels</td></tr>
          <tr><td>5</td><td>Footer</td><td>Optional bottom section for secondary actions</td></tr>
          <tr><td>6</td><td>Trigger</td><td>Hamburger icon or button that opens the drawer</td></tr>
        </tbody>
      </table>
      <h2>When to Use</h2>
      <ul>
        <li>Primary navigation on mobile or tablet layouts</li>
        <li>Settings or configuration panels</li>
        <li>Detail views that slide in from the side</li>
        <li>Persistent sidebar navigation on desktop</li>
      </ul>
      <h2>Best Practices</h2>
      <DoDont
        slug="side-drawer"
        doItems={[
          'Use overlay drawers on mobile, persistent on desktop',
          'Close the drawer when a navigation item is selected',
          'Include a visible close affordance (X button or backdrop tap)',
          'Keep navigation items to 5–8 for scannability',
          'Use icons alongside labels for quick recognition',
        ]}
        dontItems={[
          'Don\'t nest drawers inside other drawers',
          'Don\'t use drawers for primary content — they\'re for navigation',
          'Don\'t auto-open drawers without user action',
          'Don\'t put complex forms inside drawers',
          'Don\'t block the close action during loading states',
        ]}
      />
      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>navigation / complementary</td><td>Semantic role based on drawer content</td></tr>
          <tr><td>aria-label</td><td>&quot;Navigation drawer&quot;</td><td>Accessible name for the drawer</td></tr>
          <tr><td>aria-hidden</td><td>boolean</td><td>Hidden when closed (overlay variant)</td></tr>
          <tr><td>Focus trap</td><td>Overlay mode</td><td>Trap focus within open overlay drawer</td></tr>
          <tr><td>Escape</td><td>Close</td><td>Dismiss drawer on Escape key</td></tr>
          <tr><td>Focus restore</td><td>Trigger element</td><td>Return focus to trigger on close</td></tr>
        </tbody>
      </table>
      <h2>Related Components</h2>
      <ul>
        <li><strong>Navigation</strong> — Top navigation bar for primary links</li>
        <li><strong>Bottom Sheet</strong> — Mobile-friendly panel from bottom edge</li>
        <li><strong>Dialog Box</strong> — Centered modal for focused interactions</li>
        <li><strong>Tabs</strong> — Alternative navigation for content sections</li>
      </ul>
    </>
  );
}

/* ── TAB 4 — Changelog ── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added <code>persistent</code> mode for always-visible sidebars</li>
        <li>Added <code>header</code> and <code>footer</code> slot props</li>
        <li>Added right-side drawer support</li>
        <li>Added focus trap and focus restore for overlay mode</li>
        <li>Improved slide animation with spring easing</li>
        <li>Added <code>width</code> prop for custom drawer width</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with left-side overlay drawer</li>
        <li>Backdrop overlay with click-to-dismiss</li>
        <li>Basic navigation item component</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function SideDrawerPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Side Drawer" description="Slide-in navigation panels from the left or right edge with overlay backdrop and persistent mode." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
