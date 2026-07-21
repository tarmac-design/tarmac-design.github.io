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
    changes: [{ category: 'Changed', items: ['Added Coal and White variant options', 'Improved dismissible animation transition', 'Fixed icon alignment in small size variant'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Alert component', 'Support for Success, Error, Warning, Info, and Black variants', 'Default (filled) and Outlined types', 'Large, Medium, and Small sizes'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Alerts are inline feedback messages used to communicate system status, confirm actions,
          or display important information to users. They provide contextual feedback about
          success, error, warning, or informational states without interrupting the user flow.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Confirming a successful form submission or action</li>
          <li>Displaying error messages when an operation fails</li>
          <li>Warning users about potential issues or required attention</li>
          <li>Communicating informational messages about system state</li>
          <li>Showing non-blocking notifications inline within page content</li>
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
        <tr><td>Container</td><td>Wraps the alert content with appropriate background and border</td></tr>
        <tr><td>Icon</td><td>Status indicator icon (success, error, warning, info)</td></tr>
        <tr><td>Title</td><td>Optional bold heading text</td></tr>
        <tr><td>Description</td><td>Body message explaining the alert</td></tr>
        <tr><td>Actions</td><td>Optional CTA buttons for user response</td></tr>
        <tr><td>Close Button</td><td>Dismisses the alert when clicked</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook.delhivery.com/storybook/sb/iframe.html?id=tarmac-tds-alert--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="alert example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Large</td><td>Default — spacious padding for prominent alerts</td></tr>
        <tr><td>Medium</td><td>Balanced for inline usage</td></tr>
        <tr><td>Small</td><td>Compact for dense layouts</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Static informational display</td></tr>
        <tr><td>Dismissible</td><td>User can close the alert</td></tr>
        <tr><td>With CTAs</td><td>Includes action buttons</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="alert" />
    </>
  );
}


function GuidelinesTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Usage Guidelines</h2>
        <p className="text-gray-700 mb-4">
          Alerts should be used to communicate important system information inline within the
          page content. Choose the appropriate variant based on the severity and type of message.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When confirming that an action was completed successfully</li>
          <li>When an error occurs that the user needs to be aware of</li>
          <li>When there is a warning about a potential issue</li>
          <li>When providing contextual system information</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For temporary toast-style notifications — use Snackbar instead</li>
          <li>For form field-level validation — use inline error messages</li>
          <li>For blocking user interaction — use Dialog Box instead</li>
          <li>For non-critical, decorative messaging</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage title="Alert placement guidelines" slug="component" section="guideline" />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Use concise, actionable messaging',
              'Place alerts near the relevant content',
              'Use the appropriate variant for the message type',
              'Include a dismiss action for non-critical alerts',
            ]}
            dontItems={[
              'Stack multiple alerts of the same type',
              'Use alerts for decorative purposes',
              'Write overly long alert descriptions',
              'Use error alerts for warnings or informational messages',
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
          <li><code>role="alert"</code> for critical error/warning messages</li>
          <li><code>role="status"</code> for informational or success messages</li>
          <li><code>aria-live="polite"</code> for non-urgent alerts</li>
          <li><code>aria-live="assertive"</code> for critical error alerts</li>
          <li><code>aria-label</code> on close button for dismiss action</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus to action button or close button</li>
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> — Activates focused button</li>
          <li><kbd>Escape</kbd> — Dismisses the alert if dismissible</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Alert content is announced automatically when using <code>role="alert"</code></li>
          <li>Icon meaning is conveyed through accessible text, not relied upon visually</li>
          <li>Close button has descriptive label (e.g., "Dismiss alert")</li>
          <li>Action buttons clearly describe their purpose</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function AlertPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Alert"
      description="Inline feedback messages for success, error, warning, or info states. Used to communicate system status, confirm actions, or display important information."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
