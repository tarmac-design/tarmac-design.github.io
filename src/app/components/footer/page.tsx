'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Social Icon ── */
function SocialIcon({ type, size = 16, color }: { type: string; size?: number; color: string }) {
  const paths: Record<string, string> = {
    twitter: 'M16 3.5a6.5 6.5 0 01-1.9.5 3.3 3.3 0 001.4-1.8 6.5 6.5 0 01-2.1.8A3.3 3.3 0 008 6.5 9.3 9.3 0 011.1 2.8a3.3 3.3 0 001 4.4A3.2 3.2 0 01.6 6.9a3.3 3.3 0 002.6 3.2 3.3 3.3 0 01-1.5.1 3.3 3.3 0 003.1 2.3A6.6 6.6 0 010 14a9.3 9.3 0 005 1.5c6.1 0 9.4-5 9.4-9.4v-.4A6.7 6.7 0 0016 3.5z',
    linkedin: 'M0 5h3.6v11H0zM1.8 0a2 2 0 110 4 2 2 0 010-4zM5.5 5H9v1.5h.1C9.6 5.6 11 4.8 12.8 4.8 16.4 4.8 17 7.2 17 10.3V16h-3.6v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V16H6V5z',
    github: 'M8 0a8 8 0 00-2.5 15.6c.4.1.5-.2.5-.4v-1.5C3.8 14.1 3.3 12.6 3.3 12.6c-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.6.8-2.2-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 014 0c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.2 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4A8 8 0 008 0z',
  };
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color}><path d={paths[type] || paths.github} /></svg>
  );
}

/* ── Footer Preview ── */
function FooterPreview({ variant = 'multi-column', theme }: { variant?: string; theme: 'light' | 'dark' }) {
  const [email, setEmail] = useState('');
  const bg = theme === 'dark' ? '#1E1E1E' : '#FAFAFA';
  const border = theme === 'dark' ? '#333' : '#E0E0E0';
  const text = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const subtext = theme === 'dark' ? '#888' : '#666';
  const linkColor = theme === 'dark' ? '#AAA' : '#555';

  const Logo = () => (
    <div style={{ fontWeight: 700, fontSize: 16, color: text, marginBottom: 8 }}>
      <span style={{ color: '#2396FB' }}>●</span> Tarmac
    </div>
  );

  const SocialRow = () => (
    <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
      {['twitter', 'linkedin', 'github'].map(s => (
        <span key={s} style={{ cursor: 'pointer', opacity: 0.7 }}><SocialIcon type={s} color={subtext} /></span>
      ))}
    </div>
  );

  const linkStyle: React.CSSProperties = { color: linkColor, fontSize: 13, textDecoration: 'none', display: 'block', marginBottom: 6, cursor: 'pointer' };

  if (variant === 'simple') {
    return (
      <div style={{ background: bg, borderTop: `1px solid ${border}`, padding: '20px 24px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Logo />
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Contact'].map(l => <a key={l} style={linkStyle}>{l}</a>)}
          </div>
          <span style={{ fontSize: 12, color: subtext }}>© 2024 Tarmac. All rights reserved.</span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div style={{ background: bg, borderTop: `1px solid ${border}`, padding: '16px 24px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12, color: subtext }}>© 2024 Tarmac</span>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Privacy', 'Terms'].map(l => <a key={l} style={{ ...linkStyle, marginBottom: 0, fontSize: 12 }}>{l}</a>)}
          </div>
          <SocialRow />
        </div>
      </div>
    );
  }

  if (variant === 'newsletter') {
    return (
      <div style={{ background: bg, borderTop: `1px solid ${border}`, padding: '24px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <Logo />
            <p style={{ fontSize: 13, color: subtext, maxWidth: 240, lineHeight: 1.5 }}>Building the future of design systems.</p>
            <SocialRow />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: text, marginBottom: 8 }}>Subscribe to our newsletter</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ padding: '6px 10px', borderRadius: 6, border: `1px solid ${border}`, background: 'transparent', color: text, fontSize: 12, width: 180, outline: 'none' }} />
              <button style={{ padding: '6px 14px', borderRadius: 6, background: '#2396FB', color: '#fff', border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Subscribe</button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20, paddingTop: 12, borderTop: `1px solid ${border}`, fontSize: 12, color: subtext }}>© 2024 Tarmac. All rights reserved.</div>
      </div>
    );
  }

  /* multi-column (default) */
  const columns = [
    { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
    { title: 'Resources', links: ['Documentation', 'Guides', 'API Reference', 'Storybook'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
  ];

  return (
    <div style={{ background: bg, borderTop: `1px solid ${border}`, padding: '24px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ minWidth: 160 }}>
          <Logo />
          <p style={{ fontSize: 13, color: subtext, maxWidth: 200, lineHeight: 1.5 }}>Building the future of design systems.</p>
          <SocialRow />
        </div>
        {columns.map(col => (
          <div key={col.title} style={{ minWidth: 100 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: text, marginBottom: 10 }}>{col.title}</div>
            {col.links.map(l => <a key={l} style={linkStyle}>{l}</a>)}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, paddingTop: 12, borderTop: `1px solid ${border}`, fontSize: 12, color: subtext }}>© 2024 Tarmac. All rights reserved.</div>
    </div>
  );
}

/* ── Footer Example Section ── */
function FooterExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { theme: 'light' | 'dark'; variant: string }) => ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState('multi-column');

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
          <option value="simple">Simple</option><option value="multi-column">Multi-column</option>
          <option value="newsletter">With Newsletter</option><option value="compact">Compact</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option><option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 0, overflow: 'hidden' }}>
        {children({ theme, variant })}
      </div>
    </div>
  );
}

/* ─── TAB 1 — Examples ─── */
function ExamplesTab() {
  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-popupheaderfooter--footer-playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-popupheaderfooter--footer-playground"
        height={420}
        title="Footer — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>Footers provide consistent page-level navigation, branding, legal links, and optional newsletter signup at the bottom of every page.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Simple, Multi-column, With Newsletter, Compact</td></tr>
          <tr><td>Features</td><td>Logo, Link columns, Social icons, Copyright, Newsletter form</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>
      <FooterExampleSection title="Footer Layouts" desc="Switch between variants to see different footer configurations.">
        {({ theme, variant }) => <FooterPreview variant={variant} theme={theme} />}
      </FooterExampleSection>
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
      <pre><code>{`import { Footer, FooterColumn, FooterLink } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface FooterProps {
  variant?: 'simple' | 'multi-column' | 'newsletter' | 'compact';
  logo?: ReactNode;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright?: string;
  newsletter?: boolean;
  onSubscribe?: (email: string) => void;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Simple footer
<Footer variant="simple" copyright="© 2024 Tarmac" />

// Multi-column
<Footer
  variant="multi-column"
  logo={<Logo />}
  columns={[
    { title: 'Product', links: [{ label: 'Features', href: '/features' }] },
    { title: 'Company', links: [{ label: 'About', href: '/about' }] },
  ]}
  socialLinks={[{ type: 'twitter', href: '#' }]}
/>

// With newsletter
<Footer variant="newsletter" newsletter onSubscribe={handleSubscribe} />`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>footer-padding-y</td><td>24px</td></tr>
          <tr><td>footer-padding-x</td><td>24px</td></tr>
          <tr><td>footer-border-top</td><td>1px solid var(--color-outline)</td></tr>
          <tr><td>footer-link-font-size</td><td>13px</td></tr>
          <tr><td>footer-copyright-font-size</td><td>12px</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all footer variants in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-footer--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Container</td><td>Full-width wrapper with top border</td></tr>
          <tr><td>2</td><td>Logo</td><td>Brand mark or wordmark</td></tr>
          <tr><td>3</td><td>Link Columns</td><td>Grouped navigation links by category</td></tr>
          <tr><td>4</td><td>Social Icons</td><td>Links to social media profiles</td></tr>
          <tr><td>5</td><td>Copyright</td><td>Legal text at the bottom</td></tr>
          <tr><td>6</td><td>Newsletter</td><td>Optional email subscription form</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>At the bottom of every page for consistent navigation</li>
        <li>To provide legal links (Privacy, Terms of Service)</li>
        <li>To display social media and contact information</li>
        <li>For secondary navigation that doesn&apos;t fit in the header</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="footer"
        doItems={[
          'Keep footer content consistent across all pages',
          'Group links into logical categories',
          'Include essential legal links (Privacy, Terms)',
          'Use the compact variant for simple landing pages',
          'Ensure social icons have accessible labels',
        ]}
        dontItems={[
          'Don\'t overload the footer with too many link columns',
          'Don\'t duplicate primary navigation in the footer',
          'Don\'t use the footer for critical user actions',
          'Don\'t hide the copyright notice',
          'Don\'t use different footer variants on the same site',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>contentinfo</td><td>Landmark role for the footer region</td></tr>
          <tr><td>aria-label</td><td>&quot;Footer navigation&quot;</td><td>Describes the footer purpose</td></tr>
          <tr><td>Links</td><td>descriptive text</td><td>All links have meaningful labels</td></tr>
          <tr><td>Social icons</td><td>aria-label</td><td>Each icon has an accessible name</td></tr>
          <tr><td>Keyboard</td><td>Tab navigation</td><td>All links are focusable and reachable</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Header</strong> — Top-level navigation bar</li>
        <li><strong>Navigation</strong> — Sidebar and tab navigation</li>
        <li><strong>Links</strong> — Standalone link component</li>
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
        <li>Added newsletter subscription variant</li>
        <li>Added compact variant for minimal footers</li>
        <li>Added social icon support with configurable links</li>
        <li>Improved responsive layout for mobile</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with simple and multi-column variants</li>
        <li>Logo, link columns, and copyright support</li>
      </ul>
    </>
  );
}

/* ─── Page Export ─── */
export default function FooterPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Footer"
      description="Footers provide page-level navigation, branding, legal links, and optional newsletter signup."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
