'use client';

import { useState, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Card Props Interface ── */
interface CardProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  footer?: ReactNode;
  cover?: ReactNode;
  selectable?: boolean;
  selected?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg';
  badge?: ReactNode;
  theme?: 'light' | 'dark';
}

/* ── Padding map ── */
const paddingMap: Record<string, number> = { sm: 12, md: 16, lg: 24 };

/* ── Card Demo Component ── */
function CardDemo({
  title,
  subtitle,
  children,
  footer,
  cover,
  selectable = false,
  selected = false,
  disabled = false,
  ghost = false,
  onClick,
  padding = 'md',
  badge,
  theme = 'light',
}: CardProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const isDark = theme === 'dark';
  const pad = paddingMap[padding] || 16;

  const bg = ghost
    ? 'transparent'
    : isDark ? '#2A2A2A' : '#FFFFFF';
  const borderColor = selected
    ? '#2396FB'
    : ghost
      ? (isDark ? '#555' : '#CCC')
      : (isDark ? '#3A3A3A' : '#E0E0E0');
  const borderStyle = ghost ? 'dashed' : 'solid';
  const textColor = isDark ? '#F0F0F0' : '#1A1A1A';
  const subtitleColor = isDark ? '#999' : '#666';
  const shadow = hovered && !disabled && !ghost
    ? `0 4px 16px rgba(0,0,0,${isDark ? '0.4' : '0.12'})`
    : 'none';
  const opacity = disabled ? 0.45 : ghost ? 0.6 : 1;

  return (
    <div
      role={selectable ? 'option' : 'article'}
      aria-selected={selectable ? selected : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onClick?.()}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: 260,
        borderRadius: 12,
        border: `1px ${borderStyle} ${borderColor}`,
        background: bg,
        boxShadow: shadow,
        opacity,
        cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
        transform: pressed && !disabled ? 'scale(0.98)' : 'scale(1)',
        transition: 'box-shadow 0.2s ease, transform 0.15s ease, border-color 0.2s ease, opacity 0.2s ease',
        overflow: 'hidden',
        position: 'relative',
        outline: 'none',
      }}
    >
      {/* Badge slot */}
      {badge && (
        <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          {badge}
        </div>
      )}

      {/* Cover image slot */}
      {cover && (
        <div style={{ width: '100%', height: 140, overflow: 'hidden', background: isDark ? '#333' : '#EEE' }}>
          {cover}
        </div>
      )}

      {/* Header */}
      {(title || subtitle || selectable) && (
        <div style={{ padding: `${pad}px ${pad}px ${children || footer ? 0 : pad}px`, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          {selectable && (
            <span style={{
              width: 18, height: 18, borderRadius: selectable ? 10 : 3,
              border: `2px solid ${selected ? '#2396FB' : (isDark ? '#666' : '#BBB')}`,
              background: selected ? '#2396FB' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: 2,
              transition: 'background 0.15s ease, border-color 0.15s ease',
            }}>
              {selected && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 6l2.5 2.5 4.5-5" />
                </svg>
              )}
            </span>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && (
              <div style={{ fontSize: 15, fontWeight: 600, color: textColor, lineHeight: 1.3 }}>
                {title}
              </div>
            )}
            {subtitle && (
              <div style={{ fontSize: 13, color: subtitleColor, marginTop: 2, lineHeight: 1.4 }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Body */}
      {children && (
        <div style={{ padding: `${pad * 0.75}px ${pad}px`, fontSize: 13, color: subtitleColor, lineHeight: 1.5 }}>
          {children}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div style={{
          padding: `${pad * 0.75}px ${pad}px ${pad}px`,
          borderTop: `1px solid ${isDark ? '#3A3A3A' : '#EFEFEF'}`,
          display: 'flex', gap: 8, alignItems: 'center',
        }}>
          {footer}
        </div>
      )}
    </div>
  );
}

/* ── Small action button for card footers ── */
function ActionBtn({ label, primary, theme }: { label: string; primary?: boolean; theme: 'light' | 'dark' }) {
  const [hovered, setHovered] = useState(false);
  const isDark = theme === 'dark';
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
        border: primary ? 'none' : `1px solid ${isDark ? '#555' : '#DDD'}`,
        background: primary ? '#2396FB' : (hovered ? (isDark ? '#3A3A3A' : '#F5F5F5') : 'transparent'),
        color: primary ? '#FFF' : (isDark ? '#CCC' : '#333'),
        transition: 'background 0.15s ease',
      }}
    >
      {label}
    </button>
  );
}

/* ── Badge pill for card demos ── */
function CardBadge({ label, color, theme }: { label: string; color: string; theme: 'light' | 'dark' }) {
  return (
    <span style={{
      padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
      background: color, color: '#FFF',
    }}>
      {label}
    </span>
  );
}

/* ── Skeleton/Ghost placeholder block ── */
function SkeletonBlock({ width, height, theme }: { width: string | number; height: number; theme: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  return (
    <div style={{
      width, height, borderRadius: 6,
      background: isDark ? '#3A3A3A' : '#E8E8E8',
      animation: 'pulse 1.5s ease-in-out infinite',
    }} />
  );
}

/* ── Cover image placeholder ── */
function CoverPlaceholder({ theme }: { theme: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: isDark ? '#333' : '#E0E0E0',
    }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#555' : '#BBB'} strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  const [selectedRadio, setSelectedRadio] = useState<string | null>('plan-pro');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Set<string>>(new Set(['feature-analytics']));

  const toggleCheckbox = (id: string) => {
    setSelectedCheckboxes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-card--card-playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-card--card-playground"
        height={420}
        title="Cards — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        Cards are container components for grouping related content and actions within a
        bounded, elevated surface. They support headers, body content, footers, cover images,
        action buttons, and selection behavior.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Types</td><td>Standard Card, Selection Card (radio/checkbox), Info Card</td></tr>
          <tr><td>States</td><td>Default, Hover, Selected, Disabled, Ghost/Skeleton</td></tr>
          <tr><td>Features</td><td>Header, Body, Footer, Cover image, Action buttons, Badge/Pill slots</td></tr>
          <tr><td>Padding</td><td>Small (12px), Medium (16px), Large (24px)</td></tr>
        </tbody>
      </table>

      <h2>Standard Cards</h2>

      <ComponentExampleSection
        title="Basic Card"
        desc="A simple card with title, subtitle, body content, and footer actions."
      >
        {({ theme }) => (
          <>
            <CardDemo
              title="Order Summary"
              subtitle="3 items · ₹1,240"
              footer={
                <>
                  <ActionBtn label="View Details" primary theme={theme as 'light' | 'dark'} />
                  <ActionBtn label="Cancel" theme={theme as 'light' | 'dark'} />
                </>
              }
              theme={theme as 'light' | 'dark'}
            >
              Your order is being processed and will be dispatched within 24 hours.
            </CardDemo>
            <CardDemo
              title="Delivery Update"
              subtitle="Shipment #DL-4829"
              badge={<CardBadge label="In Transit" color="#2396FB" theme={theme as 'light' | 'dark'} />}
              footer={<ActionBtn label="Track" primary theme={theme as 'light' | 'dark'} />}
              theme={theme as 'light' | 'dark'}
            >
              Expected delivery by tomorrow, 6:00 PM.
            </CardDemo>
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection
        title="Card with Cover Image"
        desc="Cards can include a cover image slot at the top for visual content."
      >
        {({ theme }) => (
          <>
            <CardDemo
              title="Warehouse Alpha"
              subtitle="Mumbai, Maharashtra"
              cover={<CoverPlaceholder theme={theme as 'light' | 'dark'} />}
              footer={<ActionBtn label="View Details" primary theme={theme as 'light' | 'dark'} />}
              theme={theme as 'light' | 'dark'}
            >
              Capacity: 12,000 sq ft · 94% utilized
            </CardDemo>
            <CardDemo
              title="Fleet Vehicle"
              subtitle="MH-02-AB-1234"
              cover={<CoverPlaceholder theme={theme as 'light' | 'dark'} />}
              badge={<CardBadge label="Active" color="#1BA86E" theme={theme as 'light' | 'dark'} />}
              theme={theme as 'light' | 'dark'}
            >
              Last trip: Delhi → Mumbai · 1,420 km
            </CardDemo>
          </>
        )}
      </ComponentExampleSection>

      <h2>Selection Cards</h2>

      <ComponentExampleSection
        title="Radio Selection Cards"
        desc="Selectable cards with radio behavior — only one can be selected at a time."
      >
        {({ theme }) => (
          <>
            {[
              { id: 'plan-basic', title: 'Basic Plan', subtitle: '₹499/mo', desc: 'Up to 1,000 shipments per month' },
              { id: 'plan-pro', title: 'Pro Plan', subtitle: '₹1,499/mo', desc: 'Up to 10,000 shipments per month' },
              { id: 'plan-enterprise', title: 'Enterprise', subtitle: 'Custom', desc: 'Unlimited shipments with SLA' },
            ].map(plan => (
              <CardDemo
                key={plan.id}
                title={plan.title}
                subtitle={plan.subtitle}
                selectable
                selected={selectedRadio === plan.id}
                onClick={() => setSelectedRadio(plan.id)}
                theme={theme as 'light' | 'dark'}
              >
                {plan.desc}
              </CardDemo>
            ))}
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection
        title="Checkbox Selection Cards"
        desc="Selectable cards with checkbox behavior — multiple can be selected."
      >
        {({ theme }) => (
          <>
            {[
              { id: 'feature-analytics', title: 'Analytics', subtitle: 'Add-on', desc: 'Real-time shipment analytics dashboard' },
              { id: 'feature-api', title: 'API Access', subtitle: 'Add-on', desc: 'RESTful API for integration' },
              { id: 'feature-support', title: 'Priority Support', subtitle: 'Add-on', desc: '24/7 dedicated support channel' },
            ].map(feat => (
              <CardDemo
                key={feat.id}
                title={feat.title}
                subtitle={feat.subtitle}
                selectable
                selected={selectedCheckboxes.has(feat.id)}
                onClick={() => toggleCheckbox(feat.id)}
                theme={theme as 'light' | 'dark'}
              >
                {feat.desc}
              </CardDemo>
            ))}
          </>
        )}
      </ComponentExampleSection>

      <h2>Info Cards</h2>

      <ComponentExampleSection
        title="Info / Stat Cards"
        desc="Compact cards for displaying key metrics or informational content."
      >
        {({ theme }) => (
          <>
            <CardDemo title="Total Shipments" subtitle="This Month" padding="lg" theme={theme as 'light' | 'dark'}>
              <div style={{ fontSize: 28, fontWeight: 700, color: theme === 'dark' ? '#F0F0F0' : '#1A1A1A' }}>24,891</div>
            </CardDemo>
            <CardDemo title="On-Time Delivery" subtitle="Last 30 Days" padding="lg" badge={<CardBadge label="+2.4%" color="#1BA86E" theme={theme as 'light' | 'dark'} />} theme={theme as 'light' | 'dark'}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#1BA86E' }}>96.7%</div>
            </CardDemo>
            <CardDemo title="Pending Issues" subtitle="Requires Attention" padding="lg" badge={<CardBadge label="Urgent" color="#DC143C" theme={theme as 'light' | 'dark'} />} theme={theme as 'light' | 'dark'}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#DC143C' }}>12</div>
            </CardDemo>
          </>
        )}
      </ComponentExampleSection>

      <h2>States</h2>

      <ComponentExampleSection
        title="Default, Disabled & Ghost"
        desc="Cards support disabled and ghost/skeleton states for inactive or loading contexts."
      >
        {({ theme }) => (
          <>
            <CardDemo title="Default Card" subtitle="Normal state" theme={theme as 'light' | 'dark'}>
              This card is in its default state. Hover to see the shadow effect.
            </CardDemo>
            <CardDemo title="Disabled Card" subtitle="Cannot interact" disabled theme={theme as 'light' | 'dark'}>
              This card is disabled and non-interactive.
            </CardDemo>
            <CardDemo title="Ghost Card" subtitle="Placeholder" ghost theme={theme as 'light' | 'dark'}>
              Ghost cards serve as visual placeholders.
            </CardDemo>
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection
        title="Skeleton Loading"
        desc="Skeleton cards show animated placeholders while content is loading."
      >
        {({ theme }) => (
          <CardDemo ghost theme={theme as 'light' | 'dark'}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SkeletonBlock width="70%" height={14} theme={theme as 'light' | 'dark'} />
              <SkeletonBlock width="40%" height={10} theme={theme as 'light' | 'dark'} />
              <SkeletonBlock width="100%" height={60} theme={theme as 'light' | 'dark'} />
              <SkeletonBlock width="50%" height={10} theme={theme as 'light' | 'dark'} />
            </div>
          </CardDemo>
        )}
      </ComponentExampleSection>

      <h2>Padding Sizes</h2>

      <ComponentExampleSection
        title="Configurable Padding"
        desc="Cards support small, medium, and large padding for different density needs."
      >
        {({ theme }) => (
          <>
            <CardDemo title="Small Padding" subtitle="Compact layout" padding="sm" theme={theme as 'light' | 'dark'}>
              12px internal padding
            </CardDemo>
            <CardDemo title="Medium Padding" subtitle="Default layout" padding="md" theme={theme as 'light' | 'dark'}>
              16px internal padding
            </CardDemo>
            <CardDemo title="Large Padding" subtitle="Spacious layout" padding="lg" theme={theme as 'light' | 'dark'}>
              24px internal padding
            </CardDemo>
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
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
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
