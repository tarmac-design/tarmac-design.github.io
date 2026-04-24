'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Popup Arrow ── */
function PopupArrow({ position, color }: { position: string; color: string }) {
  const size = 6;
  const style: React.CSSProperties = { position: 'absolute', width: 0, height: 0 };
  if (position === 'top') {
    Object.assign(style, { bottom: -size, left: '50%', transform: 'translateX(-50%)', borderLeft: `${size}px solid transparent`, borderRight: `${size}px solid transparent`, borderTop: `${size}px solid ${color}` });
  } else if (position === 'bottom') {
    Object.assign(style, { top: -size, left: '50%', transform: 'translateX(-50%)', borderLeft: `${size}px solid transparent`, borderRight: `${size}px solid transparent`, borderBottom: `${size}px solid ${color}` });
  } else if (position === 'left') {
    Object.assign(style, { right: -size, top: '50%', transform: 'translateY(-50%)', borderTop: `${size}px solid transparent`, borderBottom: `${size}px solid transparent`, borderLeft: `${size}px solid ${color}` });
  } else {
    Object.assign(style, { left: -size, top: '50%', transform: 'translateY(-50%)', borderTop: `${size}px solid transparent`, borderBottom: `${size}px solid transparent`, borderRight: `${size}px solid ${color}` });
  }
  return <div style={style} />;
}

/* ── Popup Demo ── */
function PopupDemo({
  variant = 'tooltip',
  position = 'top',
  theme,
}: {
  variant?: 'tooltip' | 'popover' | 'menu' | 'confirmation';
  position?: 'top' | 'bottom' | 'left' | 'right';
  theme: 'light' | 'dark';
}) {
  const [open, setOpen] = useState(false);
  const [menuClicked, setMenuClicked] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const border = theme === 'dark' ? '#444' : '#DDD';
  const shadow = theme === 'dark' ? '0 4px 16px rgba(0,0,0,0.5)' : '0 4px 16px rgba(0,0,0,0.12)';

  const popupStyle: React.CSSProperties = {
    position: 'absolute', background: bg, color: text, border: `1px solid ${border}`,
    borderRadius: 8, boxShadow: shadow, padding: variant === 'menu' ? 4 : 12,
    fontSize: 13, zIndex: 10, whiteSpace: variant === 'tooltip' ? 'nowrap' : 'normal',
    minWidth: variant === 'tooltip' ? undefined : 180,
    transition: 'opacity 0.15s ease, transform 0.15s ease',
    opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
  };

  if (position === 'top') Object.assign(popupStyle, { bottom: '100%', left: '50%', transform: `translateX(-50%) translateY(${open ? '-8px' : '0px'})`, marginBottom: 4 });
  else if (position === 'bottom') Object.assign(popupStyle, { top: '100%', left: '50%', transform: `translateX(-50%) translateY(${open ? '8px' : '0px'})`, marginTop: 4 });
  else if (position === 'left') Object.assign(popupStyle, { right: '100%', top: '50%', transform: `translateY(-50%) translateX(${open ? '-8px' : '0px'})`, marginRight: 4 });
  else Object.assign(popupStyle, { left: '100%', top: '50%', transform: `translateY(-50%) translateX(${open ? '8px' : '0px'})`, marginLeft: 4 });

  const menuItems = ['Edit', 'Duplicate', 'Archive', 'Delete'];

  const renderContent = () => {
    switch (variant) {
      case 'tooltip': return <span>Helpful tooltip text</span>;
      case 'popover': return (
        <div style={{ maxWidth: 200 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Popover Title</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>This is additional context shown in a popover panel.</div>
        </div>
      );
      case 'menu': return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {menuItems.map(item => (
            <button key={item} onClick={() => { setMenuClicked(item); setOpen(false); }}
              style={{ padding: '8px 12px', background: 'none', border: 'none', color: item === 'Delete' ? '#DC143C' : text, fontSize: 13, textAlign: 'left', cursor: 'pointer', borderRadius: 4 }}
              onMouseEnter={e => (e.currentTarget.style.background = theme === 'dark' ? '#333' : '#F0F0F0')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >{item}</button>
          ))}
        </div>
      );
      case 'confirmation': return (
        <div style={{ maxWidth: 220 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Are you sure?</div>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 12 }}>This action cannot be undone.</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={() => setOpen(false)} style={{ padding: '4px 12px', borderRadius: 6, border: `1px solid ${border}`, background: 'none', color: text, fontSize: 12, cursor: 'pointer' }}>Cancel</button>
            <button onClick={() => setOpen(false)} style={{ padding: '4px 12px', borderRadius: 6, border: 'none', background: '#DC143C', color: '#FFF', fontSize: 12, cursor: 'pointer' }}>Confirm</button>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
        <button
          onClick={() => setOpen(!open)}
          onMouseEnter={() => variant === 'tooltip' && setOpen(true)}
          onMouseLeave={() => variant === 'tooltip' && setOpen(false)}
          style={{
            padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: theme === 'dark' ? '#333' : '#E8E8E8', color: text, border: `1px solid ${border}`,
          }}
        >
          {variant === 'tooltip' ? 'Hover me' : variant === 'menu' ? 'Actions ▾' : variant === 'confirmation' ? 'Delete Item' : 'Show Info'}
        </button>
        <div style={popupStyle}>
          <PopupArrow position={position === 'top' ? 'top' : position === 'bottom' ? 'bottom' : position === 'left' ? 'left' : 'right'} color={bg} />
          {renderContent()}
        </div>
      </div>
      {menuClicked && <span style={{ fontSize: 11, color: text, opacity: 0.6 }}>Clicked: {menuClicked}</span>}
    </div>
  );
}

/* ── Preview Section ── */
function PopupExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { variant: string; position: string; theme: 'light' | 'dark' }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [variant, setVariant] = useState('tooltip');
  const [position, setPosition] = useState('top');
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
          <option value="tooltip">Tooltip</option>
          <option value="popover">Popover</option>
          <option value="menu">Menu</option>
          <option value="confirmation">Confirmation</option>
        </select>
        <select value={position} onChange={e => setPosition(e.target.value)} style={selectStyle}>
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
        {children({ variant, position, theme })}
      </div>
    </div>
  );
}

/* ── TAB 1 — Examples ── */
function ExamplesTab() {
  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-popup--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-popup--playground"
        height={420}
        title="Popups — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>Popups are overlay elements that appear near a trigger element. They include tooltips, popovers, context menus, and confirmation dialogs — all positioned with an arrow pointing to the trigger.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Tooltip, Popover, Menu, Confirmation</td></tr>
          <tr><td>Positions</td><td>Top, Bottom, Left, Right</td></tr>
          <tr><td>Trigger</td><td>Hover (tooltip), Click (others)</td></tr>
          <tr><td>Features</td><td>Arrow, Auto-dismiss, Action items</td></tr>
        </tbody>
      </table>

      <h2>Interactive Demo</h2>
      <PopupExampleSection title="Popup Variants" desc="Select a variant and position, then interact with the trigger button.">
        {({ variant, position, theme }) => (
          <PopupDemo variant={variant as 'tooltip' | 'popover' | 'menu' | 'confirmation'} position={position as 'top' | 'bottom' | 'left' | 'right'} theme={theme} />
        )}
      </PopupExampleSection>

      <h2>All Variants</h2>
      <PopupExampleSection title="Tooltip" desc="Lightweight text hint shown on hover.">
        {({ position, theme }) => <PopupDemo variant="tooltip" position={position as 'top' | 'bottom' | 'left' | 'right'} theme={theme} />}
      </PopupExampleSection>

      <PopupExampleSection title="Popover" desc="Rich content panel with title and description.">
        {({ position, theme }) => <PopupDemo variant="popover" position={position as 'top' | 'bottom' | 'left' | 'right'} theme={theme} />}
      </PopupExampleSection>

      <PopupExampleSection title="Menu" desc="Action list with clickable items.">
        {({ position, theme }) => <PopupDemo variant="menu" position={position as 'top' | 'bottom' | 'left' | 'right'} theme={theme} />}
      </PopupExampleSection>

      <PopupExampleSection title="Confirmation" desc="Destructive action confirmation with Cancel/Confirm buttons.">
        {({ position, theme }) => <PopupDemo variant="confirmation" position={position as 'top' | 'bottom' | 'left' | 'right'} theme={theme} />}
      </PopupExampleSection>

      <h2>Positions</h2>
      <ComponentExampleSection title="Position Comparison" desc="Popups can appear on any side of the trigger element.">
        {({ theme }) => (
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {(['top', 'bottom', 'left', 'right'] as const).map(pos => (
              <PopupDemo key={pos} variant="tooltip" position={pos} theme={theme as 'light' | 'dark'} />
            ))}
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
      <pre><code>{`import { Popup, Tooltip, Popover, Menu, ConfirmPopup } from '@tarmac/design-system';`}</code></pre>
      <h2>Component API</h2>
      <pre><code>{`interface PopupProps {
  variant?: 'tooltip' | 'popover' | 'menu' | 'confirmation';
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  arrow?: boolean;
  offset?: number;
  children: ReactNode;
}

interface MenuProps extends PopupProps {
  items: { label: string; onClick: () => void; destructive?: boolean }[];
}

interface ConfirmPopupProps extends PopupProps {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}`}</code></pre>
      <h2>Basic Usage</h2>
      <pre><code>{`// Tooltip
<Tooltip content="Helpful hint" position="top">
  <Button>Hover me</Button>
</Tooltip>

// Popover
<Popover title="Details" position="bottom">
  <p>Additional context here.</p>
</Popover>

// Menu
<Menu items={[
  { label: 'Edit', onClick: handleEdit },
  { label: 'Delete', onClick: handleDelete, destructive: true },
]} />

// Confirmation
<ConfirmPopup
  title="Delete item?"
  description="This cannot be undone."
  onConfirm={handleDelete}
  onCancel={handleCancel}
/>`}</code></pre>
      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>popup-border-radius</td><td>8px</td></tr>
          <tr><td>popup-shadow</td><td>0 4px 16px rgba(0,0,0,0.12)</td></tr>
          <tr><td>popup-arrow-size</td><td>6px</td></tr>
          <tr><td>popup-offset</td><td>8px</td></tr>
          <tr><td>popup-z-index</td><td>1000</td></tr>
          <tr><td>popup-min-width</td><td>180px</td></tr>
        </tbody>
      </table>
      <h2>Storybook</h2>
      <p>
        Explore all popup variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-popup--playground" target="_blank" rel="noopener noreferrer">TARMAC Storybook →</a>
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
          <tr><td>1</td><td>Trigger</td><td>The element that activates the popup (button, icon, text)</td></tr>
          <tr><td>2</td><td>Overlay</td><td>The floating container with content</td></tr>
          <tr><td>3</td><td>Arrow</td><td>Directional indicator pointing to the trigger</td></tr>
          <tr><td>4</td><td>Content</td><td>Text, actions, or rich content inside the overlay</td></tr>
          <tr><td>5</td><td>Backdrop</td><td>Optional click-away area to dismiss (popovers, menus)</td></tr>
        </tbody>
      </table>
      <h2>When to Use</h2>
      <ul>
        <li>Tooltips for icon-only buttons or truncated text</li>
        <li>Popovers for supplementary details without leaving context</li>
        <li>Menus for contextual actions on list items or cards</li>
        <li>Confirmation popups for destructive actions</li>
      </ul>
      <h2>Best Practices</h2>
      <DoDont
        slug="popups"
        doItems={[
          'Use tooltips for short, non-essential helper text',
          'Position popups to avoid viewport overflow',
          'Dismiss menus when an action is selected',
          'Use confirmation popups for irreversible actions',
          'Keep popup content concise and scannable',
        ]}
        dontItems={[
          'Don\'t nest popups inside other popups',
          'Don\'t use tooltips for essential information',
          'Don\'t put complex forms inside popovers',
          'Don\'t use menus with more than 7–8 items',
          'Don\'t block the trigger element with the popup',
        ]}
      />
      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>tooltip / dialog / menu</td><td>Semantic role based on variant</td></tr>
          <tr><td>aria-haspopup</td><td>true</td><td>Indicates trigger opens a popup</td></tr>
          <tr><td>aria-expanded</td><td>boolean</td><td>Reflects open/closed state</td></tr>
          <tr><td>Escape</td><td>Dismiss</td><td>Close popup on Escape key</td></tr>
          <tr><td>Focus trap</td><td>Confirmation</td><td>Trap focus within confirmation dialogs</td></tr>
        </tbody>
      </table>
      <h2>Related Components</h2>
      <ul>
        <li><strong>Dialog Box</strong> — Full modal overlay for complex interactions</li>
        <li><strong>Dropdown</strong> — Form select with popup option list</li>
        <li><strong>Bottom Sheet</strong> — Mobile-friendly popup from bottom edge</li>
        <li><strong>Snackbar</strong> — Temporary notification without trigger</li>
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
        <li>Added <code>confirmation</code> variant with action buttons</li>
        <li>Added <code>arrow</code> prop with automatic positioning</li>
        <li>Added <code>offset</code> prop for custom spacing</li>
        <li>Improved viewport boundary detection and flip behavior</li>
        <li>Added focus trap for confirmation variant</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with Tooltip, Popover, and Menu variants</li>
        <li>4 position options: top, bottom, left, right</li>
        <li>Click and hover trigger modes</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function PopupsPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];
  return (
    <PageShell title="Popups" description="Overlay elements that appear near a trigger — tooltips, popovers, menus, and confirmation dialogs." tabs={tabs}>
      <ExamplesTab />
    </PageShell>
  );
}
