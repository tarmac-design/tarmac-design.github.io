'use client';

import { useState } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="stepper" />
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 2 — Code                                   */
/* ─────────────────────────────────────────────── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { Stepper } from '@tarmac/design-system';`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`interface StepItem {
  /** Display label for the step. */
  label: string;
  /** Optional secondary text shown below the label. */
  subtext?: string;
  /** Explicit status override. When omitted, status is derived from currentStep. */
  status?: 'default' | 'active' | 'completed' | 'error' | 'disabled';
}

interface StepperProps {
  /** Array of step definitions. Each step must have a label. */
  steps: StepItem[];
  /** Layout direction of the stepper. */
  orientation?: 'horizontal' | 'vertical';
  /** Color variant for active and completed indicators. */
  variant?: 'black' | 'coal' | 'blue' | 'green' | 'dlv-red';
  /** Size of step circles. */
  size?: 'sm' | 'md' | 'lg';
  /** Zero-based index of the current active step. Steps before this are marked completed. */
  currentStep?: number;
  /** Style of connector lines between steps. */
  connectorStyle?: 'solid' | 'dotted';
  /** Callback fired when a completed step is clicked. */
  onStepClick?: (stepIndex: number) => void;
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>steps</code></td><td><code>StepItem[]</code></td><td>required</td><td>Array of step objects. Each must include a <code>label</code>. Optional <code>subtext</code> and <code>status</code> override.</td></tr>
          <tr><td><code>orientation</code></td><td><code>string</code></td><td><code>&apos;horizontal&apos;</code></td><td>Layout direction: <code>horizontal</code> or <code>vertical</code>.</td></tr>
          <tr><td><code>variant</code></td><td><code>string</code></td><td><code>&apos;blue&apos;</code></td><td>Color variant: <code>black</code>, <code>coal</code>, <code>blue</code>, <code>green</code>, <code>dlv-red</code>.</td></tr>
          <tr><td><code>size</code></td><td><code>string</code></td><td><code>&apos;md&apos;</code></td><td>Circle size: <code>sm</code> (28px), <code>md</code> (36px), <code>lg</code> (44px).</td></tr>
          <tr><td><code>currentStep</code></td><td><code>number</code></td><td><code>0</code></td><td>Zero-based index of the active step. Steps before this index are auto-completed.</td></tr>
          <tr><td><code>connectorStyle</code></td><td><code>string</code></td><td><code>&apos;solid&apos;</code></td><td>Connector line style: <code>solid</code> or <code>dotted</code>.</td></tr>
          <tr><td><code>onStepClick</code></td><td><code>function</code></td><td><code>undefined</code></td><td>Callback when a completed step is clicked. Receives the step index.</td></tr>
        </tbody>
      </table>

      <h3>StepItem Properties</h3>
      <table>
        <thead><tr><th>Property</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>label</code></td><td><code>string</code></td><td>Yes</td><td>Primary text displayed below (horizontal) or beside (vertical) the step circle.</td></tr>
          <tr><td><code>subtext</code></td><td><code>string</code></td><td>No</td><td>Secondary description text shown below the label.</td></tr>
          <tr><td><code>status</code></td><td><code>string</code></td><td>No</td><td>Explicit status override: <code>default</code>, <code>active</code>, <code>completed</code>, <code>error</code>, <code>disabled</code>. When omitted, derived from <code>currentStep</code>.</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>
      <pre><code>{`// Basic horizontal stepper
<Stepper
  steps={[
    { label: 'Account' },
    { label: 'Profile' },
    { label: 'Preferences' },
    { label: 'Confirm' },
  ]}
  currentStep={1}
/>

// With subtexts and variant
<Stepper
  steps={[
    { label: 'Account', subtext: 'Create your account' },
    { label: 'Profile', subtext: 'Set up your profile' },
    { label: 'Settings', subtext: 'Configure preferences' },
    { label: 'Done', subtext: 'Review and submit' },
  ]}
  currentStep={2}
  variant="green"
  size="lg"
/>

// Vertical orientation with dotted connectors
<Stepper
  steps={[
    { label: 'Order Placed', subtext: 'June 15, 2024' },
    { label: 'Processing', subtext: 'Preparing shipment' },
    { label: 'Shipped', subtext: 'In transit' },
    { label: 'Delivered', subtext: 'Estimated June 20' },
  ]}
  orientation="vertical"
  connectorStyle="dotted"
  currentStep={1}
  variant="dlv-red"
/>

// With explicit status overrides
<Stepper
  steps={[
    { label: 'Details', status: 'completed' },
    { label: 'Payment', status: 'error' },
    { label: 'Review', status: 'disabled' },
    { label: 'Confirm', status: 'disabled' },
  ]}
  variant="blue"
/>

// Controlled stepper with navigation
const [step, setStep] = useState(0);
<Stepper
  steps={steps}
  currentStep={step}
  onStepClick={(i) => setStep(i)}
/>
<button onClick={() => setStep(s => Math.max(0, s - 1))}>Prev</button>
<button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>Next</button>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>stepper-circle-sm</td><td>28px</td></tr>
          <tr><td>stepper-circle-md</td><td>36px</td></tr>
          <tr><td>stepper-circle-lg</td><td>44px</td></tr>
          <tr><td>stepper-connector-thickness</td><td>2px (sm/md), 3px (lg)</td></tr>
          <tr><td>stepper-connector-gap</td><td>8px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Active / Completed</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>Neutral / monochrome</td></tr>
          <tr><td>coal</td><td>#525252</td><td>Subtle / secondary</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>Primary / informational</td></tr>
          <tr><td>green</td><td>#1BA86E</td><td>Success / positive flow</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>Brand / Delhivery accent</td></tr>
        </tbody>
      </table>

      <h3>State Colors</h3>
      <table>
        <thead><tr><th>State</th><th>Light Theme</th><th>Dark Theme</th></tr></thead>
        <tbody>
          <tr><td>Default circle</td><td>#CCC</td><td>#444</td></tr>
          <tr><td>Default text</td><td>#888</td><td>#999</td></tr>
          <tr><td>Disabled circle</td><td>#E0E0E0</td><td>#333</td></tr>
          <tr><td>Error</td><td colSpan={2}>#DC143C</td></tr>
        </tbody>
      </table>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 3 — Usage                                  */
/* ─────────────────────────────────────────────── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Container</td><td>Wrapper element holding all steps and connectors</td></tr>
          <tr><td>2</td><td>Step Circle</td><td>Numbered or icon indicator for each step</td></tr>
          <tr><td>3</td><td>Step Label</td><td>Primary text identifying the step</td></tr>
          <tr><td>4</td><td>Step Subtext</td><td>Optional secondary description below the label</td></tr>
          <tr><td>5</td><td>Connector</td><td>Line connecting adjacent step circles (solid or dotted)</td></tr>
          <tr><td>6</td><td>Checkmark</td><td>Icon replacing the number in completed steps</td></tr>
          <tr><td>7</td><td>Error Icon</td><td>X icon replacing the number in error steps</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>Multi-step forms or wizards (registration, checkout, onboarding)</li>
        <li>Order tracking or shipment progress</li>
        <li>Workflow pipelines with sequential stages</li>
        <li>Setup or configuration flows</li>
        <li>Approval processes with discrete stages</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="stepper"
        doItems={[
          'Use 3–7 steps for optimal readability',
          'Keep step labels short and descriptive (1–3 words)',
          'Show completed, current, and upcoming steps clearly',
          'Allow navigation back to completed steps when possible',
          'Use vertical orientation for narrow or mobile layouts',
          'Use subtexts to provide additional context when needed',
        ]}
        dontItems={[
          'Don\'t use more than 7 steps — break into sub-steps instead',
          'Don\'t skip steps without validation',
          'Don\'t hide the total step count from the user',
          'Don\'t use steppers for content tabs — use Tabs component instead',
          'Don\'t use steppers for non-sequential processes',
          'Don\'t rely on color alone to convey step status',
        ]}
      />

      <h2>Orientation Guide</h2>
      <table>
        <thead><tr><th>Orientation</th><th>Use When</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Horizontal</td><td>Wide layouts, desktop views, few steps</td><td>Checkout flow, form wizard</td></tr>
          <tr><td>Vertical</td><td>Narrow layouts, mobile, many steps, timeline-style</td><td>Order tracking, approval pipeline</td></tr>
        </tbody>
      </table>

      <h2>State Behavior</h2>
      <table>
        <thead><tr><th>State</th><th>Visual</th><th>Behavior</th></tr></thead>
        <tbody>
          <tr><td>Default</td><td>Muted circle with number</td><td>Upcoming step, not yet reachable</td></tr>
          <tr><td>Active</td><td>Highlighted circle with glow ring</td><td>Current step the user is on</td></tr>
          <tr><td>Completed</td><td>Colored circle with checkmark</td><td>Step finished, may be clickable to revisit</td></tr>
          <tr><td>Error</td><td>Red circle with X icon</td><td>Step has validation errors or issues</td></tr>
          <tr><td>Disabled</td><td>Faded circle, reduced opacity</td><td>Step is locked and not accessible</td></tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>list</td><td>Container uses list semantics for step sequence</td></tr>
          <tr><td>role</td><td>listitem</td><td>Each step is a list item</td></tr>
          <tr><td>aria-current</td><td>step</td><td>Identifies the currently active step</td></tr>
          <tr><td>aria-disabled</td><td>true</td><td>Applied to disabled steps</td></tr>
          <tr><td>aria-label</td><td>Progress</td><td>Accessible name for the stepper container</td></tr>
          <tr><td>Contrast</td><td>≥ 3:1</td><td>Step indicators meet WCAG AA for non-text elements</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter</td><td>Navigate and activate clickable completed steps</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Progress Bar</strong> — Use for continuous progress indication (percentage-based)</li>
        <li><strong>Tabs</strong> — Use for switching between content panels (non-sequential)</li>
        <li><strong>Breadcrumbs</strong> — Use for navigation hierarchy, not progress</li>
        <li><strong>Status Indicator</strong> — Use for static status display without sequential flow</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 4 — Changelog                              */
/* ─────────────────────────────────────────────── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added horizontal and vertical orientations</li>
        <li>Added 5 color variants: Black, Coal, Blue, Green, DLV Red</li>
        <li>Added 3 size options: SM (28px), MD (36px), LG (44px)</li>
        <li>Added step states: Default, Active, Completed, Error, Disabled</li>
        <li>Added solid and dotted connector styles</li>
        <li>Added <code>subtext</code> support for secondary step descriptions</li>
        <li>Added <code>status</code> override per step for explicit state control</li>
        <li>Checkmark icon for completed steps, X icon for error steps</li>
        <li>Active step glow ring for visual emphasis</li>
        <li>Full accessibility support with <code>role=&quot;list&quot;</code>, <code>aria-current</code>, and <code>aria-disabled</code></li>
        <li>Light and dark theme support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with horizontal numbered stepper</li>
        <li>Basic active and completed states</li>
        <li>Single color option (primary blue)</li>
        <li>Fixed 32px circle size</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function StepperPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Stepper"
      description="Steppers display progress through a sequence of numbered steps, guiding users through multi-step workflows."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
