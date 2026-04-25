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
      <StorybookVariantViewer slug="tooltip" />
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
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

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
