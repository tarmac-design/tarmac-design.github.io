'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { RoleToggle } from '@/components/RoleToggle';
import { GuidelineImage } from '@/components/GuidelineImage';

const changelogEntries: ChangelogEntry[] = [
  {
    version: '1.1.2',
    date: 'June 2026',
    changes: [{ category: 'Changed', items: ['Added Square variant option', 'Improved fallback initials rendering for long names', 'Fixed status dot positioning at XSmall size'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Avatar component', 'Support for Image, Initials, Numeric, and Icon variants', 'Five size options from XSmall to XLarge', 'Status dot and disabled states'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Avatar is a circular (or square) user representation that displays an image, initials,
          icon, or numeric value. It visually identifies users in profiles, comments, lists,
          and navigation elements throughout the application.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>User profile representation in headers and menus</li>
          <li>Comment and activity feed author identification</li>
          <li>Contact lists and participant indicators</li>
          <li>Navigation elements showing logged-in user</li>
          <li>Placeholder when user image is unavailable</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Availability</h2>
        <AvailabilityTable />
      </section>
    </div>
  );
}

function SpecsTab() {
  return (
    <>
      <h2>Component Structure</h2>
      <table><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody>
        <tr><td>Container</td><td>Circular or square frame holding the avatar content</td></tr>
        <tr><td>Image</td><td>User photo or placeholder</td></tr>
        <tr><td>Initials</td><td>First letter(s) when no image is available</td></tr>
        <tr><td>Status Dot</td><td>Online/offline/busy indicator</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-avatar--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="avatar example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>XLarge (64px)</td><td>Profile headers and cards</td></tr>
        <tr><td>Large (48px)</td><td>User lists and comments</td></tr>
        <tr><td>Medium (40px)</td><td>Default for most contexts</td></tr>
        <tr><td>Small (32px)</td><td>Compact lists</td></tr>
        <tr><td>XSmall (24px)</td><td>Dense metadata rows</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Standard display with image or initials</td></tr>
        <tr><td>With Status</td><td>Shows online/offline dot</td></tr>
        <tr><td>Disabled</td><td>Greyed out, non-interactive</td></tr>
        <tr><td>Ghost</td><td>Skeleton loading placeholder</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="avatar" />
    </>
  );
}


function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <>
          <h2>Usage</h2>
          <p>Represent users with image, initials, or icon. Always provide a fallback.</p>
          <GuidelineImage title="Avatar usage overview" slug="avatar" section="usage" />

          <h2>When to Use</h2>
          <GuidelineImage title="Avatar when to use" slug="avatar" section="when-to-use" />
          <ul>
            <li>User profiles and account menus</li>
            <li>Comment threads and activity feeds</li>
            <li>Contact lists and participant indicators</li>
            <li>Team displays and collaborative contexts</li>
          </ul>

          <h2>When Not to Use</h2>
          <GuidelineImage title="Avatar when not to use" slug="avatar" section="when-not-to-use" />
          <ul>
            <li>Decorative images — use Image component instead</li>
            <li>Product photos — use dedicated product imagery</li>
            <li>Brand logos — use Logo component</li>
          </ul>

          <h2>Do&apos;s and Don&apos;ts</h2>
          <DoDont slug="avatar"
            doItems={[
              'Use consistent sizes within the same context',
              'Always show a fallback (initials or icon) when image fails',
              'Pair with the user name when possible for clarity',
              'Use appropriate size for surrounding layout density',
            ]}
            dontItems={[
              "Don't use avatars for non-user content",
              "Don't mix sizes in a group or row",
              "Don't crop faces — ensure the image is properly centered",
              "Don't rely solely on image without fallback",
            ]}
          />
        </>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { Avatar } from '@tarmac/design-system';`}</code></pre>

          <h2>Rules</h2>
          <table>
            <thead><tr><th>#</th><th>Rule</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Always provide <code>name</code> for accessible label and initials fallback</td></tr>
              <tr><td>2</td><td>Handle image load failure with <code>onError</code> or <code>fallback</code></td></tr>
              <tr><td>3</td><td>Use <code>AvatarGroup</code> wrapper for stacked displays</td></tr>
              <tr><td>4</td><td>Icon-only avatars need explicit <code>aria-label</code></td></tr>
              <tr><td>5</td><td>Status dot requires both <code>status</code> prop and visible legend in context</td></tr>
            </tbody>
          </table>

          <h2>Props</h2>
          <table>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>src</td><td>string</td><td>undefined</td><td>URL of the user image</td></tr>
              <tr><td>name</td><td>string</td><td>required</td><td>User name — used for initials fallback and alt text</td></tr>
              <tr><td>size</td><td>{`"xs" | "sm" | "md" | "lg" | "xl"`}</td><td>{`"md"`}</td><td>Avatar diameter</td></tr>
              <tr><td>shape</td><td>{`"circle" | "square"`}</td><td>{`"circle"`}</td><td>Container shape</td></tr>
              <tr><td>status</td><td>{`"online" | "offline" | "busy" | "away"`}</td><td>undefined</td><td>Status dot indicator</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>Greyed out, non-interactive</td></tr>
              <tr><td>fallback</td><td>{`"initials" | "icon"`}</td><td>{`"initials"`}</td><td>Fallback display when image unavailable</td></tr>
            </tbody>
          </table>

          <h2>Basic Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Avatar name="Jane Doe" src="/avatars/jane.jpg" />`}</code></pre>

          <h2>Advanced Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<Avatar
  name="Support"
  fallback="icon"
  size="lg"
  status="online"
>
  <SupportIcon />
</Avatar>`}</code></pre>
        </>
      )}
    </RoleToggle>
  );
}

function AccessibilityTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">ARIA Attributes</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><code>role="img"</code> on the avatar container</li>
          <li><code>aria-label</code> with the user&apos;s name or descriptive text</li>
          <li><code>alt</code> attribute on image avatars with meaningful description</li>
          <li><code>aria-hidden="true"</code> on decorative avatar icons</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Avatar is not focusable by default (non-interactive)</li>
          <li>When used as a button (e.g., profile menu trigger), receives focus via <kbd>Tab</kbd></li>
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> activates interactive avatars</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Announces the user&apos;s name or descriptive label</li>
          <li>Status dot state is conveyed through sr-only text</li>
          <li>Initials-based avatars include full name in accessible label</li>
          <li>Decorative avatars are hidden from assistive technology</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function AvatarPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Avatar"
      description="Circular user representation showing image, initials, icon, or numeric value. Used in user profiles, comments, lists, and navigation."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
