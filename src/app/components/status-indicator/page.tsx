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
      <StorybookVariantViewer slug="status-indicator" />
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
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

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
