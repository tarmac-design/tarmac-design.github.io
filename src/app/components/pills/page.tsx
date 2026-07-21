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
        <a href="https://tarmac-storybook.delhivery.com/storybook/sb/index.html?path=/story/tarmac-tds-pills--playground" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '14px' }}>Open in Storybook \u2192</a>
      </p>
      <h2>Description</h2>
      <p>The Pills component is part of the TARMAC Design System. It provides a consistent, accessible, and reusable UI element for building interfaces across Delhivery products.</p>
      <h2>Availability</h2>
      <AvailabilityTable storybookUrl="https://tarmac-storybook.delhivery.com/storybook/sb/index.html?path=/story/tarmac-tds-pills--playground" />
    </>
  );
}

function SpecsTab() {
  return (
    <>

      {/* Interactive component example */}
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginBottom: '2rem', background: '#fff' }}>
        <iframe
          src={`https://tarmac-storybook.delhivery.com/storybook/sb/iframe.html?id=tarmac-tds-pill--playground&viewMode=story&shortcuts=false`}
          style={{ width: '100%', height: '300px', border: 'none', display: 'block' }}
          title="pills interactive example"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
      <h2>Anatomy</h2>
      <p>Refer to the Figma design file for detailed anatomy breakdown of the Pills component.</p>
      <h2>Variants</h2>
      <p>See the playground below for all available variants of the Pills component.</p>
      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Resting state with no interaction</td></tr>
        <tr><td>Hover</td><td>Cursor hovering over the component</td></tr>
        <tr><td>Focused</td><td>Keyboard focus is on the component</td></tr>
        <tr><td>Disabled</td><td>Non-interactive, visually muted</td></tr>
      </tbody></table>
      <StorybookVariantViewer slug="pills" />
    </>
  );
}

function GuidelinesTab() {
  return (
    <>
      <h2>When to Use</h2>
      <GuidelineImage title="When to Use \u2014 Pills" slug="pills" section="when-to-use" />
      <ul>
        <li>Use the Pills component when appropriate for your interface context</li>
        <li>Follow the design guidelines established in the TARMAC Design System</li>
      </ul>
      <h2>When Not to Use</h2>
      <GuidelineImage title="When Not to Use \u2014 Pills" slug="pills" section="when-not-to-use" />
      <ul>
        <li>Avoid using this component outside its intended context</li>
        <li>Consider alternative components if the use case does not match</li>
      </ul>
      <h2>Do\u0027s and Don\u0027ts</h2>
      <DoDont slug="pills" doItems={['Follow the design system guidelines', 'Use consistent sizing and spacing', 'Ensure proper accessibility attributes', 'Test across different viewports']} dontItems={["Don't modify the component outside its API", "Don't use inconsistent styling", "Don't ignore accessibility requirements", "Don't override design tokens without approval"]} />
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

export default function PillsPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Pills" description="Pills is a reusable component in the TARMAC Design System." tabs={tabs}>
      <OverviewTab />
    </PageShell>
  );
}
