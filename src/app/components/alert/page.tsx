'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Alert variant colors ── */
const variantColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  black:   { bg: '#0D0D0D', border: '#0D0D0D', text: '#FFF',    icon: '#FFF' },
  white:   { bg: '#FFFFFF', border: '#E0E0E0', text: '#0D0D0D', icon: '#525252' },
  coal:    { bg: '#525252', border: '#525252', text: '#FFF',    icon: '#FFF' },
  success: { bg: '#E8F8F0', border: '#1BA86E', text: '#0D0D0D', icon: '#1BA86E' },
  error:   { bg: '#FDE8EC', border: '#DC143C', text: '#0D0D0D', icon: '#DC143C' },
  info:    { bg: '#E8F3FE', border: '#2396FB', text: '#0D0D0D', icon: '#2396FB' },
  warning: { bg: '#FEF6E0', border: '#CF9F02', text: '#0D0D0D', icon: '#CF9F02' },
};

const variantColorsDark: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  black:   { bg: '#0D0D0D', border: '#333',    text: '#FFF',    icon: '#FFF' },
  white:   { bg: '#1A1A1A', border: '#444',    text: '#FFF',    icon: '#AAA' },
  coal:    { bg: '#333',    border: '#525252', text: '#FFF',    icon: '#CCC' },
  success: { bg: '#0F2E1F', border: '#1BA86E', text: '#E0E0E0', icon: '#1BA86E' },
  error:   { bg: '#2E0F14', border: '#DC143C', text: '#E0E0E0', icon: '#DC143C' },
  info:    { bg: '#0F1E2E', border: '#2396FB', text: '#E0E0E0', icon: '#2396FB' },
  warning: { bg: '#2E2A0F', border: '#CF9F02', text: '#E0E0E0', icon: '#CF9F02' },
};

const variantLabels: Record<string, string> = {
  black: 'Black', white: 'White', coal: 'Coal',
  success: 'Success', error: 'Error', info: 'Info', warning: 'Warning',
};

/* ── Alert Props ── */
interface AlertProps {
  variant?: string;
  title?: string;
  description?: string;
  closable?: boolean;
  size?: 'sm' | 'lg';
  icon?: ReactNode;
  actions?: ReactNode;
  theme?: 'light' | 'dark';
}

/* ── Default icons per variant ── */
function DefaultIcon({ variant, size = 18 }: { variant: string; size?: number }) {
  if (variant === 'success') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === 'error') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v5M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (variant === 'warning') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path d="M10 2L1 18h18L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 8v4M10 14.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  /* info / default */
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v5M10 6.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Close icon ── */
function CloseIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
    </svg>
  );
}

/* ── AlertDemo component ── */
function AlertDemo({
  variant = 'info',
  title = 'Alert title',
  description = 'This is a description of the alert message.',
  closable = false,
  size = 'lg',
  icon,
  actions,
  theme = 'light',
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  const [closeHovered, setCloseHovered] = useState(false);
  const [closePressed, setClosePressed] = useState(false);

  useEffect(() => { setVisible(true); }, [variant, size, closable]);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
          border: '1px dashed var(--color-outline)',
          background: 'transparent', color: 'var(--color-on-surface-variant)',
        }}
      >
        Show alert again
      </button>
    );
  }

  const colors = theme === 'dark'
    ? (variantColorsDark[variant] || variantColorsDark.info)
    : (variantColors[variant] || variantColors.info);

  const isSmall = size === 'sm';
  const paddingY = isSmall ? 10 : 14;
  const paddingX = isSmall ? 12 : 16;
  const titleSize = isSmall ? 13 : 15;
  const descSize = isSmall ? 12 : 14;
  const iconSize = isSmall ? 16 : 20;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: isSmall ? 8 : 12,
        padding: `${paddingY}px ${paddingX}px`,
        borderRadius: 8,
        borderLeft: `4px solid ${colors.border}`,
        background: colors.bg,
        color: colors.text,
        width: '100%',
        maxWidth: 560,
        transition: 'all 0.2s ease',
      }}
    >
      {/* Icon */}
      <div style={{ color: colors.icon, flexShrink: 0, marginTop: 1 }}>
        {icon || <DefaultIcon variant={variant} size={iconSize} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ fontWeight: 600, fontSize: titleSize, lineHeight: 1.4, marginBottom: description ? 2 : 0 }}>
            {title}
          </div>
        )}
        {description && (
          <div style={{ fontSize: descSize, lineHeight: 1.5, opacity: 0.85 }}>
            {description}
          </div>
        )}
        {actions && (
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {actions}
          </div>
        )}
      </div>

      {/* Close button */}
      {closable && (
        <button
          aria-label="Close alert"
          onClick={() => setVisible(false)}
          onMouseEnter={() => setCloseHovered(true)}
          onMouseLeave={() => { setCloseHovered(false); setClosePressed(false); }}
          onMouseDown={() => setClosePressed(true)}
          onMouseUp={() => setClosePressed(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isSmall ? 24 : 28,
            height: isSmall ? 24 : 28,
            borderRadius: 6,
            border: 'none',
            background: closePressed
              ? (theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)')
              : closeHovered
                ? (theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)')
                : 'transparent',
            color: colors.text,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.15s ease',
            opacity: closeHovered ? 1 : 0.6,
          }}
        >
          <CloseIcon size={isSmall ? 12 : 14} />
        </button>
      )}
    </div>
  );
}

/* ── CTA button helper ── */
function AlertCTA({ label, primary, theme }: { label: string; primary?: boolean; theme: 'light' | 'dark' }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '5px 14px',
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        border: primary ? 'none' : `1px solid ${theme === 'dark' ? '#555' : '#CCC'}`,
        background: primary ? '#2396FB' : 'transparent',
        color: primary ? '#FFF' : (theme === 'dark' ? '#CCC' : '#333'),
        opacity: hovered ? 0.85 : 1,
        transition: 'opacity 0.15s ease',
      }}
    >
      {label}
    </button>
  );
}

/* ── Alert Example Section with variant/size controls ── */
function AlertExampleSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: (props: { size: 'sm' | 'lg'; theme: 'light' | 'dark' }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState<'sm' | 'lg'>('lg');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');

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
        <select value={size} onChange={e => setSize(e.target.value as 'sm' | 'lg')} style={selectStyle}>
          <option value="sm">Small</option>
          <option value="lg">Large</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{
        background: bg, borderRadius: 12, padding: 24,
        display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start',
      }}>
        {children({ size, theme })}
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-alert--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-alert--playground"
        height={420}
        title="Alert — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        Alerts are notification banners used to communicate feedback messages to users.
        They appear as rounded rectangles with a left border accent, icon, title, description,
        and an optional close button. Use them for success confirmations, error messages,
        warnings, and informational notices.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Black, White, Coal, Success, Error, Info, Warning</td></tr>
          <tr><td>Sizes</td><td>Small, Large</td></tr>
          <tr><td>States</td><td>Default, With CTAs</td></tr>
          <tr><td>Features</td><td>Leading icon, Close button, Action buttons</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <AlertExampleSection
        title="Color Variants"
        desc="Each variant uses a distinct left border accent and icon color for quick visual identification."
      >
        {({ size, theme }) => (
          <>
            {Object.keys(variantColors).map(v => (
              <AlertDemo
                key={v}
                variant={v}
                title={`${variantLabels[v]} Alert`}
                description={`This is a ${variantLabels[v].toLowerCase()} alert — use it for ${v === 'success' ? 'positive confirmations' : v === 'error' ? 'critical errors' : v === 'warning' ? 'cautionary notices' : v === 'info' ? 'informational messages' : 'general notifications'}.`}
                size={size}
                theme={theme}
              />
            ))}
          </>
        )}
      </AlertExampleSection>

      <h2>With Close Button</h2>

      <AlertExampleSection
        title="Closable Alerts"
        desc="Alerts with a close button allow users to dismiss the notification. Hover and press the X to see interaction states."
      >
        {({ size, theme }) => (
          <>
            <AlertDemo variant="info" title="Dismissible Info" description="Click the X button to dismiss this alert." closable size={size} theme={theme} />
            <AlertDemo variant="success" title="Dismissible Success" description="Your changes have been saved successfully." closable size={size} theme={theme} />
            <AlertDemo variant="error" title="Dismissible Error" description="Something went wrong. Please try again." closable size={size} theme={theme} />
            <AlertDemo variant="warning" title="Dismissible Warning" description="Your session will expire in 5 minutes." closable size={size} theme={theme} />
          </>
        )}
      </AlertExampleSection>

      <h2>With CTAs</h2>

      <AlertExampleSection
        title="Alerts with Action Buttons"
        desc="Alerts can include call-to-action buttons for contextual actions."
      >
        {({ size, theme }) => (
          <>
            <AlertDemo
              variant="info"
              title="Update Available"
              description="A new version is available. Update now to get the latest features."
              closable
              size={size}
              theme={theme}
              actions={
                <>
                  <AlertCTA label="Update Now" primary theme={theme} />
                  <AlertCTA label="Later" theme={theme} />
                </>
              }
            />
            <AlertDemo
              variant="error"
              title="Connection Lost"
              description="Unable to reach the server. Check your network connection."
              closable
              size={size}
              theme={theme}
              actions={
                <>
                  <AlertCTA label="Retry" primary theme={theme} />
                  <AlertCTA label="Dismiss" theme={theme} />
                </>
              }
            />
            <AlertDemo
              variant="warning"
              title="Unsaved Changes"
              description="You have unsaved changes that will be lost if you leave this page."
              size={size}
              theme={theme}
              actions={
                <>
                  <AlertCTA label="Save Changes" primary theme={theme} />
                  <AlertCTA label="Discard" theme={theme} />
                </>
              }
            />
          </>
        )}
      </AlertExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Alerts come in two sizes. Small for compact layouts, Large as the default."
        sizes={['sm', 'lg'] as ('sm' | 'lg')[]}
      >
        {({ theme }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <AlertDemo variant="info" title="Small Alert" description="Compact size for dense layouts." size="sm" theme={theme as 'light' | 'dark'} closable />
            <AlertDemo variant="info" title="Large Alert" description="Default size with more breathing room." size="lg" theme={theme as 'light' | 'dark'} closable />
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
      <pre><code>{`import { Alert } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface AlertProps {
  variant?: 'black' | 'white' | 'coal' | 'success' | 'error' | 'info' | 'warning';
  title?: string;
  description?: string;
  closable?: boolean;
  size?: 'sm' | 'lg';
  icon?: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Info alert (default)
<Alert variant="info" title="Heads up!" description="This is an informational alert." />

// Success alert with close button
<Alert variant="success" title="Saved" description="Your changes were saved." closable />

// Error alert
<Alert variant="error" title="Error" description="Something went wrong." closable />

// Warning alert
<Alert variant="warning" title="Warning" description="Proceed with caution." />

// Small size
<Alert variant="info" title="Compact" description="Small alert." size="sm" />

// With action buttons
<Alert
  variant="info"
  title="Update Available"
  description="A new version is ready."
  closable
  actions={
    <>
      <Button size="sm" variant="primary">Update</Button>
      <Button size="sm" variant="ghost">Later</Button>
    </>
  }
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>alert-padding-sm</td><td>10px 12px</td></tr>
          <tr><td>alert-padding-lg</td><td>14px 16px</td></tr>
          <tr><td>alert-border-radius</td><td>8px</td></tr>
          <tr><td>alert-border-left-width</td><td>4px</td></tr>
          <tr><td>alert-icon-size-sm</td><td>16px</td></tr>
          <tr><td>alert-icon-size-lg</td><td>20px</td></tr>
          <tr><td>alert-title-font-size-sm</td><td>13px</td></tr>
          <tr><td>alert-title-font-size-lg</td><td>15px</td></tr>
          <tr><td>alert-desc-font-size-sm</td><td>12px</td></tr>
          <tr><td>alert-desc-font-size-lg</td><td>14px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Background</th><th>Border</th><th>Icon</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>#0D0D0D</td><td>#FFFFFF</td></tr>
          <tr><td>white</td><td>#FFFFFF</td><td>#E0E0E0</td><td>#525252</td></tr>
          <tr><td>coal</td><td>#525252</td><td>#525252</td><td>#FFFFFF</td></tr>
          <tr><td>success</td><td>#E8F8F0</td><td>#1BA86E</td><td>#1BA86E</td></tr>
          <tr><td>error</td><td>#FDE8EC</td><td>#DC143C</td><td>#DC143C</td></tr>
          <tr><td>info</td><td>#E8F3FE</td><td>#2396FB</td><td>#2396FB</td></tr>
          <tr><td>warning</td><td>#FEF6E0</td><td>#CF9F02</td><td>#CF9F02</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all alert variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-alert--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Rounded rectangle wrapper with left border accent</td></tr>
          <tr><td>2</td><td>Left Border</td><td>4px colored accent indicating the alert variant</td></tr>
          <tr><td>3</td><td>Leading Icon</td><td>Contextual icon matching the alert type</td></tr>
          <tr><td>4</td><td>Title</td><td>Bold heading text summarizing the alert</td></tr>
          <tr><td>5</td><td>Description</td><td>Supporting text with additional details</td></tr>
          <tr><td>6</td><td>Close Button</td><td>Optional dismiss action (X icon)</td></tr>
          <tr><td>7</td><td>Actions</td><td>Optional CTA buttons for contextual actions</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To confirm a successful action (e.g., form submission, save)</li>
        <li>To display error messages requiring user attention</li>
        <li>To warn users about potential issues or consequences</li>
        <li>To provide informational context or tips</li>
        <li>To prompt users with actionable next steps</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="alert"
        doItems={[
          'Use semantic variants — green for success, red for error, yellow for warning',
          'Keep titles short and actionable (3–5 words)',
          'Provide a clear description with context or next steps',
          'Include a close button for non-critical alerts',
          'Use action buttons when the user needs to take immediate action',
        ]}
        dontItems={[
          'Don\'t stack more than 2–3 alerts at once',
          'Don\'t use alerts for permanent content — use banners instead',
          'Don\'t rely on color alone to convey the alert type',
          'Don\'t use alerts for inline form validation — use field-level errors',
          'Don\'t auto-dismiss error alerts — let users close them manually',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>alert</td><td>Identifies the element as an alert region</td></tr>
          <tr><td>aria-live</td><td>assertive</td><td>Announces the alert to screen readers immediately</td></tr>
          <tr><td>Close button</td><td>aria-label=&quot;Close alert&quot;</td><td>Accessible label for the dismiss action</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Text against background meets WCAG AA</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter / Space</td><td>Focus and activate close button and CTAs</td></tr>
          <tr><td>Focus order</td><td>Content → Actions → Close</td><td>Logical tab order within the alert</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Titles should be concise and describe the situation (e.g., &quot;Update Available&quot;)</li>
        <li>Descriptions should explain what happened and what to do next</li>
        <li>Action button labels should be specific (e.g., &quot;Retry&quot; not &quot;OK&quot;)</li>
        <li>Use sentence case for titles and descriptions</li>
      </ul>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Snackbar</strong> — Temporary, auto-dismissing notifications</li>
        <li><strong>Dialog Box</strong> — Modal confirmations requiring user decision</li>
        <li><strong>Badge</strong> — Compact status indicators</li>
        <li><strong>Status Indicator</strong> — Inline status dots</li>
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
        <li>Added <code>actions</code> prop for CTA buttons</li>
        <li>Added <code>size</code> prop with Small and Large options</li>
        <li>New color variants: Black, White, Coal</li>
        <li>Dark mode support with dedicated color palette</li>
        <li>Improved close button with hover and press states</li>
        <li>Added <code>aria-live=&quot;assertive&quot;</code> for screen reader announcements</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with Success, Error, Info, Warning variants</li>
        <li>Leading icon and close button support</li>
        <li>Left border accent styling</li>
        <li>Basic accessibility with role=&quot;alert&quot;</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function AlertPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Alert"
      description="Alerts are notification banners used to communicate feedback messages like success, error, warning, and informational notices."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
