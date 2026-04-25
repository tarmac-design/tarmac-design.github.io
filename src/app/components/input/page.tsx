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
      <StorybookVariantViewer slug="input" />
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
      <pre><code>{`import { Input } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  variant?: 'regular' | 'success' | 'info' | 'error';
  size?: 'sm' | 'md' | 'lg';
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}`}</code></pre>

      <h2>Props Reference</h2>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>value</td><td>string</td><td>—</td><td>Controlled input value</td></tr>
          <tr><td>onChange</td><td>(value: string) =&gt; void</td><td>—</td><td>Change handler receiving the new value</td></tr>
          <tr><td>label</td><td>string</td><td>—</td><td>Label text displayed above the input</td></tr>
          <tr><td>placeholder</td><td>string</td><td>—</td><td>Placeholder text shown when empty</td></tr>
          <tr><td>helperText</td><td>string</td><td>—</td><td>Helper text displayed below the input</td></tr>
          <tr><td>error</td><td>string</td><td>—</td><td>Error message — overrides helperText and sets error variant</td></tr>
          <tr><td>disabled</td><td>boolean</td><td>false</td><td>Disables the input</td></tr>
          <tr><td>variant</td><td>&apos;regular&apos; | &apos;success&apos; | &apos;info&apos; | &apos;error&apos;</td><td>&apos;regular&apos;</td><td>Visual variant controlling border color</td></tr>
          <tr><td>size</td><td>&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</td><td>&apos;md&apos;</td><td>Input height — SM (28px), MD (36px), LG (44px)</td></tr>
          <tr><td>addonLeft</td><td>ReactNode</td><td>—</td><td>Leading addon (icon, text, etc.)</td></tr>
          <tr><td>addonRight</td><td>ReactNode</td><td>—</td><td>Trailing addon (icon, text, etc.)</td></tr>
        </tbody>
      </table>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default input
<Input label="Name" placeholder="Enter your name" />

// With helper text
<Input
  label="Email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>

// Error state
<Input
  label="Username"
  value={username}
  onChange={setUsername}
  error="Username is already taken"
/>

// Success variant
<Input
  label="Email"
  variant="success"
  value="valid@email.com"
  helperText="Email is available"
/>

// With addons
<Input
  label="Search"
  placeholder="Search..."
  addonLeft={<SearchIcon />}
/>

<Input
  label="Amount"
  placeholder="0.00"
  addonLeft={<span>$</span>}
  addonRight={<span>USD</span>}
/>

// Size variants
<Input size="sm" label="Small" placeholder="28px height" />
<Input size="md" label="Medium" placeholder="36px height" />
<Input size="lg" label="Large" placeholder="44px height" />

// Disabled
<Input label="Disabled" placeholder="Can't edit" disabled />`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>input-height-sm</td><td>28px</td></tr>
          <tr><td>input-height-md</td><td>36px</td></tr>
          <tr><td>input-height-lg</td><td>44px</td></tr>
          <tr><td>input-border-radius</td><td>6px</td></tr>
          <tr><td>input-padding-sm</td><td>8px</td></tr>
          <tr><td>input-padding-md</td><td>12px</td></tr>
          <tr><td>input-padding-lg</td><td>14px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Border</th><th>Focus Ring</th></tr></thead>
        <tbody>
          <tr><td>Regular</td><td>#CCCCCC</td><td>#2396FB</td></tr>
          <tr><td>Success</td><td>#1BA86E</td><td>#1BA86E</td></tr>
          <tr><td>Info</td><td>#2396FB</td><td>#2396FB</td></tr>
          <tr><td>Error</td><td>#ED1B36</td><td>#ED1B36</td></tr>
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
          <tr><td>1</td><td>Label</td><td>Text above the input describing its purpose</td></tr>
          <tr><td>2</td><td>Container</td><td>Outer wrapper with border, background, and focus ring</td></tr>
          <tr><td>3</td><td>Leading Addon</td><td>Optional icon or text before the input area</td></tr>
          <tr><td>4</td><td>Input Field</td><td>The editable text area where users type</td></tr>
          <tr><td>5</td><td>Trailing Addon</td><td>Optional icon or text after the input area</td></tr>
          <tr><td>6</td><td>Helper Text</td><td>Guidance text below the input</td></tr>
          <tr><td>7</td><td>Error Message</td><td>Validation error text replacing helper text</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>For single-line text entry — names, emails, search queries</li>
        <li>When you need inline validation feedback</li>
        <li>For form fields that require labels and helper text</li>
        <li>When leading/trailing context (icons, currency symbols) aids comprehension</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="input"
        doItems={[
          'Always pair inputs with a visible label',
          'Use placeholder text as a hint, not a replacement for labels',
          'Show validation errors inline below the input',
          'Use appropriate variant colors to reinforce state (green for success, red for error)',
          'Provide clear error messages that explain how to fix the issue',
        ]}
        dontItems={[
          'Don\'t use placeholder text as the only label',
          'Don\'t show errors only on form submission — validate inline',
          'Don\'t disable paste on password fields',
          'Don\'t rely on color alone to convey meaning — include text',
          'Don\'t use the info variant for error states',
        ]}
      />

      <h2>Variant Guide</h2>
      <table>
        <thead><tr><th>Variant</th><th>Use Case</th><th>Border Color</th></tr></thead>
        <tbody>
          <tr><td>Regular</td><td>Default form fields</td><td>#CCCCCC</td></tr>
          <tr><td>Success</td><td>Validated / confirmed fields</td><td>#1BA86E</td></tr>
          <tr><td>Info</td><td>Informational highlight</td><td>#2396FB</td></tr>
          <tr><td>Error</td><td>Validation failure</td><td>#ED1B36</td></tr>
        </tbody>
      </table>

      <h2>Size Guide</h2>
      <table>
        <thead><tr><th>Size</th><th>Height</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>SM</td><td>28px</td><td>Dense layouts, tables, inline editing</td></tr>
          <tr><td>MD</td><td>36px</td><td>Default forms, standard layouts</td></tr>
          <tr><td>LG</td><td>44px</td><td>Touch targets, prominent forms, mobile</td></tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>textbox</td><td>Native input element</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Accessible name when no visible label</td></tr>
          <tr><td>aria-labelledby</td><td>ID</td><td>Links to the visible label element</td></tr>
          <tr><td>aria-describedby</td><td>ID</td><td>Links to helper or error text</td></tr>
          <tr><td>aria-invalid</td><td>true | false</td><td>Indicates validation error</td></tr>
          <tr><td>Focus ring</td><td>3px box-shadow</td><td>Visible focus indicator for keyboard users</td></tr>
          <tr><td>Keyboard</td><td>Tab</td><td>Moves focus to/from the input</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Input Area</strong> — Multi-line text input (textarea)</li>
        <li><strong>Search</strong> — Specialized input with search behavior</li>
        <li><strong>OTP Fields</strong> — Segmented input for verification codes</li>
        <li><strong>Dropdown</strong> — Selection input with predefined options</li>
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
        <li>Added <code>success</code>, <code>info</code>, and <code>error</code> border color variants</li>
        <li>Added <code>ghost</code> / skeleton loading state</li>
        <li>Added <code>addonLeft</code> and <code>addonRight</code> props for leading/trailing addons</li>
        <li>New size tokens: SM (28px), MD (36px), LG (44px)</li>
        <li>Updated border-radius to 6px</li>
        <li>Added 3px focus ring with variant-aware color</li>
        <li>Improved accessibility with aria-describedby, aria-invalid, and role=&quot;alert&quot; on errors</li>
        <li>Helper text now hidden when error message is present</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with default, disabled, and error states</li>
        <li>Single size (40px height)</li>
        <li>Label and placeholder support</li>
        <li>Basic helper text and error message</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function InputPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Input"
      description="Text inputs allow users to enter and edit single-line text with labels, validation, and addons."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
