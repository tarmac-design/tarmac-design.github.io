'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="rating" />
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
      <pre><code>{`import { Rating } from '@tarmac/design-system';`}</code></pre>
      <h2>Component API</h2>
      <pre><code>{`interface RatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  precision?: 0.5 | 1;
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  onChange?: (value: number) => void;
  onHover?: (value: number) => void;
  disabled?: boolean;
  color?: string;
}`}</code></pre>
      <h2>Basic Usage</h2>
      <pre><code>{`// Interactive rating
<Rating defaultValue={0} onChange={val => console.log(val)} />

// Read-only
<Rating value={4.5} readOnly />

// Half-star precision
<Rating value={3.5} precision={0.5} readOnly showValue />

// With review count
<Rating value={4.2} readOnly showValue showCount count={128} />

// Custom size
<Rating size="lg" defaultValue={3} />`}</code></pre>
      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>rating-star-size-sm</td><td>16px</td></tr>
          <tr><td>rating-star-size-md</td><td>24px</td></tr>
          <tr><td>rating-star-size-lg</td><td>32px</td></tr>
          <tr><td>rating-color-filled</td><td>#F5A623</td></tr>
          <tr><td>rating-color-empty</td><td>#CCCCCC</td></tr>
          <tr><td>rating-gap</td><td>2px</td></tr>
        </tbody>
      </table>
      <h2>Storybook</h2>
      <p>
        Explore all rating variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-rating--playground" target="_blank" rel="noopener noreferrer">TARMAC Storybook →</a>
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
          <tr><td>1</td><td>Star Container</td><td>Row of star icons representing the rating scale</td></tr>
          <tr><td>2</td><td>Filled Star</td><td>Colored star indicating the current rating value</td></tr>
          <tr><td>3</td><td>Empty Star</td><td>Unfilled star for remaining scale</td></tr>
          <tr><td>4</td><td>Half Star</td><td>Partially filled star for fractional values</td></tr>
          <tr><td>5</td><td>Value Label</td><td>Optional numeric display of the rating</td></tr>
          <tr><td>6</td><td>Count Label</td><td>Optional review count text</td></tr>
        </tbody>
      </table>
      <h2>When to Use</h2>
      <ul>
        <li>Product or service reviews and feedback</li>
        <li>User satisfaction surveys</li>
        <li>Content quality indicators</li>
        <li>Displaying aggregate scores from multiple reviews</li>
      </ul>
      <h2>Best Practices</h2>
      <DoDont
        slug="rating"
        doItems={[
          'Use 5 stars as the default scale for familiarity',
          'Show the numeric value alongside stars for precision',
          'Use half-star precision for read-only aggregate ratings',
          'Provide hover feedback for interactive ratings',
          'Include review count for credibility',
        ]}
        dontItems={[
          'Don\'t use ratings for binary yes/no feedback',
          'Don\'t allow fractional input — only display fractional values',
          'Don\'t use custom scales (e.g., 10 stars) without clear labels',
          'Don\'t hide the rating scale from screen readers',
          'Don\'t auto-submit on rating selection without confirmation',
        ]}
      />
      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>radiogroup</td><td>Groups stars as selectable options</td></tr>
          <tr><td>aria-label</td><td>&quot;Rating&quot;</td><td>Describes the rating component</td></tr>
          <tr><td>aria-valuenow</td><td>number</td><td>Current rating value</td></tr>
          <tr><td>aria-valuemin</td><td>0</td><td>Minimum rating</td></tr>
          <tr><td>aria-valuemax</td><td>5</td><td>Maximum rating</td></tr>
          <tr><td>Keyboard</td><td>Arrow keys</td><td>Navigate and set rating with arrow keys</td></tr>
        </tbody>
      </table>
      <h2>Related Components</h2>
      <ul>
        <li><strong>Slider</strong> — Continuous value selection on a track</li>
        <li><strong>Progress Bar</strong> — Visual representation of completion</li>
        <li><strong>Input</strong> — Numeric input for precise value entry</li>
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
        <li>Added half-star precision support</li>
        <li>Added <code>showValue</code> and <code>showCount</code> props</li>
        <li>Added hover preview with scale animation</li>
        <li>Added 3 size variants: sm, md, lg</li>
        <li>Improved keyboard navigation with arrow keys</li>
        <li>Added <code>disabled</code> state</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with interactive and read-only modes</li>
        <li>5-star scale with click-to-set behavior</li>
        <li>Single size (24px)</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function RatingPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Rating" description="Star-based rating component for collecting and displaying user feedback scores." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
