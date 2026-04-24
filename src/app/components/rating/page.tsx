'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Star Icon ── */
function StarIcon({ size = 24, filled = 0, color = '#F5A623' }: { size?: number; filled?: number; color?: string }) {
  const empty = '#CCC';
  if (filled >= 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (filled > 0 && filled < 1) {
    const id = `half-${Math.random().toString(36).slice(2, 8)}`;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <defs>
          <linearGradient id={id}>
            <stop offset={`${filled * 100}%`} stopColor={color} />
            <stop offset={`${filled * 100}%`} stopColor={empty} />
          </linearGradient>
        </defs>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" fill={`url(#${id})`} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={empty}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

/* ── Rating Demo ── */
function RatingDemo({
  variant = 'default',
  starSize = 24,
  theme,
  maxStars = 5,
  initialValue = 0,
}: {
  variant?: 'default' | 'readonly' | 'half' | 'withcount';
  starSize?: number;
  theme: 'light' | 'dark';
  maxStars?: number;
  initialValue?: number;
}) {
  const [value, setValue] = useState(initialValue);
  const [hoverValue, setHoverValue] = useState(0);
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const isReadOnly = variant === 'readonly';
  const isHalf = variant === 'half';
  const showCount = variant === 'withcount';

  const displayValue = isHalf ? (initialValue || 3.5) : value;
  const activeValue = hoverValue || displayValue;

  const handleClick = (star: number) => {
    if (isReadOnly || isHalf) return;
    setValue(star === value ? 0 : star);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ display: 'flex', gap: 2, cursor: isReadOnly || isHalf ? 'default' : 'pointer' }}>
        {Array.from({ length: maxStars }, (_, i) => {
          const star = i + 1;
          let filled = 0;
          if (isHalf) {
            const diff = activeValue - i;
            filled = diff >= 1 ? 1 : diff > 0 ? diff : 0;
          } else {
            filled = star <= activeValue ? 1 : 0;
          }
          return (
            <span
              key={i}
              onClick={() => handleClick(star)}
              onMouseEnter={() => !isReadOnly && !isHalf && setHoverValue(star)}
              onMouseLeave={() => !isReadOnly && !isHalf && setHoverValue(0)}
              style={{ display: 'inline-flex', transition: 'transform 0.1s', transform: hoverValue === star ? 'scale(1.2)' : 'scale(1)' }}
            >
              <StarIcon size={starSize} filled={filled} />
            </span>
          );
        })}
      </div>
      {(showCount || isHalf) && (
        <span style={{ fontSize: starSize * 0.55, fontWeight: 600, color: text, marginLeft: 4 }}>
          {isHalf ? displayValue.toFixed(1) : value.toFixed(1)}
        </span>
      )}
      {showCount && <span style={{ fontSize: starSize * 0.45, color: text, opacity: 0.5 }}>(128 reviews)</span>}
    </div>
  );
}

/* ── Preview Section ── */
function RatingExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { size: string; theme: 'light' | 'dark'; variant: string }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState('md');
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
        <select value={size} onChange={e => setSize(e.target.value)} style={selectStyle}>
          <option value="sm">SM (16px)</option>
          <option value="md">MD (24px)</option>
          <option value="lg">LG (32px)</option>
        </select>
        <select value={variant} onChange={e => setVariant(e.target.value)} style={selectStyle}>
          <option value="default">Default</option>
          <option value="readonly">Read Only</option>
          <option value="half">Half Stars</option>
          <option value="withcount">With Count</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        {children({ size, theme, variant })}
      </div>
    </div>
  );
}

const sizeMap: Record<string, number> = { sm: 16, md: 24, lg: 32 };

/* ── TAB 1 — Examples ── */
function ExamplesTab() {
  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-rating--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-rating--playground"
        height={420}
        title="Rating — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>Rating components allow users to view or set a star-based score. They support interactive selection, read-only display, half-star precision, and review counts.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Default (interactive), Read Only, Half Stars, With Count</td></tr>
          <tr><td>Sizes</td><td>Small (16px), Medium (24px), Large (32px)</td></tr>
          <tr><td>States</td><td>Empty, Hovered, Selected, Disabled</td></tr>
          <tr><td>Features</td><td>Hover preview, Click to set, Numeric display, Review count</td></tr>
        </tbody>
      </table>

      <h2>Interactive Demo</h2>
      <RatingExampleSection title="Rating Variants" desc="Hover over stars to preview, click to set a rating. Try different variants and sizes.">
        {({ size, theme, variant }) => (
          <RatingDemo variant={variant as 'default' | 'readonly' | 'half' | 'withcount'} starSize={sizeMap[size]} theme={theme} initialValue={variant === 'half' ? 3.5 : variant === 'readonly' ? 4 : 0} />
        )}
      </RatingExampleSection>

      <h2>All Variants</h2>
      <RatingExampleSection title="Interactive Rating" desc="Click stars to set a rating. Click the same star again to clear.">
        {({ size, theme }) => <RatingDemo variant="default" starSize={sizeMap[size]} theme={theme} />}
      </RatingExampleSection>

      <RatingExampleSection title="Read Only" desc="Displays a fixed rating that cannot be changed by the user.">
        {({ size, theme }) => <RatingDemo variant="readonly" starSize={sizeMap[size]} theme={theme} initialValue={4} />}
      </RatingExampleSection>

      <RatingExampleSection title="Half Stars" desc="Supports fractional ratings for more precise scores.">
        {({ size, theme }) => <RatingDemo variant="half" starSize={sizeMap[size]} theme={theme} initialValue={3.5} />}
      </RatingExampleSection>

      <RatingExampleSection title="With Count" desc="Shows the numeric value and review count alongside stars.">
        {({ size, theme }) => <RatingDemo variant="withcount" starSize={sizeMap[size]} theme={theme} />}
      </RatingExampleSection>

      <h2>Sizes</h2>
      <ComponentExampleSection title="Size Comparison" desc="Ratings come in three sizes for different layout contexts.">
        {({ theme }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <RatingDemo variant="default" starSize={16} theme={theme as 'light' | 'dark'} initialValue={3} />
            <RatingDemo variant="default" starSize={24} theme={theme as 'light' | 'dark'} initialValue={3} />
            <RatingDemo variant="default" starSize={32} theme={theme as 'light' | 'dark'} initialValue={3} />
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
      <pre><code>{`import { Rating } from '@tarmac/design-system';`}</code></pre>
      <h2>Component API</h2>
      <pre><code>{`interface RatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  precision?: 0.5 | 1;
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  onChange?: (value: number) => void;
  onHover?: (value: number) => void;
  disabled?: boolean;
  color?: string;
}`}</code></pre>
      <h2>Basic Usage</h2>
      <pre><code>{`// Interactive rating
<Rating defaultValue={0} onChange={val => console.log(val)} />

// Read-only
<Rating value={4.5} readOnly />

// Half-star precision
<Rating value={3.5} precision={0.5} readOnly showValue />

// With review count
<Rating value={4.2} readOnly showValue showCount count={128} />

// Custom size
<Rating size="lg" defaultValue={3} />`}</code></pre>
      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>rating-star-size-sm</td><td>16px</td></tr>
          <tr><td>rating-star-size-md</td><td>24px</td></tr>
          <tr><td>rating-star-size-lg</td><td>32px</td></tr>
          <tr><td>rating-color-filled</td><td>#F5A623</td></tr>
          <tr><td>rating-color-empty</td><td>#CCCCCC</td></tr>
          <tr><td>rating-gap</td><td>2px</td></tr>
        </tbody>
      </table>
      <h2>Storybook</h2>
      <p>
        Explore all rating variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-rating--playground" target="_blank" rel="noopener noreferrer">TARMAC Storybook →</a>
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
          <tr><td>1</td><td>Star Container</td><td>Row of star icons representing the rating scale</td></tr>
          <tr><td>2</td><td>Filled Star</td><td>Colored star indicating the current rating value</td></tr>
          <tr><td>3</td><td>Empty Star</td><td>Unfilled star for remaining scale</td></tr>
          <tr><td>4</td><td>Half Star</td><td>Partially filled star for fractional values</td></tr>
          <tr><td>5</td><td>Value Label</td><td>Optional numeric display of the rating</td></tr>
          <tr><td>6</td><td>Count Label</td><td>Optional review count text</td></tr>
        </tbody>
      </table>
      <h2>When to Use</h2>
      <ul>
        <li>Product or service reviews and feedback</li>
        <li>User satisfaction surveys</li>
        <li>Content quality indicators</li>
        <li>Displaying aggregate scores from multiple reviews</li>
      </ul>
      <h2>Best Practices</h2>
      <DoDont
        slug="rating"
        doItems={[
          'Use 5 stars as the default scale for familiarity',
          'Show the numeric value alongside stars for precision',
          'Use half-star precision for read-only aggregate ratings',
          'Provide hover feedback for interactive ratings',
          'Include review count for credibility',
        ]}
        dontItems={[
          'Don\'t use ratings for binary yes/no feedback',
          'Don\'t allow fractional input — only display fractional values',
          'Don\'t use custom scales (e.g., 10 stars) without clear labels',
          'Don\'t hide the rating scale from screen readers',
          'Don\'t auto-submit on rating selection without confirmation',
        ]}
      />
      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>radiogroup</td><td>Groups stars as selectable options</td></tr>
          <tr><td>aria-label</td><td>&quot;Rating&quot;</td><td>Describes the rating component</td></tr>
          <tr><td>aria-valuenow</td><td>number</td><td>Current rating value</td></tr>
          <tr><td>aria-valuemin</td><td>0</td><td>Minimum rating</td></tr>
          <tr><td>aria-valuemax</td><td>5</td><td>Maximum rating</td></tr>
          <tr><td>Keyboard</td><td>Arrow keys</td><td>Navigate and set rating with arrow keys</td></tr>
        </tbody>
      </table>
      <h2>Related Components</h2>
      <ul>
        <li><strong>Slider</strong> — Continuous value selection on a track</li>
        <li><strong>Progress Bar</strong> — Visual representation of completion</li>
        <li><strong>Input</strong> — Numeric input for precise value entry</li>
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
        <li>Added half-star precision support</li>
        <li>Added <code>showValue</code> and <code>showCount</code> props</li>
        <li>Added hover preview with scale animation</li>
        <li>Added 3 size variants: sm, md, lg</li>
        <li>Improved keyboard navigation with arrow keys</li>
        <li>Added <code>disabled</code> state</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with interactive and read-only modes</li>
        <li>5-star scale with click-to-set behavior</li>
        <li>Single size (24px)</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function RatingPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Rating" description="Star-based rating component for collecting and displaying user feedback scores." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
