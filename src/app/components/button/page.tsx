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
    changes: [{ category: 'Changed', items: ['Added Ghost and Loading states', 'Improved focus ring visibility across all variants', 'Fixed icon alignment in XSmall size'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Button component', 'Support for 8 color variants', 'Standard, Outlined, and Text types', 'Five size options from XSmall to XLarge'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Button is the primary interactive element for triggering actions. It supports
          multiple emphasis levels, sizes, and states to accommodate various interaction
          patterns across the application, from primary CTAs to subtle tertiary actions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Submitting forms and confirming actions</li>
          <li>Triggering navigation or state changes</li>
          <li>Opening dialogs, modals, or menus</li>
          <li>Performing CRUD operations</li>
          <li>Call-to-action elements in marketing sections</li>
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
        <tr><td>Container</td><td>Clickable surface with padding and border radius</td></tr>
        <tr><td>Label</td><td>Action text describing what the button does</td></tr>
        <tr><td>Leading Icon</td><td>Optional icon before the label</td></tr>
        <tr><td>Trailing Icon</td><td>Optional icon after the label</td></tr>
        <tr><td>Loading Indicator</td><td>Spinner replacing icon during async actions</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook.delhivery.com/storybook/sb/iframe.html?id=tarmac-tds-button--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="button example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>XLarge (48px)</td><td>Hero sections and primary CTAs</td></tr>
        <tr><td>Large (44px)</td><td>Form submissions</td></tr>
        <tr><td>Regular (36px)</td><td>Default for most contexts</td></tr>
        <tr><td>Small (28px)</td><td>Inline actions</td></tr>
        <tr><td>XSmall (24px)</td><td>Dense toolbars</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Resting, ready for interaction</td></tr>
        <tr><td>Hover</td><td>Cursor over the button</td></tr>
        <tr><td>Pressed</td><td>Active click state</td></tr>
        <tr><td>Focused</td><td>Keyboard focus ring visible</td></tr>
        <tr><td>Disabled</td><td>Non-interactive, muted</td></tr>
        <tr><td>Loading</td><td>Async action in progress</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="button" />
    </>
  );
}


function GuidelinesTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Usage Guidelines</h2>
        <p className="text-gray-700 mb-4">
          Use buttons to trigger actions. Establish a clear visual hierarchy using
          types: Filled for primary actions, Outlined for secondary, Text for tertiary.
          Limit primary buttons to one per section.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>To trigger an immediate action (submit, save, delete)</li>
          <li>As the primary CTA in a form or dialog</li>
          <li>For navigation that feels like an action</li>
          <li>To open menus, dialogs, or other overlays</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For navigation links — use Anchor/Link component</li>
          <li>For toggling options — use Toggle or Checkbox</li>
          <li>For non-interactive labels — use Badge</li>
          <li>For inline text actions — use Link component</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage title="Button hierarchy guidelines" slug="component" section="guideline" />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Use action verbs for labels (Save, Submit, Delete)',
              'Limit one primary (Filled) button per section',
              'Use consistent sizing within the same context',
              'Show loading state for async operations',
            ]}
            dontItems={[
              'Use vague labels like "Click here" or "OK"',
              'Place multiple primary buttons side by side',
              'Disable without explaining why',
              'Use icon-only buttons without a tooltip',
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
          <li>Uses native <code>&lt;button&gt;</code> element for built-in semantics</li>
          <li><code>aria-disabled="true"</code> when disabled (preserves focusability)</li>
          <li><code>aria-busy="true"</code> during loading state</li>
          <li><code>aria-label</code> for icon-only buttons</li>
          <li><code>aria-pressed</code> for toggle button behavior</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus to/from the button</li>
          <li><kbd>Enter</kbd> — Activates the button</li>
          <li><kbd>Space</kbd> — Activates the button</li>
          <li>Disabled buttons remain focusable for discoverability</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Announces button label and role automatically</li>
          <li>Loading state announces &ldquo;Loading&rdquo; via aria-busy</li>
          <li>Disabled state is communicated to assistive technology</li>
          <li>Icon-only buttons announce their aria-label</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function ButtonPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Button"
      description="Primary interactive element for triggering actions. Supports multiple emphasis levels, sizes, and states."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
