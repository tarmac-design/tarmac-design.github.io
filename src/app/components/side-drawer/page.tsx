'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Side Drawer Demo ── */
function SideDrawerDemo({
  variant = 'left',
  theme,
}: {
  variant?: 'left' | 'right' | 'header' | 'footer' | 'persistent';
  theme: 'light' | 'dark';
}) {
  const [open, setOpen] = useState(false);

  const bg = theme === 'dark' ? '#1E1E1E' : '#FAFAFA';
  const drawerBg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const muted = theme === 'dark' ? '#888' : '#999';
  const border = theme === 'dark' ? '#444' : '#E0E0E0';
  const overlay = 'rgba(0,0,0,0.4)';

  const isLeft = variant === 'left' || variant === 'header' || variant === 'footer' || variant === 'persistent';
  const drawerWidth = 180;
  const isPersistent = variant === 'persistent';

  const menuItems = [
    { icon: '🏠', label: 'Home' },
    { icon: '📊', label: 'Dashboard' },
    { icon: '👤', label: 'Profile' },
    { icon: '⚙️', label: 'Settings' },
    { icon: '📁', label: 'Files' },
  ];

  const showDrawer = isPersistent || open;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {/* Phone mockup */}
      <div style={{
        width: 280, height: 420, borderRadius: 20, border: `2px solid ${border}`, background: bg,
        position: 'relative', overflow: 'hidden', boxShadow: theme === 'dark' ? '0 4px 24px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.1)',
      }}>
        {/* Status bar */}
        <div style={{ height: 28, background: theme === 'dark' ? '#111' : '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: 10, color: muted }}>
          <span>9:41</span>
          <span>●●●</span>
        </div>

        {/* App header */}
        <div style={{ height: 44, background: drawerBg, borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 12 }}>
          {!isPersistent && (
            <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: text, padding: 0, lineHeight: 1 }}>
              ☰
            </button>
          )}
          <span style={{ fontWeight: 600, fontSize: 14, color: text }}>My App</span>
        </div>

        {/* Content area */}
        <div style={{ position: 'relative', height: 'calc(100% - 72px)', display: 'flex' }}>
          {/* Persistent drawer inline */}
          {isPersistent && (
            <div style={{ width: drawerWidth, height: '100%', background: drawerBg, borderRight: `1px solid ${border}`, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                {menuItems.map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px', borderRadius: 6, fontSize: 12, color: text, cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = theme === 'dark' ? '#333' : '#F0F0F0')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span>{item.icon}</span><span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main content */}
          <div style={{ flex: 1, padding: 16, overflow: 'auto' }}>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} style={{ height: 12, borderRadius: 4, background: theme === 'dark' ? '#333' : '#E8E8E8', marginBottom: 8, width: `${80 - i * 8}%` }} />
            ))}
            <div style={{ height: 60, borderRadius: 8, background: theme === 'dark' ? '#333' : '#E8E8E8', marginTop: 12 }} />
          </div>

          {/* Overlay drawer (non-persistent) */}
          {!isPersistent && (
            <>
              {/* Overlay backdrop */}
              <div onClick={() => setOpen(false)} style={{
                position: 'absolute', inset: 0, background: overlay,
                opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
                transition: 'opacity 0.25s ease', zIndex: 5,
              }} />

              {/* Drawer panel */}
              <div style={{
                position: 'absolute', top: 0, bottom: 0,
                [isLeft ? 'left' : 'right']: 0,
                width: drawerWidth, background: drawerBg,
                boxShadow: open ? (isLeft ? '4px 0 16px rgba(0,0,0,0.15)' : '-4px 0 16px rgba(0,0,0,0.15)') : 'none',
                transform: open ? 'translateX(0)' : `translateX(${isLeft ? '-100%' : '100%'})`,
                transition: 'transform 0.25s ease', zIndex: 10,
                display: 'flex', flexDirection: 'column',
              }}>
                {/* Drawer header */}
                {(variant === 'header' || variant === 'footer') && (
                  <div style={{ padding: '16px 12px', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 16, background: '#2396FB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: 12, fontWeight: 600 }}>AB</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: text }}>Alex Brown</div>
                      <div style={{ fontSize: 10, color: muted }}>alex@example.com</div>
                    </div>
                  </div>
                )}

                {/* Menu items */}
                <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                  {menuItems.map(item => (
                    <div key={item.label} onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px', borderRadius: 6, fontSize: 12, color: text, cursor: 'pointer' }}
                      onMouseEnter={e => (e.currentTarget.style.background = theme === 'dark' ? '#333' : '#F0F0F0')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span>{item.icon}</span><span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Drawer footer */}
                {variant === 'footer' && (
                  <div style={{ padding: '12px', borderTop: `1px solid ${border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px', borderRadius: 6, fontSize: 12, color: '#DC143C', cursor: 'pointer' }}
                      onMouseEnter={e => (e.currentTarget.style.background = theme === 'dark' ? '#333' : '#F0F0F0')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      onClick={() => setOpen(false)}
                    >
                      <span>🚪</span><span>Sign Out</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {!isPersistent && (
        <button onClick={() => setOpen(!open)} style={{
          padding: '6px 16px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
          background: open ? '#DC143C' : '#2396FB', color: '#FFF', border: 'none',
        }}>
          {open ? 'Close Drawer' : 'Open Drawer'}
        </button>
      )}
      <span style={{ fontSize: 11, color: text, opacity: 0.5 }}>
        {isPersistent ? 'Persistent — always visible' : `Slides from ${isLeft ? 'left' : 'right'}`}
      </span>
    </div>
  );
}

/* ── Preview Section ── */
function DrawerExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { variant: string; theme: 'light' | 'dark' }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [variant, setVariant] = useState('left');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
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
        <select value={variant} onChange={e => setVariant(e.target.value)} style={selectStyle}>
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="header">With Header</option>
          <option value="footer">With Footer</option>
          <option value="persistent">Persistent</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 32, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
        {children({ variant, theme })}
      </div>
    </div>
  );
}

/* ── TAB 1 — Examples ── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="side-drawer" />
      <h2>Overview</h2>
      <p>Side Drawers are slide-in panels that provide navigation or supplementary content. They appear from the left or right edge of the screen with an overlay backdrop.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Left, Right, With Header, With Footer, Persistent</td></tr>
          <tr><td>Behavior</td><td>Overlay (dismissible), Persistent (always visible)</td></tr>
          <tr><td>Features</td><td>Backdrop overlay, Slide animation, Header/Footer sections</td></tr>
          <tr><td>Trigger</td><td>Hamburger menu, Button click</td></tr>
        </tbody>
      </table>

      <h2>Interactive Demo</h2>
      <DrawerExampleSection title="Side Drawer Variants" desc="Click the hamburger icon or button to open the drawer. Select different variants.">
        {({ variant, theme }) => <SideDrawerDemo variant={variant as 'left' | 'right' | 'header' | 'footer' | 'persistent'} theme={theme} />}
      </DrawerExampleSection>

      <h2>All Variants</h2>
      <DrawerExampleSection title="Left Drawer" desc="Standard navigation drawer sliding from the left edge.">
        {({ theme }) => <SideDrawerDemo variant="left" theme={theme} />}
      </DrawerExampleSection>

      <DrawerExampleSection title="Right Drawer" desc="Drawer sliding from the right, often used for details or settings.">
        {({ theme }) => <SideDrawerDemo variant="right" theme={theme} />}
      </DrawerExampleSection>

      <DrawerExampleSection title="With Header" desc="Drawer with a user profile header section.">
        {({ theme }) => <SideDrawerDemo variant="header" theme={theme} />}
      </DrawerExampleSection>

      <DrawerExampleSection title="With Footer" desc="Drawer with header and footer actions like sign out.">
        {({ theme }) => <SideDrawerDemo variant="footer" theme={theme} />}
      </DrawerExampleSection>

      <DrawerExampleSection title="Persistent" desc="Always-visible sidebar that doesn't overlay content.">
        {({ theme }) => <SideDrawerDemo variant="persistent" theme={theme} />}
      </DrawerExampleSection>

      <h2>Comparison</h2>
      <ComponentExampleSection title="Overlay vs Persistent" desc="Compare dismissible overlay drawer with always-visible persistent drawer.">
        {({ theme }) => (
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <SideDrawerDemo variant="left" theme={theme as 'light' | 'dark'} />
            <SideDrawerDemo variant="persistent" theme={theme as 'light' | 'dark'} />
          </div>
        )}
      </ComponentExampleSection>
    </>
  );
}

/* ── TAB 2 — Code ── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>
      <h2>Import</h2>
      <pre><code>{`import { SideDrawer } from '@tarmac/design-system';`}</code></pre>
      <h2>Component API</h2>
      <pre><code>{`interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  persistent?: boolean;
  width?: string | number;
  overlay?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

interface DrawerItemProps {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  destructive?: boolean;
}`}</code></pre>
      <h2>Basic Usage</h2>
      <pre><code>{`// Basic left drawer
<SideDrawer open={isOpen} onClose={() => setIsOpen(false)}>
  <DrawerItem icon={<HomeIcon />} label="Home" onClick={goHome} />
  <DrawerItem icon={<SettingsIcon />} label="Settings" />
</SideDrawer>

// Right drawer
<SideDrawer open={isOpen} onClose={close} position="right">
  <DetailPanel />
</SideDrawer>

// With header and footer
<SideDrawer
  open={isOpen}
  onClose={close}
  header={<UserProfile />}
  footer={<DrawerItem label="Sign Out" destructive />}
>
  <Navigation />
</SideDrawer>

// Persistent sidebar
<SideDrawer open persistent>
  <Navigation />
</SideDrawer>`}</code></pre>
      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>drawer-width</td><td>280px</td></tr>
          <tr><td>drawer-z-index</td><td>1200</td></tr>
          <tr><td>drawer-shadow</td><td>4px 0 16px rgba(0,0,0,0.15)</td></tr>
          <tr><td>drawer-overlay-color</td><td>rgba(0,0,0,0.4)</td></tr>
          <tr><td>drawer-transition</td><td>transform 0.25s ease</td></tr>
          <tr><td>drawer-item-radius</td><td>6px</td></tr>
        </tbody>
      </table>
      <h2>Storybook</h2>
      <p>
        Explore all side drawer variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-side-drawer--playground" target="_blank" rel="noopener noreferrer">TARMAC Storybook →</a>
      </p>
    </>
  );
}

/* ── TAB 3 — Usage ── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Overlay</td><td>Semi-transparent backdrop behind the drawer</td></tr>
          <tr><td>2</td><td>Drawer Panel</td><td>Slide-in container from left or right edge</td></tr>
          <tr><td>3</td><td>Header</td><td>Optional top section for branding or user info</td></tr>
          <tr><td>4</td><td>Navigation Items</td><td>Clickable menu items with icons and labels</td></tr>
          <tr><td>5</td><td>Footer</td><td>Optional bottom section for secondary actions</td></tr>
          <tr><td>6</td><td>Trigger</td><td>Hamburger icon or button that opens the drawer</td></tr>
        </tbody>
      </table>
      <h2>When to Use</h2>
      <ul>
        <li>Primary navigation on mobile or tablet layouts</li>
        <li>Settings or configuration panels</li>
        <li>Detail views that slide in from the side</li>
        <li>Persistent sidebar navigation on desktop</li>
      </ul>
      <h2>Best Practices</h2>
      <DoDont
        slug="side-drawer"
        doItems={[
          'Use overlay drawers on mobile, persistent on desktop',
          'Close the drawer when a navigation item is selected',
          'Include a visible close affordance (X button or backdrop tap)',
          'Keep navigation items to 5–8 for scannability',
          'Use icons alongside labels for quick recognition',
        ]}
        dontItems={[
          'Don\'t nest drawers inside other drawers',
          'Don\'t use drawers for primary content — they\'re for navigation',
          'Don\'t auto-open drawers without user action',
          'Don\'t put complex forms inside drawers',
          'Don\'t block the close action during loading states',
        ]}
      />
      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>navigation / complementary</td><td>Semantic role based on drawer content</td></tr>
          <tr><td>aria-label</td><td>&quot;Navigation drawer&quot;</td><td>Accessible name for the drawer</td></tr>
          <tr><td>aria-hidden</td><td>boolean</td><td>Hidden when closed (overlay variant)</td></tr>
          <tr><td>Focus trap</td><td>Overlay mode</td><td>Trap focus within open overlay drawer</td></tr>
          <tr><td>Escape</td><td>Close</td><td>Dismiss drawer on Escape key</td></tr>
          <tr><td>Focus restore</td><td>Trigger element</td><td>Return focus to trigger on close</td></tr>
        </tbody>
      </table>
      <h2>Related Components</h2>
      <ul>
        <li><strong>Navigation</strong> — Top navigation bar for primary links</li>
        <li><strong>Bottom Sheet</strong> — Mobile-friendly panel from bottom edge</li>
        <li><strong>Dialog Box</strong> — Centered modal for focused interactions</li>
        <li><strong>Tabs</strong> — Alternative navigation for content sections</li>
      </ul>
    </>
  );
}

/* ── TAB 4 — Changelog ── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added <code>persistent</code> mode for always-visible sidebars</li>
        <li>Added <code>header</code> and <code>footer</code> slot props</li>
        <li>Added right-side drawer support</li>
        <li>Added focus trap and focus restore for overlay mode</li>
        <li>Improved slide animation with spring easing</li>
        <li>Added <code>width</code> prop for custom drawer width</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with left-side overlay drawer</li>
        <li>Backdrop overlay with click-to-dismiss</li>
        <li>Basic navigation item component</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function SideDrawerPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Side Drawer" description="Slide-in navigation panels from the left or right edge with overlay backdrop and persistent mode." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
