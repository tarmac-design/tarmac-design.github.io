'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { GuidelineImage } from '@/components/GuidelineImage';
import { RoleToggle } from '@/components/RoleToggle';

const changelogEntries: ChangelogEntry[] = [
  {
    version: '1.1.2',
    date: 'June 2026',
    changes: [{ category: 'Changed', items: ['Added Cyan and Orange variant options', 'Added status dot boolean property', 'Improved ghost state animation'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Badge component', 'Support for Solid, Subtle, Outlined, Ghost, and Disabled types', 'Three size options: Large, Medium, Small', 'Leading and trailing icon support'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Badges are compact, non-interactive labels that surface metadata such as status,
          category, or count. They are attached to rows, cards, or headers and never carry
          their own action. Badges help users quickly scan and categorize information.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Displaying status indicators (active, pending, failed)</li>
          <li>Categorizing items in lists or tables</li>
          <li>Showing notification counts on navigation items</li>
          <li>Labeling content types or priority levels</li>
          <li>Indicating tags or metadata on cards</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Availability</h2>
        <AvailabilityTable />
      </section>
    </div>
  );
}

function SpecsTab() {
  return (
    <>
      <h2>Component Structure</h2>
      <table><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody>
        <tr><td>Container</td><td>4px radius, Spacing/6 padding — holds label and optional icons</td></tr>
        <tr><td>Label</td><td>Noto Sans Medium 12 — one or two words max</td></tr>
        <tr><td>Leading Icon</td><td>Optional 12-14px icon reinforcing meaning</td></tr>
        <tr><td>Trailing Icon</td><td>Optional icon after the label</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-badge--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="badge example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Large (28px)</td><td>Cards, banners, and headers</td></tr>
        <tr><td>Medium (24px)</td><td>Default for most contexts</td></tr>
        <tr><td>Small (20px)</td><td>Dense tables and metadata rows</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Solid</td><td>Filled — strongest emphasis for critical status</td></tr>
        <tr><td>Subtle</td><td>Light background — secondary information</td></tr>
        <tr><td>Outlined</td><td>Border only — minimal visual weight</td></tr>
        <tr><td>Ghost</td><td>Extremely lightweight — loading placeholders</td></tr>
        <tr><td>Disabled</td><td>Inactive, visually muted</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="badge" />
    </>
  );
}


function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <>
          <h2>Usage</h2>
          <p>Compact labels for status or category. Non-interactive — the row or card is the interaction target.</p>
          <GuidelineImage title="Badge usage overview" slug="badge" section="usage" />

          <h2>When to Use</h2>
          <ul>
            <li>Shipment status indicators on table rows</li>
            <li>Table metadata and category labels</li>
            <li>Card labels and priority indicators</li>
            <li>Notification counts on navigation items</li>
          </ul>

          <h2>When Not to Use</h2>
          <ul>
            <li>As buttons or clickable elements — use Button or Chip</li>
            <li>For long text — use Alert or inline text</li>
            <li>As the only error signal — pair with text explanation</li>
            <li>Decoratively without semantic meaning</li>
          </ul>

          <h2>Do&apos;s and Don&apos;ts</h2>
          <DoDont slug="badge"
            doItems={[
              'One–two words max for label text',
              'Match badge size to container density',
              'Use semantic colors consistently across the app',
              'Pair with meaningful icons to reinforce (never replace) the label',
            ]}
            dontItems={[
              "Don't stack redundant badges on the same element",
              "Don't make badges clickable — they are metadata, not actions",
              "Don't rely on color alone — always include a text label",
              "Don't use long text that wraps to multiple lines",
            ]}
          />
        </>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Badge } from '@tarmac/design-system';`}</code></pre>

          <h2>Rules</h2>
          <table>
            <thead><tr><th>#</th><th>Rule</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Always provide <code>variant</code> for semantic color</td></tr>
              <tr><td>2</td><td>Keep label 1-2 words — badges are scanned not read</td></tr>
              <tr><td>3</td><td>Never make badges interactive — they are metadata</td></tr>
              <tr><td>4</td><td>Use <code>type</code> to control emphasis hierarchy</td></tr>
              <tr><td>5</td><td>Icons reinforce meaning but never replace label text</td></tr>
            </tbody>
          </table>

          <h2>Props</h2>
          <table>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>label</td><td>string</td><td>required</td><td>Badge text — keep to 1–2 words</td></tr>
              <tr><td>variant</td><td>{`"black" | "white" | "coal" | "dlvRed" | "info" | "success" | "warning" | "error" | "cardbox"`}</td><td>{`"info"`}</td><td>Semantic color variant</td></tr>
              <tr><td>type</td><td>{`"solid" | "subtle" | "outlined" | "ghost" | "disabled"`}</td><td>{`"solid"`}</td><td>Emphasis level</td></tr>
              <tr><td>size</td><td>{`"lg" | "md" | "sm"`}</td><td>{`"md"`}</td><td>Badge height</td></tr>
              <tr><td>leadingIcon</td><td>ReactNode</td><td>undefined</td><td>Optional icon before label</td></tr>
              <tr><td>trailingIcon</td><td>ReactNode</td><td>undefined</td><td>Optional icon after label</td></tr>
              <tr><td>status</td><td>boolean</td><td>false</td><td>Shows status dot indicator</td></tr>
            </tbody>
          </table>

          <h2>Basic Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Badge label="Active" variant="success" />`}</code></pre>

          <h2>Advanced Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Badge
  label="Priority"
  variant="warning"
  type="outlined"
  size="sm"
  leadingIcon={<AlertIcon />}
/>`}</code></pre>
        </>
      )}
    </RoleToggle>
  );
}

function AccessibilityTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">ARIA Attributes</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><code>role="status"</code> when conveying dynamic state changes</li>
          <li><code>aria-label</code> when icon-only badges need accessible text</li>
          <li>Decorative badges use <code>aria-hidden="true"</code></li>
          <li>Status dot meaning conveyed via sr-only text</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Badges are not focusable (non-interactive element)</li>
          <li>Information conveyed by badges must also be available in surrounding context</li>
          <li>Color alone does not convey meaning — text label is always present</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Badge text content is read as part of parent element</li>
          <li>Status information is conveyed through text, not color alone</li>
          <li>Icons have appropriate alt text or are marked decorative</li>
          <li>Dynamic badge updates announce via live regions when appropriate</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function BadgePage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Badge"
      description="Compact, non-interactive labels that surface metadata — status, category, count. Attached to rows, cards or headers. Never carry their own action."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
