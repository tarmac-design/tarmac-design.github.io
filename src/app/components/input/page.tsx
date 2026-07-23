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
    version: '1.2.0',
    date: 'June 2026',
    changes: [{ category: 'Changed', items: ['Added character counter variant', 'Improved clear button visibility', 'Fixed label animation on autofill'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Input component', 'Support for Default, With icons, and With counter variants', 'Large, Medium, and Small sizes', 'All interaction states supported'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Input is a single-line text field for collecting user data. It supports labels,
          placeholder text, helper messages, leading/trailing icons, and validation states.
          Inputs are the primary way users enter text information in forms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Collecting names, emails, phone numbers in forms</li>
          <li>Entering search queries</li>
          <li>Password entry fields</li>
          <li>Numeric inputs for quantities or amounts</li>
          <li>URL or code entry fields</li>
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
            src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-input--playground&viewMode=story&shortcuts=false"
            style={{ width: '100%', height: '300px', border: 'none', display: 'block' }}
            title="Input interactive example"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Anatomy</h2>
        <p className="text-gray-700 mb-4">
          The Input component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Container</strong> — Wrapper with border, padding, and background</li>
          <li><strong>Label</strong> — Descriptive text above or inside the input</li>
          <li><strong>Input Field</strong> — The text entry area</li>
          <li><strong>Helper Text</strong> — Additional guidance below the input</li>
          <li><strong>Leading Icon</strong> — Optional icon before input text</li>
          <li><strong>Trailing Icon</strong> — Optional icon after input text</li>
          <li><strong>Clear Button</strong> — Action to clear input content</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Default</strong> — Standard text input with label and helper text</li>
          <li><strong>With Icons</strong> — Input with leading and/or trailing icons</li>
          <li><strong>With Counter</strong> — Input showing character count</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Large</strong> — 48px height for prominent inputs</li>
          <li><strong>Medium</strong> — 40px height for standard forms</li>
          <li><strong>Small</strong> — 32px height for compact layouts</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">States</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Default</strong> — Inactive, waiting for interaction</li>
          <li><strong>Focused</strong> — Active with cursor, border highlighted</li>
          <li><strong>Filled</strong> — Contains user-entered value</li>
          <li><strong>Error</strong> — Validation failed, error message shown</li>
          <li><strong>Disabled</strong> — Non-interactive, muted appearance</li>
          <li><strong>Read-only</strong> — Displays value but prevents editing</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="input" />
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
        <GuidelineImage title="When to use Input" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When collecting single-line text data from users</li>
          <li>When the expected input is short (name, email, number)</li>
          <li>When validation and error feedback is needed</li>
          <li>When icons help communicate the expected input type</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <GuidelineImage title="When not to use Input" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For multi-line text — use Input Area (textarea) instead</li>
          <li>For selecting from predefined options — use Dropdown</li>
          <li>For file paths — use File Upload component</li>
          <li>For date/time values — use Date Time Picker</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Do&apos;s and Don&apos;ts</h2>
        <DoDont
          doItems={[
            'Always include a visible label for the input',
            'Use placeholder text as a hint, not a replacement for labels',
            'Show validation errors inline below the input',
            'Use appropriate input type (email, tel, number)',
          ]}
          dontItems={[
            'Use placeholder as the only label',
            'Show error messages before user interaction',
            'Disable the submit button without explaining why',
            'Use inputs for selecting from a fixed set of options',
          ]}
        />
      </section>
    </div>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Input } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Input />`}</code></pre>
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
          <li><code>aria-label</code> or <code>aria-labelledby</code> linking to the visible label</li>
          <li><code>aria-describedby</code> linking to helper or error text</li>
          <li><code>aria-invalid="true"</code> when in error state</li>
          <li><code>aria-required="true"</code> for mandatory fields</li>
          <li><code>aria-disabled="true"</code> for disabled state</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus into/out of the input</li>
          <li>Standard text editing keys work within the field</li>
          <li><kbd>Escape</kbd> — Clears input when clear button is present</li>
          <li>Focus ring is clearly visible on the container</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Label is announced when input receives focus</li>
          <li>Helper text is announced as part of the field description</li>
          <li>Error messages are announced immediately when they appear</li>
          <li>Required state is communicated</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Color Contrast</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Input text meets 4.5:1 contrast ratio</li>
          <li>Placeholder text meets 3:1 minimum contrast</li>
          <li>Border color meets 3:1 against background</li>
          <li>Error state uses both color and icon/text</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function InputPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Input"
      description="Single-line text field for collecting user data. Supports labels, icons, validation states, and multiple sizes."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
