'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { GuidelineImage } from '@/components/GuidelineImage';

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
        <iframe src="https://tarmac-storybook.delhivery.com/storybook/sb/iframe.html?id=tarmac-tds-badge--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="badge example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
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
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Usage Guidelines</h2>
        <p className="text-gray-700 mb-4">
          Badges are for displaying metadata — they are non-interactive and should not
          be used as buttons or links. Choose the variant and type that best matches
          the semantic meaning and visual hierarchy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>To indicate status on table rows or list items</li>
          <li>To label categories or types on cards</li>
          <li>To show counts on navigation elements</li>
          <li>To surface priority or urgency information</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For interactive elements — use Button or Chip instead</li>
          <li>For large blocks of text — use Alert instead</li>
          <li>For user-removable tags — use Tag/Chip component</li>
          <li>For navigation — use links or buttons</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage title="Badge usage guidelines" slug="component" section="guideline" />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Keep badge labels short and scannable (1-2 words)',
              'Use consistent variant meanings across the application',
              'Use Solid type for highest emphasis, Subtle for secondary',
              'Pair with meaningful icons for quick recognition',
            ]}
            dontItems={[
              'Use badges as interactive buttons or links',
              'Overload a single view with too many badge colors',
              'Use long text that wraps to multiple lines',
              'Apply badges without clear semantic meaning',
            ]}
          />
        </div>
      </section>
    </div>
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
