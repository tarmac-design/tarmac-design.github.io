'use client';

import { useState, useEffect, useRef } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Types ── */
interface DropdownOption {
  label: string;
  value: string;
  group?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  searchable?: boolean;
  multiSelect?: boolean;
  selectedValues?: string[];
  onMultiChange?: (values: string[]) => void;
  ghost?: boolean;
  theme?: 'light' | 'dark';
}

/* ── Size tokens ── */
const sizeTokens: Record<string, { height: number; fontSize: number; padding: string }> = {
  sm: { height: 32, fontSize: 13, padding: '0 10px' },
  md: { height: 40, fontSize: 14, padding: '0 12px' },
  lg: { height: 48, fontSize: 15, padding: '0 14px' },
};

/* ── Chevron icon ── */
function ChevronDown({ size = 16, open }: { size?: number; open?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

/* ── Check icon ── */
function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.5 3.5 6.5-7" />
    </svg>
  );
}

/* ── Search icon ── */
function SearchIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

/* ── DropdownDemo component ── */
function DropdownDemo({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  size = 'md',
  searchable = false,
  multiSelect = false,
  selectedValues = [],
  onMultiChange,
  ghost = false,
  theme = 'light',
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const tokens = sizeTokens[size] || sizeTokens.md;
  const isDark = theme === 'dark';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open, searchable]);

  const filtered = searchable && search
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  /* Group options if they have a group field */
  const grouped = filtered.reduce<Record<string, DropdownOption[]>>((acc, o) => {
    const g = o.group || '__default';
    if (!acc[g]) acc[g] = [];
    acc[g].push(o);
    return acc;
  }, {});
  const groupKeys = Object.keys(grouped);
  const hasGroups = groupKeys.length > 1 || (groupKeys.length === 1 && groupKeys[0] !== '__default');

  const selectedLabel = multiSelect
    ? (selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder)
    : (value ? options.find(o => o.value === value)?.label || placeholder : placeholder);

  const isSelected = (v: string) => multiSelect ? selectedValues.includes(v) : value === v;

  function handleSelect(v: string) {
    if (multiSelect && onMultiChange) {
      const next = selectedValues.includes(v)
        ? selectedValues.filter(sv => sv !== v)
        : [...selectedValues, v];
      onMultiChange(next);
    } else {
      onChange?.(v);
      setOpen(false);
      setSearch('');
    }
  }

  const borderColor = isDark ? '#444' : '#D0D0D0';
  const bgSurface = isDark ? '#2A2A2A' : '#FFF';
  const bgHover = isDark ? '#383838' : '#F0F0F0';
  const textPrimary = isDark ? '#E8E8E8' : '#1A1A1A';
  const textSecondary = isDark ? '#999' : '#888';
  const dropShadow = isDark ? '0 4px 16px rgba(0,0,0,0.5)' : '0 4px 16px rgba(0,0,0,0.12)';

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', minWidth: 200 }}>
      {/* Trigger button */}
      <button
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          width: '100%',
          height: tokens.height,
          padding: tokens.padding,
          fontSize: tokens.fontSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          background: ghost ? 'transparent' : bgSurface,
          border: ghost ? `1px dashed ${borderColor}` : `1px solid ${borderColor}`,
          borderRadius: 8,
          color: value || selectedValues.length > 0 ? textPrimary : textSecondary,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.45 : 1,
          transition: 'border-color 0.15s, box-shadow 0.15s',
          outline: 'none',
          fontFamily: 'inherit',
          ...(open && !disabled ? { borderColor: isDark ? '#6EA8FE' : '#2396FB', boxShadow: `0 0 0 2px ${isDark ? 'rgba(110,168,254,0.25)' : 'rgba(35,150,251,0.15)'}` } : {}),
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedLabel}
        </span>
        <ChevronDown size={16} open={open} />
      </button>

      {/* Dropdown panel */}
      {open && !disabled && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: tokens.height + 4,
            left: 0,
            right: 0,
            background: bgSurface,
            border: `1px solid ${borderColor}`,
            borderRadius: 8,
            boxShadow: dropShadow,
            zIndex: 1000,
            maxHeight: 260,
            overflowY: 'auto',
            padding: '4px 0',
          }}
        >
          {/* Search input */}
          {searchable && (
            <div style={{ padding: '6px 8px', borderBottom: `1px solid ${borderColor}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 6, border: `1px solid ${borderColor}`, background: isDark ? '#333' : '#FAFAFA' }}>
                <SearchIcon size={14} />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search..."
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 13,
                    color: textPrimary,
                    width: '100%',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>
          )}

          {/* Options */}
          {filtered.length === 0 && (
            <div style={{ padding: '12px 16px', fontSize: 13, color: textSecondary, textAlign: 'center' }}>
              No options found
            </div>
          )}

          {hasGroups
            ? groupKeys.map(gk => (
                <div key={gk}>
                  {gk !== '__default' && (
                    <div style={{ padding: '8px 12px 4px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: textSecondary }}>
                      {gk}
                    </div>
                  )}
                  {grouped[gk].map(opt => (
                    <OptionItem
                      key={opt.value}
                      opt={opt}
                      selected={isSelected(opt.value)}
                      hovered={hovered === opt.value}
                      onHover={setHovered}
                      onSelect={handleSelect}
                      multi={multiSelect}
                      bgHover={bgHover}
                      textPrimary={textPrimary}
                      fontSize={tokens.fontSize - 1}
                    />
                  ))}
                </div>
              ))
            : filtered.map(opt => (
                <OptionItem
                  key={opt.value}
                  opt={opt}
                  selected={isSelected(opt.value)}
                  hovered={hovered === opt.value}
                  onHover={setHovered}
                  onSelect={handleSelect}
                  multi={multiSelect}
                  bgHover={bgHover}
                  textPrimary={textPrimary}
                  fontSize={tokens.fontSize - 1}
                />
              ))}
        </div>
      )}
    </div>
  );
}

/* ── Option item ── */
function OptionItem({
  opt,
  selected,
  hovered,
  onHover,
  onSelect,
  multi,
  bgHover,
  textPrimary,
  fontSize,
}: {
  opt: DropdownOption;
  selected: boolean;
  hovered: boolean;
  onHover: (v: string | null) => void;
  onSelect: (v: string) => void;
  multi: boolean;
  bgHover: string;
  textPrimary: string;
  fontSize: number;
}) {
  return (
    <div
      role="option"
      aria-selected={selected}
      onClick={() => onSelect(opt.value)}
      onMouseEnter={() => onHover(opt.value)}
      onMouseLeave={() => onHover(null)}
      style={{
        padding: '8px 12px',
        fontSize,
        color: textPrimary,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: hovered ? bgHover : 'transparent',
        fontWeight: selected ? 600 : 400,
        transition: 'background 0.1s',
      }}
    >
      {multi && (
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 3,
            border: selected ? 'none' : `1.5px solid ${textPrimary}40`,
            background: selected ? '#2396FB' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {selected && <CheckIcon size={11} />}
        </span>
      )}
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt.label}</span>
      {!multi && selected && (
        <span style={{ color: '#2396FB', flexShrink: 0 }}>
          <CheckIcon size={14} />
        </span>
      )}
    </div>
  );
}

/* ── Sample data ── */
const fruitOptions: DropdownOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Dragonfruit', value: 'dragonfruit' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
];

const countryOptions: DropdownOption[] = [
  { label: 'India', value: 'in', group: 'Asia' },
  { label: 'Japan', value: 'jp', group: 'Asia' },
  { label: 'Singapore', value: 'sg', group: 'Asia' },
  { label: 'Germany', value: 'de', group: 'Europe' },
  { label: 'France', value: 'fr', group: 'Europe' },
  { label: 'United Kingdom', value: 'uk', group: 'Europe' },
  { label: 'United States', value: 'us', group: 'Americas' },
  { label: 'Brazil', value: 'br', group: 'Americas' },
];

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  const [defaultVal, setDefaultVal] = useState('');
  const [multiVals, setMultiVals] = useState<string[]>([]);
  const [searchVal, setSearchVal] = useState('');
  const [sizeVal, setSizeVal] = useState('');

  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-dropdown--list-playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-dropdown--list-playground"
        height={420}
        title="Dropdown — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        Dropdowns let users select one or more options from a collapsible list.
        They consist of a trigger button with a chevron indicator and a floating
        panel of selectable options. Dropdowns support search, multi-select,
        grouped options, and multiple sizes.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Types</td><td>Default, Multi-select, Searchable, Grouped options</td></tr>
          <tr><td>Sizes</td><td>Small (32px), Medium (40px), Large (48px)</td></tr>
          <tr><td>States</td><td>Default, Hover, Open, Disabled, Ghost/Skeleton</td></tr>
          <tr><td>Features</td><td>Chevron indicator, Selected highlight, Search filter, Group headers</td></tr>
        </tbody>
      </table>

      {/* Default */}
      <ComponentExampleSection
        title="Default"
        desc="A standard single-select dropdown with a trigger button and option list."
      >
        {({ theme }) => (
          <DropdownDemo
            options={fruitOptions}
            value={defaultVal}
            onChange={setDefaultVal}
            placeholder="Select a fruit"
            theme={theme as 'light' | 'dark'}
          />
        )}
      </ComponentExampleSection>

      {/* Multi-select */}
      <ComponentExampleSection
        title="Multi-select"
        desc="Allows selecting multiple options with checkboxes. Shows count of selected items."
      >
        {({ theme }) => (
          <DropdownDemo
            options={fruitOptions}
            multiSelect
            selectedValues={multiVals}
            onMultiChange={setMultiVals}
            placeholder="Select fruits"
            theme={theme as 'light' | 'dark'}
          />
        )}
      </ComponentExampleSection>

      {/* Searchable */}
      <ComponentExampleSection
        title="Searchable"
        desc="Includes a search input to filter options. Ideal for long lists."
      >
        {({ theme }) => (
          <DropdownDemo
            options={countryOptions}
            value={searchVal}
            onChange={setSearchVal}
            placeholder="Search countries..."
            searchable
            theme={theme as 'light' | 'dark'}
          />
        )}
      </ComponentExampleSection>

      {/* Disabled */}
      <ComponentExampleSection
        title="Disabled"
        desc="Disabled state prevents interaction. Reduced opacity signals non-interactivity."
      >
        {({ theme }) => (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <DropdownDemo
              options={fruitOptions}
              placeholder="Disabled empty"
              disabled
              theme={theme as 'light' | 'dark'}
            />
            <DropdownDemo
              options={fruitOptions}
              value="apple"
              placeholder="Disabled with value"
              disabled
              theme={theme as 'light' | 'dark'}
            />
          </div>
        )}
      </ComponentExampleSection>

      {/* Sizes */}
      <ComponentExampleSection
        title="Sizes"
        desc="Three size variants for different layout densities."
      >
        {({ theme }) => (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, marginBottom: 4, color: theme === 'dark' ? '#999' : '#666' }}>Small</div>
              <DropdownDemo
                options={fruitOptions}
                value={sizeVal}
                onChange={setSizeVal}
                size="sm"
                placeholder="Small"
                theme={theme as 'light' | 'dark'}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, marginBottom: 4, color: theme === 'dark' ? '#999' : '#666' }}>Medium</div>
              <DropdownDemo
                options={fruitOptions}
                value={sizeVal}
                onChange={setSizeVal}
                size="md"
                placeholder="Medium"
                theme={theme as 'light' | 'dark'}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, marginBottom: 4, color: theme === 'dark' ? '#999' : '#666' }}>Large</div>
              <DropdownDemo
                options={fruitOptions}
                value={sizeVal}
                onChange={setSizeVal}
                size="lg"
                placeholder="Large"
                theme={theme as 'light' | 'dark'}
              />
            </div>
          </div>
        )}
      </ComponentExampleSection>

      {/* Ghost / Skeleton */}
      <ComponentExampleSection
        title="Ghost / Skeleton"
        desc="Ghost variant uses a dashed border for placeholder or skeleton states."
      >
        {({ theme }) => (
          <DropdownDemo
            options={fruitOptions}
            placeholder="Ghost dropdown"
            ghost
            theme={theme as 'light' | 'dark'}
          />
        )}
      </ComponentExampleSection>
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
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
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
