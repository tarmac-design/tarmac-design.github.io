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
      <StorybookVariantViewer slug="button" />
    </>
  );
}

function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { Button } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface ButtonProps {
  variant?: 'black' | 'white' | 'blue' | 'success' | 'error' | 'warning' | 'dlv-red';
  style?: 'primary' | 'secondary' | 'tertiary';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  disabled?: boolean;
  loading?: boolean;
  loadingPosition?: 'left' | 'right';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: ReactNode;
  onClick?: () => void;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`<Button variant="black" style="primary">Save Changes</Button>
<Button variant="black" style="secondary">Cancel</Button>
<Button variant="blue" style="tertiary">Learn More</Button>

// With icon
<Button variant="black" icon={<PlusIcon />} iconPosition="left">Add Item</Button>

// Loading state
<Button variant="blue" loading>Submitting...</Button>

// Full width
<Button variant="black" fullWidth>Sign In</Button>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>button-height-xl</td><td>48px</td><td>Extra large button height</td></tr>
          <tr><td>button-height-lg</td><td>44px</td><td>Large button height</td></tr>
          <tr><td>button-height-md</td><td>36px</td><td>Medium (default) button height</td></tr>
          <tr><td>button-height-sm</td><td>28px</td><td>Small button height</td></tr>
          <tr><td>button-height-xs</td><td>24px</td><td>Extra small button height</td></tr>
          <tr><td>button-border-radius</td><td>6px</td><td>Corner rounding</td></tr>
          <tr><td>button-gap</td><td>4px</td><td>Gap between icon and label</td></tr>
        </tbody>
      </table>
    </>
  );
}

function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Container</td><td>Clickable area — background, border, shape (border-radius: 6px)</td></tr>
          <tr><td>2</td><td>Loading Left</td><td>Optional spinner before label</td></tr>
          <tr><td>3</td><td>Leading Icon</td><td>Optional icon before label</td></tr>
          <tr><td>4</td><td>Label</td><td>Action text — concise, verb-first</td></tr>
          <tr><td>5</td><td>Trailing Icon</td><td>Optional icon after label</td></tr>
          <tr><td>6</td><td>Loading Right</td><td>Optional spinner after label</td></tr>
        </tbody>
      </table>

      <h2>Usage Decision Guide</h2>
      <table>
        <thead><tr><th>Context</th><th>Variant</th><th>Style</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Main page action</td><td>Black</td><td>Primary</td><td>&quot;Save Changes&quot;</td></tr>
          <tr><td>Supporting action</td><td>Black</td><td>Secondary</td><td>&quot;Cancel&quot;</td></tr>
          <tr><td>Subtle action</td><td>Black</td><td>Tertiary</td><td>&quot;Learn More&quot;</td></tr>
          <tr><td>Positive confirmation</td><td>Success</td><td>Primary</td><td>&quot;Approve&quot;</td></tr>
          <tr><td>Destructive action</td><td>Error</td><td>Primary</td><td>&quot;Delete&quot;</td></tr>
          <tr><td>Caution action</td><td>Warning</td><td>Primary</td><td>&quot;Override&quot;</td></tr>
          <tr><td>Default system action</td><td>Blue</td><td>Primary</td><td>&quot;Submit&quot;</td></tr>
          <tr><td>Dark background</td><td>White</td><td>Primary</td><td>&quot;Get Started&quot;</td></tr>
        </tbody>
      </table>

      <h2>Best Practices</h2>
      <DoDont slug="button" doItems={[
        'Use clear, action-oriented labels ("Save", "Delete", "Create")',
        'Maintain one primary button per section',
        'Provide loading states for async operations',
        'Ensure 44px minimum touch target on mobile',
        'Use icons only when they improve clarity',
      ]} dontItems={[
        'Don\'t use vague labels ("Click Here", "Submit", "OK")',
        'Don\'t use multiple primary buttons in the same context',
        'Don\'t write long sentences inside button labels',
        'Don\'t hide critical actions in low-emphasis styles',
        'Don\'t disable without explaining why',
      ]} />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Semantic HTML</td><td>&lt;button&gt;</td><td>Always use native button element</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter / Space</td><td>Focus and activate</td></tr>
          <tr><td>Focus ring</td><td>2px outline</td><td>≥ 3:1 contrast ratio</td></tr>
          <tr><td>Text contrast</td><td>≥ 4.5:1</td><td>Against background (WCAG AA)</td></tr>
          <tr><td>Touch target</td><td>44×44px min</td><td>Mobile accessibility</td></tr>
          <tr><td>Icon-only</td><td>aria-label required</td><td>Screen reader support</td></tr>
          <tr><td>Loading</td><td>aria-busy=&quot;true&quot;</td><td>Announce loading state</td></tr>
        </tbody>
      </table>
    </>
  );
}

function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added DLV Red and Coal variants</li>
        <li>Added Slider Button and Two-Liner types</li>
        <li>Added <code>loadingPosition</code> prop</li>
        <li>Improved focus ring contrast</li>
        <li>Added Ghost/Skeleton loading state</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with 6 color variants</li>
        <li>Primary, Secondary, Tertiary styles</li>
        <li>5 sizes (XS to XL)</li>
        <li>Icon support and loading states</li>
      </ul>
    </>
  );
}

export default function ButtonPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell title="Button" description="Buttons trigger actions and enable user interactions throughout the interface." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
