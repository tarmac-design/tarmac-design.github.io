'use client';

import { useState } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection, type PreviewSize, type PreviewTheme } from '@/components/ComponentPreview';

const sizeMap: Record<PreviewSize, number> = { xs: 24, sm: 28, md: 36, lg: 44, xl: 48 };
const variantColors: Record<string, { bg: string; text: string }> = {
  black: { bg: '#0D0D0D', text: '#FFFFFF' },
  white: { bg: '#FFFFFF', text: '#0D0D0D' },
  blue: { bg: '#2396FB', text: '#FFFFFF' },
  success: { bg: '#1BA86E', text: '#FFFFFF' },
  error: { bg: '#DC143C', text: '#FFFFFF' },
  warning: { bg: '#CF9F02', text: '#FFFFFF' },
  'dlv-red': { bg: '#ED1B36', text: '#FFFFFF' },
};

function ButtonDemo({ label, variant, style: btnStyle, size, theme, disabled, loading }: {
  label: string; variant: string; style: 'primary' | 'secondary' | 'tertiary';
  size: PreviewSize; theme: PreviewTheme; disabled?: boolean; loading?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const h = sizeMap[size];
  const colors = variantColors[variant] || variantColors.black;
  const isPrimary = btnStyle === 'primary';
  const isSecondary = btnStyle === 'secondary';
  const bg = isPrimary ? colors.bg : 'transparent';
  const text = isPrimary ? colors.text : colors.bg;
  const border = isSecondary ? `1.5px solid ${colors.bg}` : isPrimary ? 'none' : 'none';
  const opacity = disabled ? 0.4 : loading ? 0.7 : 1;
  const scale = pressed ? 0.96 : hovered ? 1.02 : 1;

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      disabled={disabled}
      style={{
        height: h, padding: `0 ${h * 0.5}px`, borderRadius: 6, fontSize: Math.max(11, h * 0.32),
        fontWeight: 600, background: bg, color: text, border, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity, transform: `scale(${scale})`, transition: 'all 0.15s ease',
        display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
        textDecoration: btnStyle === 'tertiary' && hovered ? 'underline' : 'none',
      }}
    >
      {loading && <span style={{ width: 12, height: 12, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />}
      {label}
    </button>
  );
}

function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="button" />
      <h2>Overview</h2>
      <p>Buttons are interactive elements used to initiate actions such as submitting data, confirming decisions, or triggering system processes.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Black, White, Blue, Success, Error, Warning, DLV Red</td></tr>
          <tr><td>Styles</td><td>Primary, Secondary, Tertiary</td></tr>
          <tr><td>Sizes</td><td>XS (24px), SM (28px), MD (36px), LG (44px), XL (48px)</td></tr>
          <tr><td>States</td><td>Default, Hover, Pressed, Focused, Disabled, Loading</td></tr>
        </tbody>
      </table>

      <h2>Color Variants</h2>

      <ComponentExampleSection title="Primary Buttons" desc="Main call-to-action buttons. Use one primary button per section.">
        {({ size, theme }) => (
          <>
            {Object.keys(variantColors).map(v => (
              <ButtonDemo key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} variant={v} style="primary" size={size} theme={theme} />
            ))}
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection title="Secondary Buttons" desc="Supporting actions with outlined style. Pair with primary buttons.">
        {({ size, theme }) => (
          <>
            {['black', 'blue', 'success', 'error', 'warning'].map(v => (
              <ButtonDemo key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} variant={v} style="secondary" size={size} theme={theme} />
            ))}
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection title="Tertiary Buttons" desc="Subtle text-only buttons for low-emphasis actions like 'Learn More' or 'Cancel'.">
        {({ size, theme }) => (
          <>
            {['black', 'blue', 'success', 'error', 'warning'].map(v => (
              <ButtonDemo key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} variant={v} style="tertiary" size={size} theme={theme} />
            ))}
          </>
        )}
      </ComponentExampleSection>

      <h2>States</h2>

      <ComponentExampleSection title="Default & Hover" desc="Hover scales up slightly (1.02x) with smooth transition.">
        {({ size, theme }) => (
          <>
            <ButtonDemo label="Default" variant="black" style="primary" size={size} theme={theme} />
            <ButtonDemo label="Secondary" variant="black" style="secondary" size={size} theme={theme} />
            <ButtonDemo label="Tertiary" variant="blue" style="tertiary" size={size} theme={theme} />
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection title="Disabled" desc="40% opacity, not-allowed cursor. Avoid using — prefer validation instead.">
        {({ size, theme }) => (
          <>
            <ButtonDemo label="Disabled Primary" variant="black" style="primary" size={size} theme={theme} disabled />
            <ButtonDemo label="Disabled Secondary" variant="black" style="secondary" size={size} theme={theme} disabled />
            <ButtonDemo label="Disabled Tertiary" variant="blue" style="tertiary" size={size} theme={theme} disabled />
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection title="Loading" desc="Spinner replaces or precedes the label. Button is non-interactive during loading.">
        {({ size, theme }) => (
          <>
            <ButtonDemo label="Loading..." variant="black" style="primary" size={size} theme={theme} loading />
            <ButtonDemo label="Saving..." variant="blue" style="primary" size={size} theme={theme} loading />
            <ButtonDemo label="Deleting..." variant="error" style="primary" size={size} theme={theme} loading />
          </>
        )}
      </ComponentExampleSection>

      <h2>Size Comparison</h2>
      <ComponentExampleSection title="All Sizes" desc="Buttons scale from XS (24px) to XL (48px) height.">
        {({ theme }) => (
          <>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as PreviewSize[]).map(s => (
              <ButtonDemo key={s} label={s.toUpperCase()} variant="black" style="primary" size={s} theme={theme} />
            ))}
          </>
        )}
      </ComponentExampleSection>
    </>
  );
}

function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { Button } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface ButtonProps {
  variant?: 'black' | 'white' | 'blue' | 'success' | 'error' | 'warning' | 'dlv-red';
  style?: 'primary' | 'secondary' | 'tertiary';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  disabled?: boolean;
  loading?: boolean;
  loadingPosition?: 'left' | 'right';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: ReactNode;
  onClick?: () => void;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`<Button variant="black" style="primary">Save Changes</Button>
<Button variant="black" style="secondary">Cancel</Button>
<Button variant="blue" style="tertiary">Learn More</Button>

// With icon
<Button variant="black" icon={<PlusIcon />} iconPosition="left">Add Item</Button>

// Loading state
<Button variant="blue" loading>Submitting...</Button>

// Full width
<Button variant="black" fullWidth>Sign In</Button>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>button-height-xl</td><td>48px</td><td>Extra large button height</td></tr>
          <tr><td>button-height-lg</td><td>44px</td><td>Large button height</td></tr>
          <tr><td>button-height-md</td><td>36px</td><td>Medium (default) button height</td></tr>
          <tr><td>button-height-sm</td><td>28px</td><td>Small button height</td></tr>
          <tr><td>button-height-xs</td><td>24px</td><td>Extra small button height</td></tr>
          <tr><td>button-border-radius</td><td>6px</td><td>Corner rounding</td></tr>
          <tr><td>button-gap</td><td>4px</td><td>Gap between icon and label</td></tr>
        </tbody>
      </table>
    </>
  );
}

function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Container</td><td>Clickable area — background, border, shape (border-radius: 6px)</td></tr>
          <tr><td>2</td><td>Loading Left</td><td>Optional spinner before label</td></tr>
          <tr><td>3</td><td>Leading Icon</td><td>Optional icon before label</td></tr>
          <tr><td>4</td><td>Label</td><td>Action text — concise, verb-first</td></tr>
          <tr><td>5</td><td>Trailing Icon</td><td>Optional icon after label</td></tr>
          <tr><td>6</td><td>Loading Right</td><td>Optional spinner after label</td></tr>
        </tbody>
      </table>

      <h2>Usage Decision Guide</h2>
      <table>
        <thead><tr><th>Context</th><th>Variant</th><th>Style</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Main page action</td><td>Black</td><td>Primary</td><td>&quot;Save Changes&quot;</td></tr>
          <tr><td>Supporting action</td><td>Black</td><td>Secondary</td><td>&quot;Cancel&quot;</td></tr>
          <tr><td>Subtle action</td><td>Black</td><td>Tertiary</td><td>&quot;Learn More&quot;</td></tr>
          <tr><td>Positive confirmation</td><td>Success</td><td>Primary</td><td>&quot;Approve&quot;</td></tr>
          <tr><td>Destructive action</td><td>Error</td><td>Primary</td><td>&quot;Delete&quot;</td></tr>
          <tr><td>Caution action</td><td>Warning</td><td>Primary</td><td>&quot;Override&quot;</td></tr>
          <tr><td>Default system action</td><td>Blue</td><td>Primary</td><td>&quot;Submit&quot;</td></tr>
          <tr><td>Dark background</td><td>White</td><td>Primary</td><td>&quot;Get Started&quot;</td></tr>
        </tbody>
      </table>

      <h2>Best Practices</h2>
      <DoDont slug="button" doItems={[
        'Use clear, action-oriented labels ("Save", "Delete", "Create")',
        'Maintain one primary button per section',
        'Provide loading states for async operations',
        'Ensure 44px minimum touch target on mobile',
        'Use icons only when they improve clarity',
      ]} dontItems={[
        'Don\'t use vague labels ("Click Here", "Submit", "OK")',
        'Don\'t use multiple primary buttons in the same context',
        'Don\'t write long sentences inside button labels',
        'Don\'t hide critical actions in low-emphasis styles',
        'Don\'t disable without explaining why',
      ]} />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Semantic HTML</td><td>&lt;button&gt;</td><td>Always use native button element</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter / Space</td><td>Focus and activate</td></tr>
          <tr><td>Focus ring</td><td>2px outline</td><td>≥ 3:1 contrast ratio</td></tr>
          <tr><td>Text contrast</td><td>≥ 4.5:1</td><td>Against background (WCAG AA)</td></tr>
          <tr><td>Touch target</td><td>44×44px min</td><td>Mobile accessibility</td></tr>
          <tr><td>Icon-only</td><td>aria-label required</td><td>Screen reader support</td></tr>
          <tr><td>Loading</td><td>aria-busy=&quot;true&quot;</td><td>Announce loading state</td></tr>
        </tbody>
      </table>
    </>
  );
}

function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added DLV Red and Coal variants</li>
        <li>Added Slider Button and Two-Liner types</li>
        <li>Added <code>loadingPosition</code> prop</li>
        <li>Improved focus ring contrast</li>
        <li>Added Ghost/Skeleton loading state</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with 6 color variants</li>
        <li>Primary, Secondary, Tertiary styles</li>
        <li>5 sizes (XS to XL)</li>
        <li>Icon support and loading states</li>
      </ul>
    </>
  );
}

export default function ButtonPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell title="Button" description="Buttons trigger actions and enable user interactions throughout the interface." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
