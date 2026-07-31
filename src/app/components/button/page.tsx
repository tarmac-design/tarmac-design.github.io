'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { RoleToggle } from '@/components/RoleToggle';
import { GuidelineImage } from '@/components/GuidelineImage';

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
          <p>Buttons trigger actions. The three styles form an emphasis hierarchy — Primary for the single most important action on a view, Secondary for parallel or supporting actions, Tertiary for low-emphasis inline actions.</p>
          <p>Nine color variants, three sizes, Button and Icon Button types, six interaction states, plus boolean leading / trailing icons and loading indicators.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/guidelines/button-designer/1.png" alt="Emphasis hierarchy — Primary · Secondary · Tertiary" style={{ width: '100%', borderRadius: '12px', margin: '24px 0' }} />
          <p><strong>Emphasis hierarchy — Primary · Secondary · Tertiary</strong></p>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Shown at 1.5×. One Primary per view. Secondary sits beside it for parallel actions; Tertiary handles inline, low-commitment actions.</p>

          <h2 style={{ color: '#4CAF50' }}>Variants</h2>
          {/* 2-column: Sizes + Types */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
            <div>
              <div style={{ background: '#fff', borderRadius: '12px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/guidelines/button-designer/2.png" alt="Sizes" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }} />
              </div>
              <p style={{ marginTop: '12px' }}><strong>Sizes — Large 44 · Medium 36 · Small 28</strong></p>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Match surface density: Large for primary page actions, Medium for cards and toolbars, Small for tables and dense UI.</p>
            </div>
            <div>
              <div style={{ background: '#fff', borderRadius: '12px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/guidelines/button-designer/4.png" alt="Types" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }} />
              </div>
              <p style={{ marginTop: '12px' }}><strong>Types — Button · Icon Button</strong></p>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Icon Button for compact, repeated actions with an unambiguous glyph. Always pair with a tooltip.</p>
            </div>
          </div>
          {/* States full width */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/guidelines/button-designer/3.png" alt="States" style={{ width: '100%', borderRadius: '12px', margin: '24px 0' }} />
          <p><strong>States — Default · Hover · Pressed · Focused · Disabled · Ghost</strong></p>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>States are variant properties — never simulate them with opacity or color overrides. Ghost is the skeleton loading placeholder.</p>

          <h2>Specs</h2>
          <p>Anatomy of Button (Primary, Black, Large, leading icon on) — shown at 3×. All values are token-bound.</p>
          {/* 2-column: anatomy image + descriptions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', margin: '24px 0' }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/guidelines/button-designer/5.png" alt="Anatomy" style={{ width: '100%', borderRadius: '12px' }} />
            </div>
            <div>
              <p><strong style={{ color: '#C9A96E' }}>1</strong> <strong>Container</strong></p>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Radius/Default (4px), Spacing/12 padding, Spacing/4 gap. Heights: Large 44 · Medium 36 · Small 28. Fill bound to the variant color token.</p>
              <p style={{ marginTop: '16px' }}><strong style={{ color: '#C9A96E' }}>2</strong> <strong>Leading / trailing icon</strong></p>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>20px, boolean. Use one, not both. Loading spinners replace icons via the Loading booleans.</p>
              <p style={{ marginTop: '16px' }}><strong style={{ color: '#C9A96E' }}>3</strong> <strong>Label</strong></p>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Noto Sans Medium 14 (B2). A verb, three words or fewer, sentence case. Exposed as a text property — edit it there, never in the layer.</p>
            </div>
          </div>

          <table><thead><tr><th style={{ color: 'var(--color-on-surface-variant)', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Element</th><th style={{ color: 'var(--color-on-surface-variant)', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Property</th><th style={{ color: 'var(--color-on-surface-variant)', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Value</th></tr></thead><tbody>
            <tr><td>Container</td><td>Heights</td><td>Large 44 · Medium 36 · Small 28</td></tr>
            <tr><td>Container</td><td>Padding · Gap</td><td>Spacing/12 (12px) · Spacing/4 (4px)</td></tr>
            <tr><td>Container</td><td>Corner radius</td><td>Radius/Default · 4px</td></tr>
            <tr><td>Label</td><td>Type</td><td>Noto Sans Medium 14 (B2) · exposed as text property</td></tr>
            <tr><td>Icon</td><td>Size</td><td>20px · boolean leading / trailing (use one, not both)</td></tr>
            <tr><td>Button</td><td>Styles</td><td>Primary · Secondary · Tertiary</td></tr>
            <tr><td>Button</td><td>Variants</td><td>Black · White · Blue · Success · Error · Warning · DLV Red · Light Coal · Dark Coal</td></tr>
            <tr><td>Button</td><td>Types</td><td>Button · Icon Button</td></tr>
            <tr><td>Button</td><td>States</td><td>Default · Hover · Pressed · Focused · Disabled · Ghost</td></tr>
            <tr><td>Loading</td><td>Booleans</td><td>Loading left · Loading right — replaces the icon, keeps width stable</td></tr>
          </tbody></table>

          <h2>How to use</h2>
          <ol>
            <li><strong>One Primary per view</strong> — it marks the single most important action. Everything else is Secondary or Tertiary.</li>
            <li><strong>Label with a verb</strong> — three words or fewer, sentence case: &quot;Create shipment&quot;, &quot;Save&quot;, &quot;Retry&quot;. Edit via the Label text property.</li>
            <li><strong>Semantic variants for semantic actions</strong> — Success to confirm, Error / DLV Red for destructive; Black and Blue are the neutral workhorses.</li>
            <li><strong>Size by density</strong> — Large for page actions, Medium for cards and toolbars, Small for tables.</li>
            <li><strong>One icon, if any</strong> — leading or trailing, never both. Icon Button needs a tooltip.</li>
            <li><strong>Loading via booleans</strong> — Loading left / right keeps button width stable; never swap in a spinner manually.</li>
            <li><strong>Never detach</strong> — states, colors and paddings are variant- and token-driven.</li>
          </ol>
          {/* Do/Don't pair — matching the DoDont component style with colored top border */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)' }}>
              <div style={{ borderTop: '3px solid #4CAF50' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/guidelines/button-designer/7.png" alt="Do" style={{ width: '100%', background: '#fff' }} />
              </div>
              <div style={{ padding: '12px 16px' }}>
                <p style={{ color: '#4CAF50', fontWeight: 600, margin: '0 0 4px' }}>✓ Do</p>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', margin: 0 }}>Pair one Primary with a Tertiary for the escape path — the hierarchy decides for the user.</p>
              </div>
            </div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)' }}>
              <div style={{ borderTop: '3px solid #ED1B36' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/guidelines/button-designer/6.png" alt="Don't" style={{ width: '100%', background: '#fff' }} />
              </div>
              <div style={{ padding: '12px 16px' }}>
                <p style={{ color: '#ED1B36', fontWeight: 600, margin: '0 0 4px' }}>✕ Don&apos;t</p>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', margin: 0 }}>Don&apos;t place two Primary buttons side by side — competing emphasis forces the user to read both and choose blind.</p>
              </div>
            </div>
          </div>

          <h2>When to use</h2>
          <ul>
            <li><span style={{ color: '#4CAF50' }}>✓</span> <strong>Committing an action</strong> — submit, save, create, confirm, retry.</li>
            <li><span style={{ color: '#4CAF50' }}>✓</span> <strong>Advancing a flow</strong> — the Primary marks the expected next step on every screen.</li>
            <li><span style={{ color: '#4CAF50' }}>✓</span> <strong>Destructive operations</strong> — Error / DLV Red variants with a confirming Dialog behind them.</li>
            <li><span style={{ color: '#4CAF50' }}>✓</span> <strong>Compact repeated actions</strong> — Icon Button in toolbars and table rows, with a Tooltip.</li>
            <li><span style={{ color: '#4CAF50' }}>✓</span> <strong>Two-line CTAs</strong> — the dedicated Two Line Button component, not a stretched Button.</li>
          </ul>

          <h3 style={{ color: '#B88B5C' }}>In product — Delhivery</h3>
          {/* 2-column: in-product examples */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
            <div>
              <div style={{ background: '#fff', borderRadius: '12px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/guidelines/button-designer/8.png" alt="Seller panel" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }} />
              </div>
              <p style={{ marginTop: '12px' }}><strong>Seller panel — form &amp; page actions</strong></p>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>One Primary (&quot;Create shipment&quot;) closes the flow; Tertiary carries the escape path. Hierarchy decides, the user just acts.</p>
            </div>
            <div>
              <div style={{ background: '#fff', borderRadius: '12px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/guidelines/button-designer/9.png" alt="Ops tables" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }} />
              </div>
              <p style={{ marginTop: '12px' }}><strong>Ops tables — row actions</strong></p>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Small buttons keep 28px rows dense but tappable in NDR queues, manifests and dispatch tables.</p>
            </div>
          </div>

          <h2>When not to use</h2>
          <ul>
            <li><span style={{ color: '#ED1B36' }}>✕</span> <strong>Navigation</strong> — moving between pages or views is a Link, Tab or Breadcrumb, not a Button.</li>
            <li><span style={{ color: '#ED1B36' }}>✕</span> <strong>Toggling state</strong> — on/off belongs to Toggle / Switch or Segmented Buttons.</li>
            <li><span style={{ color: '#ED1B36' }}>✕</span> <strong>Filtering and selection</strong> — use Pills, Tags or Checkboxes; buttons commit, they don&apos;t select.</li>
            <li><span style={{ color: '#ED1B36' }}>✕</span> <strong>More than one Primary</strong> — if two actions feel primary, the flow needs redesign, not two loud buttons.</li>
            <li><span style={{ color: '#ED1B36' }}>✕</span> <strong>Icon-only without a tooltip</strong> — unlabeled glyphs fail both usability and accessibility.</li>
            <li><span style={{ color: '#ED1B36' }}>✕</span> <strong>Custom one-off styles</strong> — nine variants and three styles cover every case; a new color is a system change, not an override.</li>
          </ul>

          <h3 style={{ color: '#B88B5C' }}>Comparison — navigation</h3>
          {/* 2-column: comparison with consistent card styling */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
            <div style={{ border: '1px solid var(--color-outline)', borderRadius: '12px', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/guidelines/button-designer/10.png" alt="Do — links navigate" style={{ width: '100%', borderBottom: '1px solid var(--color-outline)' }} />
              <div style={{ padding: '12px 16px' }}>
                <p style={{ color: '#4CAF50', fontWeight: 600, margin: '0 0 4px' }}>✓ Do — links navigate, one button acts</p>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', margin: 0 }}>Nav items are quiet links; the single Primary carries the page&apos;s one action.</p>
              </div>
            </div>
            <div style={{ border: '1px solid var(--color-outline)', borderRadius: '12px', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/guidelines/button-designer/11.png" alt="Don't — nav as buttons" style={{ width: '100%', borderBottom: '1px solid var(--color-outline)' }} />
              <div style={{ padding: '12px 16px' }}>
                <p style={{ color: '#ED1B36', fontWeight: 600, margin: '0 0 4px' }}>✕ Don&apos;t — turn the nav into buttons</p>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', margin: 0 }}>Every nav item styled as a button — emphasis everywhere is emphasis nowhere, and navigation now looks like four competing actions.</p>
              </div>
            </div>
          </div>

          {/* Do's and Don'ts at the end — 2-column layout */}
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
