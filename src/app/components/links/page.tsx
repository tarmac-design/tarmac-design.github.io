'use client';

import { useState, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { ComponentExampleSection, type PreviewSize, type PreviewTheme } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Link variant colors ── */
const variantColors: Record<string, string> = {
  blue: '#2396FB',
  black: '#0D0D0D',
  white: '#FFFFFF',
};

/* ── External link arrow icon ── */
function ExternalIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M6 3h7v7M13 3L3 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Star icon (sample leading icon) ── */
function StarIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M8 1l2.09 4.26L15 5.96l-3.5 3.42.83 4.82L8 12.26 3.67 14.2l.83-4.82L1 5.96l4.91-.7L8 1z" />
    </svg>
  );
}

/* ── LinkProps interface ── */
interface LinkProps {
  href: string;
  variant?: 'blue' | 'black' | 'white';
  children: ReactNode;
  external?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

/* ── Interactive LinkDemo component ── */
function LinkDemo({
  href,
  variant = 'blue',
  children,
  external = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  theme,
}: LinkProps & { theme: PreviewTheme }) {
  const [hovered, setHovered] = useState(false);
  const [visited, setVisited] = useState(false);

  const color = variantColors[variant] || variantColors.blue;
  const visitedColor = variant === 'blue' ? '#7B61FF' : variant === 'black' ? '#525252' : '#CCCCCC';
  const currentColor = disabled ? (theme === 'dark' ? '#555' : '#999') : visited ? visitedColor : color;
  const opacity = disabled ? 0.5 : 1;

  return (
    <span
      role="link"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => { setHovered(false); }}
      onClick={() => { if (!disabled) setVisited(true); }}
      onKeyDown={(e) => { if (e.key === 'Enter' && !disabled) setVisited(true); }}
      style={{
        color: currentColor,
        textDecoration: hovered && !disabled ? 'underline' : 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 'inherit',
        fontWeight: 500,
        transition: 'all 0.15s ease',
        outline: 'none',
      }}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {external && <ExternalIcon size={14} color={currentColor} />}
      {icon && iconPosition === 'right' && !external && icon}
    </span>
  );
}

/* ── Examples Tab ── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="links" />
      <h2>Overview</h2>
      <p>Links are text-based hyperlinks used for navigation. They guide users to other pages, sections, or external resources using styled anchor-like text elements.</p>
      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Blue (#2396FB), Black (#0D0D0D), White (#FFFFFF)</td></tr>
          <tr><td>States</td><td>Default, Hover (underline), Visited, Disabled</td></tr>
          <tr><td>Features</td><td>Leading icon, Trailing icon, External link arrow, Inline in text</td></tr>
          <tr><td>Sizes</td><td>Inherits from parent text</td></tr>
        </tbody>
      </table>

      <h2>Color Variants</h2>

      <ComponentExampleSection title="Blue Links" desc="Default link color for most contexts. High contrast on light backgrounds.">
        {({ size, theme }) => (
          <>
            <LinkDemo href="#" variant="blue" theme={theme}>Learn more</LinkDemo>
            <LinkDemo href="#" variant="blue" external theme={theme}>Visit website</LinkDemo>
            <LinkDemo href="#" variant="blue" disabled theme={theme}>Disabled link</LinkDemo>
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection title="Black Links" desc="Subtle links that blend with body text. Use for navigation or secondary actions.">
        {({ size, theme }) => (
          <>
            <LinkDemo href="#" variant="black" theme={theme}>Terms of service</LinkDemo>
            <LinkDemo href="#" variant="black" external theme={theme}>External resource</LinkDemo>
            <LinkDemo href="#" variant="black" disabled theme={theme}>Disabled link</LinkDemo>
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection title="White Links" desc="For use on dark backgrounds. Switch preview to dark mode to see clearly.">
        {({ size, theme }) => (
          <>
            <LinkDemo href="#" variant="white" theme={theme}>Get started</LinkDemo>
            <LinkDemo href="#" variant="white" external theme={theme}>Documentation</LinkDemo>
            <LinkDemo href="#" variant="white" disabled theme={theme}>Disabled link</LinkDemo>
          </>
        )}
      </ComponentExampleSection>

      <h2>States</h2>

      <ComponentExampleSection title="Default & Hover" desc="Hover reveals an underline. Try hovering over these links.">
        {({ size, theme }) => (
          <>
            <LinkDemo href="#" variant="blue" theme={theme}>Hover me</LinkDemo>
            <LinkDemo href="#" variant="black" theme={theme}>Hover me</LinkDemo>
            <LinkDemo href="#" variant="white" theme={theme}>Hover me</LinkDemo>
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection title="Visited" desc="Click a link to see the visited state. Color shifts to indicate prior interaction.">
        {({ size, theme }) => (
          <>
            <LinkDemo href="#" variant="blue" theme={theme}>Click to visit</LinkDemo>
            <LinkDemo href="#" variant="black" theme={theme}>Click to visit</LinkDemo>
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection title="Disabled" desc="50% opacity, not-allowed cursor. Non-interactive.">
        {({ size, theme }) => (
          <>
            <LinkDemo href="#" variant="blue" disabled theme={theme}>Disabled blue</LinkDemo>
            <LinkDemo href="#" variant="black" disabled theme={theme}>Disabled black</LinkDemo>
            <LinkDemo href="#" variant="white" disabled theme={theme}>Disabled white</LinkDemo>
          </>
        )}
      </ComponentExampleSection>

      <h2>With Icons</h2>

      <ComponentExampleSection title="Leading Icon" desc="Icon placed before the link text for visual emphasis.">
        {({ size, theme }) => (
          <>
            <LinkDemo href="#" variant="blue" icon={<StarIcon />} iconPosition="left" theme={theme}>Favorites</LinkDemo>
            <LinkDemo href="#" variant="black" icon={<StarIcon />} iconPosition="left" theme={theme}>Bookmarks</LinkDemo>
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection title="Trailing Icon (External)" desc="External links automatically show an arrow icon after the text.">
        {({ size, theme }) => (
          <>
            <LinkDemo href="#" variant="blue" external theme={theme}>Open in new tab</LinkDemo>
            <LinkDemo href="#" variant="black" external theme={theme}>GitHub repository</LinkDemo>
          </>
        )}
      </ComponentExampleSection>

      <ComponentExampleSection title="Trailing Icon (Custom)" desc="Custom trailing icon placed after the link text.">
        {({ size, theme }) => (
          <>
            <LinkDemo href="#" variant="blue" icon={<StarIcon />} iconPosition="right" theme={theme}>Rate this</LinkDemo>
            <LinkDemo href="#" variant="black" icon={<StarIcon />} iconPosition="right" theme={theme}>Add to favorites</LinkDemo>
          </>
        )}
      </ComponentExampleSection>

      <h2>Inline Links</h2>

      <ComponentExampleSection title="Inline in Text" desc="Links embedded within paragraph text inherit the parent font size.">
        {({ size, theme }) => {
          const textColor = theme === 'dark' ? '#E0E0E0' : '#333';
          return (
            <p style={{ color: textColor, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              By continuing, you agree to our{' '}
              <LinkDemo href="#" variant="blue" theme={theme}>Terms of Service</LinkDemo>{' '}
              and{' '}
              <LinkDemo href="#" variant="blue" theme={theme}>Privacy Policy</LinkDemo>.
              For questions, visit our{' '}
              <LinkDemo href="#" variant="blue" external theme={theme}>Help Center</LinkDemo>.
            </p>
          );
        }}
      </ComponentExampleSection>
    </>
  );
}

/* ── Code Tab ── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { Link } from '@tarmac/design-system';`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`interface LinkProps {
  /** Target URL for the link */
  href: string;
  /** Color variant of the link */
  variant?: 'blue' | 'black' | 'white';
  /** Link content — text, icons, or mixed */
  children: ReactNode;
  /** Renders an external arrow icon and opens in new tab */
  external?: boolean;
  /** Disables interaction and reduces opacity */
  disabled?: boolean;
  /** Optional icon element */
  icon?: ReactNode;
  /** Position of the icon relative to text */
  iconPosition?: 'left' | 'right';
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>href</code></td><td><code>string</code></td><td>—</td><td>Required. The destination URL for the link.</td></tr>
          <tr><td><code>variant</code></td><td><code>&apos;blue&apos; | &apos;black&apos; | &apos;white&apos;</code></td><td><code>&apos;blue&apos;</code></td><td>Color variant. Blue (#2396FB) for default, Black (#0D0D0D) for subtle, White (#FFF) for dark backgrounds.</td></tr>
          <tr><td><code>children</code></td><td><code>ReactNode</code></td><td>—</td><td>Required. The link content — typically text.</td></tr>
          <tr><td><code>external</code></td><td><code>boolean</code></td><td><code>false</code></td><td>When true, appends an external arrow icon and sets <code>target=&quot;_blank&quot;</code> with <code>rel=&quot;noopener noreferrer&quot;</code>.</td></tr>
          <tr><td><code>disabled</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Disables the link. Reduces opacity to 50% and shows not-allowed cursor.</td></tr>
          <tr><td><code>icon</code></td><td><code>ReactNode</code></td><td><code>undefined</code></td><td>Optional icon element rendered alongside the text.</td></tr>
          <tr><td><code>iconPosition</code></td><td><code>&apos;left&apos; | &apos;right&apos;</code></td><td><code>&apos;left&apos;</code></td><td>Controls whether the icon appears before or after the link text.</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>

      <h4>Basic Link</h4>
      <pre><code>{`<Link href="/about">About Us</Link>`}</code></pre>

      <h4>External Link</h4>
      <pre><code>{`<Link href="https://example.com" external>
  Visit Example
</Link>`}</code></pre>

      <h4>With Leading Icon</h4>
      <pre><code>{`<Link href="/favorites" icon={<StarIcon />} iconPosition="left">
  Favorites
</Link>`}</code></pre>

      <h4>With Trailing Icon</h4>
      <pre><code>{`<Link href="/rate" icon={<StarIcon />} iconPosition="right">
  Rate this
</Link>`}</code></pre>

      <h4>Inline in Paragraph</h4>
      <pre><code>{`<p>
  Read our <Link href="/terms">Terms of Service</Link> and
  <Link href="/privacy">Privacy Policy</Link>.
</p>`}</code></pre>

      <h4>Disabled Link</h4>
      <pre><code>{`<Link href="/locked" disabled>
  Premium Content
</Link>`}</code></pre>

      <h4>White Variant on Dark Background</h4>
      <pre><code>{`<div style={{ background: '#0D0D0D', padding: 24 }}>
  <Link href="/docs" variant="white" external>
    Documentation
  </Link>
</div>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>link-color-blue</td><td>#2396FB</td><td>Default blue link color</td></tr>
          <tr><td>link-color-black</td><td>#0D0D0D</td><td>Black link color</td></tr>
          <tr><td>link-color-white</td><td>#FFFFFF</td><td>White link color (dark bg)</td></tr>
          <tr><td>link-visited-blue</td><td>#7B61FF</td><td>Visited state for blue variant</td></tr>
          <tr><td>link-visited-black</td><td>#525252</td><td>Visited state for black variant</td></tr>
          <tr><td>link-disabled-opacity</td><td>0.5</td><td>Opacity when disabled</td></tr>
          <tr><td>link-font-weight</td><td>500</td><td>Medium weight for link text</td></tr>
          <tr><td>link-icon-gap</td><td>4px</td><td>Gap between icon and text</td></tr>
        </tbody>
      </table>
    </>
  );
}

/* ── Usage Tab ── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Leading Icon</td><td>Optional icon before the link text</td></tr>
          <tr><td>2</td><td>Link Text</td><td>Clickable text content — inherits parent font size</td></tr>
          <tr><td>3</td><td>Trailing Icon</td><td>Optional icon after text, or external arrow for external links</td></tr>
          <tr><td>4</td><td>Underline</td><td>Appears on hover to indicate interactivity</td></tr>
        </tbody>
      </table>

      <h2>Usage Decision Guide</h2>
      <table>
        <thead><tr><th>Context</th><th>Variant</th><th>External</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Primary navigation</td><td>Blue</td><td>No</td><td>&quot;View all products&quot;</td></tr>
          <tr><td>Inline in body text</td><td>Blue</td><td>No</td><td>&quot;Terms of Service&quot;</td></tr>
          <tr><td>Footer / secondary nav</td><td>Black</td><td>No</td><td>&quot;Contact Us&quot;</td></tr>
          <tr><td>External resource</td><td>Blue</td><td>Yes</td><td>&quot;GitHub Repository ↗&quot;</td></tr>
          <tr><td>Dark background / hero</td><td>White</td><td>No</td><td>&quot;Get Started&quot;</td></tr>
          <tr><td>Disabled / locked</td><td>Any</td><td>No</td><td>&quot;Premium Content&quot;</td></tr>
        </tbody>
      </table>

      <h2>Best Practices</h2>
      <DoDont
        slug="links"
        doItems={[
          'Use descriptive link text that makes sense out of context',
          'Show an external icon for links that leave the site',
          'Use underline on hover to signal interactivity',
          'Ensure visited links have a distinct color shift',
          'Use the blue variant as the default for most contexts',
        ]}
        dontItems={[
          'Don\'t use "click here" or "read more" as link text',
          'Don\'t style links to look like buttons or vice versa',
          'Don\'t remove hover underline — it\'s the primary affordance',
          'Don\'t use white variant on light backgrounds',
          'Don\'t disable links without explaining why nearby',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Semantic HTML</td><td>&lt;a&gt;</td><td>Always use native anchor element in production</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter</td><td>Focus and activate the link</td></tr>
          <tr><td>Focus ring</td><td>2px outline</td><td>Visible focus indicator for keyboard users</td></tr>
          <tr><td>Text contrast</td><td>≥ 4.5:1</td><td>Against background (WCAG AA)</td></tr>
          <tr><td>External links</td><td>target=&quot;_blank&quot;</td><td>With rel=&quot;noopener noreferrer&quot; for security</td></tr>
          <tr><td>aria-disabled</td><td>true</td><td>Set on disabled links, with tabIndex=-1</td></tr>
          <tr><td>aria-label</td><td>string</td><td>When link text alone is not descriptive enough</td></tr>
        </tbody>
      </table>
    </>
  );
}

/* ── Changelog Tab ── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added White variant for dark backgrounds</li>
        <li>Added <code>icon</code> and <code>iconPosition</code> props</li>
        <li>Added visited state color shift</li>
        <li>Improved disabled state with <code>aria-disabled</code></li>
        <li>External links now auto-render trailing arrow icon</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with Blue and Black variants</li>
        <li>Hover underline interaction</li>
        <li>External link support with <code>target=&quot;_blank&quot;</code></li>
        <li>Disabled state</li>
      </ul>
    </>
  );
}

/* ── Page Export ── */
export default function LinksPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Links"
      description="Text hyperlinks for navigating users to other pages, sections, or external resources."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
