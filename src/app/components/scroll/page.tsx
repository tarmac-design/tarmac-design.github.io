'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Scroll Demo ── */
function ScrollDemo({
  variant = 'vertical',
  theme,
}: {
  variant?: 'vertical' | 'horizontal' | 'both' | 'autohide';
  theme: 'light' | 'dark';
}) {
  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const border = theme === 'dark' ? '#444' : '#DDD';
  const thumbColor = theme === 'dark' ? '#666' : '#BBB';
  const trackColor = theme === 'dark' ? '#333' : '#EFEFEF';

  const isVertical = variant === 'vertical' || variant === 'both' || variant === 'autohide';
  const isHorizontal = variant === 'horizontal' || variant === 'both';

  const containerStyle: React.CSSProperties = {
    width: 280, background: bg, border: `1px solid ${border}`, borderRadius: 8,
    position: 'relative', overflow: 'hidden',
    height: isVertical ? 200 : 'auto',
  };

  const scrollStyle: React.CSSProperties = {
    overflowY: isVertical ? 'auto' : 'hidden',
    overflowX: isHorizontal ? 'auto' : 'hidden',
    height: '100%', padding: 16,
    scrollbarWidth: 'thin',
    scrollbarColor: `${thumbColor} ${trackColor}`,
  };

  const verticalContent = Array.from({ length: 20 }, (_, i) => (
    <div key={i} style={{ padding: '8px 0', borderBottom: `1px solid ${border}`, fontSize: 13, color: text }}>
      <span style={{ fontWeight: 600 }}>Item {i + 1}</span>
      <span style={{ opacity: 0.6, marginLeft: 8 }}>— Scrollable list content row</span>
    </div>
  ));

  const horizontalContent = (
    <div style={{ display: 'flex', gap: 12, width: 'max-content' }}>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} style={{
          minWidth: 120, height: 80, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: theme === 'dark' ? '#3A3A3A' : '#E8E8E8', color: text, fontSize: 13, fontWeight: 600, flexShrink: 0,
        }}>
          Card {i + 1}
        </div>
      ))}
    </div>
  );

  const bothContent = (
    <div style={{ width: 500 }}>
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} style={{ padding: '8px 0', borderBottom: `1px solid ${border}`, fontSize: 13, color: text, whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: 600 }}>Row {i + 1}</span>
          <span style={{ opacity: 0.6, marginLeft: 8 }}>— This content is wide enough to require horizontal scrolling as well as vertical</span>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={containerStyle}>
        <style>{`
          .scroll-demo-${variant}::-webkit-scrollbar { width: 6px; height: 6px; }
          .scroll-demo-${variant}::-webkit-scrollbar-track { background: ${trackColor}; border-radius: 3px; }
          .scroll-demo-${variant}::-webkit-scrollbar-thumb { background: ${thumbColor}; border-radius: 3px; }
          .scroll-demo-${variant}::-webkit-scrollbar-thumb:hover { background: ${theme === 'dark' ? '#888' : '#999'}; }
          ${variant === 'autohide' ? `.scroll-demo-autohide::-webkit-scrollbar-thumb { opacity: 0; transition: opacity 0.3s; } .scroll-demo-autohide:hover::-webkit-scrollbar-thumb { opacity: 1; }` : ''}
        `}</style>
        <div className={`scroll-demo-${variant}`} style={scrollStyle}>
          {variant === 'horizontal' ? horizontalContent : variant === 'both' ? bothContent : verticalContent}
        </div>
      </div>
      <span style={{ fontSize: 11, color: text, opacity: 0.5, textAlign: 'center' }}>
        {variant === 'autohide' ? 'Scrollbar appears on hover' : `Scroll ${variant === 'both' ? 'both directions' : variant}`}
      </span>
    </div>
  );
}

/* ── Preview Section ── */
function ScrollExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { variant: string; theme: 'light' | 'dark' }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [variant, setVariant] = useState('vertical');
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
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
          <option value="both">Both</option>
          <option value="autohide">Auto-hide</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
        {children({ variant, theme })}
      </div>
    </div>
  );
}

/* ── TAB 1 — Examples ── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="scroll" />
      <h2>Overview</h2>
      <p>Scroll components provide custom-styled scrollbar containers for overflowing content. They support vertical, horizontal, and bidirectional scrolling with optional auto-hide behavior.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Vertical, Horizontal, Both, Auto-hide</td></tr>
          <tr><td>Scrollbar</td><td>Custom thumb and track styling</td></tr>
          <tr><td>Behavior</td><td>Always visible, Auto-hide on idle</td></tr>
          <tr><td>Features</td><td>Thin scrollbar, Hover highlight, Smooth scroll</td></tr>
        </tbody>
      </table>

      <h2>Interactive Demo</h2>
      <ScrollExampleSection title="Scroll Variants" desc="Select a variant and scroll within the container to see the custom scrollbar.">
        {({ variant, theme }) => <ScrollDemo variant={variant as 'vertical' | 'horizontal' | 'both' | 'autohide'} theme={theme} />}
      </ScrollExampleSection>

      <h2>All Variants</h2>
      <ScrollExampleSection title="Vertical Scroll" desc="Standard vertical scrollbar for lists and long content.">
        {({ theme }) => <ScrollDemo variant="vertical" theme={theme} />}
      </ScrollExampleSection>

      <ScrollExampleSection title="Horizontal Scroll" desc="Horizontal scrollbar for wide content like card carousels.">
        {({ theme }) => <ScrollDemo variant="horizontal" theme={theme} />}
      </ScrollExampleSection>

      <ScrollExampleSection title="Both Directions" desc="Bidirectional scrolling for large data grids or canvases.">
        {({ theme }) => <ScrollDemo variant="both" theme={theme} />}
      </ScrollExampleSection>

      <ScrollExampleSection title="Auto-hide" desc="Scrollbar fades out when not actively scrolling.">
        {({ theme }) => <ScrollDemo variant="autohide" theme={theme} />}
      </ScrollExampleSection>

      <h2>Comparison</h2>
      <ComponentExampleSection title="All Variants Side by Side" desc="Compare scrollbar behavior across all variants.">
        {({ theme }) => (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {(['vertical', 'horizontal', 'both', 'autohide'] as const).map(v => (
              <ScrollDemo key={v} variant={v} theme={theme as 'light' | 'dark'} />
            ))}
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
      <pre><code>{`import { ScrollArea } from '@tarmac/design-system';`}</code></pre>
      <h2>Component API</h2>
      <pre><code>{`interface ScrollAreaProps {
  direction?: 'vertical' | 'horizontal' | 'both';
  autoHide?: boolean;
  autoHideDelay?: number;
  thumbColor?: string;
  trackColor?: string;
  scrollbarWidth?: 'thin' | 'normal';
  smooth?: boolean;
  maxHeight?: string | number;
  maxWidth?: string | number;
  onScroll?: (event: React.UIEvent) => void;
  children: ReactNode;
}`}</code></pre>
      <h2>Basic Usage</h2>
      <pre><code>{`// Vertical scroll
<ScrollArea maxHeight={300}>
  <LongContent />
</ScrollArea>

// Horizontal scroll
<ScrollArea direction="horizontal" maxWidth={400}>
  <WideContent />
</ScrollArea>

// Both directions
<ScrollArea direction="both" maxHeight={300} maxWidth={400}>
  <LargeContent />
</ScrollArea>

// Auto-hide scrollbar
<ScrollArea autoHide autoHideDelay={1000}>
  <Content />
</ScrollArea>`}</code></pre>
      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>scroll-thumb-width</td><td>6px</td></tr>
          <tr><td>scroll-thumb-radius</td><td>3px</td></tr>
          <tr><td>scroll-thumb-color</td><td>#BBBBBB</td></tr>
          <tr><td>scroll-thumb-hover</td><td>#999999</td></tr>
          <tr><td>scroll-track-color</td><td>#EFEFEF</td></tr>
          <tr><td>scroll-autohide-delay</td><td>1000ms</td></tr>
        </tbody>
      </table>
      <h2>Storybook</h2>
      <p>
        Explore all scroll variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-scroll--playground" target="_blank" rel="noopener noreferrer">TARMAC Storybook →</a>
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
          <tr><td>1</td><td>Container</td><td>Fixed-size wrapper that clips overflowing content</td></tr>
          <tr><td>2</td><td>Content</td><td>Scrollable inner content that exceeds container bounds</td></tr>
          <tr><td>3</td><td>Track</td><td>Background rail for the scrollbar</td></tr>
          <tr><td>4</td><td>Thumb</td><td>Draggable indicator showing scroll position</td></tr>
          <tr><td>5</td><td>Corner</td><td>Intersection area when both scrollbars are visible</td></tr>
        </tbody>
      </table>
      <h2>When to Use</h2>
      <ul>
        <li>Long lists or tables that need bounded height</li>
        <li>Horizontal card carousels or image galleries</li>
        <li>Code blocks or log viewers with overflow</li>
        <li>Chat windows or message feeds</li>
      </ul>
      <h2>Best Practices</h2>
      <DoDont
        slug="scroll"
        doItems={[
          'Use thin scrollbars for a clean, modern look',
          'Provide visual cues that content is scrollable (fade edges)',
          'Use auto-hide for cleaner UI when scrollbar is not needed',
          'Ensure scrollbar contrast meets accessibility standards',
          'Support both mouse wheel and touch gestures',
        ]}
        dontItems={[
          'Don\'t hide scrollbars completely — users need scroll affordance',
          'Don\'t nest scrollable areas in the same direction',
          'Don\'t use custom scroll for very short content',
          'Don\'t override native scroll behavior on mobile',
          'Don\'t make scrollbar thumb too small to grab',
        ]}
      />
      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>region</td><td>Identifies scrollable area as a landmark</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Describes the scrollable content</td></tr>
          <tr><td>tabindex</td><td>0</td><td>Makes container focusable for keyboard scroll</td></tr>
          <tr><td>Keyboard</td><td>Arrow / Page keys</td><td>Scroll with keyboard when focused</td></tr>
        </tbody>
      </table>
      <h2>Related Components</h2>
      <ul>
        <li><strong>List</strong> — Structured list items often wrapped in scroll areas</li>
        <li><strong>Pagination</strong> — Alternative to scrolling for large datasets</li>
        <li><strong>Bottom Sheet</strong> — Scrollable content in a modal panel</li>
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
        <li>Added <code>autoHide</code> prop with configurable delay</li>
        <li>Added bidirectional scroll support</li>
        <li>Custom thumb and track color tokens</li>
        <li>Added <code>smooth</code> scroll behavior option</li>
        <li>Improved keyboard navigation support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with vertical and horizontal scroll</li>
        <li>Custom thin scrollbar styling</li>
        <li>Cross-browser scrollbar support</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function ScrollPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Scroll" description="Custom-styled scrollbar containers for overflowing content with thin, themed scrollbars." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
