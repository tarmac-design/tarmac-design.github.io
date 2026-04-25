'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="toggle" />
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
      <pre><code>{`import { Toggle } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  variant?: 'black' | 'blue' | 'green' | 'dlv-red';
  size?: 'sm' | 'md' | 'lg';
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default toggle
<Toggle label="Enable feature" />

// Controlled toggle
<Toggle
  label="Notifications"
  checked={isEnabled}
  onChange={setIsEnabled}
/>

// With variant color
<Toggle
  label="Dark mode"
  variant="blue"
  checked={darkMode}
  onChange={setDarkMode}
/>

// Disabled states
<Toggle label="Unavailable" disabled />
<Toggle label="Locked on" checked disabled />

// Size variants
<Toggle label="Small" size="sm" />
<Toggle label="Medium" size="md" />
<Toggle label="Large" size="lg" />

// All color variants
<Toggle label="Black" variant="black" />
<Toggle label="Blue" variant="blue" />
<Toggle label="Green" variant="green" />
<Toggle label="DLV Red" variant="dlv-red" />`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Track Sizing</h3>
      <table>
        <thead><tr><th>Size</th><th>Track Width</th><th>Track Height</th><th>Thumb Size</th><th>Border Radius</th></tr></thead>
        <tbody>
          <tr><td>sm</td><td>32px</td><td>18px</td><td>14px</td><td>9px</td></tr>
          <tr><td>md</td><td>40px</td><td>22px</td><td>18px</td><td>11px</td></tr>
          <tr><td>lg</td><td>52px</td><td>28px</td><td>24px</td><td>14px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>On Color</th><th>Off Color</th><th>Thumb</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>#D4D4D4</td><td>#FFFFFF</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>#D4D4D4</td><td>#FFFFFF</td></tr>
          <tr><td>green</td><td>#1BA86E</td><td>#D4D4D4</td><td>#FFFFFF</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>#D4D4D4</td><td>#FFFFFF</td></tr>
        </tbody>
      </table>

      <h3>State Tokens</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>toggle-off-track</td><td>#D4D4D4</td><td>Track color when off (light)</td></tr>
          <tr><td>toggle-off-track-dark</td><td>#555</td><td>Track color when off (dark)</td></tr>
          <tr><td>toggle-hover-off</td><td>#BFBFBF</td><td>Track hover color when off</td></tr>
          <tr><td>toggle-disabled-opacity</td><td>0.4</td><td>Opacity when disabled</td></tr>
          <tr><td>toggle-focus-ring</td><td>3px accent</td><td>Focus ring around track</td></tr>
          <tr><td>toggle-thumb-shadow</td><td>0 1px 3px rgba(0,0,0,0.2)</td><td>Thumb drop shadow</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all toggle variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-toggle--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Wrapper holding the toggle control and optional label</td></tr>
          <tr><td>2</td><td>Track</td><td>Pill-shaped background that changes color based on state</td></tr>
          <tr><td>3</td><td>Thumb</td><td>Circular knob that slides between off (left) and on (right)</td></tr>
          <tr><td>4</td><td>Label</td><td>Optional text describing what the toggle controls</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>For instant on/off binary settings (e.g., enable notifications)</li>
        <li>When the effect of the change is immediate and doesn&apos;t require a save action</li>
        <li>For feature flags and preference toggles in settings panels</li>
        <li>When you need a compact binary control with clear visual feedback</li>
      </ul>

      <h2>When Not to Use</h2>
      <ul>
        <li>For selecting from multiple options — use Checkbox or Radio instead</li>
        <li>When the change requires a form submission — use Checkbox instead</li>
        <li>For actions that aren&apos;t binary — use Dropdown or Radio Group</li>
        <li>When the toggle label isn&apos;t clear about what on/off means</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="toggle"
        doItems={[
          'Use for settings that take effect immediately',
          'Always provide a clear label describing the setting',
          'Place the label to the right of the toggle for LTR layouts',
          'Use the default (medium) size for most contexts',
          'Ensure the toggle is reachable via keyboard (Tab + Space)',
        ]}
        dontItems={[
          'Don\'t use for form fields that require a submit action',
          'Don\'t use without a label — the on/off state alone is ambiguous',
          'Don\'t use for multi-select scenarios — use checkboxes instead',
          'Don\'t change the meaning of on/off after the user interacts',
          'Don\'t use toggles in dense data tables — use checkboxes instead',
        ]}
      />

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should describe the setting in positive terms (e.g., &quot;Enable dark mode&quot;)</li>
        <li>Use sentence case for labels</li>
        <li>Keep labels concise — one line maximum</li>
        <li>Avoid negations in labels (e.g., use &quot;Show tips&quot; not &quot;Don&apos;t hide tips&quot;)</li>
        <li>The &quot;on&quot; state should always represent the active/enabled condition</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>switch</td><td>Indicates a toggle switch control</td></tr>
          <tr><td>aria-checked</td><td>true | false</td><td>Reflects the current on/off state</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Accessible name when no visible label is present</td></tr>
          <tr><td>Keyboard: Space</td><td>—</td><td>Toggles the switch on/off</td></tr>
          <tr><td>Keyboard: Tab</td><td>—</td><td>Moves focus to the next focusable element</td></tr>
          <tr><td>Focus ring</td><td>3px accent color</td><td>Visible focus indicator around the track</td></tr>
          <tr><td>Disabled</td><td>opacity 0.4</td><td>Visually muted and non-interactive</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Checkbox</strong> — For multi-select options or form fields requiring submission</li>
        <li><strong>Radio</strong> — For mutually exclusive single-select options</li>
        <li><strong>Button</strong> — For triggering actions rather than toggling state</li>
        <li><strong>Dropdown</strong> — For selecting from more than two options</li>
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
        <li>Added color variants: Black, Blue, Green, DLV Red</li>
        <li>Added <code>size</code> prop with sm, md, lg options</li>
        <li>Added <code>variant</code> prop for color customization</li>
        <li>Added smooth sliding animation for thumb transition</li>
        <li>Added hover state with subtle track color shift</li>
        <li>Added focus ring with accent color tinting</li>
        <li>Updated track dimensions to 40×22px (md) with pill shape</li>
        <li>Enhanced accessibility with role=&quot;switch&quot; and aria-checked</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with on/off toggle functionality</li>
        <li>Label and disabled support</li>
        <li>Basic keyboard navigation (Space to toggle)</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function TogglePage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Toggle"
      description="Toggles (switches) are binary on/off controls that let users enable or disable a setting instantly."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
