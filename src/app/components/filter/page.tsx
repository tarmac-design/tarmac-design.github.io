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
    version: '1.1.0',
    date: 'June 2026',
    changes: [{ category: 'Changed', items: ['Added multi-filter combination support', 'Improved reset behavior for nested filters', 'Fixed keyboard navigation within filter options'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Filter component', 'Support for Single filter, Multi filter, and With search variants', 'Apply and Reset button actions'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <p style={{ marginBottom: '1.5rem' }}>
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/index.html?path=/story/tarmac-tds-filterdropdown--playground" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '14px' }}>Open in Storybook →</a>
      </p>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Filters provide a UI for narrowing content by applying selection criteria. They
          allow users to refine lists, tables, or search results by selecting from predefined
          filter options. Filters can be combined for complex data narrowing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Narrowing table data by status, date, or category</li>
          <li>Filtering search results by multiple criteria</li>
          <li>Refining product listings by attributes</li>
          <li>Combining multiple filter conditions for complex queries</li>
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
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginBottom: '2rem', background: '#fff' }}>
          <iframe
            src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-filterdropdown--playground&viewMode=story&shortcuts=false"
            style={{ width: '100%', height: '300px', border: 'none', display: 'block' }}
            title="Filter interactive example"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Anatomy</h2>
        <p className="text-gray-700 mb-4">
          The Filter component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Filter Trigger</strong> — Button that opens the filter dropdown panel</li>
          <li><strong>Dropdown Panel</strong> — Container holding filter options</li>
          <li><strong>Filter Options</strong> — Selectable criteria items</li>
          <li><strong>Apply/Reset Buttons</strong> — Actions to confirm or clear selections</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Single Filter</strong> — One filter criterion at a time</li>
          <li><strong>Multi Filter</strong> — Multiple criteria applied simultaneously</li>
          <li><strong>With Search</strong> — Includes search to find filter options quickly</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="filter" />
      </section>
    </div>
  );
}

function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
          <GuidelineImage title="Filter usage overview" slug="filter" section="usage" />
          <GuidelineImage title="Filter when to use" slug="filter" section="when-to-use" />
        <GuidelineImage title="When to use Filter" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When users need to narrow large datasets by criteria</li>
          <li>When multiple filter dimensions are available</li>
          <li>When filters need to be applied/reset explicitly</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
          <GuidelineImage title="Filter when not to use" slug="filter" section="when-not-to-use" />
        <GuidelineImage title="When not to use Filter" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For sorting content — use a Sort control instead</li>
          <li>For searching by text — use Search component</li>
          <li>For navigation between views — use Tabs or Navigation</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Do&apos;s and Don&apos;ts</h2>
        <DoDont
          doItems={[
            'Show active filter count on the trigger',
            'Provide a clear way to reset all filters',
            'Keep filter options concise and scannable',
            'Allow combining multiple filter types',
          ]}
          dontItems={[
            'Apply filters automatically without user confirmation',
            'Hide the reset action when filters are active',
            'Use vague or overlapping filter labels',
            'Show empty states without suggesting filter removal',
          ]}
        />
      </section>
    </div>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { FilterDropdown } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<FilterDropdown />`}</code></pre>
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
          <li><code>aria-expanded</code> on filter trigger indicating panel state</li>
          <li><code>aria-controls</code> linking trigger to the filter panel</li>
          <li><code>role="group"</code> on filter option groups</li>
          <li><code>aria-checked</code> on individual filter options</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> — Opens filter panel or toggles option</li>
          <li><kbd>Arrow Down/Up</kbd> — Navigates between filter options</li>
          <li><kbd>Escape</kbd> — Closes the filter panel</li>
          <li><kbd>Tab</kbd> — Moves focus between filter sections and buttons</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Trigger announces active filter count</li>
          <li>Options announce their checked/unchecked state</li>
          <li>Apply and Reset buttons are clearly labeled</li>
          <li>Results count updates are announced via live regions</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function FilterPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Filter"
      description="UI for narrowing content by applying selection criteria. Supports single and multi-filter combinations with search capability."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
