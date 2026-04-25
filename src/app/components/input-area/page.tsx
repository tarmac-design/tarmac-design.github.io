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
      <StorybookVariantViewer slug="input-area" />
    </>
  );
}

/* ─── TAB 2 — Code ─── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { InputArea } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface InputAreaProps {
  variant?: 'default' | 'counter' | 'autoresize' | 'toolbar';
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
  autoResize?: boolean;
  toolbar?: boolean;
  rows?: number;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default
<InputArea label="Description" placeholder="Enter text..." />

// With character counter
<InputArea variant="counter" maxLength={500} />

// Auto-resize
<InputArea variant="autoresize" autoResize />

// With rich text toolbar
<InputArea variant="toolbar" toolbar />

// Error state
<InputArea label="Bio" errorText="This field is required" />

// Disabled
<InputArea label="Notes" disabled />`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>input-area-height-sm</td><td>80px</td></tr>
          <tr><td>input-area-height-md</td><td>120px</td></tr>
          <tr><td>input-area-height-lg</td><td>200px</td></tr>
          <tr><td>input-area-border-radius</td><td>8px</td></tr>
          <tr><td>input-area-padding</td><td>10px 12px</td></tr>
          <tr><td>input-area-font-size</td><td>13px</td></tr>
          <tr><td>input-area-border-width</td><td>1.5px</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all input area variants in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-inputarea--playground" target="_blank" rel="noopener noreferrer">
          TARMAC Storybook →
        </a>
      </p>
    </>
  );
}

/* ─── TAB 3 — Usage ─── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Label</td><td>Text label above the input area</td></tr>
          <tr><td>2</td><td>Toolbar</td><td>Optional rich text formatting bar</td></tr>
          <tr><td>3</td><td>Text Area</td><td>Multi-line editable text field</td></tr>
          <tr><td>4</td><td>Resize Handle</td><td>Draggable corner for manual resizing</td></tr>
          <tr><td>5</td><td>Helper Text</td><td>Guidance or error message below the field</td></tr>
          <tr><td>6</td><td>Character Count</td><td>Current / max character indicator</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>For multi-line text input like descriptions, comments, or notes</li>
        <li>When the expected input is longer than a single line</li>
        <li>For rich text editing with formatting controls</li>
        <li>When character limits need to be communicated</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="input-area"
        doItems={[
          'Show a character counter when there is a max length',
          'Use auto-resize for conversational inputs like chat',
          'Provide clear error messages below the field',
          'Set an appropriate default height for the expected content',
          'Use the toolbar variant only when rich text is needed',
        ]}
        dontItems={[
          'Don\'t use input area for single-line inputs — use Input instead',
          'Don\'t set the height too small for the expected content',
          'Don\'t disable resize when users may need to expand the field',
          'Don\'t show the toolbar for plain text fields',
          'Don\'t rely solely on color to indicate error state',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>label</td><td>htmlFor</td><td>Associates label with the textarea</td></tr>
          <tr><td>aria-describedby</td><td>helper-id</td><td>Links helper/error text to the field</td></tr>
          <tr><td>aria-invalid</td><td>boolean</td><td>Indicates error state</td></tr>
          <tr><td>aria-disabled</td><td>boolean</td><td>Indicates disabled state</td></tr>
          <tr><td>Keyboard</td><td>Tab, Shift+Tab</td><td>Focus navigation in and out</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Text and border meet WCAG AA</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Input</strong> — Single-line text input</li>
        <li><strong>Search</strong> — Specialized search input</li>
        <li><strong>File Upload</strong> — For file-based input</li>
      </ul>
    </>
  );
}

/* ─── TAB 4 — Changelog ─── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added auto-resize variant</li>
        <li>Added rich text toolbar variant with bold, italic, list</li>
        <li>Added character counter with overflow warning</li>
        <li>Added three size presets: SM, MD, LG</li>
        <li>Improved focus ring and error state styling</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with basic multi-line text input</li>
        <li>Label, placeholder, and helper text support</li>
        <li>Disabled and error states</li>
      </ul>
    </>
  );
}

/* ─── Page Export ─── */
export default function InputAreaPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Input Area"
      description="Multi-line text input with character counting, auto-resize, and rich text toolbar support."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
