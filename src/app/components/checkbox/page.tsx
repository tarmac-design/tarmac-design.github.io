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
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Anatomy</h2>
        <p className="text-gray-700 mb-4">
          The Checkbox component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Container</strong> — Clickable hit area wrapping box and label</li>
          <li><strong>Check Box</strong> — Square visual indicator</li>
          <li><strong>Checkmark Icon</strong> — Tick or dash icon inside the box</li>
          <li><strong>Label</strong> — Optional text describing the option</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Default</strong> — Checkbox without label text</li>
          <li><strong>With Label</strong> — Checkbox with accompanying text label</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Large</strong> — Prominent checkbox for touch targets</li>
          <li><strong>Medium</strong> — Default size for forms and lists</li>
          <li><strong>Small</strong> — Compact checkbox for dense layouts</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">States</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Unchecked</strong> — Empty checkbox, option not selected</li>
          <li><strong>Checked</strong> — Checkmark visible, option selected</li>
          <li><strong>Indeterminate</strong> — Dash icon, partial selection (parent)</li>
          <li><strong>Disabled</strong> — Non-interactive, reduced opacity</li>
          <li><strong>Ghost</strong> — Loading skeleton placeholder</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="checkbox" />
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
