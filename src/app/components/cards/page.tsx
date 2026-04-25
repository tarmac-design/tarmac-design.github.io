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
      <StorybookVariantViewer slug="cards" />
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
      <pre><code>{`import { Card } from '@tarmac/design-system';`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`<Card title="Order Summary" subtitle="3 items · ₹1,240">
  <p>Your order is being processed.</p>
</Card>

// With footer actions
<Card
  title="Delivery Update"
  subtitle="Shipment #DL-4829"
  footer={
    <>
      <Button variant="primary" size="sm">Track</Button>
      <Button variant="ghost" size="sm">Details</Button>
    </>
  }
>
  Expected delivery by tomorrow, 6:00 PM.
</Card>

// With cover image
<Card
  title="Warehouse Alpha"
  cover={<img src="/warehouse.jpg" alt="Warehouse" />}
>
  Capacity: 12,000 sq ft
</Card>

// Selection card
<Card
  title="Pro Plan"
  subtitle="₹1,499/mo"
  selectable
  selected={isSelected}
  onClick={() => setSelected(!isSelected)}
>
  Up to 10,000 shipments per month
</Card>`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`interface CardProps {
  /** Card heading text */
  title?: string;
  /** Secondary text below the title */
  subtitle?: string;
  /** Main body content */
  children?: React.ReactNode;
  /** Footer content — typically action buttons */
  footer?: React.ReactNode;
  /** Cover image or media rendered above the header */
  cover?: React.ReactNode;
  /** Enables radio/checkbox selection indicator */
  selectable?: boolean;
  /** Controlled selected state (requires selectable) */
  selected?: boolean;
  /** Disables all interactions and reduces opacity */
  disabled?: boolean;
  /** Renders as a dashed-border placeholder */
  ghost?: boolean;
  /** Click handler for the entire card surface */
  onClick?: () => void;
  /** Internal padding: 'sm' (12px) | 'md' (16px) | 'lg' (24px) */
  padding?: 'sm' | 'md' | 'lg';
  /** Badge or pill element positioned top-right */
  badge?: React.ReactNode;
  /** Optional className for custom styling */
  className?: string;
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>title</td><td>string</td><td>—</td><td>Primary heading displayed in the card header</td></tr>
          <tr><td>subtitle</td><td>string</td><td>—</td><td>Secondary text rendered below the title</td></tr>
          <tr><td>children</td><td>ReactNode</td><td>—</td><td>Main body content of the card</td></tr>
          <tr><td>footer</td><td>ReactNode</td><td>—</td><td>Footer area, typically for action buttons</td></tr>
          <tr><td>cover</td><td>ReactNode</td><td>—</td><td>Cover image or media slot above the header</td></tr>
          <tr><td>selectable</td><td>boolean</td><td>false</td><td>Shows a radio/checkbox selection indicator</td></tr>
          <tr><td>selected</td><td>boolean</td><td>false</td><td>Controlled selected state; highlights border blue</td></tr>
          <tr><td>disabled</td><td>boolean</td><td>false</td><td>Disables interactions, reduces opacity to 0.45</td></tr>
          <tr><td>ghost</td><td>boolean</td><td>false</td><td>Renders as a dashed-border transparent placeholder</td></tr>
          <tr><td>onClick</td><td>() =&gt; void</td><td>—</td><td>Click handler for the entire card surface</td></tr>
          <tr><td>padding</td><td>{`'sm' | 'md' | 'lg'`}</td><td>{`'md'`}</td><td>Internal padding: 12px, 16px, or 24px</td></tr>
          <tr><td>badge</td><td>ReactNode</td><td>—</td><td>Badge/pill element positioned at top-right corner</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>

      <h4>Selection Group (Radio)</h4>
      <pre><code>{`const [selected, setSelected] = useState<string>('plan-a');

const plans = [
  { id: 'plan-a', title: 'Basic', price: '₹499/mo' },
  { id: 'plan-b', title: 'Pro', price: '₹1,499/mo' },
  { id: 'plan-c', title: 'Enterprise', price: 'Custom' },
];

<div style={{ display: 'flex', gap: 16 }}>
  {plans.map(plan => (
    <Card
      key={plan.id}
      title={plan.title}
      subtitle={plan.price}
      selectable
      selected={selected === plan.id}
      onClick={() => setSelected(plan.id)}
    />
  ))}
</div>`}</code></pre>

      <h4>Selection Group (Checkbox)</h4>
      <pre><code>{`const [selected, setSelected] = useState<Set<string>>(new Set());

const toggle = (id: string) => {
  setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
};

<Card
  title="Analytics"
  selectable
  selected={selected.has('analytics')}
  onClick={() => toggle('analytics')}
/>`}</code></pre>

      <h4>With Badge and Cover</h4>
      <pre><code>{`<Card
  title="Warehouse Alpha"
  subtitle="Mumbai, Maharashtra"
  cover={<img src="/warehouse.jpg" alt="Warehouse" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
  badge={<Badge variant="success">Active</Badge>}
  footer={
    <>
      <Button variant="primary" size="sm">View</Button>
      <Button variant="ghost" size="sm">Edit</Button>
    </>
  }
>
  Capacity: 12,000 sq ft · 94% utilized
</Card>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Spacing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>card-padding-sm</td><td>12px</td><td>Compact internal padding</td></tr>
          <tr><td>card-padding-md</td><td>16px</td><td>Default internal padding</td></tr>
          <tr><td>card-padding-lg</td><td>24px</td><td>Spacious internal padding</td></tr>
          <tr><td>card-border-radius</td><td>12px</td><td>Corner rounding</td></tr>
          <tr><td>card-gap</td><td>16px</td><td>Spacing between cards in a grid</td></tr>
        </tbody>
      </table>

      <h3>Elevation</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>card-shadow-default</td><td>none</td><td>No shadow at rest</td></tr>
          <tr><td>card-shadow-hover</td><td>0 4px 16px rgba(0,0,0,0.12)</td><td>Subtle shadow on hover</td></tr>
          <tr><td>card-border-default</td><td>1px solid #E0E0E0</td><td>Default border</td></tr>
          <tr><td>card-border-selected</td><td>1px solid #2396FB</td><td>Selected state border</td></tr>
          <tr><td>card-border-ghost</td><td>1px dashed #CCC</td><td>Ghost/placeholder border</td></tr>
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
          <tr><td>1</td><td>Container</td><td>Bordered rounded rectangle defining the card boundary</td></tr>
          <tr><td>2</td><td>Cover</td><td>Optional image or media slot at the top</td></tr>
          <tr><td>3</td><td>Header</td><td>Title and optional subtitle area</td></tr>
          <tr><td>4</td><td>Body</td><td>Main content area for text, metrics, or custom content</td></tr>
          <tr><td>5</td><td>Footer</td><td>Action buttons or metadata row</td></tr>
          <tr><td>6</td><td>Badge</td><td>Optional status pill positioned at top-right</td></tr>
          <tr><td>7</td><td>Selection Indicator</td><td>Radio/checkbox circle for selectable cards</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To group related content and actions in a contained surface</li>
        <li>To display items in a browsable grid or list (plans, products, locations)</li>
        <li>To present selectable options with visual context (plan selection, feature toggles)</li>
        <li>To show summary metrics or KPIs in dashboard layouts</li>
        <li>To display content previews with cover images</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="cards"
        doItems={[
          'Use cards to group related content and actions together',
          'Keep card content scannable — prioritize key information',
          'Use consistent card sizes within the same grid layout',
          'Limit footer actions to 2–3 buttons maximum',
          'Use selection cards for choosing between distinct options',
          'Provide visual feedback on hover and selection states',
        ]}
        dontItems={[
          'Don\'t overload cards with too much content or too many actions',
          'Don\'t mix card sizes inconsistently in the same row',
          'Don\'t use cards for single pieces of information — use a label instead',
          'Don\'t nest cards inside other cards',
          'Don\'t use ghost cards as permanent UI — they are for loading states only',
          'Don\'t rely solely on color to indicate selection state',
        ]}
      />

      <h2>Card Types</h2>
      <table>
        <thead><tr><th>Type</th><th>Use Case</th><th>Behavior</th></tr></thead>
        <tbody>
          <tr><td>Standard</td><td>Content display, summaries, previews</td><td>Static or clickable</td></tr>
          <tr><td>Selection (Radio)</td><td>Single-choice selection from a group</td><td>Only one selected at a time</td></tr>
          <tr><td>Selection (Checkbox)</td><td>Multi-choice selection from a group</td><td>Multiple can be selected</td></tr>
          <tr><td>Info / Stat</td><td>KPI display, metrics, counters</td><td>Typically non-interactive</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Titles should be concise — 3–5 words maximum</li>
        <li>Subtitles provide supporting context (price, ID, location)</li>
        <li>Body text should be 1–2 sentences for scanability</li>
        <li>Footer actions should use clear, action-oriented labels</li>
        <li>Badges should use semantic colors (green for success, red for error)</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>article / option</td><td>article for standard cards, option for selectable</td></tr>
          <tr><td>aria-selected</td><td>boolean</td><td>Indicates selection state for selectable cards</td></tr>
          <tr><td>aria-disabled</td><td>boolean</td><td>Indicates disabled state</td></tr>
          <tr><td>tabIndex</td><td>0 / -1</td><td>Focusable when enabled, removed when disabled</td></tr>
          <tr><td>Keyboard</td><td>Enter / Space</td><td>Activates card click handler</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Text against card background meets WCAG AA</td></tr>
          <tr><td>Focus ring</td><td>Visible outline</td><td>Browser default focus indicator on tab navigation</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>List</strong> — For dense, single-line item displays without card boundaries</li>
        <li><strong>Accordion</strong> — For expandable/collapsible content sections</li>
        <li><strong>Badge</strong> — Used within cards for status indicators</li>
        <li><strong>Button</strong> — Used in card footers for actions</li>
        <li><strong>Shimmer</strong> — Loading placeholder that can be used inside ghost cards</li>
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
        <li>Added <code>selectable</code> prop with radio/checkbox selection indicator</li>
        <li>Added <code>ghost</code> state for skeleton/placeholder cards</li>
        <li>Added <code>cover</code> slot for header images and media</li>
        <li>Added <code>badge</code> slot for status pills at top-right</li>
        <li>Added configurable <code>padding</code> prop (sm, md, lg)</li>
        <li>Added <code>disabled</code> state with reduced opacity</li>
        <li>Hover state now shows subtle elevation shadow</li>
        <li>Keyboard navigation support with Enter/Space activation</li>
        <li>Improved accessibility with role, aria-selected, and aria-disabled</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with Basic, Image, Horizontal, and Interactive variants</li>
        <li>Header, Body, and Footer anatomy</li>
        <li>Elevated and outlined container styles</li>
        <li>Click handler support for interactive cards</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function CardsPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Cards"
      description="Cards are container components for grouping related content and actions in a contained, elevated surface."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
