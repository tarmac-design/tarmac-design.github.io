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
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Anatomy</h2>
        <p className="text-gray-700 mb-4">
          The Badge component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Container</strong> — Radius/Default 4px, Spacing/6 padding, Spacing/2 gap</li>
          <li><strong>Leading Icon</strong> — Optional icon before label (12-14px)</li>
          <li><strong>Label</strong> — Text content (Noto Sans Medium 12)</li>
          <li><strong>Trailing Icon</strong> — Optional icon after label (12-14px)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Black</strong> — High-contrast dark badge</li>
          <li><strong>White</strong> — Light badge for dark surfaces</li>
          <li><strong>Coal</strong> — Subtle dark-toned badge</li>
          <li><strong>DLV Red</strong> — Brand-colored badge</li>
          <li><strong>Info</strong> — Blue informational badge</li>
          <li><strong>Success</strong> — Green positive status badge</li>
          <li><strong>Warning</strong> — Yellow/amber caution badge</li>
          <li><strong>Error</strong> — Red critical status badge</li>
          <li><strong>Cardbox</strong> — Muted cardbox-themed badge</li>
          <li><strong>Cyan</strong> — Cyan accent badge</li>
          <li><strong>Orange</strong> — Orange accent badge</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Types</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Solid</strong> — Loudest, filled background for primary emphasis</li>
          <li><strong>Subtle</strong> — Secondary emphasis with lighter background</li>
          <li><strong>Outlined</strong> — Border-only for use on tinted surfaces</li>
          <li><strong>Ghost</strong> — Loading/skeleton placeholder state</li>
          <li><strong>Disabled</strong> — Non-interactive muted state</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Large</strong> — 28px height</li>
          <li><strong>Medium</strong> — 24px height</li>
          <li><strong>Small</strong> — 20px height</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Boolean Properties</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Leading Icon</strong> — Toggles icon before label</li>
          <li><strong>Trailing Icon</strong> — Toggles icon after label</li>
          <li><strong>Status Dot</strong> — Toggles colored status indicator dot</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="badge" />
      </section>
    </div>
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
