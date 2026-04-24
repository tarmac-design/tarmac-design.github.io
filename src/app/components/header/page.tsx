'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Header Preview ── */
function HeaderPreview({ variant = 'default', theme }: { variant?: string; theme: 'light' | 'dark' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  const bg = variant === 'transparent' ? 'transparent' : (theme === 'dark' ? '#1E1E1E' : '#FFFFFF');
  const border = theme === 'dark' ? '#333' : '#E0E0E0';
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const subtext = theme === 'dark' ? '#999' : '#666';
  const navItems = ['Home', 'Components', 'Foundations', 'Resources'];

  const Logo = () => (
    <div style={{ fontWeight: 700, fontSize: 15, color: text, display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ color: '#2396FB', fontSize: 18 }}>●</span> Tarmac
    </div>
  );

  const Avatar = () => (
    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2396FB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>A</div>
  );

  const HamburgerIcon = () => (
    <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {menuOpen
        ? <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke={text} strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
        : [0, 1, 2].map(i => <span key={i} style={{ width: 18, height: 2, background: text, borderRadius: 1 }} />)
      }
    </button>
  );

  const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={subtext} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="7" r="5" /><path d="M11 11l3.5 3.5" />
    </svg>
  );

  const navStyle: React.CSSProperties = { fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: '4px 0', transition: 'color 0.15s' };

  /* Breadcrumbs variant */
  if (variant === 'breadcrumbs') {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ background: bg, borderBottom: `1px solid ${border}`, padding: '0 20px', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {navItems.map(item => (
              <span key={item} onClick={() => setActiveNav(item)} style={{ ...navStyle, color: activeNav === item ? '#2396FB' : subtext }}>{item}</span>
            ))}
            <Avatar />
          </div>
        </div>
        <div style={{ background: theme === 'dark' ? '#252525' : '#F8F8F8', padding: '8px 20px', fontSize: 12, color: subtext, display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', color: '#2396FB' }}>Home</span>
          <span>›</span>
          <span style={{ cursor: 'pointer', color: '#2396FB' }}>Components</span>
          <span>›</span>
          <span style={{ color: text }}>Header</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        background: bg,
        borderBottom: variant === 'transparent' ? 'none' : `1px solid ${border}`,
        padding: '0 20px', height: 48,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: variant === 'sticky' ? 'sticky' as const : 'relative' as const,
        top: 0, zIndex: 10,
        backdropFilter: variant === 'transparent' ? 'blur(8px)' : undefined,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Logo />
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {navItems.map(item => (
              <span key={item} onClick={() => setActiveNav(item)} style={{ ...navStyle, color: activeNav === item ? '#2396FB' : subtext }}>{item}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {(variant === 'search' || variant === 'default') && (
            searchOpen ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input autoFocus placeholder="Search..." style={{ padding: '4px 8px', borderRadius: 6, border: `1px solid ${border}`, background: 'transparent', color: text, fontSize: 12, width: 140, outline: 'none' }} />
                <button onClick={() => setSearchOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: subtext, fontSize: 14 }}>✕</button>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><SearchIcon /></button>
            )
          )}
          <Avatar />
          <HamburgerIcon />
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: bg, borderBottom: `1px solid ${border}`, padding: '12px 20px' }}>
          {navItems.map(item => (
            <div key={item} onClick={() => { setActiveNav(item); setMenuOpen(false); }} style={{ padding: '10px 0', fontSize: 14, color: activeNav === item ? '#2396FB' : text, cursor: 'pointer', borderBottom: `1px solid ${border}` }}>
              {item}
            </div>
          ))}
        </div>
      )}

      {variant === 'sticky' && (
        <div style={{ padding: 20, fontSize: 13, color: subtext, lineHeight: 1.8 }}>
          <p>Scroll content area — the header stays fixed at the top.</p>
          {[1, 2, 3].map(i => <p key={i}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>)}
        </div>
      )}
    </div>
  );
}

/* ── Header Example Section ── */
function HeaderExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { theme: 'light' | 'dark'; variant: string }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState('default');

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
          <option value="default">Default</option><option value="search">With Search</option>
          <option value="breadcrumbs">With Breadcrumbs</option><option value="transparent">Transparent</option>
          <option value="sticky">Sticky</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option><option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 0, overflow: 'hidden', maxHeight: 300, overflowY: 'auto' }}>
        {children({ theme, variant })}
      </div>
    </div>
  );
}

/* ─── TAB 1 — Examples ─── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="header" />
      <h2>Overview</h2>
      <p>Headers provide top-level navigation, branding, search, and user account access. They anchor the page and adapt to different contexts with variant support.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Default, With Search, With Breadcrumbs, Transparent, Sticky</td></tr>
          <tr><td>Features</td><td>Logo, Navigation links, Search, User avatar, Mobile hamburger menu</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>
      <HeaderExampleSection title="Header Layouts" desc="Switch variants to see different header configurations. Click the hamburger icon to toggle the mobile menu.">
        {({ theme, variant }) => <HeaderPreview variant={variant} theme={theme} />}
      </HeaderExampleSection>
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
      <pre><code>{`import { Header, HeaderNav, HeaderAction } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface HeaderProps {
  variant?: 'default' | 'search' | 'breadcrumbs' | 'transparent' | 'sticky';
  logo?: ReactNode;
  navItems?: NavItem[];
  actions?: ReactNode;
  onSearch?: (query: string) => void;
  breadcrumbs?: Breadcrumb[];
  sticky?: boolean;
  transparent?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface Breadcrumb {
  label: string;
  href?: string;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default header
<Header
  logo={<Logo />}
  navItems={[
    { label: 'Home', href: '/', active: true },
    { label: 'Components', href: '/components' },
  ]}
  actions={<Avatar />}
/>

// With search
<Header variant="search" onSearch={handleSearch} />

// Sticky header
<Header variant="sticky" sticky />

// With breadcrumbs
<Header
  variant="breadcrumbs"
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Header' },
  ]}
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>header-height</td><td>48px</td></tr>
          <tr><td>header-padding-x</td><td>20px</td></tr>
          <tr><td>header-border-bottom</td><td>1px solid var(--color-outline)</td></tr>
          <tr><td>header-nav-font-size</td><td>13px</td></tr>
          <tr><td>header-nav-font-weight</td><td>500</td></tr>
          <tr><td>header-z-index</td><td>10</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all header variants in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-header--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Full-width bar with bottom border</td></tr>
          <tr><td>2</td><td>Logo</td><td>Brand mark linking to home</td></tr>
          <tr><td>3</td><td>Navigation</td><td>Horizontal link list with active indicator</td></tr>
          <tr><td>4</td><td>Search</td><td>Optional expandable search input</td></tr>
          <tr><td>5</td><td>User Avatar</td><td>Account access and profile menu trigger</td></tr>
          <tr><td>6</td><td>Hamburger Menu</td><td>Mobile navigation toggle</td></tr>
          <tr><td>7</td><td>Breadcrumbs</td><td>Optional secondary row showing page hierarchy</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>As the primary navigation bar on every page</li>
        <li>To provide quick access to search functionality</li>
        <li>To show the user&apos;s account status and avatar</li>
        <li>With breadcrumbs for deep navigation hierarchies</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="header"
        doItems={[
          'Keep navigation items to 5–7 maximum',
          'Highlight the active navigation item clearly',
          'Provide a mobile-friendly hamburger menu',
          'Use sticky variant for long-scrolling pages',
          'Ensure the logo links back to the home page',
        ]}
        dontItems={[
          'Don\'t overcrowd the header with too many actions',
          'Don\'t hide primary navigation behind a hamburger on desktop',
          'Don\'t use transparent variant over busy backgrounds without blur',
          'Don\'t place critical actions only in the mobile menu',
          'Don\'t use multiple header bars on the same page',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>banner</td><td>Landmark role for the header region</td></tr>
          <tr><td>nav</td><td>aria-label=&quot;Main&quot;</td><td>Wraps navigation links</td></tr>
          <tr><td>aria-expanded</td><td>boolean</td><td>Mobile menu open state</td></tr>
          <tr><td>aria-current</td><td>&quot;page&quot;</td><td>Marks the active navigation item</td></tr>
          <tr><td>Keyboard</td><td>Tab, Enter, Escape</td><td>Navigate and toggle menu</td></tr>
          <tr><td>Skip link</td><td>—</td><td>Provide &quot;Skip to content&quot; link before header</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Footer</strong> — Bottom-of-page navigation</li>
        <li><strong>Navigation</strong> — Sidebar and tab navigation</li>
        <li><strong>Breadcrumbs</strong> — Standalone breadcrumb trail</li>
        <li><strong>Search</strong> — Full search input component</li>
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
        <li>Added transparent and sticky variants</li>
        <li>Added breadcrumb sub-header support</li>
        <li>Added expandable search input</li>
        <li>Improved mobile hamburger menu with animation</li>
        <li>Added skip-to-content link support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with logo, navigation, and avatar</li>
        <li>Basic responsive hamburger menu</li>
      </ul>
    </>
  );
}

/* ─── Page Export ─── */
export default function HeaderPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Header"
      description="Headers provide top-level navigation, branding, search, and user account access."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
