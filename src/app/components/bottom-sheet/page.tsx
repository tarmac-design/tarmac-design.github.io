'use client';

import { useState, useEffect } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Types ── */
type SheetVariant = 'standard' | 'expandable' | 'fullscreen' | 'action-sheet';
type SnapPoint = 'peek' | 'half' | 'full';

const selectStyle: React.CSSProperties = {
  padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
  background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
};

/* ── Bottom Sheet Demo ── */
function BottomSheetDemo({
  theme,
  variant = 'standard',
  snapPoint = 'half',
}: {
  theme: 'light' | 'dark';
  variant?: SheetVariant;
  snapPoint?: SnapPoint;
}) {
  const [open, setOpen] = useState(true);
  const [snap, setSnap] = useState<SnapPoint>(snapPoint);

  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const fg = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const muted = theme === 'dark' ? '#666' : '#999';
  const overlay = theme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)';
  const phoneBg = theme === 'dark' ? '#111' : '#F0F0F0';
  const handleColor = theme === 'dark' ? '#555' : '#CCC';

  const snapHeights: Record<SnapPoint, string> = { peek: '25%', half: '50%', full: '92%' };
  const sheetHeight = variant === 'fullscreen' ? '92%' : snapHeights[snap];

  const actionItems = [
    { icon: '📷', label: 'Take Photo' },
    { icon: '🖼️', label: 'Choose from Library' },
    { icon: '📁', label: 'Browse Files' },
  ];

  return (
    <div style={{ width: 220, height: 400, borderRadius: 20, overflow: 'hidden', position: 'relative', background: phoneBg, border: `2px solid ${theme === 'dark' ? '#333' : '#DDD'}`, cursor: 'pointer' }}
      onClick={() => setOpen(!open)}
    >
      {/* Phone content */}
      <div style={{ padding: 16, paddingTop: 32 }}>
        <div style={{ width: 60, height: 6, borderRadius: 3, background: handleColor, margin: '0 auto 16px' }} />
        <div style={{ fontSize: 11, color: muted, textAlign: 'center', marginBottom: 12 }}>Tap to {open ? 'close' : 'open'}</div>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ height: 10, borderRadius: 4, background: theme === 'dark' ? '#333' : '#DDD', marginBottom: 8, width: `${90 - i * 15}%` }} />
        ))}
      </div>

      {/* Overlay */}
      {open && (
        <div style={{ position: 'absolute', inset: 0, background: overlay, transition: 'opacity 0.3s ease' }} />
      )}

      {/* Sheet */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: open ? sheetHeight : 0,
        background: bg,
        borderTopLeftRadius: 16, borderTopRightRadius: 16,
        transition: 'height 0.35s cubic-bezier(0.32,0.72,0,1)',
        overflow: 'hidden',
        boxShadow: open ? '0 -4px 20px rgba(0,0,0,0.15)' : 'none',
      }}>
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: handleColor }} />
        </div>

        <div style={{ padding: '4px 16px 16px' }}>
          {variant === 'action-sheet' ? (
            <>
              <div style={{ fontSize: 13, fontWeight: 600, color: fg, marginBottom: 12 }}>Choose an action</div>
              {actionItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < actionItems.length - 1 ? `1px solid ${theme === 'dark' ? '#333' : '#EEE'}` : 'none' }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span style={{ fontSize: 12, color: fg }}>{item.label}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: '#DC143C', fontWeight: 500, cursor: 'pointer' }}>Cancel</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 13, fontWeight: 600, color: fg, marginBottom: 4 }}>
                {variant === 'fullscreen' ? 'Full Screen Sheet' : variant === 'expandable' ? 'Expandable Sheet' : 'Bottom Sheet'}
              </div>
              <div style={{ fontSize: 11, color: muted, marginBottom: 12 }}>
                {variant === 'expandable' ? 'Drag to expand or collapse' : 'Sheet content goes here'}
              </div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ height: 8, borderRadius: 4, background: theme === 'dark' ? '#3A3A3A' : '#EEE', marginBottom: 6, width: `${100 - i * 10}%` }} />
              ))}
              {variant === 'expandable' && (
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                  {(['peek', 'half', 'full'] as SnapPoint[]).map(s => (
                    <button key={s} onClick={e => { e.stopPropagation(); setSnap(s); }} style={{
                      padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 500,
                      background: snap === s ? (theme === 'dark' ? '#60A5FA' : '#2396FB') : 'transparent',
                      color: snap === s ? '#FFF' : muted,
                      border: `1px solid ${snap === s ? 'transparent' : (theme === 'dark' ? '#444' : '#CCC')}`,
                      cursor: 'pointer',
                    }}>{s}</button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Custom Example Section ── */
function BottomSheetExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { theme: 'light' | 'dark'; variant: SheetVariant }) => React.ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState<SheetVariant>('standard');
  useEffect(() => { setTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);
  const bg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>{title}</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>{desc}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <select value={variant} onChange={e => setVariant(e.target.value as SheetVariant)} style={selectStyle}>
          <option value="standard">Standard</option>
          <option value="expandable">Expandable</option>
          <option value="fullscreen">Full Screen</option>
          <option value="action-sheet">Action Sheet</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children({ theme, variant })}
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
      <StorybookVariantViewer slug="bottom-sheet" />
      <h2>Overview</h2>
      <p>
        Bottom Sheets are surface panels that slide up from the bottom of the screen.
        They are commonly used on mobile for contextual actions, forms, and supplementary content
        without navigating away from the current view.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Standard, Expandable, Full Screen, Action Sheet</td></tr>
          <tr><td>Snap Points</td><td>Peek (25%), Half (50%), Full (92%)</td></tr>
          <tr><td>States</td><td>Open, Closed, Dragging</td></tr>
          <tr><td>Features</td><td>Drag handle, Overlay, Snap points, Dismiss</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <BottomSheetExampleSection
        title="Bottom Sheet Variants"
        desc="Switch between Standard, Expandable, Full Screen, and Action Sheet variants. Click the phone mockup to toggle open/closed."
      >
        {({ theme, variant }) => (
          <BottomSheetDemo theme={theme} variant={variant} />
        )}
      </BottomSheetExampleSection>

      <h2>Snap Points</h2>

      <BottomSheetExampleSection
        title="Expandable Snap Points"
        desc="The expandable variant supports three snap points: Peek, Half, and Full. Use the buttons inside the sheet to switch."
      >
        {({ theme }) => (
          <>
            <BottomSheetDemo theme={theme} variant="expandable" snapPoint="peek" />
            <BottomSheetDemo theme={theme} variant="expandable" snapPoint="half" />
            <BottomSheetDemo theme={theme} variant="expandable" snapPoint="full" />
          </>
        )}
      </BottomSheetExampleSection>

      <h2>Action Sheet</h2>

      <BottomSheetExampleSection
        title="Action Sheet"
        desc="Action sheets present a list of contextual actions. Commonly used for share menus, file pickers, and destructive confirmations."
      >
        {({ theme }) => (
          <BottomSheetDemo theme={theme} variant="action-sheet" />
        )}
      </BottomSheetExampleSection>
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
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
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
