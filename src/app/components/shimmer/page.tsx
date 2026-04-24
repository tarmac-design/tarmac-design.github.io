'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Shimmer Block ── */
function ShimmerBlock({ width, height, borderRadius = 4, theme }: { width: string | number; height: string | number; borderRadius?: number; theme: 'light' | 'dark' }) {
  const base = theme === 'dark' ? '#333' : '#E0E0E0';
  const shine = theme === 'dark' ? '#444' : '#F0F0F0';
  const id = `shimmer-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <>
      <style>{`
        @keyframes ${id} {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      <div style={{
        width, height, borderRadius,
        background: `linear-gradient(90deg, ${base} 25%, ${shine} 50%, ${base} 75%)`,
        backgroundSize: '200% 100%',
        animation: `${id} 1.5s ease-in-out infinite`,
      }} />
    </>
  );
}

/* ── Shimmer Variants ── */
function ShimmerText({ lines = 3, theme }: { lines?: number; theme: 'light' | 'dark' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
      {Array.from({ length: lines }, (_, i) => (
        <ShimmerBlock key={i} width={i === lines - 1 ? '60%' : '100%'} height={14} borderRadius={4} theme={theme} />
      ))}
    </div>
  );
}

function ShimmerCircle({ size = 48, theme }: { size?: number; theme: 'light' | 'dark' }) {
  return <ShimmerBlock width={size} height={size} borderRadius={size / 2} theme={theme} />;
}

function ShimmerCard({ theme }: { theme: 'light' | 'dark' }) {
  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const border = theme === 'dark' ? '#444' : '#E0E0E0';
  return (
    <div style={{ width: 240, borderRadius: 12, border: `1px solid ${border}`, background: bg, overflow: 'hidden' }}>
      <ShimmerBlock width="100%" height={120} borderRadius={0} theme={theme} />
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ShimmerBlock width="70%" height={16} borderRadius={4} theme={theme} />
        <ShimmerBlock width="100%" height={12} borderRadius={4} theme={theme} />
        <ShimmerBlock width="50%" height={12} borderRadius={4} theme={theme} />
      </div>
    </div>
  );
}

function ShimmerListItem({ theme }: { theme: 'light' | 'dark' }) {
  const border = theme === 'dark' ? '#444' : '#E0E0E0';
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${border}`, width: 280 }}>
      <ShimmerCircle size={40} theme={theme} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <ShimmerBlock width="60%" height={14} borderRadius={4} theme={theme} />
        <ShimmerBlock width="80%" height={10} borderRadius={4} theme={theme} />
      </div>
      <ShimmerBlock width={48} height={24} borderRadius={4} theme={theme} />
    </div>
  );
}

/* ── Loaded Content (for toggle) ── */
function LoadedText() {
  return (
    <div style={{ width: 240, fontSize: 13, lineHeight: 1.6, color: 'var(--color-on-surface)' }}>
      <p>This is the actual loaded content that replaces the shimmer placeholder once data has been fetched.</p>
    </div>
  );
}
function LoadedCard({ theme }: { theme: 'light' | 'dark' }) {
  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const border = theme === 'dark' ? '#444' : '#E0E0E0';
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  return (
    <div style={{ width: 240, borderRadius: 12, border: `1px solid ${border}`, background: bg, overflow: 'hidden' }}>
      <div style={{ width: '100%', height: 120, background: theme === 'dark' ? '#3A3A3A' : '#D0D0D0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: text, fontSize: 13 }}>Image</div>
      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: text, marginBottom: 4 }}>Card Title</div>
        <div style={{ fontSize: 12, color: text, opacity: 0.6 }}>Description text for this card item.</div>
      </div>
    </div>
  );
}

/* ── Shimmer Demo ── */
function ShimmerDemo({ variant = 'text', theme }: { variant?: 'text' | 'circle' | 'card' | 'listitem'; theme: 'light' | 'dark' }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div>
        {loaded ? (
          variant === 'card' ? <LoadedCard theme={theme} /> :
          variant === 'text' ? <LoadedText /> :
          variant === 'circle' ? (
            <div style={{ width: 48, height: 48, borderRadius: 24, background: '#2396FB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 600, fontSize: 16 }}>AB</div>
          ) : (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: 280, padding: '12px 0' }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: '#1BA86E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 600, fontSize: 13 }}>JD</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: theme === 'dark' ? '#E0E0E0' : '#1A1A1A' }}>John Doe</div>
                <div style={{ fontSize: 12, color: theme === 'dark' ? '#888' : '#999' }}>john@example.com</div>
              </div>
              <span style={{ fontSize: 12, padding: '4px 8px', borderRadius: 4, background: '#1BA86E', color: '#FFF', fontWeight: 600 }}>Active</span>
            </div>
          )
        ) : (
          variant === 'text' ? <ShimmerText theme={theme} /> :
          variant === 'circle' ? <ShimmerCircle theme={theme} /> :
          variant === 'card' ? <ShimmerCard theme={theme} /> :
          <ShimmerListItem theme={theme} />
        )}
      </div>
      <button onClick={() => setLoaded(!loaded)} style={{
        padding: '6px 16px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
        background: loaded ? '#DC143C' : '#1BA86E', color: '#FFF', border: 'none',
      }}>
        {loaded ? 'Show Shimmer' : 'Show Loaded'}
      </button>
    </div>
  );
}

/* ── Preview Section ── */
function ShimmerExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { variant: string; theme: 'light' | 'dark' }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [variant, setVariant] = useState('text');
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
          <option value="text">Text Lines</option>
          <option value="circle">Circle (Avatar)</option>
          <option value="card">Card</option>
          <option value="listitem">List Item</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 32, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
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
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-spinner--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-spinner--playground"
        height={420}
        title="Shimmer — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>Shimmer components are animated loading placeholders that mimic the shape of content being loaded. They use a gradient sweep animation to indicate loading state.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Text (lines), Circle (avatar), Card (image + text), List Item</td></tr>
          <tr><td>Animation</td><td>Gradient sweep from left to right</td></tr>
          <tr><td>States</td><td>Loading (shimmer), Loaded (content)</td></tr>
          <tr><td>Features</td><td>Theme-aware colors, Customizable shapes, Toggle demo</td></tr>
        </tbody>
      </table>

      <h2>Interactive Demo</h2>
      <ShimmerExampleSection title="Shimmer Variants" desc="Toggle between loading shimmer and loaded content. Select different placeholder shapes.">
        {({ variant, theme }) => <ShimmerDemo variant={variant as 'text' | 'circle' | 'card' | 'listitem'} theme={theme} />}
      </ShimmerExampleSection>

      <h2>All Variants</h2>
      <ShimmerExampleSection title="Text Lines" desc="Paragraph placeholder with multiple lines of varying width.">
        {({ theme }) => <ShimmerDemo variant="text" theme={theme} />}
      </ShimmerExampleSection>

      <ShimmerExampleSection title="Circle (Avatar)" desc="Circular placeholder for avatar or profile images.">
        {({ theme }) => <ShimmerDemo variant="circle" theme={theme} />}
      </ShimmerExampleSection>

      <ShimmerExampleSection title="Card" desc="Card placeholder with image area and text lines.">
        {({ theme }) => <ShimmerDemo variant="card" theme={theme} />}
      </ShimmerExampleSection>

      <ShimmerExampleSection title="List Item" desc="List row placeholder with avatar, text, and action area.">
        {({ theme }) => <ShimmerDemo variant="listitem" theme={theme} />}
      </ShimmerExampleSection>

      <h2>Composition</h2>
      <ComponentExampleSection title="Multiple Shimmers" desc="Combine shimmer variants to build full page loading states.">
        {({ theme }) => (
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <ShimmerListItem theme={theme as 'light' | 'dark'} />
              <ShimmerListItem theme={theme as 'light' | 'dark'} />
              <ShimmerListItem theme={theme as 'light' | 'dark'} />
            </div>
            <ShimmerCard theme={theme as 'light' | 'dark'} />
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
      <pre><code>{`import { Shimmer, ShimmerText, ShimmerCircle, ShimmerCard } from '@tarmac/design-system';`}</code></pre>
      <h2>Component API</h2>
      <pre><code>{`interface ShimmerProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  duration?: number;
  className?: string;
}

interface ShimmerTextProps {
  lines?: number;
  lineHeight?: number;
  gap?: number;
  lastLineWidth?: string;
}

interface ShimmerCircleProps {
  size?: number;
}

interface ShimmerCardProps {
  imageHeight?: number;
  lines?: number;
}

interface ShimmerListItemProps {
  avatarSize?: number;
  lines?: number;
  showAction?: boolean;
}`}</code></pre>
      <h2>Basic Usage</h2>
      <pre><code>{`// Basic shimmer block
<Shimmer width={200} height={20} borderRadius={4} />

// Text placeholder
<ShimmerText lines={3} />

// Avatar placeholder
<ShimmerCircle size={48} />

// Card placeholder
<ShimmerCard imageHeight={120} lines={2} />

// Conditional rendering
{isLoading ? <ShimmerText lines={3} /> : <ActualContent />}`}</code></pre>
      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>shimmer-base-light</td><td>#E0E0E0</td></tr>
          <tr><td>shimmer-shine-light</td><td>#F0F0F0</td></tr>
          <tr><td>shimmer-base-dark</td><td>#333333</td></tr>
          <tr><td>shimmer-shine-dark</td><td>#444444</td></tr>
          <tr><td>shimmer-duration</td><td>1.5s</td></tr>
          <tr><td>shimmer-border-radius</td><td>4px</td></tr>
        </tbody>
      </table>
      <h2>Storybook</h2>
      <p>
        Explore all shimmer variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-shimmer--playground" target="_blank" rel="noopener noreferrer">TARMAC Storybook →</a>
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
          <tr><td>1</td><td>Base Layer</td><td>Solid background color matching the content shape</td></tr>
          <tr><td>2</td><td>Gradient Sweep</td><td>Animated lighter gradient moving left to right</td></tr>
          <tr><td>3</td><td>Shape Mask</td><td>Border radius and dimensions matching the target content</td></tr>
        </tbody>
      </table>
      <h2>When to Use</h2>
      <ul>
        <li>While fetching data from an API</li>
        <li>During initial page load for content-heavy sections</li>
        <li>As placeholder for images that are still downloading</li>
        <li>In lists and grids where items load progressively</li>
      </ul>
      <h2>Best Practices</h2>
      <DoDont
        slug="shimmer"
        doItems={[
          'Match shimmer shapes to the actual content layout',
          'Use consistent animation speed across all shimmers',
          'Replace shimmers with content as soon as data arrives',
          'Use shimmer for content that takes > 300ms to load',
          'Combine multiple shimmer shapes for realistic placeholders',
        ]}
        dontItems={[
          'Don\'t use shimmer for actions that complete instantly',
          'Don\'t animate shimmer too fast — it creates visual noise',
          'Don\'t use shimmer as a permanent placeholder for missing data',
          'Don\'t mix shimmer with spinner loading indicators',
          'Don\'t use shimmer for error states',
        ]}
      />
      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>status</td><td>Indicates loading state to screen readers</td></tr>
          <tr><td>aria-label</td><td>&quot;Loading&quot;</td><td>Describes the loading state</td></tr>
          <tr><td>aria-busy</td><td>true</td><td>Indicates content is being loaded</td></tr>
          <tr><td>prefers-reduced-motion</td><td>pause animation</td><td>Respect user motion preferences</td></tr>
        </tbody>
      </table>
      <h2>Related Components</h2>
      <ul>
        <li><strong>Spinner</strong> — Circular loading indicator for actions</li>
        <li><strong>Progress Bar</strong> — Determinate loading with percentage</li>
        <li><strong>Cards</strong> — Common target for shimmer placeholders</li>
        <li><strong>List</strong> — List items with shimmer loading states</li>
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
        <li>Added <code>ShimmerCard</code> and <code>ShimmerListItem</code> presets</li>
        <li>Added dark mode support with theme-aware colors</li>
        <li>Added <code>duration</code> prop for custom animation speed</li>
        <li>Added <code>prefers-reduced-motion</code> support</li>
        <li>Improved gradient smoothness</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with basic shimmer block</li>
        <li>Text and circle presets</li>
        <li>CSS keyframe animation</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function ShimmerPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Shimmer" description="Animated loading placeholders that mimic content shapes with a gradient sweep animation." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
