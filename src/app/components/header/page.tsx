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
    changes: [{ category: 'Changed', items: ['Added support for custom action buttons in header', 'Improved close button hit area for touch targets', 'Fixed subtitle truncation on narrow viewports'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Header component', 'Support for Simple, With subtitle, and With actions variants', 'Close button and leading icon options'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Header is the top section of popups, sheets, and dialog boxes that displays
          the title, optional subtitle, and control actions like close. It provides
          context about the overlay content and a consistent way to dismiss it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Titling dialog boxes and confirmation modals</li>
          <li>Providing context in side drawers</li>
          <li>Displaying section titles in bottom sheets</li>
          <li>Adding close and action controls to overlays</li>
          <li>Showing back navigation in multi-step popups</li>
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
            title="Header interactive example"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Anatomy</h2>
        <p className="text-gray-700 mb-4">
          The Header component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Container</strong> — Top-aligned wrapper with padding and background</li>
          <li><strong>Title</strong> — Primary heading text for the overlay</li>
          <li><strong>Subtitle</strong> — Optional secondary descriptive text</li>
          <li><strong>Close Button</strong> — Action to dismiss the overlay</li>
          <li><strong>Leading Icon</strong> — Optional icon before the title (e.g., back arrow)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Simple</strong> — Title and close button only</li>
          <li><strong>With Subtitle</strong> — Title, subtitle, and close button</li>
          <li><strong>With Actions</strong> — Title with additional action buttons</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="header" />
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
          <GuidelineImage title="Header usage overview" slug="header" section="usage" />
          <GuidelineImage title="Header when to use" slug="header" section="when-to-use" />
        <GuidelineImage title="When to use Header" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When an overlay needs a clear title and dismiss action</li>
          <li>When additional context (subtitle) helps user understanding</li>
          <li>When the popup has actions beyond just close</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
          <GuidelineImage title="Header when not to use" slug="header" section="when-not-to-use" />
        <GuidelineImage title="When not to use Header" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For page-level headers — use a page layout header</li>
          <li>For simple tooltips — no header is needed</li>
          <li>For snackbar messages — they have their own structure</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Do&apos;s and Don&apos;ts</h2>
        <DoDont
          doItems={[
            'Keep titles concise and descriptive',
            'Always include a close button for dismissibility',
            'Use subtitle for additional context when needed',
            'Maintain consistent header height across overlays',
          ]}
          dontItems={[
            'Use long titles that wrap to multiple lines',
            'Omit the close button on dismissible overlays',
            'Place too many actions in the header',
            'Use header for decorative purposes without meaningful title',
          ]}
        />
      </section>
    </div>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Header } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Header />`}</code></pre>
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
          <li>Title is referenced by parent dialog&apos;s <code>aria-labelledby</code></li>
          <li>Subtitle is referenced by <code>aria-describedby</code> when present</li>
          <li>Close button has <code>aria-label="Close"</code></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus to close button and action buttons</li>
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> — Activates close or action button</li>
          <li><kbd>Escape</kbd> — Triggers close action (handled by parent dialog)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Title is announced when dialog opens</li>
          <li>Close button clearly announces its dismiss action</li>
          <li>Action buttons describe their specific purpose</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function HeaderPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Header"
      description="Top section of popups and sheets displaying title, subtitle, and control actions. Provides context and dismissibility for overlay content."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
