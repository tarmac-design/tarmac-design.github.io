'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { GuidelineImage } from '@/components/GuidelineImage';

const changelogEntries: ChangelogEntry[] = [
  {
    version: '1.1.2',
    date: 'June 2026',
    changes: [
      'Added square shape support for individual avatars',
      'Improved overflow counter styling',
      'Fixed border ring overlap at small sizes',
    ],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [
      'Initial release of Avatar Group component',
      'Support for configurable max visible count',
      'Three size options: Large, Medium, Small',
      'Overflow counter with +N indicator',
    ],
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
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Anatomy</h2>
        <p className="text-gray-700 mb-4">
          The Avatar Group component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Avatar Stack</strong> — Container holding overlapping avatars</li>
          <li><strong>Individual Avatar</strong> — Each user avatar in the group</li>
          <li><strong>Overflow Counter (+N)</strong> — Badge showing remaining count</li>
          <li><strong>Border Ring</strong> — White ring separating overlapping avatars</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Large</strong> — 40px avatars, suitable for cards and headers</li>
          <li><strong>Medium</strong> — 32px avatars, default for most contexts</li>
          <li><strong>Small</strong> — 24px avatars, compact lists and tight spaces</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Properties</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>max</strong> — Maximum number of visible avatars before overflow</li>
          <li><strong>size</strong> — Size of individual avatars (Large, Medium, Small)</li>
          <li><strong>items</strong> — Array of avatar data (image, name, etc.)</li>
          <li><strong>shapes</strong> — Circle or square shape for individual avatars</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="avatar-group" />
      </section>
    </div>
  );
}

function GuidelinesTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Usage Guidelines</h2>
        <p className="text-gray-700 mb-4">
          Use Avatar Group to display multiple users in a compact, overlapping layout.
          Set a reasonable max count to prevent visual clutter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Showing team members or participants in a compact space</li>
          <li>Indicating shared ownership on cards or list items</li>
          <li>Displaying collaborators in activity or document views</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When each user needs individual actions — use a list instead</li>
          <li>For a single user — use Avatar component directly</li>
          <li>When all users must be visible without overflow</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage
          src="/assets/guidelines/avatar-group-layout.png"
          alt="Avatar group layout guidelines"
        />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Set a reasonable max count (3-5) to keep the group compact',
              'Use consistent avatar sizes within a group',
              'Provide a tooltip or expandable list for overflow users',
              'Maintain consistent overlap spacing',
            ]}
            dontItems={[
              'Display too many avatars without overflow',
              'Mix different avatar sizes in the same group',
              'Use avatar groups for non-user entities',
              'Hide important user information behind overflow',
            ]}
          />
        </div>
      </section>
    </div>
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
