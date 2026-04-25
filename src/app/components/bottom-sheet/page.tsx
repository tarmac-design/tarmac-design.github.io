'use client';

import { type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="bottom-sheet" />
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
      <pre><code>{`import { BottomSheet } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  variant?: 'standard' | 'expandable' | 'fullscreen' | 'action-sheet';
  snapPoints?: number[];
  initialSnap?: number;
  showOverlay?: boolean;
  showDragHandle?: boolean;
  dismissible?: boolean;
  children: ReactNode;
}

interface ActionSheetProps extends BottomSheetProps {
  actions: Array<{
    label: string;
    icon?: ReactNode;
    destructive?: boolean;
    onPress: () => void;
  }>;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Standard bottom sheet
<BottomSheet open={isOpen} onClose={() => setOpen(false)}>
  <Text>Sheet content here</Text>
</BottomSheet>

// Expandable with snap points
<BottomSheet
  open={isOpen}
  variant="expandable"
  snapPoints={[0.25, 0.5, 0.92]}
  initialSnap={1}
  onClose={() => setOpen(false)}
>
  <ScrollView>...</ScrollView>
</BottomSheet>

// Full screen sheet
<BottomSheet open={isOpen} variant="fullscreen" onClose={() => setOpen(false)}>
  <FullContent />
</BottomSheet>

// Action sheet
<BottomSheet
  open={isOpen}
  variant="action-sheet"
  actions={[
    { label: 'Take Photo', icon: <CameraIcon />, onPress: handlePhoto },
    { label: 'Choose from Library', icon: <GalleryIcon />, onPress: handleGallery },
    { label: 'Cancel', destructive: true, onPress: () => setOpen(false) },
  ]}
  onClose={() => setOpen(false)}
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>bottom-sheet-border-radius</td><td>16px</td></tr>
          <tr><td>bottom-sheet-handle-width</td><td>36px</td></tr>
          <tr><td>bottom-sheet-handle-height</td><td>4px</td></tr>
          <tr><td>bottom-sheet-overlay-opacity</td><td>0.3 (light) / 0.6 (dark)</td></tr>
          <tr><td>bottom-sheet-snap-peek</td><td>25%</td></tr>
          <tr><td>bottom-sheet-snap-half</td><td>50%</td></tr>
          <tr><td>bottom-sheet-snap-full</td><td>92%</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all bottom sheet variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-bottomsheet--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Overlay</td><td>Semi-transparent backdrop behind the sheet</td></tr>
          <tr><td>2</td><td>Container</td><td>Rounded surface panel sliding from bottom</td></tr>
          <tr><td>3</td><td>Drag Handle</td><td>Visual indicator for drag-to-dismiss gesture</td></tr>
          <tr><td>4</td><td>Content Area</td><td>Scrollable region for sheet content</td></tr>
          <tr><td>5</td><td>Action Items</td><td>List of tappable actions (action sheet variant)</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To present contextual actions without leaving the current screen</li>
        <li>For mobile-first forms and input flows</li>
        <li>To show supplementary content like filters or details</li>
        <li>For share menus and file picker actions</li>
        <li>When a full modal would be too disruptive</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="bottom-sheet"
        doItems={[
          'Always include a drag handle for gesture affordance',
          'Use overlay to indicate the sheet is above the main content',
          'Allow dismissal by tapping the overlay or swiping down',
          'Use snap points for expandable sheets to guide user interaction',
          'Keep action sheet items to 5 or fewer for scannability',
        ]}
        dontItems={[
          'Don\'t nest bottom sheets inside other bottom sheets',
          'Don\'t use bottom sheets on desktop — prefer side drawers or modals',
          'Don\'t put critical actions only in the sheet with no alternative',
          'Don\'t disable the dismiss gesture without a clear close button',
          'Don\'t use full-screen sheets for simple confirmations',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>dialog</td><td>Identifies the sheet as a dialog surface</td></tr>
          <tr><td>aria-modal</td><td>true</td><td>Indicates content behind is inert</td></tr>
          <tr><td>aria-label</td><td>string</td><td>Descriptive label for the sheet purpose</td></tr>
          <tr><td>Focus trap</td><td>—</td><td>Focus stays within the sheet while open</td></tr>
          <tr><td>Escape key</td><td>—</td><td>Closes the sheet on Escape press</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Dialog Box</strong> — Centered modal for confirmations and alerts</li>
        <li><strong>Side Drawer</strong> — Slide-in panel from left/right edge</li>
        <li><strong>Popups</strong> — Lightweight overlays for tooltips and menus</li>
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
        <li>Added <code>expandable</code> variant with configurable snap points</li>
        <li>Added <code>action-sheet</code> variant for contextual action lists</li>
        <li>Added <code>fullscreen</code> variant</li>
        <li>Improved gesture handling with spring physics animation</li>
        <li>Added focus trap and keyboard dismiss support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with standard bottom sheet</li>
        <li>Drag handle and overlay support</li>
        <li>Swipe-to-dismiss gesture</li>
        <li>Light and dark theme support</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function BottomSheetPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Bottom Sheet"
      description="Bottom sheets are surface panels that slide up from the bottom edge, used for contextual actions, forms, and supplementary content."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
