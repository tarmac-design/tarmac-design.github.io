'use client';

import { useState, useEffect } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Variant colors ── */
const variantColors: Record<string, string> = {
  black: '#0D0D0D',
  blue: '#2396FB',
  success: '#1BA86E',
  error: '#DC143C',
  warning: '#CF9F02',
  'dlv-red': '#ED1B36',
};

const variantLabels: Record<string, string> = {
  black: 'Black',
  blue: 'Blue',
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  'dlv-red': 'DLV Red',
};

const sizeHeights: Record<string, number> = { sm: 4, md: 8, lg: 12 };

/* ── Keyframes injected once ── */
const indeterminateKeyframes = `
@keyframes progressIndeterminate {
  0%   { left: -35%; width: 35%; }
  60%  { left: 100%; width: 35%; }
  100% { left: 100%; width: 35%; }
}
`;

/* ── ProgressBar Demo Component ── */
function ProgressBarDemo({
  value = 50,
  variant = 'blue',
  size = 'md',
  indeterminate = false,
  showLabel = false,
  label,
  theme,
}: {
  value?: number;
  variant?: string;
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
  showLabel?: boolean;
  label?: string;
  theme: 'light' | 'dark';
}) {
  const height = sizeHeights[size] || 8;
  const fillColor = variantColors[variant] || variantColors.blue;
  const trackBg = theme === 'dark' ? '#333' : '#E0E0E0';
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div style={{ width: '100%', minWidth: 180 }}>
      {(showLabel || label) && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 6, fontSize: 13, color: theme === 'dark' ? '#CCC' : '#444',
        }}>
          {label && <span>{label}</span>}
          {showLabel && !indeterminate && (
            <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{clampedValue}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
        style={{
          width: '100%', height, borderRadius: height,
          background: trackBg, overflow: 'hidden', position: 'relative',
        }}
      >
        {indeterminate ? (
          <div style={{
            position: 'absolute', top: 0, bottom: 0,
            background: fillColor, borderRadius: height,
            animation: 'progressIndeterminate 1.8s ease-in-out infinite',
          }} />
        ) : (
          <div style={{
            width: `${clampedValue}%`, height: '100%',
            background: fillColor, borderRadius: height,
            transition: 'width 0.4s ease',
          }} />
        )}
      </div>
    </div>
  );
}


/* ── Custom example section with variant + size controls ── */
function ProgressExampleSection({
  title, desc, children,
}: {
  title: string;
  desc: string;
  children: (props: { size: 'sm' | 'md' | 'lg'; theme: 'light' | 'dark'; variant: string }) => React.ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState('blue');

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
        <select value={size} onChange={e => setSize(e.target.value as 'sm' | 'md' | 'lg')} style={selectStyle}>
          <option value="sm">SM (4px)</option>
          <option value="md">MD (8px)</option>
          <option value="lg">LG (12px)</option>
        </select>
        <select value={variant} onChange={e => setVariant(e.target.value)} style={selectStyle}>
          {Object.keys(variantColors).map(v => (
            <option key={v} value={v}>{variantLabels[v]}</option>
          ))}
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {children({ size, theme, variant })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  const [interactiveValue, setInteractiveValue] = useState(65);
  const { theme: globalTheme } = useTheme();
  const [demoTheme, setDemoTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');

  useEffect(() => { setDemoTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);

  const demoBg = demoTheme === 'dark' ? '#1A1A1A' : '#F5F5F5';

  return (
    <>
      <StorybookVariantViewer slug="progress-bar" />
      <style>{indeterminateKeyframes}</style>

      <h2>Overview</h2>
      <p>
        Progress bars are visual indicators of completion or loading progress. They render as
        a horizontal track with an animated colored fill, supporting both determinate (percentage-based)
        and indeterminate (loading) modes.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Types</td><td>Determinate (with percentage), Indeterminate (animated loading)</td></tr>
          <tr><td>Variants</td><td>Black, Blue, Success, Error, Warning, DLV Red</td></tr>
          <tr><td>Sizes</td><td>Small (4px), Medium (8px), Large (12px)</td></tr>
          <tr><td>States</td><td>Default, Loading (indeterminate), Complete</td></tr>
          <tr><td>Features</td><td>Percentage label, Text description, Animated fill</td></tr>
        </tbody>
      </table>

      <h2>Interactive Demo</h2>
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>Adjust Progress</h3>
        <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>
          Use the slider to control the progress bar value interactively.
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <select value={demoTheme} onChange={e => setDemoTheme(e.target.value as 'light' | 'dark')} style={{
            padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
            background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
          }}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div style={{ background: demoBg, borderRadius: 12, padding: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <input
              type="range" min={0} max={100} value={interactiveValue}
              onChange={e => setInteractiveValue(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#2396FB' }}
              aria-label="Progress value slider"
            />
          </div>
          <ProgressBarDemo value={interactiveValue} variant="blue" size="md" showLabel label="Upload progress" theme={demoTheme} />
          <div style={{ marginTop: 12 }}>
            <ProgressBarDemo value={interactiveValue} variant="success" size="lg" showLabel label="Download progress" theme={demoTheme} />
          </div>
          <div style={{ marginTop: 12 }}>
            <ProgressBarDemo value={interactiveValue} variant="dlv-red" size="sm" showLabel theme={demoTheme} />
          </div>
        </div>
      </div>

      <h2>All Variants</h2>

      <ProgressExampleSection
        title="Color Variants"
        desc="Each variant uses a distinct fill color for quick visual identification."
      >
        {({ size, theme }) => (
          <>
            {Object.keys(variantColors).map(v => (
              <ProgressBarDemo key={v} value={70} variant={v} size={size} showLabel label={variantLabels[v]} theme={theme} />
            ))}
          </>
        )}
      </ProgressExampleSection>

      <h2>Types</h2>

      <ProgressExampleSection
        title="Determinate vs Indeterminate"
        desc="Determinate shows a specific percentage. Indeterminate uses a sliding animation for unknown durations."
      >
        {({ size, theme, variant }) => (
          <>
            <ProgressBarDemo value={45} variant={variant} size={size} showLabel label="Determinate — 45%" theme={theme} />
            <ProgressBarDemo value={100} variant="success" size={size} showLabel label="Complete — 100%" theme={theme} />
            <ProgressBarDemo indeterminate variant={variant} size={size} label="Indeterminate — loading…" theme={theme} />
          </>
        )}
      </ProgressExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Progress bars come in three heights. Small (4px) for compact layouts, Medium (8px) as default, Large (12px) for prominent indicators."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ theme }) => (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <style>{indeterminateKeyframes}</style>
            <ProgressBarDemo value={60} variant="blue" size="sm" showLabel label="Small (4px)" theme={theme as 'light' | 'dark'} />
            <ProgressBarDemo value={60} variant="blue" size="md" showLabel label="Medium (8px)" theme={theme as 'light' | 'dark'} />
            <ProgressBarDemo value={60} variant="blue" size="lg" showLabel label="Large (12px)" theme={theme as 'light' | 'dark'} />
          </div>
        )}
      </ComponentExampleSection>

      <h2>States</h2>

      <ProgressExampleSection
        title="Default, Loading & Complete"
        desc="Progress bars support default (partial), indeterminate loading, and complete states."
      >
        {({ size, theme }) => (
          <>
            <ProgressBarDemo value={35} variant="blue" size={size} showLabel label="Default" theme={theme} />
            <ProgressBarDemo indeterminate variant="blue" size={size} label="Loading…" theme={theme} />
            <ProgressBarDemo value={100} variant="success" size={size} showLabel label="Complete" theme={theme} />
          </>
        )}
      </ProgressExampleSection>

      <h2>With Text Description</h2>

      <ProgressExampleSection
        title="Labeled Progress Bars"
        desc="Progress bars can include a text description and percentage label for additional context."
      >
        {({ size, theme, variant }) => (
          <>
            <ProgressBarDemo value={25} variant={variant} size={size} showLabel label="Uploading files…" theme={theme} />
            <ProgressBarDemo value={78} variant={variant} size={size} showLabel label="Processing data…" theme={theme} />
            <ProgressBarDemo value={100} variant="success" size={size} showLabel label="Upload complete" theme={theme} />
          </>
        )}
      </ProgressExampleSection>
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
      <pre><code>{`import { ProgressBar } from '@tarmac/design-system';`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`interface ProgressBarProps {
  /** Current progress value (0–100). Ignored when indeterminate is true. */
  value?: number;
  /** Color variant of the progress fill. */
  variant?: 'black' | 'blue' | 'success' | 'error' | 'warning' | 'dlv-red';
  /** Height of the progress bar track. */
  size?: 'sm' | 'md' | 'lg';
  /** When true, displays a sliding animation instead of a fixed fill. */
  indeterminate?: boolean;
  /** When true, shows the percentage value next to the bar. */
  showLabel?: boolean;
  /** Optional text description displayed above the bar. */
  label?: string;
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td><code>number</code></td><td><code>0</code></td><td>Current progress percentage (0–100). Clamped to range. Ignored when <code>indeterminate</code> is true.</td></tr>
          <tr><td><code>variant</code></td><td><code>string</code></td><td><code>&apos;blue&apos;</code></td><td>Color variant: <code>black</code>, <code>blue</code>, <code>success</code>, <code>error</code>, <code>warning</code>, <code>dlv-red</code>.</td></tr>
          <tr><td><code>size</code></td><td><code>string</code></td><td><code>&apos;md&apos;</code></td><td>Track height: <code>sm</code> (4px), <code>md</code> (8px), <code>lg</code> (12px).</td></tr>
          <tr><td><code>indeterminate</code></td><td><code>boolean</code></td><td><code>false</code></td><td>When true, shows a sliding animation for unknown-duration tasks.</td></tr>
          <tr><td><code>showLabel</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Displays the current percentage value above the bar.</td></tr>
          <tr><td><code>label</code></td><td><code>string</code></td><td><code>undefined</code></td><td>Optional text description shown above the progress bar.</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>
      <pre><code>{`// Basic determinate progress
<ProgressBar value={65} />

// With percentage label
<ProgressBar value={42} showLabel />

// With text description and label
<ProgressBar value={78} showLabel label="Uploading files…" />

// Indeterminate loading
<ProgressBar indeterminate label="Processing…" />

// Success state (complete)
<ProgressBar value={100} variant="success" showLabel label="Upload complete" />

// Error state
<ProgressBar value={80} variant="error" showLabel label="Upload failed" />

// Small size for compact layouts
<ProgressBar value={50} size="sm" variant="black" />

// Large size for prominent indicators
<ProgressBar value={30} size="lg" variant="dlv-red" showLabel />`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>progress-height-sm</td><td>4px</td></tr>
          <tr><td>progress-height-md</td><td>8px</td></tr>
          <tr><td>progress-height-lg</td><td>12px</td></tr>
          <tr><td>progress-border-radius</td><td>equal to height (fully rounded)</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Fill Color</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>Neutral / default progress</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>Primary / informational progress</td></tr>
          <tr><td>success</td><td>#1BA86E</td><td>Completed / positive progress</td></tr>
          <tr><td>error</td><td>#DC143C</td><td>Failed / critical progress</td></tr>
          <tr><td>warning</td><td>#CF9F02</td><td>Caution / attention needed</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>Brand / Delhivery accent</td></tr>
        </tbody>
      </table>

      <h3>Track Colors</h3>
      <table>
        <thead><tr><th>Theme</th><th>Track Background</th></tr></thead>
        <tbody>
          <tr><td>Light</td><td>#E0E0E0</td></tr>
          <tr><td>Dark</td><td>#333333</td></tr>
        </tbody>
      </table>
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
          <tr><td>1</td><td>Track</td><td>Background rail showing the total range (fully rounded)</td></tr>
          <tr><td>2</td><td>Fill</td><td>Colored bar indicating current completion level</td></tr>
          <tr><td>3</td><td>Label</td><td>Optional text description above the bar</td></tr>
          <tr><td>4</td><td>Percentage</td><td>Optional numeric value displayed above the bar</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To show file upload or download progress</li>
        <li>To indicate step completion in multi-step workflows</li>
        <li>To display loading progress for data processing tasks</li>
        <li>To show capacity or quota usage (e.g., storage)</li>
        <li>To indicate form completion percentage</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="progress-bar"
        doItems={[
          'Use determinate bars when the completion percentage is known',
          'Show a percentage label for long-running tasks',
          'Use appropriate colors — blue for progress, green for complete, red for error',
          'Animate transitions smoothly between values',
          'Provide an aria-label describing what is progressing',
        ]}
        dontItems={[
          'Don\'t use progress bars for unknown durations — use a spinner instead',
          'Don\'t show progress bars that never reach completion',
          'Don\'t use multiple progress bars simultaneously in the same view',
          'Don\'t rely on color alone to convey status — add text labels',
          'Don\'t use progress bars for content loading — use shimmer instead',
        ]}
      />

      <h2>Choosing the Right Type</h2>
      <table>
        <thead><tr><th>Type</th><th>Use When</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Determinate</td><td>Progress percentage is known</td><td>File upload, form completion</td></tr>
          <tr><td>Indeterminate</td><td>Duration is unknown</td><td>Server processing, API calls</td></tr>
        </tbody>
      </table>

      <h2>Variant Selection Guide</h2>
      <table>
        <thead><tr><th>Variant</th><th>Semantic Meaning</th><th>When to Use</th></tr></thead>
        <tbody>
          <tr><td>Blue</td><td>Informational</td><td>Default progress, neutral tasks</td></tr>
          <tr><td>Success</td><td>Positive</td><td>Completed tasks, successful operations</td></tr>
          <tr><td>Error</td><td>Critical</td><td>Failed operations, quota exceeded</td></tr>
          <tr><td>Warning</td><td>Caution</td><td>Approaching limits, slow progress</td></tr>
          <tr><td>Black</td><td>Neutral</td><td>Minimal UI, monochrome contexts</td></tr>
          <tr><td>DLV Red</td><td>Brand</td><td>Brand-specific progress indicators</td></tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>progressbar</td><td>Identifies the element as a progress indicator</td></tr>
          <tr><td>aria-valuenow</td><td>number</td><td>Current progress value (omitted for indeterminate)</td></tr>
          <tr><td>aria-valuemin</td><td>0</td><td>Minimum value of the range</td></tr>
          <tr><td>aria-valuemax</td><td>100</td><td>Maximum value of the range</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Describes what is progressing</td></tr>
          <tr><td>Contrast</td><td>≥ 3:1</td><td>Fill color against track meets WCAG AA for non-text</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Spinner</strong> — Use for indeterminate loading when no progress percentage is available</li>
        <li><strong>Shimmer</strong> — Use for content placeholder loading states</li>
        <li><strong>Stepper</strong> — Use for discrete multi-step progress with labeled stages</li>
        <li><strong>Status Indicator</strong> — Use for static status display without progress</li>
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
        <li>Added indeterminate mode with CSS sliding animation</li>
        <li>Added 6 color variants: Black, Blue, Success, Error, Warning, DLV Red</li>
        <li>Added 3 size options: SM (4px), MD (8px), LG (12px)</li>
        <li>Added <code>showLabel</code> prop for percentage display</li>
        <li>Added <code>label</code> prop for text descriptions</li>
        <li>Smooth animated fill transitions (0.4s ease)</li>
        <li>Full accessibility support with <code>role=&quot;progressbar&quot;</code> and ARIA attributes</li>
        <li>Light and dark theme track colors</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with linear determinate progress bar</li>
        <li>Single color option (primary blue)</li>
        <li>Fixed 8px height</li>
        <li>Basic percentage label support</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function ProgressBarPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Progress Bar"
      description="Progress bars are visual indicators of completion or loading progress."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
