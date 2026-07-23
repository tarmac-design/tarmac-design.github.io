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
    changes: [{ category: 'Changed', items: ['Added dismissible variant with skip-all option', 'Improved highlight cutout positioning accuracy', 'Fixed step indicator animation between steps'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Coachmarks component', 'Single step and Multi-step variants', 'Highlight area with tooltip bubble', 'Step indicator and navigation controls'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Coachmarks are guided onboarding overlays that highlight UI features step-by-step.
          They are used to introduce new features or guide first-time users through
          an interface, drawing attention to specific elements with explanatory tooltips.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Onboarding new users to key application features</li>
          <li>Introducing newly released functionality</li>
          <li>Guiding users through complex workflows</li>
          <li>Highlighting hidden or non-obvious UI elements</li>
          <li>Feature discovery for advanced capabilities</li>
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
        <tr><td>Highlight Area</td><td>Focused region of the UI being explained</td></tr>
        <tr><td>Tooltip Bubble</td><td>Content card with title and description</td></tr>
        <tr><td>Step Indicator</td><td>Progress dots showing current step</td></tr>
        <tr><td>Navigation</td><td>Next, Previous, Skip controls</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-coachmarks--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="coachmarks example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Standard tooltip sizing</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Active</td><td>Currently showing a step</td></tr>
        <tr><td>Completed</td><td>Step has been viewed</td></tr>
        <tr><td>Dismissed</td><td>User skipped the tour</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="coachmarks" />
    </>
  );
}


function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Usage Guidelines</h2>
        <p className="text-gray-700 mb-4">
          Coachmarks should be used sparingly for genuinely helpful onboarding.
          Keep tours short (3-5 steps max), provide clear skip options, and
          never block critical user flows.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For first-time user onboarding to key features</li>
          <li>When introducing significant UI changes</li>
          <li>For complex workflows that benefit from guidance</li>
          <li>To highlight non-obvious but valuable features</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For obvious UI elements that don&apos;t need explanation</li>
          <li>As a substitute for good UX design</li>
          <li>For marketing or promotional content</li>
          <li>When users have already completed onboarding</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage title="Coachmarks usage guidelines" slug="component" section="guideline" />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Keep tours to 3-5 steps maximum',
              'Always provide a skip/dismiss option',
              'Show coachmarks only once per user (remember dismissal)',
              'Point to visible, on-screen elements only',
            ]}
            dontItems={[
              'Create long tours with 10+ steps',
              'Block users from skipping the tour',
              'Show coachmarks on every visit',
              'Point to elements that are off-screen or hidden',
            ]}
          />
        </div>
      </section>
    </div>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Coachmarks } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Coachmarks />`}</code></pre>
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
          <li><code>role="dialog"</code> on the tooltip bubble</li>
          <li><code>aria-modal="false"</code> (non-modal overlay)</li>
          <li><code>aria-labelledby</code> pointing to the tooltip title</li>
          <li><code>aria-describedby</code> pointing to the description</li>
          <li>Navigation buttons have descriptive <code>aria-label</code></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus between navigation buttons</li>
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> — Activates Next/Previous/Skip</li>
          <li><kbd>Escape</kbd> — Dismisses the coachmark tour</li>
          <li>Focus is managed to the tooltip on each step</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Announces tooltip title and description on each step</li>
          <li>Step progress is announced (e.g., "Step 2 of 5")</li>
          <li>Navigation buttons clearly describe their actions</li>
          <li>Dismissal is confirmed through announcement</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function CoachmarksPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Coachmarks"
      description="Guided onboarding overlays that highlight UI features step-by-step. Used to introduce new features or guide first-time users."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
