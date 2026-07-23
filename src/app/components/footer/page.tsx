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
    version: '1.1.0',
    date: 'June 2026',
    changes: [{ category: 'Changed', items: ['Added stacked CTA variant for mobile viewports', 'Improved divider styling consistency', 'Fixed button alignment in RTL layouts'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Footer component', 'Support for Single CTA, Dual CTA, and Stacked variants', 'Divider and container styling options'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Footer is the bottom section of popups, sheets, and dialog boxes that contains
          action buttons. It provides a consistent placement for primary and secondary
          actions, helping users understand what actions are available to complete or
          dismiss a workflow.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Confirm/Cancel actions in dialog boxes</li>
          <li>Submit/Reset actions in form sheets</li>
          <li>Navigation actions in multi-step flows</li>
          <li>Single action confirmations in popups</li>
          <li>Stacked actions on mobile bottom sheets</li>
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
            src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-popup--playground&viewMode=story&shortcuts=false"
            style={{ width: '100%', height: '300px', border: 'none', display: 'block' }}
            title="Footer interactive example"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Anatomy</h2>
        <p className="text-gray-700 mb-4">
          The Footer component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Container</strong> — Bottom-aligned wrapper with padding and background</li>
          <li><strong>Primary Action</strong> — Main CTA button (e.g., Save, Confirm)</li>
          <li><strong>Secondary Action</strong> — Optional secondary button (e.g., Cancel)</li>
          <li><strong>Divider</strong> — Top border separating footer from body content</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Single CTA</strong> — One primary action button</li>
          <li><strong>Dual CTA</strong> — Primary and secondary buttons side by side</li>
          <li><strong>Stacked</strong> — Buttons stacked vertically for narrow viewports</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="footer" />
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
          <GuidelineImage title="Footer usage overview" slug="footer" section="usage" />
          <GuidelineImage title="Footer when to use" slug="footer" section="when-to-use" />
        <GuidelineImage title="When to use Footer" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When a popup or sheet requires user action to proceed</li>
          <li>When both confirm and dismiss actions are needed</li>
          <li>When actions need clear visual separation from content</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
          <GuidelineImage title="Footer when not to use" slug="footer" section="when-not-to-use" />
        <GuidelineImage title="When not to use Footer" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For page-level footers — use a page layout footer</li>
          <li>For inline form actions — place buttons within the form</li>
          <li>For read-only content — a close button in header suffices</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Do&apos;s and Don&apos;ts</h2>
        <DoDont
          doItems={[
            'Place primary action on the right (LTR) or left (RTL)',
            'Use clear, action-oriented button labels',
            'Keep footer actions to a maximum of two buttons',
            'Use stacked layout on mobile when buttons are long',
          ]}
          dontItems={[
            'Add more than two action buttons',
            'Use vague labels like "OK" or "Click Here"',
            'Place destructive actions as the primary CTA without warning',
            'Hide the footer behind scrollable content',
          ]}
        />
      </section>
    </div>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Footer } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Footer />`}</code></pre>
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
          <li>Footer buttons inherit dialog&apos;s ARIA context</li>
          <li>Primary action has appropriate <code>aria-label</code> if icon-only</li>
          <li>Destructive actions include <code>aria-describedby</code> linking to warning text</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus between footer buttons</li>
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> — Activates focused button</li>
          <li>Focus is trapped within the parent dialog/sheet</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Button labels clearly describe the action outcome</li>
          <li>Buttons announce their role and state</li>
          <li>Footer context is understood within the parent container</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function FooterPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Footer"
      description="Bottom section of popups and sheets containing action buttons. Provides consistent placement for primary and secondary actions."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
