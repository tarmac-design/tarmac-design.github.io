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
      <StorybookVariantViewer slug="breadcrumbs" />
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
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

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
