'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── List item data ── */
const listData = [
  { id: '1', name: 'Arpith Kumar', subtitle: 'Design Lead', initials: 'AK', color: '#2396FB' },
  { id: '2', name: 'Priya Sharma', subtitle: 'Frontend Engineer', initials: 'PS', color: '#1BA86E' },
  { id: '3', name: 'Rahul Verma', subtitle: 'Product Manager', initials: 'RV', color: '#CF9F02' },
  { id: '4', name: 'Sneha Patel', subtitle: 'UX Researcher', initials: 'SP', color: '#ED1B36' },
  { id: '5', name: 'Vikram Singh', subtitle: 'Backend Engineer', initials: 'VS', color: '#525252' },
];

const groupedData = {
  'Design Team': listData.slice(0, 2),
  'Engineering': listData.slice(2, 4),
  'Management': listData.slice(4),
};

/* ── Action Icons ── */
function MoreIcon({ color }: { color: string }) {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill={color}><circle cx="4" cy="8" r="1.5" /><circle cx="8" cy="8" r="1.5" /><circle cx="12" cy="8" r="1.5" /></svg>;
}
function ChevronIcon({ color }: { color: string }) {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M6 4l4 4-4 4" /></svg>;
}
function CheckCircle({ color }: { color: string }) {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5"><circle cx="8" cy="8" r="6.5" /><path d="M5.5 8l2 2 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/* ── List Item ── */
function ListItem({
  item,
  variant = 'simple',
  selected,
  hovered,
  onSelect,
  onHover,
  onLeave,
  theme,
}: {
  item: typeof listData[0];
  variant?: string;
  selected?: boolean;
  hovered?: boolean;
  onSelect?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  theme: 'light' | 'dark';
}) {
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const subtext = theme === 'dark' ? '#888' : '#666';
  const border = theme === 'dark' ? '#333' : '#EEE';
  const hoverBg = theme === 'dark' ? '#2A2A2A' : '#F8F8F8';
  const selectedBg = theme === 'dark' ? '#1A2A3A' : '#EBF5FF';

  return (
    <div
      onClick={variant === 'selectable' ? onSelect : undefined}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        borderBottom: `1px solid ${border}`,
        background: selected ? selectedBg : hovered ? hoverBg : 'transparent',
        cursor: variant === 'selectable' || variant === 'actions' ? 'pointer' : 'default',
        transition: 'background 0.1s ease',
      }}
    >
      {/* Avatar */}
      {(variant === 'avatar' || variant === 'actions' || variant === 'selectable') && (
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: item.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 11, fontWeight: 600, flexShrink: 0,
        }}>
          {item.initials}
        </div>
      )}

      {/* Selectable check */}
      {variant === 'selectable' && (
        <span style={{ flexShrink: 0, color: selected ? '#2396FB' : (theme === 'dark' ? '#555' : '#CCC') }}>
          <CheckCircle color={selected ? '#2396FB' : (theme === 'dark' ? '#555' : '#CCC')} />
        </span>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
        {variant !== 'simple' && (
          <div style={{ fontSize: 12, color: subtext, marginTop: 1 }}>{item.subtitle}</div>
        )}
      </div>

      {/* Trailing action */}
      {variant === 'actions' && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}><MoreIcon color={subtext} /></button>
          <ChevronIcon color={subtext} />
        </div>
      )}
    </div>
  );
}

/* ── List Preview ── */
function ListPreview({ variant = 'simple', theme }: { variant?: string; theme: 'light' | 'dark' }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const bg = theme === 'dark' ? '#1E1E1E' : '#FFFFFF';
  const border = theme === 'dark' ? '#333' : '#E0E0E0';
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const subtext = theme === 'dark' ? '#888' : '#666';

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  if (variant === 'grouped') {
    return (
      <div style={{ width: 300, background: bg, borderRadius: 8, border: `1px solid ${border}`, overflow: 'hidden' }}>
        {Object.entries(groupedData).map(([group, items]) => (
          <div key={group}>
            <div style={{ padding: '8px 14px', fontSize: 11, fontWeight: 600, color: subtext, textTransform: 'uppercase', letterSpacing: 0.5, background: theme === 'dark' ? '#252525' : '#F5F5F5' }}>
              {group}
            </div>
            {items.map(item => (
              <ListItem key={item.id} item={item} variant="avatar" theme={theme}
                hovered={hoveredId === item.id}
                onHover={() => setHoveredId(item.id)}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ width: 300, background: bg, borderRadius: 8, border: `1px solid ${border}`, overflow: 'hidden' }}>
      {listData.map(item => (
        <ListItem
          key={item.id}
          item={item}
          variant={variant}
          theme={theme}
          selected={selectedIds.includes(item.id)}
          hovered={hoveredId === item.id}
          onSelect={() => toggleSelect(item.id)}
          onHover={() => setHoveredId(item.id)}
          onLeave={() => setHoveredId(null)}
        />
      ))}
    </div>
  );
}

/* ── List Example Section ── */
function ListExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { theme: 'light' | 'dark'; variant: string }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState('simple');

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
          <option value="simple">Simple</option><option value="avatar">With Avatar</option>
          <option value="actions">With Actions</option><option value="selectable">Selectable</option>
          <option value="grouped">Grouped</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option><option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children({ theme, variant })}
      </div>
    </div>
  );
}

/* ─── TAB 1 — Examples ─── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="list" />
      <h2>Overview</h2>
      <p>Lists display a vertical collection of items with optional avatars, subtitles, and trailing actions. They support selection, grouping, and hover states.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Simple, With Avatar, With Actions, Selectable, Grouped</td></tr>
          <tr><td>Features</td><td>Avatar, Title, Subtitle, Trailing action, Selection, Group headers</td></tr>
          <tr><td>States</td><td>Default, Hover, Selected</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>
      <ListExampleSection title="List Component" desc="Switch variants to see different list configurations. Click items in Selectable mode to toggle selection.">
        {({ theme, variant }) => <ListPreview variant={variant} theme={theme} />}
      </ListExampleSection>
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
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
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
