'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { AvatarExampleSection } from './AvatarPreview';

/* ── Storybook URLs ── */
const SB_BASE = 'https://tarmac-storybook-dev.pntrzz.com/storybook';
const sbIframe = (id: string) => `${SB_BASE}/sb/iframe.html?id=${id}&viewMode=story`;
const sbFull = (id: string) => `${SB_BASE}/?path=/story/${id}`;

const avatarStories = [
  { id: 'tarmac-tds-avatar--playground', title: 'Default', desc: 'Interactive playground with all avatar props. Adjust size, shape, variant, status, and state.' },
  { id: 'tarmac-tds-avatar--full-matrix', title: 'Full Matrix', desc: 'All avatar variants, sizes, shapes, and states displayed in a comprehensive grid.' },
  { id: 'tarmac-tds-avatar--shapes-comparison', title: 'Shapes', desc: 'Circle avatars for people, rounded square for entities and structured layouts.' },
  { id: 'tarmac-tds-avatar--status-dots', title: 'Status Indicators', desc: 'Small colored dots indicating user presence — active, inactive, idle, busy, and more.' },
  { id: 'tarmac-tds-avatar--light-vs-dark', title: 'Light vs Dark Mode', desc: 'Avatar appearance across light and dark themes, ensuring proper contrast and readability.' },
];

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="avatar" />
      <h2>Overview</h2>
      <p>
        Avatars represent people, entities, or ownership within the interface. They provide quick visual identification,
        support recognition in collaborative contexts, and help humanize data-heavy experiences.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Image, Initials, Icon, Numeric</td></tr>
          <tr><td>Shapes</td><td>Circle (people), Square (entities)</td></tr>
          <tr><td>Sizes</td><td>S (24px), M (28px), L (36px), XL (40px), XXL (48px)</td></tr>
          <tr><td>Status</td><td>Active, Inactive, Idle, Busy, Focus, Do not disturb, Custom</td></tr>
          <tr><td>States</td><td>Default, Hover, Pressed, Focused, Disabled, Ghost, Loading</td></tr>
        </tbody>
      </table>

      <h2>Variants</h2>

      <AvatarExampleSection
        title="Initials — Circle"
        desc="Displays 1–2 characters from the user's name on a colored background. Default shape for people."
        variants={[
          { variant: 'initials', label: 'JD' },
          { variant: 'initials', label: 'AB' },
          { variant: 'initials', label: 'MK' },
        ]}
      />

      <AvatarExampleSection
        title="Initials — Square"
        desc="Initials in a rounded square shape. Use for entities like teams, projects, or workspaces."
        defaultShape="square"
        variants={[
          { variant: 'initials', label: 'T1' },
          { variant: 'initials', label: 'PR' },
          { variant: 'initials', label: 'DS' },
        ]}
      />

      <AvatarExampleSection
        title="Image — Circle"
        desc="User photo cropped to a circle. The preferred variant when a profile image is available."
        variants={[
          { variant: 'image', label: 'john' },
          { variant: 'image', label: 'jane' },
          { variant: 'image', label: 'alex' },
        ]}
      />

      <AvatarExampleSection
        title="Image — Square"
        desc="Photo in a rounded square. Use for entity avatars like workspaces, repositories, or team logos."
        defaultShape="square"
        variants={[
          { variant: 'image', label: 'team-alpha' },
          { variant: 'image', label: 'project-x' },
          { variant: 'image', label: 'org-logo' },
        ]}
      />

      <AvatarExampleSection
        title="Icon Fallback"
        desc="Generic user icon for system accounts, anonymous users, or when no other content is available."
        variants={[
          { variant: 'icon', label: 'Default' },
          { variant: 'icon', label: 'System' },
          { variant: 'icon', label: 'Anonymous' },
        ]}
      />

      <AvatarExampleSection
        title="Numeric Overflow"
        desc="Used in Avatar Groups to show how many additional participants are not displayed (e.g. +3)."
        variants={[
          { variant: 'numeric', label: '+3' },
          { variant: 'numeric', label: '+5' },
          { variant: 'numeric', label: '+12' },
        ]}
      />

      <h2>Status Indicators</h2>
      <p>Small colored dots on the avatar corner indicating user presence or contextual state. Each color has a specific meaning.</p>

      <AvatarExampleSection
        title="All Status Types"
        desc="Each status color communicates a specific user state. Labels below show the meaning."
        variants={[
          { variant: 'initials', label: 'JD', status: 'active' },
          { variant: 'initials', label: 'AB', status: 'inactive' },
          { variant: 'initials', label: 'MK', status: 'idle' },
          { variant: 'initials', label: 'RS', status: 'orange' },
          { variant: 'initials', label: 'PL', status: 'cyan' },
          { variant: 'initials', label: 'NK', status: 'purple' },
          { variant: 'initials', label: 'ST', status: 'pink' },
        ]}
      />

      <AvatarExampleSection
        title="Status on Image Avatars"
        desc="Status indicators work on all avatar variants including photo avatars."
        variants={[
          { variant: 'image', label: 'john-online', status: 'active' },
          { variant: 'image', label: 'jane-busy', status: 'orange' },
          { variant: 'image', label: 'alex-away', status: 'idle' },
          { variant: 'image', label: 'sam-offline', status: 'inactive' },
        ]}
      />

      <h2>Status Reference</h2>
      <table>
        <thead><tr><th>Status</th><th>Color</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td>Active</td><td>🟢 Green</td><td>User is online and active</td></tr>
          <tr><td>Inactive</td><td>⚪ Gray</td><td>User is offline</td></tr>
          <tr><td>Idle</td><td>🟡 Yellow</td><td>User is away / idle</td></tr>
          <tr><td>Busy</td><td>🟠 Orange</td><td>In a meeting or busy</td></tr>
          <tr><td>Focus</td><td>🔵 Cyan</td><td>Available but in focus mode</td></tr>
          <tr><td>Do not disturb</td><td>🟣 Purple</td><td>Notifications silenced</td></tr>
          <tr><td>Custom</td><td>🩷 Pink</td><td>Custom / app-defined state</td></tr>
        </tbody>
      </table>
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
      <pre><code>{`import { Avatar, AvatarGroup } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  icon?: string;
  numeric?: string;
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl';
  shape?: 'circle' | 'square';
  status?: 'active' | 'inactive' | 'idle' | 'orange' | 'cyan' | 'purple' | 'pink';
  state?: 'default' | 'hover' | 'focused' | 'disabled' | 'ghost';
  onClick?: () => void;
  loading?: boolean;
}

interface AvatarGroupProps {
  children: ReactNode;
  max?: number;
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl';
  shape?: 'circle' | 'square';
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Image avatar
<Avatar
  src="/photos/john-doe.jpg"
  alt="John Doe"
  size="l"
  status="active"
/>

// Initials fallback
<Avatar initials="JD" size="m" />

// Icon fallback
<Avatar icon="user" size="m" />

// Avatar Group with overflow
<AvatarGroup max={3} size="m">
  <Avatar src="/photos/john.jpg" alt="John" />
  <Avatar src="/photos/jane.jpg" alt="Jane" />
  <Avatar initials="AB" />
  <Avatar initials="CD" />
</AvatarGroup>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>avatar-size-s</td><td>24px</td></tr>
          <tr><td>avatar-size-m</td><td>28px</td></tr>
          <tr><td>avatar-size-l</td><td>36px</td></tr>
          <tr><td>avatar-size-xl</td><td>40px</td></tr>
          <tr><td>avatar-size-xxl</td><td>48px</td></tr>
        </tbody>
      </table>
      <h3>Status Indicator Sizes</h3>
      <table>
        <thead><tr><th>Avatar Size</th><th>Indicator Size</th></tr></thead>
        <tbody>
          <tr><td>S</td><td>8px</td></tr>
          <tr><td>M</td><td>10px</td></tr>
          <tr><td>L / XL / XXL</td><td>12px</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all avatar variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-avatar--playground" target="_blank" rel="noopener noreferrer">
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://mintcdn.com/delhivery-c9432998/doIU2Z4FdwFszuPW/assets/components/avatar/avatar-anatomy.png?w=1650&fit=max&auto=format&n=doIU2Z4FdwFszuPW&q=85&s=879a98fa83c9f6dcf4f9f853c0b06516" alt="Avatar anatomy" style={{ width: '100%', borderRadius: 8, marginBottom: 16, border: '1px solid var(--color-outline)' }} />
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Container</td><td>Circular or square wrapper defining the avatar boundary</td></tr>
          <tr><td>2</td><td>Background</td><td>Color fill when image is not available — auto-assigned from palette</td></tr>
          <tr><td>3</td><td>Content</td><td>Image, initials (1–2 chars), icon, or numeric overflow indicator</td></tr>
          <tr><td>4</td><td>Status Indicator</td><td>Optional colored dot — 8px (S), 10px (M), 12px (L/XL/XXL)</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To visually represent a user, team, or entity in the interface</li>
        <li>In headers, comments, activity feeds, and profile sections</li>
        <li>To show participant lists with Avatar Groups</li>
        <li>As visual anchors in data-heavy tables and lists</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="avatar"
        doItems={[
          'Provide meaningful alt text — use the person\'s name, not "avatar"',
          'Use the fallback chain: Image → Initials → Icon',
          'Keep the same size and shape within a given context',
          'Handle loading states with skeleton shimmer',
          'Communicate status via aria-label — don\'t rely on color alone',
        ]}
        dontItems={[
          'Don\'t use avatars for decorative images unrelated to identity',
          'Don\'t mix circle and square shapes in the same list',
          'Don\'t use low-resolution or stretched images',
          'Don\'t skip alt text or aria-labels',
          'Don\'t display more than 2 initials',
        ]}
      />

      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Container</td><td>Circular or square wrapper defining the avatar boundary</td></tr>
          <tr><td>2</td><td>Background</td><td>Visual fill when image is not available</td></tr>
          <tr><td>3</td><td>Content</td><td>Image, initials, icon, or numeric indicator</td></tr>
          <tr><td>4</td><td>Status Indicator</td><td>Optional presence dot (online, idle, offline)</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Alt text should be descriptive — include the person&apos;s name</li>
        <li>For initials, use first and last name initials (max 2 characters)</li>
        <li>Status indicators should supplement, not replace, text-based status</li>
        <li>In Avatar Groups, show the most relevant participants first</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>alt</td><td>Person&apos;s name</td><td>Descriptive text for image avatars</td></tr>
          <tr><td>aria-label</td><td>Person&apos;s name</td><td>For initials/icon variants without visible text</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter / Space</td><td>Focus and activate interactive avatars</td></tr>
          <tr><td>Focus ring</td><td>2px outline</td><td>Visible focus indicator with high contrast</td></tr>
          <tr><td>Status</td><td>aria-label includes status</td><td>e.g. &quot;John Doe (online)&quot;</td></tr>
          <tr><td>Contrast</td><td>≥ 4.5:1</td><td>Initials text against background</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Badge</strong> — For numeric indicators on other elements</li>
        <li><strong>Tooltip</strong> — Show full name on hover for small avatars</li>
        <li><strong>Status Indicator</strong> — Standalone status dots</li>
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
        <li>Added <code>numeric</code> variant for Avatar Group overflow</li>
        <li>Added <code>ghost</code> and <code>loading</code> states</li>
        <li>Added 7 status indicator colors</li>
        <li>Added <code>shape</code> prop with <code>circle</code> and <code>square</code> options</li>
        <li>Updated sizes: S (24px), M (28px), L (36px), XL (40px), XXL (48px)</li>
        <li>Improved accessibility with required alt text and aria-label support</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with Image, Initials, and Icon variants</li>
        <li>5 sizes: XSmall to XLarge</li>
        <li>Circle shape only</li>
        <li>Basic status indicators (online, offline, away)</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function AvatarPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Avatar"
      description="An avatar is a visual representation of a user or entity."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
