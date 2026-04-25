'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="slider" />
    </>
  );
}

/* ── Code Tab ── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { Slider } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  variant?: 'black' | 'coal' | 'blue' | 'dlv-red';
  disabled?: boolean;
  showValue?: boolean;
  label?: string;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Single slider
<Slider
  label="Volume"
  min={0}
  max={100}
  value={volume}
  onChange={setVolume}
  variant="black"
  showValue
/>

// With step increments
<Slider
  label="Brightness"
  min={0}
  max={100}
  step={10}
  value={brightness}
  onChange={setBrightness}
  variant="blue"
  showValue
/>

// Disabled slider
<Slider
  label="Locked"
  value={50}
  disabled
  variant="coal"
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>slider-track-height</td><td>4px</td><td>Track thickness</td></tr>
          <tr><td>slider-track-radius</td><td>2px</td><td>Track border radius</td></tr>
          <tr><td>slider-thumb-size</td><td>16px</td><td>Thumb diameter (default)</td></tr>
          <tr><td>slider-thumb-size-hover</td><td>20px</td><td>Thumb diameter (hover)</td></tr>
          <tr><td>slider-thumb-border</td><td>2px solid</td><td>Thumb border</td></tr>
          <tr><td>slider-track-bg-light</td><td>#D9D9D9</td><td>Track background (light)</td></tr>
          <tr><td>slider-track-bg-dark</td><td>#3A3A3A</td><td>Track background (dark)</td></tr>
        </tbody>
      </table>

      <h2>Variant Colors</h2>
      <table>
        <thead><tr><th>Variant</th><th>Hex</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>Black</td><td>#0D0D0D</td><td>Default / neutral actions</td></tr>
          <tr><td>Coal</td><td>#525252</td><td>Subtle / secondary controls</td></tr>
          <tr><td>Blue</td><td>#2396FB</td><td>Primary / informational</td></tr>
          <tr><td>DLV Red</td><td>#ED1B36</td><td>Brand accent / alerts</td></tr>
        </tbody>
      </table>
    </>
  );
}

/* ── Usage Tab ── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Track</td><td>Background rail showing the full range</td></tr>
          <tr><td>2</td><td>Fill</td><td>Colored portion indicating selected value</td></tr>
          <tr><td>3</td><td>Thumb</td><td>Draggable handle for value selection</td></tr>
          <tr><td>4</td><td>Label</td><td>Text describing the slider purpose</td></tr>
          <tr><td>5</td><td>Value Display</td><td>Current value shown beside the label</td></tr>
          <tr><td>6</td><td>Min/Max Labels</td><td>Labels at the ends of the track</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <table>
        <thead><tr><th>Context</th><th>Variant</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Volume / brightness</td><td>Black</td><td>Media player controls</td></tr>
          <tr><td>Filter ranges</td><td>Blue</td><td>Price range on e-commerce</td></tr>
          <tr><td>Priority / rating</td><td>DLV Red</td><td>Task priority selector</td></tr>
          <tr><td>Subtle adjustments</td><td>Coal</td><td>Opacity or weight controls</td></tr>
        </tbody>
      </table>

      <h2>Best Practices</h2>
      <DoDont slug="slider" doItems={[
        'Show the current value clearly near the slider',
        'Use appropriate step increments for the data type',
        'Provide min and max labels for context',
        'Use range sliders for price or date filtering',
        'Ensure thumb is large enough for touch targets (44px min)',
      ]} dontItems={[
        'Don\'t use sliders for precise numeric input — pair with an input field',
        'Don\'t use sliders for fewer than 5 possible values — use radio buttons',
        'Don\'t hide the current value from the user',
        'Don\'t use vertical sliders without strong justification',
        'Don\'t remove min/max labels when the range is non-obvious',
      ]} />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Semantic HTML</td><td>&lt;input type=&quot;range&quot;&gt;</td><td>Native slider element</td></tr>
          <tr><td>role</td><td>slider</td><td>Implicit from input[type=range]</td></tr>
          <tr><td>aria-valuenow</td><td>number</td><td>Current value</td></tr>
          <tr><td>aria-valuemin</td><td>number</td><td>Minimum value</td></tr>
          <tr><td>aria-valuemax</td><td>number</td><td>Maximum value</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Accessible name for the slider</td></tr>
          <tr><td>Keyboard</td><td>Arrow keys</td><td>Increment / decrement value</td></tr>
          <tr><td>Keyboard</td><td>Home / End</td><td>Jump to min or max</td></tr>
        </tbody>
      </table>
    </>
  );
}

/* ── Changelog Tab ── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added Coal and DLV Red color variants</li>
        <li>Added dual / range slider type</li>
        <li>Added hover effect with thumb enlargement</li>
        <li>Added step increment support</li>
        <li>Improved accessibility with native input[type=range]</li>
        <li>Added min/max labels and value display</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with single slider</li>
        <li>Black and Blue variants</li>
        <li>Default and disabled states</li>
        <li>Basic label support</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function SliderPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Slider"
      description="Sliders allow users to select a value or range from a continuous scale."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
