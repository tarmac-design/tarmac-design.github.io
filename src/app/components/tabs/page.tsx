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
      <StorybookVariantViewer slug="tabs" />
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
      <pre><code>{`import { Tabs } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface TabsProps {
  items: {
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
  }[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  variant?: 'black' | 'blue' | 'dlv-red' | 'coal' | 'green';
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'lg';
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default horizontal tabs
<Tabs
  items={[
    { label: 'Overview' },
    { label: 'Features' },
    { label: 'Pricing' },
  ]}
  onChange={(index) => console.log('Active:', index)}
/>

// Vertical orientation
<Tabs
  items={[
    { label: 'General' },
    { label: 'Security' },
    { label: 'Notifications' },
  ]}
  orientation="vertical"
  variant="blue"
/>

// With icons
<Tabs
  items={[
    { label: 'Home', icon: <HomeIcon /> },
    { label: 'Settings', icon: <GearIcon /> },
    { label: 'Profile', icon: <UserIcon /> },
  ]}
  variant="dlv-red"
/>

// With disabled tabs
<Tabs
  items={[
    { label: 'Active' },
    { label: 'Normal' },
    { label: 'Disabled', disabled: true },
  ]}
/>

// Small size
<Tabs
  items={[
    { label: 'Tab 1' },
    { label: 'Tab 2' },
  ]}
  size="sm"
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>tab-height-sm</td><td>36px</td></tr>
          <tr><td>tab-height-lg</td><td>48px</td></tr>
          <tr><td>tab-indicator-height</td><td>2px</td></tr>
          <tr><td>tab-font-size-sm</td><td>13px</td></tr>
          <tr><td>tab-font-size-lg</td><td>15px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Active Color</th></tr></thead>
        <tbody>
          <tr><td>Black</td><td>#0D0D0D</td></tr>
          <tr><td>Blue</td><td>#2396FB</td></tr>
          <tr><td>DLV Red</td><td>#ED1B36</td></tr>
          <tr><td>Coal</td><td>#525252</td></tr>
          <tr><td>Green</td><td>#1BA86E</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all tab variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-tabs--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Tab List</td><td>Container for all tab triggers with role=&quot;tablist&quot;</td></tr>
          <tr><td>2</td><td>Tab Button</td><td>Individual clickable tab trigger</td></tr>
          <tr><td>3</td><td>Icon</td><td>Optional leading icon for visual context</td></tr>
          <tr><td>4</td><td>Label</td><td>Text label for the tab</td></tr>
          <tr><td>5</td><td>Active Indicator</td><td>2px border line showing the active tab</td></tr>
          <tr><td>6</td><td>Tab Panel</td><td>Content area for the active tab</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To organize related content into separate views</li>
        <li>When only one content panel should be visible at a time</li>
        <li>For settings pages with multiple categories</li>
        <li>To switch between data views (table, chart, list)</li>
        <li>For product detail pages with sections</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="tabs"
        doItems={[
          'Use tabs for switching between related content views',
          'Keep tab labels short and scannable (1–2 words)',
          'Show the active tab clearly with the indicator line',
          'Use consistent icon sizing when using icons',
          'Maintain tab content state when switching between tabs',
        ]}
        dontItems={[
          'Don\'t use tabs for sequential steps — use a Stepper instead',
          'Don\'t use more than 6 tabs without scrollable behavior',
          'Don\'t nest tabs inside tabs',
          'Don\'t use tabs for primary navigation — use a Navigation component',
          'Don\'t mix icon tabs and text-only tabs in the same group',
        ]}
      />

      <h2>Orientation Guide</h2>
      <table>
        <thead><tr><th>Orientation</th><th>Use Case</th><th>Indicator</th></tr></thead>
        <tbody>
          <tr><td>Horizontal</td><td>Primary content switching, top of content area</td><td>Bottom border (2px)</td></tr>
          <tr><td>Vertical</td><td>Side navigation, settings panels, filters</td><td>Left border (2px)</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should be 1–2 words maximum</li>
        <li>Use title case for tab labels (e.g., &quot;My Account&quot;)</li>
        <li>Icons should reinforce the label meaning, not replace it</li>
        <li>Disabled tabs should have a clear reason communicated to the user</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>tablist / tab / tabpanel</td><td>ARIA tabs pattern</td></tr>
          <tr><td>aria-selected</td><td>true | false</td><td>Indicates the active tab</td></tr>
          <tr><td>aria-disabled</td><td>true | false</td><td>Indicates a disabled tab</td></tr>
          <tr><td>aria-orientation</td><td>horizontal | vertical</td><td>Orientation of the tab list</td></tr>
          <tr><td>Keyboard</td><td>Arrow Left / Right</td><td>Navigate horizontal tabs</td></tr>
          <tr><td>Keyboard</td><td>Arrow Up / Down</td><td>Navigate vertical tabs</td></tr>
          <tr><td>Keyboard</td><td>Home / End</td><td>Jump to first or last tab</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Navigation</strong> — For primary app-level navigation</li>
        <li><strong>Stepper</strong> — For sequential multi-step flows</li>
        <li><strong>Accordion</strong> — For expandable content sections</li>
        <li><strong>Breadcrumbs</strong> — For hierarchical page navigation</li>
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
        <li>Added vertical orientation with left border indicator</li>
        <li>Added 5 color variants: Black, Blue, DLV Red, Coal, Green</li>
        <li>Added small and large size options</li>
        <li>Added icon support for tab items</li>
        <li>Added disabled state for individual tabs</li>
        <li>Added scrollable tab behavior for overflow</li>
        <li>Added editable tab labels</li>
        <li>Improved ARIA support with aria-orientation and aria-disabled</li>
        <li>Smooth transition animations on tab switch</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with horizontal underline tabs</li>
        <li>Basic active/inactive states</li>
        <li>Keyboard navigation with arrow keys</li>
        <li>Single color variant</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function TabsPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Tabs"
      description="Tabs organize content into separate views where only one view is visible at a time. They provide navigation between content panels with an active indicator."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
