'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Variant colors ── */
const variantColors: Record<string, string> = {
  standard: '#0D0D0D',
  blue: '#2396FB',
  green: '#1BA86E',
  'dlv-red': '#ED1B36',
};

const variantLabels: Record<string, string> = {
  standard: 'Standard',
  blue: 'Blue',
  green: 'Green',
  'dlv-red': 'DLV Red',
};

/* ── RadioProps / RadioGroupProps interfaces ── */
interface RadioProps {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  variant?: 'standard' | 'blue' | 'green' | 'dlv-red';
}

interface RadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  label?: string;
}

/* ── Interactive Radio Demo ── */
function RadioDemo({
  value,
  label,
  description,
  disabled = false,
  variant = 'standard',
  selected = false,
  onSelect,
  theme,
}: RadioProps & {
  selected?: boolean;
  onSelect?: (value: string) => void;
  theme: 'light' | 'dark';
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const accentColor = variantColors[variant] || variantColors.standard;

  const handleSelect = () => {
    if (disabled) return;
    onSelect?.(value);
  };

  const borderColor = selected
    ? accentColor
    : hovered && !disabled
      ? (theme === 'dark' ? '#888' : '#666')
      : (theme === 'dark' ? '#555' : '#B0B0B0');

  const opacity = disabled ? 0.4 : 1;
  const textColor = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const descColor = theme === 'dark' ? '#999' : '#666';

  return (
    <div style={{ opacity, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => !disabled && setPressed(true)}
        onMouseUp={() => setPressed(false)}
      >
        {/* Hidden native radio input for accessibility */}
        <input
          ref={inputRef}
          type="radio"
          value={value}
          checked={selected}
          disabled={disabled}
          onChange={handleSelect}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        />
        {/* Visual radio circle */}
        <span
          style={{
            width: 20,
            height: 20,
            minWidth: 20,
            borderRadius: '50%',
            border: `2px solid ${borderColor}`,
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
            transform: pressed && !disabled ? 'scale(0.9)' : 'scale(1)',
            boxShadow: focused
              ? `0 0 0 3px ${accentColor}44`
              : hovered && !disabled
                ? `0 0 0 4px ${accentColor}22`
                : 'none',
            marginTop: 1,
          }}
        >
          {selected && (
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: accentColor,
                transition: 'transform 0.15s ease',
                transform: pressed && !disabled ? 'scale(0.85)' : 'scale(1)',
              }}
            />
          )}
        </span>
        {/* Label + description */}
        {(label || description) && (
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {label && (
              <span style={{ fontSize: 14, fontWeight: 500, color: textColor, lineHeight: '20px' }}>
                {label}
              </span>
            )}
            {description && (
              <span style={{ fontSize: 12, color: descColor, lineHeight: '16px' }}>
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    </div>
  );
}

/* ── RadioGroup Demo ── */
function RadioGroupDemo({
  value,
  onChange,
  children,
  label,
  theme,
}: RadioGroupProps & { theme: 'light' | 'dark' }) {
  const textColor = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  return (
    <fieldset
      role="radiogroup"
      aria-label={label}
      style={{
        border: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {label && (
        <legend style={{ fontSize: 14, fontWeight: 600, color: textColor, marginBottom: 4 }}>
          {label}
        </legend>
      )}
      {children}
    </fieldset>
  );
}

/* ── Radio Example Section with variant control ── */
function RadioExampleSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: (props: { theme: 'light' | 'dark'; variant: 'standard' | 'blue' | 'green' | 'dlv-red' }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState<'standard' | 'blue' | 'green' | 'dlv-red'>('standard');

  useEffect(() => { setTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);

  const bg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';
  const selectStyle: React.CSSProperties = {
    padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
    background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>{title}</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>{desc}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <select value={variant} onChange={e => setVariant(e.target.value as typeof variant)} style={selectStyle}>
          <option value="standard">Standard</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="dlv-red">DLV Red</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children({ theme, variant })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  const [variantSelected, setVariantSelected] = useState('standard');
  const [stateSelected, setStateSelected] = useState('');
  const [groupSelected, setGroupSelected] = useState('');
  const [descSelected, setDescSelected] = useState('');

  return (
    <>
      <StorybookVariantViewer slug="radio" />
      <h2>Overview</h2>
      <p>
        Radio buttons allow users to select exactly one option from a set of mutually exclusive choices.
        They support multiple color variants and optional description text.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Standard (Black), Blue, Green, DLV Red</td></tr>
          <tr><td>States</td><td>Unselected, Selected, Hover, Focus, Disabled</td></tr>
          <tr><td>Features</td><td>Label, Description, RadioGroup</td></tr>
          <tr><td>Size</td><td>20px circle, 10px inner dot when selected</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <RadioExampleSection
        title="Color Variants"
        desc="Each variant uses a distinct accent color when selected. Click to select."
      >
        {({ theme }) => (
          <>
            {(Object.keys(variantColors) as Array<'standard' | 'blue' | 'green' | 'dlv-red'>).map(v => (
              <RadioDemo
                key={v}
                value={v}
                variant={v}
                label={variantLabels[v]}
                selected={variantSelected === v}
                onSelect={setVariantSelected}
                theme={theme}
              />
            ))}
          </>
        )}
      </RadioExampleSection>

      <h2>States</h2>

      <RadioExampleSection
        title="All States"
        desc="Demonstrates unselected, selected, disabled unselected, and disabled selected states."
      >
        {({ theme, variant }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <RadioDemo
              value="unselected"
              variant={variant}
              label="Unselected"
              selected={stateSelected === 'unselected'}
              onSelect={setStateSelected}
              theme={theme}
            />
            <RadioDemo
              value="selected"
              variant={variant}
              label="Selected"
              selected={stateSelected === 'selected'}
              onSelect={setStateSelected}
              theme={theme}
            />
            <RadioDemo
              value="hover-me"
              variant={variant}
              label="Hover me"
              selected={stateSelected === 'hover-me'}
              onSelect={setStateSelected}
              theme={theme}
            />
            <RadioDemo
              value="disabled-unselected"
              variant={variant}
              label="Disabled unselected"
              disabled
              selected={false}
              theme={theme}
            />
            <RadioDemo
              value="disabled-selected"
              variant={variant}
              label="Disabled selected"
              disabled
              selected={true}
              theme={theme}
            />
          </div>
        )}
      </RadioExampleSection>

      <h2>RadioGroup</h2>

      <RadioExampleSection
        title="Radio Group"
        desc="A RadioGroup wraps multiple radios ensuring only one can be selected at a time."
      >
        {({ theme, variant }) => (
          <RadioGroupDemo label="Choose a plan" theme={theme} value={groupSelected} onChange={setGroupSelected}>
            <RadioDemo value="free" variant={variant} label="Free" selected={groupSelected === 'free'} onSelect={setGroupSelected} theme={theme} />
            <RadioDemo value="pro" variant={variant} label="Pro" selected={groupSelected === 'pro'} onSelect={setGroupSelected} theme={theme} />
            <RadioDemo value="enterprise" variant={variant} label="Enterprise" selected={groupSelected === 'enterprise'} onSelect={setGroupSelected} theme={theme} />
          </RadioGroupDemo>
        )}
      </RadioExampleSection>

      <h2>With Description</h2>

      <RadioExampleSection
        title="Label + Description"
        desc="Radios can include supplementary helper text below the label."
      >
        {({ theme, variant }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <RadioDemo
              value="email"
              variant={variant}
              label="Email notifications"
              description="Receive email updates about your account activity"
              selected={descSelected === 'email'}
              onSelect={setDescSelected}
              theme={theme}
            />
            <RadioDemo
              value="sms"
              variant={variant}
              label="SMS notifications"
              description="Get text messages for important alerts only"
              selected={descSelected === 'sms'}
              onSelect={setDescSelected}
              theme={theme}
            />
            <RadioDemo
              value="none"
              variant={variant}
              label="No notifications"
              description="You will not receive any notifications"
              selected={descSelected === 'none'}
              onSelect={setDescSelected}
              theme={theme}
            />
          </div>
        )}
      </RadioExampleSection>
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
      <pre><code>{`import { Radio, RadioGroup } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface RadioProps {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  variant?: 'standard' | 'blue' | 'green' | 'dlv-red';
}

interface RadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  label?: string;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Basic radio group
<RadioGroup value={selected} onChange={setSelected} label="Choose a plan">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>

// With description
<RadioGroup value={selected} onChange={setSelected} label="Notifications">
  <Radio
    value="email"
    label="Email notifications"
    description="Receive email updates about your account"
  />
  <Radio
    value="sms"
    label="SMS notifications"
    description="Get text messages for important alerts"
  />
</RadioGroup>

// Disabled option
<RadioGroup value={selected} onChange={setSelected}>
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" disabled />
  <Radio value="c" label="Option C" />
</RadioGroup>

// Color variants
<Radio value="std" label="Standard" variant="standard" />
<Radio value="blu" label="Blue" variant="blue" />
<Radio value="grn" label="Green" variant="green" />
<Radio value="red" label="DLV Red" variant="dlv-red" />`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>radio-size</td><td>20px</td></tr>
          <tr><td>radio-inner-dot</td><td>10px</td></tr>
          <tr><td>radio-border-radius</td><td>50% (circle)</td></tr>
          <tr><td>radio-focus-ring</td><td>3px offset</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Accent Color</th><th>Inner Dot</th></tr></thead>
        <tbody>
          <tr><td>standard</td><td>#0D0D0D</td><td>#0D0D0D</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>#2396FB</td></tr>
          <tr><td>green</td><td>#1BA86E</td><td>#1BA86E</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>#ED1B36</td></tr>
        </tbody>
      </table>

      <h3>State Tokens</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>radio-border-color</td><td>#B0B0B0</td><td>Default unselected border</td></tr>
          <tr><td>radio-border-hover</td><td>#666</td><td>Border on hover</td></tr>
          <tr><td>radio-disabled-opacity</td><td>0.4</td><td>Opacity when disabled</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all radio variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-radio--playground" target="_blank" rel="noopener noreferrer">
          TARMAC Storybook →
        </a>
      </p>
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
          <tr><td>1</td><td>Container</td><td>Wrapper holding the radio control and label area</td></tr>
          <tr><td>2</td><td>Control</td><td>The 20px circle that shows selection state</td></tr>
          <tr><td>3</td><td>Inner Dot</td><td>10px filled circle indicating the selected state</td></tr>
          <tr><td>4</td><td>Label</td><td>Primary text describing the option</td></tr>
          <tr><td>5</td><td>Description</td><td>Optional helper text below the label</td></tr>
          <tr><td>6</td><td>RadioGroup</td><td>Fieldset wrapper that manages mutual exclusivity</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>When users must select exactly one option from a set</li>
        <li>When all options should be visible at once (2–5 options)</li>
        <li>For mutually exclusive choices like payment methods or plans</li>
        <li>In forms where a default selection is appropriate</li>
      </ul>

      <h2>When Not to Use</h2>
      <ul>
        <li>For multiple selections — use Checkbox instead</li>
        <li>For binary on/off toggles — use Switch instead</li>
        <li>For more than 5 options — consider a Dropdown/Select</li>
        <li>For navigation or actions — use Tabs or Buttons</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="radio"
        doItems={[
          'Always wrap radios in a RadioGroup for mutual exclusivity',
          'Provide a visible label for every radio option',
          'Set a sensible default selection when possible',
          'Use description text to clarify complex options',
          'Ensure touch targets are at least 44×44px on mobile',
        ]}
        dontItems={[
          'Don\'t use radios for multi-select — use checkboxes instead',
          'Don\'t use without labels — screen readers need them',
          'Don\'t use for more than 5–7 options — use a dropdown',
          'Don\'t change the selected option on hover',
          'Don\'t use radios for actions — use buttons instead',
        ]}
      />

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should be concise and clearly describe each option</li>
        <li>Use sentence case for labels</li>
        <li>Keep options parallel in structure and length</li>
        <li>Description text should add context, not repeat the label</li>
        <li>Group label should describe the overall choice being made</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>radiogroup</td><td>Applied to the RadioGroup container</td></tr>
          <tr><td>role</td><td>radio</td><td>Native input type=&quot;radio&quot; provides this implicitly</td></tr>
          <tr><td>aria-checked</td><td>true | false</td><td>Reflects current selection state</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Group label for the radiogroup</td></tr>
          <tr><td>aria-describedby</td><td>ID reference</td><td>Links to description text</td></tr>
          <tr><td>Keyboard: Arrow keys</td><td>—</td><td>Navigate between radio options in a group</td></tr>
          <tr><td>Keyboard: Space</td><td>—</td><td>Selects the focused radio option</td></tr>
          <tr><td>Keyboard: Tab</td><td>—</td><td>Moves focus into/out of the radio group</td></tr>
          <tr><td>Focus ring</td><td>3px accent color</td><td>Visible focus indicator around the control</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Checkbox</strong> — For multi-select options</li>
        <li><strong>Toggle / Switch</strong> — For instant on/off binary controls</li>
        <li><strong>Dropdown</strong> — For single-select from a long list</li>
        <li><strong>Tabs</strong> — For switching between views or content panels</li>
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
        <li>Added color variants: Standard, Blue, Green, DLV Red</li>
        <li>Added <code>description</code> prop for helper text</li>
        <li>Added <code>variant</code> prop for color customization</li>
        <li>Added <code>RadioGroup</code> component for grouped radios</li>
        <li>Improved focus ring with accent color tinting</li>
        <li>Updated control size to 20px circle with 10px inner dot</li>
        <li>Enhanced accessibility with proper radiogroup role</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with selected and unselected states</li>
        <li>Label and disabled support</li>
        <li>Basic keyboard navigation (Space to select, Arrow keys to navigate)</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function RadioPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Radio"
      description="Radio buttons allow users to select exactly one option from a set of mutually exclusive choices."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
