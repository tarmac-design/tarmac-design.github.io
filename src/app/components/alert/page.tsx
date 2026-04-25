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
      <StorybookVariantViewer slug="alert" />
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
      <pre><code>{`import { Alert } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface AlertProps {
  variant?: 'black' | 'white' | 'coal' | 'success' | 'error' | 'info' | 'warning';
  title?: string;
  description?: string;
  closable?: boolean;
  size?: 'sm' | 'lg';
  icon?: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Info alert (default)
<Alert variant="info" title="Heads up!" description="This is an informational alert." />

// Success alert with close button
<Alert variant="success" title="Saved" description="Your changes were saved." closable />

// Error alert
<Alert variant="error" title="Error" description="Something went wrong." closable />

// Warning alert
<Alert variant="warning" title="Warning" description="Proceed with caution." />

// Small size
<Alert variant="info" title="Compact" description="Small alert." size="sm" />

// With action buttons
<Alert
  variant="info"
  title="Update Available"
  description="A new version is ready."
  closable
  actions={
    <>
      <Button size="sm" variant="primary">Update</Button>
      <Button size="sm" variant="ghost">Later</Button>
    </>
  }
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>alert-padding-sm</td><td>10px 12px</td></tr>
          <tr><td>alert-padding-lg</td><td>14px 16px</td></tr>
          <tr><td>alert-border-radius</td><td>8px</td></tr>
          <tr><td>alert-border-left-width</td><td>4px</td></tr>
          <tr><td>alert-icon-size-sm</td><td>16px</td></tr>
          <tr><td>alert-icon-size-lg</td><td>20px</td></tr>
          <tr><td>alert-title-font-size-sm</td><td>13px</td></tr>
          <tr><td>alert-title-font-size-lg</td><td>15px</td></tr>
          <tr><td>alert-desc-font-size-sm</td><td>12px</td></tr>
          <tr><td>alert-desc-font-size-lg</td><td>14px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Background</th><th>Border</th><th>Icon</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>#0D0D0D</td><td>#FFFFFF</td></tr>
          <tr><td>white</td><td>#FFFFFF</td><td>#E0E0E0</td><td>#525252</td></tr>
          <tr><td>coal</td><td>#525252</td><td>#525252</td><td>#FFFFFF</td></tr>
          <tr><td>success</td><td>#E8F8F0</td><td>#1BA86E</td><td>#1BA86E</td></tr>
          <tr><td>error</td><td>#FDE8EC</td><td>#DC143C</td><td>#DC143C</td></tr>
          <tr><td>info</td><td>#E8F3FE</td><td>#2396FB</td><td>#2396FB</td></tr>
          <tr><td>warning</td><td>#FEF6E0</td><td>#CF9F02</td><td>#CF9F02</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all alert variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-alert--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Rounded rectangle wrapper with left border accent</td></tr>
          <tr><td>2</td><td>Left Border</td><td>4px colored accent indicating the alert variant</td></tr>
          <tr><td>3</td><td>Leading Icon</td><td>Contextual icon matching the alert type</td></tr>
          <tr><td>4</td><td>Title</td><td>Bold heading text summarizing the alert</td></tr>
          <tr><td>5</td><td>Description</td><td>Supporting text with additional details</td></tr>
          <tr><td>6</td><td>Close Button</td><td>Optional dismiss action (X icon)</td></tr>
          <tr><td>7</td><td>Actions</td><td>Optional CTA buttons for contextual actions</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To confirm a successful action (e.g., form submission, save)</li>
        <li>To display error messages requiring user attention</li>
        <li>To warn users about potential issues or consequences</li>
        <li>To provide informational context or tips</li>
        <li>To prompt users with actionable next steps</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="alert"
        doItems={[
          'Use semantic variants — green for success, red for error, yellow for warning',
          'Keep titles short and actionable (3–5 words)',
          'Provide a clear description with context or next steps',
          'Include a close button for non-critical alerts',
          'Use action buttons when the user needs to take immediate action',
        ]}
        dontItems={[
          'Don\'t stack more than 2–3 alerts at once',
          'Don\'t use alerts for permanent content — use banners instead',
          'Don\'t rely on color alone to convey the alert type',
          'Don\'t use alerts for inline form validation — use field-level errors',
          'Don\'t auto-dismiss error alerts — let users close them manually',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>alert</td><td>Identifies the element as an alert region</td></tr>
          <tr><td>aria-live</td><td>assertive</td><td>Announces the alert to screen readers immediately</td></tr>
          <tr><td>Close button</td><td>aria-label=&quot;Close alert&quot;</td><td>Accessible label for the dismiss action</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Text against background meets WCAG AA</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter / Space</td><td>Focus and activate close button and CTAs</td></tr>
          <tr><td>Focus order</td><td>Content → Actions → Close</td><td>Logical tab order within the alert</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Titles should be concise and describe the situation (e.g., &quot;Update Available&quot;)</li>
        <li>Descriptions should explain what happened and what to do next</li>
        <li>Action button labels should be specific (e.g., &quot;Retry&quot; not &quot;OK&quot;)</li>
        <li>Use sentence case for titles and descriptions</li>
      </ul>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Snackbar</strong> — Temporary, auto-dismissing notifications</li>
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
        <li>Added <code>actions</code> prop for CTA buttons</li>
        <li>Added <code>size</code> prop with Small and Large options</li>
        <li>New color variants: Black, White, Coal</li>
        <li>Dark mode support with dedicated color palette</li>
        <li>Improved close button with hover and press states</li>
        <li>Added <code>aria-live=&quot;assertive&quot;</code> for screen reader announcements</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with Success, Error, Info, Warning variants</li>
        <li>Leading icon and close button support</li>
        <li>Left border accent styling</li>
        <li>Basic accessibility with role=&quot;alert&quot;</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function AlertPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Alert"
      description="Alerts are notification banners used to communicate feedback messages like success, error, warning, and informational notices."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
