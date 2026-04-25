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
      <StorybookVariantViewer slug="badge" />
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
      <pre><code>{`import { Badge } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface BadgeProps {
  variant?: 'black' | 'white' | 'coal' | 'dlv-red' | 'blue' | 'success' | 'warning' | 'error';
  style?: 'filled' | 'subtle' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  closable?: boolean;
  children: ReactNode;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Filled badge (default)
<Badge variant="success">Active</Badge>

// Subtle style
<Badge variant="blue" style="subtle">Info</Badge>

// Outlined style
<Badge variant="error" style="outlined">Critical</Badge>

// With leading icon
<Badge variant="warning" icon={<AlertIcon />}>Pending</Badge>

// Closable badge
<Badge variant="coal" closable onClose={() => handleRemove()}>
  Filter Tag
</Badge>

// Size variants
<Badge variant="blue" size="sm">Small</Badge>
<Badge variant="blue" size="md">Medium</Badge>
<Badge variant="blue" size="lg">Large</Badge>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>badge-height-sm</td><td>20px</td></tr>
          <tr><td>badge-height-md</td><td>24px</td></tr>
          <tr><td>badge-height-lg</td><td>28px</td></tr>
          <tr><td>badge-border-radius</td><td>4px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Background</th><th>Text</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>#FFFFFF</td></tr>
          <tr><td>white</td><td>#FFFFFF</td><td>#0D0D0D</td></tr>
          <tr><td>coal</td><td>#525252</td><td>#FFFFFF</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>#FFFFFF</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>#FFFFFF</td></tr>
          <tr><td>success</td><td>#1BA86E</td><td>#FFFFFF</td></tr>
          <tr><td>warning</td><td>#CF9F02</td><td>#FFFFFF</td></tr>
          <tr><td>error</td><td>#DC143C</td><td>#FFFFFF</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all badge variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-badge--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Rounded pill wrapper defining the badge boundary</td></tr>
          <tr><td>2</td><td>Background</td><td>Color fill determined by variant and style</td></tr>
          <tr><td>3</td><td>Label</td><td>Text content — status, count, or category name</td></tr>
          <tr><td>4</td><td>Leading Icon</td><td>Optional icon before the label</td></tr>
          <tr><td>5</td><td>Close Button</td><td>Optional dismiss action for removable badges</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To display status labels (Active, Pending, Error)</li>
        <li>To show counts or numeric indicators</li>
        <li>To categorize or tag items in lists and tables</li>
        <li>As removable filter chips in search interfaces</li>
        <li>To highlight priority or severity levels</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="badge"
        doItems={[
          'Use semantic color variants — green for success, red for error',
          'Keep badge labels short and scannable (1–2 words)',
          'Use consistent sizing within the same context',
          'Provide aria-label for screen readers when meaning is color-dependent',
          'Use subtle or outlined styles for lower-emphasis contexts',
        ]}
        dontItems={[
          'Don\'t use badges for long text or sentences',
          'Don\'t mix filled and outlined styles in the same group',
          'Don\'t rely on color alone to convey meaning',
          'Don\'t use badges as primary action buttons',
          'Don\'t use more than 3–4 badges in a single row',
        ]}
      />

      <h2>Style Guide</h2>
      <table>
        <thead><tr><th>Style</th><th>Use Case</th><th>Emphasis</th></tr></thead>
        <tbody>
          <tr><td>Filled</td><td>Primary status, high-visibility labels</td><td>High</td></tr>
          <tr><td>Subtle</td><td>Secondary info, inline metadata</td><td>Medium</td></tr>
          <tr><td>Outlined</td><td>Tertiary labels, low-emphasis tags</td><td>Low</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should be 1–2 words maximum</li>
        <li>Use title case for status labels (e.g., &quot;In Progress&quot;)</li>
        <li>Numeric badges should show the actual count or &quot;99+&quot; for overflow</li>
        <li>Icons should reinforce the label meaning, not replace it</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>status</td><td>Identifies the badge as a status indicator</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Descriptive text when color conveys meaning</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Text against background meets WCAG AA</td></tr>
          <tr><td>Close button</td><td>aria-label=&quot;Remove&quot;</td><td>Accessible label for the dismiss action</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter / Space</td><td>Focus and activate closable badges</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Pills</strong> — Interactive selectable chips with toggle behavior</li>
        <li><strong>Tags</strong> — Keyword labels for content categorization</li>
        <li><strong>Status Indicator</strong> — Standalone colored dots for presence</li>
        <li><strong>Avatar</strong> — Badges can overlay avatars for notification counts</li>
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
        <li>Added <code>subtle</code> and <code>outlined</code> style variants</li>
        <li>Added <code>ghost</code> and <code>disabled</code> states</li>
        <li>Added <code>closable</code> prop with close button</li>
        <li>Added leading and trailing icon support</li>
        <li>New color variants: Coal, DLV Red, Cardbox</li>
        <li>Updated sizing tokens: SM (20px), MD (24px), LG (28px)</li>
        <li>Improved accessibility with role=&quot;status&quot; and aria-label support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with Numeric, Dot, and Standalone variants</li>
        <li>5 color options: Error, Warning, Success, Info, Neutral</li>
        <li>Single size (20px)</li>
        <li>Basic count overflow (99+)</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function BadgePage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Badge"
      description="Badges are compact labels used for status, counts, and categories."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
