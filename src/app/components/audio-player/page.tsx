'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { GuidelineImage } from '@/components/GuidelineImage';
import { RoleToggle } from '@/components/RoleToggle';

function OverviewTab() {
  return (
    <>
      <p style={{ marginBottom: '1.5rem' }}>
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/index.html?path=/story/tarmac-tds-audio-player--playground" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '14px' }}>Open in Storybook \u2192</a>
      </p>
      <h2>Description</h2>
      <p>The Audio Player component is part of the TARMAC Design System. It provides a consistent, accessible, and reusable UI element for building interfaces across Delhivery products.</p>
      <h2>Availability</h2>
      <AvailabilityTable storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/index.html?path=/story/tarmac-tds-audio-player--playground" />
    </>
  );
}

function SpecsTab() {
  return (
    <>
      <h2>Component Structure</h2>
      <table><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody>
        <tr><td>Player Container</td><td>Wrapping element that holds all player controls and displays</td></tr>
        <tr><td>Play/Pause Button</td><td>Primary action control to start or pause audio playback</td></tr>
        <tr><td>Progress Bar</td><td>Visual indicator showing current playback position within the track</td></tr>
        <tr><td>Time Display</td><td>Shows elapsed and total duration of the audio track</td></tr>
        <tr><td>Volume Control</td><td>Slider or button to adjust audio output level</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-accordion--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="audio-player example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Full width player that spans its container</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Playing</td><td>Audio is actively playing with animated progress</td></tr>
        <tr><td>Paused</td><td>Playback is paused, progress bar holds position</td></tr>
        <tr><td>Loading</td><td>Audio source is buffering before playback can begin</td></tr>
        <tr><td>Disabled</td><td>Player is non-interactive, visually muted</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="audio-player" />
    </>
  );
}

function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <>
      <h2>When to Use</h2>
          <GuidelineImage title="Audio Player usage overview" slug="audio-player" section="usage" />
      <GuidelineImage title="When to Use \u2014 Audio Player" slug="audio-player" section="when-to-use" />
      <ul>
        <li>Use the Audio Player component when appropriate for your interface context</li>
        <li>Follow the design guidelines established in the TARMAC Design System</li>
      </ul>
      <h2>When Not to Use</h2>
      <GuidelineImage title="When Not to Use \u2014 Audio Player" slug="audio-player" section="when-not-to-use" />
      <ul>
        <li>Avoid using this component outside its intended context</li>
        <li>Consider alternative components if the use case does not match</li>
      </ul>
      <h2>Do\u0027s and Don\u0027ts</h2>
      <DoDont slug="audio-player" doItems={['Follow the design system guidelines', 'Use consistent sizing and spacing', 'Ensure proper accessibility attributes', 'Test across different viewports']} dontItems={["Don't modify the component outside its API", "Don't use inconsistent styling", "Don't ignore accessibility requirements", "Don't override design tokens without approval"]} />
    </>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { AudioPlayer } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<AudioPlayer />`}</code></pre>
        </>
      )}
    </RoleToggle>
  );
}

function AccessibilityTab() {
  return (
    <>
      <h2>ARIA Attributes</h2>
      <table><thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead><tbody>
        <tr><td>role</td><td>varies</td><td>Appropriate semantic role for the component</td></tr>
        <tr><td>aria-label</td><td>string</td><td>Accessible name when visual label is insufficient</td></tr>
      </tbody></table>
      <h2>Keyboard Navigation</h2>
      <table><thead><tr><th>Key</th><th>Action</th></tr></thead><tbody>
        <tr><td>Tab</td><td>Move focus to the component</td></tr>
        <tr><td>Enter / Space</td><td>Activate the component</td></tr>
        <tr><td>Escape</td><td>Dismiss or cancel (if applicable)</td></tr>
      </tbody></table>
      <h2>Screen Reader Support</h2>
      <ul>
        <li>Component state is announced to assistive technologies</li>
        <li>Labels and descriptions are properly associated</li>
        <li>Dynamic changes are communicated via live regions where appropriate</li>
      </ul>
      <h2>Color and Contrast</h2>
      <ul>
        <li>Text meets minimum 4.5:1 contrast ratio (WCAG AA)</li>
        <li>Interactive elements have visible focus indicators</li>
        <li>State changes are not communicated by color alone</li>
      </ul>
    </>
  );
}

const changelog: ChangelogEntry[] = [
  { version: '1.1.2', date: 'June, 2026', changes: [{ category: 'Changed', items: ['Component configuration updated'] }] },
  { version: '1.0.0', date: 'March, 2026', changes: [{ category: 'Added', items: ['Component published'] }] },
];

function ChangelogTab() { return <Changelog entries={changelog} />; }

export default function AudioPlayerPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Audio Player" description="Audio Player is a reusable component in the TARMAC Design System." tabs={tabs}>
      <OverviewTab />
    </PageShell>
  );
}
