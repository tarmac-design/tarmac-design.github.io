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
      <StorybookVariantViewer slug="links" />
    </>
  );
}

/* ── Code Tab ── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { Link } from '@tarmac/design-system';`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`interface LinkProps {
  /** Target URL for the link */
  href: string;
  /** Color variant of the link */
  variant?: 'blue' | 'black' | 'white';
  /** Link content — text, icons, or mixed */
  children: ReactNode;
  /** Renders an external arrow icon and opens in new tab */
  external?: boolean;
  /** Disables interaction and reduces opacity */
  disabled?: boolean;
  /** Optional icon element */
  icon?: ReactNode;
  /** Position of the icon relative to text */
  iconPosition?: 'left' | 'right';
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>href</code></td><td><code>string</code></td><td>—</td><td>Required. The destination URL for the link.</td></tr>
          <tr><td><code>variant</code></td><td><code>&apos;blue&apos; | &apos;black&apos; | &apos;white&apos;</code></td><td><code>&apos;blue&apos;</code></td><td>Color variant. Blue (#2396FB) for default, Black (#0D0D0D) for subtle, White (#FFF) for dark backgrounds.</td></tr>
          <tr><td><code>children</code></td><td><code>ReactNode</code></td><td>—</td><td>Required. The link content — typically text.</td></tr>
          <tr><td><code>external</code></td><td><code>boolean</code></td><td><code>false</code></td><td>When true, appends an external arrow icon and sets <code>target=&quot;_blank&quot;</code> with <code>rel=&quot;noopener noreferrer&quot;</code>.</td></tr>
          <tr><td><code>disabled</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Disables the link. Reduces opacity to 50% and shows not-allowed cursor.</td></tr>
          <tr><td><code>icon</code></td><td><code>ReactNode</code></td><td><code>undefined</code></td><td>Optional icon element rendered alongside the text.</td></tr>
          <tr><td><code>iconPosition</code></td><td><code>&apos;left&apos; | &apos;right&apos;</code></td><td><code>&apos;left&apos;</code></td><td>Controls whether the icon appears before or after the link text.</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>

      <h4>Basic Link</h4>
      <pre><code>{`<Link href="/about">About Us</Link>`}</code></pre>

      <h4>External Link</h4>
      <pre><code>{`<Link href="https://example.com" external>
  Visit Example
</Link>`}</code></pre>

      <h4>With Leading Icon</h4>
      <pre><code>{`<Link href="/favorites" icon={<StarIcon />} iconPosition="left">
  Favorites
</Link>`}</code></pre>

      <h4>With Trailing Icon</h4>
      <pre><code>{`<Link href="/rate" icon={<StarIcon />} iconPosition="right">
  Rate this
</Link>`}</code></pre>

      <h4>Inline in Paragraph</h4>
      <pre><code>{`<p>
  Read our <Link href="/terms">Terms of Service</Link> and
  <Link href="/privacy">Privacy Policy</Link>.
</p>`}</code></pre>

      <h4>Disabled Link</h4>
      <pre><code>{`<Link href="/locked" disabled>
  Premium Content
</Link>`}</code></pre>

      <h4>White Variant on Dark Background</h4>
      <pre><code>{`<div style={{ background: '#0D0D0D', padding: 24 }}>
  <Link href="/docs" variant="white" external>
    Documentation
  </Link>
</div>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>link-color-blue</td><td>#2396FB</td><td>Default blue link color</td></tr>
          <tr><td>link-color-black</td><td>#0D0D0D</td><td>Black link color</td></tr>
          <tr><td>link-color-white</td><td>#FFFFFF</td><td>White link color (dark bg)</td></tr>
          <tr><td>link-visited-blue</td><td>#7B61FF</td><td>Visited state for blue variant</td></tr>
          <tr><td>link-visited-black</td><td>#525252</td><td>Visited state for black variant</td></tr>
          <tr><td>link-disabled-opacity</td><td>0.5</td><td>Opacity when disabled</td></tr>
          <tr><td>link-font-weight</td><td>500</td><td>Medium weight for link text</td></tr>
          <tr><td>link-icon-gap</td><td>4px</td><td>Gap between icon and text</td></tr>
        </tbody>
      </table>
    </>
  );
}

/* ── Usage Tab ── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Leading Icon</td><td>Optional icon before the link text</td></tr>
          <tr><td>2</td><td>Link Text</td><td>Clickable text content — inherits parent font size</td></tr>
          <tr><td>3</td><td>Trailing Icon</td><td>Optional icon after text, or external arrow for external links</td></tr>
          <tr><td>4</td><td>Underline</td><td>Appears on hover to indicate interactivity</td></tr>
        </tbody>
      </table>

      <h2>Usage Decision Guide</h2>
      <table>
        <thead><tr><th>Context</th><th>Variant</th><th>External</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Primary navigation</td><td>Blue</td><td>No</td><td>&quot;View all products&quot;</td></tr>
          <tr><td>Inline in body text</td><td>Blue</td><td>No</td><td>&quot;Terms of Service&quot;</td></tr>
          <tr><td>Footer / secondary nav</td><td>Black</td><td>No</td><td>&quot;Contact Us&quot;</td></tr>
          <tr><td>External resource</td><td>Blue</td><td>Yes</td><td>&quot;GitHub Repository ↗&quot;</td></tr>
          <tr><td>Dark background / hero</td><td>White</td><td>No</td><td>&quot;Get Started&quot;</td></tr>
          <tr><td>Disabled / locked</td><td>Any</td><td>No</td><td>&quot;Premium Content&quot;</td></tr>
        </tbody>
      </table>

      <h2>Best Practices</h2>
      <DoDont
        slug="links"
        doItems={[
          'Use descriptive link text that makes sense out of context',
          'Show an external icon for links that leave the site',
          'Use underline on hover to signal interactivity',
          'Ensure visited links have a distinct color shift',
          'Use the blue variant as the default for most contexts',
        ]}
        dontItems={[
          'Don\'t use "click here" or "read more" as link text',
          'Don\'t style links to look like buttons or vice versa',
          'Don\'t remove hover underline — it\'s the primary affordance',
          'Don\'t use white variant on light backgrounds',
          'Don\'t disable links without explaining why nearby',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Semantic HTML</td><td>&lt;a&gt;</td><td>Always use native anchor element in production</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter</td><td>Focus and activate the link</td></tr>
          <tr><td>Focus ring</td><td>2px outline</td><td>Visible focus indicator for keyboard users</td></tr>
          <tr><td>Text contrast</td><td>≥ 4.5:1</td><td>Against background (WCAG AA)</td></tr>
          <tr><td>External links</td><td>target=&quot;_blank&quot;</td><td>With rel=&quot;noopener noreferrer&quot; for security</td></tr>
          <tr><td>aria-disabled</td><td>true</td><td>Set on disabled links, with tabIndex=-1</td></tr>
          <tr><td>aria-label</td><td>string</td><td>When link text alone is not descriptive enough</td></tr>
        </tbody>
      </table>
    </>
  );
}

/* ── Changelog Tab ── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added White variant for dark backgrounds</li>
        <li>Added <code>icon</code> and <code>iconPosition</code> props</li>
        <li>Added visited state color shift</li>
        <li>Improved disabled state with <code>aria-disabled</code></li>
        <li>External links now auto-render trailing arrow icon</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with Blue and Black variants</li>
        <li>Hover underline interaction</li>
        <li>External link support with <code>target=&quot;_blank&quot;</code></li>
        <li>Disabled state</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function LinksPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Links"
      description="Text hyperlinks for navigating users to other pages, sections, or external resources."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
