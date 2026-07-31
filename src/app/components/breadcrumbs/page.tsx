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
      <p style={{ marginBottom: '1.5rem' }}>
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/index.html?path=/story/tarmac-tds-breadcrumbs--playground" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '14px' }}>Open in Storybook →</a>
      </p>
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
    <>
      <h2>Component Structure</h2>
      <table><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody>
        <tr><td>Breadcrumb Item</td><td>Linked page name in the trail</td></tr>
        <tr><td>Separator</td><td>Divider between items (/ or &gt;)</td></tr>
        <tr><td>Current Item</td><td>Non-linked text for current page</td></tr>
        <tr><td>Overflow</td><td>Collapsed items shown as "..."</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-breadcrumbs--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="breadcrumbs example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Large (14px)</td><td>Page headers and prominent navigation</td></tr>
        <tr><td>Small (12px)</td><td>Compact layouts and secondary nav</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Full breadcrumb trail visible</td></tr>
        <tr><td>Truncated</td><td>Middle items collapsed into overflow menu</td></tr>
        <tr><td>Ghost</td><td>Skeleton loading state</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="breadcrumbs" />
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
          <GuidelineImage title="Breadcrumbs usage overview" slug="breadcrumbs" section="usage" />
        <p className="text-gray-700 mb-4">
          Use breadcrumbs to reveal the structure of a site and allow users to quickly
          navigate up the hierarchy. Place them at the top of the page below the main navigation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
          <GuidelineImage title="Breadcrumbs when to use" slug="breadcrumbs" section="when-to-use" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When the site has 3 or more levels of hierarchy</li>
          <li>When users need to quickly navigate between levels</li>
          <li>In e-commerce for category/subcategory navigation</li>
          <li>In documentation or knowledge base structures</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
          <GuidelineImage title="Breadcrumbs when not to use" slug="breadcrumbs" section="when-not-to-use" />
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
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Breadcrumbs } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Breadcrumbs />`}</code></pre>
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
