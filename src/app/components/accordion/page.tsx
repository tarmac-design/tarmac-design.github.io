'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Types ── */
interface AccordionItem {
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: number[];
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  ghost?: boolean;
}

/* ── Size config ── */
const sizeConfig = {
  sm: { headerPy: 8, headerPx: 12, fontSize: 13, contentPx: 12, contentPy: 8, chevron: 14 },
  md: { headerPy: 12, headerPx: 16, fontSize: 14, contentPx: 16, contentPy: 12, chevron: 16 },
  lg: { headerPy: 16, headerPx: 20, fontSize: 16, contentPx: 20, contentPy: 16, chevron: 18 },
};

/* ── Chevron SVG ── */
function ChevronIcon({ size = 16, rotated }: { size?: number; rotated: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.25s ease',
        flexShrink: 0,
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ── Single Accordion Panel ── */
function AccordionPanel({
  title,
  content,
  expanded,
  onToggle,
  disabled,
  bordered,
  size = 'md',
  ghost,
  theme,
}: {
  title: string;
  content: ReactNode;
  expanded: boolean;
  onToggle: () => void;
  disabled?: boolean;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  ghost?: boolean;
  theme: 'light' | 'dark';
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(expanded ? contentRef.current.scrollHeight : 0);
    }
  }, [expanded]);

  const cfg = sizeConfig[size];
  const isDark = theme === 'dark';
  const borderColor = isDark ? '#333' : '#E0E0E0';
  const hoverBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
  const headerColor = disabled ? (isDark ? '#555' : '#AAA') : (isDark ? '#E0E0E0' : '#1A1A1A');
  const contentColor = isDark ? '#BBB' : '#555';

  const containerStyle: React.CSSProperties = {
    border: bordered && !ghost ? `1px solid ${borderColor}` : 'none',
    borderRadius: bordered && !ghost ? 8 : 0,
    borderBottom: !bordered && !ghost ? `1px solid ${borderColor}` : undefined,
    overflow: 'hidden',
    opacity: ghost ? 0.5 : 1,
  };

  return (
    <div style={containerStyle}>
      <button
        onClick={() => !disabled && onToggle()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={disabled}
        aria-expanded={expanded}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `${cfg.headerPy}px ${cfg.headerPx}px`,
          fontSize: cfg.fontSize,
          fontWeight: 600,
          color: headerColor,
          background: hovered && !disabled ? hoverBg : 'transparent',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background 0.15s ease',
          textAlign: 'left',
          gap: 8,
        }}
      >
        <span>{title}</span>
        <ChevronIcon size={cfg.chevron} rotated={expanded} />
      </button>
      <div style={{ height, overflow: 'hidden', transition: 'height 0.25s ease' }}>
        <div
          ref={contentRef}
          style={{
            padding: `${cfg.contentPy}px ${cfg.contentPx}px`,
            fontSize: cfg.fontSize - 1,
            color: contentColor,
            lineHeight: 1.6,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

/* ── Accordion Demo Component ── */
function AccordionDemo({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  bordered = true,
  size = 'md',
  ghost = false,
  theme,
}: AccordionProps & { theme: 'light' | 'dark' }) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set(defaultExpanded));

  const toggle = (index: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div
      style={{
        width: '100%',
        borderRadius: bordered ? 8 : 0,
        overflow: 'hidden',
        border: bordered ? undefined : 'none',
      }}
    >
      {items.map((item, i) => (
        <AccordionPanel
          key={i}
          title={item.title}
          content={item.content}
          expanded={expanded.has(i)}
          onToggle={() => toggle(i)}
          disabled={item.disabled}
          bordered={bordered}
          size={size}
          ghost={ghost}
          theme={theme}
        />
      ))}
    </div>
  );
}

/* ── Sample data ── */
const sampleItems: AccordionItem[] = [
  { title: 'What is your return policy?', content: 'You can return items within 30 days of purchase. Items must be in original condition with tags attached.' },
  { title: 'How long does shipping take?', content: 'Standard shipping takes 5–7 business days. Express shipping is available for 2–3 day delivery.' },
  { title: 'Do you offer gift wrapping?', content: 'Yes, gift wrapping is available at checkout for a small additional fee. You can also include a personalized message.' },
  { title: 'Can I track my order?', content: 'Absolutely! Once your order ships, you will receive a tracking number via email that you can use to monitor delivery progress.' },
];

const disabledItems: AccordionItem[] = [
  { title: 'Available Section', content: 'This section can be expanded and collapsed normally.' },
  { title: 'Disabled Section', content: 'This content is not accessible.', disabled: true },
  { title: 'Another Available Section', content: 'This section works as expected with full interactivity.' },
];

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="accordion" />
      <h2>Overview</h2>
      <p>
        Accordions are expandable and collapsible content sections used to manage information
        density. They allow users to progressively disclose content by clicking on headers
        that toggle the visibility of associated content panels with smooth height animation.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Features</td><td>Single expand, Multi expand (accordion mode), Custom icons, Borderless, Ghost</td></tr>
          <tr><td>States</td><td>Collapsed, Expanded, Hover, Disabled</td></tr>
          <tr><td>Elements</td><td>Header text, Content area, Expand/collapse chevron icon</td></tr>
          <tr><td>Sizes</td><td>Small, Medium, Large</td></tr>
        </tbody>
      </table>

      <h2>Default</h2>

      <ComponentExampleSection
        title="Single Expand (Default)"
        desc="Only one section can be open at a time. Expanding a new section collapses the previous one."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ theme }) => (
          <AccordionDemo
            items={sampleItems}
            bordered
            size="md"
            theme={theme as 'light' | 'dark'}
          />
        )}
      </ComponentExampleSection>

      <h2>Accordion Mode</h2>

      <ComponentExampleSection
        title="Multi Expand"
        desc="Multiple sections can be open simultaneously. Each section toggles independently."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ theme }) => (
          <AccordionDemo
            items={sampleItems}
            allowMultiple
            defaultExpanded={[0, 2]}
            bordered
            size="md"
            theme={theme as 'light' | 'dark'}
          />
        )}
      </ComponentExampleSection>

      <h2>Borderless</h2>

      <ComponentExampleSection
        title="Borderless Accordion"
        desc="A flush variant without outer borders — only dividers between items."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ theme }) => (
          <AccordionDemo
            items={sampleItems}
            bordered={false}
            size="md"
            theme={theme as 'light' | 'dark'}
          />
        )}
      </ComponentExampleSection>

      <h2>Disabled</h2>

      <ComponentExampleSection
        title="Disabled Items"
        desc="Individual accordion items can be disabled, preventing user interaction."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ theme }) => (
          <AccordionDemo
            items={disabledItems}
            bordered
            size="md"
            theme={theme as 'light' | 'dark'}
          />
        )}
      </ComponentExampleSection>

      <h2>Ghost</h2>

      <ComponentExampleSection
        title="Ghost Accordion"
        desc="A low-emphasis ghost variant with reduced opacity for placeholder or secondary contexts."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ theme }) => (
          <AccordionDemo
            items={sampleItems.slice(0, 3)}
            bordered
            ghost
            size="md"
            theme={theme as 'light' | 'dark'}
          />
        )}
      </ComponentExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Accordions come in three sizes. Small for dense layouts, Medium as default, Large for prominent sections."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ theme }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: theme === 'dark' ? '#888' : '#666' }}>Small</p>
              <AccordionDemo items={sampleItems.slice(0, 2)} bordered size="sm" theme={theme as 'light' | 'dark'} />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: theme === 'dark' ? '#888' : '#666' }}>Medium</p>
              <AccordionDemo items={sampleItems.slice(0, 2)} bordered size="md" theme={theme as 'light' | 'dark'} />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: theme === 'dark' ? '#888' : '#666' }}>Large</p>
              <AccordionDemo items={sampleItems.slice(0, 2)} bordered size="lg" theme={theme as 'light' | 'dark'} />
            </div>
          </div>
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
      <pre><code>{`import { Accordion } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface AccordionProps {
  items: {
    title: string;
    content: ReactNode;
    disabled?: boolean;
  }[];
  allowMultiple?: boolean;
  defaultExpanded?: number[];
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Single expand (default)
<Accordion
  items={[
    { title: 'Section 1', content: <p>Content for section 1</p> },
    { title: 'Section 2', content: <p>Content for section 2</p> },
    { title: 'Section 3', content: <p>Content for section 3</p> },
  ]}
/>

// Multi expand (accordion mode)
<Accordion
  allowMultiple
  defaultExpanded={[0, 2]}
  items={[
    { title: 'Section 1', content: <p>Content 1</p> },
    { title: 'Section 2', content: <p>Content 2</p> },
    { title: 'Section 3', content: <p>Content 3</p> },
  ]}
/>

// Borderless
<Accordion bordered={false} items={items} />

// With disabled items
<Accordion
  items={[
    { title: 'Active', content: <p>Available</p> },
    { title: 'Locked', content: <p>Unavailable</p>, disabled: true },
  ]}
/>

// Size variants
<Accordion size="sm" items={items} />
<Accordion size="md" items={items} />
<Accordion size="lg" items={items} />`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>SM</th><th>MD</th><th>LG</th></tr></thead>
        <tbody>
          <tr><td>header-padding-y</td><td>8px</td><td>12px</td><td>16px</td></tr>
          <tr><td>header-padding-x</td><td>12px</td><td>16px</td><td>20px</td></tr>
          <tr><td>header-font-size</td><td>13px</td><td>14px</td><td>16px</td></tr>
          <tr><td>content-padding</td><td>8px 12px</td><td>12px 16px</td><td>16px 20px</td></tr>
          <tr><td>chevron-size</td><td>14px</td><td>16px</td><td>18px</td></tr>
        </tbody>
      </table>

      <h3>Animation</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>accordion-transition</td><td>height 0.25s ease</td></tr>
          <tr><td>chevron-transition</td><td>transform 0.25s ease</td></tr>
          <tr><td>hover-transition</td><td>background 0.15s ease</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all accordion variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-accordion--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Wrapper for all accordion items</td></tr>
          <tr><td>2</td><td>Item</td><td>Individual collapsible section</td></tr>
          <tr><td>3</td><td>Header</td><td>Clickable trigger row with title text</td></tr>
          <tr><td>4</td><td>Chevron</td><td>Expand/collapse indicator that rotates 180° when expanded</td></tr>
          <tr><td>5</td><td>Content Panel</td><td>Collapsible body content with height animation</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To organize long content into scannable, collapsible sections</li>
        <li>For FAQ pages where users scan titles and expand relevant answers</li>
        <li>To progressively disclose settings or configuration options</li>
        <li>In forms with optional sections that can be collapsed</li>
        <li>For navigation menus with expandable sub-sections</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="accordion"
        doItems={[
          'Use for progressive disclosure of content',
          'Keep headers descriptive and concise',
          'Allow multiple sections open if content is related',
          'Consider having the first section open by default',
          'Use consistent sizing within the same context',
        ]}
        dontItems={[
          'Don\'t nest accordions inside accordions',
          'Don\'t use for critical content that must always be visible',
          'Don\'t hide primary navigation inside accordions',
          'Don\'t use for very short content that doesn\'t need collapsing',
          'Don\'t mix bordered and borderless styles in the same group',
        ]}
      />

      <h2>Behavior</h2>
      <table>
        <thead><tr><th>Mode</th><th>Behavior</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>Single expand</td><td>Only one section open at a time</td><td>Mutually exclusive content, FAQs</td></tr>
          <tr><td>Multi expand</td><td>Multiple sections can be open simultaneously</td><td>Related content, settings panels</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Headers should be descriptive enough to understand content without expanding</li>
        <li>Use sentence case for header text</li>
        <li>Content panels can contain any type of content — text, images, forms, or nested components</li>
        <li>Keep content concise; if a section is very long, consider breaking it into sub-sections</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>button (header)</td><td>Header acts as a toggle button</td></tr>
          <tr><td>aria-expanded</td><td>true | false</td><td>Indicates whether the section is expanded</td></tr>
          <tr><td>aria-controls</td><td>panel ID</td><td>Links header to its content panel</td></tr>
          <tr><td>role</td><td>region (panel)</td><td>Content panel is a landmark region</td></tr>
          <tr><td>aria-labelledby</td><td>header ID</td><td>Panel labeled by its header</td></tr>
          <tr><td>Keyboard</td><td>Enter / Space</td><td>Toggle section expand/collapse</td></tr>
          <tr><td>Keyboard</td><td>Arrow Up / Down</td><td>Navigate between accordion headers</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Tabs</strong> — For switching between views of equal importance</li>
        <li><strong>Side Drawer</strong> — For overlay content panels</li>
        <li><strong>List</strong> — For non-collapsible content lists</li>
        <li><strong>Dialog Box</strong> — For modal content that requires user action</li>
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
        <li>Added <code>allowMultiple</code> prop for multi-expand mode</li>
        <li>Added <code>ghost</code> variant for low-emphasis contexts</li>
        <li>Added <code>size</code> prop with SM, MD, LG options</li>
        <li>Added <code>bordered</code> prop to toggle border visibility</li>
        <li>Added <code>disabled</code> state for individual items</li>
        <li>Smooth height animation on expand/collapse</li>
        <li>Chevron rotates 180° when expanded</li>
        <li>Improved accessibility with aria-expanded support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with single-expand accordion</li>
        <li>Bordered and flush variants</li>
        <li>Basic expand/collapse with chevron indicator</li>
        <li>Keyboard navigation support</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function AccordionPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Accordion"
      description="Accordions expand and collapse sections of content to manage information density."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
