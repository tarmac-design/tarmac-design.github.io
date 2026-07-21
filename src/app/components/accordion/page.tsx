'use client';

import { useState } from 'react';
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
      <p>The accordion system is composed of three master components and one published child component.</p>
      <table><thead><tr><th>Component</th><th>Type</th><th>Description</th></tr></thead><tbody>
        <tr><td>Accordion Header</td><td>Master</td><td>Primary trigger that expands or collapses the content section</td></tr>
        <tr><td>Accordion Footer</td><td>Master</td><td>Appears within expanded sections, contains supporting content or actions</td></tr>
        <tr><td>Accordion Dropdown (Prototype)</td><td>Master</td><td>Controls the expand and collapse interaction behavior</td></tr>
        <tr><td>Accordion Container</td><td>Published</td><td>Composed accordion layout supporting 1–5 sections</td></tr>
      </tbody></table>

      <h2>Accordion Header</h2>
      <p>The accordion header acts as the primary trigger that expands or collapses the content section.</p>
      <h3>Sizes</h3>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Large</td><td>Default size with comfortable touch targets</td></tr>
        <tr><td>Small</td><td>Compact size for dense layouts</td></tr>
      </tbody></table>
      <h3>Types</h3>
      <table><thead><tr><th>Type</th><th>Description</th></tr></thead><tbody>
        <tr><td>Single Text</td><td>Displays one line of header content</td></tr>
        <tr><td>Dual Text</td><td>Displays primary and secondary text</td></tr>
      </tbody></table>
      <h3>Optional Elements</h3>
      <table><thead><tr><th>Element</th><th>Description</th></tr></thead><tbody>
        <tr><td>Leading Icon</td><td>Displays an icon before the text</td></tr>
        <tr><td>Trailing Icon</td><td>Indicates expand or collapse interaction</td></tr>
        <tr><td>Badge</td><td>Displays contextual status or metadata</td></tr>
        <tr><td>Status Text</td><td>Displays supporting status information</td></tr>
        <tr><td>Status Indicator</td><td>Visual indicator for state or category</td></tr>
      </tbody></table>

      <h2>Accordion Footer</h2>
      <p>The accordion footer appears within expanded sections and contains supporting content or actions.</p>
      <h3>Sizes</h3>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Large</td><td>Spacious footer area</td></tr>
        <tr><td>Small</td><td>Compact footer for tight layouts</td></tr>
      </tbody></table>
      <h3>Types</h3>
      <table><thead><tr><th>Type</th><th>Description</th></tr></thead><tbody>
        <tr><td>Single Text</td><td>Displays a single informational message</td></tr>
        <tr><td>Dual Text</td><td>Displays primary and supporting text</td></tr>
      </tbody></table>
      <h3>Optional Elements</h3>
      <table><thead><tr><th>Element</th><th>Description</th></tr></thead><tbody>
        <tr><td>Leading Icon</td><td>Provides contextual visual cues</td></tr>
        <tr><td>Badge</td><td>Displays metadata or status</td></tr>
        <tr><td>CTA Buttons</td><td>Allows users to take actions related to the expanded content</td></tr>
        <tr><td>Tags</td><td>Displays categorized metadata or attributes</td></tr>
      </tbody></table>

      <h2>Published Accordion Component</h2>
      <p>The final accordion component is the published version used within product interfaces.</p>
      <h3>Accordion Count</h3>
      <table><thead><tr><th>Count</th><th>Description</th></tr></thead><tbody>
        <tr><td>1 section</td><td>Single expandable item</td></tr>
        <tr><td>2 sections</td><td>Two grouped items</td></tr>
        <tr><td>3 sections</td><td>Three grouped items</td></tr>
        <tr><td>4 sections</td><td>Four grouped items</td></tr>
        <tr><td>5 sections</td><td>Maximum recommended group</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default (Collapsed)</td><td>Section is closed, only header visible</td></tr>
        <tr><td>Expanded</td><td>Section is open, content is visible</td></tr>
        <tr><td>Hover</td><td>Cursor hovering over the header area</td></tr>
        <tr><td>Disabled</td><td>Non-interactive, visually muted</td></tr>
      </tbody></table>

      <h2>Component Behavior</h2>
      <ul>
        <li>Clicking the header expands or collapses the section</li>
        <li>Expanding a section reveals the associated content</li>
        <li>Collapsing a section hides the content</li>
        <li>Multiple accordion sections may exist within the same group</li>
        <li>Accordions may allow multiple sections expanded simultaneously or only one at a time</li>
        <li>Interaction behavior should remain consistent across the product</li>
      </ul>

      <StorybookVariantViewer slug="accordion" />
    </>
  );
}

function GuidelinesTab() {
  return (
    <>
      <h2>Usage</h2>
      <p>Accordions progressively disclose content — a header row expands to reveal its body and collapses to hide it. They shorten long pages, reduce cognitive load, and let users focus on one thing at a time.</p>
      <p>TDS ships the pattern as two systems: <strong>Accordion</strong>, a stacked list of one to five related sections, and <strong>Accordion V2</strong>, a stateful single container built for step-based flows.</p>

      <GuidelineImage title="Collapsed — default resting state" slug="accordion" section="collapsed" height={200} />
      <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginBottom: '2rem' }}>Collapsed — the default resting state. Only the header is visible: title, optional subtext and pills, and the chevron.</p>

      <GuidelineImage title="Expanded — body reveals content and footer CTA" slug="accordion" section="expanded" height={200} />
      <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginBottom: '2rem' }}>Expanded — the body reveals content and an optional footer CTA row. Slot-based content keeps custom layouts inside the system.</p>

      <h2>How to Use</h2>
      <ol>
        <li><strong>Choose the system</strong> — Accordion for stacked, related sections (FAQs, grouped settings); Accordion V2 for a single stateful container in task or step flows.</li>
        <li><strong>Pick the size</strong> — Large / Small on Accordion, Web / Mobile on V2. Switch the variant property; never scale manually.</li>
        <li><strong>Write the header first</strong> — sentence case, under six words, no punctuation. Add subtext only when it genuinely helps the expand decision.</li>
        <li><strong>Configure the content</strong> — use slot variants for custom layouts inside the body or footer; keep token-bound padding intact.</li>
        <li><strong>Set the resting state</strong> — default to all collapsed; expand the first section only when one topic clearly dominates.</li>
        <li><strong>Apply V2 header styles with meaning</strong> — Green for success, Yellow for caution, DLV Red for critical, Coal for neutral emphasis.</li>
        <li><strong>Never detach</strong> — swap variants through properties. Detaching breaks token bindings and the sync chain to Storybook.</li>
      </ol>

      <h2>When to Use</h2>
      <GuidelineImage title="Accordion stacked sections" slug="accordion" section="when-to-use" height={200} />
      <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginBottom: '1.5rem' }}>Accordion / Large stacks related sections — users scan headers and expand only what they need.</p>
      <ul>
        <li>FAQs and help content — the canonical accordion use case</li>
        <li>Long forms — collapse optional or grouped field sets so the primary path stays short</li>
        <li>Settings and filters — users act on one group at a time</li>
        <li>Sequential flows — V2 with the Completed state confirms finished steps</li>
        <li>Dense mobile screens — reclaim vertical space where it is scarcest</li>
        <li>Secondary detail — specifications, terms summaries, shipment metadata</li>
      </ul>

      <h2>When Not to Use</h2>
      <GuidelineImage title="Critical info should be shown flat — not hidden" slug="accordion" section="when-not-to-use" height={200} />
      <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginBottom: '1.5rem' }}>Critical info like errors should be shown flat — never hidden behind a collapsed section.</p>
      <ul>
        <li><strong>Critical content</strong> — errors, pricing, mandatory instructions. If hiding it creates risk, show it flat.</li>
        <li><strong>Content that already fits</strong> — two or three lines need no disclosure; the extra click only adds friction.</li>
        <li><strong>Comparison tasks</strong> — users should not bounce between sections to compare; use a Table or side-by-side Cards.</li>
        <li><strong>Navigation</strong> — accordions disclose content, they do not move users between pages. Use Tabs, Side Nav or Breadcrumbs.</li>
        <li><strong>Row expansion inside tables</strong> — use Table List Accordion Rows instead.</li>
        <li><strong>Nested disclosure</strong> — more than one level deep signals an IA problem. Restructure instead.</li>
      </ul>

      <h2>Do&apos;s and Don&apos;ts</h2>
      <DoDont slug="accordion" doItems={['Headers are scannable summaries — sentence case, under six words, specific to the content they hide', 'Surface critical info flat — delivery failures, pricing, mandatory instructions must not be hidden behind a click', 'Use V2 header styles with meaning — Green success, Yellow caution, DLV Red critical', 'Default all sections to collapsed unless one clearly dominates']} dontItems={["Don't write instructions or full sentences in headers — the chevron already communicates the interaction", "Don't hide critical information behind a collapsed section — most users will never expand it", "Don't nest accordions — more than one level deep signals an architecture problem", "Don't use styles decoratively — they carry semantic meaning"]} />
    </>
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
