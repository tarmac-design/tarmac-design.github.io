'use client';

import { useState, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="pills" />
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
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

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
