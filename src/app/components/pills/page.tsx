'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Pill variant colors ── */
const variantColors: Record<string, { bg: string; text: string }> = {
  black:        { bg: '#0D0D0D', text: '#FFF' },
  white:        { bg: '#FFF',    text: '#0D0D0D' },
  coal:         { bg: '#525252', text: '#FFF' },
  blue:         { bg: '#2396FB', text: '#FFF' },
  success:      { bg: '#1BA86E', text: '#FFF' },
  error:        { bg: '#DC143C', text: '#FFF' },
  warning:      { bg: '#CF9F02', text: '#FFF' },
  'legacy-blue': { bg: '#1A73E8', text: '#FFF' },
  'dlv-red':    { bg: '#ED1B36', text: '#FFF' },
};

const sizeMap: Record<string, { height: number; fontSize: number; px: number; iconSize: number }> = {
  sm: { height: 24, fontSize: 11, px: 8, iconSize: 12 },
  md: { height: 32, fontSize: 13, px: 12, iconSize: 14 },
};

const variantLabels: Record<string, string> = {
  black: 'Black', white: 'White', coal: 'Coal', blue: 'Blue',
  success: 'Success', error: 'Error', warning: 'Warning',
  'legacy-blue': 'Legacy Blue', 'dlv-red': 'DLV Red',
};

/* ── Pill Props Interface ── */
interface PillProps {
  variant?: string;
  label: string;
  selected?: boolean;
  onToggle?: (selected: boolean) => void;
  icon?: ReactNode;
  closable?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

/* ── Pill Component ── */
function Pill({
  variant = 'blue',
  label,
  selected = false,
  onToggle,
  icon,
  closable = false,
  disabled = false,
  size = 'md',
  theme,
}: PillProps & { theme: 'light' | 'dark' }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const colors = variantColors[variant] || variantColors.blue;
  const s = sizeMap[size] || sizeMap.md;

  /* Unselected: outlined border, transparent bg. Selected: filled bg with white text. */
  const borderColor = variant === 'white'
    ? (theme === 'dark' ? '#555' : '#CCC')
    : colors.bg;

  let bg: string;
  let textColor: string;
  let border: string;

  if (selected) {
    bg = colors.bg;
    textColor = colors.text;
    border = `1.5px solid ${colors.bg}`;
  } else {
    bg = 'transparent';
    textColor = variant === 'white'
      ? (theme === 'dark' ? '#FFF' : '#0D0D0D')
      : colors.bg;
    border = `1.5px solid ${borderColor}`;
  }

  const opacity = disabled ? 0.4 : hovered ? 0.9 : 1;
  const scale = pressed && !disabled ? 0.95 : hovered && !disabled ? 1.04 : 1;

  const handleClick = () => {
    if (!disabled) onToggle?.(!selected);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      disabled={disabled}
      role="switch"
      aria-checked={selected}
      aria-label={label}
      style={{
        height: s.height,
        borderRadius: 9999,
        background: bg,
        color: textColor,
        fontSize: s.fontSize,
        fontWeight: 600,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: `0 ${s.px}px`,
        border,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity,
        transform: `scale(${scale})`,
        transition: 'all 0.15s ease',
        boxShadow: hovered && !disabled
          ? `0 2px 8px rgba(0,0,0,${theme === 'dark' ? '0.4' : '0.15'})`
          : 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        outline: 'none',
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
      <span>{label}</span>
      {closable && (
        <span
          role="img"
          aria-label={`Remove ${label}`}
          onClick={e => { e.stopPropagation(); }}
          style={{
            display: 'flex', alignItems: 'center', marginLeft: 2, opacity: 0.7,
          }}
        >
          <svg width={s.iconSize} height={s.iconSize} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </span>
      )}
    </button>
  );
}

/* ── Stateful Pill wrapper for demos ── */
function PillDemo({
  variant, label, icon, closable, disabled, size, theme, initialSelected = false,
}: Omit<PillProps, 'selected' | 'onToggle'> & { theme: 'light' | 'dark'; initialSelected?: boolean }) {
  const [selected, setSelected] = useState(initialSelected);
  return (
    <Pill
      variant={variant}
      label={label}
      selected={selected}
      onToggle={setSelected}
      icon={icon}
      closable={closable}
      disabled={disabled}
      size={size}
      theme={theme}
    />
  );
}

/* ── Demo icons ── */
function StarIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .5l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.1 3.8 13.5l.8-4.7L1.2 5.5l4.7-.7z" />
    </svg>
  );
}

function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.5 3.5 6.5-7" />
    </svg>
  );
}

function HeartIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 14s-5.5-3.5-5.5-7A3.5 3.5 0 018 4a3.5 3.5 0 015.5 3c0 3.5-5.5 7-5.5 7z" />
    </svg>
  );
}

/* ── Pill Example Section with size/theme controls ── */
function PillExampleSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: (props: { size: 'sm' | 'md'; theme: 'light' | 'dark' }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState<'sm' | 'md'>('md');
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
        <select value={size} onChange={e => setSize(e.target.value as 'sm' | 'md')} style={selectStyle}>
          <option value="sm">Small (24px)</option>
          <option value="md">Medium (32px)</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {children({ size, theme })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-pill--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-pill--playground"
        height={420}
        title="Pills — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        Pills are interactive selectable chips with toggle behavior. Unlike Tags (keyword labels)
        and Badges (status indicators), Pills act as toggleable selections — clicking a pill
        switches it between selected and unselected states. Unselected pills show an outlined
        border with transparent background; selected pills fill with the variant color and
        display white text.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Black, White, Coal, Blue, Success, Error, Warning, Legacy Blue, DLV Red</td></tr>
          <tr><td>Sizes</td><td>Small (24px), Medium (32px)</td></tr>
          <tr><td>Shape</td><td>Fully rounded pill (border-radius: 9999px)</td></tr>
          <tr><td>States</td><td>Default (unselected), Selected (filled), Hover, Pressed, Disabled</td></tr>
          <tr><td>Features</td><td>Leading icon, Close button, Selectable toggle</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <PillExampleSection
        title="Color Variants — Toggle to Select"
        desc="Click any pill to toggle between selected (filled) and unselected (outlined) states. Each variant has a distinct color."
      >
        {({ size, theme }) => (
          <>
            {Object.keys(variantColors).map(v => (
              <PillDemo key={v} variant={v} size={size} label={variantLabels[v]} theme={theme} />
            ))}
          </>
        )}
      </PillExampleSection>

      <PillExampleSection
        title="Pre-Selected Variants"
        desc="Pills can start in a selected state. Click to deselect."
      >
        {({ size, theme }) => (
          <>
            {Object.keys(variantColors).map(v => (
              <PillDemo key={v} variant={v} size={size} label={variantLabels[v]} theme={theme} initialSelected />
            ))}
          </>
        )}
      </PillExampleSection>

      <h2>With Icons</h2>

      <PillExampleSection
        title="Leading Icon Pills"
        desc="Pills can include a leading icon for additional visual context. Toggle to see icon color change."
      >
        {({ size, theme }) => (
          <>
            <PillDemo variant="blue" size={size} label="Favorite" icon={<HeartIcon size={size === 'sm' ? 10 : 12} />} theme={theme} />
            <PillDemo variant="success" size={size} label="Verified" icon={<CheckIcon size={size === 'sm' ? 10 : 12} />} theme={theme} initialSelected />
            <PillDemo variant="warning" size={size} label="Featured" icon={<StarIcon size={size === 'sm' ? 10 : 12} />} theme={theme} />
            <PillDemo variant="dlv-red" size={size} label="Priority" icon={<StarIcon size={size === 'sm' ? 10 : 12} />} theme={theme} />
          </>
        )}
      </PillExampleSection>

      <h2>Closable Pills</h2>

      <PillExampleSection
        title="Pills with Close Button"
        desc="Closable pills combine toggle selection with a dismiss action."
      >
        {({ size, theme }) => (
          <>
            <PillDemo variant="blue" size={size} label="Filter" closable theme={theme} />
            <PillDemo variant="coal" size={size} label="Category" closable theme={theme} initialSelected />
            <PillDemo variant="success" size={size} label="Active" closable icon={<CheckIcon size={size === 'sm' ? 10 : 12} />} theme={theme} initialSelected />
          </>
        )}
      </PillExampleSection>

      <h2>States</h2>

      <PillExampleSection
        title="Default, Selected & Disabled"
        desc="Pills support disabled state for non-interactive contexts. Disabled pills cannot be toggled."
      >
        {({ size, theme }) => (
          <>
            <PillDemo variant="blue" size={size} label="Default" theme={theme} />
            <PillDemo variant="blue" size={size} label="Selected" theme={theme} initialSelected />
            <PillDemo variant="blue" size={size} label="Disabled" disabled theme={theme} />
            <PillDemo variant="blue" size={size} label="Disabled Selected" disabled theme={theme} initialSelected />
          </>
        )}
      </PillExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Pills come in two sizes. Small for dense layouts, Medium as the default."
        sizes={['sm', 'md'] as ('sm' | 'md')[]}
      >
        {({ theme }) => (
          <>
            <PillDemo variant="blue" size="sm" label="Small" theme={theme as 'light' | 'dark'} />
            <PillDemo variant="blue" size="md" label="Medium" theme={theme as 'light' | 'dark'} />
            <PillDemo variant="success" size="sm" label="Small Selected" icon={<CheckIcon size={10} />} theme={theme as 'light' | 'dark'} initialSelected />
            <PillDemo variant="success" size="md" label="Medium Selected" icon={<CheckIcon size={12} />} theme={theme as 'light' | 'dark'} initialSelected />
          </>
        )}
      </ComponentExampleSection>

      <h2>Multi-Select Group</h2>

      <PillExampleSection
        title="Interest Selector"
        desc="A real-world example: select multiple interests. Click pills to toggle selection."
      >
        {({ size, theme }) => {
          const interests = [
            { label: 'Design', variant: 'blue' },
            { label: 'Engineering', variant: 'coal' },
            { label: 'Product', variant: 'success' },
            { label: 'Marketing', variant: 'warning' },
            { label: 'Analytics', variant: 'legacy-blue' },
            { label: 'Operations', variant: 'dlv-red' },
          ];
          return (
            <>
              {interests.map(i => (
                <PillDemo key={i.label} variant={i.variant} size={size} label={i.label} theme={theme} />
              ))}
            </>
          );
        }}
      </PillExampleSection>
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
      <pre><code>{`import { Pill } from '@tarmac/design-system';`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`import { ReactNode } from 'react';

interface PillProps {
  /** Color variant of the pill */
  variant?: 'black' | 'white' | 'coal' | 'blue' | 'success'
           | 'error' | 'warning' | 'legacy-blue' | 'dlv-red';
  /** Text label displayed inside the pill */
  label: string;
  /** Whether the pill is in the selected (filled) state */
  selected?: boolean;
  /** Callback fired when the pill is toggled; receives the new selected state */
  onToggle?: (selected: boolean) => void;
  /** Optional leading icon rendered before the label */
  icon?: ReactNode;
  /** Show a close (×) button on the trailing edge */
  closable?: boolean;
  /** Disable interaction — pill cannot be toggled */
  disabled?: boolean;
  /** Size of the pill */
  size?: 'sm' | 'md';
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>variant</code></td><td>string</td><td><code>&apos;blue&apos;</code></td><td>Color variant. Controls border color (unselected) and fill color (selected).</td></tr>
          <tr><td><code>label</code></td><td>string</td><td>—</td><td>Required. The text content of the pill.</td></tr>
          <tr><td><code>selected</code></td><td>boolean</td><td><code>false</code></td><td>Controlled selected state. When true, pill renders with filled background and white text.</td></tr>
          <tr><td><code>onToggle</code></td><td>(selected: boolean) =&gt; void</td><td>—</td><td>Callback invoked on click with the new selected value.</td></tr>
          <tr><td><code>icon</code></td><td>ReactNode</td><td>—</td><td>Optional leading icon element rendered before the label.</td></tr>
          <tr><td><code>closable</code></td><td>boolean</td><td><code>false</code></td><td>When true, renders a trailing × close button.</td></tr>
          <tr><td><code>disabled</code></td><td>boolean</td><td><code>false</code></td><td>Disables the pill. Prevents toggle and shows reduced opacity.</td></tr>
          <tr><td><code>size</code></td><td>&apos;sm&apos; | &apos;md&apos;</td><td><code>&apos;md&apos;</code></td><td>Pill height — sm: 24px, md: 32px.</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>

      <h4>Basic Toggle Pill</h4>
      <pre><code>{`import { useState } from 'react';
import { Pill } from '@tarmac/design-system';

function BasicPill() {
  const [selected, setSelected] = useState(false);

  return (
    <Pill
      variant="blue"
      label="Option A"
      selected={selected}
      onToggle={setSelected}
    />
  );
}`}</code></pre>

      <h4>Multi-Select Pill Group</h4>
      <pre><code>{`import { useState } from 'react';
import { Pill } from '@tarmac/design-system';

const OPTIONS = ['Design', 'Engineering', 'Product', 'Marketing'];

function PillGroup() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (option: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(option) ? next.delete(option) : next.add(option);
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {OPTIONS.map(opt => (
        <Pill
          key={opt}
          variant="blue"
          label={opt}
          selected={selected.has(opt)}
          onToggle={() => toggle(opt)}
        />
      ))}
    </div>
  );
}`}</code></pre>

      <h4>Pill with Icon and Close</h4>
      <pre><code>{`import { Pill } from '@tarmac/design-system';
import { HeartIcon } from '@tarmac/icons';

<Pill
  variant="error"
  label="Favorite"
  selected={isFavorite}
  onToggle={setIsFavorite}
  icon={<HeartIcon size={12} />}
  closable
  size="md"
/>`}</code></pre>

      <h4>Disabled Pill</h4>
      <pre><code>{`<Pill
  variant="coal"
  label="Unavailable"
  selected={false}
  disabled
/>`}</code></pre>

      <h4>Form Integration</h4>
      <pre><code>{`import { useState } from 'react';
import { Pill } from '@tarmac/design-system';

const TAGS = ['Urgent', 'Review', 'Approved', 'Blocked'];

function FilterForm({ onSubmit }: { onSubmit: (filters: string[]) => void }) {
  const [filters, setFilters] = useState<string[]>([]);

  const toggle = (tag: string) => {
    setFilters(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(filters); }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {TAGS.map(tag => (
          <Pill
            key={tag}
            variant="blue"
            label={tag}
            selected={filters.includes(tag)}
            onToggle={() => toggle(tag)}
          />
        ))}
      </div>
      <button type="submit">Apply Filters</button>
    </form>
  );
}`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>pill-height-sm</td><td>24px</td></tr>
          <tr><td>pill-height-md</td><td>32px</td></tr>
          <tr><td>pill-border-radius</td><td>9999px (fully rounded)</td></tr>
          <tr><td>pill-font-size-sm</td><td>11px</td></tr>
          <tr><td>pill-font-size-md</td><td>13px</td></tr>
          <tr><td>pill-border-width</td><td>1.5px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Selected BG</th><th>Selected Text</th><th>Unselected Border</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>#FFFFFF</td><td>#0D0D0D</td></tr>
          <tr><td>white</td><td>#FFFFFF</td><td>#0D0D0D</td><td>#CCCCCC</td></tr>
          <tr><td>coal</td><td>#525252</td><td>#FFFFFF</td><td>#525252</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>#FFFFFF</td><td>#2396FB</td></tr>
          <tr><td>success</td><td>#1BA86E</td><td>#FFFFFF</td><td>#1BA86E</td></tr>
          <tr><td>error</td><td>#DC143C</td><td>#FFFFFF</td><td>#DC143C</td></tr>
          <tr><td>warning</td><td>#CF9F02</td><td>#FFFFFF</td><td>#CF9F02</td></tr>
          <tr><td>legacy-blue</td><td>#1A73E8</td><td>#FFFFFF</td><td>#1A73E8</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>#FFFFFF</td><td>#ED1B36</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all pill variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-pill--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Fully rounded pill wrapper (border-radius: 9999px)</td></tr>
          <tr><td>2</td><td>Border</td><td>Outlined border in variant color when unselected</td></tr>
          <tr><td>3</td><td>Background</td><td>Transparent when unselected; filled with variant color when selected</td></tr>
          <tr><td>4</td><td>Label</td><td>Text content — variant color when unselected, white when selected</td></tr>
          <tr><td>5</td><td>Leading Icon</td><td>Optional icon before the label</td></tr>
          <tr><td>6</td><td>Close Button</td><td>Optional trailing × for dismissing the pill</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>As toggleable filter chips in search or filter interfaces</li>
        <li>For multi-select option groups (interests, categories, preferences)</li>
        <li>As selectable tags in forms where users pick from predefined options</li>
        <li>For toggling features or settings on/off in a compact layout</li>
        <li>As interactive alternatives to checkboxes in horizontal layouts</li>
      </ul>

      <h2>Pills vs Tags vs Badges</h2>
      <table>
        <thead><tr><th>Aspect</th><th>Pills</th><th>Tags</th><th>Badges</th></tr></thead>
        <tbody>
          <tr><td>Behavior</td><td>Toggle selected/unselected on click</td><td>Static or closable labels</td><td>Static status indicators</td></tr>
          <tr><td>Unselected</td><td>Outlined border, transparent bg</td><td>Filled background</td><td>Filled background</td></tr>
          <tr><td>Selected</td><td>Filled bg, white text</td><td>N/A — no toggle</td><td>N/A — no toggle</td></tr>
          <tr><td>Purpose</td><td>User selection / filtering</td><td>Content categorization</td><td>Status / counts</td></tr>
          <tr><td>Shape</td><td>Pill (9999px)</td><td>Pill (9999px)</td><td>Rounded rect (4px)</td></tr>
          <tr><td>ARIA role</td><td>switch</td><td>listitem</td><td>status</td></tr>
        </tbody>
      </table>

      <h2>Best Practices</h2>
      <DoDont
        slug="pills"
        doItems={[
          'Use pills for interactive selection — they should always toggle on click',
          'Keep pill labels short — 1 to 3 words maximum',
          'Use consistent variant colors within the same pill group',
          'Provide clear visual distinction between selected and unselected states',
          'Use the onToggle callback for controlled state management',
        ]}
        dontItems={[
          'Don\'t use pills for static labels — use tags or badges instead',
          'Don\'t use pills for long text or full sentences',
          'Don\'t mix too many color variants in a single group',
          'Don\'t use pills as navigation links or primary action buttons',
          'Don\'t disable pills without clear visual indication and reason',
        ]}
      />

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should be 1–3 words maximum</li>
        <li>Use sentence case for option labels (e.g., &quot;Design system&quot;)</li>
        <li>Use title case for proper nouns (e.g., &quot;TypeScript&quot;, &quot;React&quot;)</li>
        <li>Icons should reinforce the label meaning, not replace it</li>
        <li>Close buttons should only appear when pills are dismissible</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>switch</td><td>Identifies the pill as a toggleable control</td></tr>
          <tr><td>aria-checked</td><td>boolean</td><td>Reflects the current selected state</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Descriptive text for the pill content</td></tr>
          <tr><td>disabled</td><td>boolean</td><td>Native disabled attribute prevents interaction</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Text against background meets WCAG AA</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter / Space</td><td>Focus and toggle pills via keyboard</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Tags</strong> — Static keyword labels for content categorization</li>
        <li><strong>Badge</strong> — Compact status labels with counts and indicators</li>
        <li><strong>Filter</strong> — Filter controls for narrowing content</li>
        <li><strong>Checkbox</strong> — Standard form toggle for boolean values</li>
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
        <li>Added toggle behavior with <code>selected</code> and <code>onToggle</code> props</li>
        <li>Added <code>closable</code> prop with trailing close button</li>
        <li>Added <code>disabled</code> state support</li>
        <li>Added leading icon support via <code>icon</code> prop</li>
        <li>9 color variants: Black, White, Coal, Blue, Success, Error, Warning, Legacy Blue, DLV Red</li>
        <li>Two sizes: Small (24px) and Medium (32px)</li>
        <li>Pill shape (border-radius: 9999px) for visual distinction</li>
        <li>Unselected state: outlined border, transparent background</li>
        <li>Selected state: filled background, white text</li>
        <li>Hover scale and press scale interaction states</li>
        <li>Accessibility: role=&quot;switch&quot;, aria-checked, keyboard support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with basic pill chip support</li>
        <li>5 color variants: Black, White, Blue, Success, Error</li>
        <li>Single size (28px)</li>
        <li>Static display only — no toggle or icon support</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function PillsPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Pills"
      description="Pills are interactive selectable chips with toggle behavior for filtering and multi-select."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
