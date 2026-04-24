'use client';

import { useState, useEffect } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Spinner variant colors ── */
const variantColors: Record<string, string> = {
  dark: '#0D0D0D',
  light: '#FFFFFF',
  white: '#FFFFFF',
  'dlv-red': '#ED1B36',
};

const variantLabels: Record<string, string> = {
  dark: 'Dark on Light',
  light: 'Light on Dark',
  white: 'White on Transparent',
  'dlv-red': 'DLV Red on Light',
};

const sizeMap: Record<string, number> = { sm: 16, md: 24, lg: 32, xl: 48 };

const sizeLabels: Record<string, string> = {
  sm: 'Small (16px)',
  md: 'Medium (24px)',
  lg: 'Large (32px)',
  xl: 'XLarge (48px)',
};

/* ── Keyframes injected once ── */
const spinKeyframes = `@keyframes tds-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;

/* ── Spinner component ── */
function Spinner({
  variant = 'dark',
  size = 'md',
}: {
  variant?: 'dark' | 'light' | 'white' | 'dlv-red';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const px = sizeMap[size] || 24;
  const color = variantColors[variant] || '#0D0D0D';
  const borderWidth = px <= 16 ? 2 : px <= 24 ? 2.5 : px <= 32 ? 3 : 4;

  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        width: px,
        height: px,
        borderRadius: '50%',
        border: `${borderWidth}px solid ${color}`,
        borderTopColor: 'transparent',
        animation: 'tds-spin 0.8s linear infinite',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    />
  );
}

/* ── Spinner Demo with variant/size controls ── */
function SpinnerDemo({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: (props: { size: 'sm' | 'md' | 'lg' | 'xl'; theme: 'light' | 'dark' }) => React.ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
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
        <select value={size} onChange={e => setSize(e.target.value as 'sm' | 'md' | 'lg' | 'xl')} style={selectStyle}>
          {Object.entries(sizeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
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
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-spinner--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-spinner--playground"
        height={420}
        title="Spinner — TARMAC Storybook"
      />
      <style>{spinKeyframes}</style>

      <h2>Overview</h2>
      <p>
        Spinners are animated circular indicators used to communicate an indeterminate
        loading state. They draw attention without conveying progress, making them ideal
        for short waits where duration is unknown.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Dark on Light, Light on Dark, White on Transparent, DLV Red on Light</td></tr>
          <tr><td>Sizes</td><td>Small (16px), Medium (24px), Large (32px), XLarge (48px)</td></tr>
          <tr><td>Animation</td><td>CSS rotation — 0.8s linear infinite</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <SpinnerDemo
        title="Color Variants"
        desc="Each variant targets a specific background context. Dark for light surfaces, Light/White for dark surfaces, DLV Red for brand emphasis."
      >
        {({ size, theme }) => (
          <>
            {(Object.keys(variantColors) as Array<'dark' | 'light' | 'white' | 'dlv-red'>).map(v => {
              const needsDarkBg = v === 'light' || v === 'white';
              return (
                <div
                  key={v}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    padding: 16,
                    borderRadius: 8,
                    background: needsDarkBg ? '#1A1A1A' : theme === 'dark' ? '#2A2A2A' : '#FFFFFF',
                    minWidth: 80,
                  }}
                >
                  <Spinner variant={v} size={size} />
                  <span style={{ fontSize: 11, color: needsDarkBg ? '#999' : theme === 'dark' ? '#999' : '#666' }}>
                    {variantLabels[v]}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </SpinnerDemo>

      <h2>Sizes</h2>

      <SpinnerDemo
        title="Size Comparison"
        desc="Four sizes for different contexts — inline indicators, buttons, sections, and full-page loading."
      >
        {({ theme }) => (
          <>
            {(Object.keys(sizeMap) as Array<'sm' | 'md' | 'lg' | 'xl'>).map(s => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <Spinner variant={theme === 'dark' ? 'light' : 'dark'} size={s} />
                <span style={{ fontSize: 11, color: 'var(--color-on-surface-variant)' }}>
                  {sizeLabels[s]}
                </span>
              </div>
            ))}
          </>
        )}
      </SpinnerDemo>

      <h2>Contextual Examples</h2>

      <SpinnerDemo
        title="Inline with Text"
        desc="Small spinners work well alongside text for inline loading states."
      >
        {({ size, theme }) => {
          const textColor = theme === 'dark' ? '#CCC' : '#333';
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Spinner variant={theme === 'dark' ? 'light' : 'dark'} size="sm" />
              <span style={{ fontSize: 14, color: textColor }}>Loading results…</span>
            </div>
          );
        }}
      </SpinnerDemo>

      <SpinnerDemo
        title="Button Loading State"
        desc="Spinners inside buttons indicate an action is processing."
      >
        {({ theme }) => {
          const btnBg = theme === 'dark' ? '#ED1B36' : '#0D0D0D';
          return (
            <button
              disabled
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 8,
                background: btnBg,
                color: '#FFF',
                border: 'none',
                fontSize: 14,
                fontWeight: 600,
                opacity: 0.85,
                cursor: 'not-allowed',
              }}
            >
              <Spinner variant="white" size="sm" />
              Submitting…
            </button>
          );
        }}
      </SpinnerDemo>

      <SpinnerDemo
        title="Card Loading Placeholder"
        desc="Centered spinners within content areas indicate section-level loading."
      >
        {({ theme }) => {
          const cardBg = theme === 'dark' ? '#252525' : '#FFFFFF';
          const borderColor = theme === 'dark' ? '#333' : '#E5E5E5';
          return (
            <div
              style={{
                width: '100%',
                maxWidth: 320,
                height: 160,
                borderRadius: 12,
                background: cardBg,
                border: `1px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <Spinner variant={theme === 'dark' ? 'light' : 'dark'} size="lg" />
              <span style={{ fontSize: 13, color: 'var(--color-on-surface-variant)' }}>Loading content…</span>
            </div>
          );
        }}
      </SpinnerDemo>
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
      <pre><code>{`import { Spinner } from '@tarmac/design-system';`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`interface SpinnerProps {
  /** Visual color variant */
  variant?: 'dark' | 'light' | 'white' | 'dlv-red';
  /** Size preset */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Additional CSS class name */
  className?: string;
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>variant</code></td><td><code>&apos;dark&apos; | &apos;light&apos; | &apos;white&apos; | &apos;dlv-red&apos;</code></td><td><code>&apos;dark&apos;</code></td><td>Controls the spinner border color. Use <code>dark</code> on light backgrounds, <code>light</code> or <code>white</code> on dark backgrounds, and <code>dlv-red</code> for brand emphasis.</td></tr>
          <tr><td><code>size</code></td><td><code>&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos;</code></td><td><code>&apos;md&apos;</code></td><td>Spinner diameter — sm: 16px, md: 24px, lg: 32px, xl: 48px.</td></tr>
          <tr><td><code>aria-label</code></td><td><code>string</code></td><td><code>&apos;Loading&apos;</code></td><td>Accessible label announced by screen readers.</td></tr>
          <tr><td><code>className</code></td><td><code>string</code></td><td><code>undefined</code></td><td>Additional CSS class for custom styling.</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>
      <pre><code>{`// Basic spinner
<Spinner />

// Dark variant on a light surface
<Spinner variant="dark" size="md" />

// Light variant on a dark surface
<Spinner variant="light" size="lg" />

// DLV Red brand spinner
<Spinner variant="dlv-red" size="xl" />

// Inside a button loading state
<Button disabled={isLoading}>
  {isLoading ? <Spinner variant="white" size="sm" /> : 'Submit'}
</Button>

// Centered in a container
<div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
  <Spinner variant="dark" size="lg" />
</div>

// With custom aria-label
<Spinner variant="dark" size="md" aria-label="Fetching results" />`}</code></pre>

      <h2>CSS Animation</h2>
      <pre><code>{`/* Required keyframes — included automatically by the component */
@keyframes tds-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Spinner element styles */
.tds-spinner {
  border-radius: 50%;
  border: 2.5px solid currentColor;
  border-top-color: transparent;
  animation: tds-spin 0.8s linear infinite;
}`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>spinner-size-sm</td><td>16px</td></tr>
          <tr><td>spinner-size-md</td><td>24px</td></tr>
          <tr><td>spinner-size-lg</td><td>32px</td></tr>
          <tr><td>spinner-size-xl</td><td>48px</td></tr>
          <tr><td>spinner-border-width-sm</td><td>2px</td></tr>
          <tr><td>spinner-border-width-md</td><td>2.5px</td></tr>
          <tr><td>spinner-border-width-lg</td><td>3px</td></tr>
          <tr><td>spinner-border-width-xl</td><td>4px</td></tr>
          <tr><td>spinner-speed</td><td>0.8s</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Border Color</th><th>Background</th></tr></thead>
        <tbody>
          <tr><td>dark</td><td>#0D0D0D</td><td>transparent</td></tr>
          <tr><td>light</td><td>#FFFFFF</td><td>transparent</td></tr>
          <tr><td>white</td><td>#FFFFFF</td><td>transparent</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>transparent</td></tr>
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
          <tr><td>1</td><td>Spinner Ring</td><td>Circular border with one transparent side, creating the visual arc</td></tr>
          <tr><td>2</td><td>Rotation</td><td>CSS animation rotating the ring 360° every 0.8 seconds</td></tr>
          <tr><td>3</td><td>Color</td><td>Border color determined by the variant prop</td></tr>
          <tr><td>4</td><td>Gap</td><td>Transparent top border creates the spinning arc effect</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To indicate an indeterminate loading state where duration is unknown</li>
        <li>Inside buttons to show an action is processing</li>
        <li>As a placeholder while content is being fetched</li>
        <li>For short waits — typically under 10 seconds</li>
      </ul>

      <h2>When Not to Use</h2>
      <ul>
        <li>For determinate progress — use a Progress Bar instead</li>
        <li>For content-area loading — use Shimmer placeholders</li>
        <li>For very long operations — provide a progress indicator with percentage</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="spinner"
        doItems={[
          'Use the correct variant for the background context (dark on light, light on dark)',
          'Add a text label for loading states longer than 2 seconds',
          'Use small spinners for inline or button contexts',
          'Center spinners within the loading area',
          'Provide an aria-label for screen reader users',
        ]}
        dontItems={[
          'Don\'t use spinners for content loading — use shimmer instead',
          'Don\'t show multiple spinners on the same screen simultaneously',
          'Don\'t use spinners without any surrounding context',
          'Don\'t use the light variant on light backgrounds — it will be invisible',
          'Don\'t block the entire page with a spinner unless absolutely necessary',
        ]}
      />

      <h2>Variant Selection Guide</h2>
      <table>
        <thead><tr><th>Variant</th><th>Use On</th><th>Example Context</th></tr></thead>
        <tbody>
          <tr><td>dark</td><td>Light backgrounds</td><td>White cards, light modals, default pages</td></tr>
          <tr><td>light</td><td>Dark backgrounds</td><td>Dark cards, dark modals, overlays</td></tr>
          <tr><td>white</td><td>Colored / dark backgrounds</td><td>Inside colored buttons, dark overlays</td></tr>
          <tr><td>dlv-red</td><td>Light backgrounds</td><td>Brand-specific loading, Delhivery-themed areas</td></tr>
        </tbody>
      </table>

      <h2>Size Selection Guide</h2>
      <table>
        <thead><tr><th>Size</th><th>Pixels</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>sm</td><td>16px</td><td>Inline text, inside buttons, compact UI</td></tr>
          <tr><td>md</td><td>24px</td><td>Default — cards, sections, general loading</td></tr>
          <tr><td>lg</td><td>32px</td><td>Prominent section loading, empty states</td></tr>
          <tr><td>xl</td><td>48px</td><td>Full-page loading, hero areas</td></tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>status</td><td>Identifies the spinner as a live status region</td></tr>
          <tr><td>aria-label</td><td>&quot;Loading&quot;</td><td>Descriptive text for screen readers</td></tr>
          <tr><td>aria-live</td><td>polite</td><td>Announces loading state without interrupting</td></tr>
          <tr><td>prefers-reduced-motion</td><td>Pause or slow animation</td><td>Respects user motion preferences</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Progress Bar</strong> — For determinate loading with known progress</li>
        <li><strong>Shimmer</strong> — Content placeholder for layout-aware loading</li>
        <li><strong>Button</strong> — Spinners can be embedded in buttons during async actions</li>
        <li><strong>Snackbar</strong> — Pair with spinners to announce loading completion</li>
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
        <li>Redesigned with pure CSS border-based animation</li>
        <li>Added 4 color variants: dark, light, white, dlv-red</li>
        <li>Added XLarge (48px) size option</li>
        <li>Updated size tokens: SM (16px), MD (24px), LG (32px), XL (48px)</li>
        <li>Improved accessibility with <code>role=&quot;status&quot;</code> and <code>aria-label</code></li>
        <li>Reduced animation duration to 0.8s for snappier feel</li>
        <li>Added <code>prefers-reduced-motion</code> support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with default, small, and large variants</li>
        <li>SVG-based spinner animation</li>
        <li>Primary and neutral color options</li>
        <li>Overlay variant for full-screen loading</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function SpinnerPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Spinner"
      description="Spinners are animated circular indicators used to communicate an indeterminate loading state."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
