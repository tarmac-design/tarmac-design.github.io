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
    changes: [{ category: 'Changed', items: ['Added custom separator support', 'Improved truncation with overflow menu', 'Fixed focus ring styling on breadcrumb links'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Breadcrumbs component', 'Default and With Icons variants', 'Large and Small size options', 'Truncated variant with overflow menu'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Breadcrumbs provide a navigation trail showing the user&apos;s current
          hierarchical page location. They help users navigate back to parent pages
          without relying on the browser back button, improving wayfinding in
          deeply nested structures.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Showing page hierarchy in multi-level navigation</li>
          <li>Providing quick navigation to parent sections</li>
          <li>Orienting users in complex information architectures</li>
          <li>E-commerce category/product navigation paths</li>
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
          The Breadcrumbs component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Container</strong> — Horizontal wrapper for breadcrumb items</li>
          <li><strong>Breadcrumb Item</strong> — Individual navigable link</li>
          <li><strong>Separator</strong> — Visual divider (/ or &gt;) between items</li>
          <li><strong>Current Item</strong> — Non-linked item representing current page</li>
          <li><strong>Overflow Menu (...)</strong> — Collapsed middle items on long trails</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Default</strong> — Text-only breadcrumb links</li>
          <li><strong>With Icons</strong> — Icons preceding each breadcrumb item</li>
          <li><strong>Truncated</strong> — Middle items collapsed into overflow menu</li>
          <li><strong>Custom Separator</strong> — User-defined separator character</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Large</strong> — 14px font, used for prominent navigation</li>
          <li><strong>Small</strong> — 12px font, used for compact contexts</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="breadcrumbs" />
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
          Use breadcrumbs to reveal the structure of a site and allow users to quickly
          navigate up the hierarchy. Place them at the top of the page below the main navigation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When the site has 3 or more levels of hierarchy</li>
          <li>When users need to quickly navigate between levels</li>
          <li>In e-commerce for category/subcategory navigation</li>
          <li>In documentation or knowledge base structures</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For flat site architectures with only one level</li>
          <li>As the primary navigation method</li>
          <li>When the page hierarchy is unclear or non-linear</li>
          <li>On mobile with very limited horizontal space (consider truncation)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage title="Breadcrumbs usage guidelines" slug="component" section="guideline" />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Start with the home/root page as the first item',
              'Make the current page the last non-clickable item',
              'Use truncation for paths deeper than 4 levels',
              'Place consistently at the top of page content',
            ]}
            dontItems={[
              'Use breadcrumbs as the only navigation mechanism',
              'Make the current page item clickable',
              'Include breadcrumbs on the home page itself',
              'Use inconsistent separator styles across pages',
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
          <li><code>nav</code> element with <code>aria-label="Breadcrumb"</code></li>
          <li><code>ol</code> element for the ordered list of items</li>
          <li><code>aria-current="page"</code> on the current page item</li>
          <li>Separators have <code>aria-hidden="true"</code></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus between breadcrumb links</li>
          <li><kbd>Enter</kbd> — Activates the focused breadcrumb link</li>
          <li>Current page item is not in the tab order (non-interactive)</li>
          <li>Overflow menu is keyboard accessible</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Announces &ldquo;Breadcrumb navigation&rdquo; landmark</li>
          <li>Each item is announced as a link with its text</li>
          <li>Current page is identified via aria-current</li>
          <li>Separators are hidden from assistive technology</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function BreadcrumbsPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Breadcrumbs"
      description="Navigation trail showing hierarchical page location. Helps users navigate back to parent pages without relying on browser back button."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
