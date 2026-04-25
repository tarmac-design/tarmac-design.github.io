'use client';

import { type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="accordion" />
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
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

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
