'use client';

import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── OTP Preview ── */
function OTPPreview({
  variant = '4-digit',
  state = 'empty',
  size = 'md',
  theme,
}: {
  variant?: string;
  state?: string;
  size?: string;
  theme: 'light' | 'dark';
}) {
  const digits = variant === '6-digit' || variant === 'timer' || variant === 'resend' ? 6 : 4;
  const [values, setValues] = useState<string[]>(
    state === 'complete' ? Array(digits).fill('').map((_, i) => String((i + 3) % 10))
    : state === 'filling' ? Array(digits).fill('').map((_, i) => i < Math.floor(digits / 2) ? String((i + 7) % 10) : '')
    : Array(digits).fill('')
  );
  const [focusedIndex, setFocusedIndex] = useState<number | null>(state === 'filling' ? Math.floor(digits / 2) : null);
  const [timer, setTimer] = useState(30);
  const [animating, setAnimating] = useState(false);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const border = state === 'error' ? '#DC143C' : focusedIndex !== null ? '#2396FB' : (theme === 'dark' ? '#444' : '#DDD');
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const subtext = theme === 'dark' ? '#888' : '#999';
  const boxSize = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
  const fontSize = size === 'sm' ? 16 : size === 'lg' ? 22 : 18;

  /* Timer countdown */
  useEffect(() => {
    if ((variant === 'timer' || variant === 'resend') && timer > 0) {
      const t = setTimeout(() => setTimer(prev => prev - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer, variant]);

  /* Typing animation */
  const startAnimation = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setValues(Array(digits).fill(''));
    setFocusedIndex(0);

    const code = Array(digits).fill('').map((_, i) => String((i + 3) % 10));
    let step = 0;

    const tick = () => {
      if (step < digits) {
        setValues(prev => {
          const next = [...prev];
          next[step] = code[step];
          return next;
        });
        setFocusedIndex(step + 1 < digits ? step + 1 : null);
        step++;
        animRef.current = setTimeout(tick, 350);
      } else {
        setFocusedIndex(null);
        setAnimating(false);
      }
    };
    animRef.current = setTimeout(tick, 500);
  }, [animating, digits]);

  useEffect(() => {
    return () => { if (animRef.current) clearTimeout(animRef.current); };
  }, []);

  const handleInput = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...values];
    next[index] = val;
    setValues(next);
    if (val && index < digits - 1) setFocusedIndex(index + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {/* OTP Boxes */}
      <div style={{ display: 'flex', gap: size === 'sm' ? 6 : 8, alignItems: 'center' }}>
        {Array(digits).fill(null).map((_, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <input
              value={values[i]}
              onChange={e => handleInput(i, e.target.value.slice(-1))}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(null)}
              maxLength={1}
              inputMode="numeric"
              style={{
                width: boxSize, height: boxSize,
                textAlign: 'center', fontSize, fontWeight: 600,
                borderRadius: 8,
                border: `1.5px solid ${focusedIndex === i ? '#2396FB' : (state === 'error' ? '#DC143C' : (theme === 'dark' ? '#444' : '#DDD'))}`,
                background: bg, color: text,
                outline: 'none',
                caretColor: '#2396FB',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                boxShadow: focusedIndex === i ? '0 0 0 3px rgba(35,150,251,0.15)' : 'none',
              }}
            />
            {/* Cursor blink for focused empty box */}
            {focusedIndex === i && !values[i] && (
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 2, height: fontSize + 4, background: '#2396FB', borderRadius: 1,
                animation: 'otpBlink 1s step-end infinite',
              }} />
            )}
            {/* Separator after middle */}
            {digits === 6 && i === 2 && (
              <span style={{ position: 'absolute', right: -(size === 'sm' ? 5 : 6), top: '50%', transform: 'translateY(-50%)', color: subtext, fontSize: 16, fontWeight: 300 }}>–</span>
            )}
          </div>
        ))}
      </div>

      {/* Error message */}
      {state === 'error' && (
        <span style={{ fontSize: 12, color: '#DC143C' }}>Invalid verification code. Please try again.</span>
      )}

      {/* Complete state */}
      {state === 'complete' && (
        <span style={{ fontSize: 12, color: '#1BA86E', fontWeight: 500 }}>✓ Code verified successfully</span>
      )}

      {/* Timer */}
      {variant === 'timer' && (
        <span style={{ fontSize: 12, color: subtext }}>
          {timer > 0 ? `Resend code in ${timer}s` : <button onClick={() => setTimer(30)} style={{ background: 'none', border: 'none', color: '#2396FB', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Resend code</button>}
        </span>
      )}

      {/* Resend */}
      {variant === 'resend' && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: subtext }}>Didn&apos;t receive the code?</span>
          <button onClick={() => { setValues(Array(digits).fill('')); setTimer(30); }} style={{ background: 'none', border: 'none', color: '#2396FB', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Resend</button>
        </div>
      )}

      {/* Animate button */}
      <button
        onClick={startAnimation}
        disabled={animating}
        style={{
          marginTop: 4, padding: '6px 16px', borderRadius: 6,
          background: animating ? (theme === 'dark' ? '#333' : '#EEE') : '#2396FB',
          color: animating ? subtext : '#fff',
          border: 'none', fontSize: 12, fontWeight: 600, cursor: animating ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        {animating ? 'Typing...' : '▶ Simulate typing'}
      </button>

      {/* Blink animation */}
      <style>{`@keyframes otpBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </div>
  );
}

/* ── OTP Example Section ── */
function OTPExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { size: string; theme: 'light' | 'dark'; variant: string; state: string }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState('md');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState('4-digit');
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
          <option value="sm">SM</option><option value="md">MD</option><option value="lg">LG</option>
        </select>
        <select value={variant} onChange={e => setVariant(e.target.value)} style={selectStyle}>
          <option value="4-digit">4-digit</option><option value="6-digit">6-digit</option>
          <option value="timer">With Timer</option><option value="resend">With Resend</option>
        </select>
        <select value={state} onChange={e => setState(e.target.value)} style={selectStyle}>
          <option value="empty">Empty</option><option value="filling">Filling</option>
          <option value="complete">Complete</option><option value="error">Error</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option><option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', justifyContent: 'center' }}>
        {children({ size, theme, variant, state })}
      </div>
    </div>
  );
}

/* ─── TAB 1 — Examples ─── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="otp-fields" />
      <h2>Overview</h2>
      <p>OTP Fields provide a row of individual digit input boxes for one-time password entry. They support 4 and 6 digit configurations, countdown timers, resend actions, and a simulated typing animation.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>4-digit, 6-digit, With Timer, With Resend</td></tr>
          <tr><td>Sizes</td><td>SM (36px), MD (44px), LG (52px)</td></tr>
          <tr><td>States</td><td>Empty, Filling, Complete, Error</td></tr>
          <tr><td>Features</td><td>Auto-advance, Typing animation, Timer countdown, Resend button</td></tr>
        </tbody>
      </table>

      <h2>Interactive Preview</h2>
      <OTPExampleSection title="OTP Input" desc="Type digits or click 'Simulate typing' to see the auto-fill animation. Switch variants and states with the controls.">
        {({ size, theme, variant, state }) => <OTPPreview variant={variant} state={state} size={size} theme={theme} />}
      </OTPExampleSection>

      <h2>Sizes</h2>
      <ComponentExampleSection title="Size Comparison" desc="OTP boxes come in three sizes for different contexts." sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}>
        {({ size, theme }) => <OTPPreview size={size as string} theme={theme as 'light' | 'dark'} />}
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
      <pre><code>{`import { OTPInput } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface OTPInputProps {
  length?: 4 | 6;
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (code: string) => void;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  timer?: number;
  onResend?: () => void;
  resendText?: string;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// 4-digit OTP
<OTPInput length={4} onComplete={handleVerify} />

// 6-digit OTP
<OTPInput length={6} onComplete={handleVerify} />

// With countdown timer
<OTPInput length={6} timer={30} onResend={handleResend} />

// With resend button
<OTPInput length={6} onResend={handleResend} resendText="Resend code" />

// Error state
<OTPInput length={4} error errorText="Invalid code" />

// Controlled
<OTPInput length={4} value={otp} onChange={setOtp} />`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>otp-box-size-sm</td><td>36px</td></tr>
          <tr><td>otp-box-size-md</td><td>44px</td></tr>
          <tr><td>otp-box-size-lg</td><td>52px</td></tr>
          <tr><td>otp-border-radius</td><td>8px</td></tr>
          <tr><td>otp-border-width</td><td>1.5px</td></tr>
          <tr><td>otp-font-size-sm</td><td>16px</td></tr>
          <tr><td>otp-font-size-md</td><td>18px</td></tr>
          <tr><td>otp-font-size-lg</td><td>22px</td></tr>
          <tr><td>otp-gap</td><td>8px</td></tr>
          <tr><td>otp-focus-ring</td><td>0 0 0 3px rgba(35,150,251,0.15)</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all OTP field variants in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-otpinput--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Input Boxes</td><td>Individual digit input fields in a row</td></tr>
          <tr><td>2</td><td>Separator</td><td>Optional dash between groups (e.g., 3-3 for 6-digit)</td></tr>
          <tr><td>3</td><td>Cursor</td><td>Blinking caret in the focused box</td></tr>
          <tr><td>4</td><td>Error Message</td><td>Validation feedback below the inputs</td></tr>
          <tr><td>5</td><td>Timer</td><td>Countdown before resend is available</td></tr>
          <tr><td>6</td><td>Resend Action</td><td>Button to request a new code</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>For two-factor authentication (2FA) code entry</li>
        <li>For phone number or email verification flows</li>
        <li>For transaction confirmation codes</li>
        <li>When a fixed-length numeric code needs to be entered</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="otp-fields"
        doItems={[
          'Auto-advance focus to the next box after each digit',
          'Support paste to fill all boxes at once',
          'Show a countdown timer before allowing resend',
          'Auto-submit when all digits are entered',
          'Use inputMode="numeric" for mobile number keyboards',
        ]}
        dontItems={[
          'Don\'t use OTP fields for non-numeric input',
          'Don\'t make the boxes too small to tap on mobile',
          'Don\'t allow resend without a cooldown timer',
          'Don\'t clear all fields on a single digit error',
          'Don\'t hide the error state — show it clearly below the boxes',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>group</td><td>Groups the OTP inputs together</td></tr>
          <tr><td>aria-label</td><td>&quot;One-time password&quot;</td><td>Describes the input group purpose</td></tr>
          <tr><td>inputMode</td><td>numeric</td><td>Shows numeric keyboard on mobile</td></tr>
          <tr><td>autocomplete</td><td>one-time-code</td><td>Enables SMS autofill on supported devices</td></tr>
          <tr><td>aria-invalid</td><td>boolean</td><td>Indicates error state</td></tr>
          <tr><td>Keyboard</td><td>Tab, Backspace, Arrow keys</td><td>Navigate between boxes</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Input</strong> — Single-line text input</li>
        <li><strong>Input Area</strong> — Multi-line text input</li>
        <li><strong>Button</strong> — Submit/verify action</li>
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
        <li>Added 6-digit variant with separator</li>
        <li>Added countdown timer with resend action</li>
        <li>Added paste support for auto-filling all boxes</li>
        <li>Added three size presets: SM, MD, LG</li>
        <li>Added focus ring and cursor blink animation</li>
        <li>Added autocomplete=&quot;one-time-code&quot; for SMS autofill</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with 4-digit OTP input</li>
        <li>Auto-advance focus between boxes</li>
        <li>Error and disabled states</li>
      </ul>
    </>
  );
}

/* ─── Page Export ─── */
export default function OTPFieldsPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="OTP Fields"
      description="OTP Fields provide individual digit input boxes for one-time password and verification code entry."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
