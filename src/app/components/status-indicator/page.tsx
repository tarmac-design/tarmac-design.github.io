'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Status type definitions ── */
type StatusType =
  | 'success' | 'failed' | 'warning' | 'information'
  | 'synced' | 'scheduled' | 'unknown' | 'pause'
  | 'play' | 'downloading' | 'pending';

type IndicatorSize = 'xs' | 'sm' | 'md' | 'lg';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  size?: IndicatorSize;
  animated?: boolean;
  icon?: ReactNode;
}

/* ── Color map ── */
const statusColors: Record<StatusType, string> = {
  success:      '#1BA86E',
  failed:       '#DC143C',
  warning:      '#CF9F02',
  information:  '#2396FB',
  synced:       '#1BA86E',
  scheduled:    '#CF9F02',
  unknown:      '#A3A3A3',
  pause:        '#CF9F02',
  play:         '#1BA86E',
  downloading:  '#2396FB',
  pending:      '#A3A3A3',
};

const statusLabels: Record<StatusType, string> = {
  success:     'Success',
  failed:      'Failed',
  warning:     'Warning',
  information: 'Information',
  synced:      'Synced',
  scheduled:   'Scheduled',
  unknown:     'Unknown',
  pause:       'Pause',
  play:        'Play',
  downloading: 'Downloading',
  pending:     'Pending',
};

/* Active states that should pulse */
const activeStatuses: StatusType[] = ['success', 'play', 'synced', 'downloading'];

const dotSizeMap: Record<IndicatorSize, number> = { lg: 12, md: 10, sm: 8, xs: 6 };
const fontSizeMap: Record<IndicatorSize, number> = { lg: 14, md: 13, sm: 12, xs: 11 };

/* ── Pulse keyframes (injected once) ── */
const pulseKeyframes = `
@keyframes statusPulse {
  0%   { transform: scale(1);   opacity: 1; }
  50%  { transform: scale(1.8); opacity: 0; }
  100% { transform: scale(1.8); opacity: 0; }
}
`;

/* ── StatusIndicator Demo Component ── */
function StatusIndicatorDemo({
  status,
  label,
  size = 'md',
  animated = false,
  icon,
  theme,
}: StatusIndicatorProps & { theme: 'light' | 'dark' }) {
  const color = statusColors[status] || '#A3A3A3';
  const dotSize = dotSizeMap[size];
  const fontSize = fontSizeMap[size];
  const showPulse = animated && activeStatuses.includes(status);
  const textColor = theme === 'dark' ? '#E5E5E5' : '#1A1A1A';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'xs' ? 4 : size === 'sm' ? 5 : 6,
      }}
      role="status"
      aria-label={label ? `${statusLabels[status]}: ${label}` : statusLabels[status]}
    >
      <div style={{ position: 'relative', width: dotSize, height: dotSize, flexShrink: 0 }}>
        {/* Pulse ring */}
        {showPulse && (
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: color,
              animation: 'statusPulse 2s ease-in-out infinite',
            }}
          />
        )}
        {/* Dot or icon */}
        {icon ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color, width: dotSize, height: dotSize }}>
            {icon}
          </span>
        ) : (
          <span
            style={{
              position: 'relative',
              display: 'block',
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              background: color,
            }}
          />
        )}
      </div>
      {label && (
        <span style={{ fontSize, fontWeight: 500, color: textColor, lineHeight: 1, whiteSpace: 'nowrap' }}>
          {label}
        </span>
      )}
    </div>
  );
}

/* ── Small demo icons ── */
function CheckIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.5 3.5 6.5-8" />
    </svg>
  );
}

function CrossIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

function ClockIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  );
}

/* ── Status Example Section with size/animated controls ── */
function StatusExampleSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: (props: { size: IndicatorSize; theme: 'light' | 'dark'; animated: boolean }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState<IndicatorSize>('md');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [animated, setAnimated] = useState(false);

  useEffect(() => { setTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);

  const bg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';
  const selectStyle: React.CSSProperties = {
    padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
    background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <style>{pulseKeyframes}</style>
      <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>{title}</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>{desc}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12, alignItems: 'center' }}>
        <select value={size} onChange={e => setSize(e.target.value as IndicatorSize)} style={selectStyle}>
          <option value="xs">XS (6px)</option>
          <option value="sm">SM (8px)</option>
          <option value="md">MD (10px)</option>
          <option value="lg">LG (12px)</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-on-surface)', cursor: 'pointer' }}>
          <input type="checkbox" checked={animated} onChange={e => setAnimated(e.target.checked)} />
          Animated
        </label>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        {children({ size, theme, animated })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  const allStatuses: StatusType[] = [
    'success', 'failed', 'warning', 'information',
    'synced', 'scheduled', 'unknown', 'pause',
    'play', 'downloading', 'pending',
  ];

  return (
    <>
      <StorybookVariantViewer slug="status-indicator" />
      <h2>Overview</h2>
      <p>
        Status Indicators are compact visual cues that communicate the current state of a system,
        process, or item. They render as colored dots with optional labels and support pulse
        animations for active states.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Types</td><td>Success, Failed, Warning, Information, Synced, Scheduled, Unknown, Pause, Play, Downloading, Pending</td></tr>
          <tr><td>Sizes</td><td>XSmall (6px), Small (8px), Medium (10px), Large (12px)</td></tr>
          <tr><td>Features</td><td>Colored dot, Label text, Custom icons, Without label</td></tr>
          <tr><td>States</td><td>Default, Animated (pulse for active states)</td></tr>
        </tbody>
      </table>

      <h2>All Status Types</h2>

      <StatusExampleSection
        title="Status Types"
        desc="Each status type has a distinct color for quick visual identification. Toggle animation to see pulse on active states."
      >
        {({ size, theme, animated }) => (
          <>
            {allStatuses.map(s => (
              <StatusIndicatorDemo key={s} status={s} label={statusLabels[s]} size={size} animated={animated} theme={theme} />
            ))}
          </>
        )}
      </StatusExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Status indicators come in four sizes. XSmall for dense layouts, Large for prominent displays."
        sizes={['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg')[]}
      >
        {({ theme }) => (
          <>
            <style>{pulseKeyframes}</style>
            <StatusIndicatorDemo status="success" label="XSmall" size="xs" theme={theme as 'light' | 'dark'} />
            <StatusIndicatorDemo status="success" label="Small" size="sm" theme={theme as 'light' | 'dark'} />
            <StatusIndicatorDemo status="success" label="Medium" size="md" theme={theme as 'light' | 'dark'} />
            <StatusIndicatorDemo status="success" label="Large" size="lg" theme={theme as 'light' | 'dark'} />
          </>
        )}
      </ComponentExampleSection>

      <h2>With Custom Icons</h2>

      <StatusExampleSection
        title="Custom Icons"
        desc="Replace the default dot with a custom icon for additional semantic meaning."
      >
        {({ size, theme, animated }) => (
          <>
            <StatusIndicatorDemo status="success" label="Verified" size={size} animated={animated} icon={<CheckIcon size={dotSizeMap[size]} />} theme={theme} />
            <StatusIndicatorDemo status="failed" label="Rejected" size={size} animated={animated} icon={<CrossIcon size={dotSizeMap[size]} />} theme={theme} />
            <StatusIndicatorDemo status="scheduled" label="Scheduled" size={size} animated={animated} icon={<ClockIcon size={dotSizeMap[size]} />} theme={theme} />
          </>
        )}
      </StatusExampleSection>

      <h2>Without Label</h2>

      <StatusExampleSection
        title="Dot Only"
        desc="Status indicators can be used without labels for compact layouts like tables or lists."
      >
        {({ size, theme, animated }) => (
          <>
            {allStatuses.map(s => (
              <StatusIndicatorDemo key={s} status={s} size={size} animated={animated} theme={theme} />
            ))}
          </>
        )}
      </StatusExampleSection>

      <h2>Animated States</h2>

      <StatusExampleSection
        title="Pulse Animation"
        desc="Active states (Success, Play, Synced, Downloading) display a pulse animation to indicate live activity."
      >
        {({ size, theme }) => (
          <>
            <StatusIndicatorDemo status="success" label="Active" size={size} animated theme={theme} />
            <StatusIndicatorDemo status="play" label="Playing" size={size} animated theme={theme} />
            <StatusIndicatorDemo status="synced" label="Syncing" size={size} animated theme={theme} />
            <StatusIndicatorDemo status="downloading" label="Downloading" size={size} animated theme={theme} />
            <StatusIndicatorDemo status="failed" label="Failed (no pulse)" size={size} animated theme={theme} />
            <StatusIndicatorDemo status="pending" label="Pending (no pulse)" size={size} animated theme={theme} />
          </>
        )}
      </StatusExampleSection>
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
      <pre><code>{`import { StatusIndicator } from '@tarmac/design-system';`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default with label
<StatusIndicator status="success" label="Active" />

// Without label (dot only)
<StatusIndicator status="failed" />

// With animation
<StatusIndicator status="play" label="Playing" animated />

// Custom size
<StatusIndicator status="warning" label="Warning" size="lg" />

// With custom icon
<StatusIndicator status="success" label="Verified" icon={<CheckIcon />} />`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`import { ReactNode } from 'react';

type StatusType =
  | 'success'      // #1BA86E — completed, active, online
  | 'failed'       // #DC143C — error, rejected, offline
  | 'warning'      // #CF9F02 — needs attention, caution
  | 'information'  // #2396FB — informational, in progress
  | 'synced'       // #1BA86E — data synchronized
  | 'scheduled'    // #CF9F02 — planned, upcoming
  | 'unknown'      // #A3A3A3 — indeterminate state
  | 'pause'        // #CF9F02 — paused process
  | 'play'         // #1BA86E — actively running
  | 'downloading'  // #2396FB — transfer in progress
  | 'pending';     // #A3A3A3 — awaiting action

interface StatusIndicatorProps {
  /** The status type determining the indicator color */
  status: StatusType;

  /** Optional text label displayed next to the dot */
  label?: string;

  /** Size of the indicator dot
   *  'xs' = 6px | 'sm' = 8px | 'md' = 10px | 'lg' = 12px
   *  @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /** Enable pulse animation for active states
   *  Only pulses for: success, play, synced, downloading
   *  @default false
   */
  animated?: boolean;

  /** Custom icon to replace the default dot */
  icon?: ReactNode;
}`}</code></pre>

      <h3>Props Description</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>status</td><td>StatusType</td><td>—</td><td>Yes</td><td>Determines the indicator color. One of: success, failed, warning, information, synced, scheduled, unknown, pause, play, downloading, pending.</td></tr>
          <tr><td>label</td><td>string</td><td>undefined</td><td>No</td><td>Text label displayed adjacent to the colored dot. When omitted, renders dot only.</td></tr>
          <tr><td>size</td><td>{`'xs' | 'sm' | 'md' | 'lg'`}</td><td>{`'md'`}</td><td>No</td><td>Controls the dot diameter: xs=6px, sm=8px, md=10px, lg=12px. Font size scales proportionally.</td></tr>
          <tr><td>animated</td><td>boolean</td><td>false</td><td>No</td><td>Enables pulse animation. Only active states (success, play, synced, downloading) will pulse.</td></tr>
          <tr><td>icon</td><td>ReactNode</td><td>undefined</td><td>No</td><td>Custom icon element to replace the default colored dot. Inherits the status color.</td></tr>
        </tbody>
      </table>

      <h3>Status Color Reference</h3>
      <table>
        <thead><tr><th>Status</th><th>Color</th><th>Hex</th><th>Pulse</th></tr></thead>
        <tbody>
          <tr><td>success</td><td>Green</td><td>#1BA86E</td><td>Yes</td></tr>
          <tr><td>failed</td><td>Red</td><td>#DC143C</td><td>No</td></tr>
          <tr><td>warning</td><td>Amber</td><td>#CF9F02</td><td>No</td></tr>
          <tr><td>information</td><td>Blue</td><td>#2396FB</td><td>No</td></tr>
          <tr><td>synced</td><td>Green</td><td>#1BA86E</td><td>Yes</td></tr>
          <tr><td>scheduled</td><td>Amber</td><td>#CF9F02</td><td>No</td></tr>
          <tr><td>unknown</td><td>Gray</td><td>#A3A3A3</td><td>No</td></tr>
          <tr><td>pause</td><td>Amber</td><td>#CF9F02</td><td>No</td></tr>
          <tr><td>play</td><td>Green</td><td>#1BA86E</td><td>Yes</td></tr>
          <tr><td>downloading</td><td>Blue</td><td>#2396FB</td><td>Yes</td></tr>
          <tr><td>pending</td><td>Gray</td><td>#A3A3A3</td><td>No</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>
      <pre><code>{`// In a table row
<tr>
  <td><StatusIndicator status="success" label="Delivered" size="sm" /></td>
  <td>Order #12345</td>
</tr>

// In a card header
<div className="card-header">
  <h3>Server Status</h3>
  <StatusIndicator status="play" label="Running" animated />
</div>

// Compact list with dot only
<ul>
  {items.map(item => (
    <li key={item.id}>
      <StatusIndicator status={item.status} size="xs" />
      <span>{item.name}</span>
    </li>
  ))}
</ul>

// With custom icon
import { CheckCircle } from 'lucide-react';

<StatusIndicator
  status="success"
  label="Verified"
  icon={<CheckCircle size={12} />}
/>

// Conditional animation
<StatusIndicator
  status={isLive ? 'play' : 'pause'}
  label={isLive ? 'Live' : 'Paused'}
  animated={isLive}
  size="lg"
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>status-dot-size-xs</td><td>6px</td></tr>
          <tr><td>status-dot-size-sm</td><td>8px</td></tr>
          <tr><td>status-dot-size-md</td><td>10px</td></tr>
          <tr><td>status-dot-size-lg</td><td>12px</td></tr>
          <tr><td>status-label-gap</td><td>4–6px (scales with size)</td></tr>
          <tr><td>status-pulse-duration</td><td>2s</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all status indicator variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-status-indicator--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Dot / Icon</td><td>Colored circle or custom icon representing the status</td></tr>
          <tr><td>2</td><td>Label</td><td>Optional text describing the status in words</td></tr>
          <tr><td>3</td><td>Pulse Ring</td><td>Animated expanding ring for active states</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To display system or process status (online, offline, syncing)</li>
        <li>To show order or shipment tracking states</li>
        <li>To indicate real-time activity (downloading, playing)</li>
        <li>In tables, lists, or cards alongside related content</li>
        <li>As compact presence indicators in user profiles</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="status-indicator"
        doItems={[
          'Use consistent colors for the same status across the application',
          'Include a text label alongside the color for accessibility',
          'Use pulse animation only for genuinely active/live states',
          'Keep status labels concise — 1 to 2 words',
          'Place the indicator near the content it describes',
        ]}
        dontItems={[
          'Don\'t rely on color alone to convey status meaning',
          'Don\'t use pulse animation on every indicator — reserve for active states',
          'Don\'t use more than 4–5 different statuses in a single view',
          'Don\'t change status color meanings between different contexts',
          'Don\'t use status indicators as interactive buttons',
        ]}
      />

      <h2>Color Semantics</h2>
      <table>
        <thead><tr><th>Color Group</th><th>Statuses</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td>Green (#1BA86E)</td><td>Success, Synced, Play</td><td>Positive, active, completed</td></tr>
          <tr><td>Red (#DC143C)</td><td>Failed</td><td>Error, critical, stopped</td></tr>
          <tr><td>Amber (#CF9F02)</td><td>Warning, Scheduled, Pause</td><td>Caution, pending action, paused</td></tr>
          <tr><td>Blue (#2396FB)</td><td>Information, Downloading</td><td>Informational, in progress</td></tr>
          <tr><td>Gray (#A3A3A3)</td><td>Unknown, Pending</td><td>Indeterminate, awaiting</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should be 1–2 words maximum</li>
        <li>Use title case for status labels (e.g., &quot;In Progress&quot;)</li>
        <li>When used without a label, provide a tooltip or aria-label</li>
        <li>Icons should reinforce the status meaning, not replace the color</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>status</td><td>Identifies the element as a status indicator</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Full status description for screen readers</td></tr>
          <tr><td>aria-live</td><td>polite</td><td>Announces status changes to assistive technology</td></tr>
          <tr><td>Color + Text</td><td>Required</td><td>Never use color alone to convey meaning</td></tr>
          <tr><td>Contrast</td><td>≥ 3:1</td><td>Dot color against background meets WCAG AA for non-text</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Badge</strong> — Compact labels for status, counts, and categories</li>
        <li><strong>Pills</strong> — Interactive selectable chips with toggle behavior</li>
        <li><strong>Spinner</strong> — Loading indicator for indeterminate progress</li>
        <li><strong>Progress Bar</strong> — Determinate progress visualization</li>
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
        <li>Added 11 status types: Success, Failed, Warning, Information, Synced, Scheduled, Unknown, Pause, Play, Downloading, Pending</li>
        <li>Added 4 size options: XSmall (6px), Small (8px), Medium (10px), Large (12px)</li>
        <li>Added pulse animation for active states (success, play, synced, downloading)</li>
        <li>Added custom icon support via <code>icon</code> prop</li>
        <li>Added <code>animated</code> prop to control pulse behavior</li>
        <li>Improved accessibility with <code>role=&quot;status&quot;</code> and <code>aria-label</code></li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with dot and badge variants</li>
        <li>Basic status types: Online, Offline, Busy, Away</li>
        <li>Single size (8px dot)</li>
        <li>Tooltip support on hover</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function StatusIndicatorPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Status Indicator"
      description="Status indicators display the current state of a system, process, or item using colored dots and optional labels."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
