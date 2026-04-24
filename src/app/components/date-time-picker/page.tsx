'use client';

import { useState, useEffect } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Types ── */
type PickerVariant = 'date' | 'time' | 'datetime' | 'range';

const selectStyle: React.CSSProperties = {
  padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
  background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
};

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/* ── Date Time Picker Demo ── */
function DateTimePickerDemo({
  theme,
  variant = 'date',
}: {
  theme: 'light' | 'dark';
  variant?: PickerVariant;
}) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [rangeEnd, setRangeEnd] = useState<number | null>(variant === 'range' ? Math.min(today.getDate() + 4, 28) : null);
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(30);

  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const fg = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const muted = theme === 'dark' ? '#666' : '#999';
  const accent = theme === 'dark' ? '#60A5FA' : '#2396FB';
  const todayBorder = theme === 'dark' ? '#60A5FA' : '#2396FB';
  const hoverBg = theme === 'dark' ? '#3A3A3A' : '#F0F0F0';
  const rangeBg = theme === 'dark' ? '#1E3A5F' : '#E8F4FD';
  const borderColor = theme === 'dark' ? '#333' : '#E0E0E0';

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = today.getDate();
  const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const handleDayClick = (day: number) => {
    if (variant === 'range') {
      if (!rangeEnd || day < selectedDay) {
        setSelectedDay(day);
        setRangeEnd(null);
      } else {
        setRangeEnd(day);
      }
    } else {
      setSelectedDay(day);
    }
  };

  const isInRange = (day: number) => {
    if (variant !== 'range' || !rangeEnd) return false;
    return day > selectedDay && day < rangeEnd;
  };

  const isRangeStart = (day: number) => variant === 'range' && day === selectedDay;
  const isRangeEnd = (day: number) => variant === 'range' && day === rangeEnd;

  return (
    <div style={{ background: bg, borderRadius: 12, border: `1px solid ${borderColor}`, width: 280, overflow: 'hidden' }}>
      {/* Header with month/year nav */}
      {variant !== 'time' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${borderColor}` }}>
            <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: fg, padding: '2px 6px' }}>‹</button>
            <span style={{ fontSize: 13, fontWeight: 600, color: fg }}>{MONTHS[month]} {year}</span>
            <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: fg, padding: '2px 6px' }}>›</button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '8px 12px 4px', gap: 0 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, color: muted, padding: '4px 0' }}>{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 12px 12px', gap: 0 }}>
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = day === selectedDay;
              const isToday = isCurrentMonth && day === todayDate;
              const inRange = isInRange(day);
              const rStart = isRangeStart(day);
              const rEnd = isRangeEnd(day);

              let cellBg = 'transparent';
              let cellColor = fg;
              let cellBorder = 'none';
              let cellRadius = '50%';

              if (isSelected || rStart || rEnd) {
                cellBg = accent;
                cellColor = '#FFF';
              } else if (inRange) {
                cellBg = rangeBg;
                cellRadius = '0';
              } else if (isToday) {
                cellBorder = `2px solid ${todayBorder}`;
              }

              if (rStart) cellRadius = '50% 0 0 50%';
              if (rEnd) cellRadius = '0 50% 50% 0';

              return (
                <div
                  key={day}
                  onClick={() => handleDayClick(day)}
                  style={{
                    textAlign: 'center', fontSize: 12, padding: '6px 0',
                    cursor: 'pointer', borderRadius: cellRadius,
                    background: cellBg, color: cellColor, border: cellBorder,
                    fontWeight: isToday || isSelected ? 600 : 400,
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => {
                    if (!isSelected && !inRange && !rStart && !rEnd) {
                      (e.target as HTMLElement).style.background = hoverBg;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected && !inRange && !rStart && !rEnd) {
                      (e.target as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Time picker */}
      {(variant === 'time' || variant === 'datetime') && (
        <div style={{ padding: '12px 16px', borderTop: variant === 'datetime' ? `1px solid ${borderColor}` : 'none' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: fg, marginBottom: 8 }}>Time</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <button onClick={() => setHour(h => (h + 1) % 24)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, color: muted }}>▲</button>
              <div style={{ width: 40, textAlign: 'center', padding: '6px 0', borderRadius: 6, background: theme === 'dark' ? '#3A3A3A' : '#F0F0F0', fontSize: 16, fontWeight: 600, color: fg }}>
                {hour.toString().padStart(2, '0')}
              </div>
              <button onClick={() => setHour(h => (h - 1 + 24) % 24)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, color: muted }}>▼</button>
            </div>
            <span style={{ fontSize: 18, fontWeight: 600, color: fg }}>:</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <button onClick={() => setMinute(m => (m + 5) % 60)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, color: muted }}>▲</button>
              <div style={{ width: 40, textAlign: 'center', padding: '6px 0', borderRadius: 6, background: theme === 'dark' ? '#3A3A3A' : '#F0F0F0', fontSize: 16, fontWeight: 600, color: fg }}>
                {minute.toString().padStart(2, '0')}
              </div>
              <button onClick={() => setMinute(m => (m - 5 + 60) % 60)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, color: muted }}>▼</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '8px 16px 12px', borderTop: `1px solid ${borderColor}` }}>
        <button style={{ padding: '5px 14px', borderRadius: 6, fontSize: 11, fontWeight: 500, background: 'transparent', color: muted, border: `1px solid ${borderColor}`, cursor: 'pointer' }}>Cancel</button>
        <button style={{ padding: '5px 14px', borderRadius: 6, fontSize: 11, fontWeight: 500, background: accent, color: '#FFF', border: 'none', cursor: 'pointer' }}>Apply</button>
      </div>
    </div>
  );
}

/* ── Custom Example Section ── */
function DateTimeExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { theme: 'light' | 'dark'; variant: PickerVariant }) => React.ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState<PickerVariant>('date');
  useEffect(() => { setTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);
  const bg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>{title}</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>{desc}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <select value={variant} onChange={e => setVariant(e.target.value as PickerVariant)} style={selectStyle}>
          <option value="date">Date Only</option>
          <option value="time">Time Only</option>
          <option value="datetime">Date &amp; Time</option>
          <option value="range">Range Picker</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children({ theme, variant })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-datepicker--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-datepicker--playground"
        height={420}
        title="Date Time Picker — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        The Date Time Picker allows users to select dates, times, or date-time combinations
        through an interactive calendar and time input interface. It supports single date selection,
        time-only mode, combined date-time, and date range picking.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Date Only, Time Only, Date &amp; Time, Range Picker</td></tr>
          <tr><td>Features</td><td>Month/year navigation, Today highlight, Selected highlight, Range selection</td></tr>
          <tr><td>Time Input</td><td>Hour/minute spinners with up/down controls</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <DateTimeExampleSection
        title="Date Time Picker Variants"
        desc="Switch between Date Only, Time Only, Date & Time, and Range Picker. Click dates to select, use arrows to navigate months."
      >
        {({ theme, variant }) => (
          <DateTimePickerDemo theme={theme} variant={variant} />
        )}
      </DateTimeExampleSection>

      <h2>Side by Side</h2>

      <DateTimeExampleSection
        title="Date vs Range"
        desc="Compare single date selection with range selection side by side."
      >
        {({ theme }) => (
          <>
            <DateTimePickerDemo theme={theme} variant="date" />
            <DateTimePickerDemo theme={theme} variant="range" />
          </>
        )}
      </DateTimeExampleSection>

      <h2>Time Picker</h2>

      <DateTimeExampleSection
        title="Time Input"
        desc="The time picker uses hour/minute spinners. Click the arrows to adjust values."
      >
        {({ theme }) => (
          <>
            <DateTimePickerDemo theme={theme} variant="time" />
            <DateTimePickerDemo theme={theme} variant="datetime" />
          </>
        )}
      </DateTimeExampleSection>
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
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
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
