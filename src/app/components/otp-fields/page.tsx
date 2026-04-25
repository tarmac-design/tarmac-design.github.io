'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="otp-fields" />
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
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

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
