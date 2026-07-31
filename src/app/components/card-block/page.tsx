'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { RoleToggle } from '@/components/RoleToggle';
import { GuidelineImage } from '@/components/GuidelineImage';
import { ArchivedBanner } from '@/components/ArchivedBanner';

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
      <p style={{ marginBottom: '1.5rem' }}>
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/index.html?path=/story/tarmac-tds-card--card-playground" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '14px' }}>Open in Storybook →</a>
      </p>
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
    <>
      <h2>Component Structure</h2>
      <table><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody>
        <tr><td>Container</td><td>Bordered surface with padding and radius</td></tr>
        <tr><td>Content Area</td><td>Flexible slot for any content</td></tr>
        <tr><td>Header</td><td>Optional title section</td></tr>
        <tr><td>Footer</td><td>Optional action area</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-card-block--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="card-block example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Standard card with comfortable padding</td></tr>
        <tr><td>Compact</td><td>Reduced padding for dense layouts</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Standard appearance</td></tr>
        <tr><td>Elevated</td><td>Shadow for visual hierarchy</td></tr>
        <tr><td>Outlined</td><td>Border-only, no elevation</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="card-block" />
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
          <GuidelineImage title="Card Block usage overview" slug="card-block" section="usage" />
        <p className="text-gray-700 mb-4">
          Use Card Block to create visually distinct sections of content. It acts as a
          generic container — the content within defines its purpose.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
          <GuidelineImage title="Card Block when to use" slug="card-block" section="when-to-use" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>To group related settings or form sections</li>
          <li>To create distinct content areas on a dashboard</li>
          <li>As a wrapper for complex nested layouts</li>
          <li>When content needs visual separation from surroundings</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
          <GuidelineImage title="Card Block when not to use" slug="card-block" section="when-not-to-use" />
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
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { CardBlock } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<CardBlock />`}</code></pre>
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
      subHeader={<ArchivedBanner />}
    >
      <OverviewTab />
    </PageShell>
  );
}
