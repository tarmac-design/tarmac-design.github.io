'use client';

import { useState, useEffect } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Types ── */
type DialogVariant = 'confirmation' | 'alert' | 'form' | 'fullscreen';
type DialogSize = 'sm' | 'md' | 'lg';

const dialogSizeMap: Record<DialogSize, number> = { sm: 280, md: 340, lg: 400 };

const selectStyle: React.CSSProperties = {
  padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
  background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
};

/* ── Dialog Demo ── */
function DialogDemo({
  theme,
  variant = 'confirmation',
  size = 'md',
}: {
  theme: 'light' | 'dark';
  variant?: DialogVariant;
  size?: DialogSize;
}) {
  const [open, setOpen] = useState(false);

  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const fg = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const muted = theme === 'dark' ? '#888' : '#777';
  const accent = theme === 'dark' ? '#60A5FA' : '#2396FB';
  const danger = '#DC143C';
  const overlay = theme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.4)';
  const borderColor = theme === 'dark' ? '#333' : '#E0E0E0';
  const phoneBg = theme === 'dark' ? '#111' : '#F0F0F0';
  const inputBg = theme === 'dark' ? '#3A3A3A' : '#F5F5F5';

  const w = variant === 'fullscreen' ? 220 : dialogSizeMap[size] * 0.65;

  const titles: Record<DialogVariant, string> = {
    confirmation: 'Delete Item?',
    alert: 'Session Expired',
    form: 'Create New Item',
    fullscreen: 'Edit Details',
  };

  const descriptions: Record<DialogVariant, string> = {
    confirmation: 'This action cannot be undone. Are you sure you want to delete this item?',
    alert: 'Your session has expired. Please log in again to continue.',
    form: 'Fill in the details below to create a new item.',
    fullscreen: 'Edit all the details for this item in full screen mode.',
  };

  return (
    <div style={{ width: 220, height: 380, borderRadius: 20, overflow: 'hidden', position: 'relative', background: phoneBg, border: `2px solid ${theme === 'dark' ? '#333' : '#DDD'}` }}>
      {/* Phone content */}
      <div style={{ padding: 16, paddingTop: 32 }}>
        <div style={{ width: 60, height: 6, borderRadius: 3, background: theme === 'dark' ? '#555' : '#CCC', margin: '0 auto 16px' }} />
        {[1, 2, 3].map(i => (
          <div key={i} style={{ height: 10, borderRadius: 4, background: theme === 'dark' ? '#333' : '#DDD', marginBottom: 8, width: `${90 - i * 15}%` }} />
        ))}
        <button onClick={() => setOpen(true)} style={{
          marginTop: 12, padding: '6px 16px', borderRadius: 8, fontSize: 11, fontWeight: 500,
          background: accent, color: '#FFF', border: 'none', cursor: 'pointer',
        }}>Open Dialog</button>
      </div>

      {/* Overlay */}
      {open && (
        <div onClick={() => variant !== 'fullscreen' && setOpen(false)} style={{ position: 'absolute', inset: 0, background: overlay, zIndex: 5, transition: 'opacity 0.2s ease' }} />
      )}

      {/* Dialog */}
      {open && (
        <div style={{
          position: 'absolute',
          zIndex: 10,
          ...(variant === 'fullscreen' ? {
            inset: 0,
            borderRadius: 0,
          } : {
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: w,
            borderRadius: 14,
          }),
          background: bg,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: variant === 'fullscreen' ? '12px 16px' : '16px 16px 8px', borderBottom: variant === 'fullscreen' ? `1px solid ${borderColor}` : 'none' }}>
            {variant === 'fullscreen' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: accent }}>Cancel</button>
                <span style={{ fontSize: 13, fontWeight: 600, color: fg }}>{titles[variant]}</span>
                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: accent, fontWeight: 600 }}>Save</button>
              </div>
            )}
            {variant !== 'fullscreen' && (
              <>
                {variant === 'alert' && (
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${danger}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill={danger}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                  </div>
                )}
                <div style={{ fontSize: 14, fontWeight: 600, color: fg }}>{titles[variant]}</div>
              </>
            )}
          </div>

          {/* Content */}
          {variant !== 'fullscreen' && (
            <div style={{ padding: '4px 16px 12px' }}>
              <p style={{ fontSize: 11, color: muted, lineHeight: 1.5, margin: 0 }}>{descriptions[variant]}</p>

              {variant === 'form' && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ marginBottom: 8 }}>
                    <label style={{ fontSize: 10, fontWeight: 500, color: fg, display: 'block', marginBottom: 3 }}>Name</label>
                    <input type="text" placeholder="Enter name" style={{
                      width: '100%', padding: '6px 8px', borderRadius: 6, fontSize: 11,
                      border: `1px solid ${borderColor}`, background: inputBg, color: fg,
                      outline: 'none', boxSizing: 'border-box',
                    }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 500, color: fg, display: 'block', marginBottom: 3 }}>Description</label>
                    <input type="text" placeholder="Enter description" style={{
                      width: '100%', padding: '6px 8px', borderRadius: 6, fontSize: 11,
                      border: `1px solid ${borderColor}`, background: inputBg, color: fg,
                      outline: 'none', boxSizing: 'border-box',
                    }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {variant === 'fullscreen' && (
            <div style={{ padding: 16 }}>
              {['Name', 'Email', 'Phone', 'Address'].map(field => (
                <div key={field} style={{ marginBottom: 10 }}>
                  <label style={{ fontSize: 10, fontWeight: 500, color: fg, display: 'block', marginBottom: 3 }}>{field}</label>
                  <input type="text" placeholder={`Enter ${field.toLowerCase()}`} style={{
                    width: '100%', padding: '6px 8px', borderRadius: 6, fontSize: 11,
                    border: `1px solid ${borderColor}`, background: inputBg, color: fg,
                    outline: 'none', boxSizing: 'border-box',
                  }} />
                </div>
              ))}
            </div>
          )}

          {/* Footer actions */}
          {variant !== 'fullscreen' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, padding: '8px 16px 14px' }}>
              <button onClick={() => setOpen(false)} style={{
                padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 500,
                background: 'transparent', color: muted, border: `1px solid ${borderColor}`, cursor: 'pointer',
              }}>Cancel</button>
              <button onClick={() => setOpen(false)} style={{
                padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 500,
                background: variant === 'confirmation' ? danger : accent,
                color: '#FFF', border: 'none', cursor: 'pointer',
              }}>{variant === 'confirmation' ? 'Delete' : variant === 'alert' ? 'Log In' : 'Create'}</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Custom Example Section ── */
function DialogExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { theme: 'light' | 'dark'; variant: DialogVariant; size: DialogSize }) => React.ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState<DialogVariant>('confirmation');
  const [size, setSize] = useState<DialogSize>('md');
  useEffect(() => { setTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);
  const bg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>{title}</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>{desc}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <select value={size} onChange={e => setSize(e.target.value as DialogSize)} style={selectStyle}>
          <option value="sm">SM (400px)</option>
          <option value="md">MD (560px)</option>
          <option value="lg">LG (720px)</option>
        </select>
        <select value={variant} onChange={e => setVariant(e.target.value as DialogVariant)} style={selectStyle}>
          <option value="confirmation">Confirmation</option>
          <option value="alert">Alert</option>
          <option value="form">Form</option>
          <option value="fullscreen">Full Screen</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children({ theme, variant, size })}
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
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-dialog-box--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-dialog-box--playground"
        height={420}
        title="Dialog Box — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        Dialog boxes are modal overlays that require user attention and action.
        They appear centered on screen with a backdrop overlay and are used for
        confirmations, alerts, forms, and full-screen editing flows.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Confirmation, Alert, Form, Full Screen</td></tr>
          <tr><td>Sizes</td><td>Small (400px), Medium (560px), Large (720px)</td></tr>
          <tr><td>Features</td><td>Overlay, Title, Content, Action buttons, Close</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <DialogExampleSection
        title="Dialog Variants"
        desc="Switch between Confirmation, Alert, Form, and Full Screen variants. Click 'Open Dialog' in the phone mockup to see the dialog."
      >
        {({ theme, variant, size }) => (
          <DialogDemo theme={theme} variant={variant} size={size} />
        )}
      </DialogExampleSection>

      <h2>Confirmation vs Alert</h2>

      <DialogExampleSection
        title="Confirmation & Alert"
        desc="Confirmation dialogs ask for user decision. Alert dialogs inform about important state changes."
      >
        {({ theme, size }) => (
          <>
            <DialogDemo theme={theme} variant="confirmation" size={size} />
            <DialogDemo theme={theme} variant="alert" size={size} />
          </>
        )}
      </DialogExampleSection>

      <h2>Form Dialog</h2>

      <DialogExampleSection
        title="Form & Full Screen"
        desc="Form dialogs contain input fields. Full screen dialogs take over the entire viewport for complex editing."
      >
        {({ theme, size }) => (
          <>
            <DialogDemo theme={theme} variant="form" size={size} />
            <DialogDemo theme={theme} variant="fullscreen" size={size} />
          </>
        )}
      </DialogExampleSection>
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
      <pre><code>{`import { Dialog } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface DialogProps {
  open: boolean;
  onClose: () => void;
  variant?: 'confirmation' | 'alert' | 'form' | 'fullscreen';
  size?: 'sm' | 'md' | 'lg';
  title: string;
  description?: string;
  icon?: ReactNode;
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  primaryAction?: { label: string; onClick: () => void; destructive?: boolean };
  secondaryAction?: { label: string; onClick: () => void };
  children?: ReactNode;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Confirmation dialog
<Dialog
  open={showConfirm}
  variant="confirmation"
  title="Delete Item?"
  description="This action cannot be undone."
  primaryAction={{ label: 'Delete', onClick: handleDelete, destructive: true }}
  secondaryAction={{ label: 'Cancel', onClick: () => setShowConfirm(false) }}
  onClose={() => setShowConfirm(false)}
/>

// Alert dialog
<Dialog
  open={showAlert}
  variant="alert"
  title="Session Expired"
  description="Please log in again."
  icon={<WarningIcon />}
  primaryAction={{ label: 'Log In', onClick: handleLogin }}
  onClose={() => setShowAlert(false)}
/>

// Form dialog
<Dialog open={showForm} variant="form" title="Create Item" size="md" onClose={() => setShowForm(false)}>
  <Input label="Name" />
  <Input label="Description" />
</Dialog>

// Full screen dialog
<Dialog open={showFull} variant="fullscreen" title="Edit Details" onClose={() => setShowFull(false)}>
  <FormContent />
</Dialog>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>dialog-width-sm</td><td>400px</td></tr>
          <tr><td>dialog-width-md</td><td>560px</td></tr>
          <tr><td>dialog-width-lg</td><td>720px</td></tr>
          <tr><td>dialog-border-radius</td><td>14px</td></tr>
          <tr><td>dialog-overlay-light</td><td>rgba(0,0,0,0.4)</td></tr>
          <tr><td>dialog-overlay-dark</td><td>rgba(0,0,0,0.7)</td></tr>
          <tr><td>dialog-shadow</td><td>0 8px 32px rgba(0,0,0,0.2)</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all dialog variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-dialog--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Overlay</td><td>Semi-transparent backdrop behind the dialog</td></tr>
          <tr><td>2</td><td>Container</td><td>Centered card with rounded corners and shadow</td></tr>
          <tr><td>3</td><td>Icon</td><td>Optional status icon (alert variant)</td></tr>
          <tr><td>4</td><td>Title</td><td>Bold heading describing the dialog purpose</td></tr>
          <tr><td>5</td><td>Description</td><td>Supporting text explaining the context</td></tr>
          <tr><td>6</td><td>Content Area</td><td>Form fields or custom content (form/fullscreen)</td></tr>
          <tr><td>7</td><td>Primary Action</td><td>Main action button (confirm, submit, etc.)</td></tr>
          <tr><td>8</td><td>Secondary Action</td><td>Cancel or dismiss button</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>For destructive actions that need explicit confirmation</li>
        <li>For important alerts that require acknowledgment</li>
        <li>For short forms that don&apos;t warrant a full page</li>
        <li>For full-screen editing on mobile devices</li>
        <li>When user attention must be focused on a single task</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="dialog-box"
        doItems={[
          'Use clear, action-oriented button labels (e.g., "Delete" not "OK")',
          'Keep dialog content concise and focused on one task',
          'Use destructive styling for dangerous actions',
          'Allow dismissal via overlay click and Escape key',
          'Trap focus within the dialog while open',
        ]}
        dontItems={[
          'Don\'t stack multiple dialogs on top of each other',
          'Don\'t use dialogs for non-critical information — use snackbars',
          'Don\'t put long scrollable content in small dialogs',
          'Don\'t remove the cancel/dismiss option for non-alert dialogs',
          'Don\'t auto-close dialogs with timers',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>dialog / alertdialog</td><td>Identifies the component as a dialog</td></tr>
          <tr><td>aria-modal</td><td>true</td><td>Indicates content behind is inert</td></tr>
          <tr><td>aria-labelledby</td><td>title id</td><td>Links dialog to its title</td></tr>
          <tr><td>aria-describedby</td><td>description id</td><td>Links dialog to its description</td></tr>
          <tr><td>Focus trap</td><td>—</td><td>Tab cycles within dialog elements</td></tr>
          <tr><td>Escape key</td><td>—</td><td>Closes the dialog</td></tr>
          <tr><td>Auto-focus</td><td>—</td><td>Focus moves to first interactive element</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Bottom Sheet</strong> — Mobile-first alternative to centered dialogs</li>
        <li><strong>Side Drawer</strong> — Slide-in panel for complex content</li>
        <li><strong>Snackbar</strong> — Non-blocking notifications for less critical info</li>
        <li><strong>Alert</strong> — Inline alert banners for page-level messages</li>
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
        <li>Added <code>form</code> variant with children content support</li>
        <li>Added <code>fullscreen</code> variant for mobile editing flows</li>
        <li>Added <code>alert</code> variant with icon support</li>
        <li>Added <code>size</code> prop with SM, MD, LG options</li>
        <li>Added <code>destructive</code> option for primary action</li>
        <li>Improved focus trap and keyboard navigation</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with confirmation dialog</li>
        <li>Overlay backdrop with click-to-dismiss</li>
        <li>Primary and secondary action buttons</li>
        <li>Light and dark theme support</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function DialogBoxPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Dialog Box"
      description="Dialog boxes are modal overlays that require user attention for confirmations, alerts, forms, and focused editing tasks."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
