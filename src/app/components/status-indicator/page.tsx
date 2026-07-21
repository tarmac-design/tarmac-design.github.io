'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { GuidelineImage } from '@/components/GuidelineImage';

function OverviewTab() {
  return (
    <>
      <p style={{ marginBottom: '1.5rem' }}>
        <a href="https://tarmac-storybook.delhivery.com/storybook/sb/index.html?path=/story/tarmac-tds-status-indicator--playground" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '14px' }}>Open in Storybook \u2192</a>
      </p>
      <h2>Description</h2>
      <p>The Status Indicator component is part of the TARMAC Design System. It provides a consistent, accessible, and reusable UI element for building interfaces across Delhivery products.</p>
      <h2>Availability</h2>
      <AvailabilityTable storybookUrl="https://tarmac-storybook.delhivery.com/storybook/sb/index.html?path=/story/tarmac-tds-status-indicator--playground" />
    </>
  );
}

function SpecsTab() {
  return (
    <>
      <h2>Component Structure</h2>
      <table><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody>
        <tr><td>Dot</td><td>Small colored circle indicating status</td></tr>
        <tr><td>Optional Label</td><td>Text describing the status meaning</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook.delhivery.com/storybook/sb/iframe.html?id=tarmac-tds-statusindicator--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="status-indicator example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Large</td><td>12px dot for prominent status displays</td></tr>
        <tr><td>Medium</td><td>8px dot for standard status indicators</td></tr>
        <tr><td>Small</td><td>6px dot for compact or inline status</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Online (green)</td><td>Entity is active and available</td></tr>
        <tr><td>Offline (grey)</td><td>Entity is inactive or disconnected</td></tr>
        <tr><td>Busy (red)</td><td>Entity is occupied and unavailable</td></tr>
        <tr><td>Away (yellow)</td><td>Entity is idle or temporarily unavailable</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="status-indicator" />
    </>
  );
}

function GuidelinesTab() {
  return (
    <>
      <h2>When to Use</h2>
      <GuidelineImage title="When to Use \u2014 Status Indicator" slug="status-indicator" section="when-to-use" />
      <ul>
        <li>Use the Status Indicator component when appropriate for your interface context</li>
        <li>Follow the design guidelines established in the TARMAC Design System</li>
      </ul>
      <h2>When Not to Use</h2>
      <GuidelineImage title="When Not to Use \u2014 Status Indicator" slug="status-indicator" section="when-not-to-use" />
      <ul>
        <li>Avoid using this component outside its intended context</li>
        <li>Consider alternative components if the use case does not match</li>
      </ul>
      <h2>Do\u0027s and Don\u0027ts</h2>
      <DoDont slug="status-indicator" doItems={['Follow the design system guidelines', 'Use consistent sizing and spacing', 'Ensure proper accessibility attributes', 'Test across different viewports']} dontItems={["Don't modify the component outside its API", "Don't use inconsistent styling", "Don't ignore accessibility requirements", "Don't override design tokens without approval"]} />
    </>
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

export default function StatusIndicatorPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Status Indicator" description="Status Indicator is a reusable component in the TARMAC Design System." tabs={tabs}>
      <OverviewTab />
    </PageShell>
  );
}
