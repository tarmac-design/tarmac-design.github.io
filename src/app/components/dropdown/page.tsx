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
      <StorybookVariantViewer slug="dropdown" />
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
      <pre><code>{`import { Dropdown } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface DropdownProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  searchable?: boolean;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default single-select
<Dropdown
  options={[
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ]}
  value={selected}
  onChange={setSelected}
  placeholder="Select a fruit"
/>

// Searchable dropdown
<Dropdown
  options={countries}
  value={country}
  onChange={setCountry}
  searchable
  placeholder="Search countries..."
/>

// Multi-select
<Dropdown
  options={tags}
  multiSelect
  selectedValues={selectedTags}
  onMultiChange={setSelectedTags}
  placeholder="Select tags"
/>

// Disabled
<Dropdown
  options={options}
  disabled
  placeholder="Not available"
/>

// Size variants
<Dropdown options={options} size="sm" placeholder="Small" />
<Dropdown options={options} size="md" placeholder="Medium" />
<Dropdown options={options} size="lg" placeholder="Large" />`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>dropdown-trigger-height-sm</td><td>32px</td></tr>
          <tr><td>dropdown-trigger-height-md</td><td>40px</td></tr>
          <tr><td>dropdown-trigger-height-lg</td><td>48px</td></tr>
          <tr><td>dropdown-border-radius</td><td>8px</td></tr>
          <tr><td>dropdown-menu-max-height</td><td>260px</td></tr>
          <tr><td>dropdown-option-padding</td><td>8px 12px</td></tr>
          <tr><td>dropdown-z-index</td><td>1000</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all dropdown variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-dropdown--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Trigger</td><td>Button that opens the dropdown menu</td></tr>
          <tr><td>2</td><td>Selected Value</td><td>Display of current selection in the trigger</td></tr>
          <tr><td>3</td><td>Chevron</td><td>Arrow icon indicating expandability, rotates when open</td></tr>
          <tr><td>4</td><td>Menu</td><td>Floating panel containing the option list</td></tr>
          <tr><td>5</td><td>Option</td><td>Individual selectable item with hover highlight</td></tr>
          <tr><td>6</td><td>Search Input</td><td>Optional filter field at top of menu</td></tr>
          <tr><td>7</td><td>Group Header</td><td>Label for grouped option sections</td></tr>
          <tr><td>8</td><td>Checkbox</td><td>Selection indicator in multi-select mode</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To select from a list of 5 or more options</li>
        <li>When screen space is limited and a full list would be too large</li>
        <li>For form fields requiring a single or multiple selection</li>
        <li>When options need to be searchable or grouped</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="dropdown"
        doItems={[
          'Use for selecting from 5+ options',
          'Show a clear placeholder or default value',
          'Add search for lists with 10+ options',
          'Group related options with section headers',
          'Support keyboard navigation (arrow keys, Enter, Escape)',
        ]}
        dontItems={[
          'Don\'t use for fewer than 5 options — use radio buttons instead',
          'Don\'t nest dropdowns inside other dropdowns',
          'Don\'t use for navigation — use a menu component instead',
          'Don\'t truncate option labels — keep them concise',
          'Don\'t use without a visible label or placeholder',
        ]}
      />

      <h2>Content Guidelines</h2>
      <ul>
        <li>Keep option labels concise and scannable</li>
        <li>Use sentence case for option text</li>
        <li>Placeholder text should describe the expected selection</li>
        <li>Group headers should be short uppercase labels</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>listbox</td><td>ARIA listbox pattern for the option list</td></tr>
          <tr><td>aria-expanded</td><td>true | false</td><td>Indicates menu open state on trigger</td></tr>
          <tr><td>aria-haspopup</td><td>listbox</td><td>Declares popup type on trigger</td></tr>
          <tr><td>aria-selected</td><td>true | false</td><td>Marks the currently selected option</td></tr>
          <tr><td>Keyboard</td><td>Enter / Space</td><td>Opens menu or selects option</td></tr>
          <tr><td>Keyboard</td><td>Arrow keys</td><td>Navigate between options</td></tr>
          <tr><td>Keyboard</td><td>Escape</td><td>Closes the menu</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Radio</strong> — Use for fewer than 5 mutually exclusive options</li>
        <li><strong>Checkbox</strong> — Use for independent boolean selections</li>
        <li><strong>Search</strong> — Standalone search input for filtering content</li>
        <li><strong>Filter</strong> — Compound filter controls with multiple criteria</li>
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
        <li>Added <code>searchable</code> prop with built-in filter input</li>
        <li>Added <code>multiSelect</code> mode with checkbox indicators</li>
        <li>Added grouped options with section headers</li>
        <li>Added <code>ghost</code> skeleton variant</li>
        <li>New size variants: SM (32px), MD (40px), LG (48px)</li>
        <li>Improved accessibility with ARIA listbox pattern</li>
        <li>Click-outside dismissal and chevron rotation animation</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with single-select dropdown</li>
        <li>Trigger button with chevron indicator</li>
        <li>Basic option list with selected state highlight</li>
        <li>Disabled state support</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function DropdownPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Dropdown"
      description="Dropdowns allow users to select from a list of options in a collapsible menu."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
