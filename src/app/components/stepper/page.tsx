'use client';

import { useState, useEffect } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Types ── */
interface StepItem {
  label: string;
  subtext?: string;
  status?: 'default' | 'active' | 'completed' | 'error' | 'disabled';
}

interface StepperProps {
  steps: StepItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: string;
  size?: 'sm' | 'md' | 'lg';
  currentStep?: number;
  connectorStyle?: 'solid' | 'dotted';
}

/* ── Variant colors ── */
const variantColors: Record<string, { active: string; completed: string }> = {
  black:     { active: '#0D0D0D', completed: '#0D0D0D' },
  coal:      { active: '#525252', completed: '#525252' },
  blue:      { active: '#2396FB', completed: '#2396FB' },
  green:     { active: '#1BA86E', completed: '#1BA86E' },
  'dlv-red': { active: '#ED1B36', completed: '#ED1B36' },
};

const variantLabels: Record<string, string> = {
  black: 'Black', coal: 'Coal', blue: 'Blue', green: 'Green', 'dlv-red': 'DLV Red',
};

const sizeDimensions: Record<string, { circle: number; font: number; connectorThickness: number }> = {
  sm: { circle: 28, font: 12, connectorThickness: 2 },
  md: { circle: 36, font: 14, connectorThickness: 2 },
  lg: { circle: 44, font: 16, connectorThickness: 3 },
};

/* ── Checkmark SVG ── */
function CheckIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Error X SVG ── */
function ErrorIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ── Stepper Demo Component ── */
function StepperDemo({
  steps,
  orientation = 'horizontal',
  variant = 'blue',
  size = 'md',
  currentStep = 0,
  connectorStyle = 'solid',
  theme,
}: StepperProps & { theme: 'light' | 'dark' }) {
  const colors = variantColors[variant] || variantColors.blue;
  const dims = sizeDimensions[size] || sizeDimensions.md;
  const iconSize = Math.round(dims.circle * 0.4);

  const defaultBg = theme === 'dark' ? '#444' : '#CCC';
  const defaultText = theme === 'dark' ? '#999' : '#888';
  const disabledBg = theme === 'dark' ? '#333' : '#E0E0E0';
  const disabledText = theme === 'dark' ? '#555' : '#BBB';
  const errorColor = '#DC143C';
  const labelColor = theme === 'dark' ? '#EEE' : '#222';
  const subtextColor = theme === 'dark' ? '#AAA' : '#777';

  const resolvedSteps = steps.map((step, i) => {
    let status = step.status;
    if (!status) {
      if (i < currentStep) status = 'completed';
      else if (i === currentStep) status = 'active';
      else status = 'default';
    }
    return { ...step, status };
  });

  const isVertical = orientation === 'vertical';

  return (
    <div
      role="list"
      aria-label="Progress"
      style={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: isVertical ? 'flex-start' : 'flex-start',
        gap: 0,
        width: '100%',
      }}
    >
      {resolvedSteps.map((step, i) => {
        const isLast = i === resolvedSteps.length - 1;
        let circleBg = defaultBg;
        let circleColor = defaultText;
        let borderColor = 'transparent';

        if (step.status === 'active') {
          circleBg = colors.active;
          circleColor = '#FFF';
        } else if (step.status === 'completed') {
          circleBg = colors.completed;
          circleColor = '#FFF';
        } else if (step.status === 'error') {
          circleBg = errorColor;
          circleColor = '#FFF';
        } else if (step.status === 'disabled') {
          circleBg = disabledBg;
          circleColor = disabledText;
        }

        const connectorColor = step.status === 'completed' ? colors.completed : (theme === 'dark' ? '#444' : '#CCC');

        if (isVertical) {
          return (
            <div
              key={i}
              role="listitem"
              aria-current={step.status === 'active' ? 'step' : undefined}
              aria-disabled={step.status === 'disabled' ? true : undefined}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', opacity: step.status === 'disabled' ? 0.5 : 1 }}
            >
              {/* Circle + vertical connector */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: dims.circle }}>
                <div style={{
                  width: dims.circle, height: dims.circle, borderRadius: '50%',
                  background: circleBg, border: `2px solid ${borderColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: circleColor, fontSize: dims.font, fontWeight: 600,
                  flexShrink: 0, boxSizing: 'border-box',
                  boxShadow: step.status === 'active' ? `0 0 0 3px ${colors.active}33` : 'none',
                }}>
                  {step.status === 'completed' ? <CheckIcon size={iconSize} /> :
                   step.status === 'error' ? <ErrorIcon size={iconSize} /> :
                   i + 1}
                </div>
                {!isLast && (
                  <div style={{
                    width: dims.connectorThickness, flex: 1, minHeight: 32,
                    background: connectorStyle === 'dotted' ? 'transparent' : connectorColor,
                    borderLeft: connectorStyle === 'dotted' ? `${dims.connectorThickness}px dotted ${connectorColor}` : 'none',
                    marginLeft: connectorStyle === 'dotted' ? -(dims.connectorThickness / 2) : 0,
                  }} />
                )}
              </div>
              {/* Label + subtext */}
              <div style={{ marginLeft: 12, paddingBottom: isLast ? 0 : 20, paddingTop: Math.round((dims.circle - dims.font - 4) / 2) }}>
                <div style={{ fontSize: dims.font, fontWeight: 600, color: step.status === 'disabled' ? disabledText : labelColor, lineHeight: 1.3 }}>
                  {step.label}
                </div>
                {step.subtext && (
                  <div style={{ fontSize: dims.font - 2, color: subtextColor, marginTop: 2, lineHeight: 1.3 }}>
                    {step.subtext}
                  </div>
                )}
              </div>
            </div>
          );
        }

        /* Horizontal layout */
        return (
          <div
            key={i}
            role="listitem"
            aria-current={step.status === 'active' ? 'step' : undefined}
            aria-disabled={step.status === 'disabled' ? true : undefined}
            style={{
              display: 'flex', alignItems: 'center', flex: isLast ? '0 0 auto' : '1 1 0',
              opacity: step.status === 'disabled' ? 0.5 : 1,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: dims.circle }}>
              <div style={{
                width: dims.circle, height: dims.circle, borderRadius: '50%',
                background: circleBg, border: `2px solid ${borderColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: circleColor, fontSize: dims.font, fontWeight: 600,
                flexShrink: 0, boxSizing: 'border-box',
                boxShadow: step.status === 'active' ? `0 0 0 3px ${colors.active}33` : 'none',
              }}>
                {step.status === 'completed' ? <CheckIcon size={iconSize} /> :
                 step.status === 'error' ? <ErrorIcon size={iconSize} /> :
                 i + 1}
              </div>
              <div style={{ fontSize: dims.font - 2, fontWeight: 600, color: step.status === 'disabled' ? disabledText : labelColor, marginTop: 6, textAlign: 'center', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                {step.label}
              </div>
              {step.subtext && (
                <div style={{ fontSize: dims.font - 4, color: subtextColor, marginTop: 2, textAlign: 'center', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                  {step.subtext}
                </div>
              )}
            </div>
            {!isLast && (
              <div style={{
                flex: 1, height: dims.connectorThickness, minWidth: 24,
                background: connectorStyle === 'dotted' ? 'transparent' : connectorColor,
                borderTop: connectorStyle === 'dotted' ? `${dims.connectorThickness}px dotted ${connectorColor}` : 'none',
                alignSelf: 'flex-start',
                marginTop: dims.circle / 2 - dims.connectorThickness / 2,
                marginLeft: 8, marginRight: 8,
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}


/* ── Custom example section with variant + size + orientation controls ── */
function StepperExampleSection({
  title, desc, children,
}: {
  title: string;
  desc: string;
  children: (props: { size: 'sm' | 'md' | 'lg'; theme: 'light' | 'dark'; variant: string; orientation: 'horizontal' | 'vertical'; connectorStyle: 'solid' | 'dotted' }) => React.ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState('blue');
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [connectorStyle, setConnectorStyle] = useState<'solid' | 'dotted'>('solid');

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
        <select value={size} onChange={e => setSize(e.target.value as 'sm' | 'md' | 'lg')} style={selectStyle}>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
        <select value={variant} onChange={e => setVariant(e.target.value)} style={selectStyle}>
          {Object.keys(variantColors).map(v => (
            <option key={v} value={v}>{variantLabels[v]}</option>
          ))}
        </select>
        <select value={orientation} onChange={e => setOrientation(e.target.value as 'horizontal' | 'vertical')} style={selectStyle}>
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
        <select value={connectorStyle} onChange={e => setConnectorStyle(e.target.value as 'solid' | 'dotted')} style={selectStyle}>
          <option value="solid">Solid connector</option>
          <option value="dotted">Dotted connector</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {children({ size, theme, variant, orientation, connectorStyle })}
      </div>
    </div>
  );
}

/* ── Sample steps data ── */
const sampleSteps: StepItem[] = [
  { label: 'Account', subtext: 'Create account' },
  { label: 'Profile', subtext: 'Set up profile' },
  { label: 'Preferences', subtext: 'Choose settings' },
  { label: 'Confirm', subtext: 'Review & submit' },
];

const stateSteps: StepItem[] = [
  { label: 'Completed', subtext: 'Done', status: 'completed' },
  { label: 'Active', subtext: 'In progress', status: 'active' },
  { label: 'Error', subtext: 'Needs attention', status: 'error' },
  { label: 'Disabled', subtext: 'Locked', status: 'disabled' },
  { label: 'Default', subtext: 'Upcoming', status: 'default' },
];

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  const [currentStep, setCurrentStep] = useState(1);
  const { theme: globalTheme } = useTheme();
  const [demoTheme, setDemoTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');

  useEffect(() => { setDemoTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);

  const demoBg = demoTheme === 'dark' ? '#1A1A1A' : '#F5F5F5';
  const totalSteps = sampleSteps.length;

  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=atoms-steps--default&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/atoms-steps--default"
        height={420}
        title="Stepper — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        Steppers are multi-step progress indicators that guide users through a sequence of
        numbered stages. They render as a row or column of numbered circles connected by lines,
        with the active step highlighted and completed steps showing checkmarks.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Orientations</td><td>Horizontal, Vertical</td></tr>
          <tr><td>Icon Styles</td><td>Numeric (1, 2, 3), Black, Coal, Blue, Green, DLV Red</td></tr>
          <tr><td>Sizes</td><td>Small (28px), Medium (36px), Large (44px)</td></tr>
          <tr><td>States</td><td>Default, Active, Completed (checkmark), Error, Disabled</td></tr>
          <tr><td>Features</td><td>Step labels, Subtexts, Connectors (solid, dotted)</td></tr>
        </tbody>
      </table>

      <h2>Interactive Demo</h2>
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>Navigate Steps</h3>
        <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>
          Use the Next and Prev buttons to advance through the stepper interactively.
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <select value={demoTheme} onChange={e => setDemoTheme(e.target.value as 'light' | 'dark')} style={{
            padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
            background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
          }}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div style={{ background: demoBg, borderRadius: 12, padding: 24 }}>
          <StepperDemo steps={sampleSteps} currentStep={currentStep} variant="blue" size="md" theme={demoTheme} />
          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center' }}>
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              style={{
                padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                border: '1px solid var(--color-outline)', background: 'var(--color-surface)', color: 'var(--color-on-surface)',
                opacity: currentStep === 0 ? 0.4 : 1,
              }}
            >
              ← Prev
            </button>
            <span style={{ fontSize: 13, color: demoTheme === 'dark' ? '#CCC' : '#555', alignSelf: 'center', fontVariantNumeric: 'tabular-nums' }}>
              Step {currentStep + 1} of {totalSteps}
            </span>
            <button
              onClick={() => setCurrentStep(s => Math.min(totalSteps - 1, s + 1))}
              disabled={currentStep === totalSteps - 1}
              style={{
                padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: currentStep === totalSteps - 1 ? 'not-allowed' : 'pointer',
                border: 'none', background: '#2396FB', color: '#FFF',
                opacity: currentStep === totalSteps - 1 ? 0.4 : 1,
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <h2>All Variants</h2>

      <StepperExampleSection
        title="Color Variants"
        desc="Each variant uses a distinct color for active and completed step indicators."
      >
        {({ size, theme, orientation, connectorStyle }) => (
          <>
            {Object.keys(variantColors).map(v => (
              <div key={v} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme === 'dark' ? '#AAA' : '#666', marginBottom: 8 }}>{variantLabels[v]}</div>
                <StepperDemo steps={sampleSteps} currentStep={1} variant={v} size={size} orientation={orientation} connectorStyle={connectorStyle} theme={theme} />
              </div>
            ))}
          </>
        )}
      </StepperExampleSection>

      <h2>Orientations</h2>

      <StepperExampleSection
        title="Horizontal vs Vertical"
        desc="Steppers can be laid out horizontally for wide layouts or vertically for narrow/mobile contexts."
      >
        {({ size, theme, variant, connectorStyle }) => (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: theme === 'dark' ? '#AAA' : '#666', marginBottom: 8 }}>Horizontal</div>
              <StepperDemo steps={sampleSteps} currentStep={2} variant={variant} size={size} orientation="horizontal" connectorStyle={connectorStyle} theme={theme} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: theme === 'dark' ? '#AAA' : '#666', marginBottom: 8 }}>Vertical</div>
              <StepperDemo steps={sampleSteps} currentStep={2} variant={variant} size={size} orientation="vertical" connectorStyle={connectorStyle} theme={theme} />
            </div>
          </>
        )}
      </StepperExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Steppers come in three sizes. Small (28px) for compact layouts, Medium (36px) as default, Large (44px) for prominent indicators."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ theme }) => (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: (theme as string) === 'dark' ? '#AAA' : '#666', marginBottom: 8 }}>Small (28px)</div>
              <StepperDemo steps={sampleSteps} currentStep={1} variant="blue" size="sm" theme={theme as 'light' | 'dark'} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: (theme as string) === 'dark' ? '#AAA' : '#666', marginBottom: 8 }}>Medium (36px)</div>
              <StepperDemo steps={sampleSteps} currentStep={1} variant="blue" size="md" theme={theme as 'light' | 'dark'} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: (theme as string) === 'dark' ? '#AAA' : '#666', marginBottom: 8 }}>Large (44px)</div>
              <StepperDemo steps={sampleSteps} currentStep={1} variant="blue" size="lg" theme={theme as 'light' | 'dark'} />
            </div>
          </div>
        )}
      </ComponentExampleSection>

      <h2>States</h2>

      <StepperExampleSection
        title="All Step States"
        desc="Steps can be in Default, Active, Completed, Error, or Disabled states."
      >
        {({ size, theme, variant, orientation, connectorStyle }) => (
          <StepperDemo steps={stateSteps} currentStep={-1} variant={variant} size={size} orientation={orientation} connectorStyle={connectorStyle} theme={theme} />
        )}
      </StepperExampleSection>

      <h2>Connector Styles</h2>

      <StepperExampleSection
        title="Solid vs Dotted Connectors"
        desc="Connectors between steps can be solid lines or dotted lines."
      >
        {({ size, theme, variant, orientation }) => (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: theme === 'dark' ? '#AAA' : '#666', marginBottom: 8 }}>Solid</div>
              <StepperDemo steps={sampleSteps} currentStep={2} variant={variant} size={size} orientation={orientation} connectorStyle="solid" theme={theme} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: theme === 'dark' ? '#AAA' : '#666', marginBottom: 8 }}>Dotted</div>
              <StepperDemo steps={sampleSteps} currentStep={2} variant={variant} size={size} orientation={orientation} connectorStyle="dotted" theme={theme} />
            </div>
          </>
        )}
      </StepperExampleSection>
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
      <pre><code>{`import { Stepper } from '@tarmac/design-system';`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`interface StepItem {
  /** Display label for the step. */
  label: string;
  /** Optional secondary text shown below the label. */
  subtext?: string;
  /** Explicit status override. When omitted, status is derived from currentStep. */
  status?: 'default' | 'active' | 'completed' | 'error' | 'disabled';
}

interface StepperProps {
  /** Array of step definitions. Each step must have a label. */
  steps: StepItem[];
  /** Layout direction of the stepper. */
  orientation?: 'horizontal' | 'vertical';
  /** Color variant for active and completed indicators. */
  variant?: 'black' | 'coal' | 'blue' | 'green' | 'dlv-red';
  /** Size of step circles. */
  size?: 'sm' | 'md' | 'lg';
  /** Zero-based index of the current active step. Steps before this are marked completed. */
  currentStep?: number;
  /** Style of connector lines between steps. */
  connectorStyle?: 'solid' | 'dotted';
  /** Callback fired when a completed step is clicked. */
  onStepClick?: (stepIndex: number) => void;
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>steps</code></td><td><code>StepItem[]</code></td><td>required</td><td>Array of step objects. Each must include a <code>label</code>. Optional <code>subtext</code> and <code>status</code> override.</td></tr>
          <tr><td><code>orientation</code></td><td><code>string</code></td><td><code>&apos;horizontal&apos;</code></td><td>Layout direction: <code>horizontal</code> or <code>vertical</code>.</td></tr>
          <tr><td><code>variant</code></td><td><code>string</code></td><td><code>&apos;blue&apos;</code></td><td>Color variant: <code>black</code>, <code>coal</code>, <code>blue</code>, <code>green</code>, <code>dlv-red</code>.</td></tr>
          <tr><td><code>size</code></td><td><code>string</code></td><td><code>&apos;md&apos;</code></td><td>Circle size: <code>sm</code> (28px), <code>md</code> (36px), <code>lg</code> (44px).</td></tr>
          <tr><td><code>currentStep</code></td><td><code>number</code></td><td><code>0</code></td><td>Zero-based index of the active step. Steps before this index are auto-completed.</td></tr>
          <tr><td><code>connectorStyle</code></td><td><code>string</code></td><td><code>&apos;solid&apos;</code></td><td>Connector line style: <code>solid</code> or <code>dotted</code>.</td></tr>
          <tr><td><code>onStepClick</code></td><td><code>function</code></td><td><code>undefined</code></td><td>Callback when a completed step is clicked. Receives the step index.</td></tr>
        </tbody>
      </table>

      <h3>StepItem Properties</h3>
      <table>
        <thead><tr><th>Property</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>label</code></td><td><code>string</code></td><td>Yes</td><td>Primary text displayed below (horizontal) or beside (vertical) the step circle.</td></tr>
          <tr><td><code>subtext</code></td><td><code>string</code></td><td>No</td><td>Secondary description text shown below the label.</td></tr>
          <tr><td><code>status</code></td><td><code>string</code></td><td>No</td><td>Explicit status override: <code>default</code>, <code>active</code>, <code>completed</code>, <code>error</code>, <code>disabled</code>. When omitted, derived from <code>currentStep</code>.</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>
      <pre><code>{`// Basic horizontal stepper
<Stepper
  steps={[
    { label: 'Account' },
    { label: 'Profile' },
    { label: 'Preferences' },
    { label: 'Confirm' },
  ]}
  currentStep={1}
/>

// With subtexts and variant
<Stepper
  steps={[
    { label: 'Account', subtext: 'Create your account' },
    { label: 'Profile', subtext: 'Set up your profile' },
    { label: 'Settings', subtext: 'Configure preferences' },
    { label: 'Done', subtext: 'Review and submit' },
  ]}
  currentStep={2}
  variant="green"
  size="lg"
/>

// Vertical orientation with dotted connectors
<Stepper
  steps={[
    { label: 'Order Placed', subtext: 'June 15, 2024' },
    { label: 'Processing', subtext: 'Preparing shipment' },
    { label: 'Shipped', subtext: 'In transit' },
    { label: 'Delivered', subtext: 'Estimated June 20' },
  ]}
  orientation="vertical"
  connectorStyle="dotted"
  currentStep={1}
  variant="dlv-red"
/>

// With explicit status overrides
<Stepper
  steps={[
    { label: 'Details', status: 'completed' },
    { label: 'Payment', status: 'error' },
    { label: 'Review', status: 'disabled' },
    { label: 'Confirm', status: 'disabled' },
  ]}
  variant="blue"
/>

// Controlled stepper with navigation
const [step, setStep] = useState(0);
<Stepper
  steps={steps}
  currentStep={step}
  onStepClick={(i) => setStep(i)}
/>
<button onClick={() => setStep(s => Math.max(0, s - 1))}>Prev</button>
<button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>Next</button>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>stepper-circle-sm</td><td>28px</td></tr>
          <tr><td>stepper-circle-md</td><td>36px</td></tr>
          <tr><td>stepper-circle-lg</td><td>44px</td></tr>
          <tr><td>stepper-connector-thickness</td><td>2px (sm/md), 3px (lg)</td></tr>
          <tr><td>stepper-connector-gap</td><td>8px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Active / Completed</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>Neutral / monochrome</td></tr>
          <tr><td>coal</td><td>#525252</td><td>Subtle / secondary</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>Primary / informational</td></tr>
          <tr><td>green</td><td>#1BA86E</td><td>Success / positive flow</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>Brand / Delhivery accent</td></tr>
        </tbody>
      </table>

      <h3>State Colors</h3>
      <table>
        <thead><tr><th>State</th><th>Light Theme</th><th>Dark Theme</th></tr></thead>
        <tbody>
          <tr><td>Default circle</td><td>#CCC</td><td>#444</td></tr>
          <tr><td>Default text</td><td>#888</td><td>#999</td></tr>
          <tr><td>Disabled circle</td><td>#E0E0E0</td><td>#333</td></tr>
          <tr><td>Error</td><td colSpan={2}>#DC143C</td></tr>
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
          <tr><td>1</td><td>Container</td><td>Wrapper element holding all steps and connectors</td></tr>
          <tr><td>2</td><td>Step Circle</td><td>Numbered or icon indicator for each step</td></tr>
          <tr><td>3</td><td>Step Label</td><td>Primary text identifying the step</td></tr>
          <tr><td>4</td><td>Step Subtext</td><td>Optional secondary description below the label</td></tr>
          <tr><td>5</td><td>Connector</td><td>Line connecting adjacent step circles (solid or dotted)</td></tr>
          <tr><td>6</td><td>Checkmark</td><td>Icon replacing the number in completed steps</td></tr>
          <tr><td>7</td><td>Error Icon</td><td>X icon replacing the number in error steps</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>Multi-step forms or wizards (registration, checkout, onboarding)</li>
        <li>Order tracking or shipment progress</li>
        <li>Workflow pipelines with sequential stages</li>
        <li>Setup or configuration flows</li>
        <li>Approval processes with discrete stages</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="stepper"
        doItems={[
          'Use 3–7 steps for optimal readability',
          'Keep step labels short and descriptive (1–3 words)',
          'Show completed, current, and upcoming steps clearly',
          'Allow navigation back to completed steps when possible',
          'Use vertical orientation for narrow or mobile layouts',
          'Use subtexts to provide additional context when needed',
        ]}
        dontItems={[
          'Don\'t use more than 7 steps — break into sub-steps instead',
          'Don\'t skip steps without validation',
          'Don\'t hide the total step count from the user',
          'Don\'t use steppers for content tabs — use Tabs component instead',
          'Don\'t use steppers for non-sequential processes',
          'Don\'t rely on color alone to convey step status',
        ]}
      />

      <h2>Orientation Guide</h2>
      <table>
        <thead><tr><th>Orientation</th><th>Use When</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Horizontal</td><td>Wide layouts, desktop views, few steps</td><td>Checkout flow, form wizard</td></tr>
          <tr><td>Vertical</td><td>Narrow layouts, mobile, many steps, timeline-style</td><td>Order tracking, approval pipeline</td></tr>
        </tbody>
      </table>

      <h2>State Behavior</h2>
      <table>
        <thead><tr><th>State</th><th>Visual</th><th>Behavior</th></tr></thead>
        <tbody>
          <tr><td>Default</td><td>Muted circle with number</td><td>Upcoming step, not yet reachable</td></tr>
          <tr><td>Active</td><td>Highlighted circle with glow ring</td><td>Current step the user is on</td></tr>
          <tr><td>Completed</td><td>Colored circle with checkmark</td><td>Step finished, may be clickable to revisit</td></tr>
          <tr><td>Error</td><td>Red circle with X icon</td><td>Step has validation errors or issues</td></tr>
          <tr><td>Disabled</td><td>Faded circle, reduced opacity</td><td>Step is locked and not accessible</td></tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>list</td><td>Container uses list semantics for step sequence</td></tr>
          <tr><td>role</td><td>listitem</td><td>Each step is a list item</td></tr>
          <tr><td>aria-current</td><td>step</td><td>Identifies the currently active step</td></tr>
          <tr><td>aria-disabled</td><td>true</td><td>Applied to disabled steps</td></tr>
          <tr><td>aria-label</td><td>Progress</td><td>Accessible name for the stepper container</td></tr>
          <tr><td>Contrast</td><td>≥ 3:1</td><td>Step indicators meet WCAG AA for non-text elements</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter</td><td>Navigate and activate clickable completed steps</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Progress Bar</strong> — Use for continuous progress indication (percentage-based)</li>
        <li><strong>Tabs</strong> — Use for switching between content panels (non-sequential)</li>
        <li><strong>Breadcrumbs</strong> — Use for navigation hierarchy, not progress</li>
        <li><strong>Status Indicator</strong> — Use for static status display without sequential flow</li>
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
        <li>Added horizontal and vertical orientations</li>
        <li>Added 5 color variants: Black, Coal, Blue, Green, DLV Red</li>
        <li>Added 3 size options: SM (28px), MD (36px), LG (44px)</li>
        <li>Added step states: Default, Active, Completed, Error, Disabled</li>
        <li>Added solid and dotted connector styles</li>
        <li>Added <code>subtext</code> support for secondary step descriptions</li>
        <li>Added <code>status</code> override per step for explicit state control</li>
        <li>Checkmark icon for completed steps, X icon for error steps</li>
        <li>Active step glow ring for visual emphasis</li>
        <li>Full accessibility support with <code>role=&quot;list&quot;</code>, <code>aria-current</code>, and <code>aria-disabled</code></li>
        <li>Light and dark theme support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with horizontal numbered stepper</li>
        <li>Basic active and completed states</li>
        <li>Single color option (primary blue)</li>
        <li>Fixed 32px circle size</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function StepperPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Stepper"
      description="Steppers display progress through a sequence of numbered steps, guiding users through multi-step workflows."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
