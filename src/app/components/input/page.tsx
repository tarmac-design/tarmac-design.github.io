'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Types ── */
type InputVariant = 'regular' | 'success' | 'info' | 'error';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  variant?: InputVariant;
  size?: InputSize;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

/* ── Constants ── */
const variantBorderColors: Record<InputVariant, string> = {
  regular: '#CCCCCC',
  success: '#1BA86E',
  info: '#2396FB',
  error: '#ED1B36',
};

const variantFocusColors: Record<InputVariant, string> = {
  regular: '#2396FB',
  success: '#1BA86E',
  info: '#2396FB',
  error: '#ED1B36',
};

const sizeHeights: Record<InputSize, number> = { sm: 28, md: 36, lg: 44 };
const sizeFontSizes: Record<InputSize, number> = { sm: 12, md: 14, lg: 16 };
const sizePaddings: Record<InputSize, number> = { sm: 8, md: 12, lg: 14 };

/* ── Icons ── */
function SearchIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="#1BA86E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.5 3.5L13 4" />
    </svg>
  );
}

function AlertIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="#ED1B36" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 5v4M8 11v.5" />
    </svg>
  );
}

function MailIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
      <path d="M1.5 4.5L8 9l6.5-4.5" />
    </svg>
  );
}

/* ── InputDemo Component ── */
function InputDemo({
  value: controlledValue,
  onChange,
  label,
  placeholder = 'Enter text...',
  helperText,
  error,
  disabled = false,
  variant = 'regular',
  size = 'md',
  addonLeft,
  addonRight,
  ghost = false,
  theme,
}: InputProps & { ghost?: boolean; theme: 'light' | 'dark' }) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (controlledValue !== undefined) setInternalValue(controlledValue);
  }, [controlledValue]);

  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const handleChange = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
  };

  const isDark = theme === 'dark';
  const effectiveVariant = error ? 'error' : variant;
  const height = sizeHeights[size];
  const fontSize = sizeFontSizes[size];
  const px = sizePaddings[size];

  /* border color logic */
  let borderColor = isDark ? '#444' : variantBorderColors[effectiveVariant];
  if (effectiveVariant !== 'regular') borderColor = variantBorderColors[effectiveVariant];
  if (hovered && !disabled && !focused && !ghost) {
    borderColor = isDark ? '#666' : '#999';
    if (effectiveVariant !== 'regular') borderColor = variantBorderColors[effectiveVariant];
  }
  if (focused && !disabled && !ghost) borderColor = variantFocusColors[effectiveVariant];

  const bgColor = ghost
    ? 'transparent'
    : disabled
      ? (isDark ? '#2A2A2A' : '#F5F5F5')
      : (isDark ? '#1A1A1A' : '#FFFFFF');

  const textColor = disabled
    ? (isDark ? '#555' : '#AAA')
    : (isDark ? '#E5E5E5' : '#1A1A1A');

  const placeholderColor = isDark ? '#666' : '#AAA';
  const labelColor = error ? '#ED1B36' : (isDark ? '#CCC' : '#555');
  const helperColor = isDark ? '#888' : '#888';

  const focusRing = focused && !disabled && !ghost
    ? `0 0 0 3px ${variantFocusColors[effectiveVariant]}33`
    : 'none';

  const labelId = label ? `input-label-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined;
  const helperId = helperText ? `input-helper-${(label || 'field').replace(/\s+/g, '-').toLowerCase()}` : undefined;
  const errorId = error ? `input-error-${(label || 'field').replace(/\s+/g, '-').toLowerCase()}` : undefined;

  /* ghost / skeleton */
  if (ghost) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 200 }}>
        {label && (
          <div style={{
            height: 10, width: 60, borderRadius: 4,
            background: isDark ? '#333' : '#E0E0E0',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
        )}
        <div style={{
          height,
          borderRadius: 6,
          border: `1px dashed ${isDark ? '#444' : '#CCC'}`,
          background: isDark ? '#222' : '#FAFAFA',
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
        {helperText && (
          <div style={{
            height: 8, width: 100, borderRadius: 4,
            background: isDark ? '#333' : '#E0E0E0',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 200 }}>
      {label && (
        <label
          id={labelId}
          style={{
            fontSize: fontSize - 2,
            fontWeight: 600,
            color: labelColor,
            lineHeight: 1,
          }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height,
          borderRadius: 6,
          border: `1px solid ${borderColor}`,
          background: bgColor,
          boxShadow: focusRing,
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          cursor: disabled ? 'not-allowed' : 'text',
          opacity: disabled ? 0.6 : 1,
          overflow: 'hidden',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {addonLeft && (
          <span style={{
            display: 'flex', alignItems: 'center', paddingLeft: px,
            color: isDark ? '#888' : '#888', flexShrink: 0,
          }}>
            {addonLeft}
          </span>
        )}
        <input
          type="text"
          value={currentValue}
          onChange={e => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={label || placeholder}
          aria-labelledby={labelId}
          aria-describedby={errorId || helperId}
          aria-invalid={!!error}
          style={{
            flex: 1,
            height: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: textColor,
            fontSize,
            padding: `0 ${px}px`,
            cursor: disabled ? 'not-allowed' : 'text',
          }}
        />
        {addonRight && (
          <span style={{
            display: 'flex', alignItems: 'center', paddingRight: px,
            color: isDark ? '#888' : '#888', flexShrink: 0,
          }}>
            {addonRight}
          </span>
        )}
      </div>
      {error && (
        <span id={errorId} role="alert" style={{ fontSize: fontSize - 2, color: '#ED1B36', lineHeight: 1.2 }}>
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={helperId} style={{ fontSize: fontSize - 2, color: helperColor, lineHeight: 1.2 }}>
          {helperText}
        </span>
      )}
    </div>
  );
}

/* ── Pulse keyframe injector ── */
function PulseStyle() {
  return (
    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `}</style>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  const [demoValue, setDemoValue] = useState('');
  const [errorDemoValue, setErrorDemoValue] = useState('');

  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-input-field--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-input-field--playground"
        height={420}
        title="Input — TARMAC Storybook"
      />
      <PulseStyle />
      <h2>Overview</h2>
      <p>
        Input fields allow users to enter and edit single-line text. They support labels,
        placeholder text, helper messages, error states, and leading/trailing addons for
        a flexible form experience.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Regular, Success (#1BA86E), Info Blue (#2396FB), Error (#ED1B36)</td></tr>
          <tr><td>Sizes</td><td>Small (28px), Medium (36px), Large (44px)</td></tr>
          <tr><td>States</td><td>Default, Hover, Focus, Filled, Disabled, Error, Ghost/Skeleton</td></tr>
          <tr><td>Features</td><td>Label, Placeholder, Helper text, Error message, Leading addon, Trailing addon</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <ComponentExampleSection
        title="Color Variants"
        desc="Each variant uses a distinct border color. Click into the fields to see focus rings."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ size, theme }) => (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', width: '100%' }}>
            <InputDemo variant="regular" size={size as InputSize} label="Regular" placeholder="Default input" theme={theme as 'light' | 'dark'} />
            <InputDemo variant="success" size={size as InputSize} label="Success" placeholder="Validated" helperText="Looks good!" theme={theme as 'light' | 'dark'} />
            <InputDemo variant="info" size={size as InputSize} label="Info" placeholder="Informational" helperText="Hint text here" theme={theme as 'light' | 'dark'} />
            <InputDemo variant="error" size={size as InputSize} label="Error" placeholder="Invalid input" error="This field is required" theme={theme as 'light' | 'dark'} />
          </div>
        )}
      </ComponentExampleSection>

      <h2>States</h2>

      <ComponentExampleSection
        title="Default, Filled, Disabled, Error & Ghost"
        desc="Inputs support multiple interactive states. Type in the fields to see filled state."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ size, theme }) => (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', width: '100%' }}>
            <InputDemo
              size={size as InputSize}
              label="Default"
              placeholder="Type here..."
              value={demoValue}
              onChange={setDemoValue}
              theme={theme as 'light' | 'dark'}
            />
            <InputDemo
              size={size as InputSize}
              label="Filled"
              value="Hello World"
              theme={theme as 'light' | 'dark'}
            />
            <InputDemo
              size={size as InputSize}
              label="Disabled"
              placeholder="Can't edit"
              disabled
              theme={theme as 'light' | 'dark'}
            />
            <InputDemo
              size={size as InputSize}
              label="Error"
              value={errorDemoValue}
              onChange={setErrorDemoValue}
              error="Please enter a valid email"
              placeholder="user@example.com"
              theme={theme as 'light' | 'dark'}
            />
            <InputDemo
              size={size as InputSize}
              label="Ghost / Skeleton"
              helperText="Loading..."
              ghost
              theme={theme as 'light' | 'dark'}
            />
          </div>
        )}
      </ComponentExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Inputs come in three sizes. Small for dense layouts, Medium as default, Large for touch targets."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ theme }) => (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end', width: '100%' }}>
            <InputDemo size="sm" label="Small (28px)" placeholder="SM input" theme={theme as 'light' | 'dark'} />
            <InputDemo size="md" label="Medium (36px)" placeholder="MD input" theme={theme as 'light' | 'dark'} />
            <InputDemo size="lg" label="Large (44px)" placeholder="LG input" theme={theme as 'light' | 'dark'} />
          </div>
        )}
      </ComponentExampleSection>

      <h2>With Addons</h2>

      <ComponentExampleSection
        title="Leading & Trailing Addons"
        desc="Inputs can include icons or text as leading/trailing addons for additional context."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ size, theme }) => (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', width: '100%' }}>
            <InputDemo
              size={size as InputSize}
              label="Search"
              placeholder="Search..."
              addonLeft={<SearchIcon size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />}
              theme={theme as 'light' | 'dark'}
            />
            <InputDemo
              size={size as InputSize}
              label="Email"
              placeholder="you@example.com"
              addonLeft={<MailIcon size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />}
              variant="success"
              addonRight={<CheckIcon size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />}
              theme={theme as 'light' | 'dark'}
            />
            <InputDemo
              size={size as InputSize}
              label="Amount"
              placeholder="0.00"
              addonLeft={<span style={{ fontSize: sizeFontSizes[size as InputSize], fontWeight: 500 }}>$</span>}
              addonRight={<span style={{ fontSize: sizeFontSizes[size as InputSize] - 2, opacity: 0.6 }}>USD</span>}
              theme={theme as 'light' | 'dark'}
            />
            <InputDemo
              size={size as InputSize}
              label="Error with icon"
              placeholder="Invalid"
              error="Something went wrong"
              addonRight={<AlertIcon size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />}
              theme={theme as 'light' | 'dark'}
            />
          </div>
        )}
      </ComponentExampleSection>

      <h2>With Label & Helper Text</h2>

      <ComponentExampleSection
        title="Labels, Helpers & Errors"
        desc="Inputs support labels above and helper/error text below for guidance and validation."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ size, theme }) => (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', width: '100%' }}>
            <InputDemo
              size={size as InputSize}
              label="Full Name"
              placeholder="John Doe"
              helperText="Enter your legal name"
              theme={theme as 'light' | 'dark'}
            />
            <InputDemo
              size={size as InputSize}
              label="Password"
              placeholder="••••••••"
              helperText="Must be at least 8 characters"
              theme={theme as 'light' | 'dark'}
            />
            <InputDemo
              size={size as InputSize}
              label="Username"
              placeholder="@username"
              error="Username is already taken"
              theme={theme as 'light' | 'dark'}
            />
          </div>
        )}
      </ComponentExampleSection>
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
      <pre><code>{`import { Input } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  variant?: 'regular' | 'success' | 'info' | 'error';
  size?: 'sm' | 'md' | 'lg';
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}`}</code></pre>

      <h2>Props Reference</h2>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>value</td><td>string</td><td>—</td><td>Controlled input value</td></tr>
          <tr><td>onChange</td><td>(value: string) =&gt; void</td><td>—</td><td>Change handler receiving the new value</td></tr>
          <tr><td>label</td><td>string</td><td>—</td><td>Label text displayed above the input</td></tr>
          <tr><td>placeholder</td><td>string</td><td>—</td><td>Placeholder text shown when empty</td></tr>
          <tr><td>helperText</td><td>string</td><td>—</td><td>Helper text displayed below the input</td></tr>
          <tr><td>error</td><td>string</td><td>—</td><td>Error message — overrides helperText and sets error variant</td></tr>
          <tr><td>disabled</td><td>boolean</td><td>false</td><td>Disables the input</td></tr>
          <tr><td>variant</td><td>&apos;regular&apos; | &apos;success&apos; | &apos;info&apos; | &apos;error&apos;</td><td>&apos;regular&apos;</td><td>Visual variant controlling border color</td></tr>
          <tr><td>size</td><td>&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</td><td>&apos;md&apos;</td><td>Input height — SM (28px), MD (36px), LG (44px)</td></tr>
          <tr><td>addonLeft</td><td>ReactNode</td><td>—</td><td>Leading addon (icon, text, etc.)</td></tr>
          <tr><td>addonRight</td><td>ReactNode</td><td>—</td><td>Trailing addon (icon, text, etc.)</td></tr>
        </tbody>
      </table>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default input
<Input label="Name" placeholder="Enter your name" />

// With helper text
<Input
  label="Email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>

// Error state
<Input
  label="Username"
  value={username}
  onChange={setUsername}
  error="Username is already taken"
/>

// Success variant
<Input
  label="Email"
  variant="success"
  value="valid@email.com"
  helperText="Email is available"
/>

// With addons
<Input
  label="Search"
  placeholder="Search..."
  addonLeft={<SearchIcon />}
/>

<Input
  label="Amount"
  placeholder="0.00"
  addonLeft={<span>$</span>}
  addonRight={<span>USD</span>}
/>

// Size variants
<Input size="sm" label="Small" placeholder="28px height" />
<Input size="md" label="Medium" placeholder="36px height" />
<Input size="lg" label="Large" placeholder="44px height" />

// Disabled
<Input label="Disabled" placeholder="Can't edit" disabled />`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>input-height-sm</td><td>28px</td></tr>
          <tr><td>input-height-md</td><td>36px</td></tr>
          <tr><td>input-height-lg</td><td>44px</td></tr>
          <tr><td>input-border-radius</td><td>6px</td></tr>
          <tr><td>input-padding-sm</td><td>8px</td></tr>
          <tr><td>input-padding-md</td><td>12px</td></tr>
          <tr><td>input-padding-lg</td><td>14px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Border</th><th>Focus Ring</th></tr></thead>
        <tbody>
          <tr><td>Regular</td><td>#CCCCCC</td><td>#2396FB</td></tr>
          <tr><td>Success</td><td>#1BA86E</td><td>#1BA86E</td></tr>
          <tr><td>Info</td><td>#2396FB</td><td>#2396FB</td></tr>
          <tr><td>Error</td><td>#ED1B36</td><td>#ED1B36</td></tr>
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
          <tr><td>1</td><td>Label</td><td>Text above the input describing its purpose</td></tr>
          <tr><td>2</td><td>Container</td><td>Outer wrapper with border, background, and focus ring</td></tr>
          <tr><td>3</td><td>Leading Addon</td><td>Optional icon or text before the input area</td></tr>
          <tr><td>4</td><td>Input Field</td><td>The editable text area where users type</td></tr>
          <tr><td>5</td><td>Trailing Addon</td><td>Optional icon or text after the input area</td></tr>
          <tr><td>6</td><td>Helper Text</td><td>Guidance text below the input</td></tr>
          <tr><td>7</td><td>Error Message</td><td>Validation error text replacing helper text</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>For single-line text entry — names, emails, search queries</li>
        <li>When you need inline validation feedback</li>
        <li>For form fields that require labels and helper text</li>
        <li>When leading/trailing context (icons, currency symbols) aids comprehension</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="input"
        doItems={[
          'Always pair inputs with a visible label',
          'Use placeholder text as a hint, not a replacement for labels',
          'Show validation errors inline below the input',
          'Use appropriate variant colors to reinforce state (green for success, red for error)',
          'Provide clear error messages that explain how to fix the issue',
        ]}
        dontItems={[
          'Don\'t use placeholder text as the only label',
          'Don\'t show errors only on form submission — validate inline',
          'Don\'t disable paste on password fields',
          'Don\'t rely on color alone to convey meaning — include text',
          'Don\'t use the info variant for error states',
        ]}
      />

      <h2>Variant Guide</h2>
      <table>
        <thead><tr><th>Variant</th><th>Use Case</th><th>Border Color</th></tr></thead>
        <tbody>
          <tr><td>Regular</td><td>Default form fields</td><td>#CCCCCC</td></tr>
          <tr><td>Success</td><td>Validated / confirmed fields</td><td>#1BA86E</td></tr>
          <tr><td>Info</td><td>Informational highlight</td><td>#2396FB</td></tr>
          <tr><td>Error</td><td>Validation failure</td><td>#ED1B36</td></tr>
        </tbody>
      </table>

      <h2>Size Guide</h2>
      <table>
        <thead><tr><th>Size</th><th>Height</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>SM</td><td>28px</td><td>Dense layouts, tables, inline editing</td></tr>
          <tr><td>MD</td><td>36px</td><td>Default forms, standard layouts</td></tr>
          <tr><td>LG</td><td>44px</td><td>Touch targets, prominent forms, mobile</td></tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>textbox</td><td>Native input element</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Accessible name when no visible label</td></tr>
          <tr><td>aria-labelledby</td><td>ID</td><td>Links to the visible label element</td></tr>
          <tr><td>aria-describedby</td><td>ID</td><td>Links to helper or error text</td></tr>
          <tr><td>aria-invalid</td><td>true | false</td><td>Indicates validation error</td></tr>
          <tr><td>Focus ring</td><td>3px box-shadow</td><td>Visible focus indicator for keyboard users</td></tr>
          <tr><td>Keyboard</td><td>Tab</td><td>Moves focus to/from the input</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Input Area</strong> — Multi-line text input (textarea)</li>
        <li><strong>Search</strong> — Specialized input with search behavior</li>
        <li><strong>OTP Fields</strong> — Segmented input for verification codes</li>
        <li><strong>Dropdown</strong> — Selection input with predefined options</li>
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
        <li>Added <code>success</code>, <code>info</code>, and <code>error</code> border color variants</li>
        <li>Added <code>ghost</code> / skeleton loading state</li>
        <li>Added <code>addonLeft</code> and <code>addonRight</code> props for leading/trailing addons</li>
        <li>New size tokens: SM (28px), MD (36px), LG (44px)</li>
        <li>Updated border-radius to 6px</li>
        <li>Added 3px focus ring with variant-aware color</li>
        <li>Improved accessibility with aria-describedby, aria-invalid, and role=&quot;alert&quot; on errors</li>
        <li>Helper text now hidden when error message is present</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with default, disabled, and error states</li>
        <li>Single size (40px height)</li>
        <li>Label and placeholder support</li>
        <li>Basic helper text and error message</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function InputPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Input"
      description="Text inputs allow users to enter and edit single-line text with labels, validation, and addons."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
