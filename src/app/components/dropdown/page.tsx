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
    version: '1.2.0',
    date: 'June 2026',
    changes: [{ category: 'Changed', items: ['Added grouped options support', 'Improved search performance for large datasets', 'Fixed focus trap behavior when dropdown closes'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Dropdown component', 'Support for Single select, Multi select, With search, and Grouped variants', 'Open, Closed, Focused, and Disabled states'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Dropdowns are selection menus triggered by a button or input field. They present
          a list of options in a floating panel, allowing users to choose one or more items
          from a predefined set. Dropdowns are ideal when screen space is limited and the
          option list is too long for inline radio buttons or checkboxes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Selecting a single option from a list (e.g., country, status)</li>
          <li>Multi-selecting tags or categories for filtering</li>
          <li>Choosing from a large set of options with search capability</li>
          <li>Grouped selections with logical categorization</li>
          <li>Form fields requiring predefined value selection</li>
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
            src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-dropdown--playground&viewMode=story&shortcuts=false"
            style={{ width: '100%', height: '300px', border: 'none', display: 'block' }}
            title="Dropdown interactive example"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Anatomy</h2>
        <p className="text-gray-700 mb-4">
          The Dropdown component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Trigger</strong> — Button or input that opens the dropdown panel</li>
          <li><strong>Dropdown Panel</strong> — Floating container holding the option list</li>
          <li><strong>Option Items</strong> — Individual selectable items within the panel</li>
          <li><strong>Search Field</strong> — Optional text input for filtering options</li>
          <li><strong>Dividers</strong> — Visual separators between option groups</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Single Select</strong> — Allows selecting one option at a time</li>
          <li><strong>Multi Select</strong> — Allows selecting multiple options with checkboxes</li>
          <li><strong>With Search</strong> — Includes a search field for filtering options</li>
          <li><strong>Grouped</strong> — Options organized into labeled groups</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">States</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Open</strong> — Panel is visible and interactive</li>
          <li><strong>Closed</strong> — Panel is hidden, only trigger is visible</li>
          <li><strong>Focused</strong> — Trigger has keyboard focus</li>
          <li><strong>Disabled</strong> — Interaction is prevented</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="dropdown" />
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
          <GuidelineImage title="Dropdown usage overview" slug="dropdown" section="usage" />
          <GuidelineImage title="Dropdown when to use" slug="dropdown" section="when-to-use" />
        <GuidelineImage title="When to use Dropdown" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When there are more than 5 options to choose from</li>
          <li>When screen space is limited and inline options are impractical</li>
          <li>When the user needs to select from a predefined set of values</li>
          <li>When options need to be searchable or grouped</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
          <GuidelineImage title="Dropdown when not to use" slug="dropdown" section="when-not-to-use" />
        <GuidelineImage title="When not to use Dropdown" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For fewer than 5 options — use Radio buttons or Checkboxes instead</li>
          <li>For navigation menus — use Navigation component</li>
          <li>For actions — use Menu or Button component</li>
          <li>For free-text input — use Input or Input Area</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Do&apos;s and Don&apos;ts</h2>
        <DoDont
          doItems={[
            'Provide a clear placeholder or label for the trigger',
            'Use search for lists with more than 10 options',
            'Group related options logically',
            'Show selected state clearly in the trigger',
          ]}
          dontItems={[
            'Nest dropdowns inside other dropdowns',
            'Use dropdown for binary yes/no choices',
            'Include more than 3 levels of grouping',
            'Allow the panel to overflow the viewport without scrolling',
          ]}
        />
      </section>
    </div>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Dropdown } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Dropdown />`}</code></pre>
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
          <li><code>role="listbox"</code> on the dropdown panel</li>
          <li><code>role="option"</code> on each option item</li>
          <li><code>aria-expanded</code> on the trigger indicating open/closed state</li>
          <li><code>aria-haspopup="listbox"</code> on the trigger</li>
          <li><code>aria-selected</code> on selected option(s)</li>
          <li><code>aria-activedescendant</code> for tracking focused option</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> — Opens/closes the dropdown</li>
          <li><kbd>Arrow Down</kbd> — Moves focus to next option</li>
          <li><kbd>Arrow Up</kbd> — Moves focus to previous option</li>
          <li><kbd>Home</kbd> — Moves focus to first option</li>
          <li><kbd>End</kbd> — Moves focus to last option</li>
          <li><kbd>Escape</kbd> — Closes the dropdown and returns focus to trigger</li>
          <li><kbd>Tab</kbd> — Moves focus out of the dropdown</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Trigger announces its label, role, and expanded state</li>
          <li>Options announce their label and selected state</li>
          <li>Multi-select communicates number of selected items</li>
          <li>Search field announces filtered results count</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Color Contrast</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>All text meets 4.5:1 contrast ratio against background</li>
          <li>Focus indicators meet 3:1 contrast against adjacent colors</li>
          <li>Selected state is visually distinguishable beyond color alone</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function DropdownPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Dropdown"
      description="Selection menu triggered by a button or input field. Presents a list of options in a floating panel for single or multi-select interactions."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
