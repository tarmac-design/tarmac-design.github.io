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
      'Added Square variant option',
      'Improved fallback initials rendering for long names',
      'Fixed status dot positioning at XSmall size',
    ],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [
      'Initial release of Avatar component',
      'Support for Image, Initials, Numeric, and Icon variants',
      'Five size options from XSmall to XLarge',
      'Status dot and disabled states',
    ],
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
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Anatomy</h2>
        <p className="text-gray-700 mb-4">
          The Avatar component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Container</strong> — Circular or square frame holding the avatar content</li>
          <li><strong>Image/Initials/Icon</strong> — Primary visual content of the avatar</li>
          <li><strong>Status Dot</strong> — Optional indicator showing online/offline/busy state</li>
          <li><strong>Border Ring</strong> — Optional border ring for emphasis or grouping context</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Image</strong> — Displays a user photo or uploaded image</li>
          <li><strong>Initials</strong> — Shows first/last name initials as text</li>
          <li><strong>Numeric</strong> — Displays a number (e.g., for overflow counts)</li>
          <li><strong>Icon</strong> — Shows a generic user or custom icon</li>
          <li><strong>Square</strong> — Square-shaped variant for non-user entities</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>XLarge</strong> — 64px, used for profile pages and hero sections</li>
          <li><strong>Large</strong> — 48px, used for cards and detail views</li>
          <li><strong>Medium</strong> — 40px, default size for most contexts</li>
          <li><strong>Small</strong> — 32px, used in lists and compact layouts</li>
          <li><strong>XSmall</strong> — 24px, used in inline text and tight spaces</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">States</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Default</strong> — Standard display state</li>
          <li><strong>With Status Dot</strong> — Shows online/offline/busy indicator</li>
          <li><strong>Disabled</strong> — Reduced opacity, non-interactive</li>
          <li><strong>Ghost</strong> — Loading/skeleton placeholder</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="avatar" />
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
          Use avatars to visually represent users and entities. Always provide fallback content
          (initials or icon) for when images fail to load.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>To identify users in lists, comments, or profiles</li>
          <li>To show participants in collaborative contexts</li>
          <li>As a visual anchor for user-related content</li>
          <li>In navigation to indicate the logged-in user</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For decorative images — use Image component instead</li>
          <li>For brand logos — use Logo component instead</li>
          <li>For icons without user context — use Icon component</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage
          src="/assets/guidelines/avatar-sizing.png"
          alt="Avatar sizing guidelines"
        />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Always provide a fallback (initials or icon) for missing images',
              'Use consistent sizes within the same context',
              'Use the appropriate size for the surrounding layout',
              'Include alt text describing the user for accessibility',
            ]}
            dontItems={[
              'Use avatars for decorative purposes without user context',
              'Mix different avatar sizes in the same row or list',
              'Rely solely on the image without a fallback',
              'Use extremely large avatars in compact layouts',
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
