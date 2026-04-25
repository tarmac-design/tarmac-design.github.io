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
      <StorybookVariantViewer slug="spinner" />
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
      <pre><code>{`import { Spinner } from '@tarmac/design-system';`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`interface SpinnerProps {
  /** Visual color variant */
  variant?: 'dark' | 'light' | 'white' | 'dlv-red';
  /** Size preset */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Additional CSS class name */
  className?: string;
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>variant</code></td><td><code>&apos;dark&apos; | &apos;light&apos; | &apos;white&apos; | &apos;dlv-red&apos;</code></td><td><code>&apos;dark&apos;</code></td><td>Controls the spinner border color. Use <code>dark</code> on light backgrounds, <code>light</code> or <code>white</code> on dark backgrounds, and <code>dlv-red</code> for brand emphasis.</td></tr>
          <tr><td><code>size</code></td><td><code>&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos;</code></td><td><code>&apos;md&apos;</code></td><td>Spinner diameter — sm: 16px, md: 24px, lg: 32px, xl: 48px.</td></tr>
          <tr><td><code>aria-label</code></td><td><code>string</code></td><td><code>&apos;Loading&apos;</code></td><td>Accessible label announced by screen readers.</td></tr>
          <tr><td><code>className</code></td><td><code>string</code></td><td><code>undefined</code></td><td>Additional CSS class for custom styling.</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>
      <pre><code>{`// Basic spinner
<Spinner />

// Dark variant on a light surface
<Spinner variant="dark" size="md" />

// Light variant on a dark surface
<Spinner variant="light" size="lg" />

// DLV Red brand spinner
<Spinner variant="dlv-red" size="xl" />

// Inside a button loading state
<Button disabled={isLoading}>
  {isLoading ? <Spinner variant="white" size="sm" /> : 'Submit'}
</Button>

// Centered in a container
<div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
  <Spinner variant="dark" size="lg" />
</div>

// With custom aria-label
<Spinner variant="dark" size="md" aria-label="Fetching results" />`}</code></pre>

      <h2>CSS Animation</h2>
      <pre><code>{`/* Required keyframes — included automatically by the component */
@keyframes tds-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Spinner element styles */
.tds-spinner {
  border-radius: 50%;
  border: 2.5px solid currentColor;
  border-top-color: transparent;
  animation: tds-spin 0.8s linear infinite;
}`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>spinner-size-sm</td><td>16px</td></tr>
          <tr><td>spinner-size-md</td><td>24px</td></tr>
          <tr><td>spinner-size-lg</td><td>32px</td></tr>
          <tr><td>spinner-size-xl</td><td>48px</td></tr>
          <tr><td>spinner-border-width-sm</td><td>2px</td></tr>
          <tr><td>spinner-border-width-md</td><td>2.5px</td></tr>
          <tr><td>spinner-border-width-lg</td><td>3px</td></tr>
          <tr><td>spinner-border-width-xl</td><td>4px</td></tr>
          <tr><td>spinner-speed</td><td>0.8s</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Border Color</th><th>Background</th></tr></thead>
        <tbody>
          <tr><td>dark</td><td>#0D0D0D</td><td>transparent</td></tr>
          <tr><td>light</td><td>#FFFFFF</td><td>transparent</td></tr>
          <tr><td>white</td><td>#FFFFFF</td><td>transparent</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>transparent</td></tr>
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
          <tr><td>1</td><td>Spinner Ring</td><td>Circular border with one transparent side, creating the visual arc</td></tr>
          <tr><td>2</td><td>Rotation</td><td>CSS animation rotating the ring 360° every 0.8 seconds</td></tr>
          <tr><td>3</td><td>Color</td><td>Border color determined by the variant prop</td></tr>
          <tr><td>4</td><td>Gap</td><td>Transparent top border creates the spinning arc effect</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To indicate an indeterminate loading state where duration is unknown</li>
        <li>Inside buttons to show an action is processing</li>
        <li>As a placeholder while content is being fetched</li>
        <li>For short waits — typically under 10 seconds</li>
      </ul>

      <h2>When Not to Use</h2>
      <ul>
        <li>For determinate progress — use a Progress Bar instead</li>
        <li>For content-area loading — use Shimmer placeholders</li>
        <li>For very long operations — provide a progress indicator with percentage</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="spinner"
        doItems={[
          'Use the correct variant for the background context (dark on light, light on dark)',
          'Add a text label for loading states longer than 2 seconds',
          'Use small spinners for inline or button contexts',
          'Center spinners within the loading area',
          'Provide an aria-label for screen reader users',
        ]}
        dontItems={[
          'Don\'t use spinners for content loading — use shimmer instead',
          'Don\'t show multiple spinners on the same screen simultaneously',
          'Don\'t use spinners without any surrounding context',
          'Don\'t use the light variant on light backgrounds — it will be invisible',
          'Don\'t block the entire page with a spinner unless absolutely necessary',
        ]}
      />

      <h2>Variant Selection Guide</h2>
      <table>
        <thead><tr><th>Variant</th><th>Use On</th><th>Example Context</th></tr></thead>
        <tbody>
          <tr><td>dark</td><td>Light backgrounds</td><td>White cards, light modals, default pages</td></tr>
          <tr><td>light</td><td>Dark backgrounds</td><td>Dark cards, dark modals, overlays</td></tr>
          <tr><td>white</td><td>Colored / dark backgrounds</td><td>Inside colored buttons, dark overlays</td></tr>
          <tr><td>dlv-red</td><td>Light backgrounds</td><td>Brand-specific loading, Delhivery-themed areas</td></tr>
        </tbody>
      </table>

      <h2>Size Selection Guide</h2>
      <table>
        <thead><tr><th>Size</th><th>Pixels</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>sm</td><td>16px</td><td>Inline text, inside buttons, compact UI</td></tr>
          <tr><td>md</td><td>24px</td><td>Default — cards, sections, general loading</td></tr>
          <tr><td>lg</td><td>32px</td><td>Prominent section loading, empty states</td></tr>
          <tr><td>xl</td><td>48px</td><td>Full-page loading, hero areas</td></tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>status</td><td>Identifies the spinner as a live status region</td></tr>
          <tr><td>aria-label</td><td>&quot;Loading&quot;</td><td>Descriptive text for screen readers</td></tr>
          <tr><td>aria-live</td><td>polite</td><td>Announces loading state without interrupting</td></tr>
          <tr><td>prefers-reduced-motion</td><td>Pause or slow animation</td><td>Respects user motion preferences</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Progress Bar</strong> — For determinate loading with known progress</li>
        <li><strong>Shimmer</strong> — Content placeholder for layout-aware loading</li>
        <li><strong>Button</strong> — Spinners can be embedded in buttons during async actions</li>
        <li><strong>Snackbar</strong> — Pair with spinners to announce loading completion</li>
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
        <li>Redesigned with pure CSS border-based animation</li>
        <li>Added 4 color variants: dark, light, white, dlv-red</li>
        <li>Added XLarge (48px) size option</li>
        <li>Updated size tokens: SM (16px), MD (24px), LG (32px), XL (48px)</li>
        <li>Improved accessibility with <code>role=&quot;status&quot;</code> and <code>aria-label</code></li>
        <li>Reduced animation duration to 0.8s for snappier feel</li>
        <li>Added <code>prefers-reduced-motion</code> support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with default, small, and large variants</li>
        <li>SVG-based spinner animation</li>
        <li>Primary and neutral color options</li>
        <li>Overlay variant for full-screen loading</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function SpinnerPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Spinner"
      description="Spinners are animated circular indicators used to communicate an indeterminate loading state."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
