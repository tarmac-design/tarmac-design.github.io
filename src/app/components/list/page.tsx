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
      <StorybookVariantViewer slug="list" />
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
      <pre><code>{`import { List, ListItem, ListGroup } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface ListProps {
  variant?: 'simple' | 'avatar' | 'actions' | 'selectable' | 'grouped';
  items: ListItemData[];
  selected?: string[];
  onSelect?: (ids: string[]) => void;
  groups?: ListGroup[];
  divider?: boolean;
}

interface ListItemData {
  id: string;
  title: string;
  subtitle?: string;
  avatar?: ReactNode;
  trailing?: ReactNode;
  disabled?: boolean;
}

interface ListGroup {
  label: string;
  items: ListItemData[];
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Simple list
<List items={users} />

// With avatars
<List variant="avatar" items={users} />

// With trailing actions
<List variant="actions" items={users} />

// Selectable
<List variant="selectable" items={users} selected={selected} onSelect={setSelected} />

// Grouped
<List variant="grouped" groups={[
  { label: 'Design', items: designers },
  { label: 'Engineering', items: engineers },
]} />`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>list-item-padding</td><td>10px 14px</td></tr>
          <tr><td>list-item-gap</td><td>12px</td></tr>
          <tr><td>list-avatar-size</td><td>32px</td></tr>
          <tr><td>list-title-font-size</td><td>13px</td></tr>
          <tr><td>list-subtitle-font-size</td><td>12px</td></tr>
          <tr><td>list-divider</td><td>1px solid var(--color-outline)</td></tr>
          <tr><td>list-group-header-font-size</td><td>11px</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all list variants in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-list--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Bordered wrapper for the list</td></tr>
          <tr><td>2</td><td>Group Header</td><td>Optional section label for grouped lists</td></tr>
          <tr><td>3</td><td>Avatar</td><td>Optional leading visual (image or initials)</td></tr>
          <tr><td>4</td><td>Title</td><td>Primary text label</td></tr>
          <tr><td>5</td><td>Subtitle</td><td>Secondary descriptive text</td></tr>
          <tr><td>6</td><td>Trailing Action</td><td>Optional action button or chevron</td></tr>
          <tr><td>7</td><td>Selection Indicator</td><td>Check circle for selectable items</td></tr>
          <tr><td>8</td><td>Divider</td><td>Separator between items</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To display collections of related items vertically</li>
        <li>For contact lists, settings menus, or navigation drawers</li>
        <li>When items need selection or multi-select behavior</li>
        <li>To group items by category with section headers</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="list"
        doItems={[
          'Use consistent item heights within the same list',
          'Show hover states to indicate interactivity',
          'Use group headers to organize long lists',
          'Provide visual feedback for selected items',
          'Truncate long text with ellipsis rather than wrapping',
        ]}
        dontItems={[
          'Don\'t mix different list variants in the same container',
          'Don\'t use lists for fewer than 3 items — consider cards instead',
          'Don\'t nest lists more than one level deep',
          'Don\'t hide critical actions behind overflow menus',
          'Don\'t use selectable lists without clear selection indicators',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>list / listbox</td><td>Semantic role based on variant</td></tr>
          <tr><td>role (item)</td><td>listitem / option</td><td>Individual item role</td></tr>
          <tr><td>aria-selected</td><td>boolean</td><td>Selection state for selectable items</td></tr>
          <tr><td>Keyboard</td><td>Arrow keys, Space, Enter</td><td>Navigate and select items</td></tr>
          <tr><td>Focus</td><td>visible ring</td><td>Clear focus indicator on each item</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Cards</strong> — For richer content layouts</li>
        <li><strong>Dropdown</strong> — Single-value selection from a list</li>
        <li><strong>Navigation</strong> — Sidebar navigation lists</li>
        <li><strong>Avatar Group</strong> — Compact avatar display</li>
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
        <li>Added selectable variant with multi-select support</li>
        <li>Added grouped variant with section headers</li>
        <li>Added trailing action slot with overflow menu</li>
        <li>Improved hover and selection state styling</li>
        <li>Added keyboard navigation support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with simple and avatar variants</li>
        <li>Title and subtitle support</li>
        <li>Divider between items</li>
      </ul>
    </>
  );
}

/* ─── Page Export ─── */
export default function ListPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="List"
      description="Lists display vertical collections of items with avatars, subtitles, actions, and selection support."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
