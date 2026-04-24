'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Tooltip Types ── */
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipVariant = 'white' | 'black' | 'coal';
type TooltipSize = 'sm' | 'lg';

interface TooltipProps {
  content: ReactNode;
  position?: TooltipPosition;
  variant?: TooltipVariant;
  size?: TooltipSize;
  children: ReactNode;
}

/* ── Variant styles ── */
const variantStyles: Record<TooltipVariant, { bg: string; text: string; border: string }> = {
  white: { bg: '#FFFFFF', text: '#1A1A1A', border: '1px solid #E0E0E0' },
  black: { bg: '#0D0D0D', text: '#FFFFFF', border: 'none' },
  coal:  { bg: '#525252', text: '#FFFFFF', border: 'none' },
};

const sizeStyles: Record<TooltipSize, { padding: string; fontSize: number; maxWidth: number }> = {
  sm: { padding: '4px 8px', fontSize: 12, maxWidth: 200 },
  lg: { padding: '8px 12px', fontSize: 14, maxWidth: 280 },
};

/* ── Arrow offset/size ── */
const ARROW_SIZE = 6;

function getPositionStyles(position: TooltipPosition): React.CSSProperties {
  switch (position) {
    case 'top':
      return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: ARROW_SIZE + 4 };
    case 'bottom':
      return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: ARROW_SIZE + 4 };
    case 'left':
      return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: ARROW_SIZE + 4 };
    case 'right':
      return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: ARROW_SIZE + 4 };
  }
}

function getArrowStyles(position: TooltipPosition, variant: TooltipVariant): React.CSSProperties {
  const { bg } = variantStyles[variant];
  const base: React.CSSProperties = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
  };
  switch (position) {
    case 'top':
      return { ...base, bottom: -ARROW_SIZE, left: '50%', transform: 'translateX(-50%)',
        borderWidth: `${ARROW_SIZE}px ${ARROW_SIZE}px 0 ${ARROW_SIZE}px`,
        borderColor: `${bg} transparent transparent transparent` };
    case 'bottom':
      return { ...base, top: -ARROW_SIZE, left: '50%', transform: 'translateX(-50%)',
        borderWidth: `0 ${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px`,
        borderColor: `transparent transparent ${bg} transparent` };
    case 'left':
      return { ...base, right: -ARROW_SIZE, top: '50%', transform: 'translateY(-50%)',
        borderWidth: `${ARROW_SIZE}px 0 ${ARROW_SIZE}px ${ARROW_SIZE}px`,
        borderColor: `transparent transparent transparent ${bg}` };
    case 'right':
      return { ...base, left: -ARROW_SIZE, top: '50%', transform: 'translateY(-50%)',
        borderWidth: `${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px 0`,
        borderColor: `transparent ${bg} transparent transparent` };
  }
}

/* ── TooltipDemo Component ── */
function TooltipDemo({
  content,
  position = 'top',
  variant = 'black',
  size = 'sm',
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };
  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const vStyles = variantStyles[variant];
  const sStyles = sizeStyles[size];

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <div
        role="tooltip"
        style={{
          position: 'absolute',
          ...getPositionStyles(position),
          background: vStyles.bg,
          color: vStyles.text,
          border: vStyles.border,
          borderRadius: 6,
          padding: sStyles.padding,
          fontSize: sStyles.fontSize,
          lineHeight: 1.4,
          maxWidth: sStyles.maxWidth,
          whiteSpace: 'normal',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 150ms ease',
        }}
      >
        <div style={getArrowStyles(position, variant)} />
        {content}
      </div>
    </div>
  );
}

/* ── Trigger Button ── */
function TriggerButton({ label, theme }: { label: string; theme: 'light' | 'dark' }) {
  return (
    <button
      type="button"
      style={{
        padding: '8px 16px',
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 500,
        border: `1px solid ${theme === 'dark' ? '#444' : '#D0D0D0'}`,
        background: theme === 'dark' ? '#2A2A2A' : '#FFFFFF',
        color: theme === 'dark' ? '#E0E0E0' : '#1A1A1A',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

/* ── Tooltip Example Section with variant/position controls ── */
function TooltipExampleSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: (props: {
    theme: 'light' | 'dark';
    variant: TooltipVariant;
    size: TooltipSize;
    position: TooltipPosition;
  }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState<TooltipVariant>('black');
  const [size, setSize] = useState<TooltipSize>('sm');
  const [position, setPosition] = useState<TooltipPosition>('top');

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
        <select value={variant} onChange={e => setVariant(e.target.value as TooltipVariant)} style={selectStyle}>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="coal">Coal</option>
        </select>
        <select value={size} onChange={e => setSize(e.target.value as TooltipSize)} style={selectStyle}>
          <option value="sm">Small</option>
          <option value="lg">Large</option>
        </select>
        <select value={position} onChange={e => setPosition(e.target.value as TooltipPosition)} style={selectStyle}>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{
        background: bg, borderRadius: 12, padding: 48,
        display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
      }}>
        {children({ theme, variant, size, position })}
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
      <StorybookVariantViewer slug="tooltip" />
      <h2>Overview</h2>
      <p>
        Tooltips are contextual popups that appear on hover or focus to provide
        additional information about a UI element. They float above the interface
        with an arrow pointing to the trigger element.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>White, Black, Coal</td></tr>
          <tr><td>Positions</td><td>Top, Bottom, Left, Right</td></tr>
          <tr><td>Sizes</td><td>Small (12px), Large (14px)</td></tr>
          <tr><td>Features</td><td>Arrow indicator, Multi-line content, CTA buttons</td></tr>
        </tbody>
      </table>

      <h2>Positions</h2>

      <ComponentExampleSection
        title="All Positions"
        desc="Tooltips can be placed on any side of the trigger element. Hover each button to see the tooltip position."
      >
        {({ theme }) => (
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '24px 0' }}>
            <TooltipDemo content="Tooltip on top" position="top" variant="black" size="sm">
              <TriggerButton label="Top" theme={theme as 'light' | 'dark'} />
            </TooltipDemo>
            <TooltipDemo content="Tooltip on bottom" position="bottom" variant="black" size="sm">
              <TriggerButton label="Bottom" theme={theme as 'light' | 'dark'} />
            </TooltipDemo>
            <TooltipDemo content="Tooltip on left" position="left" variant="black" size="sm">
              <TriggerButton label="Left" theme={theme as 'light' | 'dark'} />
            </TooltipDemo>
            <TooltipDemo content="Tooltip on right" position="right" variant="black" size="sm">
              <TriggerButton label="Right" theme={theme as 'light' | 'dark'} />
            </TooltipDemo>
          </div>
        )}
      </ComponentExampleSection>

      <h2>Variants</h2>

      <TooltipExampleSection
        title="Color Variants"
        desc="Three visual variants for different contexts. White for light backgrounds, Black for high contrast, Coal for subtle dark."
      >
        {({ theme, size }) => (
          <>
            <TooltipDemo content="White tooltip with border" position="top" variant="white" size={size}>
              <TriggerButton label="White" theme={theme} />
            </TooltipDemo>
            <TooltipDemo content="Black tooltip — high contrast" position="top" variant="black" size={size}>
              <TriggerButton label="Black" theme={theme} />
            </TooltipDemo>
            <TooltipDemo content="Coal tooltip — subtle dark" position="top" variant="coal" size={size}>
              <TriggerButton label="Coal" theme={theme} />
            </TooltipDemo>
          </>
        )}
      </TooltipExampleSection>

      <h2>Sizes</h2>

      <TooltipExampleSection
        title="Small vs Large"
        desc="Small tooltips use 12px font with compact padding. Large tooltips use 14px font with more breathing room."
      >
        {({ theme, variant }) => (
          <>
            <TooltipDemo content="Small tooltip" position="top" variant={variant} size="sm">
              <TriggerButton label="Small (12px)" theme={theme} />
            </TooltipDemo>
            <TooltipDemo content="Large tooltip with more padding" position="top" variant={variant} size="lg">
              <TriggerButton label="Large (14px)" theme={theme} />
            </TooltipDemo>
          </>
        )}
      </TooltipExampleSection>

      <h2>Multi-line Content</h2>

      <TooltipExampleSection
        title="Multi-line Tooltips"
        desc="Tooltips can display longer descriptions that wrap across multiple lines."
      >
        {({ theme, variant, size, position }) => (
          <TooltipDemo
            content="This is a multi-line tooltip that wraps to show longer descriptions. Use it for additional context."
            position={position}
            variant={variant}
            size={size}
          >
            <TriggerButton label="Hover for details" theme={theme} />
          </TooltipDemo>
        )}
      </TooltipExampleSection>

      <h2>With CTAs</h2>

      <TooltipExampleSection
        title="Tooltip with CTA Buttons"
        desc="Tooltips can include call-to-action buttons for guided interactions like onboarding or feature discovery."
      >
        {({ theme, variant, position }) => (
          <TooltipWithCTA
            position={position}
            variant={variant}
            theme={theme}
          />
        )}
      </TooltipExampleSection>
    </>
  );
}

/* ── Tooltip with CTA (interactive, pointer events enabled) ── */
function TooltipWithCTA({
  position,
  variant,
  theme,
}: {
  position: TooltipPosition;
  variant: TooltipVariant;
  theme: 'light' | 'dark';
}) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };
  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 200);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const vStyles = variantStyles[variant];

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <TriggerButton label="Feature tip" theme={theme} />
      <div
        role="tooltip"
        onMouseEnter={show}
        onMouseLeave={hide}
        style={{
          position: 'absolute',
          ...getPositionStyles(position),
          background: vStyles.bg,
          color: vStyles.text,
          border: vStyles.border,
          borderRadius: 8,
          padding: '10px 14px',
          fontSize: 13,
          lineHeight: 1.5,
          maxWidth: 260,
          whiteSpace: 'normal',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          pointerEvents: visible ? 'auto' : 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 150ms ease',
        }}
      >
        <div style={getArrowStyles(position, variant)} />
        <div style={{ marginBottom: 8 }}>
          <strong style={{ fontSize: 13 }}>New feature available</strong>
          <p style={{ margin: '4px 0 0', fontSize: 12, opacity: 0.85 }}>
            Try our new export options for faster workflows.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            style={{
              padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600,
              border: 'none', cursor: 'pointer',
              background: variant === 'white' ? '#0D0D0D' : '#FFFFFF',
              color: variant === 'white' ? '#FFFFFF' : '#0D0D0D',
            }}
          >
            Try it
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            style={{
              padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600,
              border: `1px solid ${variant === 'white' ? '#D0D0D0' : 'rgba(255,255,255,0.3)'}`,
              cursor: 'pointer', background: 'transparent', color: vStyles.text,
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
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
      <pre><code>{`import { Tooltip } from '@tarmac/design-system';`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`/**
 * Tooltip — contextual popup displayed on hover or focus.
 *
 * @remarks
 * Renders a floating box with an arrow indicator anchored to the
 * trigger element. Supports multiple positions, color variants,
 * and sizes. Appears with a 150 ms fade-in transition.
 *
 * @example
 * <Tooltip content="Save changes" position="top" variant="black" size="sm">
 *   <button>Save</button>
 * </Tooltip>
 */
interface TooltipProps {
  /**
   * The content rendered inside the tooltip popup.
   * Accepts plain text or rich ReactNode (multi-line, icons, CTAs).
   */
  content: ReactNode;

  /**
   * Placement of the tooltip relative to the trigger element.
   * @default 'top'
   */
  position?: 'top' | 'bottom' | 'left' | 'right';

  /**
   * Visual color variant controlling background, text, and border.
   * - \`white\` — #FFF background, dark text, light border
   * - \`black\` — #0D0D0D background, white text, no border
   * - \`coal\`  — #525252 background, white text, no border
   * @default 'black'
   */
  variant?: 'white' | 'black' | 'coal';

  /**
   * Size preset controlling padding and font size.
   * - \`sm\` — padding 4px 8px, font 12px
   * - \`lg\` — padding 8px 12px, font 14px
   * @default 'sm'
   */
  size?: 'sm' | 'lg';

  /**
   * The trigger element that the tooltip anchors to.
   * Tooltip appears when this element is hovered or focused.
   */
  children: ReactNode;
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>content</code></td><td><code>ReactNode</code></td><td>—</td><td>Tooltip body content. Supports text, JSX, multi-line, and CTA buttons.</td></tr>
          <tr><td><code>position</code></td><td><code>&apos;top&apos; | &apos;bottom&apos; | &apos;left&apos; | &apos;right&apos;</code></td><td><code>&apos;top&apos;</code></td><td>Which side of the trigger the tooltip appears on.</td></tr>
          <tr><td><code>variant</code></td><td><code>&apos;white&apos; | &apos;black&apos; | &apos;coal&apos;</code></td><td><code>&apos;black&apos;</code></td><td>Color scheme of the tooltip surface.</td></tr>
          <tr><td><code>size</code></td><td><code>&apos;sm&apos; | &apos;lg&apos;</code></td><td><code>&apos;sm&apos;</code></td><td>Controls padding and font size.</td></tr>
          <tr><td><code>children</code></td><td><code>ReactNode</code></td><td>—</td><td>Trigger element the tooltip anchors to.</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>
      <pre><code>{`// Basic tooltip
<Tooltip content="Save your progress">
  <button>Save</button>
</Tooltip>

// Bottom position, white variant, large size
<Tooltip content="Click to export as PDF" position="bottom" variant="white" size="lg">
  <IconButton icon={<ExportIcon />} />
</Tooltip>

// Multi-line rich content
<Tooltip
  content={
    <div>
      <strong>Keyboard shortcut</strong>
      <p style={{ margin: '4px 0 0', opacity: 0.8 }}>
        Press Ctrl+S to save your work.
      </p>
    </div>
  }
  position="right"
  variant="coal"
  size="lg"
>
  <span>Hover for shortcut</span>
</Tooltip>

// Tooltip with CTA buttons
<Tooltip
  content={
    <div>
      <p>New feature available!</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Button size="xs" onClick={handleTry}>Try it</Button>
        <Button size="xs" variant="ghost" onClick={handleDismiss}>Dismiss</Button>
      </div>
    </div>
  }
  position="bottom"
  variant="black"
  size="lg"
>
  <Badge variant="blue">New</Badge>
</Tooltip>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>tooltip-padding-sm</td><td>4px 8px</td></tr>
          <tr><td>tooltip-padding-lg</td><td>8px 12px</td></tr>
          <tr><td>tooltip-font-sm</td><td>12px</td></tr>
          <tr><td>tooltip-font-lg</td><td>14px</td></tr>
          <tr><td>tooltip-border-radius</td><td>6px</td></tr>
          <tr><td>tooltip-arrow-size</td><td>6px</td></tr>
          <tr><td>tooltip-max-width-sm</td><td>200px</td></tr>
          <tr><td>tooltip-max-width-lg</td><td>280px</td></tr>
          <tr><td>tooltip-z-index</td><td>1000</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Background</th><th>Text</th><th>Border</th></tr></thead>
        <tbody>
          <tr><td>white</td><td>#FFFFFF</td><td>#1A1A1A</td><td>1px solid #E0E0E0</td></tr>
          <tr><td>black</td><td>#0D0D0D</td><td>#FFFFFF</td><td>none</td></tr>
          <tr><td>coal</td><td>#525252</td><td>#FFFFFF</td><td>none</td></tr>
        </tbody>
      </table>

      <h2>Animation</h2>
      <table>
        <thead><tr><th>Property</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Transition</td><td>opacity 150ms ease</td></tr>
          <tr><td>Enter</td><td>opacity 0 → 1</td></tr>
          <tr><td>Exit</td><td>opacity 1 → 0</td></tr>
          <tr><td>Delay (hide)</td><td>100ms debounce</td></tr>
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
          <tr><td>1</td><td>Trigger</td><td>The element (button, icon, text) that activates the tooltip on hover/focus</td></tr>
          <tr><td>2</td><td>Tooltip Container</td><td>Floating box with content, positioned relative to the trigger</td></tr>
          <tr><td>3</td><td>Arrow</td><td>Triangular indicator pointing from the tooltip to the trigger</td></tr>
          <tr><td>4</td><td>Content</td><td>Text, rich content, or CTA buttons inside the tooltip</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To provide supplementary information about an icon-only button</li>
        <li>To show keyboard shortcuts or brief descriptions</li>
        <li>To explain truncated text on hover</li>
        <li>For onboarding tips and feature discovery with CTA buttons</li>
        <li>To display additional context without cluttering the UI</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="tooltip"
        doItems={[
          'Keep tooltip text concise — ideally under 2 lines',
          'Use tooltips for supplementary, non-critical information',
          'Position tooltips to avoid viewport overflow',
          'Ensure tooltips are accessible via keyboard focus',
          'Use the appropriate variant for the background context',
        ]}
        dontItems={[
          'Don\'t put essential information only in tooltips',
          'Don\'t use tooltips on touch-only devices without a fallback',
          'Don\'t nest interactive elements inside basic tooltips',
          'Don\'t use tooltips for error messages — use inline validation',
          'Don\'t show tooltips on disabled elements without explanation',
        ]}
      />

      <h2>Variant Guide</h2>
      <table>
        <thead><tr><th>Variant</th><th>Use Case</th><th>Background</th></tr></thead>
        <tbody>
          <tr><td>Black</td><td>Default — high contrast on light surfaces</td><td>Dark surfaces, general use</td></tr>
          <tr><td>White</td><td>Use on dark backgrounds or when a lighter feel is needed</td><td>Light with border</td></tr>
          <tr><td>Coal</td><td>Subtle dark — less harsh than black</td><td>Medium-dark surfaces</td></tr>
        </tbody>
      </table>

      <h2>Position Guide</h2>
      <table>
        <thead><tr><th>Position</th><th>When to Use</th></tr></thead>
        <tbody>
          <tr><td>Top</td><td>Default. Use when there is space above the trigger.</td></tr>
          <tr><td>Bottom</td><td>When the trigger is near the top of the viewport.</td></tr>
          <tr><td>Left</td><td>For elements on the right edge of the screen.</td></tr>
          <tr><td>Right</td><td>For elements on the left edge or in left-aligned layouts.</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Use sentence case for tooltip text</li>
        <li>Keep text under 80 characters for single-line tooltips</li>
        <li>For multi-line content, limit to 2–3 short lines</li>
        <li>CTA tooltips should have a clear primary action and optional dismiss</li>
        <li>Avoid repeating the trigger label in the tooltip</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>tooltip</td><td>Identifies the popup as a tooltip</td></tr>
          <tr><td>aria-describedby</td><td>tooltip-id</td><td>Links trigger to tooltip content</td></tr>
          <tr><td>Keyboard</td><td>Focus / Blur</td><td>Tooltip appears on focus, hides on blur</td></tr>
          <tr><td>Keyboard</td><td>Escape</td><td>Dismisses the tooltip</td></tr>
          <tr><td>Timing</td><td>150ms fade</td><td>Smooth transition avoids jarring appearance</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>All variants meet WCAG AA text contrast</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Popups</strong> — For richer interactive content triggered by click</li>
        <li><strong>Coachmarks</strong> — For step-by-step onboarding flows</li>
        <li><strong>Snackbar</strong> — For transient feedback messages</li>
        <li><strong>Dialog Box</strong> — For content requiring user action</li>
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
        <li>Added <code>coal</code> variant (#525252 background)</li>
        <li>Added <code>size</code> prop with <code>sm</code> and <code>lg</code> presets</li>
        <li>Added CTA button support for interactive tooltip content</li>
        <li>Added multi-line content wrapping with configurable max-width</li>
        <li>Improved arrow positioning for all four directions</li>
        <li>Added 150ms fade-in/out transition</li>
        <li>Added <code>role=&quot;tooltip&quot;</code> and keyboard focus support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with top/bottom positioning</li>
        <li>Black and white variants</li>
        <li>Single-line text content only</li>
        <li>Basic hover trigger</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function TooltipPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Tooltip"
      description="Tooltips are contextual popups that appear on hover or focus to provide additional information about a UI element."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
