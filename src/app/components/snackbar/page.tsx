'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Snackbar variant colors ── */
const variantColors: Record<string, { base: string; text: string; icon: string }> = {
  black:    { base: '#0D0D0D', text: '#FFFFFF', icon: '#FFFFFF' },
  white:    { base: '#FFFFFF', text: '#0D0D0D', icon: '#525252' },
  info:     { base: '#2396FB', text: '#FFFFFF', icon: '#FFFFFF' },
  positive: { base: '#1BA86E', text: '#FFFFFF', icon: '#FFFFFF' },
  negative: { base: '#DC143C', text: '#FFFFFF', icon: '#FFFFFF' },
  warning:  { base: '#CF9F02', text: '#FFFFFF', icon: '#FFFFFF' },
};

const variantColorsDark: Record<string, { base: string; text: string; icon: string }> = {
  black:    { base: '#0D0D0D', text: '#FFFFFF', icon: '#FFFFFF' },
  white:    { base: '#1A1A1A', text: '#FFFFFF', icon: '#AAAAAA' },
  info:     { base: '#1A6FBF', text: '#FFFFFF', icon: '#FFFFFF' },
  positive: { base: '#148A58', text: '#FFFFFF', icon: '#FFFFFF' },
  negative: { base: '#A8102E', text: '#FFFFFF', icon: '#FFFFFF' },
  warning:  { base: '#A67F02', text: '#FFFFFF', icon: '#FFFFFF' },
};

const variantLabels: Record<string, string> = {
  black: 'Black', white: 'White', info: 'Info',
  positive: 'Positive', negative: 'Negative', warning: 'Warning',
};

/* ── Style helpers ── */
type SnackbarStyle = 'filled' | 'subtle' | 'outlined';

function getStyleColors(
  variant: string,
  style: SnackbarStyle,
  theme: 'light' | 'dark',
) {
  const palette = theme === 'dark' ? variantColorsDark : variantColors;
  const c = palette[variant] || palette.info;

  if (style === 'filled') {
    return { bg: c.base, text: c.text, icon: c.icon, border: 'transparent' };
  }
  if (style === 'subtle') {
    const alpha = theme === 'dark' ? '33' : '1A';
    return {
      bg: `${c.base}${alpha}`,
      text: theme === 'dark' ? '#E0E0E0' : '#0D0D0D',
      icon: c.base,
      border: 'transparent',
    };
  }
  /* outlined */
  return {
    bg: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
    text: theme === 'dark' ? '#E0E0E0' : '#0D0D0D',
    icon: c.base,
    border: c.base,
  };
}

/* ── Snackbar Props ── */
interface SnackbarProps {
  variant?: string;
  style?: SnackbarStyle;
  title?: string;
  description?: string;
  closable?: boolean;
  icon?: ReactNode;
  actions?: ReactNode;
  size?: 'sm' | 'lg';
  duration?: number;
  theme?: 'light' | 'dark';
}

/* ── Default icons per variant ── */
function DefaultIcon({ variant, size = 18 }: { variant: string; size?: number }) {
  if (variant === 'positive') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === 'negative') {
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
  /* info / black / white / default */
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

/* ── SnackbarDemo (static preview) ── */
function SnackbarDemo({
  variant = 'info',
  style: snackbarStyle = 'filled',
  title = 'Notification',
  description,
  closable = false,
  size = 'lg',
  icon,
  actions,
  theme = 'light',
}: SnackbarProps) {
  const [closeHovered, setCloseHovered] = useState(false);
  const [closePressed, setClosePressed] = useState(false);

  const colors = getStyleColors(variant, snackbarStyle, theme);
  const isSmall = size === 'sm';
  const paddingY = isSmall ? 8 : 12;
  const paddingX = isSmall ? 12 : 16;
  const titleSize = isSmall ? 13 : 14;
  const descSize = isSmall ? 11 : 13;
  const iconSize = isSmall ? 16 : 18;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: isSmall ? 8 : 10,
        padding: `${paddingY}px ${paddingX}px`,
        borderRadius: 10,
        background: colors.bg,
        color: colors.text,
        border: colors.border !== 'transparent' ? `1.5px solid ${colors.border}` : 'none',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
        minWidth: isSmall ? 240 : 300,
        maxWidth: 480,
        transition: 'all 0.2s ease',
      }}
    >
      {/* Icon */}
      <div style={{ color: colors.icon, flexShrink: 0 }}>
        {icon || <DefaultIcon variant={variant} size={iconSize} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ fontWeight: 600, fontSize: titleSize, lineHeight: 1.4, marginBottom: description ? 1 : 0 }}>
            {title}
          </div>
        )}
        {description && (
          <div style={{ fontSize: descSize, lineHeight: 1.4, opacity: 0.85 }}>
            {description}
          </div>
        )}
      </div>

      {/* Actions */}
      {actions && (
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {actions}
        </div>
      )}

      {/* Close button */}
      {closable && (
        <button
          aria-label="Dismiss notification"
          onMouseEnter={() => setCloseHovered(true)}
          onMouseLeave={() => { setCloseHovered(false); setClosePressed(false); }}
          onMouseDown={() => setClosePressed(true)}
          onMouseUp={() => setClosePressed(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isSmall ? 22 : 26,
            height: isSmall ? 22 : 26,
            borderRadius: 6,
            border: 'none',
            background: closePressed
              ? 'rgba(255,255,255,0.2)'
              : closeHovered
                ? 'rgba(255,255,255,0.12)'
                : 'transparent',
            color: colors.text,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.15s ease',
            opacity: closeHovered ? 1 : 0.7,
          }}
        >
          <CloseIcon size={isSmall ? 10 : 12} />
        </button>
      )}
    </div>
  );
}

/* ── CTA button helper ── */
function SnackbarCTA({ label, primary, colors }: { label: string; primary?: boolean; colors: { text: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '4px 12px',
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        border: primary ? 'none' : `1px solid ${colors.text}44`,
        background: primary ? 'rgba(255,255,255,0.2)' : 'transparent',
        color: colors.text,
        opacity: hovered ? 0.85 : 1,
        transition: 'opacity 0.15s ease',
        whiteSpace: 'nowrap' as const,
      }}
    >
      {label}
    </button>
  );
}

/* ── Interactive toast trigger ── */
function SnackbarPlayground() {
  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState('info');
  const [snackbarStyle, setSnackbarStyle] = useState<SnackbarStyle>('filled');
  const [size, setSize] = useState<'sm' | 'lg'>('lg');
  const [toasts, setToasts] = useState<{ id: number; variant: string; style: SnackbarStyle; size: 'sm' | 'lg'; visible: boolean }[]>([]);
  const nextId = useState({ current: 0 })[0];

  useEffect(() => { setTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);

  const showSnackbar = useCallback(() => {
    const id = nextId.current++;
    setToasts(prev => [...prev, { id, variant, style: snackbarStyle, size, visible: false }]);
    /* trigger fade-in on next frame */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, visible: true } : t));
      });
    });
    /* auto-dismiss after 3s */
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, visible: false } : t));
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300);
    }, 3000);
  }, [variant, snackbarStyle, size, nextId]);

  const bg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';
  const selectStyle: React.CSSProperties = {
    padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
    background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>Interactive Playground</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>
        Configure and trigger a snackbar notification. It will appear at the bottom-center and auto-dismiss after 3 seconds.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <select value={variant} onChange={e => setVariant(e.target.value)} style={selectStyle}>
          {Object.keys(variantLabels).map(v => <option key={v} value={v}>{variantLabels[v]}</option>)}
        </select>
        <select value={snackbarStyle} onChange={e => setSnackbarStyle(e.target.value as SnackbarStyle)} style={selectStyle}>
          <option value="filled">Filled</option>
          <option value="subtle">Subtle</option>
          <option value="outlined">Outlined</option>
        </select>
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
        background: bg, borderRadius: 12, padding: 24, minHeight: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <button
          onClick={showSnackbar}
          style={{
            padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
            border: 'none', background: '#2396FB', color: '#FFF',
            transition: 'opacity 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          Show Snackbar
        </button>

        {/* Toast container — bottom-center */}
        <div style={{
          position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column-reverse', gap: 8, alignItems: 'center',
          pointerEvents: 'none', zIndex: 10,
        }}>
          {toasts.map(t => {
            const colors = getStyleColors(t.variant, t.style, theme);
            return (
              <div
                key={t.id}
                style={{
                  opacity: t.visible ? 1 : 0,
                  transform: t.visible ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  pointerEvents: 'auto',
                }}
              >
                <SnackbarDemo
                  variant={t.variant}
                  style={t.style}
                  title={`${variantLabels[t.variant]} notification`}
                  description="This snackbar will auto-dismiss."
                  closable
                  size={t.size}
                  theme={theme}
                  actions={<SnackbarCTA label="Undo" primary colors={colors} />}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Snackbar Example Section with size/style controls ── */
function SnackbarExampleSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: (props: { size: 'sm' | 'lg'; theme: 'light' | 'dark'; snackbarStyle: SnackbarStyle }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState<'sm' | 'lg'>('lg');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [snackbarStyle, setSnackbarStyle] = useState<SnackbarStyle>('filled');

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
        <select value={snackbarStyle} onChange={e => setSnackbarStyle(e.target.value as SnackbarStyle)} style={selectStyle}>
          <option value="filled">Filled</option>
          <option value="subtle">Subtle</option>
          <option value="outlined">Outlined</option>
        </select>
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
        display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
      }}>
        {children({ size, theme, snackbarStyle })}
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
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-snackbar--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-snackbar--playground"
        height={420}
        title="Snackbar — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        Snackbars are temporary notification toasts that appear at the bottom-center of the screen
        and auto-dismiss after a set duration. They provide brief, non-intrusive feedback about an
        operation or event. Snackbars support leading icons, close buttons, CTA actions, and dual
        text (title + description).
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Black, White, Info, Positive, Negative, Warning</td></tr>
          <tr><td>Styles</td><td>Filled, Subtle, Outlined</td></tr>
          <tr><td>Sizes</td><td>Small, Large</td></tr>
          <tr><td>Features</td><td>Leading icon, Close button, CTA buttons, Dual text</td></tr>
          <tr><td>Position</td><td>Bottom-center (default)</td></tr>
        </tbody>
      </table>

      <h2>Interactive Demo</h2>
      <SnackbarPlayground />

      <h2>All Variants</h2>

      <SnackbarExampleSection
        title="Color Variants"
        desc="Each variant uses a distinct background color for quick visual identification."
      >
        {({ size, theme, snackbarStyle }) => (
          <>
            {Object.keys(variantColors).map(v => (
              <SnackbarDemo
                key={v}
                variant={v}
                style={snackbarStyle}
                title={`${variantLabels[v]} notification`}
                description={`This is a ${variantLabels[v].toLowerCase()} snackbar message.`}
                size={size}
                theme={theme}
              />
            ))}
          </>
        )}
      </SnackbarExampleSection>

      <h2>Styles</h2>

      <SnackbarExampleSection
        title="Filled, Subtle & Outlined"
        desc="Three visual styles to match different UI contexts and emphasis levels."
      >
        {({ size, theme }) => (
          <>
            <SnackbarDemo variant="info" style="filled" title="Filled style" description="High emphasis, solid background." size={size} theme={theme} closable />
            <SnackbarDemo variant="info" style="subtle" title="Subtle style" description="Low emphasis, tinted background." size={size} theme={theme} closable />
            <SnackbarDemo variant="info" style="outlined" title="Outlined style" description="Medium emphasis, bordered." size={size} theme={theme} closable />
          </>
        )}
      </SnackbarExampleSection>

      <h2>With Close Button</h2>

      <SnackbarExampleSection
        title="Closable Snackbars"
        desc="Snackbars with a close button allow manual dismissal before auto-dismiss."
      >
        {({ size, theme, snackbarStyle }) => (
          <>
            <SnackbarDemo variant="positive" style={snackbarStyle} title="Changes saved" closable size={size} theme={theme} />
            <SnackbarDemo variant="negative" style={snackbarStyle} title="Upload failed" description="Please try again." closable size={size} theme={theme} />
            <SnackbarDemo variant="warning" style={snackbarStyle} title="Low storage" description="Free up space soon." closable size={size} theme={theme} />
          </>
        )}
      </SnackbarExampleSection>

      <h2>With CTA Buttons</h2>

      <SnackbarExampleSection
        title="Snackbars with Actions"
        desc="Include call-to-action buttons for contextual undo or follow-up actions."
      >
        {({ size, theme, snackbarStyle }) => {
          const colors = getStyleColors('info', snackbarStyle, theme);
          const negColors = getStyleColors('negative', snackbarStyle, theme);
          return (
            <>
              <SnackbarDemo
                variant="info"
                style={snackbarStyle}
                title="Message archived"
                closable
                size={size}
                theme={theme}
                actions={<SnackbarCTA label="Undo" primary colors={colors} />}
              />
              <SnackbarDemo
                variant="negative"
                style={snackbarStyle}
                title="Item deleted"
                description="This action cannot be undone."
                closable
                size={size}
                theme={theme}
                actions={
                  <>
                    <SnackbarCTA label="Undo" primary colors={negColors} />
                    <SnackbarCTA label="Details" colors={negColors} />
                  </>
                }
              />
            </>
          );
        }}
      </SnackbarExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Snackbars come in two sizes. Small for compact layouts, Large as the default."
        sizes={['sm', 'lg'] as ('sm' | 'lg')[]}
      >
        {({ theme }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', width: '100%' }}>
            <SnackbarDemo variant="info" title="Small snackbar" size="sm" theme={theme as 'light' | 'dark'} closable />
            <SnackbarDemo variant="info" title="Large snackbar" description="With a description line." size="lg" theme={theme as 'light' | 'dark'} closable />
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
      <pre><code>{`import { Snackbar, useSnackbar } from '@tarmac/design-system';`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Simple notification
<Snackbar variant="positive" title="Changes saved" />

// With description and close button
<Snackbar
  variant="info"
  title="Update available"
  description="A new version is ready to install."
  closable
/>

// With CTA action
<Snackbar
  variant="negative"
  title="Item deleted"
  closable
  actions={<Button size="sm" variant="ghost">Undo</Button>}
/>

// Using the hook for imperative control
const { showSnackbar } = useSnackbar();

showSnackbar({
  variant: 'positive',
  title: 'File uploaded',
  duration: 4000,
});`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`interface SnackbarProps {
  /** Color variant of the snackbar */
  variant?: 'black' | 'white' | 'info' | 'positive' | 'negative' | 'warning';

  /** Visual style — filled (solid bg), subtle (tinted bg), outlined (border) */
  style?: 'filled' | 'subtle' | 'outlined';

  /** Primary text displayed in the snackbar */
  title?: string;

  /** Secondary text below the title */
  description?: string;

  /** Whether the snackbar shows a close (X) button */
  closable?: boolean;

  /** Custom leading icon — defaults to variant-specific icon */
  icon?: ReactNode;

  /** Action buttons rendered after the text content */
  actions?: ReactNode;

  /** Size of the snackbar */
  size?: 'sm' | 'lg';

  /** Auto-dismiss duration in milliseconds (default: 4000) */
  duration?: number;

  /** Callback fired when the snackbar is dismissed */
  onDismiss?: () => void;

  /** Position on screen */
  position?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center';
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>variant</code></td><td><code>string</code></td><td><code>&apos;info&apos;</code></td><td>Color variant: black, white, info, positive, negative, warning</td></tr>
          <tr><td><code>style</code></td><td><code>string</code></td><td><code>&apos;filled&apos;</code></td><td>Visual style: filled, subtle, or outlined</td></tr>
          <tr><td><code>title</code></td><td><code>string</code></td><td>—</td><td>Primary notification text</td></tr>
          <tr><td><code>description</code></td><td><code>string</code></td><td>—</td><td>Secondary description text below the title</td></tr>
          <tr><td><code>closable</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Shows a close button for manual dismissal</td></tr>
          <tr><td><code>icon</code></td><td><code>ReactNode</code></td><td>Auto</td><td>Custom leading icon; defaults to variant-specific icon</td></tr>
          <tr><td><code>actions</code></td><td><code>ReactNode</code></td><td>—</td><td>CTA buttons rendered inline after text</td></tr>
          <tr><td><code>size</code></td><td><code>&apos;sm&apos; | &apos;lg&apos;</code></td><td><code>&apos;lg&apos;</code></td><td>Small (compact) or Large (default) sizing</td></tr>
          <tr><td><code>duration</code></td><td><code>number</code></td><td><code>4000</code></td><td>Auto-dismiss duration in milliseconds</td></tr>
          <tr><td><code>onDismiss</code></td><td><code>() =&gt; void</code></td><td>—</td><td>Callback when snackbar is dismissed</td></tr>
          <tr><td><code>position</code></td><td><code>string</code></td><td><code>&apos;bottom-center&apos;</code></td><td>Screen position for the snackbar</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>
      <pre><code>{`// 1. Declarative usage in JSX
function MyComponent() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Save</Button>
      {show && (
        <Snackbar
          variant="positive"
          style="filled"
          title="Saved successfully"
          description="Your changes are live."
          closable
          duration={3000}
          onDismiss={() => setShow(false)}
        />
      )}
    </>
  );
}

// 2. Imperative usage with hook
function MyApp() {
  const { showSnackbar, dismissAll } = useSnackbar();

  const handleSave = async () => {
    try {
      await saveData();
      showSnackbar({
        variant: 'positive',
        title: 'Data saved',
        actions: <Button size="sm" onClick={dismissAll}>OK</Button>,
      });
    } catch {
      showSnackbar({
        variant: 'negative',
        title: 'Save failed',
        description: 'Please try again.',
        closable: true,
      });
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}

// 3. Outlined style with custom icon
<Snackbar
  variant="warning"
  style="outlined"
  title="Session expiring"
  icon={<ClockIcon />}
  actions={<Button size="sm">Extend</Button>}
/>

// 4. Subtle style, small size
<Snackbar
  variant="info"
  style="subtle"
  size="sm"
  title="Copied to clipboard"
  duration={2000}
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>snackbar-padding-sm</td><td>8px 12px</td></tr>
          <tr><td>snackbar-padding-lg</td><td>12px 16px</td></tr>
          <tr><td>snackbar-border-radius</td><td>10px</td></tr>
          <tr><td>snackbar-icon-size-sm</td><td>16px</td></tr>
          <tr><td>snackbar-icon-size-lg</td><td>18px</td></tr>
          <tr><td>snackbar-title-font-size-sm</td><td>13px</td></tr>
          <tr><td>snackbar-title-font-size-lg</td><td>14px</td></tr>
          <tr><td>snackbar-shadow</td><td>0 4px 16px rgba(0,0,0,0.12)</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors (Filled)</h3>
      <table>
        <thead><tr><th>Variant</th><th>Background</th><th>Text</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>#FFFFFF</td></tr>
          <tr><td>white</td><td>#FFFFFF</td><td>#0D0D0D</td></tr>
          <tr><td>info</td><td>#2396FB</td><td>#FFFFFF</td></tr>
          <tr><td>positive</td><td>#1BA86E</td><td>#FFFFFF</td></tr>
          <tr><td>negative</td><td>#DC143C</td><td>#FFFFFF</td></tr>
          <tr><td>warning</td><td>#CF9F02</td><td>#FFFFFF</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all snackbar variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-snackbar--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Rounded rectangle with shadow, positioned at bottom-center</td></tr>
          <tr><td>2</td><td>Leading Icon</td><td>Contextual icon matching the snackbar variant</td></tr>
          <tr><td>3</td><td>Title</td><td>Primary notification text (bold)</td></tr>
          <tr><td>4</td><td>Description</td><td>Optional secondary text below the title</td></tr>
          <tr><td>5</td><td>CTA Buttons</td><td>Optional action buttons (e.g., Undo, Retry)</td></tr>
          <tr><td>6</td><td>Close Button</td><td>Optional dismiss action (X icon)</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To confirm a completed action (e.g., &quot;Item saved&quot;, &quot;Email sent&quot;)</li>
        <li>To provide brief, non-blocking feedback that doesn&apos;t require user action</li>
        <li>To offer an undo opportunity for destructive actions</li>
        <li>To notify about background processes completing</li>
      </ul>

      <h2>When Not to Use</h2>
      <ul>
        <li>For persistent messages — use Alert or Banner instead</li>
        <li>For critical errors requiring acknowledgment — use Dialog Box</li>
        <li>For inline form validation — use field-level error messages</li>
        <li>For complex multi-step feedback — use a dedicated status page</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="snackbar"
        doItems={[
          'Keep messages short and scannable (under 2 lines)',
          'Use semantic variants — green for success, red for errors',
          'Include an Undo action for destructive operations',
          'Auto-dismiss after 3–5 seconds for non-critical messages',
          'Show only one snackbar at a time to avoid stacking clutter',
          'Use filled style for high-emphasis, subtle for low-emphasis',
        ]}
        dontItems={[
          'Don\'t use snackbars for critical errors that need acknowledgment',
          'Don\'t stack more than 2 snackbars simultaneously',
          'Don\'t auto-dismiss snackbars with important actions',
          'Don\'t use snackbars for permanent or persistent content',
          'Don\'t place snackbars over important interactive elements',
          'Don\'t rely on color alone — always include an icon and text',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>status</td><td>Identifies the element as a status notification</td></tr>
          <tr><td>aria-live</td><td>polite</td><td>Announces the snackbar without interrupting the user</td></tr>
          <tr><td>Close button</td><td>aria-label=&quot;Dismiss notification&quot;</td><td>Accessible label for the dismiss action</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Text against background meets WCAG AA</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter / Escape</td><td>Focus actions and dismiss with Escape</td></tr>
          <tr><td>Auto-dismiss</td><td>Pause on hover</td><td>Timer pauses when user hovers over the snackbar</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Titles should be concise and describe the outcome (e.g., &quot;Message sent&quot;)</li>
        <li>Descriptions are optional — use only when extra context is needed</li>
        <li>Action labels should be specific verbs (e.g., &quot;Undo&quot;, &quot;Retry&quot;, &quot;View&quot;)</li>
        <li>Use sentence case for all text</li>
      </ul>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Alert</strong> — Persistent notification banners with left border accent</li>
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
        <li>Added <code>style</code> prop with Filled, Subtle, and Outlined options</li>
        <li>Added <code>description</code> prop for dual-text layout</li>
        <li>Added <code>actions</code> prop for inline CTA buttons</li>
        <li>Added <code>size</code> prop with Small and Large options</li>
        <li>New color variants: Black, White</li>
        <li>Dark mode support with dedicated color palette</li>
        <li>Fade-in / fade-out animation with bottom-center positioning</li>
        <li>Improved close button with hover and press states</li>
        <li>Added <code>aria-live=&quot;polite&quot;</code> for screen reader announcements</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with Info, Positive, Negative, Warning variants</li>
        <li>Leading icon and close button support</li>
        <li>Auto-dismiss with configurable duration</li>
        <li>Basic accessibility with role=&quot;status&quot;</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function SnackbarPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Snackbar"
      description="Snackbars are temporary notification toasts that appear at the bottom of the screen and auto-dismiss. Use them for brief, non-intrusive feedback about completed actions."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
