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
      <StorybookVariantViewer slug="snackbar" />
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
      <pre><code>{`import { Snackbar, useSnackbar } from '@tarmac/design-system';`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Simple notification
<Snackbar variant="positive" title="Changes saved" />

// With description and close button
<Snackbar
  variant="info"
  title="Update available"
  description="A new version is ready to install."
  closable
/>

// With CTA action
<Snackbar
  variant="negative"
  title="Item deleted"
  closable
  actions={<Button size="sm" variant="ghost">Undo</Button>}
/>

// Using the hook for imperative control
const { showSnackbar } = useSnackbar();

showSnackbar({
  variant: 'positive',
  title: 'File uploaded',
  duration: 4000,
});`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`interface SnackbarProps {
  /** Color variant of the snackbar */
  variant?: 'black' | 'white' | 'info' | 'positive' | 'negative' | 'warning';

  /** Visual style — filled (solid bg), subtle (tinted bg), outlined (border) */
  style?: 'filled' | 'subtle' | 'outlined';

  /** Primary text displayed in the snackbar */
  title?: string;

  /** Secondary text below the title */
  description?: string;

  /** Whether the snackbar shows a close (X) button */
  closable?: boolean;

  /** Custom leading icon — defaults to variant-specific icon */
  icon?: ReactNode;

  /** Action buttons rendered after the text content */
  actions?: ReactNode;

  /** Size of the snackbar */
  size?: 'sm' | 'lg';

  /** Auto-dismiss duration in milliseconds (default: 4000) */
  duration?: number;

  /** Callback fired when the snackbar is dismissed */
  onDismiss?: () => void;

  /** Position on screen */
  position?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center';
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>variant</code></td><td><code>string</code></td><td><code>&apos;info&apos;</code></td><td>Color variant: black, white, info, positive, negative, warning</td></tr>
          <tr><td><code>style</code></td><td><code>string</code></td><td><code>&apos;filled&apos;</code></td><td>Visual style: filled, subtle, or outlined</td></tr>
          <tr><td><code>title</code></td><td><code>string</code></td><td>—</td><td>Primary notification text</td></tr>
          <tr><td><code>description</code></td><td><code>string</code></td><td>—</td><td>Secondary description text below the title</td></tr>
          <tr><td><code>closable</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Shows a close button for manual dismissal</td></tr>
          <tr><td><code>icon</code></td><td><code>ReactNode</code></td><td>Auto</td><td>Custom leading icon; defaults to variant-specific icon</td></tr>
          <tr><td><code>actions</code></td><td><code>ReactNode</code></td><td>—</td><td>CTA buttons rendered inline after text</td></tr>
          <tr><td><code>size</code></td><td><code>&apos;sm&apos; | &apos;lg&apos;</code></td><td><code>&apos;lg&apos;</code></td><td>Small (compact) or Large (default) sizing</td></tr>
          <tr><td><code>duration</code></td><td><code>number</code></td><td><code>4000</code></td><td>Auto-dismiss duration in milliseconds</td></tr>
          <tr><td><code>onDismiss</code></td><td><code>() =&gt; void</code></td><td>—</td><td>Callback when snackbar is dismissed</td></tr>
          <tr><td><code>position</code></td><td><code>string</code></td><td><code>&apos;bottom-center&apos;</code></td><td>Screen position for the snackbar</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>
      <pre><code>{`// 1. Declarative usage in JSX
function MyComponent() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Save</Button>
      {show && (
        <Snackbar
          variant="positive"
          style="filled"
          title="Saved successfully"
          description="Your changes are live."
          closable
          duration={3000}
          onDismiss={() => setShow(false)}
        />
      )}
    </>
  );
}

// 2. Imperative usage with hook
function MyApp() {
  const { showSnackbar, dismissAll } = useSnackbar();

  const handleSave = async () => {
    try {
      await saveData();
      showSnackbar({
        variant: 'positive',
        title: 'Data saved',
        actions: <Button size="sm" onClick={dismissAll}>OK</Button>,
      });
    } catch {
      showSnackbar({
        variant: 'negative',
        title: 'Save failed',
        description: 'Please try again.',
        closable: true,
      });
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}

// 3. Outlined style with custom icon
<Snackbar
  variant="warning"
  style="outlined"
  title="Session expiring"
  icon={<ClockIcon />}
  actions={<Button size="sm">Extend</Button>}
/>

// 4. Subtle style, small size
<Snackbar
  variant="info"
  style="subtle"
  size="sm"
  title="Copied to clipboard"
  duration={2000}
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>snackbar-padding-sm</td><td>8px 12px</td></tr>
          <tr><td>snackbar-padding-lg</td><td>12px 16px</td></tr>
          <tr><td>snackbar-border-radius</td><td>10px</td></tr>
          <tr><td>snackbar-icon-size-sm</td><td>16px</td></tr>
          <tr><td>snackbar-icon-size-lg</td><td>18px</td></tr>
          <tr><td>snackbar-title-font-size-sm</td><td>13px</td></tr>
          <tr><td>snackbar-title-font-size-lg</td><td>14px</td></tr>
          <tr><td>snackbar-shadow</td><td>0 4px 16px rgba(0,0,0,0.12)</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors (Filled)</h3>
      <table>
        <thead><tr><th>Variant</th><th>Background</th><th>Text</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>#FFFFFF</td></tr>
          <tr><td>white</td><td>#FFFFFF</td><td>#0D0D0D</td></tr>
          <tr><td>info</td><td>#2396FB</td><td>#FFFFFF</td></tr>
          <tr><td>positive</td><td>#1BA86E</td><td>#FFFFFF</td></tr>
          <tr><td>negative</td><td>#DC143C</td><td>#FFFFFF</td></tr>
          <tr><td>warning</td><td>#CF9F02</td><td>#FFFFFF</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all snackbar variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-snackbar--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Rounded rectangle with shadow, positioned at bottom-center</td></tr>
          <tr><td>2</td><td>Leading Icon</td><td>Contextual icon matching the snackbar variant</td></tr>
          <tr><td>3</td><td>Title</td><td>Primary notification text (bold)</td></tr>
          <tr><td>4</td><td>Description</td><td>Optional secondary text below the title</td></tr>
          <tr><td>5</td><td>CTA Buttons</td><td>Optional action buttons (e.g., Undo, Retry)</td></tr>
          <tr><td>6</td><td>Close Button</td><td>Optional dismiss action (X icon)</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To confirm a completed action (e.g., &quot;Item saved&quot;, &quot;Email sent&quot;)</li>
        <li>To provide brief, non-blocking feedback that doesn&apos;t require user action</li>
        <li>To offer an undo opportunity for destructive actions</li>
        <li>To notify about background processes completing</li>
      </ul>

      <h2>When Not to Use</h2>
      <ul>
        <li>For persistent messages — use Alert or Banner instead</li>
        <li>For critical errors requiring acknowledgment — use Dialog Box</li>
        <li>For inline form validation — use field-level error messages</li>
        <li>For complex multi-step feedback — use a dedicated status page</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="snackbar"
        doItems={[
          'Keep messages short and scannable (under 2 lines)',
          'Use semantic variants — green for success, red for errors',
          'Include an Undo action for destructive operations',
          'Auto-dismiss after 3–5 seconds for non-critical messages',
          'Show only one snackbar at a time to avoid stacking clutter',
          'Use filled style for high-emphasis, subtle for low-emphasis',
        ]}
        dontItems={[
          'Don\'t use snackbars for critical errors that need acknowledgment',
          'Don\'t stack more than 2 snackbars simultaneously',
          'Don\'t auto-dismiss snackbars with important actions',
          'Don\'t use snackbars for permanent or persistent content',
          'Don\'t place snackbars over important interactive elements',
          'Don\'t rely on color alone — always include an icon and text',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>status</td><td>Identifies the element as a status notification</td></tr>
          <tr><td>aria-live</td><td>polite</td><td>Announces the snackbar without interrupting the user</td></tr>
          <tr><td>Close button</td><td>aria-label=&quot;Dismiss notification&quot;</td><td>Accessible label for the dismiss action</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Text against background meets WCAG AA</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter / Escape</td><td>Focus actions and dismiss with Escape</td></tr>
          <tr><td>Auto-dismiss</td><td>Pause on hover</td><td>Timer pauses when user hovers over the snackbar</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Titles should be concise and describe the outcome (e.g., &quot;Message sent&quot;)</li>
        <li>Descriptions are optional — use only when extra context is needed</li>
        <li>Action labels should be specific verbs (e.g., &quot;Undo&quot;, &quot;Retry&quot;, &quot;View&quot;)</li>
        <li>Use sentence case for all text</li>
      </ul>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Alert</strong> — Persistent notification banners with left border accent</li>
        <li><strong>Dialog Box</strong> — Modal confirmations requiring user decision</li>
        <li><strong>Badge</strong> — Compact status indicators</li>
        <li><strong>Status Indicator</strong> — Inline status dots</li>
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
        <li>Added <code>style</code> prop with Filled, Subtle, and Outlined options</li>
        <li>Added <code>description</code> prop for dual-text layout</li>
        <li>Added <code>actions</code> prop for inline CTA buttons</li>
        <li>Added <code>size</code> prop with Small and Large options</li>
        <li>New color variants: Black, White</li>
        <li>Dark mode support with dedicated color palette</li>
        <li>Fade-in / fade-out animation with bottom-center positioning</li>
        <li>Improved close button with hover and press states</li>
        <li>Added <code>aria-live=&quot;polite&quot;</code> for screen reader announcements</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with Info, Positive, Negative, Warning variants</li>
        <li>Leading icon and close button support</li>
        <li>Auto-dismiss with configurable duration</li>
        <li>Basic accessibility with role=&quot;status&quot;</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function SnackbarPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Snackbar"
      description="Snackbars are temporary notification toasts that appear at the bottom of the screen and auto-dismiss. Use them for brief, non-intrusive feedback about completed actions."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
