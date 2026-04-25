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
      <StorybookVariantViewer slug="filter" />
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
      <pre><code>{`import { Filter, FilterOption, ChipFilter } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface FilterProps {
  variant?: 'single' | 'multi' | 'search' | 'date' | 'chip';
  size?: 'sm' | 'md' | 'lg';
  options: FilterOption[];
  selected?: string[];
  onChange?: (selected: string[]) => void;
  onClear?: () => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
}

interface FilterOption {
  label: string;
  value: string;
  count?: number;
  disabled?: boolean;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Multi-select filter
<Filter
  variant="multi"
  options={categories}
  selected={selected}
  onChange={setSelected}
  placeholder="Category"
/>

// Single select
<Filter variant="single" options={statusOptions} />

// With search
<Filter variant="search" searchable options={longList} />

// Chip filters
<ChipFilter options={tags} selected={activeTags} onChange={setActiveTags} />`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>filter-trigger-height-sm</td><td>32px</td></tr>
          <tr><td>filter-trigger-height-md</td><td>36px</td></tr>
          <tr><td>filter-trigger-height-lg</td><td>44px</td></tr>
          <tr><td>filter-dropdown-radius</td><td>8px</td></tr>
          <tr><td>filter-chip-radius</td><td>16px</td></tr>
          <tr><td>filter-dropdown-shadow</td><td>0 4px 12px rgba(0,0,0,0.1)</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all filter variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-filter--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Trigger</td><td>Button that opens the filter dropdown</td></tr>
          <tr><td>2</td><td>Count Badge</td><td>Shows number of active selections</td></tr>
          <tr><td>3</td><td>Dropdown Panel</td><td>Container for filter options</td></tr>
          <tr><td>4</td><td>Search Input</td><td>Optional text field to filter options</td></tr>
          <tr><td>5</td><td>Option Row</td><td>Checkbox/radio with label for each option</td></tr>
          <tr><td>6</td><td>Clear Action</td><td>Button to reset all selections</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To narrow down large data sets by category, status, or date</li>
        <li>In table headers for column-level filtering</li>
        <li>As faceted search controls in e-commerce or dashboards</li>
        <li>For quick inline filtering with chip-based controls</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="filter"
        doItems={[
          'Show the count of active filters on the trigger',
          'Provide a clear all action when filters are active',
          'Use single select for mutually exclusive options',
          'Add search for lists with more than 10 options',
          'Persist filter state across page navigation',
        ]}
        dontItems={[
          'Don\'t nest filters more than one level deep',
          'Don\'t auto-close the dropdown on each selection in multi-select',
          'Don\'t use filters for fewer than 3 options — use radio buttons instead',
          'Don\'t hide the active filter count from users',
          'Don\'t mix chip filters and dropdown filters for the same data set',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>listbox / group</td><td>Identifies the filter list semantically</td></tr>
          <tr><td>aria-expanded</td><td>boolean</td><td>Indicates dropdown open state</td></tr>
          <tr><td>aria-selected</td><td>boolean</td><td>Marks selected options</td></tr>
          <tr><td>Keyboard</td><td>Arrow keys, Space, Enter, Escape</td><td>Navigate and select options</td></tr>
          <tr><td>Focus trap</td><td>—</td><td>Focus stays within open dropdown</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Dropdown</strong> — Generic select control for single values</li>
        <li><strong>Checkbox</strong> — Standalone multi-select control</li>
        <li><strong>Pills</strong> — Toggleable chip elements</li>
        <li><strong>Search</strong> — Full-text search input</li>
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
        <li>Added chip filter variant</li>
        <li>Added searchable dropdown with debounced input</li>
        <li>Added date range filter variant</li>
        <li>Added selected count badge on trigger</li>
        <li>Improved keyboard navigation and focus management</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with single and multi-select variants</li>
        <li>Basic dropdown with checkbox options</li>
        <li>Clear all action</li>
      </ul>
    </>
  );
}

/* ─── Page Export ─── */
export default function FilterPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Filter"
      description="Filters let users narrow content by selecting criteria from dropdowns, checkboxes, or chips."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
