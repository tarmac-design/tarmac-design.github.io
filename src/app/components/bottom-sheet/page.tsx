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
    changes: [{ category: 'Changed', items: ['Added Advanced and Empty State variants', 'Improved drag handle gesture responsiveness', 'Fixed footer CTA alignment in vertical mode'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Bottom Sheet component', 'Standard, Slot Mini, Slot Dual, and Slot variants', 'Horizontal and Vertical CTA styles', 'Configurable boolean properties for header and content'] }],
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
    <>
      <h2>Component Structure</h2>
      <table><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody>
        <tr><td>Drag Handle</td><td>Swipe affordance at the top</td></tr>
        <tr><td>Header</td><td>Title + optional close icon and leading icon</td></tr>
        <tr><td>Body Content</td><td>Scrollable area with text, slots, or custom content</td></tr>
        <tr><td>Footer CTA</td><td>Primary and secondary action buttons</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook.delhivery.com/storybook/sb/iframe.html?id=tarmac-tds-bottomsheet--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="bottom-sheet example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Web</td><td>724px width, dynamic height</td></tr>
        <tr><td>Mobile</td><td>346px width, dynamic height</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Collapsed</td><td>Sheet hidden below viewport</td></tr>
        <tr><td>Expanded</td><td>Sheet visible with content</td></tr>
        <tr><td>Completed</td><td>V2 only — marks finished step</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="bottom-sheet" />
    </>
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
        <GuidelineImage title="Bottom sheet usage guidelines" slug="component" section="guideline" />
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
