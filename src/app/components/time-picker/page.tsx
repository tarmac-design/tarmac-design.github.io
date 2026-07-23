'use client';

import { PageShell } from '@/components/PageShell';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { RoleToggle } from '@/components/RoleToggle';

function OverviewTab() {
  return (
    <>
      <p style={{ marginBottom: '1.5rem' }}>
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/index.html?path=/story/tarmac-tds-timepicker--playground" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '14px' }}>Open in Storybook &#8594;</a>
      </p>
      <h2>Description</h2>
      <p>An input component for selecting time values with optional period (AM/PM) support.</p>
      <h2>Common Use Cases</h2>
      <ul>
        <li>Scheduling interfaces</li>
        <li>Appointment booking</li>
        <li>Time-based filters</li>
        <li>Event creation forms</li>
      </ul>
      <h2>Availability</h2>
      <AvailabilityTable storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/index.html?path=/story/tarmac-tds-timepicker--playground" />
    </>
  );
}

function SpecsTab() {
  return (
    <>
      <h2>Component Structure</h2>
      <table><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody>
        <tr><td>Container</td><td>Picker wrapper</td></tr>
        <tr><td>Hour</td><td>Hour selection</td></tr>
        <tr><td>Minute</td><td>Minute selection</td></tr>
        <tr><td>Period</td><td>AM/PM toggle</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-timepicker--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="Time Picker example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>
      <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Interactive playground &#8212; explore props and states.</p>
      <StorybookVariantViewer slug="time-picker" />
    </>
  );
}

function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <>
          <h2>Usage</h2>
          <p>An input component for selecting time values with optional period (AM/PM) support.</p>
          <h2>When to Use</h2>
          <ul>
        <li>Scheduling interfaces</li>
        <li>Appointment booking</li>
        <li>Time-based filters</li>
        <li>Event creation forms</li>
          </ul>
          <h2>When Not to Use</h2>
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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { TimePicker } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<TimePicker />`}</code></pre>
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

export default function TimePickerPage() {
  return (
    <PageShell
      title="Time Picker"
      description="An input component for selecting time values with optional period (AM/PM) support."
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
