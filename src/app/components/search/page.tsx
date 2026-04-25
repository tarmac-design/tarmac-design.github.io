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
      <StorybookVariantViewer slug="search" />
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
      <pre><code>{`import { Search, CommandPalette } from '@tarmac/design-system';`}</code></pre>
      <h2>Component API</h2>
      <pre><code>{`interface SearchProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  variant?: 'default' | 'suggestions' | 'expandable' | 'command';
  suggestions?: string[];
  loading?: boolean;
  onSearch?: (query: string) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onSelect?: (item: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: { label: string; shortcut?: string; section?: string; onSelect: () => void }[];
  placeholder?: string;
}`}</code></pre>
      <h2>Basic Usage</h2>
      <pre><code>{`// Default search
<Search placeholder="Search..." onSearch={handleSearch} />

// With suggestions
<Search
  variant="suggestions"
  suggestions={['Dashboard', 'Settings', 'Profile']}
  onSelect={item => navigate(item)}
/>

// Expandable
<Search variant="expandable" onSearch={handleSearch} />

// Command palette
<CommandPalette
  open={isOpen}
  onOpenChange={setIsOpen}
  items={[
    { label: 'Go to Dashboard', shortcut: '⌘D', onSelect: () => navigate('/') },
    { label: 'Toggle Theme', shortcut: '⌘T', onSelect: toggleTheme },
  ]}
/>`}</code></pre>
      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>search-height</td><td>40px</td></tr>
          <tr><td>search-border-radius</td><td>8px</td></tr>
          <tr><td>search-icon-size</td><td>16px</td></tr>
          <tr><td>search-dropdown-shadow</td><td>0 4px 16px rgba(0,0,0,0.1)</td></tr>
          <tr><td>search-dropdown-radius</td><td>8px</td></tr>
          <tr><td>command-palette-width</td><td>480px</td></tr>
        </tbody>
      </table>
      <h2>Storybook</h2>
      <p>
        Explore all search variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-search--playground" target="_blank" rel="noopener noreferrer">TARMAC Storybook →</a>
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
          <tr><td>1</td><td>Container</td><td>Input wrapper with border and background</td></tr>
          <tr><td>2</td><td>Search Icon</td><td>Magnifying glass indicating search functionality</td></tr>
          <tr><td>3</td><td>Input Field</td><td>Text input for typing search queries</td></tr>
          <tr><td>4</td><td>Clear Button</td><td>X icon to clear the current query</td></tr>
          <tr><td>5</td><td>Loading Indicator</td><td>Spinner shown while fetching results</td></tr>
          <tr><td>6</td><td>Dropdown</td><td>Suggestion list appearing below the input</td></tr>
        </tbody>
      </table>
      <h2>When to Use</h2>
      <ul>
        <li>Global site or app search functionality</li>
        <li>Filtering large lists or tables</li>
        <li>Command palette for power users</li>
        <li>Inline search within dropdowns or dialogs</li>
      </ul>
      <h2>Best Practices</h2>
      <DoDont
        slug="search"
        doItems={[
          'Show a clear button when the input has content',
          'Debounce search requests to avoid excessive API calls',
          'Show loading state while fetching suggestions',
          'Provide keyboard navigation for suggestion lists',
          'Use placeholder text to hint at searchable content',
        ]}
        dontItems={[
          'Don\'t auto-submit search on every keystroke without debounce',
          'Don\'t show more than 8–10 suggestions at once',
          'Don\'t hide the search icon — it\'s a key affordance',
          'Don\'t use search for simple yes/no filters',
          'Don\'t block the UI while loading results',
        ]}
      />
      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>search / combobox</td><td>Semantic role for the search region</td></tr>
          <tr><td>aria-label</td><td>&quot;Search&quot;</td><td>Accessible name for the input</td></tr>
          <tr><td>aria-expanded</td><td>boolean</td><td>Whether suggestions are visible</td></tr>
          <tr><td>aria-activedescendant</td><td>id</td><td>Currently highlighted suggestion</td></tr>
          <tr><td>Keyboard</td><td>↑↓ Enter Esc</td><td>Navigate, select, and dismiss suggestions</td></tr>
        </tbody>
      </table>
      <h2>Related Components</h2>
      <ul>
        <li><strong>Input</strong> — Generic text input without search affordances</li>
        <li><strong>Dropdown</strong> — Select from predefined options</li>
        <li><strong>Filter</strong> — Structured filtering with multiple criteria</li>
        <li><strong>Dialog Box</strong> — Container for command palette overlay</li>
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
        <li>Added <code>command</code> variant with sections and keyboard shortcuts</li>
        <li>Added <code>expandable</code> variant with animated expand/collapse</li>
        <li>Added loading spinner state</li>
        <li>Added debounced suggestion fetching</li>
        <li>Improved keyboard navigation for suggestions</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with default and suggestions variants</li>
        <li>Search icon and clear button</li>
        <li>Basic suggestion dropdown</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function SearchPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Search" description="Search input with suggestions, clear button, expandable mode, and command palette interface." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
