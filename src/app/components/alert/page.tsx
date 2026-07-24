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
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-alert--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="alert example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
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
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <>
          <h2>Usage</h2>
          <p>Inline feedback for system status. Place prominently — never hide alerts behind interactions.</p>
          <GuidelineImage title="Alert placement guidelines" slug="alert" section="usage" />

          <h2>When to Use</h2>
          <GuidelineImage title="Alert when to use" slug="alert" section="when-to-use" />
          <ul>
            <li>Confirm actions completed successfully</li>
            <li>Display errors when an operation fails</li>
            <li>Warn users about potential issues</li>
            <li>Provide contextual system information</li>
          </ul>

          <h2>When Not to Use</h2>
          <GuidelineImage title="Alert when not to use" slug="alert" section="when-not-to-use" />
          <ul>
            <li>Decorative banners without semantic meaning</li>
            <li>Transient notifications — use Snackbar instead</li>
            <li>Navigation or routing</li>
            <li>Form field-level validation — use inline error messages</li>
          </ul>

          <h2>Do&apos;s and Don&apos;ts</h2>
          <DoDont slug="alert"
            doItems={[
              'Use semantic colors matching the message type',
              'Keep the message concise and actionable',
              'Include actions when the user can resolve the issue',
              'Place alerts near the relevant content',
            ]}
            dontItems={[
              "Don't stack multiple alerts of the same type",
              "Don't use alerts for non-critical decorative info",
              "Don't auto-dismiss error alerts — users need time to read them",
              "Don't write overly long descriptions",
            ]}
          />
        </>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Alert } from '@tarmac/design-system';`}</code></pre>

          <h2>Rules</h2>
          <table>
            <thead><tr><th>#</th><th>Rule</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Always set <code>variant</code> matching message severity</td></tr>
              <tr><td>2</td><td>Use <code>onClose</code> callback for dismissible alerts</td></tr>
              <tr><td>3</td><td>Error alerts must NOT auto-dismiss</td></tr>
              <tr><td>4</td><td>Use <code>aria-live=&quot;polite&quot;</code> for dynamically inserted alerts</td></tr>
              <tr><td>5</td><td>Keep description under 2 lines — link out for details</td></tr>
            </tbody>
          </table>

          <h2>Props</h2>
          <table>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>variant</td><td>{`"success" | "error" | "warning" | "info" | "black" | "white" | "coal"`}</td><td>required</td><td>Semantic color variant</td></tr>
              <tr><td>title</td><td>string</td><td>undefined</td><td>Optional bold heading text</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>required</td><td>Body message content</td></tr>
              <tr><td>size</td><td>{`"lg" | "md" | "sm"`}</td><td>{`"md"`}</td><td>Controls padding and spacing</td></tr>
              <tr><td>type</td><td>{`"default" | "outlined"`}</td><td>{`"default"`}</td><td>Fill style</td></tr>
              <tr><td>dismissible</td><td>boolean</td><td>false</td><td>Shows close button</td></tr>
              <tr><td>onClose</td><td>callback</td><td>undefined</td><td>Fires when dismiss button clicked</td></tr>
              <tr><td>actions</td><td>ReactNode</td><td>undefined</td><td>Slot for CTA buttons</td></tr>
            </tbody>
          </table>

          <h2>Basic Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Alert variant="success">Order confirmed</Alert>`}</code></pre>

          <h2>Advanced Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Alert
  variant="error"
  title="Payment failed"
  dismissible
  onClose={retry}
  actions={<Button size="sm">Retry</Button>}
>
  Card was declined. Try another method.
</Alert>`}</code></pre>
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
