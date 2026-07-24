'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { RoleToggle } from '@/components/RoleToggle';
import { GuidelineImage } from '@/components/GuidelineImage';

const changelogEntries: ChangelogEntry[] = [
  {
    version: '1.1.0',
    date: 'June 2026',
    changes: [{ category: 'Changed', items: ['Added auto-resize variant', 'Improved character count accessibility', 'Fixed scroll behavior on focus'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Input Area component', 'Support for Default, With counter, and Auto-resize variants', 'All interaction states supported'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Input Area is a multi-line text input (textarea) for collecting longer-form user
          content. It supports labels, character counts, helper text, and auto-resize
          behavior. Use it when users need to enter text that may span multiple lines.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Writing descriptions or notes</li>
          <li>Composing messages or comments</li>
          <li>Entering addresses or multi-line data</li>
          <li>Feedback or review text fields</li>
          <li>Code or configuration input areas</li>
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
            src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-textarea--playground&viewMode=story&shortcuts=false"
            style={{ width: '100%', height: '300px', border: 'none', display: 'block' }}
            title="Input Area interactive example"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Anatomy</h2>
        <p className="text-gray-700 mb-4">
          The Input Area component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Container</strong> — Wrapper with border, padding, and resize handle</li>
          <li><strong>Label</strong> — Descriptive text above the textarea</li>
          <li><strong>Textarea</strong> — The multi-line text entry area</li>
          <li><strong>Helper Text</strong> — Additional guidance below the textarea</li>
          <li><strong>Character Count</strong> — Current/max character indicator</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Default</strong> — Fixed-height textarea with scroll</li>
          <li><strong>With Counter</strong> — Shows character count and limit</li>
          <li><strong>Auto-resize</strong> — Grows vertically as content expands</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">States</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Default</strong> — Inactive, waiting for input</li>
          <li><strong>Focused</strong> — Active with cursor and highlighted border</li>
          <li><strong>Error</strong> — Validation failed with error message</li>
          <li><strong>Disabled</strong> — Non-interactive, muted appearance</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="input-area" />
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
          <GuidelineImage title="Input Area usage overview" slug="input-area" section="usage" />
          <GuidelineImage title="Input Area when to use" slug="input-area" section="when-to-use" />
        <GuidelineImage title="When to use Input Area" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When users need to enter multiple lines of text</li>
          <li>When the expected content length varies significantly</li>
          <li>When character limits need to be communicated</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
          <GuidelineImage title="Input Area when not to use" slug="input-area" section="when-not-to-use" />
        <GuidelineImage title="When not to use Input Area" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For single-line text — use Input component</li>
          <li>For rich text editing — use a rich text editor</li>
          <li>For code editing — use a code editor component</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Do&apos;s and Don&apos;ts</h2>
        <DoDont
          doItems={[
            'Set appropriate initial height based on expected content',
            'Show character count when limits apply',
            'Use auto-resize for better content visibility',
            'Provide clear placeholder text as guidance',
          ]}
          dontItems={[
            'Make the textarea too small for expected content',
            'Disable resize when users may need more space',
            'Use textarea for single-line inputs',
            'Hide character limit until it is exceeded',
          ]}
        />
      </section>
    </div>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { InputArea } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<InputArea />`}</code></pre>
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
          <li><code>aria-label</code> or <code>aria-labelledby</code> linking to the label</li>
          <li><code>aria-describedby</code> linking to helper text and character count</li>
          <li><code>aria-invalid="true"</code> when in error state</li>
          <li><code>aria-required="true"</code> for mandatory fields</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus into/out of the textarea</li>
          <li>Standard text editing keys and multi-line navigation work</li>
          <li><kbd>Enter</kbd> — Inserts a new line (does not submit)</li>
          <li>Focus ring is clearly visible on the container</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Label is announced when textarea receives focus</li>
          <li>Character count updates are announced via live region</li>
          <li>Error messages are announced when they appear</li>
          <li>Required state is communicated on focus</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function InputAreaPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Input Area"
      description="Multi-line text input (textarea) for longer-form content. Supports character counts, auto-resize, and validation states."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
