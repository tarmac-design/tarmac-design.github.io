'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Tag variant colors ── */
const variantColors: Record<string, { bg: string; text: string }> = {
  black:   { bg: '#0D0D0D', text: '#FFF' },
  white:   { bg: '#FFF',    text: '#0D0D0D' },
  coal:    { bg: '#525252', text: '#FFF' },
  blue:    { bg: '#2396FB', text: '#FFF' },
  success: { bg: '#1BA86E', text: '#FFF' },
  error:   { bg: '#DC143C', text: '#FFF' },
  warning: { bg: '#CF9F02', text: '#FFF' },
  'dlv-red': { bg: '#ED1B36', text: '#FFF' },
  'legacy-blue': { bg: '#1A73E8', text: '#FFF' },
};

const sizeMap: Record<string, { height: number; fontSize: number; px: number; iconSize: number }> = {
  sm: { height: 24, fontSize: 11, px: 8, iconSize: 12 },
  md: { height: 32, fontSize: 13, px: 12, iconSize: 14 },
};

const variantLabels: Record<string, string> = {
  black: 'Black', white: 'White', coal: 'Coal', blue: 'Blue',
  success: 'Success', error: 'Error', warning: 'Warning',
  'dlv-red': 'DLV Red', 'legacy-blue': 'Legacy Blue',
};

/* ── Tag Props Interface ── */
interface TagProps {
  variant?: string;
  label: string;
  icon?: ReactNode;
  closable?: boolean;
  statusDot?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  onClick?: () => void;
  onClose?: () => void;
  theme: 'light' | 'dark';
}

/* ── Tag Component ── */
function Tag({
  variant = 'blue',
  label,
  icon,
  closable = false,
  statusDot = false,
  disabled = false,
  size = 'md',
  onClick,
  onClose,
  theme,
}: TagProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const colors = variantColors[variant] || variantColors.blue;
  const s = sizeMap[size] || sizeMap.md;

  const opacity = disabled ? 0.4 : hovered ? 0.9 : 1;
  const scale = pressed && !disabled ? 0.95 : hovered && !disabled ? 1.05 : 1;

  const dotColor = colors.bg === '#FFF' ? '#0D0D0D' : colors.bg;

  return (
    <span
      style={{
        height: s.height,
        borderRadius: 9999,
        background: colors.bg,
        color: colors.text,
        fontSize: s.fontSize,
        fontWeight: 600,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: `0 ${s.px}px`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity,
        transform: `scale(${scale})`,
        transition: 'transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease',
        boxShadow: hovered && !disabled
          ? `0 2px 8px rgba(0,0,0,${theme === 'dark' ? '0.4' : '0.15'})`
          : 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        border: variant === 'white' ? '1px solid #E0E0E0' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={() => !disabled && onClick?.()}
      role="listitem"
      aria-label={label}
      aria-disabled={disabled}
    >
      {statusDot && (
        <span
          style={{
            width: size === 'sm' ? 6 : 8,
            height: size === 'sm' ? 6 : 8,
            borderRadius: '50%',
            background: variant === 'white' || variant === 'black' ? '#1BA86E' : '#FFF',
            flexShrink: 0,
          }}
        />
      )}
      {icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
      <span>{label}</span>
      {closable && (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            if (!disabled) onClose?.();
          }}
          aria-label={`Remove ${label}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
            padding: 0,
            marginLeft: 2,
            opacity: 0.7,
            borderRadius: '50%',
          }}
          disabled={disabled}
        >
          <svg width={s.iconSize} height={s.iconSize} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </button>
      )}
    </span>
  );
}

/* ── Demo icons ── */
function TagIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 2h5.5l6.5 6.5-5.5 5.5L2 7.5V2zm3 1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
    </svg>
  );
}

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

/* ── Tag Example Section with variant/size controls ── */
function TagExampleSection({
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
  const [removedTags, setRemovedTags] = useState<string[]>([]);
  const resetRemoved = () => setRemovedTags([]);

  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-chip--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-chip--playground"
        height={420}
        title="Tags — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        Tags are compact keyword labels used for content categorization and tagging.
        They render as small rounded pills (fully rounded) and are semantically distinct
        from badges — tags represent user-applied or content-derived keywords rather than
        status indicators.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Black, White, Coal, Blue, Success, Error, Warning, DLV Red, Legacy Blue</td></tr>
          <tr><td>Sizes</td><td>Small (24px), Medium (32px)</td></tr>
          <tr><td>States</td><td>Default, Hover, Pressed, Disabled</td></tr>
          <tr><td>Features</td><td>Leading icon, Close/remove button, Status dot</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <TagExampleSection
        title="Color Variants"
        desc="Each variant provides a distinct color for quick visual categorization. Hover and press to see interaction states."
      >
        {({ size, theme }) => (
          <>
            {Object.keys(variantColors).map(v => (
              <Tag key={v} variant={v} size={size} label={variantLabels[v]} theme={theme} />
            ))}
          </>
        )}
      </TagExampleSection>

      <h2>Closable Tags</h2>

      <TagExampleSection
        title="Removable Tags"
        desc="Tags with a close button for removable keywords or filters. Click × to remove."
      >
        {({ size, theme }) => {
          const tags = ['React', 'TypeScript', 'Design System', 'UI Kit', 'Tarmac'];
          const visible = tags.filter(t => !removedTags.includes(t));
          return (
            <>
              {visible.length === 0 ? (
                <button
                  onClick={resetRemoved}
                  style={{
                    padding: '6px 14px', borderRadius: 9999, fontSize: 13, fontWeight: 600,
                    background: 'var(--color-primary)', color: '#FFF', border: 'none', cursor: 'pointer',
                  }}
                >
                  Reset Tags
                </button>
              ) : (
                <>
                  {visible.map((t, i) => (
                    <Tag
                      key={t}
                      variant={['blue', 'success', 'coal', 'dlv-red', 'warning'][i % 5]}
                      size={size}
                      label={t}
                      closable
                      onClose={() => setRemovedTags(prev => [...prev, t])}
                      theme={theme}
                    />
                  ))}
                  {removedTags.length > 0 && (
                    <button
                      onClick={resetRemoved}
                      style={{
                        padding: '4px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 500,
                        background: 'transparent', color: 'var(--color-on-surface-variant)',
                        border: '1px dashed var(--color-outline)', cursor: 'pointer',
                      }}
                    >
                      Reset
                    </button>
                  )}
                </>
              )}
            </>
          );
        }}
      </TagExampleSection>

      <h2>With Icons</h2>

      <TagExampleSection
        title="Leading Icon Tags"
        desc="Tags can include a leading icon for additional visual context."
      >
        {({ size, theme }) => (
          <>
            <Tag variant="blue" size={size} label="Tagged" icon={<TagIcon size={size === 'sm' ? 10 : 12} />} theme={theme} />
            <Tag variant="success" size={size} label="Verified" icon={<CheckIcon size={size === 'sm' ? 10 : 12} />} theme={theme} />
            <Tag variant="warning" size={size} label="Featured" icon={<StarIcon size={size === 'sm' ? 10 : 12} />} theme={theme} />
            <Tag variant="dlv-red" size={size} label="Priority" icon={<TagIcon size={size === 'sm' ? 10 : 12} />} closable theme={theme} />
          </>
        )}
      </TagExampleSection>

      <h2>Status Dots</h2>

      <TagExampleSection
        title="Tags with Status Dot"
        desc="A small colored dot indicates live status alongside the tag label."
      >
        {({ size, theme }) => (
          <>
            <Tag variant="black" size={size} label="Online" statusDot theme={theme} />
            <Tag variant="coal" size={size} label="Active" statusDot theme={theme} />
            <Tag variant="white" size={size} label="Available" statusDot theme={theme} />
            <Tag variant="blue" size={size} label="Connected" statusDot theme={theme} />
          </>
        )}
      </TagExampleSection>

      <h2>States</h2>

      <TagExampleSection
        title="Default & Disabled"
        desc="Tags support disabled state for non-interactive contexts."
      >
        {({ size, theme }) => (
          <>
            <Tag variant="blue" size={size} label="Default" theme={theme} />
            <Tag variant="blue" size={size} label="With Icon" icon={<TagIcon />} theme={theme} />
            <Tag variant="blue" size={size} label="Closable" closable theme={theme} />
            <Tag variant="blue" size={size} label="Disabled" disabled theme={theme} />
            <Tag variant="blue" size={size} label="Disabled Closable" disabled closable theme={theme} />
          </>
        )}
      </TagExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Tags come in two sizes. Small for dense layouts, Medium as the default."
        sizes={['sm', 'md'] as ('sm' | 'md')[]}
      >
        {({ theme }) => (
          <>
            <Tag variant="blue" size="sm" label="Small" theme={theme as 'light' | 'dark'} />
            <Tag variant="blue" size="md" label="Medium" theme={theme as 'light' | 'dark'} />
            <Tag variant="success" size="sm" label="Small" icon={<CheckIcon size={10} />} closable theme={theme as 'light' | 'dark'} />
            <Tag variant="success" size="md" label="Medium" icon={<CheckIcon size={12} />} closable theme={theme as 'light' | 'dark'} />
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
      <pre><code>{`import { Tag } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface TagProps {
  variant?: 'black' | 'white' | 'coal' | 'blue' | 'success' | 'error'
           | 'warning' | 'dlv-red' | 'legacy-blue';
  label: string;
  icon?: ReactNode;
  closable?: boolean;
  statusDot?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  onClick?: () => void;
  onClose?: () => void;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Simple tag
<Tag label="React" />

// Variant colors
<Tag variant="success" label="Active" />
<Tag variant="error" label="Deprecated" />
<Tag variant="dlv-red" label="Urgent" />

// With leading icon
<Tag variant="blue" label="Tagged" icon={<TagIcon />} />

// Closable tag
<Tag variant="coal" label="Filter" closable onClose={() => handleRemove()} />

// With status dot
<Tag variant="black" label="Online" statusDot />

// Disabled state
<Tag variant="blue" label="Archived" disabled />

// Size variants
<Tag variant="blue" size="sm" label="Small" />
<Tag variant="blue" size="md" label="Medium" />`}</code></pre>

      <h2>Closable Tag List</h2>
      <pre><code>{`function TagList() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS']);

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tags.map(tag => (
        <Tag
          key={tag}
          label={tag}
          closable
          onClose={() => removeTag(tag)}
        />
      ))}
    </div>
  );
}`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>tag-height-sm</td><td>24px</td></tr>
          <tr><td>tag-height-md</td><td>32px</td></tr>
          <tr><td>tag-border-radius</td><td>9999px (pill)</td></tr>
          <tr><td>tag-font-size-sm</td><td>11px</td></tr>
          <tr><td>tag-font-size-md</td><td>13px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Background</th><th>Text</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>#FFFFFF</td></tr>
          <tr><td>white</td><td>#FFFFFF</td><td>#0D0D0D</td></tr>
          <tr><td>coal</td><td>#525252</td><td>#FFFFFF</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>#FFFFFF</td></tr>
          <tr><td>success</td><td>#1BA86E</td><td>#FFFFFF</td></tr>
          <tr><td>error</td><td>#DC143C</td><td>#FFFFFF</td></tr>
          <tr><td>warning</td><td>#CF9F02</td><td>#FFFFFF</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>#FFFFFF</td></tr>
          <tr><td>legacy-blue</td><td>#1A73E8</td><td>#FFFFFF</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all tag variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-tag--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Fully rounded pill wrapper defining the tag boundary</td></tr>
          <tr><td>2</td><td>Background</td><td>Color fill determined by variant</td></tr>
          <tr><td>3</td><td>Label</td><td>Keyword text — category, topic, or filter name</td></tr>
          <tr><td>4</td><td>Leading Icon</td><td>Optional icon before the label for visual context</td></tr>
          <tr><td>5</td><td>Status Dot</td><td>Optional colored dot indicating live status</td></tr>
          <tr><td>6</td><td>Close Button</td><td>Optional × button for removable tags</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To label content with keywords or categories</li>
        <li>As removable filter chips in search or filter interfaces</li>
        <li>To display technology stacks, skills, or topic labels</li>
        <li>To show applied filters that users can dismiss</li>
        <li>For content tagging in articles, products, or listings</li>
      </ul>

      <h2>Tags vs Badges</h2>
      <table>
        <thead><tr><th>Aspect</th><th>Tags</th><th>Badges</th></tr></thead>
        <tbody>
          <tr><td>Shape</td><td>Fully rounded pill (border-radius: 9999px)</td><td>Slightly rounded (border-radius: 4px)</td></tr>
          <tr><td>Purpose</td><td>Content categorization and keywords</td><td>Status indicators and counts</td></tr>
          <tr><td>Interaction</td><td>Often closable/removable</td><td>Typically static</td></tr>
          <tr><td>Semantics</td><td>User-applied or content-derived labels</td><td>System-generated status</td></tr>
        </tbody>
      </table>

      <h2>Best Practices</h2>
      <DoDont
        slug="tags"
        doItems={[
          'Use tags for content categorization and keyword labeling',
          'Keep tag labels short — 1 to 3 words maximum',
          'Provide a close button when tags are user-removable',
          'Use consistent variant colors within the same context',
          'Include aria-label for screen readers on interactive tags',
        ]}
        dontItems={[
          'Don\'t use tags for status indicators — use badges instead',
          'Don\'t use tags for long text or full sentences',
          'Don\'t mix too many color variants in a single group',
          'Don\'t use tags as primary action buttons',
          'Don\'t disable tags without clear visual indication',
        ]}
      />

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should be 1–3 words maximum</li>
        <li>Use sentence case for keyword tags (e.g., &quot;Design system&quot;)</li>
        <li>Use title case for proper nouns (e.g., &quot;TypeScript&quot;, &quot;React&quot;)</li>
        <li>Icons should reinforce the label meaning, not replace it</li>
        <li>Status dots should only appear when live status is relevant</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>listitem</td><td>Identifies the tag within a list of tags</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Descriptive text for the tag content</td></tr>
          <tr><td>aria-disabled</td><td>boolean</td><td>Indicates disabled state to assistive tech</td></tr>
          <tr><td>Close button</td><td>aria-label=&quot;Remove [label]&quot;</td><td>Accessible label for the dismiss action</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Text against background meets WCAG AA</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter / Space</td><td>Focus and activate closable tags</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Badge</strong> — Compact status labels with counts and indicators</li>
        <li><strong>Pills</strong> — Interactive selectable chips with toggle behavior</li>
        <li><strong>Filter</strong> — Filter controls for narrowing content</li>
        <li><strong>Status Indicator</strong> — Standalone colored dots for presence</li>
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
        <li>Added <code>statusDot</code> prop for live status indication</li>
        <li>Added <code>closable</code> prop with accessible close button</li>
        <li>Added <code>disabled</code> state support</li>
        <li>Added leading icon support via <code>icon</code> prop</li>
        <li>New variants: Legacy Blue, DLV Red</li>
        <li>Two sizes: Small (24px) and Medium (32px)</li>
        <li>Pill shape (border-radius: 9999px) for visual distinction from badges</li>
        <li>Hover scale and press scale interaction states</li>
        <li>Improved accessibility with aria-disabled and descriptive close labels</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with basic keyword tag support</li>
        <li>5 color variants: Black, White, Blue, Success, Error</li>
        <li>Single size (28px)</li>
        <li>Static display only — no close or icon support</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function TagsPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Tags"
      description="Tags are keyword labels used for content categorization and tagging."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
