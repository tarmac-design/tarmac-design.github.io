'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Toolbar Icons ── */
function BoldIcon() { return <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2h5a3 3 0 011.5 5.6A3.5 3.5 0 019.5 14H4V2zm2 5h3a1 1 0 000-2H6v2zm0 5h3.5a1.5 1.5 0 000-3H6v3z" /></svg>; }
function ItalicIcon() { return <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M6 2h6v2h-2.2l-2.6 8H9v2H3v-2h2.2l2.6-8H6V2z" /></svg>; }
function ListIcon() { return <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M2 4a1 1 0 110-2 1 1 0 010 2zm3-1.5h9v1H5v-1zm-3 5a1 1 0 110-2 1 1 0 010 2zm3-1.5h9v1H5v-1zm-3 5a1 1 0 110-2 1 1 0 010 2zm3-1.5h9v1H5v-1z" /></svg>; }

/* ── Input Area Preview ── */
function InputAreaPreview({
  variant = 'default',
  state = 'empty',
  size = 'md',
  theme,
}: {
  variant?: string;
  state?: string;
  size?: string;
  theme: 'light' | 'dark';
}) {
  const [value, setValue] = useState(state === 'filled' ? 'This is some sample text that has been entered into the text area. It demonstrates the filled state of the component.' : '');
  const [focused, setFocused] = useState(state === 'focused');

  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const border = state === 'error' ? '#DC143C' : focused ? '#2396FB' : (theme === 'dark' ? '#444' : '#DDD');
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const subtext = theme === 'dark' ? '#888' : '#999';
  const disabled = state === 'disabled';
  const maxChars = 500;
  const h = size === 'sm' ? 80 : size === 'lg' ? 200 : 120;

  return (
    <div style={{ width: 320, opacity: disabled ? 0.5 : 1 }}>
      {/* Label */}
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: text, marginBottom: 4 }}>
        Description {state === 'error' && <span style={{ color: '#DC143C' }}>*</span>}
      </label>

      {/* Toolbar for rich text variant */}
      {variant === 'toolbar' && (
        <div style={{ display: 'flex', gap: 2, padding: '4px 8px', background: theme === 'dark' ? '#333' : '#F0F0F0', borderRadius: '8px 8px 0 0', border: `1px solid ${border}`, borderBottom: 'none' }}>
          {[BoldIcon, ItalicIcon, ListIcon].map((Icon, i) => (
            <button key={i} style={{ background: 'none', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', padding: '4px 6px', borderRadius: 4, color: subtext, display: 'flex', alignItems: 'center' }}>
              <Icon />
            </button>
          ))}
        </div>
      )}

      {/* Textarea */}
      <textarea
        value={value}
        onChange={e => !disabled && setValue(e.target.value)}
        onFocus={() => !disabled && setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Enter your text here..."
        disabled={disabled}
        style={{
          width: '100%',
          height: variant === 'autoresize' ? 'auto' : h,
          minHeight: variant === 'autoresize' ? h : undefined,
          padding: '10px 12px',
          borderRadius: variant === 'toolbar' ? '0 0 8px 8px' : 8,
          border: `1.5px solid ${border}`,
          background: bg,
          color: text,
          fontSize: 13,
          lineHeight: 1.6,
          resize: variant === 'autoresize' ? 'none' : 'vertical',
          outline: 'none',
          fontFamily: 'inherit',
          cursor: disabled ? 'not-allowed' : 'text',
          transition: 'border-color 0.15s ease',
          boxSizing: 'border-box',
        }}
      />

      {/* Footer row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        {state === 'error' ? (
          <span style={{ fontSize: 12, color: '#DC143C' }}>This field is required</span>
        ) : (
          <span style={{ fontSize: 12, color: subtext }}>
            {variant === 'autoresize' ? 'Auto-resizes as you type' : 'Optional helper text'}
          </span>
        )}
        {(variant === 'counter' || variant === 'default') && (
          <span style={{ fontSize: 11, color: value.length > maxChars ? '#DC143C' : subtext }}>
            {value.length}/{maxChars}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Input Area Example Section ── */
function InputAreaExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { size: string; theme: 'light' | 'dark'; variant: string; state: string }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState('md');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState('default');
  const [state, setState] = useState('empty');

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
        <select value={size} onChange={e => setSize(e.target.value)} style={selectStyle}>
          <option value="sm">SM (80px)</option><option value="md">MD (120px)</option><option value="lg">LG (200px)</option>
        </select>
        <select value={variant} onChange={e => setVariant(e.target.value)} style={selectStyle}>
          <option value="default">Default</option><option value="counter">With Counter</option>
          <option value="autoresize">Auto-resize</option><option value="toolbar">With Toolbar</option>
        </select>
        <select value={state} onChange={e => setState(e.target.value)} style={selectStyle}>
          <option value="empty">Empty</option><option value="focused">Focused</option>
          <option value="filled">Filled</option><option value="error">Error</option>
          <option value="disabled">Disabled</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option><option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children({ size, theme, variant, state })}
      </div>
    </div>
  );
}

/* ─── TAB 1 — Examples ─── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="input-area" />
      <h2>Overview</h2>
      <p>Input Area is a multi-line text input for longer-form content. It supports character counting, auto-resize, rich text toolbars, and multiple validation states.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Default, With Counter, Auto-resize, With Toolbar (rich text)</td></tr>
          <tr><td>Sizes</td><td>SM (80px), MD (120px), LG (200px)</td></tr>
          <tr><td>States</td><td>Empty, Focused, Filled, Error, Disabled</td></tr>
          <tr><td>Features</td><td>Character count, Resize handle, Rich text toolbar, Helper text</td></tr>
        </tbody>
      </table>

      <h2>Interactive Preview</h2>
      <InputAreaExampleSection title="Input Area" desc="Use the controls to switch between variants, sizes, and states. Type in the text area to see character counting.">
        {({ size, theme, variant, state }) => <InputAreaPreview variant={variant} state={state} size={size} theme={theme} />}
      </InputAreaExampleSection>

      <h2>Sizes</h2>
      <ComponentExampleSection title="Size Comparison" desc="Three height presets for different content needs." sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}>
        {({ size, theme }) => <InputAreaPreview size={size as string} theme={theme as 'light' | 'dark'} />}
      </ComponentExampleSection>
    </>
  );
}

/* ─── TAB 2 — Code ─── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { InputArea } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface InputAreaProps {
  variant?: 'default' | 'counter' | 'autoresize' | 'toolbar';
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
  autoResize?: boolean;
  toolbar?: boolean;
  rows?: number;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default
<InputArea label="Description" placeholder="Enter text..." />

// With character counter
<InputArea variant="counter" maxLength={500} />

// Auto-resize
<InputArea variant="autoresize" autoResize />

// With rich text toolbar
<InputArea variant="toolbar" toolbar />

// Error state
<InputArea label="Bio" errorText="This field is required" />

// Disabled
<InputArea label="Notes" disabled />`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>input-area-height-sm</td><td>80px</td></tr>
          <tr><td>input-area-height-md</td><td>120px</td></tr>
          <tr><td>input-area-height-lg</td><td>200px</td></tr>
          <tr><td>input-area-border-radius</td><td>8px</td></tr>
          <tr><td>input-area-padding</td><td>10px 12px</td></tr>
          <tr><td>input-area-font-size</td><td>13px</td></tr>
          <tr><td>input-area-border-width</td><td>1.5px</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all input area variants in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-inputarea--playground" target="_blank" rel="noopener noreferrer">
          TARMAC Storybook →
        </a>
      </p>
    </>
  );
}

/* ─── TAB 3 — Usage ─── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Label</td><td>Text label above the input area</td></tr>
          <tr><td>2</td><td>Toolbar</td><td>Optional rich text formatting bar</td></tr>
          <tr><td>3</td><td>Text Area</td><td>Multi-line editable text field</td></tr>
          <tr><td>4</td><td>Resize Handle</td><td>Draggable corner for manual resizing</td></tr>
          <tr><td>5</td><td>Helper Text</td><td>Guidance or error message below the field</td></tr>
          <tr><td>6</td><td>Character Count</td><td>Current / max character indicator</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>For multi-line text input like descriptions, comments, or notes</li>
        <li>When the expected input is longer than a single line</li>
        <li>For rich text editing with formatting controls</li>
        <li>When character limits need to be communicated</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="input-area"
        doItems={[
          'Show a character counter when there is a max length',
          'Use auto-resize for conversational inputs like chat',
          'Provide clear error messages below the field',
          'Set an appropriate default height for the expected content',
          'Use the toolbar variant only when rich text is needed',
        ]}
        dontItems={[
          'Don\'t use input area for single-line inputs — use Input instead',
          'Don\'t set the height too small for the expected content',
          'Don\'t disable resize when users may need to expand the field',
          'Don\'t show the toolbar for plain text fields',
          'Don\'t rely solely on color to indicate error state',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>label</td><td>htmlFor</td><td>Associates label with the textarea</td></tr>
          <tr><td>aria-describedby</td><td>helper-id</td><td>Links helper/error text to the field</td></tr>
          <tr><td>aria-invalid</td><td>boolean</td><td>Indicates error state</td></tr>
          <tr><td>aria-disabled</td><td>boolean</td><td>Indicates disabled state</td></tr>
          <tr><td>Keyboard</td><td>Tab, Shift+Tab</td><td>Focus navigation in and out</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Text and border meet WCAG AA</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Input</strong> — Single-line text input</li>
        <li><strong>Search</strong> — Specialized search input</li>
        <li><strong>File Upload</strong> — For file-based input</li>
      </ul>
    </>
  );
}

/* ─── TAB 4 — Changelog ─── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added auto-resize variant</li>
        <li>Added rich text toolbar variant with bold, italic, list</li>
        <li>Added character counter with overflow warning</li>
        <li>Added three size presets: SM, MD, LG</li>
        <li>Improved focus ring and error state styling</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with basic multi-line text input</li>
        <li>Label, placeholder, and helper text support</li>
        <li>Disabled and error states</li>
      </ul>
    </>
  );
}

/* ─── Page Export ─── */
export default function InputAreaPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Input Area"
      description="Multi-line text input with character counting, auto-resize, and rich text toolbar support."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
