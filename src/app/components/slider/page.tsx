'use client';

import { useState, useRef, useCallback } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection, type PreviewTheme } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Slider variant colors ── */
const variantColors: Record<string, string> = {
  black: '#0D0D0D',
  coal: '#525252',
  blue: '#2396FB',
  'dlv-red': '#ED1B36',
};

const variantLabels: Record<string, string> = {
  black: 'Black',
  coal: 'Coal',
  blue: 'Blue',
  'dlv-red': 'DLV Red',
};

/* ── SliderProps interface ── */
interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  variant?: string;
  disabled?: boolean;
  showValue?: boolean;
  label?: string;
}

/* ── SliderDemo component ── */
function SliderDemo({
  value: controlledValue,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  variant = 'black',
  disabled = false,
  showValue = true,
  label,
  theme,
}: SliderProps & { theme: PreviewTheme }) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? Math.round((max - min) / 2 + min));
  const [hovered, setHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const currentValue = controlledValue ?? internalValue;
  const color = variantColors[variant] || variantColors.black;
  const trackBg = theme === 'dark' ? '#3A3A3A' : '#D9D9D9';
  const thumbBorder = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const labelColor = theme === 'dark' ? '#B0B0B0' : '#6B6B6B';
  const textColor = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const percent = ((currentValue - min) / (max - min)) * 100;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setInternalValue(v);
    onChange?.(v);
  }, [onChange]);

  const thumbSize = hovered && !disabled ? 20 : 16;
  const uniqueId = `slider-${variant}-${label || 'default'}-${min}-${max}`.replace(/\s+/g, '-');

  return (
    <div
      style={{ width: '100%', maxWidth: 320, opacity: disabled ? 0.4 : 1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Label + value row */}
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          {label && (
            <label htmlFor={uniqueId} style={{ fontSize: 13, fontWeight: 500, color: textColor }}>
              {label}
            </label>
          )}
          {showValue && (
            <span style={{ fontSize: 13, fontWeight: 600, color, minWidth: 28, textAlign: 'right' }}>
              {currentValue}
            </span>
          )}
        </div>
      )}

      {/* Custom track visual */}
      <div ref={trackRef} style={{ position: 'relative', height: 20, display: 'flex', alignItems: 'center' }}>
        {/* Track background */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 4, borderRadius: 2,
          background: trackBg,
        }} />
        {/* Track fill */}
        <div style={{
          position: 'absolute', left: 0, width: `${percent}%`, height: 4, borderRadius: 2,
          background: color, transition: 'width 0.05s ease',
        }} />
        {/* Thumb visual */}
        <div style={{
          position: 'absolute',
          left: `${percent}%`,
          transform: 'translateX(-50%)',
          width: thumbSize,
          height: thumbSize,
          borderRadius: '50%',
          background: color,
          border: `2px solid ${thumbBorder}`,
          boxShadow: hovered && !disabled ? `0 0 0 4px ${color}22, 0 2px 6px rgba(0,0,0,0.15)` : '0 1px 3px rgba(0,0,0,0.12)',
          transition: 'all 0.15s ease',
          pointerEvents: 'none',
        }} />

        {/* Native range input (invisible, on top) */}
        <input
          id={uniqueId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          aria-label={label || 'Slider'}
          aria-valuenow={currentValue}
          aria-valuemin={min}
          aria-valuemax={max}
          style={{
            position: 'absolute', left: 0, top: 0, width: '100%', height: '100%',
            opacity: 0, cursor: disabled ? 'not-allowed' : 'pointer', margin: 0,
          }}
        />
      </div>

      {/* Min / Max labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: labelColor }}>{min}</span>
        <span style={{ fontSize: 11, color: labelColor }}>{max}</span>
      </div>
    </div>
  );
}

/* ── Dual Range Slider Demo ── */
function DualSliderDemo({
  min = 0,
  max = 100,
  variant = 'blue',
  disabled = false,
  label,
  theme,
}: { min?: number; max?: number; variant?: string; disabled?: boolean; label?: string; theme: PreviewTheme }) {
  const [low, setLow] = useState(Math.round(min + (max - min) * 0.25));
  const [high, setHigh] = useState(Math.round(min + (max - min) * 0.75));

  const color = variantColors[variant] || variantColors.blue;
  const trackBg = theme === 'dark' ? '#3A3A3A' : '#D9D9D9';
  const thumbBorder = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const labelColor = theme === 'dark' ? '#B0B0B0' : '#6B6B6B';
  const textColor = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';

  const lowPercent = ((low - min) / (max - min)) * 100;
  const highPercent = ((high - min) / (max - min)) * 100;

  return (
    <div style={{ width: '100%', maxWidth: 320, opacity: disabled ? 0.4 : 1 }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: textColor }}>{label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color }}>
            {low} – {high}
          </span>
        </div>
      )}

      <div style={{ position: 'relative', height: 20, display: 'flex', alignItems: 'center' }}>
        {/* Track background */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 4, borderRadius: 2, background: trackBg,
        }} />
        {/* Active range fill */}
        <div style={{
          position: 'absolute', left: `${lowPercent}%`, width: `${highPercent - lowPercent}%`,
          height: 4, borderRadius: 2, background: color,
        }} />
        {/* Low thumb */}
        <div style={{
          position: 'absolute', left: `${lowPercent}%`, transform: 'translateX(-50%)',
          width: 16, height: 16, borderRadius: '50%', background: color,
          border: `2px solid ${thumbBorder}`, boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          pointerEvents: 'none',
        }} />
        {/* High thumb */}
        <div style={{
          position: 'absolute', left: `${highPercent}%`, transform: 'translateX(-50%)',
          width: 16, height: 16, borderRadius: '50%', background: color,
          border: `2px solid ${thumbBorder}`, boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          pointerEvents: 'none',
        }} />

        {/* Low range input */}
        <input
          type="range" min={min} max={max} value={low}
          onChange={e => { const v = Math.min(Number(e.target.value), high - 1); setLow(v); }}
          disabled={disabled}
          aria-label={`${label || 'Range'} minimum`}
          style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', opacity: 0, cursor: disabled ? 'not-allowed' : 'pointer', margin: 0, zIndex: 2 }}
        />
        {/* High range input */}
        <input
          type="range" min={min} max={max} value={high}
          onChange={e => { const v = Math.max(Number(e.target.value), low + 1); setHigh(v); }}
          disabled={disabled}
          aria-label={`${label || 'Range'} maximum`}
          style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', opacity: 0, cursor: disabled ? 'not-allowed' : 'pointer', margin: 0, zIndex: 3 }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: labelColor }}>{min}</span>
        <span style={{ fontSize: 11, color: labelColor }}>{max}</span>
      </div>
    </div>
  );
}

/* ── Examples Tab ── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="slider" />
      <h2>Overview</h2>
      <p>Sliders allow users to select a value or range from a continuous or discrete scale. They are ideal for adjusting settings like volume, brightness, or filtering numeric ranges.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Black, Coal, Blue, DLV Red</td></tr>
          <tr><td>Types</td><td>Single, Dual / Range</td></tr>
          <tr><td>States</td><td>Default, Hover, Disabled</td></tr>
          <tr><td>Features</td><td>Min/max labels, value display, step increments</td></tr>
        </tbody>
      </table>

      <h2>Single Slider</h2>

      <ComponentExampleSection title="Default Single Slider" desc="Basic slider for selecting a single numeric value. Hover to enlarge the thumb.">
        {({ theme }) => (
          <SliderDemo variant="black" label="Volume" min={0} max={100} step={1} showValue theme={theme} />
        )}
      </ComponentExampleSection>

      <ComponentExampleSection title="With Step Increments" desc="Slider with step=10 for discrete value selection.">
        {({ theme }) => (
          <SliderDemo variant="blue" label="Brightness" min={0} max={100} step={10} showValue theme={theme} />
        )}
      </ComponentExampleSection>

      <h2>Variants</h2>

      <ComponentExampleSection title="Color Variants" desc="Sliders are available in Black, Coal, Blue, and DLV Red.">
        {({ theme }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
            {Object.keys(variantColors).map(v => (
              <SliderDemo key={v} variant={v} label={variantLabels[v]} min={0} max={100} showValue theme={theme} />
            ))}
          </div>
        )}
      </ComponentExampleSection>

      <h2>Dual / Range Slider</h2>

      <ComponentExampleSection title="Range Selection" desc="Dual-thumb slider for selecting a min and max range.">
        {({ theme }) => (
          <DualSliderDemo variant="blue" label="Price Range" min={0} max={1000} theme={theme} />
        )}
      </ComponentExampleSection>

      <ComponentExampleSection title="Range Variants" desc="Range sliders in different color variants.">
        {({ theme }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
            <DualSliderDemo variant="black" label="Black Range" min={0} max={500} theme={theme} />
            <DualSliderDemo variant="dlv-red" label="DLV Red Range" min={0} max={200} theme={theme} />
          </div>
        )}
      </ComponentExampleSection>

      <h2>Disabled</h2>

      <ComponentExampleSection title="Disabled State" desc="Disabled sliders have 40% opacity and a not-allowed cursor.">
        {({ theme }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
            <SliderDemo variant="black" label="Disabled Single" disabled showValue theme={theme} />
            <DualSliderDemo variant="blue" label="Disabled Range" disabled theme={theme} />
          </div>
        )}
      </ComponentExampleSection>

      <h2>With Labels</h2>

      <ComponentExampleSection title="Labeled Sliders" desc="Sliders with descriptive labels and current value display.">
        {({ theme }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
            <SliderDemo variant="blue" label="Temperature (°C)" min={-10} max={40} step={1} showValue theme={theme} />
            <SliderDemo variant="coal" label="Opacity (%)" min={0} max={100} step={5} showValue theme={theme} />
            <SliderDemo variant="dlv-red" label="Priority Level" min={1} max={5} step={1} showValue theme={theme} />
          </div>
        )}
      </ComponentExampleSection>
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
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
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
