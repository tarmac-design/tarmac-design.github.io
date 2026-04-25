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
      <StorybookVariantViewer slug="avatar-group" />
    </>
  );
}

function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { Avatar, AvatarGroup } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface AvatarGroupProps {
  children: ReactNode;
  max?: number;           // Max visible avatars before overflow
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl';
  shape?: 'circle' | 'square';
  overlap?: number;       // Overlap percentage (default: 25)
  onOverflowClick?: () => void;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default group — shows 3, overflows the rest
<AvatarGroup max={3} size="m">
  <Avatar src="/photos/john.jpg" alt="John" />
  <Avatar src="/photos/jane.jpg" alt="Jane" />
  <Avatar initials="AB" />
  <Avatar initials="CD" />
  <Avatar initials="EF" />
</AvatarGroup>

// Square group for teams
<AvatarGroup max={4} size="l" shape="square">
  <Avatar src="/logos/team-a.png" alt="Team A" />
  <Avatar src="/logos/team-b.png" alt="Team B" />
  <Avatar src="/logos/team-c.png" alt="Team C" />
  <Avatar src="/logos/team-d.png" alt="Team D" />
  <Avatar src="/logos/team-e.png" alt="Team E" />
</AvatarGroup>

// With overflow click handler
<AvatarGroup max={3} onOverflowClick={() => openParticipantList()}>
  {participants.map(p => (
    <Avatar key={p.id} src={p.photo} alt={p.name} />
  ))}
</AvatarGroup>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>avatar-group-overlap</td><td>25%</td><td>Default overlap between avatars</td></tr>
          <tr><td>avatar-group-border</td><td>2px solid surface</td><td>Border between overlapping avatars</td></tr>
          <tr><td>avatar-group-z-index</td><td>auto (first on top)</td><td>Stacking order — first avatar is topmost</td></tr>
        </tbody>
      </table>
    </>
  );
}

function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Container</td><td>Flex wrapper with negative margin for overlap</td></tr>
          <tr><td>2</td><td>Avatar Items</td><td>Individual Avatar components stacked with z-index</td></tr>
          <tr><td>3</td><td>Overflow Indicator</td><td>Numeric avatar showing +N remaining count</td></tr>
          <tr><td>4</td><td>Border Ring</td><td>2px surface-colored border separating overlapping avatars</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To show multiple participants in a compact space (comments, tasks, channels)</li>
        <li>In headers or cards where space is limited</li>
        <li>To indicate collaboration or shared ownership</li>
        <li>In lists where showing all participants would be too wide</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="avatar-group"
        doItems={[
          'Set a reasonable max (3–5) to keep the group compact',
          'Show the most relevant participants first',
          'Use consistent size and shape within a group',
          'Provide an overflow click handler to show all participants',
          'Use the same avatar size as surrounding UI elements',
        ]}
        dontItems={[
          'Don\'t show more than 5–6 avatars without overflow',
          'Don\'t mix circle and square shapes in the same group',
          'Don\'t use different sizes within a single group',
          'Don\'t hide the overflow count — users need to know there are more',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>group</td><td>Container has role="group"</td></tr>
          <tr><td>aria-label</td><td>Participants</td><td>Describes the group purpose</td></tr>
          <tr><td>Overflow button</td><td>aria-label="+N more"</td><td>Announces remaining count</td></tr>
          <tr><td>Keyboard</td><td>Tab through avatars</td><td>Each avatar is focusable if interactive</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Avatar</strong> — Individual avatar component (parent)</li>
        <li><strong>Tooltip</strong> — Show full name on hover for small avatars in groups</li>
        <li><strong>Popover</strong> — Show full participant list on overflow click</li>
      </ul>
    </>
  );
}

function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added <code>onOverflowClick</code> callback</li>
        <li>Added <code>overlap</code> prop for custom overlap percentage</li>
        <li>Added square shape support</li>
        <li>Improved accessibility with role="group" and aria-label</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with circle avatars and numeric overflow</li>
        <li>Configurable max visible count</li>
        <li>5 size options</li>
      </ul>
    </>
  );
}

export default function AvatarGroupPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Avatar Group"
      description="Display multiple participants in a compact, overlapping layout with overflow indication."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
