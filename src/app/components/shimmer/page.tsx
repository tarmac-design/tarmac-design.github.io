'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="shimmer" />
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
      <pre><code>{`import { Shimmer, ShimmerText, ShimmerCircle, ShimmerCard } from '@tarmac/design-system';`}</code></pre>
      <h2>Component API</h2>
      <pre><code>{`interface ShimmerProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  duration?: number;
  className?: string;
}

interface ShimmerTextProps {
  lines?: number;
  lineHeight?: number;
  gap?: number;
  lastLineWidth?: string;
}

interface ShimmerCircleProps {
  size?: number;
}

interface ShimmerCardProps {
  imageHeight?: number;
  lines?: number;
}

interface ShimmerListItemProps {
  avatarSize?: number;
  lines?: number;
  showAction?: boolean;
}`}</code></pre>
      <h2>Basic Usage</h2>
      <pre><code>{`// Basic shimmer block
<Shimmer width={200} height={20} borderRadius={4} />

// Text placeholder
<ShimmerText lines={3} />

// Avatar placeholder
<ShimmerCircle size={48} />

// Card placeholder
<ShimmerCard imageHeight={120} lines={2} />

// Conditional rendering
{isLoading ? <ShimmerText lines={3} /> : <ActualContent />}`}</code></pre>
      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>shimmer-base-light</td><td>#E0E0E0</td></tr>
          <tr><td>shimmer-shine-light</td><td>#F0F0F0</td></tr>
          <tr><td>shimmer-base-dark</td><td>#333333</td></tr>
          <tr><td>shimmer-shine-dark</td><td>#444444</td></tr>
          <tr><td>shimmer-duration</td><td>1.5s</td></tr>
          <tr><td>shimmer-border-radius</td><td>4px</td></tr>
        </tbody>
      </table>
      <h2>Storybook</h2>
      <p>
        Explore all shimmer variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/index.html?path=/story/tarmac-tds-shimmer--playground" target="_blank" rel="noopener noreferrer">TARMAC Storybook →</a>
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
          <tr><td>1</td><td>Base Layer</td><td>Solid background color matching the content shape</td></tr>
          <tr><td>2</td><td>Gradient Sweep</td><td>Animated lighter gradient moving left to right</td></tr>
          <tr><td>3</td><td>Shape Mask</td><td>Border radius and dimensions matching the target content</td></tr>
        </tbody>
      </table>
      <h2>When to Use</h2>
      <ul>
        <li>While fetching data from an API</li>
        <li>During initial page load for content-heavy sections</li>
        <li>As placeholder for images that are still downloading</li>
        <li>In lists and grids where items load progressively</li>
      </ul>
      <h2>Best Practices</h2>
      <DoDont
        slug="shimmer"
        doItems={[
          'Match shimmer shapes to the actual content layout',
          'Use consistent animation speed across all shimmers',
          'Replace shimmers with content as soon as data arrives',
          'Use shimmer for content that takes > 300ms to load',
          'Combine multiple shimmer shapes for realistic placeholders',
        ]}
        dontItems={[
          'Don\'t use shimmer for actions that complete instantly',
          'Don\'t animate shimmer too fast — it creates visual noise',
          'Don\'t use shimmer as a permanent placeholder for missing data',
          'Don\'t mix shimmer with spinner loading indicators',
          'Don\'t use shimmer for error states',
        ]}
      />
      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>status</td><td>Indicates loading state to screen readers</td></tr>
          <tr><td>aria-label</td><td>&quot;Loading&quot;</td><td>Describes the loading state</td></tr>
          <tr><td>aria-busy</td><td>true</td><td>Indicates content is being loaded</td></tr>
          <tr><td>prefers-reduced-motion</td><td>pause animation</td><td>Respect user motion preferences</td></tr>
        </tbody>
      </table>
      <h2>Related Components</h2>
      <ul>
        <li><strong>Spinner</strong> — Circular loading indicator for actions</li>
        <li><strong>Progress Bar</strong> — Determinate loading with percentage</li>
        <li><strong>Cards</strong> — Common target for shimmer placeholders</li>
        <li><strong>List</strong> — List items with shimmer loading states</li>
      </ul>
    </>
  );
}

/* ── TAB 4 — Changelog ── */
const shimmerChangelog: ChangelogEntry[] = [
  { version: '1.1.2', date: 'June, 2026', author: 'Rohan', changes: [{ category: 'Changed', items: ['Updated component configuration'] }] },
  { version: '1.1.0', date: 'April, 2026', author: 'Rohan', changes: [{ category: 'Added', items: ['Added dark mode & and added variant with rounded corners'] }] },
  { version: '1.0.1', date: 'April, 2026', author: 'Rohan', changes: [{ category: 'Changed', items: ['Prototype updated'] }] },
  { version: '1.0.0', date: 'March, 2026', author: 'Rohan', changes: [{ category: 'Added', items: ['Component published'] }] },
];

function ChangelogTab() {
  return <Changelog entries={shimmerChangelog} />;
}

/* ── Page Export ── */
export default function ShimmerPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Shimmer" description="Animated loading placeholders that mimic content shapes with a gradient sweep animation." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
