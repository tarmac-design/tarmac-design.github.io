'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Icons ── */
function SearchIcon({ size = 16, color = '#999' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}
function ClearIcon({ size = 14, color = '#999' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
function SpinnerIcon({ size = 14, color = '#999' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" style={{ animation: 'spin 1s linear infinite' }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

const suggestions = ['Dashboard', 'Design System', 'Documentation', 'Dropdown', 'Dialog Box', 'Date Picker'];
const commandItems = [
  { label: 'Go to Dashboard', shortcut: '⌘D', section: 'Pages' },
  { label: 'Open Settings', shortcut: '⌘,', section: 'Pages' },
  { label: 'Create New File', shortcut: '⌘N', section: 'Actions' },
  { label: 'Toggle Theme', shortcut: '⌘T', section: 'Actions' },
  { label: 'Search Components', shortcut: '⌘K', section: 'Actions' },
];

/* ── Search Demo ── */
function SearchDemo({
  variant = 'default',
  theme,
}: {
  variant?: 'default' | 'suggestions' | 'expandable' | 'command';
  theme: 'light' | 'dark';
}) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const border = theme === 'dark' ? '#444' : '#DDD';
  const muted = theme === 'dark' ? '#888' : '#999';
  const hoverBg = theme === 'dark' ? '#333' : '#F5F5F5';
  const dropBg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';

  const filtered = suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()));
  const showDropdown = focused && query.length > 0 && (variant === 'suggestions' || variant === 'default');

  useEffect(() => {
    if (query.length > 0 && variant === 'suggestions') {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(t);
    }
    setLoading(false);
  }, [query, variant]);

  if (variant === 'expandable') {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8,
          background: expanded ? bg : 'transparent', border: expanded ? `1px solid ${border}` : '1px solid transparent',
          transition: 'all 0.3s ease', width: expanded ? 260 : 36, overflow: 'hidden',
        }}>
          <span style={{ cursor: 'pointer', display: 'flex', flexShrink: 0 }} onClick={() => { setExpanded(!expanded); if (!expanded) setTimeout(() => inputRef.current?.focus(), 100); }}>
            <SearchIcon color={muted} />
          </span>
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search..." onBlur={() => { if (!query) setExpanded(false); }}
            style={{ border: 'none', outline: 'none', background: 'transparent', color: text, fontSize: 14, width: expanded ? '100%' : 0, opacity: expanded ? 1 : 0, transition: 'all 0.3s ease' }}
          />
          {expanded && query && (
            <span style={{ cursor: 'pointer', display: 'flex', flexShrink: 0 }} onClick={() => setQuery('')}>
              <ClearIcon color={muted} />
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'command') {
    const filteredCommands = commandItems.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));
    const sections = [...new Set(filteredCommands.map(c => c.section))];
    return (
      <div style={{ width: 320, borderRadius: 12, border: `1px solid ${border}`, background: bg, boxShadow: theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: `1px solid ${border}` }}>
          <SearchIcon color={muted} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Type a command..."
            style={{ border: 'none', outline: 'none', background: 'transparent', color: text, fontSize: 14, flex: 1 }}
          />
          <kbd style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: hoverBg, color: muted, border: `1px solid ${border}` }}>ESC</kbd>
        </div>
        <div style={{ maxHeight: 240, overflowY: 'auto', padding: 4 }}>
          {sections.map(section => (
            <div key={section}>
              <div style={{ fontSize: 11, fontWeight: 600, color: muted, padding: '8px 12px 4px', textTransform: 'uppercase', letterSpacing: 0.5 }}>{section}</div>
              {filteredCommands.filter(c => c.section === section).map(cmd => (
                <div key={cmd.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 13, color: text }}
                  onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span>{cmd.label}</span>
                  <kbd style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: hoverBg, color: muted, border: `1px solid ${border}` }}>{cmd.shortcut}</kbd>
                </div>
              ))}
            </div>
          ))}
          {filteredCommands.length === 0 && <div style={{ padding: 16, textAlign: 'center', fontSize: 13, color: muted }}>No results found</div>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: 300 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8,
        background: bg, border: `1px solid ${focused ? (theme === 'dark' ? '#666' : '#AAA') : border}`,
        transition: 'border-color 0.15s ease',
      }}>
        <SearchIcon color={muted} />
        <input value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search components..." style={{ border: 'none', outline: 'none', background: 'transparent', color: text, fontSize: 14, flex: 1 }}
        />
        {loading && <SpinnerIcon color={muted} />}
        {query && !loading && (
          <span style={{ cursor: 'pointer', display: 'flex' }} onClick={() => setQuery('')}>
            <ClearIcon color={muted} />
          </span>
        )}
      </div>
      {showDropdown && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, borderRadius: 8,
          background: dropBg, border: `1px solid ${border}`, boxShadow: theme === 'dark' ? '0 4px 16px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.1)',
          zIndex: 10, overflow: 'hidden',
        }}>
          {filtered.length > 0 ? filtered.map(item => (
            <div key={item} style={{ padding: '8px 12px', fontSize: 13, color: text, cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => { setQuery(item); setFocused(false); }}
            >
              <SearchIcon size={12} color={muted} />{' '}{item}
            </div>
          )) : (
            <div style={{ padding: 16, textAlign: 'center', fontSize: 13, color: muted }}>No results for &quot;{query}&quot;</div>
          )}
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ── Preview Section ── */
function SearchExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { variant: string; theme: 'light' | 'dark' }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [variant, setVariant] = useState('default');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
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
        <select value={variant} onChange={e => setVariant(e.target.value)} style={selectStyle}>
          <option value="default">Default</option>
          <option value="suggestions">With Suggestions</option>
          <option value="expandable">Expandable</option>
          <option value="command">Command Palette</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 32, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center', minHeight: 200 }}>
        {children({ variant, theme })}
      </div>
    </div>
  );
}

/* ── TAB 1 — Examples ── */
function ExamplesTab() {
  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-search-dropdown--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-search-dropdown--playground"
        height={420}
        title="Search — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>Search components provide text input with search affordances — magnifying glass icon, clear button, suggestion dropdowns, and command palette interfaces.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Default, With Suggestions, Expandable, Command Palette</td></tr>
          <tr><td>States</td><td>Empty, Typing, Loading, Results, No Results</td></tr>
          <tr><td>Features</td><td>Auto-suggest, Clear button, Loading spinner, Keyboard shortcuts</td></tr>
        </tbody>
      </table>

      <h2>Interactive Demo</h2>
      <SearchExampleSection title="Search Variants" desc="Type to see suggestions, click clear to reset. Try different variants.">
        {({ variant, theme }) => <SearchDemo variant={variant as 'default' | 'suggestions' | 'expandable' | 'command'} theme={theme} />}
      </SearchExampleSection>

      <h2>All Variants</h2>
      <SearchExampleSection title="Default Search" desc="Basic search input with icon and clear button.">
        {({ theme }) => <SearchDemo variant="default" theme={theme} />}
      </SearchExampleSection>

      <SearchExampleSection title="With Suggestions" desc="Shows filtered suggestions as you type with loading state.">
        {({ theme }) => <SearchDemo variant="suggestions" theme={theme} />}
      </SearchExampleSection>

      <SearchExampleSection title="Expandable" desc="Compact icon that expands into a full search input on click.">
        {({ theme }) => <SearchDemo variant="expandable" theme={theme} />}
      </SearchExampleSection>

      <SearchExampleSection title="Command Palette" desc="Full command palette with sections, keyboard shortcuts, and search.">
        {({ theme }) => <SearchDemo variant="command" theme={theme} />}
      </SearchExampleSection>

      <h2>States</h2>
      <ComponentExampleSection title="Search States" desc="Different visual states of the search input.">
        {({ theme }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SearchDemo variant="default" theme={theme as 'light' | 'dark'} />
          </div>
        )}
      </ComponentExampleSection>
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
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Search" description="Search input with suggestions, clear button, expandable mode, and command palette interface." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
