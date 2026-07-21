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
      'Added Advanced and Empty State variants',
      'Improved drag handle gesture responsiveness',
      'Fixed footer CTA alignment in vertical mode',
    ],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [
      'Initial release of Bottom Sheet component',
      'Standard, Slot Mini, Slot Dual, and Slot variants',
      'Horizontal and Vertical CTA styles',
      'Configurable boolean properties for header and content',
    ],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Bottom Sheet is a modal surface that slides up from the bottom of the screen
          for focused tasks on mobile. It supports informational content, slot-based
          layouts, and flexible CTA arrangements to accommodate various interaction patterns.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Presenting contextual actions or options on mobile</li>
          <li>Showing additional details without navigating away</li>
          <li>Collecting quick input (filters, sort options)</li>
          <li>Displaying informational content with CTA actions</li>
          <li>Slot-based product or content previews</li>
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
          The Bottom Sheet component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Drag Handle</strong> — Visual indicator for swipe-to-dismiss gesture</li>
          <li><strong>Header</strong> — Title, Close button, and optional Leading Icon</li>
          <li><strong>Info Banner</strong> — Optional informational banner below header</li>
          <li><strong>Divider</strong> — Visual separator between sections</li>
          <li><strong>Snackbar</strong> — Optional inline notification area</li>
          <li><strong>Tab Group</strong> — Optional tabbed content navigation</li>
          <li><strong>Body Content</strong> — Main scrollable content area</li>
          <li><strong>Slot Area</strong> — Configurable slot for custom content</li>
          <li><strong>Footer CTA</strong> — Action buttons at the bottom</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Standard</strong> — Default bottom sheet with header and body</li>
          <li><strong>Slot Mini</strong> — Compact slot-based layout</li>
          <li><strong>Slot Dual</strong> — Two-slot layout side by side</li>
          <li><strong>Slot</strong> — Single prominent slot layout</li>
          <li><strong>Advanced</strong> — Full-featured with tabs and multiple sections</li>
          <li><strong>Empty State</strong> — Placeholder for no-content scenarios</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">CTA Styles</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Horizontal</strong> — Inline buttons side by side</li>
          <li><strong>Vertical</strong> — Stacked full-width buttons</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Boolean Properties</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>hasIcon</strong> — Shows leading icon in header</li>
          <li><strong>hasClose</strong> — Shows close button in header</li>
          <li><strong>hasBanner</strong> — Shows info banner section</li>
          <li><strong>hasCheckbox</strong> — Includes checkbox in content</li>
          <li><strong>hasSecondaryAction</strong> — Shows secondary CTA button</li>
          <li><strong>hasSlot</strong> — Enables slot content area</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="bottom-sheet" />
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
          Bottom sheets are primarily for mobile interfaces. Use them for focused tasks
          that don&apos;t require full-page navigation. Keep content concise and actions clear.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For contextual actions that don&apos;t need a full page</li>
          <li>When showing additional details on mobile</li>
          <li>For filter/sort options in mobile lists</li>
          <li>Quick forms or confirmations on mobile</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>On desktop — use Dialog or Drawer instead</li>
          <li>For complex multi-step flows — use full pages</li>
          <li>For critical blocking decisions — use Dialog Box</li>
          <li>When content exceeds 80% of viewport height</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage
          src="/assets/guidelines/bottom-sheet-usage.png"
          alt="Bottom sheet usage guidelines"
        />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Keep content focused on a single task',
              'Always provide a way to dismiss (drag, close button, backdrop tap)',
              'Use appropriate CTA style based on action count',
              'Limit content height to avoid full-screen overlap',
            ]}
            dontItems={[
              'Nest bottom sheets within other bottom sheets',
              'Use for content that requires extensive scrolling',
              'Remove all dismiss mechanisms',
              'Use on desktop when better alternatives exist',
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
          <li><code>role="dialog"</code> on the bottom sheet container</li>
          <li><code>aria-modal="true"</code> to indicate modal behavior</li>
          <li><code>aria-labelledby</code> pointing to the header title</li>
          <li><code>aria-describedby</code> pointing to body content if applicable</li>
          <li><code>aria-label="Close"</code> on the close button</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Escape</kbd> — Dismisses the bottom sheet</li>
          <li><kbd>Tab</kbd> — Cycles focus within the bottom sheet (trapped)</li>
          <li>Focus is moved to the first focusable element on open</li>
          <li>Focus returns to trigger element on close</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Announces dialog title when opened</li>
          <li>Background content is inert and not navigable</li>
          <li>Close button has descriptive accessible label</li>
          <li>CTA buttons clearly describe their actions</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function BottomSheetPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Bottom Sheet"
      description="Modal surface sliding up from bottom for focused tasks on mobile. Supports informational, slot-based, and flexible CTA arrangements."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
