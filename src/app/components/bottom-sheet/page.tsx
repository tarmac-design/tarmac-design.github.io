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
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-bottomsheet--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="bottom-sheet example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
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
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <>
          <h2>Usage</h2>
          <p>Focused tasks on mobile without navigation change. Thumb-friendly, progressive disclosure.</p>
          <GuidelineImage title="Bottom Sheet usage" slug="bottom-sheet" section="usage" />

          <h2>When to Use</h2>
          <ul>
            <li>Short tasks and confirmations on mobile</li>
            <li>Action sheets with contextual options</li>
            <li>Form sections or filters on handheld devices</li>
            <li>Quick previews without navigating away</li>
          </ul>

          <h2>When Not to Use</h2>
          <ul>
            <li>On desktop — use Drawer or Modal instead</li>
            <li>Complex multi-step flows — use full pages</li>
            <li>Nested sheets — never nest one inside another</li>
            <li>Full-screen for simple tasks — keep it minimal</li>
          </ul>

          <h2>Do&apos;s and Don&apos;ts</h2>
          <DoDont slug="bottom-sheet"
            doItems={[
              'Include a drag handle for swipe affordance',
              'Use overlay/backdrop to indicate modality',
              'Allow swipe dismiss in addition to close button',
              'Keep action items under 5 for readability',
            ]}
            dontItems={[
              "Don't nest sheets within sheets",
              "Don't hide all dismiss gestures — always provide a way out",
              "Don't use full-screen height for simple tasks",
              "Don't use on desktop when Drawer/Modal works better",
            ]}
          />
        </>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { BottomSheet } from '@tarmac/design-system';`}</code></pre>

          <h2>Rules</h2>
          <table>
            <thead><tr><th>#</th><th>Rule</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Render via portal — never inside scrollable containers</td></tr>
              <tr><td>2</td><td>Trap focus inside when open</td></tr>
              <tr><td>3</td><td>Implement ALL dismiss paths (swipe/overlay tap/close button/escape)</td></tr>
              <tr><td>4</td><td>Set <code>aria-modal=&quot;true&quot;</code> and <code>aria-labelledby</code></td></tr>
              <tr><td>5</td><td>Return focus to trigger element on close</td></tr>
              <tr><td>6</td><td>Body content scrolls independently — header/footer stay fixed</td></tr>
            </tbody>
          </table>

          <h2>Props</h2>
          <table>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>open</td><td>boolean</td><td>required</td><td>Controls visibility</td></tr>
              <tr><td>onDismiss</td><td>callback</td><td>required</td><td>Fires on any dismiss path</td></tr>
              <tr><td>variant</td><td>{`"standard" | "slotMini" | "slotDual" | "slot"`}</td><td>{`"standard"`}</td><td>Layout variant</td></tr>
              <tr><td>ctaLayout</td><td>{`"horizontal" | "vertical"`}</td><td>{`"horizontal"`}</td><td>CTA button arrangement</td></tr>
              <tr><td>title</td><td>string</td><td>undefined</td><td>Header title text</td></tr>
              <tr><td>hasClose</td><td>boolean</td><td>true</td><td>Show close icon in header</td></tr>
              <tr><td>hasBanner</td><td>boolean</td><td>false</td><td>Show banner image area</td></tr>
              <tr><td>hasCheckbox</td><td>boolean</td><td>false</td><td>Show checkbox in content</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>required</td><td>Body content</td></tr>
            </tbody>
          </table>

          <h2>Basic Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<BottomSheet open={show} onDismiss={close} title="Confirm">
  Are you sure?
</BottomSheet>`}</code></pre>

          <h2>Advanced Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<BottomSheet
  open={show}
  onDismiss={close}
  variant="slotDual"
  ctaLayout="vertical"
  title="Create Shipment"
  hasClose
  hasBanner
>
  <StepForm />
</BottomSheet>`}</code></pre>
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
