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
    changes: [{ category: 'Changed', items: ['Added With Thumbnails variant', 'Improved auto-play pause on hover and focus', 'Fixed pagination dot active state animation'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Carousel component', 'Default and Auto-play variants', 'Navigation arrows and pagination dots', 'Touch swipe support for mobile'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Carousel is a horizontal scrolling container for browsing through sets of items
          like images, cards, or content blocks. It provides navigation controls and
          supports both manual and automatic progression through slides.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Image galleries and product photo showcases</li>
          <li>Featured content or promotional banners</li>
          <li>Testimonial or review rotations</li>
          <li>Browsing through card-based content sets</li>
          <li>Onboarding step previews</li>
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
        <tr><td>Container</td><td>Horizontal scroll viewport</td></tr>
        <tr><td>Slide Items</td><td>Individual content cards or images</td></tr>
        <tr><td>Navigation Arrows</td><td>Left/right controls</td></tr>
        <tr><td>Pagination Dots</td><td>Current position indicators</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-carousel--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="carousel example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Full Width</td><td>Hero banners and featured content</td></tr>
        <tr><td>Contained</td><td>Within a defined column width</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Manual navigation by user</td></tr>
        <tr><td>Auto-play</td><td>Automatic slide rotation</td></tr>
        <tr><td>Paused</td><td>Auto-play stopped on hover/focus</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="carousel" />
    </>
  );
}


function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Usage Guidelines</h2>
          <GuidelineImage title="Carousel usage overview" slug="carousel" section="usage" />
        <p className="text-gray-700 mb-4">
          Carousels should be used when horizontal space is limited but content
          needs to be browseable. Always provide visible navigation controls and
          ensure content is accessible without JavaScript.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
          <GuidelineImage title="Carousel when to use" slug="carousel" section="when-to-use" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For image galleries where space is constrained</li>
          <li>For featured or promotional content rotation</li>
          <li>When browsing through a set of similar items</li>
          <li>For testimonials or review showcases</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
          <GuidelineImage title="Carousel when not to use" slug="carousel" section="when-not-to-use" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For critical content that must be seen — users often miss carousel items</li>
          <li>When all items can fit on screen — use a grid instead</li>
          <li>For navigation — use tabs or navigation components</li>
          <li>For single items — unnecessary carousel wrapper</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage title="Carousel usage guidelines" slug="component" section="guideline" />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Provide visible navigation controls (arrows, dots)',
              'Pause auto-play on hover and focus',
              'Keep slide count reasonable (3-8 items)',
              'Ensure content is meaningful on first slide',
            ]}
            dontItems={[
              'Auto-play without a pause mechanism',
              'Hide navigation controls to save space',
              'Put critical information on non-first slides',
              'Use carousels when a grid would work better',
            ]}
          />
        </div>
      </section>
    </div>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Carousel } from '@tarmac/design-system';`}</code></pre>

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
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Carousel />`}</code></pre>
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
          <li><code>role="region"</code> with <code>aria-roledescription="carousel"</code></li>
          <li><code>aria-label</code> describing the carousel content</li>
          <li>Each slide has <code>role="group"</code> with <code>aria-roledescription="slide"</code></li>
          <li><code>aria-label="Slide X of Y"</code> on each slide</li>
          <li>Navigation buttons have descriptive <code>aria-label</code></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus to navigation controls</li>
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> — Activates navigation buttons</li>
          <li><kbd>Arrow Left/Right</kbd> — Navigates between slides when focused</li>
          <li>Auto-play pauses when any carousel element receives focus</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Announces carousel region with descriptive label</li>
          <li>Each slide announces its position (X of Y)</li>
          <li>Navigation buttons announce their direction</li>
          <li>Auto-play state changes are announced via live region</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function CarouselPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Carousel"
      description="Horizontal scrolling container for browsing through sets of items like images, cards, or content blocks."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
