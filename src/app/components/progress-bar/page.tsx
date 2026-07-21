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
        <a href="https://tarmac-storybook.delhivery.com/storybook/sb/index.html?path=/story/tarmac-tds-progress-bar--playground" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '14px' }}>Open in Storybook \u2192</a>
      </p>
      <h2>Description</h2>
      <p>The Progress Bar component is part of the TARMAC Design System. It provides a consistent, accessible, and reusable UI element for building interfaces across Delhivery products.</p>
      <h2>Availability</h2>
      <AvailabilityTable storybookUrl="https://tarmac-storybook.delhivery.com/storybook/sb/index.html?path=/story/tarmac-tds-progress-bar--playground" />
    </>
  );
}

function SpecsTab() {
  return (
    <>
      <h2>Component Structure</h2>
      <table><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody>
        <tr><td>Track</td><td>Background bar representing the full range</td></tr>
        <tr><td>Fill Bar</td><td>Colored portion indicating current progress</td></tr>
        <tr><td>Label (percentage)</td><td>Optional text showing the numeric progress value</td></tr>
        <tr><td>Buffer Indicator</td><td>Secondary fill showing buffered/loaded content</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook.delhivery.com/storybook/sb/iframe.html?id=tarmac-tds-progressbar--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="progress-bar example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Large</td><td>8px height for prominent progress displays</td></tr>
        <tr><td>Medium</td><td>4px height for standard progress indicators</td></tr>
        <tr><td>Small</td><td>2px height for subtle or inline progress</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Determinate</td><td>Shows specific percentage of completion</td></tr>
        <tr><td>Indeterminate</td><td>Animated loop when duration is unknown</td></tr>
        <tr><td>Complete</td><td>Full bar indicating task is finished</td></tr>
        <tr><td>Error</td><td>Red fill indicating a failed operation</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="progress-bar" />
    </>
  );
}

function GuidelinesTab() {
  return (
    <>
      <h2>When to Use</h2>
      <GuidelineImage title="When to Use \u2014 Progress Bar" slug="progress-bar" section="when-to-use" />
      <ul>
        <li>Use the Progress Bar component when appropriate for your interface context</li>
        <li>Follow the design guidelines established in the TARMAC Design System</li>
      </ul>
      <h2>When Not to Use</h2>
      <GuidelineImage title="When Not to Use \u2014 Progress Bar" slug="progress-bar" section="when-not-to-use" />
      <ul>
        <li>Avoid using this component outside its intended context</li>
        <li>Consider alternative components if the use case does not match</li>
      </ul>
      <h2>Do\u0027s and Don\u0027ts</h2>
      <DoDont slug="progress-bar" doItems={['Follow the design system guidelines', 'Use consistent sizing and spacing', 'Ensure proper accessibility attributes', 'Test across different viewports']} dontItems={["Don't modify the component outside its API", "Don't use inconsistent styling", "Don't ignore accessibility requirements", "Don't override design tokens without approval"]} />
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

export default function ProgressBarPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Progress Bar" description="Progress Bar is a reusable component in the TARMAC Design System." tabs={tabs}>
      <OverviewTab />
    </PageShell>
  );
}
