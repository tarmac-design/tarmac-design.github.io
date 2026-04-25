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
      <StorybookVariantViewer slug="scroll" />
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
      <pre><code>{`import { ScrollArea } from '@tarmac/design-system';`}</code></pre>
      <h2>Component API</h2>
      <pre><code>{`interface ScrollAreaProps {
  direction?: 'vertical' | 'horizontal' | 'both';
  autoHide?: boolean;
  autoHideDelay?: number;
  thumbColor?: string;
  trackColor?: string;
  scrollbarWidth?: 'thin' | 'normal';
  smooth?: boolean;
  maxHeight?: string | number;
  maxWidth?: string | number;
  onScroll?: (event: React.UIEvent) => void;
  children: ReactNode;
}`}</code></pre>
      <h2>Basic Usage</h2>
      <pre><code>{`// Vertical scroll
<ScrollArea maxHeight={300}>
  <LongContent />
</ScrollArea>

// Horizontal scroll
<ScrollArea direction="horizontal" maxWidth={400}>
  <WideContent />
</ScrollArea>

// Both directions
<ScrollArea direction="both" maxHeight={300} maxWidth={400}>
  <LargeContent />
</ScrollArea>

// Auto-hide scrollbar
<ScrollArea autoHide autoHideDelay={1000}>
  <Content />
</ScrollArea>`}</code></pre>
      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>scroll-thumb-width</td><td>6px</td></tr>
          <tr><td>scroll-thumb-radius</td><td>3px</td></tr>
          <tr><td>scroll-thumb-color</td><td>#BBBBBB</td></tr>
          <tr><td>scroll-thumb-hover</td><td>#999999</td></tr>
          <tr><td>scroll-track-color</td><td>#EFEFEF</td></tr>
          <tr><td>scroll-autohide-delay</td><td>1000ms</td></tr>
        </tbody>
      </table>
      <h2>Storybook</h2>
      <p>
        Explore all scroll variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-scroll--playground" target="_blank" rel="noopener noreferrer">TARMAC Storybook →</a>
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
          <tr><td>1</td><td>Container</td><td>Fixed-size wrapper that clips overflowing content</td></tr>
          <tr><td>2</td><td>Content</td><td>Scrollable inner content that exceeds container bounds</td></tr>
          <tr><td>3</td><td>Track</td><td>Background rail for the scrollbar</td></tr>
          <tr><td>4</td><td>Thumb</td><td>Draggable indicator showing scroll position</td></tr>
          <tr><td>5</td><td>Corner</td><td>Intersection area when both scrollbars are visible</td></tr>
        </tbody>
      </table>
      <h2>When to Use</h2>
      <ul>
        <li>Long lists or tables that need bounded height</li>
        <li>Horizontal card carousels or image galleries</li>
        <li>Code blocks or log viewers with overflow</li>
        <li>Chat windows or message feeds</li>
      </ul>
      <h2>Best Practices</h2>
      <DoDont
        slug="scroll"
        doItems={[
          'Use thin scrollbars for a clean, modern look',
          'Provide visual cues that content is scrollable (fade edges)',
          'Use auto-hide for cleaner UI when scrollbar is not needed',
          'Ensure scrollbar contrast meets accessibility standards',
          'Support both mouse wheel and touch gestures',
        ]}
        dontItems={[
          'Don\'t hide scrollbars completely — users need scroll affordance',
          'Don\'t nest scrollable areas in the same direction',
          'Don\'t use custom scroll for very short content',
          'Don\'t override native scroll behavior on mobile',
          'Don\'t make scrollbar thumb too small to grab',
        ]}
      />
      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>region</td><td>Identifies scrollable area as a landmark</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Describes the scrollable content</td></tr>
          <tr><td>tabindex</td><td>0</td><td>Makes container focusable for keyboard scroll</td></tr>
          <tr><td>Keyboard</td><td>Arrow / Page keys</td><td>Scroll with keyboard when focused</td></tr>
        </tbody>
      </table>
      <h2>Related Components</h2>
      <ul>
        <li><strong>List</strong> — Structured list items often wrapped in scroll areas</li>
        <li><strong>Pagination</strong> — Alternative to scrolling for large datasets</li>
        <li><strong>Bottom Sheet</strong> — Scrollable content in a modal panel</li>
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
        <li>Added <code>autoHide</code> prop with configurable delay</li>
        <li>Added bidirectional scroll support</li>
        <li>Custom thumb and track color tokens</li>
        <li>Added <code>smooth</code> scroll behavior option</li>
        <li>Improved keyboard navigation support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with vertical and horizontal scroll</li>
        <li>Custom thin scrollbar styling</li>
        <li>Cross-browser scrollbar support</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function ScrollPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Scroll" description="Custom-styled scrollbar containers for overflowing content with thin, themed scrollbars." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
