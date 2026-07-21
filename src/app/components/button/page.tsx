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
    changes: [
      'Added Ghost and Loading states',
      'Improved focus ring visibility across all variants',
      'Fixed icon alignment in XSmall size',
    ],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [
      'Initial release of Button component',
      'Support for 8 color variants',
      'Standard, Outlined, and Text types',
      'Five size options from XSmall to XLarge',
    ],
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
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Anatomy</h2>
        <p className="text-gray-700 mb-4">
          The Button component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Container</strong> — Clickable area with background and border</li>
          <li><strong>Label</strong> — Text content describing the action</li>
          <li><strong>Leading Icon</strong> — Optional icon before the label</li>
          <li><strong>Trailing Icon</strong> — Optional icon after the label</li>
          <li><strong>Loading Indicator</strong> — Spinner replacing content during loading</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Black</strong> — High-contrast primary action</li>
          <li><strong>White</strong> — Light variant for dark backgrounds</li>
          <li><strong>Coal</strong> — Subtle dark-toned button</li>
          <li><strong>DLV Red</strong> — Brand-colored emphasis button</li>
          <li><strong>Info</strong> — Blue informational action</li>
          <li><strong>Success</strong> — Green positive/confirm action</li>
          <li><strong>Error</strong> — Red destructive/danger action</li>
          <li><strong>Warning</strong> — Amber caution action</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Types</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Standard (Filled)</strong> — Solid background, highest emphasis</li>
          <li><strong>Outlined</strong> — Border-only, medium emphasis</li>
          <li><strong>Text</strong> — No background or border, lowest emphasis</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>XLarge</strong> — 48px height, hero sections and prominent CTAs</li>
          <li><strong>Large</strong> — 44px height, form submissions and modals</li>
          <li><strong>Regular</strong> — 36px height, default for most contexts</li>
          <li><strong>Small</strong> — 28px height, compact toolbars and cards</li>
          <li><strong>XSmall</strong> — 24px height, inline and dense layouts</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">States</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Default</strong> — Resting state</li>
          <li><strong>Hover</strong> — Mouse hover interaction</li>
          <li><strong>Pressed</strong> — Active/pressed down state</li>
          <li><strong>Focused</strong> — Keyboard focus visible</li>
          <li><strong>Disabled</strong> — Non-interactive, reduced opacity</li>
          <li><strong>Ghost</strong> — Loading skeleton placeholder</li>
          <li><strong>Loading</strong> — Spinner indicating async operation</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="button" />
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
        <GuidelineImage
          src="/assets/guidelines/button-hierarchy.png"
          alt="Button hierarchy guidelines"
        />
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
