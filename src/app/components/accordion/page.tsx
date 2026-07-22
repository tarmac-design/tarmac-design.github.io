'use client';

import { useState } from 'react';
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
        <a href="https://tarmac-storybook.delhivery.com/storybook/sb/index.html?path=/story/tarmac-tds-accordion--playground" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '14px' }}>Open in Storybook →</a>
      </p>
      <h2>Description</h2>
      <p>Accordions are interactive disclosure components used to organize content into expandable sections. They help manage large amounts of information by allowing users to progressively reveal content when needed.</p>
      <p>Accordions reduce visual clutter by displaying only section headers initially, while allowing users to expand sections to view additional content. They are commonly used in interfaces that require structured information grouping such as settings panels, FAQs, content summaries, and form sections.</p>
      <h2>Common Use Cases</h2>
      <ul>
        <li>Grouping related information sections</li>
        <li>Displaying expandable content areas</li>
        <li>Managing dense content within limited space</li>
        <li>Creating collapsible content lists</li>
        <li>Organizing configuration or settings panels</li>
      </ul>
      <h2>Availability</h2>
      <AvailabilityTable storybookUrl="https://tarmac-storybook.delhivery.com/storybook/sb/index.html?path=/story/tarmac-tds-accordion--playground" />
    </>
  );
}

function SpecsTab() {
  return (
    <>
      <h2>Component Structure</h2>
      <p>A stacked disclosure system with expandable header rows that reveal body content.</p>
      <table><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody>
        <tr><td>Accordion Header</td><td>Clickable trigger row — toggles the content section</td></tr>
        <tr><td>Accordion Footer</td><td>Expanded content area with optional actions</td></tr>
        <tr><td>Accordion Container</td><td>Published group layout supporting 1–5 sections</td></tr>
      </tbody></table>
      {/* Header Variants specimen */}
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook.delhivery.com/storybook/sb/iframe.html?id=tarmac-tds-accordion--header-variants&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="Header Variants" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>
      <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Header variants — single text, dual text, with icons, badges, and status indicators.</p>

      <h2>Sizes</h2>
      <p>Two density options — pick by context, never scale manually.</p>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Large</td><td>Default for web — 48px row height, comfortable touch targets</td></tr>
        <tr><td>Small</td><td>Dense layouts — 44px row height, compact panels and sidebars</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Collapsed</td><td>Only header visible — the default resting state</td></tr>
        <tr><td>Expanded</td><td>Content revealed below the header</td></tr>
        <tr><td>Hover</td><td>Cursor over the header area</td></tr>
        <tr><td>Disabled</td><td>Non-interactive, visually muted</td></tr>
      </tbody></table>
      {/* Collapsed vs Expanded specimen */}
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook.delhivery.com/storybook/sb/iframe.html?id=tarmac-tds-accordion--collapsed-vs-expanded&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="Collapsed vs Expanded" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>
      <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Collapsed vs Expanded — clicking the header toggles the content section.</p>

      <h2>Behavior</h2>
      <table><thead><tr><th>Pattern</th><th>Description</th></tr></thead><tbody>
        <tr><td>Single expand</td><td>Only one section open at a time — opening one closes others</td></tr>
        <tr><td>Multi expand</td><td>Multiple sections can be open simultaneously</td></tr>
        <tr><td>Controlled</td><td>Expand/collapse managed programmatically via props</td></tr>
      </tbody></table>
      {/* Accordion Mode specimen */}
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook.delhivery.com/storybook/sb/iframe.html?id=tarmac-tds-accordion--accordion-mode&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="Accordion Mode" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>
      <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Accordion mode — single open vs multiple open behavior.</p>

      <StorybookVariantViewer slug="accordion" />
    </>
  );
}

function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <>
          <h2>Usage</h2>
          <p>Progressively disclose content. Choose Accordion for stacked sections, V2 for step flows.</p>
          <GuidelineImage title="Accordion usage overview" slug="accordion" section="usage" />

          <h2>When to Use</h2>
          <ul>
            <li>FAQs and help content</li>
            <li>Long forms — collapse optional or grouped field sets</li>
            <li>Settings and filters — users act on one group at a time</li>
            <li>Sequential flows — V2 with Completed state confirms finished steps</li>
            <li>Dense mobile screens — reclaim vertical space</li>
          </ul>

          <h2>When Not to Use</h2>
          <ul>
            <li>Critical content — errors, pricing, mandatory instructions must be visible</li>
            <li>Short content — two or three lines need no disclosure</li>
            <li>Comparison tasks — use Table or side-by-side Cards</li>
            <li>Navigation — use Tabs, Side Nav, or Breadcrumbs</li>
            <li>Nested disclosure — more than one level deep signals an IA problem</li>
          </ul>

          <h2>Do&apos;s and Don&apos;ts</h2>
          <DoDont slug="accordion"
            doItems={[
              'Headers under 6 words, sentence case',
              'Default all sections to collapsed',
              'Use V2 header styles with meaning (Green success, Yellow caution, DLV Red critical)',
              'Surface critical info flat — never hide behind a click',
            ]}
            dontItems={[
              "Don't write sentences in headers — the chevron communicates the interaction",
              "Don't hide critical info behind a collapsed section",
              "Don't nest accordions — restructure instead",
              "Don't use styles decoratively — they carry semantic meaning",
            ]}
          />
        </>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Accordion, AccordionItem } from '@tarmac/design-system';`}</code></pre>

          <h2>Rules</h2>
          <table>
            <thead><tr><th>#</th><th>Rule</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Use <code>accordion</code> prop for single-open behavior</td></tr>
              <tr><td>2</td><td>Set <code>defaultExpanded</code> for initial open item</td></tr>
              <tr><td>3</td><td>Never nest accordions — restructure content instead</td></tr>
              <tr><td>4</td><td>Header text under 6 words, sentence case</td></tr>
              <tr><td>5</td><td>Use <code>onChange</code> for controlled expand state</td></tr>
              <tr><td>6</td><td>Content slot accepts any React children</td></tr>
            </tbody>
          </table>

          <h2>Props</h2>
          <table>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td colSpan={4}><strong>Accordion</strong></td></tr>
              <tr><td>size</td><td>{`"lg" | "sm"`}</td><td>{`"lg"`}</td><td>Controls row height density</td></tr>
              <tr><td>accordion</td><td>boolean</td><td>false</td><td>Single-open mode — opening one closes others</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>required</td><td>AccordionItem children</td></tr>
              <tr><td colSpan={4}><strong>AccordionItem</strong></td></tr>
              <tr><td>title</td><td>string</td><td>required</td><td>Header text label</td></tr>
              <tr><td>subtitle</td><td>string</td><td>undefined</td><td>Optional secondary text</td></tr>
              <tr><td>expanded</td><td>boolean</td><td>undefined</td><td>Controlled expand state</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>Non-interactive, visually muted</td></tr>
              <tr><td>onChange</td><td>callback</td><td>undefined</td><td>Fires when expand state changes</td></tr>
              <tr><td>leadingIcon</td><td>ReactNode</td><td>undefined</td><td>Icon before title</td></tr>
              <tr><td>badge</td><td>ReactNode</td><td>undefined</td><td>Badge element in header</td></tr>
            </tbody>
          </table>

          <h2>Basic Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Accordion>
  <AccordionItem title="FAQ 1">Answer</AccordionItem>
</Accordion>`}</code></pre>

          <h2>Advanced Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Accordion size="sm" accordion>
  <AccordionItem
    title="Pickup Details"
    leadingIcon={<TruckIcon />}
    badge={<Badge label="Required" variant="warning" />}
  >
    Form fields here
  </AccordionItem>
</Accordion>`}</code></pre>
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
        <li>Headers must be keyboard navigable</li>
        <li>Expand and collapse states should be announced by screen readers</li>
        <li>Icons alone should not indicate the state without accessible labels</li>
        <li>Focus states must be clearly visible</li>
      </ul>
      <h2>ARIA Attributes</h2>
      <table><thead><tr><th>Attribute</th><th>Applied To</th><th>Value</th><th>Description</th></tr></thead><tbody>
        <tr><td>role</td><td>Header</td><td>button</td><td>Header acts as a toggle button</td></tr>
        <tr><td>aria-expanded</td><td>Header</td><td>true / false</td><td>Indicates expand/collapse state</td></tr>
        <tr><td>aria-controls</td><td>Header</td><td>panel ID</td><td>Links header to its content panel</td></tr>
        <tr><td>role</td><td>Content panel</td><td>region</td><td>Content is a landmark region</td></tr>
        <tr><td>aria-labelledby</td><td>Content panel</td><td>header ID</td><td>Panel labeled by header</td></tr>
      </tbody></table>
      <h2>Keyboard Navigation</h2>
      <table><thead><tr><th>Key</th><th>Action</th></tr></thead><tbody>
        <tr><td>Tab</td><td>Move focus to the next accordion header</td></tr>
        <tr><td>Enter / Space</td><td>Toggle expand/collapse</td></tr>
        <tr><td>Arrow Down</td><td>Move focus to next header</td></tr>
        <tr><td>Arrow Up</td><td>Move focus to previous header</td></tr>
        <tr><td>Home</td><td>Move focus to first header</td></tr>
        <tr><td>End</td><td>Move focus to last header</td></tr>
      </tbody></table>
    </>
  );
}

const changelog: ChangelogEntry[] = [
  { version: '1.1.2', date: 'June, 2026', changes: [{ category: 'Changed', items: ['Component configuration updated'] }] },
  { version: '1.1.0', date: 'June, 2026', changes: [{ category: 'Changed', items: ['Accordion strokes updated and autolayouts'] }] },
  { version: '1.0.1', date: 'April, 2026', changes: [{ category: 'Fixed', items: ['Accordion Prototype fixed'] }] },
  { version: '1.0.0', date: 'March, 2026', changes: [{ category: 'Added', items: ['Component published'] }] },
];

function ChangelogTab() { return <Changelog entries={changelog} />; }

/* ─── Accordion V2 Tabs ─── */
function V2OverviewTab() {
  return (
    <>
      <p style={{ marginBottom: '1.5rem' }}>
        <a href="https://tarmac-storybook.delhivery.com/storybook/sb/index.html?path=/story/tarmac-tds-accordion-v2--playground" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '14px' }}>Open in Storybook →</a>
      </p>
      <h2>Description</h2>
      <p>Accordion V2 is a stateful single container built for step-based flows. Unlike Accordion V1 (stacked sections), V2 is designed for sequential task completion — each section represents a step that can be marked as completed.</p>
      <h2>Key Differences from V1</h2>
      <table><thead><tr><th>Feature</th><th>Accordion V1</th><th>Accordion V2</th></tr></thead><tbody>
        <tr><td>Use case</td><td>Stacked related sections</td><td>Single stateful container for steps</td></tr>
        <tr><td>Sections</td><td>1–5 stacked</td><td>Single container</td></tr>
        <tr><td>States</td><td>Collapsed / Expanded</td><td>Collapsed / Expanded / Completed</td></tr>
        <tr><td>Header styles</td><td>Default only</td><td>Default, Coal, Yellow, Green, DLV Red</td></tr>
        <tr><td>Sizes</td><td>Large / Small</td><td>Web (724px) / Mobile (346px)</td></tr>
      </tbody></table>
      <h2>Availability</h2>
      <AvailabilityTable storybookUrl="https://tarmac-storybook.delhivery.com/storybook/sb/index.html?path=/story/tarmac-tds-accordion-v2--playground" />
    </>
  );
}

function V2SpecsTab() {
  return (
    <>
      <h2>Variants</h2>
      <table><thead><tr><th>Variant</th><th>Description</th></tr></thead><tbody>
        <tr><td>Collapsed</td><td>Only the header is visible — title, optional subtext, pills, and chevron</td></tr>
        <tr><td>Expanded</td><td>Body reveals content slot and optional footer CTA row</td></tr>
        <tr><td>Completed</td><td>Confirms a finished step in sequential flows — pair with Green header style</td></tr>
      </tbody></table>
      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Width</th><th>Header Height</th><th>Use Case</th></tr></thead><tbody>
        <tr><td>Web</td><td>724px</td><td>66px</td><td>Desktop and tablet interfaces</td></tr>
        <tr><td>Mobile</td><td>346px</td><td>44px</td><td>Handheld surfaces</td></tr>
      </tbody></table>
      <h2>Header Styles</h2>
      <p>Styles carry meaning — never use them decoratively.</p>
      <table><thead><tr><th>Style</th><th>Meaning</th><th>Use Case</th></tr></thead><tbody>
        <tr><td>Default</td><td>Neutral</td><td>Standard sections without emphasis</td></tr>
        <tr><td>Coal</td><td>Neutral emphasis</td><td>Secondary highlighted sections</td></tr>
        <tr><td>Yellow</td><td>Caution</td><td>Sections requiring attention</td></tr>
        <tr><td>Green</td><td>Success / Completed</td><td>Finished steps in sequential flows</td></tr>
        <tr><td>DLV Red</td><td>Critical</td><td>Sections with critical actions or errors</td></tr>
      </tbody></table>
      <h2>Anatomy</h2>
      <table><thead><tr><th>#</th><th>Element</th><th>Token</th><th>Value</th></tr></thead><tbody>
        <tr><td>1</td><td>Header</td><td>—</td><td>66px Web / 44px Mobile</td></tr>
        <tr><td>2</td><td>Chevron</td><td>—</td><td>Rotates on toggle, never remove</td></tr>
        <tr><td>3</td><td>Content container</td><td>Spacing/8</td><td>8px padding</td></tr>
        <tr><td>4</td><td>Footer CTA row</td><td>Spacing/12</td><td>12px padding</td></tr>
        <tr><td>5</td><td>Container</td><td>Radius/Medium</td><td>8px radius, 0.5px border</td></tr>
      </tbody></table>
      <h2>Design Tokens</h2>
      <table><thead><tr><th>Element</th><th>Property</th><th>Token</th><th>Value</th></tr></thead><tbody>
        <tr><td>Container</td><td>Corner radius</td><td>Radius/Medium</td><td>8px</td></tr>
        <tr><td>Container</td><td>Border</td><td>Border/Neutral/Primary</td><td>#E6E6E6 · 0.5px</td></tr>
        <tr><td>Container</td><td>Surface</td><td>Surface/BG_Primary/Default</td><td>#FFFFFF</td></tr>
        <tr><td>Header</td><td>Padding · Gap</td><td>Spacing/12 · Spacing/24</td><td>12px · 24px</td></tr>
        <tr><td>Title</td><td>Type</td><td>B1/body1_semibold</td><td>Noto Sans SemiBold 16/24</td></tr>
        <tr><td>Subtext</td><td>Type</td><td>C1/caption1_default</td><td>Noto Sans Medium 12/16</td></tr>
        <tr><td>Content</td><td>Padding</td><td>Spacing/8</td><td>8px</td></tr>
        <tr><td>Footer CTA</td><td>Padding</td><td>Spacing/12</td><td>12px</td></tr>
      </tbody></table>
      <StorybookVariantViewer slug="accordion-v2" />
    </>
  );
}

function V2ChangelogTab() {
  const v2Log: ChangelogEntry[] = [
    { version: '1.1.0', date: 'June, 2026', changes: [{ category: 'Changed', items: ['Improved animation and API'] }] },
    { version: '1.0.0', date: 'April, 2026', changes: [{ category: 'Added', items: ['Accordion V2 published'] }] },
  ];
  return <Changelog entries={v2Log} />;
}

export default function AccordionPage() {
  const [version, setVersion] = useState<'v1' | 'v2'>('v1');

  const v1Tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  const v2Tabs = [
    { label: 'Overview', content: <V2OverviewTab /> },
    { label: 'Specs', content: <V2SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <V2ChangelogTab /> },
  ];

  const switcher = (
    <div style={{ display: 'inline-flex', borderRadius: '8px', border: '1px solid var(--color-outline)', overflow: 'hidden' }}>
      <button onClick={() => setVersion('v1')} style={{ padding: '5px 14px', fontSize: '12px', fontWeight: 500, border: 'none', borderRight: '1px solid var(--color-outline)', cursor: 'pointer', backgroundColor: version === 'v1' ? 'var(--color-on-surface)' : 'transparent', color: version === 'v1' ? 'var(--color-surface)' : 'var(--color-on-surface-variant)', transition: 'all 0.15s' }}>Accordion</button>
      <button onClick={() => setVersion('v2')} style={{ padding: '5px 14px', fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: version === 'v2' ? 'var(--color-on-surface)' : 'transparent', color: version === 'v2' ? 'var(--color-surface)' : 'var(--color-on-surface-variant)', transition: 'all 0.15s' }}>Accordion V2</button>
    </div>
  );

  return (
    <PageShell
      title={version === 'v1' ? 'Accordion' : 'Accordion V2'}
      description={version === 'v1' ? 'Stacked list of expandable sections for progressive disclosure.' : 'Stateful single container built for step-based flows.'}
      tabs={version === 'v1' ? v1Tabs : v2Tabs}
      subHeader={switcher}
    >
      <OverviewTab />
    </PageShell>
  );
}
