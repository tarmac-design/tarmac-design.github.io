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
      <StorybookVariantViewer slug="footer" />
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
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

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
