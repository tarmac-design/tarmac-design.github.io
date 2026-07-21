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
    changes: [{ category: 'Changed', items: ['Added Custom Content variant for flexible layouts', 'Improved backdrop click behavior with configurable dismiss', 'Fixed focus trap edge case with nested interactive elements'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Dialog Box component', 'Confirmation, Alert, and Form variants', 'Small, Medium, and Large size options', 'Overlay backdrop with focus trapping'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Dialog Box is a modal overlay for critical decisions requiring immediate user
          attention. It blocks interaction with background content, ensuring users
          acknowledge or respond to the dialog before continuing their workflow.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Confirming destructive actions (delete, discard changes)</li>
          <li>Displaying critical alerts requiring acknowledgment</li>
          <li>Collecting focused input through embedded forms</li>
          <li>Presenting important information that cannot be ignored</li>
          <li>Requesting authentication or permission confirmations</li>
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
          The Dialog Box component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Overlay Backdrop</strong> — Semi-transparent layer blocking background</li>
          <li><strong>Container</strong> — Centered dialog surface</li>
          <li><strong>Header</strong> — Title and optional close button</li>
          <li><strong>Body Content</strong> — Message text, form, or custom content</li>
          <li><strong>Footer</strong> — Primary CTA and optional Secondary CTA</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Confirmation</strong> — Asks user to confirm or cancel an action</li>
          <li><strong>Alert</strong> — Displays important information requiring acknowledgment</li>
          <li><strong>Form</strong> — Contains form fields for focused input collection</li>
          <li><strong>Custom Content</strong> — Flexible layout for any content type</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Small</strong> — Compact dialog for simple confirmations</li>
          <li><strong>Medium</strong> — Default size for most use cases</li>
          <li><strong>Large</strong> — Expanded dialog for forms and complex content</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="dialog-box" />
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
          Dialogs interrupt the user flow, so use them sparingly and only for actions
          that require explicit user decision. Keep dialog content focused and provide
          clear action labels.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For irreversible actions that need explicit confirmation</li>
          <li>When displaying critical information users must acknowledge</li>
          <li>For focused form inputs that benefit from isolation</li>
          <li>When blocking the background context is intentional</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For non-critical information — use Alert or Snackbar</li>
          <li>For simple messages — use inline alerts instead</li>
          <li>For content browsing — use Drawer or page navigation</li>
          <li>When the action is easily reversible (e.g., undo available)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage title="Dialog box usage guidelines" slug="component" section="guideline" />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Use clear, specific action labels (e.g., "Delete" not "OK")',
              'Keep dialog content concise and focused',
              'Provide a non-destructive way to dismiss (Cancel, X)',
              'Use the appropriate size for the content amount',
            ]}
            dontItems={[
              'Stack dialogs on top of other dialogs',
              'Use generic labels like "OK" / "Cancel" for all actions',
              'Put excessive content requiring scrolling in a dialog',
              'Use dialogs for routine, non-critical notifications',
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
          <li><code>role="dialog"</code> on the dialog container</li>
          <li><code>aria-modal="true"</code> to indicate modal behavior</li>
          <li><code>aria-labelledby</code> pointing to the dialog title</li>
          <li><code>aria-describedby</code> pointing to the body content</li>
          <li><code>aria-label="Close"</code> on the close button</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Escape</kbd> — Closes the dialog (unless prevent-close is set)</li>
          <li><kbd>Tab</kbd> — Cycles focus within the dialog (focus trap)</li>
          <li><kbd>Shift+Tab</kbd> — Cycles focus backwards within dialog</li>
          <li>Focus moves to first focusable element on open</li>
          <li>Focus returns to trigger element on close</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Announces dialog title when opened</li>
          <li>Background content is marked as inert</li>
          <li>Action buttons clearly describe their outcomes</li>
          <li>Close button announces its purpose</li>
          <li>Alert variant uses <code>role="alertdialog"</code> for urgency</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function DialogBoxPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Dialog Box"
      description="Modal overlay for critical decisions requiring immediate user attention. Blocks interaction with background content."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
