'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="date-time-picker" />
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
      <pre><code>{`import { DateTimePicker } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface DateTimePickerProps {
  variant?: 'date' | 'time' | 'datetime' | 'range';
  value?: Date | null;
  rangeValue?: { start: Date | null; end: Date | null };
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale?: string;
  firstDayOfWeek?: 0 | 1;
  showTodayButton?: boolean;
  onChange?: (date: Date | null) => void;
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
  onCancel?: () => void;
  onApply?: () => void;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Date picker
<DateTimePicker
  variant="date"
  value={selectedDate}
  onChange={setSelectedDate}
/>

// Time picker
<DateTimePicker variant="time" value={selectedTime} onChange={setSelectedTime} />

// Date & Time combined
<DateTimePicker variant="datetime" value={selectedDateTime} onChange={setSelectedDateTime} />

// Range picker
<DateTimePicker
  variant="range"
  rangeValue={{ start: startDate, end: endDate }}
  onRangeChange={({ start, end }) => {
    setStartDate(start);
    setEndDate(end);
  }}
/>

// With constraints
<DateTimePicker
  variant="date"
  minDate={new Date('2024-01-01')}
  maxDate={new Date('2024-12-31')}
  disabledDates={holidays}
  onChange={setDate}
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>picker-border-radius</td><td>12px</td></tr>
          <tr><td>picker-cell-size</td><td>36px</td></tr>
          <tr><td>picker-accent-light</td><td>#2396FB</td></tr>
          <tr><td>picker-accent-dark</td><td>#60A5FA</td></tr>
          <tr><td>picker-range-bg-light</td><td>#E8F4FD</td></tr>
          <tr><td>picker-range-bg-dark</td><td>#1E3A5F</td></tr>
          <tr><td>picker-today-border</td><td>2px solid accent</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all date time picker variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-datetimepicker--playground" target="_blank" rel="noopener noreferrer">
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
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Header</td><td>Month/year label with navigation arrows</td></tr>
          <tr><td>2</td><td>Day Headers</td><td>Weekday abbreviation labels (Su–Sa)</td></tr>
          <tr><td>3</td><td>Calendar Grid</td><td>7×6 grid of selectable day cells</td></tr>
          <tr><td>4</td><td>Today Indicator</td><td>Border highlight on the current date</td></tr>
          <tr><td>5</td><td>Selected Indicator</td><td>Filled accent background on selected date</td></tr>
          <tr><td>6</td><td>Range Highlight</td><td>Subtle background between start and end dates</td></tr>
          <tr><td>7</td><td>Time Spinners</td><td>Hour and minute inputs with up/down controls</td></tr>
          <tr><td>8</td><td>Footer Actions</td><td>Cancel and Apply buttons</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>For scheduling events, appointments, or deadlines</li>
        <li>For filtering data by date or date range</li>
        <li>For setting delivery or pickup dates in e-commerce</li>
        <li>For time-based form inputs (birth date, expiry date)</li>
        <li>When users need to visually browse dates rather than type them</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="date-time-picker"
        doItems={[
          'Highlight today\'s date for orientation',
          'Show the selected date clearly with accent color',
          'Disable dates outside the valid range',
          'Allow keyboard navigation through the calendar grid',
          'Provide Cancel and Apply actions for confirmation',
        ]}
        dontItems={[
          'Don\'t use a calendar picker for known dates like birthdays — use a text input',
          'Don\'t allow selection of disabled or out-of-range dates',
          'Don\'t hide the month/year navigation controls',
          'Don\'t auto-close the picker on date selection without confirmation',
          'Don\'t use 12-hour format without an AM/PM toggle',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>grid</td><td>Calendar grid is identified as a data grid</td></tr>
          <tr><td>aria-label</td><td>&quot;Calendar&quot;</td><td>Descriptive label for the calendar region</td></tr>
          <tr><td>aria-selected</td><td>true/false</td><td>Indicates selected date cells</td></tr>
          <tr><td>aria-disabled</td><td>true</td><td>Marks disabled/out-of-range dates</td></tr>
          <tr><td>Keyboard</td><td>Arrow keys</td><td>Navigate between days in the grid</td></tr>
          <tr><td>Enter/Space</td><td>—</td><td>Select the focused date</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Input</strong> — Text input trigger that opens the picker</li>
        <li><strong>Dropdown</strong> — Month/year selection dropdowns</li>
        <li><strong>Button</strong> — Navigation and action buttons</li>
        <li><strong>Popups</strong> — Picker can appear as a popup overlay</li>
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
        <li>Added <code>range</code> variant for date range selection</li>
        <li>Added <code>datetime</code> variant combining calendar and time input</li>
        <li>Added <code>time</code> variant for time-only selection</li>
        <li>Added <code>minDate</code>, <code>maxDate</code>, and <code>disabledDates</code> props</li>
        <li>Improved keyboard navigation with arrow key support</li>
        <li>Added today highlight and month/year navigation</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with single date picker</li>
        <li>Calendar grid with month navigation</li>
        <li>Light and dark theme support</li>
        <li>Cancel and Apply footer actions</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function DateTimePickerPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Date Time Picker"
      description="Date Time Pickers allow users to select dates, times, or date ranges through an interactive calendar and time input interface."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
