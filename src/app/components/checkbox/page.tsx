'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { GuidelineImage } from '@/components/GuidelineImage';
import { RoleToggle } from '@/components/RoleToggle';

const changelogEntries: ChangelogEntry[] = [
  {
    version: '1.1.2',
    date: 'June 2026',
    changes: [{ category: 'Changed', items: ['Added Ghost (skeleton) loading state', 'Improved indeterminate state visual clarity', 'Fixed label alignment at Small size'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Checkbox component', 'Support for Checked, Unchecked, and Indeterminate states', 'Default and With Label variants', 'Three size options: Large, Medium, Small'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Checkbox is a selection control for toggling binary choices or multi-select
          options. It supports checked, unchecked, and indeterminate states, making it
          suitable for individual toggles, group selections, and parent-child relationships.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Toggling a single setting on/off (e.g., "Remember me")</li>
          <li>Multi-select lists with multiple options</li>
          <li>Accepting terms and conditions</li>
          <li>Select-all/parent checkbox in data tables</li>
          <li>Filter selections in search interfaces</li>
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
        <tr><td>Check Box</td><td>The square toggle control</td></tr>
        <tr><td>Checkmark</td><td>Icon shown when checked</td></tr>
        <tr><td>Label</td><td>Descriptive text beside the control</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-checkbox--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="checkbox example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Large</td><td>Touch-friendly for mobile</td></tr>
        <tr><td>Medium</td><td>Default for forms</td></tr>
        <tr><td>Small</td><td>Dense settings panels</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Unchecked</td><td>Empty — not selected</td></tr>
        <tr><td>Checked</td><td>Filled with checkmark</td></tr>
        <tr><td>Indeterminate</td><td>Partial selection (dash icon)</td></tr>
        <tr><td>Disabled</td><td>Non-interactive, muted</td></tr>
        <tr><td>Ghost</td><td>Skeleton loading</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="checkbox" />
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
        <p className="text-gray-700 mb-4">
          Checkboxes are for non-exclusive selections where multiple options can be
          active simultaneously. For mutually exclusive choices, use Radio buttons.
          For simple on/off toggles, consider a Switch component.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When users can select multiple options from a list</li>
          <li>For binary yes/no toggles (e.g., "I agree")</li>
          <li>For select-all functionality in tables</li>
          <li>In forms where multiple selections are valid</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For mutually exclusive choices — use Radio buttons</li>
          <li>For instant on/off toggles — use Switch component</li>
          <li>For actions — use Button component</li>
          <li>For navigation — use links or menu items</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage title="Checkbox usage guidelines" slug="component" section="guideline" />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Always include a visible label (or aria-label for unlabeled)',
              'Make the label clickable (not just the box)',
              'Use indeterminate state for parent checkboxes only',
              'List options in logical order',
            ]}
            dontItems={[
              'Use a checkbox when only one selection is allowed',
              'Use negative language (avoid "Don\'t send me emails")',
              'Pre-check options that have legal implications',
              'Hide the checkbox without an alternative visual',
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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Checkbox } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Checkbox />`}</code></pre>
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
          <li>Uses native <code>&lt;input type=&quot;checkbox&quot;&gt;</code> for semantics</li>
          <li><code>aria-checked="mixed"</code> for indeterminate state</li>
          <li><code>aria-disabled="true"</code> when disabled</li>
          <li><code>aria-labelledby</code> or associated <code>&lt;label&gt;</code></li>
          <li><code>aria-describedby</code> for helper/error text</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus to the checkbox</li>
          <li><kbd>Space</kbd> — Toggles the checkbox state</li>
          <li>Focus ring is clearly visible around the checkbox</li>
          <li>Disabled checkboxes remain discoverable via Tab</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Announces label, role (checkbox), and state (checked/unchecked)</li>
          <li>Indeterminate state announced as &ldquo;mixed&rdquo;</li>
          <li>State changes are announced on toggle</li>
          <li>Group labels announced when checkbox is part of a fieldset</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function CheckboxPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Checkbox"
      description="Selection control for toggling binary choices or multi-select options. Supports checked, unchecked, and indeterminate states."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
