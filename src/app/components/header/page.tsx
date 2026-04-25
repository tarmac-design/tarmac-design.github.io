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
      <StorybookVariantViewer slug="header" />
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
      <pre><code>{`import { Header, HeaderNav, HeaderAction } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface HeaderProps {
  variant?: 'default' | 'search' | 'breadcrumbs' | 'transparent' | 'sticky';
  logo?: ReactNode;
  navItems?: NavItem[];
  actions?: ReactNode;
  onSearch?: (query: string) => void;
  breadcrumbs?: Breadcrumb[];
  sticky?: boolean;
  transparent?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface Breadcrumb {
  label: string;
  href?: string;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default header
<Header
  logo={<Logo />}
  navItems={[
    { label: 'Home', href: '/', active: true },
    { label: 'Components', href: '/components' },
  ]}
  actions={<Avatar />}
/>

// With search
<Header variant="search" onSearch={handleSearch} />

// Sticky header
<Header variant="sticky" sticky />

// With breadcrumbs
<Header
  variant="breadcrumbs"
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Header' },
  ]}
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>header-height</td><td>48px</td></tr>
          <tr><td>header-padding-x</td><td>20px</td></tr>
          <tr><td>header-border-bottom</td><td>1px solid var(--color-outline)</td></tr>
          <tr><td>header-nav-font-size</td><td>13px</td></tr>
          <tr><td>header-nav-font-weight</td><td>500</td></tr>
          <tr><td>header-z-index</td><td>10</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all header variants in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-header--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Full-width bar with bottom border</td></tr>
          <tr><td>2</td><td>Logo</td><td>Brand mark linking to home</td></tr>
          <tr><td>3</td><td>Navigation</td><td>Horizontal link list with active indicator</td></tr>
          <tr><td>4</td><td>Search</td><td>Optional expandable search input</td></tr>
          <tr><td>5</td><td>User Avatar</td><td>Account access and profile menu trigger</td></tr>
          <tr><td>6</td><td>Hamburger Menu</td><td>Mobile navigation toggle</td></tr>
          <tr><td>7</td><td>Breadcrumbs</td><td>Optional secondary row showing page hierarchy</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>As the primary navigation bar on every page</li>
        <li>To provide quick access to search functionality</li>
        <li>To show the user&apos;s account status and avatar</li>
        <li>With breadcrumbs for deep navigation hierarchies</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="header"
        doItems={[
          'Keep navigation items to 5–7 maximum',
          'Highlight the active navigation item clearly',
          'Provide a mobile-friendly hamburger menu',
          'Use sticky variant for long-scrolling pages',
          'Ensure the logo links back to the home page',
        ]}
        dontItems={[
          'Don\'t overcrowd the header with too many actions',
          'Don\'t hide primary navigation behind a hamburger on desktop',
          'Don\'t use transparent variant over busy backgrounds without blur',
          'Don\'t place critical actions only in the mobile menu',
          'Don\'t use multiple header bars on the same page',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>banner</td><td>Landmark role for the header region</td></tr>
          <tr><td>nav</td><td>aria-label=&quot;Main&quot;</td><td>Wraps navigation links</td></tr>
          <tr><td>aria-expanded</td><td>boolean</td><td>Mobile menu open state</td></tr>
          <tr><td>aria-current</td><td>&quot;page&quot;</td><td>Marks the active navigation item</td></tr>
          <tr><td>Keyboard</td><td>Tab, Enter, Escape</td><td>Navigate and toggle menu</td></tr>
          <tr><td>Skip link</td><td>—</td><td>Provide &quot;Skip to content&quot; link before header</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Footer</strong> — Bottom-of-page navigation</li>
        <li><strong>Navigation</strong> — Sidebar and tab navigation</li>
        <li><strong>Breadcrumbs</strong> — Standalone breadcrumb trail</li>
        <li><strong>Search</strong> — Full search input component</li>
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
        <li>Added transparent and sticky variants</li>
        <li>Added breadcrumb sub-header support</li>
        <li>Added expandable search input</li>
        <li>Improved mobile hamburger menu with animation</li>
        <li>Added skip-to-content link support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with logo, navigation, and avatar</li>
        <li>Basic responsive hamburger menu</li>
      </ul>
    </>
  );
}

/* ─── Page Export ─── */
export default function HeaderPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Header"
      description="Headers provide top-level navigation, branding, search, and user account access."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
