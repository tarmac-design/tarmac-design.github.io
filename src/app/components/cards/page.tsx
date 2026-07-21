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
    changes: [{ category: 'Changed', items: ['Added Selection Card variant with checkbox', 'Improved media area aspect ratio handling', 'Fixed focus ring on Action Card variant'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Cards component', 'Default, Media Card, and Action Card variants', 'Support for badge slot and action area', 'Responsive layout support'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Cards are surface containers for displaying grouped information. They are used
          for product listings, content summaries, and action items — providing a
          self-contained unit of content with optional media, actions, and metadata.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Product listings in e-commerce grids</li>
          <li>Content summaries in feeds or dashboards</li>
          <li>Action items in task management views</li>
          <li>Media previews with metadata and actions</li>
          <li>Selection cards for multi-choice interfaces</li>
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
          The Cards component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Container</strong> — Outer card surface with border and shadow</li>
          <li><strong>Media Area</strong> — Optional image or video region</li>
          <li><strong>Content Area</strong> — Title, description, and metadata</li>
          <li><strong>Action Area</strong> — Buttons or interactive elements</li>
          <li><strong>Badge Slot</strong> — Optional badge for status/category</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Default</strong> — Standard content card with text and actions</li>
          <li><strong>Media Card</strong> — Card with prominent media/image area</li>
          <li><strong>Action Card</strong> — Interactive card that acts as a button</li>
          <li><strong>Selection Card</strong> — Card with checkbox for multi-select</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="cards" />
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
          Cards contain self-sufficient content and actions. Each card should represent
          a single concept or item. Use consistent card layouts within the same context.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For displaying items in a browseable grid or list</li>
          <li>When content needs a self-contained visual boundary</li>
          <li>For product or content previews with actions</li>
          <li>When users need to compare items side by side</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For simple content grouping — use Card Block instead</li>
          <li>For single-item detail views — use page layouts</li>
          <li>For navigation menus — use appropriate nav components</li>
          <li>When content doesn&apos;t have a clear boundary need</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage title="Cards layout guidelines" slug="component" section="guideline" />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Use consistent card sizes within the same grid',
              'Keep card content concise and scannable',
              'Ensure media has consistent aspect ratios',
              'Make the entire card clickable for Action Card variant',
            ]}
            dontItems={[
              'Mix different card layouts in the same grid',
              'Overload cards with too many actions',
              'Use cards for single pieces of text',
              'Nest cards within other cards',
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
          <li><code>role="article"</code> for content cards in a feed</li>
          <li>Action Cards use <code>role="button"</code> or anchor semantics</li>
          <li>Selection Cards use <code>role="checkbox"</code> with <code>aria-checked</code></li>
          <li><code>aria-labelledby</code> pointing to the card title</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus to interactive elements within the card</li>
          <li><kbd>Enter</kbd> — Activates Action Card or primary action</li>
          <li><kbd>Space</kbd> — Toggles Selection Card checkbox</li>
          <li>Cards in a grid support arrow key navigation</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Card title provides primary accessible name</li>
          <li>Media images have descriptive alt text</li>
          <li>Badge content is announced with card context</li>
          <li>Action buttons clearly describe their purpose</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function CardsPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Cards"
      description="Surface containers for displaying grouped information. Used for product listings, content summaries, and action items."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
