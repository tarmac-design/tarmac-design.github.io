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
      <StorybookVariantViewer slug="popups" />
    </>
  );
}

/* ── TAB 2 — Code ── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>
      <h2>Import</h2>
      <pre><code>{`import { Popup, Tooltip, Popover, Menu, ConfirmPopup } from '@tarmac/design-system';`}</code></pre>
      <h2>Component API</h2>
      <pre><code>{`interface PopupProps {
  variant?: 'tooltip' | 'popover' | 'menu' | 'confirmation';
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  arrow?: boolean;
  offset?: number;
  children: ReactNode;
}

interface MenuProps extends PopupProps {
  items: { label: string; onClick: () => void; destructive?: boolean }[];
}

interface ConfirmPopupProps extends PopupProps {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}`}</code></pre>
      <h2>Basic Usage</h2>
      <pre><code>{`// Tooltip
<Tooltip content="Helpful hint" position="top">
  <Button>Hover me</Button>
</Tooltip>

// Popover
<Popover title="Details" position="bottom">
  <p>Additional context here.</p>
</Popover>

// Menu
<Menu items={[
  { label: 'Edit', onClick: handleEdit },
  { label: 'Delete', onClick: handleDelete, destructive: true },
]} />

// Confirmation
<ConfirmPopup
  title="Delete item?"
  description="This cannot be undone."
  onConfirm={handleDelete}
  onCancel={handleCancel}
/>`}</code></pre>
      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>popup-border-radius</td><td>8px</td></tr>
          <tr><td>popup-shadow</td><td>0 4px 16px rgba(0,0,0,0.12)</td></tr>
          <tr><td>popup-arrow-size</td><td>6px</td></tr>
          <tr><td>popup-offset</td><td>8px</td></tr>
          <tr><td>popup-z-index</td><td>1000</td></tr>
          <tr><td>popup-min-width</td><td>180px</td></tr>
        </tbody>
      </table>
      <h2>Storybook</h2>
      <p>
        Explore all popup variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-popup--playground" target="_blank" rel="noopener noreferrer">TARMAC Storybook →</a>
      </p>
    </>
  );
}

/* ── TAB 3 — Usage ── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Trigger</td><td>The element that activates the popup (button, icon, text)</td></tr>
          <tr><td>2</td><td>Overlay</td><td>The floating container with content</td></tr>
          <tr><td>3</td><td>Arrow</td><td>Directional indicator pointing to the trigger</td></tr>
          <tr><td>4</td><td>Content</td><td>Text, actions, or rich content inside the overlay</td></tr>
          <tr><td>5</td><td>Backdrop</td><td>Optional click-away area to dismiss (popovers, menus)</td></tr>
        </tbody>
      </table>
      <h2>When to Use</h2>
      <ul>
        <li>Tooltips for icon-only buttons or truncated text</li>
        <li>Popovers for supplementary details without leaving context</li>
        <li>Menus for contextual actions on list items or cards</li>
        <li>Confirmation popups for destructive actions</li>
      </ul>
      <h2>Best Practices</h2>
      <DoDont
        slug="popups"
        doItems={[
          'Use tooltips for short, non-essential helper text',
          'Position popups to avoid viewport overflow',
          'Dismiss menus when an action is selected',
          'Use confirmation popups for irreversible actions',
          'Keep popup content concise and scannable',
        ]}
        dontItems={[
          'Don\'t nest popups inside other popups',
          'Don\'t use tooltips for essential information',
          'Don\'t put complex forms inside popovers',
          'Don\'t use menus with more than 7–8 items',
          'Don\'t block the trigger element with the popup',
        ]}
      />
      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>tooltip / dialog / menu</td><td>Semantic role based on variant</td></tr>
          <tr><td>aria-haspopup</td><td>true</td><td>Indicates trigger opens a popup</td></tr>
          <tr><td>aria-expanded</td><td>boolean</td><td>Reflects open/closed state</td></tr>
          <tr><td>Escape</td><td>Dismiss</td><td>Close popup on Escape key</td></tr>
          <tr><td>Focus trap</td><td>Confirmation</td><td>Trap focus within confirmation dialogs</td></tr>
        </tbody>
      </table>
      <h2>Related Components</h2>
      <ul>
        <li><strong>Dialog Box</strong> — Full modal overlay for complex interactions</li>
        <li><strong>Dropdown</strong> — Form select with popup option list</li>
        <li><strong>Bottom Sheet</strong> — Mobile-friendly popup from bottom edge</li>
        <li><strong>Snackbar</strong> — Temporary notification without trigger</li>
      </ul>
    </>
  );
}

/* ── TAB 4 — Changelog ── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added <code>confirmation</code> variant with action buttons</li>
        <li>Added <code>arrow</code> prop with automatic positioning</li>
        <li>Added <code>offset</code> prop for custom spacing</li>
        <li>Improved viewport boundary detection and flip behavior</li>
        <li>Added focus trap for confirmation variant</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with Tooltip, Popover, and Menu variants</li>
        <li>4 position options: top, bottom, left, right</li>
        <li>Click and hover trigger modes</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function PopupsPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Popups" description="Overlay elements that appear near a trigger — tooltips, popovers, menus, and confirmation dialogs." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
