'use client';

import { useState, useEffect } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Types ── */
type CoachmarkVariant = 'single' | 'multi-step' | 'spotlight' | 'dismissible';
type CoachmarkPosition = 'top' | 'bottom' | 'left' | 'right';

const selectStyle: React.CSSProperties = {
  padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
  background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
};

/* ── Coachmark Demo ── */
function CoachmarkDemo({
  theme,
  variant = 'single',
  position = 'bottom',
}: {
  theme: 'light' | 'dark';
  variant?: CoachmarkVariant;
  position?: CoachmarkPosition;
}) {
  const totalSteps = variant === 'multi-step' ? 3 : 1;
  const [step, setStep] = useState(1);
  const [dismissed, setDismissed] = useState(false);

  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const fg = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const muted = theme === 'dark' ? '#888' : '#777';
  const accent = theme === 'dark' ? '#60A5FA' : '#2396FB';
  const tooltipBg = theme === 'dark' ? '#1E3A5F' : '#E8F4FD';
  const tooltipBorder = theme === 'dark' ? '#2D5A8E' : '#B3D9F7';
  const spotlightBg = theme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.4)';
  const targetBg = theme === 'dark' ? '#3A3A3A' : '#E0E0E0';

  const stepTitles = ['Welcome!', 'Try this feature', 'You\'re all set'];
  const stepDescs = [
    'This button lets you create new items quickly.',
    'Use the search bar to find anything in your workspace.',
    'Check your notifications here for updates.',
  ];

  const arrowSize = 8;

  const getArrowStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute', width: 0, height: 0,
      borderStyle: 'solid',
    };
    switch (position) {
      case 'top': return { ...base, bottom: -arrowSize, left: '50%', transform: 'translateX(-50%)', borderWidth: `${arrowSize}px ${arrowSize}px 0`, borderColor: `${tooltipBorder} transparent transparent transparent` };
      case 'bottom': return { ...base, top: -arrowSize, left: '50%', transform: 'translateX(-50%)', borderWidth: `0 ${arrowSize}px ${arrowSize}px`, borderColor: `transparent transparent ${tooltipBorder} transparent` };
      case 'left': return { ...base, right: -arrowSize, top: '50%', transform: 'translateY(-50%)', borderWidth: `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`, borderColor: `transparent transparent transparent ${tooltipBorder}` };
      case 'right': return { ...base, left: -arrowSize, top: '50%', transform: 'translateY(-50%)', borderWidth: `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`, borderColor: `transparent ${tooltipBorder} transparent transparent` };
    }
  };

  const getTooltipPosition = (): React.CSSProperties => {
    switch (position) {
      case 'top': return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 12 };
      case 'bottom': return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 12 };
      case 'left': return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 12 };
      case 'right': return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 12 };
    }
  };

  if (dismissed) {
    return (
      <div style={{ width: 280, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, borderRadius: 12, border: `1px solid ${theme === 'dark' ? '#333' : '#E0E0E0'}` }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: muted }}>Coachmark dismissed</div>
          <button onClick={() => setDismissed(false)} style={{ marginTop: 8, padding: '4px 12px', borderRadius: 6, fontSize: 11, background: accent, color: '#FFF', border: 'none', cursor: 'pointer' }}>Reset</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: 280, height: 220, position: 'relative', background: bg, borderRadius: 12, border: `1px solid ${theme === 'dark' ? '#333' : '#E0E0E0'}`, overflow: 'visible' }}>
      {/* Spotlight overlay */}
      {variant === 'spotlight' && (
        <div style={{ position: 'absolute', inset: 0, background: spotlightBg, borderRadius: 12, zIndex: 1 }}>
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 60, height: 36, borderRadius: 8,
            boxShadow: `0 0 0 9999px ${spotlightBg}`,
            background: 'transparent',
          }} />
        </div>
      )}

      {/* Target element */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
        <div style={{
          padding: '8px 20px', borderRadius: 8, background: targetBg, fontSize: 12,
          fontWeight: 500, color: fg, cursor: 'pointer', whiteSpace: 'nowrap',
          boxShadow: variant === 'spotlight' ? `0 0 0 3px ${accent}40` : 'none',
        }}>
          Target Button
        </div>

        {/* Tooltip */}
        <div style={{
          position: 'absolute', ...getTooltipPosition(),
          background: tooltipBg, border: `1px solid ${tooltipBorder}`,
          borderRadius: 10, padding: 12, width: 190, zIndex: 10,
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}>
          <div style={getArrowStyle()} />

          {variant === 'dismissible' && (
            <button onClick={() => setDismissed(true)} style={{
              position: 'absolute', top: 6, right: 8, background: 'none', border: 'none',
              cursor: 'pointer', fontSize: 14, color: muted, lineHeight: 1,
            }}>×</button>
          )}

          <div style={{ fontSize: 12, fontWeight: 600, color: fg, marginBottom: 4 }}>
            {variant === 'multi-step' ? stepTitles[step - 1] : 'Quick Tip'}
          </div>
          <div style={{ fontSize: 11, color: muted, lineHeight: 1.4, marginBottom: 10 }}>
            {variant === 'multi-step' ? stepDescs[step - 1] : 'Click this button to create a new item in your workspace.'}
          </div>

          {variant === 'multi-step' ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 10, color: muted }}>{step}/{totalSteps}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => setStep(s => Math.max(1, s - 1))}
                  disabled={step === 1}
                  style={{
                    padding: '3px 10px', borderRadius: 5, fontSize: 10, fontWeight: 500,
                    background: 'transparent', color: step === 1 ? muted : accent,
                    border: `1px solid ${step === 1 ? (theme === 'dark' ? '#444' : '#CCC') : accent}`,
                    cursor: step === 1 ? 'not-allowed' : 'pointer', opacity: step === 1 ? 0.5 : 1,
                  }}
                >Previous</button>
                <button
                  onClick={() => setStep(s => Math.min(totalSteps, s + 1))}
                  style={{
                    padding: '3px 10px', borderRadius: 5, fontSize: 10, fontWeight: 500,
                    background: accent, color: '#FFF', border: 'none', cursor: 'pointer',
                  }}
                >{step === totalSteps ? 'Done' : 'Next'}</button>
              </div>
            </div>
          ) : (
            <button style={{
              padding: '3px 10px', borderRadius: 5, fontSize: 10, fontWeight: 500,
              background: accent, color: '#FFF', border: 'none', cursor: 'pointer',
            }}>Got it</button>
          )}

          {/* Step dots for multi-step */}
          {variant === 'multi-step' && (
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 8 }}>
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: i + 1 === step ? accent : (theme === 'dark' ? '#555' : '#CCC'),
                }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Custom Example Section ── */
function CoachmarkExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { theme: 'light' | 'dark'; variant: CoachmarkVariant; position: CoachmarkPosition }) => React.ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState<CoachmarkVariant>('single');
  const [position, setPosition] = useState<CoachmarkPosition>('bottom');
  useEffect(() => { setTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);
  const bg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>{title}</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>{desc}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <select value={variant} onChange={e => setVariant(e.target.value as CoachmarkVariant)} style={selectStyle}>
          <option value="single">Single</option>
          <option value="multi-step">Multi-step</option>
          <option value="spotlight">With Spotlight</option>
          <option value="dismissible">Dismissible</option>
        </select>
        <select value={position} onChange={e => setPosition(e.target.value as CoachmarkPosition)} style={selectStyle}>
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
      <div style={{ background: bg, borderRadius: 12, padding: 48, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        {children({ theme, variant, position })}
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
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-coachmarks--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-coachmarks--playground"
        height={420}
        title="Coachmarks — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        Coachmarks are contextual tooltip overlays that guide users through features
        and workflows. They point to specific UI elements and can be single-step tips
        or multi-step guided tours with progress indicators.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Single, Multi-step, With Spotlight, Dismissible</td></tr>
          <tr><td>Positions</td><td>Top, Bottom, Left, Right</td></tr>
          <tr><td>Features</td><td>Arrow pointer, Step indicator, Spotlight mask, Dismiss button</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <CoachmarkExampleSection
        title="Coachmark Variants"
        desc="Switch between Single, Multi-step, Spotlight, and Dismissible variants. Change position to see arrow placement. Use Next/Previous in multi-step mode."
      >
        {({ theme, variant, position }) => (
          <CoachmarkDemo theme={theme} variant={variant} position={position} />
        )}
      </CoachmarkExampleSection>

      <h2>Positions</h2>

      <CoachmarkExampleSection
        title="Arrow Positions"
        desc="Coachmarks can be positioned on any side of the target element. The arrow automatically points toward the target."
      >
        {({ theme }) => (
          <>
            <CoachmarkDemo theme={theme} variant="single" position="top" />
            <CoachmarkDemo theme={theme} variant="single" position="bottom" />
          </>
        )}
      </CoachmarkExampleSection>

      <h2>Multi-step Tour</h2>

      <CoachmarkExampleSection
        title="Guided Tour"
        desc="Multi-step coachmarks include Previous/Next navigation and step dots. Click Next to advance through the tour."
      >
        {({ theme, position }) => (
          <CoachmarkDemo theme={theme} variant="multi-step" position={position} />
        )}
      </CoachmarkExampleSection>
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
      <pre><code>{`import { Coachmark, CoachmarkTour } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface CoachmarkProps {
  targetRef: React.RefObject<HTMLElement>;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'single' | 'multi-step' | 'spotlight' | 'dismissible';
  visible: boolean;
  onDismiss?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  currentStep?: number;
  totalSteps?: number;
  spotlight?: boolean;
}

interface CoachmarkTourProps {
  steps: Array<{
    targetRef: React.RefObject<HTMLElement>;
    title: string;
    description: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
  }>;
  active: boolean;
  onComplete: () => void;
  onSkip?: () => void;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Single coachmark
<Coachmark
  targetRef={buttonRef}
  title="Quick Tip"
  description="Click here to create a new item."
  position="bottom"
  visible={showTip}
  onDismiss={() => setShowTip(false)}
/>

// Multi-step tour
<CoachmarkTour
  active={showTour}
  steps={[
    { targetRef: createRef, title: 'Create', description: 'Start here', position: 'bottom' },
    { targetRef: searchRef, title: 'Search', description: 'Find items', position: 'bottom' },
    { targetRef: profileRef, title: 'Profile', description: 'Your settings', position: 'left' },
  ]}
  onComplete={() => setShowTour(false)}
  onSkip={() => setShowTour(false)}
/>

// With spotlight
<Coachmark
  targetRef={featureRef}
  title="New Feature"
  description="Try our latest addition."
  spotlight
  visible={showSpotlight}
  onDismiss={() => setShowSpotlight(false)}
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>coachmark-bg-light</td><td>#E8F4FD</td></tr>
          <tr><td>coachmark-bg-dark</td><td>#1E3A5F</td></tr>
          <tr><td>coachmark-border-light</td><td>#B3D9F7</td></tr>
          <tr><td>coachmark-border-dark</td><td>#2D5A8E</td></tr>
          <tr><td>coachmark-border-radius</td><td>10px</td></tr>
          <tr><td>coachmark-arrow-size</td><td>8px</td></tr>
          <tr><td>coachmark-spotlight-opacity</td><td>0.4 (light) / 0.7 (dark)</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all coachmark variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-coachmark--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Tooltip Container</td><td>Rounded card with background and border</td></tr>
          <tr><td>2</td><td>Arrow</td><td>Directional pointer toward the target element</td></tr>
          <tr><td>3</td><td>Title</td><td>Bold heading describing the tip or step</td></tr>
          <tr><td>4</td><td>Description</td><td>Explanatory text for the feature or action</td></tr>
          <tr><td>5</td><td>Step Indicator</td><td>Dots or counter showing progress (multi-step)</td></tr>
          <tr><td>6</td><td>Navigation Buttons</td><td>Previous/Next for multi-step tours</td></tr>
          <tr><td>7</td><td>Dismiss Button</td><td>Close icon for dismissible variant</td></tr>
          <tr><td>8</td><td>Spotlight Mask</td><td>Dark overlay with cutout around target</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To onboard new users with feature discovery tours</li>
        <li>To highlight new or updated features after a release</li>
        <li>To provide contextual help for complex UI elements</li>
        <li>To guide users through multi-step workflows</li>
        <li>To draw attention to underused features</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="coachmarks"
        doItems={[
          'Keep coachmark text short and actionable',
          'Show coachmarks only once per user (persist dismissal)',
          'Use spotlight to focus attention on the target element',
          'Provide a way to skip or dismiss the entire tour',
          'Position coachmarks to avoid covering important content',
        ]}
        dontItems={[
          'Don\'t show more than 5 steps in a single tour',
          'Don\'t trigger coachmarks on every page load',
          'Don\'t cover the target element with the tooltip',
          'Don\'t use coachmarks for critical error messages',
          'Don\'t block user interaction with the rest of the page (except spotlight)',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>tooltip</td><td>Identifies the coachmark as a tooltip</td></tr>
          <tr><td>aria-describedby</td><td>string</td><td>Links target element to coachmark content</td></tr>
          <tr><td>aria-live</td><td>polite</td><td>Announces step changes to screen readers</td></tr>
          <tr><td>Escape key</td><td>—</td><td>Dismisses the coachmark or tour</td></tr>
          <tr><td>Tab</td><td>—</td><td>Navigates between action buttons</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Popups</strong> — General-purpose tooltip and popover overlays</li>
        <li><strong>Dialog Box</strong> — For more complex onboarding content</li>
        <li><strong>Snackbar</strong> — For brief, non-blocking notifications</li>
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
        <li>Added <code>CoachmarkTour</code> component for multi-step guided tours</li>
        <li>Added <code>spotlight</code> variant with backdrop mask</li>
        <li>Added <code>dismissible</code> variant with close button</li>
        <li>Added step indicator dots for multi-step tours</li>
        <li>Improved positioning engine with collision detection</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with single coachmark tooltip</li>
        <li>Four position options: top, bottom, left, right</li>
        <li>Arrow pointer with automatic direction</li>
        <li>Light and dark theme support</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function CoachmarksPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Coachmarks"
      description="Coachmarks are contextual tooltip overlays that guide users through features and workflows with step-by-step instructions."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
