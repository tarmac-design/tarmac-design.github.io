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
      <StorybookVariantViewer slug="coachmarks" />
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
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

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
