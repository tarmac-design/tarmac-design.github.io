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
      <StorybookVariantViewer slug="dialog-box" />
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
      <pre><code>{`import { Dialog } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface DialogProps {
  open: boolean;
  onClose: () => void;
  variant?: 'confirmation' | 'alert' | 'form' | 'fullscreen';
  size?: 'sm' | 'md' | 'lg';
  title: string;
  description?: string;
  icon?: ReactNode;
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  primaryAction?: { label: string; onClick: () => void; destructive?: boolean };
  secondaryAction?: { label: string; onClick: () => void };
  children?: ReactNode;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Confirmation dialog
<Dialog
  open={showConfirm}
  variant="confirmation"
  title="Delete Item?"
  description="This action cannot be undone."
  primaryAction={{ label: 'Delete', onClick: handleDelete, destructive: true }}
  secondaryAction={{ label: 'Cancel', onClick: () => setShowConfirm(false) }}
  onClose={() => setShowConfirm(false)}
/>

// Alert dialog
<Dialog
  open={showAlert}
  variant="alert"
  title="Session Expired"
  description="Please log in again."
  icon={<WarningIcon />}
  primaryAction={{ label: 'Log In', onClick: handleLogin }}
  onClose={() => setShowAlert(false)}
/>

// Form dialog
<Dialog open={showForm} variant="form" title="Create Item" size="md" onClose={() => setShowForm(false)}>
  <Input label="Name" />
  <Input label="Description" />
</Dialog>

// Full screen dialog
<Dialog open={showFull} variant="fullscreen" title="Edit Details" onClose={() => setShowFull(false)}>
  <FormContent />
</Dialog>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>dialog-width-sm</td><td>400px</td></tr>
          <tr><td>dialog-width-md</td><td>560px</td></tr>
          <tr><td>dialog-width-lg</td><td>720px</td></tr>
          <tr><td>dialog-border-radius</td><td>14px</td></tr>
          <tr><td>dialog-overlay-light</td><td>rgba(0,0,0,0.4)</td></tr>
          <tr><td>dialog-overlay-dark</td><td>rgba(0,0,0,0.7)</td></tr>
          <tr><td>dialog-shadow</td><td>0 8px 32px rgba(0,0,0,0.2)</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all dialog variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-dialog--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Overlay</td><td>Semi-transparent backdrop behind the dialog</td></tr>
          <tr><td>2</td><td>Container</td><td>Centered card with rounded corners and shadow</td></tr>
          <tr><td>3</td><td>Icon</td><td>Optional status icon (alert variant)</td></tr>
          <tr><td>4</td><td>Title</td><td>Bold heading describing the dialog purpose</td></tr>
          <tr><td>5</td><td>Description</td><td>Supporting text explaining the context</td></tr>
          <tr><td>6</td><td>Content Area</td><td>Form fields or custom content (form/fullscreen)</td></tr>
          <tr><td>7</td><td>Primary Action</td><td>Main action button (confirm, submit, etc.)</td></tr>
          <tr><td>8</td><td>Secondary Action</td><td>Cancel or dismiss button</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>For destructive actions that need explicit confirmation</li>
        <li>For important alerts that require acknowledgment</li>
        <li>For short forms that don&apos;t warrant a full page</li>
        <li>For full-screen editing on mobile devices</li>
        <li>When user attention must be focused on a single task</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="dialog-box"
        doItems={[
          'Use clear, action-oriented button labels (e.g., "Delete" not "OK")',
          'Keep dialog content concise and focused on one task',
          'Use destructive styling for dangerous actions',
          'Allow dismissal via overlay click and Escape key',
          'Trap focus within the dialog while open',
        ]}
        dontItems={[
          'Don\'t stack multiple dialogs on top of each other',
          'Don\'t use dialogs for non-critical information — use snackbars',
          'Don\'t put long scrollable content in small dialogs',
          'Don\'t remove the cancel/dismiss option for non-alert dialogs',
          'Don\'t auto-close dialogs with timers',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>dialog / alertdialog</td><td>Identifies the component as a dialog</td></tr>
          <tr><td>aria-modal</td><td>true</td><td>Indicates content behind is inert</td></tr>
          <tr><td>aria-labelledby</td><td>title id</td><td>Links dialog to its title</td></tr>
          <tr><td>aria-describedby</td><td>description id</td><td>Links dialog to its description</td></tr>
          <tr><td>Focus trap</td><td>—</td><td>Tab cycles within dialog elements</td></tr>
          <tr><td>Escape key</td><td>—</td><td>Closes the dialog</td></tr>
          <tr><td>Auto-focus</td><td>—</td><td>Focus moves to first interactive element</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Bottom Sheet</strong> — Mobile-first alternative to centered dialogs</li>
        <li><strong>Side Drawer</strong> — Slide-in panel for complex content</li>
        <li><strong>Snackbar</strong> — Non-blocking notifications for less critical info</li>
        <li><strong>Alert</strong> — Inline alert banners for page-level messages</li>
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
        <li>Added <code>form</code> variant with children content support</li>
        <li>Added <code>fullscreen</code> variant for mobile editing flows</li>
        <li>Added <code>alert</code> variant with icon support</li>
        <li>Added <code>size</code> prop with SM, MD, LG options</li>
        <li>Added <code>destructive</code> option for primary action</li>
        <li>Improved focus trap and keyboard navigation</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with confirmation dialog</li>
        <li>Overlay backdrop with click-to-dismiss</li>
        <li>Primary and secondary action buttons</li>
        <li>Light and dark theme support</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function DialogBoxPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Dialog Box"
      description="Dialog boxes are modal overlays that require user attention for confirmations, alerts, forms, and focused editing tasks."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
