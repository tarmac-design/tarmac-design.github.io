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
    changes: [{ category: 'Changed', items: ['Added Ghost and Loading states', 'Improved focus ring visibility across all variants', 'Fixed icon alignment in XSmall size'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Button component', 'Support for 8 color variants', 'Standard, Outlined, and Text types', 'Five size options from XSmall to XLarge'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Button is the primary interactive element for triggering actions. It supports
          multiple emphasis levels, sizes, and states to accommodate various interaction
          patterns across the application, from primary CTAs to subtle tertiary actions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Submitting forms and confirming actions</li>
          <li>Triggering navigation or state changes</li>
          <li>Opening dialogs, modals, or menus</li>
          <li>Performing CRUD operations</li>
          <li>Call-to-action elements in marketing sections</li>
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
        <tr><td>Container</td><td>Clickable surface with padding and border radius</td></tr>
        <tr><td>Label</td><td>Action text describing what the button does</td></tr>
        <tr><td>Leading Icon</td><td>Optional icon before the label</td></tr>
        <tr><td>Trailing Icon</td><td>Optional icon after the label</td></tr>
        <tr><td>Loading Indicator</td><td>Spinner replacing icon during async actions</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-button--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="button example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>XLarge (48px)</td><td>Hero sections and primary CTAs</td></tr>
        <tr><td>Large (44px)</td><td>Form submissions</td></tr>
        <tr><td>Regular (36px)</td><td>Default for most contexts</td></tr>
        <tr><td>Small (28px)</td><td>Inline actions</td></tr>
        <tr><td>XSmall (24px)</td><td>Dense toolbars</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Resting, ready for interaction</td></tr>
        <tr><td>Hover</td><td>Cursor over the button</td></tr>
        <tr><td>Pressed</td><td>Active click state</td></tr>
        <tr><td>Focused</td><td>Keyboard focus ring visible</td></tr>
        <tr><td>Disabled</td><td>Non-interactive, muted</td></tr>
        <tr><td>Loading</td><td>Async action in progress</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="button" />
    </>
  );
}


function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <>
          <h2>Usage</h2>
          <p>Primary interaction trigger. One primary action per view, support with secondary.</p>
          <GuidelineImage title="Button hierarchy" slug="button" section="usage" />

          <h2>When to Use</h2>
          <GuidelineImage title="Button when to use" slug="button" section="when-to-use" />
          <ul>
            <li>Form submissions and save actions</li>
            <li>Dialog action buttons (confirm/cancel)</li>
            <li>Navigation triggers that feel like actions</li>
            <li>Destructive confirmations (delete, remove)</li>
          </ul>

          <h2>When Not to Use</h2>
          <GuidelineImage title="Button when not to use" slug="button" section="when-not-to-use" />
          <ul>
            <li>Navigation links — use Link component</li>
            <li>Toggles — use Toggle or Checkbox</li>
            <li>Menu items — use Menu component</li>
            <li>Non-interactive labels — use Badge</li>
          </ul>

          <h2>Do&apos;s and Don&apos;ts</h2>
          <DoDont slug="button"
            doItems={[
              'Use action verbs (Save, Submit, Delete)',
              'One primary (Filled) button per view',
              'Consistent sizing within the same context',
              'Show loading state for async operations',
            ]}
            dontItems={[
              "Don't disable without explanation — show tooltip with reason",
              "Don't use multiple primary buttons side by side",
              "Don't truncate labels — rewrite if too long",
              "Don't use vague labels like 'Click here' or 'OK'",
            ]}
          />
        </>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Button } from '@tarmac/design-system';`}</code></pre>

          <h2>Rules</h2>
          <table>
            <thead><tr><th>#</th><th>Rule</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Always set HTML <code>type</code> in forms (submit/button/reset)</td></tr>
              <tr><td>2</td><td>Show <code>loading</code> state for async — disables interaction automatically</td></tr>
              <tr><td>3</td><td>Icon-only buttons MUST have <code>aria-label</code></td></tr>
              <tr><td>4</td><td>One filled primary per view — use outlined/text for secondary</td></tr>
              <tr><td>5</td><td>Disabled buttons should show tooltip explaining why</td></tr>
              <tr><td>6</td><td>Never truncate labels — rewrite shorter</td></tr>
            </tbody>
          </table>

          <h2>Props</h2>
          <table>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>children</td><td>ReactNode</td><td>required</td><td>Button label content</td></tr>
              <tr><td>variant</td><td>{`"black" | "white" | "coal" | "dlvRed" | "info" | "success" | "error" | "warning"`}</td><td>{`"black"`}</td><td>Color variant</td></tr>
              <tr><td>buttonStyle</td><td>{`"filled" | "outlined" | "text"`}</td><td>{`"filled"`}</td><td>Emphasis level</td></tr>
              <tr><td>size</td><td>{`"xs" | "sm" | "md" | "lg" | "xl"`}</td><td>{`"md"`}</td><td>Button height</td></tr>
              <tr><td>loading</td><td>boolean</td><td>false</td><td>Shows spinner, disables interaction</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>Non-interactive state</td></tr>
              <tr><td>leadingIcon</td><td>ReactNode</td><td>undefined</td><td>Icon before label</td></tr>
              <tr><td>trailingIcon</td><td>ReactNode</td><td>undefined</td><td>Icon after label</td></tr>
              <tr><td>type</td><td>{`"button" | "submit" | "reset"`}</td><td>{`"button"`}</td><td>HTML button type</td></tr>
              <tr><td>onClick</td><td>callback</td><td>undefined</td><td>Click handler</td></tr>
            </tbody>
          </table>

          <h2>Basic Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Button variant="dlvRed" buttonStyle="filled">Submit</Button>`}</code></pre>

          <h2>Advanced Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Button
  variant="black"
  buttonStyle="outlined"
  size="lg"
  loading={saving}
  leadingIcon={<SaveIcon />}
  onClick={handleSave}
>
  Save Changes
</Button>`}</code></pre>
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
          <li>Uses native <code>&lt;button&gt;</code> element for built-in semantics</li>
          <li><code>aria-disabled="true"</code> when disabled (preserves focusability)</li>
          <li><code>aria-busy="true"</code> during loading state</li>
          <li><code>aria-label</code> for icon-only buttons</li>
          <li><code>aria-pressed</code> for toggle button behavior</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus to/from the button</li>
          <li><kbd>Enter</kbd> — Activates the button</li>
          <li><kbd>Space</kbd> — Activates the button</li>
          <li>Disabled buttons remain focusable for discoverability</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Announces button label and role automatically</li>
          <li>Loading state announces &ldquo;Loading&rdquo; via aria-busy</li>
          <li>Disabled state is communicated to assistive technology</li>
          <li>Icon-only buttons announce their aria-label</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function ButtonPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Button"
      description="Primary interactive element for triggering actions. Supports multiple emphasis levels, sizes, and states."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
