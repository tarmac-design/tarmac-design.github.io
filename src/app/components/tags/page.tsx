'use client';

import { useState, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="tags" />
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
      <pre><code>{`import { Tag } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface TagProps {
  variant?: 'black' | 'white' | 'coal' | 'blue' | 'success' | 'error'
           | 'warning' | 'dlv-red' | 'legacy-blue';
  label: string;
  icon?: ReactNode;
  closable?: boolean;
  statusDot?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  onClick?: () => void;
  onClose?: () => void;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Simple tag
<Tag label="React" />

// Variant colors
<Tag variant="success" label="Active" />
<Tag variant="error" label="Deprecated" />
<Tag variant="dlv-red" label="Urgent" />

// With leading icon
<Tag variant="blue" label="Tagged" icon={<TagIcon />} />

// Closable tag
<Tag variant="coal" label="Filter" closable onClose={() => handleRemove()} />

// With status dot
<Tag variant="black" label="Online" statusDot />

// Disabled state
<Tag variant="blue" label="Archived" disabled />

// Size variants
<Tag variant="blue" size="sm" label="Small" />
<Tag variant="blue" size="md" label="Medium" />`}</code></pre>

      <h2>Closable Tag List</h2>
      <pre><code>{`function TagList() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS']);

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tags.map(tag => (
        <Tag
          key={tag}
          label={tag}
          closable
          onClose={() => removeTag(tag)}
        />
      ))}
    </div>
  );
}`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>tag-height-sm</td><td>24px</td></tr>
          <tr><td>tag-height-md</td><td>32px</td></tr>
          <tr><td>tag-border-radius</td><td>9999px (pill)</td></tr>
          <tr><td>tag-font-size-sm</td><td>11px</td></tr>
          <tr><td>tag-font-size-md</td><td>13px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Background</th><th>Text</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>#FFFFFF</td></tr>
          <tr><td>white</td><td>#FFFFFF</td><td>#0D0D0D</td></tr>
          <tr><td>coal</td><td>#525252</td><td>#FFFFFF</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>#FFFFFF</td></tr>
          <tr><td>success</td><td>#1BA86E</td><td>#FFFFFF</td></tr>
          <tr><td>error</td><td>#DC143C</td><td>#FFFFFF</td></tr>
          <tr><td>warning</td><td>#CF9F02</td><td>#FFFFFF</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>#FFFFFF</td></tr>
          <tr><td>legacy-blue</td><td>#1A73E8</td><td>#FFFFFF</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all tag variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-tag--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Fully rounded pill wrapper defining the tag boundary</td></tr>
          <tr><td>2</td><td>Background</td><td>Color fill determined by variant</td></tr>
          <tr><td>3</td><td>Label</td><td>Keyword text — category, topic, or filter name</td></tr>
          <tr><td>4</td><td>Leading Icon</td><td>Optional icon before the label for visual context</td></tr>
          <tr><td>5</td><td>Status Dot</td><td>Optional colored dot indicating live status</td></tr>
          <tr><td>6</td><td>Close Button</td><td>Optional × button for removable tags</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To label content with keywords or categories</li>
        <li>As removable filter chips in search or filter interfaces</li>
        <li>To display technology stacks, skills, or topic labels</li>
        <li>To show applied filters that users can dismiss</li>
        <li>For content tagging in articles, products, or listings</li>
      </ul>

      <h2>Tags vs Badges</h2>
      <table>
        <thead><tr><th>Aspect</th><th>Tags</th><th>Badges</th></tr></thead>
        <tbody>
          <tr><td>Shape</td><td>Fully rounded pill (border-radius: 9999px)</td><td>Slightly rounded (border-radius: 4px)</td></tr>
          <tr><td>Purpose</td><td>Content categorization and keywords</td><td>Status indicators and counts</td></tr>
          <tr><td>Interaction</td><td>Often closable/removable</td><td>Typically static</td></tr>
          <tr><td>Semantics</td><td>User-applied or content-derived labels</td><td>System-generated status</td></tr>
        </tbody>
      </table>

      <h2>Best Practices</h2>
      <DoDont
        slug="tags"
        doItems={[
          'Use tags for content categorization and keyword labeling',
          'Keep tag labels short — 1 to 3 words maximum',
          'Provide a close button when tags are user-removable',
          'Use consistent variant colors within the same context',
          'Include aria-label for screen readers on interactive tags',
        ]}
        dontItems={[
          'Don\'t use tags for status indicators — use badges instead',
          'Don\'t use tags for long text or full sentences',
          'Don\'t mix too many color variants in a single group',
          'Don\'t use tags as primary action buttons',
          'Don\'t disable tags without clear visual indication',
        ]}
      />

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should be 1–3 words maximum</li>
        <li>Use sentence case for keyword tags (e.g., &quot;Design system&quot;)</li>
        <li>Use title case for proper nouns (e.g., &quot;TypeScript&quot;, &quot;React&quot;)</li>
        <li>Icons should reinforce the label meaning, not replace it</li>
        <li>Status dots should only appear when live status is relevant</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>listitem</td><td>Identifies the tag within a list of tags</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Descriptive text for the tag content</td></tr>
          <tr><td>aria-disabled</td><td>boolean</td><td>Indicates disabled state to assistive tech</td></tr>
          <tr><td>Close button</td><td>aria-label=&quot;Remove [label]&quot;</td><td>Accessible label for the dismiss action</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Text against background meets WCAG AA</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter / Space</td><td>Focus and activate closable tags</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Badge</strong> — Compact status labels with counts and indicators</li>
        <li><strong>Pills</strong> — Interactive selectable chips with toggle behavior</li>
        <li><strong>Filter</strong> — Filter controls for narrowing content</li>
        <li><strong>Status Indicator</strong> — Standalone colored dots for presence</li>
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
        <li>Added <code>statusDot</code> prop for live status indication</li>
        <li>Added <code>closable</code> prop with accessible close button</li>
        <li>Added <code>disabled</code> state support</li>
        <li>Added leading icon support via <code>icon</code> prop</li>
        <li>New variants: Legacy Blue, DLV Red</li>
        <li>Two sizes: Small (24px) and Medium (32px)</li>
        <li>Pill shape (border-radius: 9999px) for visual distinction from badges</li>
        <li>Hover scale and press scale interaction states</li>
        <li>Improved accessibility with aria-disabled and descriptive close labels</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with basic keyword tag support</li>
        <li>5 color variants: Black, White, Blue, Success, Error</li>
        <li>Single size (28px)</li>
        <li>Static display only — no close or icon support</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function TagsPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Tags"
      description="Tags are keyword labels used for content categorization and tagging."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
