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

/* ── Checkmark SVG ── */
function CheckmarkIcon({ size = 14, color = '#FFF' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Indeterminate dash SVG ── */
function IndeterminateIcon({ size = 14, color = '#FFF' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M3 7H11" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Interactive Checkbox Demo ── */
function CheckboxDemo({
  checked: controlledChecked,
  indeterminate = false,
  onChange,
  label,
  description,
  disabled = false,
  error,
  variant = 'standard',
  theme,
}: {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  variant?: 'standard' | 'blue' | 'green' | 'dlv-red';
  theme: 'light' | 'dark';
}) {
  const [internalChecked, setInternalChecked] = useState(controlledChecked ?? false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;
  const accentColor = variantColors[variant] || variantColors.standard;

  useEffect(() => {
    if (controlledChecked !== undefined) setInternalChecked(controlledChecked);
  }, [controlledChecked]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setInternalChecked(next);
    onChange?.(next);
  };

  const isActive = isChecked || indeterminate;
  const borderColor = error
    ? '#ED1B36'
    : isActive
      ? accentColor
      : hovered
        ? (theme === 'dark' ? '#888' : '#666')
        : (theme === 'dark' ? '#555' : '#B0B0B0');

  const bgColor = isActive ? accentColor : 'transparent';
  const opacity = disabled ? 0.4 : 1;
  const textColor = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const descColor = theme === 'dark' ? '#999' : '#666';
  const errorColor = '#ED1B36';

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
        {/* Hidden native input for accessibility */}
        <input
          ref={inputRef}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          onChange={handleToggle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-checked={indeterminate ? 'mixed' : isChecked}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${label}` : undefined}
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
        {/* Visual checkbox box */}
        <span
          style={{
            width: 20,
            height: 20,
            minWidth: 20,
            borderRadius: 4,
            border: `2px solid ${borderColor}`,
            background: bgColor,
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
          {indeterminate ? (
            <IndeterminateIcon size={14} color="#FFF" />
          ) : isChecked ? (
            <CheckmarkIcon size={14} color="#FFF" />
          ) : null}
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
      {error && (
        <span
          id={`error-${label}`}
          style={{ fontSize: 12, color: errorColor, marginTop: 4, marginLeft: 30, display: 'block' }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

/* ── Checkbox Group Demo ── */
function CheckboxGroupDemo({
  legend,
  children,
  theme,
}: {
  legend: string;
  children: ReactNode;
  theme: 'light' | 'dark';
}) {
  const textColor = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  return (
    <fieldset
      style={{
        border: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <legend style={{ fontSize: 14, fontWeight: 600, color: textColor, marginBottom: 4 }}>
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}


/* ── Checkbox Example Section with variant control ── */
function CheckboxExampleSection({
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
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectAllIndeterminate, setSelectAllIndeterminate] = useState(false);
  const [groupItems, setGroupItems] = useState([false, false, false]);

  const handleSelectAll = () => {
    if (selectAllChecked || selectAllIndeterminate) {
      setGroupItems([false, false, false]);
      setSelectAllChecked(false);
      setSelectAllIndeterminate(false);
    } else {
      setGroupItems([true, true, true]);
      setSelectAllChecked(true);
      setSelectAllIndeterminate(false);
    }
  };

  const handleGroupItem = (idx: number, val: boolean) => {
    const next = [...groupItems];
    next[idx] = val;
    setGroupItems(next);
    const allChecked = next.every(Boolean);
    const someChecked = next.some(Boolean);
    setSelectAllChecked(allChecked);
    setSelectAllIndeterminate(!allChecked && someChecked);
  };

  return (
    <>
      <StorybookVariantViewer slug="checkbox" />
      <h2>Overview</h2>
      <p>
        Checkboxes allow users to select one or more items from a set of options.
        They support checked, unchecked, and indeterminate states with multiple color variants.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Standard (Black), Blue, Green, DLV Red</td></tr>
          <tr><td>States</td><td>Unchecked, Checked, Indeterminate, Hover, Focus, Disabled, Error</td></tr>
          <tr><td>Features</td><td>Label, Description, Error message, CheckboxGroup</td></tr>
          <tr><td>Size</td><td>20×20px control with 4px border-radius</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <CheckboxExampleSection
        title="Color Variants"
        desc="Each variant uses a distinct accent color when checked. Click to toggle."
      >
        {({ theme, variant }) => (
          <>
            {(Object.keys(variantColors) as Array<'standard' | 'blue' | 'green' | 'dlv-red'>).map(v => (
              <CheckboxDemo key={v} variant={v} label={variantLabels[v]} theme={theme} />
            ))}
          </>
        )}
      </CheckboxExampleSection>

      <h2>States</h2>

      <CheckboxExampleSection
        title="All States"
        desc="Demonstrates unchecked, checked, indeterminate, disabled, and error states."
      >
        {({ theme, variant }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <CheckboxDemo variant={variant} label="Unchecked" theme={theme} />
            <CheckboxDemo variant={variant} label="Checked" checked theme={theme} />
            <CheckboxDemo variant={variant} label="Indeterminate" checked indeterminate theme={theme} />
            <CheckboxDemo variant={variant} label="Disabled unchecked" disabled theme={theme} />
            <CheckboxDemo variant={variant} label="Disabled checked" checked disabled theme={theme} />
            <CheckboxDemo variant={variant} label="Error state" error="This field is required" theme={theme} />
          </div>
        )}
      </CheckboxExampleSection>

      <h2>With Description</h2>

      <CheckboxExampleSection
        title="Label + Description"
        desc="Checkboxes can include supplementary helper text below the label."
      >
        {({ theme, variant }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <CheckboxDemo
              variant={variant}
              label="Email notifications"
              description="Receive email updates about your account activity"
              theme={theme}
            />
            <CheckboxDemo
              variant={variant}
              label="Marketing emails"
              description="Get notified about new features and promotions"
              theme={theme}
            />
          </div>
        )}
      </CheckboxExampleSection>

      <h2>Checkbox Group</h2>

      <CheckboxExampleSection
        title="Select All with Indeterminate"
        desc="A parent checkbox controls child checkboxes. Partial selection shows the indeterminate state."
      >
        {({ theme, variant }) => (
          <CheckboxGroupDemo legend="Select toppings" theme={theme}>
            <CheckboxDemo
              variant={variant}
              label="Select all"
              checked={selectAllChecked}
              indeterminate={selectAllIndeterminate}
              onChange={handleSelectAll}
              theme={theme}
            />
            <div style={{ marginLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Cheese', 'Pepperoni', 'Mushrooms'].map((item, idx) => (
                <CheckboxDemo
                  key={item}
                  variant={variant}
                  label={item}
                  checked={groupItems[idx]}
                  onChange={(val) => handleGroupItem(idx, val)}
                  theme={theme}
                />
              ))}
            </div>
          </CheckboxGroupDemo>
        )}
      </CheckboxExampleSection>
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
      <pre><code>{`import { Checkbox, CheckboxGroup } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  variant?: 'standard' | 'blue' | 'green' | 'dlv-red';
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Standard checkbox
<Checkbox label="Accept terms" />

// Controlled checkbox
<Checkbox
  label="Subscribe to newsletter"
  checked={isChecked}
  onChange={setIsChecked}
/>

// With description
<Checkbox
  label="Email notifications"
  description="Receive updates about your account"
  variant="blue"
/>

// Indeterminate state
<Checkbox
  label="Select all"
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={handleSelectAll}
/>

// Disabled
<Checkbox label="Unavailable option" disabled />

// Error state
<Checkbox label="Required field" error="This field is required" />

// Color variants
<Checkbox label="Standard" variant="standard" />
<Checkbox label="Blue" variant="blue" />
<Checkbox label="Green" variant="green" />
<Checkbox label="DLV Red" variant="dlv-red" />`}</code></pre>

      <h2>Checkbox Group</h2>
      <pre><code>{`<CheckboxGroup label="Select toppings">
  <Checkbox label="Cheese" value="cheese" />
  <Checkbox label="Pepperoni" value="pepperoni" />
  <Checkbox label="Mushrooms" value="mushrooms" />
</CheckboxGroup>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>checkbox-size</td><td>20px</td></tr>
          <tr><td>checkbox-border-radius</td><td>4px</td></tr>
          <tr><td>checkbox-focus-ring</td><td>3px offset</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Accent Color</th><th>Checkmark</th></tr></thead>
        <tbody>
          <tr><td>standard</td><td>#0D0D0D</td><td>#FFFFFF</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>#FFFFFF</td></tr>
          <tr><td>green</td><td>#1BA86E</td><td>#FFFFFF</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>#FFFFFF</td></tr>
        </tbody>
      </table>

      <h3>State Tokens</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>checkbox-border-color</td><td>#B0B0B0</td><td>Default unchecked border</td></tr>
          <tr><td>checkbox-border-hover</td><td>#666</td><td>Border on hover</td></tr>
          <tr><td>checkbox-disabled-opacity</td><td>0.4</td><td>Opacity when disabled</td></tr>
          <tr><td>checkbox-error-border</td><td>#ED1B36</td><td>Border color in error state</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all checkbox variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-checkbox--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Wrapper holding the checkbox control and label area</td></tr>
          <tr><td>2</td><td>Control</td><td>The 20×20px square box that shows checked state</td></tr>
          <tr><td>3</td><td>Checkmark / Dash</td><td>SVG icon indicating checked or indeterminate state</td></tr>
          <tr><td>4</td><td>Label</td><td>Primary text describing the option</td></tr>
          <tr><td>5</td><td>Description</td><td>Optional helper text below the label</td></tr>
          <tr><td>6</td><td>Error Message</td><td>Validation error text shown below the control</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>When users can select multiple options from a list</li>
        <li>For binary choices with a visible label (e.g., &quot;Accept terms&quot;)</li>
        <li>For &quot;select all&quot; patterns with indeterminate state</li>
        <li>In forms where multiple selections are valid</li>
        <li>In settings panels for toggling feature flags</li>
      </ul>

      <h2>When Not to Use</h2>
      <ul>
        <li>For mutually exclusive options — use Radio instead</li>
        <li>For instant on/off toggles — use Switch/Toggle instead</li>
        <li>For single-select dropdowns — use Select instead</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="checkbox"
        doItems={[
          'Use when users can select multiple options from a set',
          'Always provide a visible label for accessibility',
          'Use indeterminate state for "select all" parent checkboxes',
          'Group related checkboxes inside a fieldset with a legend',
          'Ensure touch targets are at least 44×44px on mobile',
        ]}
        dontItems={[
          'Don\'t use for binary on/off — use a toggle instead',
          'Don\'t use without labels — screen readers need them',
          'Don\'t pre-check options that benefit the business, not the user',
          'Don\'t nest checkbox groups more than 2 levels deep',
          'Don\'t use checkboxes for mutually exclusive choices',
        ]}
      />

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should be concise and clearly describe the option</li>
        <li>Use sentence case for labels</li>
        <li>Phrase labels positively (e.g., &quot;Show notifications&quot; not &quot;Don&apos;t hide notifications&quot;)</li>
        <li>Description text should add context, not repeat the label</li>
        <li>Error messages should explain how to fix the issue</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>checkbox</td><td>Native input type=&quot;checkbox&quot; provides this implicitly</td></tr>
          <tr><td>aria-checked</td><td>true | false | mixed</td><td>Reflects current state including indeterminate</td></tr>
          <tr><td>aria-labelledby</td><td>ID reference</td><td>Associates visible label with the control</td></tr>
          <tr><td>aria-describedby</td><td>ID reference</td><td>Links to description or error text</td></tr>
          <tr><td>aria-invalid</td><td>true | false</td><td>Indicates validation error state</td></tr>
          <tr><td>Keyboard: Space</td><td>—</td><td>Toggles the checked state</td></tr>
          <tr><td>Keyboard: Tab</td><td>—</td><td>Moves focus to the next focusable element</td></tr>
          <tr><td>Focus ring</td><td>3px accent color</td><td>Visible focus indicator around the control</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Radio</strong> — For mutually exclusive single-select options</li>
        <li><strong>Toggle / Switch</strong> — For instant on/off binary controls</li>
        <li><strong>Pills</strong> — For selectable filter chips</li>
        <li><strong>Dropdown</strong> — For single-select from a long list</li>
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
        <li>Added <code>indeterminate</code> prop with visual dash icon</li>
        <li>Added <code>description</code> prop for helper text</li>
        <li>Added <code>error</code> prop with validation message</li>
        <li>Added <code>variant</code> prop for color customization</li>
        <li>Added <code>CheckboxGroup</code> component for grouped checkboxes</li>
        <li>Improved focus ring with accent color tinting</li>
        <li>Updated control size to 20×20px with 4px border-radius</li>
        <li>Enhanced accessibility with aria-checked=&quot;mixed&quot; support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with checked and unchecked states</li>
        <li>Label and disabled support</li>
        <li>Basic keyboard navigation (Space to toggle)</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function CheckboxPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Checkbox"
      description="Checkboxes allow users to select one or more items from a set of options."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
