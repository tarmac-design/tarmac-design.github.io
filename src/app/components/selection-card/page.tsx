'use client';

import { PageShell } from '@/components/PageShell';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { RoleToggle } from '@/components/RoleToggle';
import { GuidelineImage } from '@/components/GuidelineImage';
import { ArchivedBanner } from '@/components/ArchivedBanner';

function OverviewTab() {
  return (
    <>
      <p style={{ marginBottom: '1.5rem' }}>
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/index.html?path=/story/tarmac-tds-selectioncard--playground" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '14px' }}>Open in Storybook &#8594;</a>
      </p>
      <h2>Description</h2>
      <p>A card-style selection element that acts as a radio or checkbox in a visual format.</p>
      <h2>Common Use Cases</h2>
      <ul>
        <li>Plan selection</li>
        <li>Payment method chooser</li>
        <li>Preference settings</li>
        <li>Multi-option forms</li>
      </ul>
      <h2>Availability</h2>
      <AvailabilityTable storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/index.html?path=/story/tarmac-tds-selectioncard--playground" />
    </>
  );
}

function SpecsTab() {
  return (
    <>
      <h2>Component Structure</h2>
      <table><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody>
        <tr><td>Container</td><td>Selectable card surface</td></tr>
        <tr><td>Indicator</td><td>Radio or checkbox control</td></tr>
        <tr><td>Content</td><td>Title, description, icon</td></tr>
        <tr><td>Border</td><td>Selection state indicator</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-selectioncard--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="Selection Card example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>
      <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Interactive playground &#8212; explore props and states.</p>
      <StorybookVariantViewer slug="selection-card" />
    </>
  );
}

function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <>
          <h2>Usage</h2>
          <GuidelineImage title="Selection Card usage" slug="selection-card" section="usage" />
          <p>A card-style selection element that acts as a radio or checkbox in a visual format.</p>
          <h2>When to Use</h2>
          <GuidelineImage title="Selection Card when to use" slug="selection-card" section="when-to-use" />
          <ul>
        <li>Plan selection</li>
        <li>Payment method chooser</li>
        <li>Preference settings</li>
        <li>Multi-option forms</li>
          </ul>
          <h2>When Not to Use</h2>
          <GuidelineImage title="Selection Card when not to use" slug="selection-card" section="when-not-to-use" />
          <ul>
            <li>When simpler alternatives serve the same purpose</li>
            <li>When the content doesn&apos;t warrant this level of complexity</li>
          </ul>
        </>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { SelectionCard } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<SelectionCard />`}</code></pre>
        </>
      )}
    </RoleToggle>
  );
}

function AccessibilityTab() {
  return (
    <>
      <h2>Key Requirements</h2>
      <ul>
        <li>Must be keyboard navigable</li>
        <li>States should be announced by screen readers</li>
        <li>Focus states must be clearly visible</li>
        <li>Color contrast meets WCAG 2.1 AA</li>
      </ul>
      <h2>Keyboard Navigation</h2>
      <table><thead><tr><th>Key</th><th>Action</th></tr></thead><tbody>
        <tr><td>Tab</td><td>Move focus to component</td></tr>
        <tr><td>Enter / Space</td><td>Activate primary action</td></tr>
        <tr><td>Escape</td><td>Close or dismiss (if applicable)</td></tr>
      </tbody></table>
    </>
  );
}

const changelog: ChangelogEntry[] = [
  { version: '1.0.0', date: 'March 2026', changes: [{ category: 'Added', items: ['Component published'] }] },
];

function ChangelogTab() { return <Changelog entries={changelog} />; }

export default function SelectionCardPage() {
  return (
    <PageShell
      title="Selection Card"
      description="A card-style selection element that acts as a radio or checkbox in a visual format."
      tabs={[
        { label: 'Overview', content: <OverviewTab /> },
        { label: 'Specs', content: <SpecsTab /> },
        { label: 'Guidelines', content: <GuidelinesTab /> },
        { label: 'Accessibility', content: <AccessibilityTab /> },
        { label: 'Changelog', content: <ChangelogTab /> },
      ]}
    >
      <OverviewTab />
    </PageShell>
  );
}
