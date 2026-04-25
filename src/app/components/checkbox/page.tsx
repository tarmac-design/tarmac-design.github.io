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
      <StorybookVariantViewer slug="checkbox" />
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
      <pre><code>{`import { Checkbox, CheckboxGroup } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  variant?: 'standard' | 'blue' | 'green' | 'dlv-red';
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Standard checkbox
<Checkbox label="Accept terms" />

// Controlled checkbox
<Checkbox
  label="Subscribe to newsletter"
  checked={isChecked}
  onChange={setIsChecked}
/>

// With description
<Checkbox
  label="Email notifications"
  description="Receive updates about your account"
  variant="blue"
/>

// Indeterminate state
<Checkbox
  label="Select all"
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={handleSelectAll}
/>

// Disabled
<Checkbox label="Unavailable option" disabled />

// Error state
<Checkbox label="Required field" error="This field is required" />

// Color variants
<Checkbox label="Standard" variant="standard" />
<Checkbox label="Blue" variant="blue" />
<Checkbox label="Green" variant="green" />
<Checkbox label="DLV Red" variant="dlv-red" />`}</code></pre>

      <h2>Checkbox Group</h2>
      <pre><code>{`<CheckboxGroup label="Select toppings">
  <Checkbox label="Cheese" value="cheese" />
  <Checkbox label="Pepperoni" value="pepperoni" />
  <Checkbox label="Mushrooms" value="mushrooms" />
</CheckboxGroup>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>checkbox-size</td><td>20px</td></tr>
          <tr><td>checkbox-border-radius</td><td>4px</td></tr>
          <tr><td>checkbox-focus-ring</td><td>3px offset</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Accent Color</th><th>Checkmark</th></tr></thead>
        <tbody>
          <tr><td>standard</td><td>#0D0D0D</td><td>#FFFFFF</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>#FFFFFF</td></tr>
          <tr><td>green</td><td>#1BA86E</td><td>#FFFFFF</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>#FFFFFF</td></tr>
        </tbody>
      </table>

      <h3>State Tokens</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>checkbox-border-color</td><td>#B0B0B0</td><td>Default unchecked border</td></tr>
          <tr><td>checkbox-border-hover</td><td>#666</td><td>Border on hover</td></tr>
          <tr><td>checkbox-disabled-opacity</td><td>0.4</td><td>Opacity when disabled</td></tr>
          <tr><td>checkbox-error-border</td><td>#ED1B36</td><td>Border color in error state</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all checkbox variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-checkbox--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Wrapper holding the checkbox control and label area</td></tr>
          <tr><td>2</td><td>Control</td><td>The 20×20px square box that shows checked state</td></tr>
          <tr><td>3</td><td>Checkmark / Dash</td><td>SVG icon indicating checked or indeterminate state</td></tr>
          <tr><td>4</td><td>Label</td><td>Primary text describing the option</td></tr>
          <tr><td>5</td><td>Description</td><td>Optional helper text below the label</td></tr>
          <tr><td>6</td><td>Error Message</td><td>Validation error text shown below the control</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>When users can select multiple options from a list</li>
        <li>For binary choices with a visible label (e.g., &quot;Accept terms&quot;)</li>
        <li>For &quot;select all&quot; patterns with indeterminate state</li>
        <li>In forms where multiple selections are valid</li>
        <li>In settings panels for toggling feature flags</li>
      </ul>

      <h2>When Not to Use</h2>
      <ul>
        <li>For mutually exclusive options — use Radio instead</li>
        <li>For instant on/off toggles — use Switch/Toggle instead</li>
        <li>For single-select dropdowns — use Select instead</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="checkbox"
        doItems={[
          'Use when users can select multiple options from a set',
          'Always provide a visible label for accessibility',
          'Use indeterminate state for "select all" parent checkboxes',
          'Group related checkboxes inside a fieldset with a legend',
          'Ensure touch targets are at least 44×44px on mobile',
        ]}
        dontItems={[
          'Don\'t use for binary on/off — use a toggle instead',
          'Don\'t use without labels — screen readers need them',
          'Don\'t pre-check options that benefit the business, not the user',
          'Don\'t nest checkbox groups more than 2 levels deep',
          'Don\'t use checkboxes for mutually exclusive choices',
        ]}
      />

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should be concise and clearly describe the option</li>
        <li>Use sentence case for labels</li>
        <li>Phrase labels positively (e.g., &quot;Show notifications&quot; not &quot;Don&apos;t hide notifications&quot;)</li>
        <li>Description text should add context, not repeat the label</li>
        <li>Error messages should explain how to fix the issue</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>checkbox</td><td>Native input type=&quot;checkbox&quot; provides this implicitly</td></tr>
          <tr><td>aria-checked</td><td>true | false | mixed</td><td>Reflects current state including indeterminate</td></tr>
          <tr><td>aria-labelledby</td><td>ID reference</td><td>Associates visible label with the control</td></tr>
          <tr><td>aria-describedby</td><td>ID reference</td><td>Links to description or error text</td></tr>
          <tr><td>aria-invalid</td><td>true | false</td><td>Indicates validation error state</td></tr>
          <tr><td>Keyboard: Space</td><td>—</td><td>Toggles the checked state</td></tr>
          <tr><td>Keyboard: Tab</td><td>—</td><td>Moves focus to the next focusable element</td></tr>
          <tr><td>Focus ring</td><td>3px accent color</td><td>Visible focus indicator around the control</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Radio</strong> — For mutually exclusive single-select options</li>
        <li><strong>Toggle / Switch</strong> — For instant on/off binary controls</li>
        <li><strong>Pills</strong> — For selectable filter chips</li>
        <li><strong>Dropdown</strong> — For single-select from a long list</li>
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
        <li>Added color variants: Standard, Blue, Green, DLV Red</li>
        <li>Added <code>indeterminate</code> prop with visual dash icon</li>
        <li>Added <code>description</code> prop for helper text</li>
        <li>Added <code>error</code> prop with validation message</li>
        <li>Added <code>variant</code> prop for color customization</li>
        <li>Added <code>CheckboxGroup</code> component for grouped checkboxes</li>
        <li>Improved focus ring with accent color tinting</li>
        <li>Updated control size to 20×20px with 4px border-radius</li>
        <li>Enhanced accessibility with aria-checked=&quot;mixed&quot; support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with checked and unchecked states</li>
        <li>Label and disabled support</li>
        <li>Basic keyboard navigation (Space to toggle)</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function CheckboxPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Checkbox"
      description="Checkboxes allow users to select one or more items from a set of options."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
