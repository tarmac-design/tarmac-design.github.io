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
    changes: [{ category: 'Changed', items: ['Added Range picker variant for date ranges', 'Improved month/year navigation keyboard support', 'Fixed time selector scroll behavior on mobile'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of Date Time Picker component', 'Date only, Time only, and Date + Time variants', 'Calendar grid with month/year navigation', 'Footer actions for confirm/cancel'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Date Time Picker is an input component for selecting dates and/or times.
          It provides a calendar view for date selection and a time selector for
          hour/minute input, supporting various picker modes for different use cases.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Scheduling appointments or events</li>
          <li>Setting deadlines or due dates</li>
          <li>Filtering data by date ranges</li>
          <li>Selecting birth dates or registration dates</li>
          <li>Defining time windows for delivery or availability</li>
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
          The Date Time Picker component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Input Field</strong> — Text input showing selected date/time</li>
          <li><strong>Calendar Grid</strong> — Monthly grid of selectable day cells</li>
          <li><strong>Month/Year Navigation</strong> — Controls to change visible month/year</li>
          <li><strong>Time Selector</strong> — Hour and minute selection interface</li>
          <li><strong>Footer Actions</strong> — Confirm/Cancel buttons for the selection</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Date Only</strong> — Calendar grid for date selection</li>
          <li><strong>Time Only</strong> — Time selection without calendar</li>
          <li><strong>Date + Time</strong> — Combined date and time selection</li>
          <li><strong>Range Picker</strong> — Start and end date selection</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="date-time-picker" />
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
          Use the appropriate variant based on what data you need. Date-only for
          simple dates, Time-only for scheduling time slots, combined for full
          datetime requirements, and Range for periods.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When users need to select specific dates from a calendar</li>
          <li>For time-specific scheduling inputs</li>
          <li>When filtering by date ranges</li>
          <li>For form inputs requiring structured date/time data</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For known, specific dates — use a plain text input</li>
          <li>For relative dates ("last 7 days") — use preset filter chips</li>
          <li>For dates far in the past (birth year) — use a dropdown</li>
          <li>When only month/year is needed — use a simpler selector</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <GuidelineImage title="Date time picker usage guidelines" slug="component" section="guideline" />
        <div className="mt-6 space-y-4">
          <DoDont
            doItems={[
              'Show the selected date format clearly in the input',
              'Disable dates that are out of valid range',
              'Provide Today/Now shortcuts when relevant',
              'Support manual text input for keyboard users',
            ]}
            dontItems={[
              'Force users to click through months for distant dates',
              'Allow selecting invalid date combinations',
              'Hide the selected value until confirmation',
              'Use ambiguous date formats (MM/DD vs DD/MM)',
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
          <li><code>role="dialog"</code> on the calendar popup</li>
          <li><code>role="grid"</code> on the calendar date grid</li>
          <li><code>aria-label</code> on month/year navigation buttons</li>
          <li><code>aria-selected="true"</code> on the chosen date cell</li>
          <li><code>aria-disabled="true"</code> on out-of-range dates</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> — Opens the picker, selects a date</li>
          <li><kbd>Arrow keys</kbd> — Navigate between days in the grid</li>
          <li><kbd>Page Up/Down</kbd> — Navigate between months</li>
          <li><kbd>Home/End</kbd> — Jump to first/last day of the month</li>
          <li><kbd>Escape</kbd> — Closes the picker without selection</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Announces current month and year on navigation</li>
          <li>Each date cell announces the full date</li>
          <li>Selected state is communicated on date selection</li>
          <li>Disabled dates announce as unavailable</li>
          <li>Today&apos;s date is announced distinctly</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function DateTimePickerPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Date Time Picker"
      description="Input component for selecting dates and/or times. Provides calendar view and time selection."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
