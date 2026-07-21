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
    changes: [{ category: 'Changed', items: ['Added Elevated variant with shadow tokens', 'Improved responsive padding at smaller breakpoints', 'Fixed border rendering in dark mode'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Card Block component', 'Default and Outlined variants', 'Support for optional header and footer sections', 'Configurable padding and border radius'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Card Block is a container component for grouping related content with visual
          separation and optional actions. It provides a structured surface for
          organizing information into logical sections.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Grouping related form fields or settings</li>
          <li>Creating content sections within a page</li>
          <li>Wrapping dashboard widgets or metrics</li>
          <li>Organizing list items with visual boundaries</li>
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
          The Card Block component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Container</strong> — Outer wrapper with border, padding, and background</li>
          <li><strong>Header</strong> — Optional title area with actions</li>
          <li><strong>Body</strong> — Main content area supporting nested content</li>
          <li><strong>Footer</strong> — Optional action area at the bottom</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Default</strong> — Standard bordered card with white background</li>
          <li><strong>Elevated</strong> — Card with box shadow for layered depth</li>
          <li><strong>Outlined</strong> — Subtle border-only without shadow</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="card-block" />
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
          Use Card Block to create visually distinct sections of content. It acts as a
          generic container — the content within defines its purpose.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>To group related settings or form sections</li>
          <li>To create distinct content areas on a dashboard</li>
          <li>As a wrapper for complex nested layouts</li>
          <li>When content needs visual separation from surroundings</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For clickable product cards — use Cards component</li>
          <li>For simple spacing — use layout primitives instead</li>
          <li>When nesting would create excessive visual noise</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage title="Card block layout guidelines" slug="component" section="guideline" />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Use consistent spacing and padding within card blocks',
              'Give card blocks a clear header when purpose isn\'t obvious',
              'Use Elevated variant sparingly for emphasis',
              'Keep nesting to a maximum of 2 levels',
            ]}
            dontItems={[
              'Nest card blocks more than 2 levels deep',
              'Use different variants in the same section without reason',
              'Add card blocks around single elements',
              'Use card blocks for purely decorative borders',
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
          <li><code>role="region"</code> when the card block has a labeled heading</li>
          <li><code>aria-labelledby</code> pointing to the header title element</li>
          <li>No special role needed for purely visual grouping</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Card Block itself is not focusable</li>
          <li>Interactive elements within follow normal tab order</li>
          <li>Focus management handled by child components</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Announces as a region when labeled</li>
          <li>Header content provides context for the grouped content</li>
          <li>Does not add unnecessary verbosity for simple wrappers</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function CardBlockPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Card Block"
      description="Container component for grouping related content with visual separation and optional actions."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
