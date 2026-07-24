'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { RoleToggle } from '@/components/RoleToggle';
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
    <>
      <h2>Component Structure</h2>
      <table><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody>
        <tr><td>Container</td><td>Card surface with border and radius</td></tr>
        <tr><td>Media Area</td><td>Image or illustration slot</td></tr>
        <tr><td>Content Area</td><td>Title, description, and metadata</td></tr>
        <tr><td>Action Area</td><td>Buttons or links at the bottom</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-card--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="cards example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Large</td><td>Feature cards and hero content</td></tr>
        <tr><td>Medium</td><td>Default product/content cards</td></tr>
        <tr><td>Small</td><td>Compact list-style cards</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Standard display</td></tr>
        <tr><td>Hover</td><td>Slight elevation on mouse over</td></tr>
        <tr><td>Selected</td><td>Active/checked state</td></tr>
        <tr><td>Disabled</td><td>Non-interactive</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="cards" />
    </>
  );
}


function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Usage Guidelines</h2>
          <GuidelineImage title="Cards usage overview" slug="cards" section="usage" />
        <p className="text-gray-700 mb-4">
          Cards contain self-sufficient content and actions. Each card should represent
          a single concept or item. Use consistent card layouts within the same context.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
          <GuidelineImage title="Cards when to use" slug="cards" section="when-to-use" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For displaying items in a browseable grid or list</li>
          <li>When content needs a self-contained visual boundary</li>
          <li>For product or content previews with actions</li>
          <li>When users need to compare items side by side</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
          <GuidelineImage title="Cards when not to use" slug="cards" section="when-not-to-use" />
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
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Card } from '@tarmac/design-system';`}</code></pre>

          <h2>Rules</h2>
          <table>
            <thead><tr><th>#</th><th>Rule</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Follow the documented prop interface</td></tr>
              <tr><td>2</td><td>Use design tokens for customization</td></tr>
              <tr><td>3</td><td>Ensure accessibility requirements are met</td></tr>
              <tr><td>4</td><td>Test across light and dark themes</td></tr>
            </tbody>
          </table>

          <h2>Basic Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Card />`}</code></pre>
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
