'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Filter option data ── */
const filterOptions = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys'];
const dateRangeOptions = ['Today', 'Last 7 days', 'Last 30 days', 'Custom range'];

/* ── Checkbox Icon ── */
function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l3.5 3.5L13 4" />
    </svg>
  );
}

/* ── Filter Chip ── */
function FilterChip({ label, active, onClick, theme }: { label: string; active: boolean; onClick: () => void; theme: 'light' | 'dark' }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 12px',
        borderRadius: 16,
        fontSize: 12,
        fontWeight: 500,
        border: active ? 'none' : `1px solid ${theme === 'dark' ? '#444' : '#ccc'}`,
        background: active ? '#2396FB' : 'transparent',
        color: active ? '#fff' : (theme === 'dark' ? '#ccc' : '#333'),
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      {label}
    </button>
  );
}

/* ── Filter Preview Component ── */
function FilterPreview({
  variant = 'multi',
  size = 'md',
  theme,
}: {
  variant?: string;
  size?: string;
  theme: 'light' | 'dark';
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState('');

  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const border = theme === 'dark' ? '#444' : '#DDD';
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const subtext = theme === 'dark' ? '#999' : '#666';
  const h = size === 'sm' ? 32 : size === 'lg' ? 44 : 36;
  const fontSize = size === 'sm' ? 12 : size === 'lg' ? 15 : 13;

  const toggleOption = (opt: string) => {
    if (variant === 'single') {
      setSelected(selected.includes(opt) ? [] : [opt]);
    } else {
      setSelected(prev => prev.includes(opt) ? prev.filter(s => s !== opt) : [...prev, opt]);
    }
  };

  const filteredOptions = variant === 'search'
    ? filterOptions.filter(o => o.toLowerCase().includes(search.toLowerCase()))
    : variant === 'date' ? dateRangeOptions : filterOptions;

  if (variant === 'chip') {
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {filterOptions.map(opt => (
          <FilterChip key={opt} label={opt} active={selected.includes(opt)} onClick={() => toggleOption(opt)} theme={theme} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ width: 260, fontFamily: 'inherit' }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', height: h, padding: '0 12px', borderRadius: 8,
          border: `1px solid ${border}`, background: bg, color: text,
          fontSize, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <span>Category {selected.length > 0 && <span style={{ background: '#2396FB', color: '#fff', borderRadius: 10, padding: '1px 6px', fontSize: 10, marginLeft: 6 }}>{selected.length}</span>}</span>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke={subtext} strokeWidth="2" strokeLinecap="round"><path d={open ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'} /></svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{ marginTop: 4, border: `1px solid ${border}`, borderRadius: 8, background: bg, overflow: 'hidden', boxShadow: `0 4px 12px rgba(0,0,0,${theme === 'dark' ? '0.4' : '0.1'})` }}>
          {variant === 'search' && (
            <div style={{ padding: 8, borderBottom: `1px solid ${border}` }}>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: `1px solid ${border}`, background: 'transparent', color: text, fontSize: fontSize - 1, outline: 'none' }}
              />
            </div>
          )}
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {filteredOptions.map(opt => (
              <label
                key={opt}
                onClick={() => toggleOption(opt)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                  cursor: 'pointer', fontSize: fontSize - 1, color: text,
                  background: selected.includes(opt) ? (theme === 'dark' ? '#333' : '#F0F7FF') : 'transparent',
                  transition: 'background 0.1s',
                }}
              >
                <span style={{
                  width: variant === 'single' || variant === 'date' ? 14 : 16, height: variant === 'single' || variant === 'date' ? 14 : 16,
                  borderRadius: variant === 'single' || variant === 'date' ? '50%' : 3,
                  border: `1.5px solid ${selected.includes(opt) ? '#2396FB' : border}`,
                  background: selected.includes(opt) ? '#2396FB' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  color: '#fff',
                }}>
                  {selected.includes(opt) && (variant === 'single' || variant === 'date'
                    ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                    : <CheckIcon size={10} />
                  )}
                </span>
                {opt}
              </label>
            ))}
          </div>
          {selected.length > 0 && (
            <div style={{ padding: '8px 12px', borderTop: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: subtext }}>{selected.length} selected</span>
              <button onClick={() => setSelected([])} style={{ fontSize: 11, color: '#2396FB', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Clear all</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Filter Example Section ── */
function FilterExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { size: string; theme: 'light' | 'dark'; variant: string }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState('md');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState('multi');

  useEffect(() => { setTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);

  const bg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';
  const selectStyle: React.CSSProperties = {
    padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
    background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>{title}</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>{desc}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <select value={size} onChange={e => setSize(e.target.value)} style={selectStyle}>
          <option value="sm">SM</option><option value="md">MD</option><option value="lg">LG</option>
        </select>
        <select value={variant} onChange={e => setVariant(e.target.value)} style={selectStyle}>
          <option value="single">Single Select</option><option value="multi">Multi Select</option>
          <option value="search">With Search</option><option value="date">Date Range</option>
          <option value="chip">Chip Filters</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option><option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children({ size, theme, variant })}
      </div>
    </div>
  );
}

/* ─── TAB 1 — Examples ─── */
function ExamplesTab() {
  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-filterdropdown--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-filterdropdown--playground"
        height={420}
        title="Filter — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>Filters allow users to narrow down content by selecting criteria from dropdown menus, checkboxes, or chip-based controls. They support single and multi-select modes, search, and date ranges.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Single Select, Multi Select, With Search, Date Range, Chip Filters</td></tr>
          <tr><td>Sizes</td><td>Small, Medium, Large</td></tr>
          <tr><td>States</td><td>Default, Open, Selected, Disabled</td></tr>
          <tr><td>Features</td><td>Selected count badge, Clear all, Search input, Chip toggle</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>
      <FilterExampleSection title="Filter Dropdown" desc="Click options to toggle selection. Use the variant dropdown to switch between filter types.">
        {({ size, theme, variant }) => <FilterPreview variant={variant} size={size} theme={theme} />}
      </FilterExampleSection>

      <h2>Chip Filters</h2>
      <FilterExampleSection title="Chip-based Filters" desc="Inline chip filters for quick category toggling without a dropdown.">
        {({ theme }) => <FilterPreview variant="chip" theme={theme} />}
      </FilterExampleSection>

      <h2>Sizes</h2>
      <ComponentExampleSection title="Size Comparison" desc="Filter triggers come in three sizes for different layout densities." sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}>
        {({ size, theme }) => <FilterPreview variant="multi" size={size as string} theme={theme as 'light' | 'dark'} />}
      </ComponentExampleSection>
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
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
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
