'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Badge variant colors ── */
const variantColors: Record<string, { bg: string; text: string }> = {
  black:   { bg: '#0D0D0D', text: '#FFF' },
  white:   { bg: '#FFF',    text: '#0D0D0D' },
  coal:    { bg: '#525252', text: '#FFF' },
  'dlv-red': { bg: '#ED1B36', text: '#FFF' },
  blue:    { bg: '#2396FB', text: '#FFF' },
  success: { bg: '#1BA86E', text: '#FFF' },
  warning: { bg: '#CF9F02', text: '#FFF' },
  error:   { bg: '#DC143C', text: '#FFF' },
};

const sizeMap: Record<string, number> = { sm: 20, md: 24, lg: 28 };

const variantLabels: Record<string, string> = {
  black: 'Black', white: 'White', coal: 'Coal', 'dlv-red': 'DLV Red',
  blue: 'Info', success: 'Success', warning: 'Warning', error: 'Error',
};

/* ── Badge Demo Pill ── */
function BadgePill({
  variant = 'blue',
  badgeStyle = 'filled',
  size = 'md',
  label,
  icon,
  closable,
  disabled,
  ghost,
  theme,
}: {
  variant?: string;
  badgeStyle?: 'filled' | 'subtle' | 'outlined';
  size?: string;
  label: string;
  icon?: ReactNode;
  closable?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  theme: 'light' | 'dark';
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const colors = variantColors[variant] || variantColors.blue;
  const h = sizeMap[size] || 24;
  const fontSize = h <= 20 ? 11 : h <= 24 ? 12 : 13;

  let bg = colors.bg;
  let textColor = colors.text;
  let border = 'none';

  if (badgeStyle === 'subtle') {
    bg = colors.bg + '1A'; // 10% opacity
    textColor = colors.bg === '#FFF' ? '#0D0D0D' : colors.bg;
    if (theme === 'dark' && variant !== 'white') {
      bg = colors.bg + '33';
    }
  } else if (badgeStyle === 'outlined') {
    bg = 'transparent';
    textColor = colors.bg === '#FFF' ? '#0D0D0D' : colors.bg;
    border = `1px solid ${textColor}`;
  }

  if (ghost) {
    bg = 'transparent';
    textColor = theme === 'dark' ? '#666' : '#999';
    border = `1px dashed ${textColor}`;
  }

  const opacity = disabled ? 0.4 : ghost ? 0.6 : hovered ? 0.88 : 1;
  const scale = pressed && !disabled ? 0.95 : hovered && !disabled ? 1.04 : 1;

  return (
    <div
      style={{
        height: h,
        borderRadius: 4,
        background: bg,
        color: textColor,
        fontSize,
        fontWeight: 600,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: `0 ${h <= 20 ? 6 : 8}px`,
        border,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity,
        transform: `scale(${scale})`,
        transition: 'transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease',
        boxShadow: hovered && !disabled && !ghost
          ? `0 2px 8px rgba(0,0,0,${theme === 'dark' ? '0.4' : '0.15'})`
          : 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      role="status"
      aria-label={label}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {label}
      {closable && (
        <span style={{ display: 'flex', alignItems: 'center', marginLeft: 2, opacity: 0.7 }}>
          <svg width={fontSize - 1} height={fontSize - 1} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </span>
      )}
    </div>
  );
}

/* ── Small star icon for demos ── */
function StarIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .5l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.1 3.8 13.5l.8-4.7L1.2 5.5l4.7-.7z" />
    </svg>
  );
}

/* ── Badge Example Section with style/variant controls ── */
function BadgeExampleSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: (props: { size: string; theme: 'light' | 'dark'; badgeStyle: 'filled' | 'subtle' | 'outlined' }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState('md');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [badgeStyle, setBadgeStyle] = useState<'filled' | 'subtle' | 'outlined'>('filled');

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
          <option value="sm">SM (20px)</option>
          <option value="md">MD (24px)</option>
          <option value="lg">LG (28px)</option>
        </select>
        <select value={badgeStyle} onChange={e => setBadgeStyle(e.target.value as 'filled' | 'subtle' | 'outlined')} style={selectStyle}>
          <option value="filled">Filled</option>
          <option value="subtle">Subtle</option>
          <option value="outlined">Outlined</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {children({ size, theme, badgeStyle })}
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
      <StorybookVariantViewer slug="badge" />
      <h2>Overview</h2>
      <p>
        Badges are compact label components used to convey status, categories, or counts.
        They appear as small rounded pills with colored backgrounds and support multiple
        variants, sizes, and styles.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Black, White, Coal, DLV Red, Info (Blue), Success, Warning, Error</td></tr>
          <tr><td>Sizes</td><td>Small (20px), Medium (24px), Large (28px)</td></tr>
          <tr><td>Styles</td><td>Filled, Subtle, Outlined</td></tr>
          <tr><td>States</td><td>Default, Hover, Disabled, Ghost</td></tr>
          <tr><td>Features</td><td>Leading icon, Trailing icon, Close button</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <BadgeExampleSection
        title="Color Variants — Filled"
        desc="Each variant has a distinct background color for quick visual identification. Hover and press to see interaction states."
      >
        {({ size, theme, badgeStyle }) => (
          <>
            {Object.keys(variantColors).map(v => (
              <BadgePill key={v} variant={v} badgeStyle={badgeStyle} size={size} label={variantLabels[v]} theme={theme} />
            ))}
          </>
        )}
      </BadgeExampleSection>

      <h2>Styles</h2>

      <BadgeExampleSection
        title="Filled vs Subtle vs Outlined"
        desc="Three visual styles for different emphasis levels. Filled for high emphasis, Subtle for medium, Outlined for low."
      >
        {({ size, theme }) => (
          <>
            <BadgePill variant="blue" badgeStyle="filled" size={size} label="Filled" theme={theme} />
            <BadgePill variant="blue" badgeStyle="subtle" size={size} label="Subtle" theme={theme} />
            <BadgePill variant="blue" badgeStyle="outlined" size={size} label="Outlined" theme={theme} />
            <BadgePill variant="success" badgeStyle="filled" size={size} label="Filled" theme={theme} />
            <BadgePill variant="success" badgeStyle="subtle" size={size} label="Subtle" theme={theme} />
            <BadgePill variant="success" badgeStyle="outlined" size={size} label="Outlined" theme={theme} />
            <BadgePill variant="error" badgeStyle="filled" size={size} label="Filled" theme={theme} />
            <BadgePill variant="error" badgeStyle="subtle" size={size} label="Subtle" theme={theme} />
            <BadgePill variant="error" badgeStyle="outlined" size={size} label="Outlined" theme={theme} />
          </>
        )}
      </BadgeExampleSection>

      <h2>With Icons</h2>

      <BadgeExampleSection
        title="Leading Icon"
        desc="Badges can include a leading icon for additional context."
      >
        {({ size, theme, badgeStyle }) => (
          <>
            <BadgePill variant="success" badgeStyle={badgeStyle} size={size} label="Active" icon={<StarIcon />} theme={theme} />
            <BadgePill variant="blue" badgeStyle={badgeStyle} size={size} label="New" icon={<StarIcon />} theme={theme} />
            <BadgePill variant="warning" badgeStyle={badgeStyle} size={size} label="Pending" icon={<StarIcon />} theme={theme} />
            <BadgePill variant="error" badgeStyle={badgeStyle} size={size} label="Urgent" icon={<StarIcon />} theme={theme} />
          </>
        )}
      </BadgeExampleSection>

      <BadgeExampleSection
        title="Closable Badges"
        desc="Badges with a close button, commonly used for removable tags or filters."
      >
        {({ size, theme, badgeStyle }) => (
          <>
            <BadgePill variant="blue" badgeStyle={badgeStyle} size={size} label="Filter" closable theme={theme} />
            <BadgePill variant="coal" badgeStyle={badgeStyle} size={size} label="Category" closable theme={theme} />
            <BadgePill variant="success" badgeStyle={badgeStyle} size={size} label="Tag" closable icon={<StarIcon />} theme={theme} />
          </>
        )}
      </BadgeExampleSection>

      <h2>States</h2>

      <BadgeExampleSection
        title="Default, Disabled & Ghost"
        desc="Badges support disabled and ghost states for inactive or placeholder contexts."
      >
        {({ size, theme, badgeStyle }) => (
          <>
            <BadgePill variant="blue" badgeStyle={badgeStyle} size={size} label="Default" theme={theme} />
            <BadgePill variant="blue" badgeStyle={badgeStyle} size={size} label="Disabled" disabled theme={theme} />
            <BadgePill variant="blue" badgeStyle={badgeStyle} size={size} label="Ghost" ghost theme={theme} />
          </>
        )}
      </BadgeExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Badges come in three sizes. Small for dense layouts, Medium as default, Large for prominent labels."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ theme }) => (
          <>
            <BadgePill variant="blue" size="sm" label="Small" theme={theme as 'light' | 'dark'} />
            <BadgePill variant="blue" size="md" label="Medium" theme={theme as 'light' | 'dark'} />
            <BadgePill variant="blue" size="lg" label="Large" theme={theme as 'light' | 'dark'} />
          </>
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
      <pre><code>{`import { Badge } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface BadgeProps {
  variant?: 'black' | 'white' | 'coal' | 'dlv-red' | 'blue' | 'success' | 'warning' | 'error';
  style?: 'filled' | 'subtle' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  closable?: boolean;
  children: ReactNode;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Filled badge (default)
<Badge variant="success">Active</Badge>

// Subtle style
<Badge variant="blue" style="subtle">Info</Badge>

// Outlined style
<Badge variant="error" style="outlined">Critical</Badge>

// With leading icon
<Badge variant="warning" icon={<AlertIcon />}>Pending</Badge>

// Closable badge
<Badge variant="coal" closable onClose={() => handleRemove()}>
  Filter Tag
</Badge>

// Size variants
<Badge variant="blue" size="sm">Small</Badge>
<Badge variant="blue" size="md">Medium</Badge>
<Badge variant="blue" size="lg">Large</Badge>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>badge-height-sm</td><td>20px</td></tr>
          <tr><td>badge-height-md</td><td>24px</td></tr>
          <tr><td>badge-height-lg</td><td>28px</td></tr>
          <tr><td>badge-border-radius</td><td>4px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Background</th><th>Text</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>#FFFFFF</td></tr>
          <tr><td>white</td><td>#FFFFFF</td><td>#0D0D0D</td></tr>
          <tr><td>coal</td><td>#525252</td><td>#FFFFFF</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>#FFFFFF</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>#FFFFFF</td></tr>
          <tr><td>success</td><td>#1BA86E</td><td>#FFFFFF</td></tr>
          <tr><td>warning</td><td>#CF9F02</td><td>#FFFFFF</td></tr>
          <tr><td>error</td><td>#DC143C</td><td>#FFFFFF</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all badge variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-badge--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Rounded pill wrapper defining the badge boundary</td></tr>
          <tr><td>2</td><td>Background</td><td>Color fill determined by variant and style</td></tr>
          <tr><td>3</td><td>Label</td><td>Text content — status, count, or category name</td></tr>
          <tr><td>4</td><td>Leading Icon</td><td>Optional icon before the label</td></tr>
          <tr><td>5</td><td>Close Button</td><td>Optional dismiss action for removable badges</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To display status labels (Active, Pending, Error)</li>
        <li>To show counts or numeric indicators</li>
        <li>To categorize or tag items in lists and tables</li>
        <li>As removable filter chips in search interfaces</li>
        <li>To highlight priority or severity levels</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="badge"
        doItems={[
          'Use semantic color variants — green for success, red for error',
          'Keep badge labels short and scannable (1–2 words)',
          'Use consistent sizing within the same context',
          'Provide aria-label for screen readers when meaning is color-dependent',
          'Use subtle or outlined styles for lower-emphasis contexts',
        ]}
        dontItems={[
          'Don\'t use badges for long text or sentences',
          'Don\'t mix filled and outlined styles in the same group',
          'Don\'t rely on color alone to convey meaning',
          'Don\'t use badges as primary action buttons',
          'Don\'t use more than 3–4 badges in a single row',
        ]}
      />

      <h2>Style Guide</h2>
      <table>
        <thead><tr><th>Style</th><th>Use Case</th><th>Emphasis</th></tr></thead>
        <tbody>
          <tr><td>Filled</td><td>Primary status, high-visibility labels</td><td>High</td></tr>
          <tr><td>Subtle</td><td>Secondary info, inline metadata</td><td>Medium</td></tr>
          <tr><td>Outlined</td><td>Tertiary labels, low-emphasis tags</td><td>Low</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should be 1–2 words maximum</li>
        <li>Use title case for status labels (e.g., &quot;In Progress&quot;)</li>
        <li>Numeric badges should show the actual count or &quot;99+&quot; for overflow</li>
        <li>Icons should reinforce the label meaning, not replace it</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>status</td><td>Identifies the badge as a status indicator</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Descriptive text when color conveys meaning</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Text against background meets WCAG AA</td></tr>
          <tr><td>Close button</td><td>aria-label=&quot;Remove&quot;</td><td>Accessible label for the dismiss action</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter / Space</td><td>Focus and activate closable badges</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Pills</strong> — Interactive selectable chips with toggle behavior</li>
        <li><strong>Tags</strong> — Keyword labels for content categorization</li>
        <li><strong>Status Indicator</strong> — Standalone colored dots for presence</li>
        <li><strong>Avatar</strong> — Badges can overlay avatars for notification counts</li>
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
        <li>Added <code>subtle</code> and <code>outlined</code> style variants</li>
        <li>Added <code>ghost</code> and <code>disabled</code> states</li>
        <li>Added <code>closable</code> prop with close button</li>
        <li>Added leading and trailing icon support</li>
        <li>New color variants: Coal, DLV Red, Cardbox</li>
        <li>Updated sizing tokens: SM (20px), MD (24px), LG (28px)</li>
        <li>Improved accessibility with role=&quot;status&quot; and aria-label support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with Numeric, Dot, and Standalone variants</li>
        <li>5 color options: Error, Warning, Success, Info, Neutral</li>
        <li>Single size (20px)</li>
        <li>Basic count overflow (99+)</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function BadgePage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Badge"
      description="Badges are compact labels used for status, counts, and categories."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
