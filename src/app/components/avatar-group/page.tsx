'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { GuidelineImage } from '@/components/GuidelineImage';
import { RoleToggle } from '@/components/RoleToggle';

const changelogEntries: ChangelogEntry[] = [
  {
    version: '1.1.2',
    date: 'June 2026',
    changes: [{ category: 'Changed', items: ['Added square shape support for individual avatars', 'Improved overflow counter styling', 'Fixed border ring overlap at small sizes'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Avatar Group component', 'Support for configurable max visible count', 'Three size options: Large, Medium, Small', 'Overflow counter with +N indicator'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Avatar Group displays a stack of overlapping avatars representing multiple users
          with an overflow indicator. It is used for team displays, shared ownership,
          and participant lists where space is limited.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Displaying team members on a project card</li>
          <li>Showing participants in a shared document or task</li>
          <li>Indicating multiple assignees on a work item</li>
          <li>Representing collaborators in activity feeds</li>
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
        <tr><td>Avatar Stack</td><td>Horizontally overlapping avatar items</td></tr>
        <tr><td>Overflow Counter</td><td>+N badge showing remaining hidden avatars</td></tr>
        <tr><td>Border Ring</td><td>White separator between overlapping items</td></tr>
      </tbody></table>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginTop: '1.5rem', marginBottom: '0.5rem', background: '#fff' }}>
        <iframe src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-avatar-group--playground&viewMode=story&shortcuts=false" style={{ width: '100%', height: '300px', border: 'none', display: 'block' }} title="avatar-group example" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
      </div>

      <h2>Sizes</h2>
      <table><thead><tr><th>Size</th><th>Description</th></tr></thead><tbody>
        <tr><td>Large (40px)</td><td>Cards and headers</td></tr>
        <tr><td>Medium (32px)</td><td>Default context</td></tr>
        <tr><td>Small (24px)</td><td>Compact lists and metadata</td></tr>
      </tbody></table>

      <h2>States</h2>
      <table><thead><tr><th>State</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default</td><td>Stacked avatars with overflow</td></tr>
        <tr><td>Ghost</td><td>Skeleton loading state</td></tr>
        <tr><td>Disabled</td><td>Non-interactive, muted</td></tr>
      </tbody></table>

      <StorybookVariantViewer slug="avatar-group" />
    </>
  );
}


function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <>
          <h2>Usage</h2>
          <p>Show multiple participants with overflow. Max 3–5 visible avatars.</p>
          <GuidelineImage title="Avatar Group layout" slug="avatar-group" section="usage" />

          <h2>When to Use</h2>
          <ul>
            <li>Team displays on project cards</li>
            <li>Shared items showing co-owners</li>
            <li>Participant lists in collaborative views</li>
          </ul>

          <h2>When Not to Use</h2>
          <ul>
            <li>Single user — use Avatar component directly</li>
            <li>When individual names matter more than visuals — use a list</li>
            <li>When all users must be visible without overflow</li>
          </ul>

          <h2>Do&apos;s and Don&apos;ts</h2>
          <DoDont slug="avatar-group"
            doItems={[
              'Set a reasonable max (3–5) to keep the group compact',
              'Show overflow count clearly (+N)',
              'Use consistent sizing across all avatars in the group',
              'Provide a tooltip or expandable list for overflow users',
            ]}
            dontItems={[
              "Don't show more than 5–6 without overflow",
              "Don't mix sizes within the same group",
              "Don't use for non-user entities",
              "Don't hide important user information behind overflow",
            ]}
          />
        </>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { AvatarGroup } from '@tarmac/design-system';`}</code></pre>

          <h2>Rules</h2>
          <table>
            <thead><tr><th>#</th><th>Rule</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Set <code>max</code> to control visible count — default 5</td></tr>
              <tr><td>2</td><td>Provide <code>onOverflowClick</code> handler to show full list</td></tr>
              <tr><td>3</td><td>Items array should include <code>name</code> for each entry</td></tr>
              <tr><td>4</td><td>Use same <code>size</code> for all items — never mix</td></tr>
            </tbody>
          </table>

          <h2>Props</h2>
          <table>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>items</td><td>AvatarProps[]</td><td>required</td><td>Array of avatar data objects</td></tr>
              <tr><td>max</td><td>number</td><td>5</td><td>Maximum visible avatars before overflow</td></tr>
              <tr><td>size</td><td>{`"sm" | "md" | "lg"`}</td><td>{`"md"`}</td><td>Size of each avatar in the group</td></tr>
              <tr><td>onOverflowClick</td><td>callback</td><td>undefined</td><td>Handler when +N overflow is clicked</td></tr>
            </tbody>
          </table>

          <h2>Basic Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<AvatarGroup items={teamMembers} max={4} />`}</code></pre>

          <h2>Advanced Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<AvatarGroup
  items={participants}
  max={3}
  size="sm"
  onOverflowClick={() => setShowAll(true)}
/>`}</code></pre>
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
          <li><code>role="group"</code> on the avatar stack container</li>
          <li><code>aria-label</code> describing the group (e.g., "Team members")</li>
          <li>Each avatar retains its own <code>aria-label</code> with user name</li>
          <li>Overflow counter has <code>aria-label</code> (e.g., "+3 more members")</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Group is focusable when interactive</li>
          <li><kbd>Tab</kbd> moves focus to the overflow counter if clickable</li>
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> activates overflow to show all users</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Announces the group label and number of members</li>
          <li>Each visible avatar is announced individually</li>
          <li>Overflow counter announces the remaining count</li>
          <li>Full member list is accessible via expanded view</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function AvatarGroupPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Avatar Group"
      description="Stack of overlapping avatars representing multiple users with overflow indicator. Used for team displays, shared ownership, and participants."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
