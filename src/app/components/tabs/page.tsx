'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Variant colors ── */
const variantColors: Record<string, string> = {
  black: '#0D0D0D',
  blue: '#2396FB',
  'dlv-red': '#ED1B36',
  coal: '#525252',
  green: '#1BA86E',
};

const variantLabels: Record<string, string> = {
  black: 'Black',
  blue: 'Blue',
  'dlv-red': 'DLV Red',
  coal: 'Coal',
  green: 'Green',
};

/* ── Icons ── */
function HomeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1L1 7h2v6h4V9h2v4h4V7h2L8 1z" />
    </svg>
  );
}

function StarIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .5l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.1 3.8 13.5l.8-4.7L1.2 5.5l4.7-.7z" />
    </svg>
  );
}

function GearIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0a1 1 0 011 1v1.07A5.5 5.5 0 0111.93 5H13a1 1 0 110 2h-1.07A5.5 5.5 0 019 9.93V11a1 1 0 11-2 0V9.93A5.5 5.5 0 014.07 7H3a1 1 0 010-2h1.07A5.5 5.5 0 017 2.07V1a1 1 0 011-1zm0 4a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}

function UserIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 1c-3.31 0-6 1.79-6 4v1h12v-1c0-2.21-2.69-4-6-4z" />
    </svg>
  );
}

/* ── TabsProps interface ── */
interface TabItem {
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  variant?: string;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'lg';
}

/* ── TabsDemo component ── */
function TabsDemo({
  items,
  activeIndex: controlledIndex,
  onChange,
  variant = 'black',
  orientation = 'horizontal',
  size = 'lg',
  theme,
}: TabsProps & { theme: 'light' | 'dark' }) {
  const [internalIndex, setInternalIndex] = useState(controlledIndex ?? 0);
  const active = controlledIndex ?? internalIndex;

  const accentColor = variantColors[variant] || variantColors.black;
  const isVertical = orientation === 'vertical';
  const fontSize = size === 'sm' ? 13 : 15;
  const padding = size === 'sm' ? '6px 12px' : '10px 16px';

  const inactiveColor = theme === 'dark' ? '#999' : '#666';
  const disabledColor = theme === 'dark' ? '#555' : '#bbb';
  const borderColor = theme === 'dark' ? '#333' : '#e0e0e0';

  const handleClick = (i: number) => {
    if (items[i].disabled) return;
    setInternalIndex(i);
    onChange?.(i);
  };

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      style={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        gap: 0,
        position: 'relative',
        ...(isVertical
          ? { borderLeft: `2px solid ${borderColor}` }
          : { borderBottom: `2px solid ${borderColor}` }),
      }}
    >
      {items.map((item, i) => {
        const isActive = active === i;
        const isDisabled = !!item.disabled;

        return (
          <button
            key={i}
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
            onClick={() => handleClick(i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding,
              fontSize,
              fontWeight: isActive ? 600 : 400,
              color: isDisabled
                ? disabledColor
                : isActive
                  ? accentColor
                  : inactiveColor,
              background: 'transparent',
              border: 'none',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              position: 'relative',
              transition: 'color 0.2s ease',
              opacity: isDisabled ? 0.5 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {item.icon && (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </span>
            )}
            {item.label}
            {/* Active indicator */}
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  ...(isVertical
                    ? { left: -2, top: 0, bottom: 0, width: 2 }
                    : { bottom: -2, left: 0, right: 0, height: 2 }),
                  background: accentColor,
                  borderRadius: 1,
                  transition: 'all 0.2s ease',
                }}
              />
            )}
          </button>
        );
      })}
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
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-tabs-tabgroup--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-tabs-tabgroup--playground"
        height={420}
        title="Tabs — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        Tabs organize content into separate views where only one view is visible
        at a time. They provide a compact navigation pattern for switching between
        related content panels.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Orientations</td><td>Horizontal (bottom border), Vertical (left border)</td></tr>
          <tr><td>Variants</td><td>Black, Blue, DLV Red, Coal, Green</td></tr>
          <tr><td>Sizes</td><td>Small, Large</td></tr>
          <tr><td>Features</td><td>With icons, With divider, Scrollable, Editable</td></tr>
          <tr><td>States</td><td>Default, Active, Hover, Disabled</td></tr>
        </tbody>
      </table>

      <h2>Horizontal</h2>

      <ComponentExampleSection
        title="Horizontal Tabs"
        desc="Default horizontal tab bar with a 2px bottom border indicator on the active tab."
      >
        {({ theme }) => (
          <div style={{ width: '100%' }}>
            {Object.keys(variantColors).map((v) => (
              <div key={v} style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 12, color: theme === 'dark' ? '#888' : '#666', marginBottom: 6 }}>
                  {variantLabels[v]}
                </p>
                <TabsDemo
                  items={[
                    { label: 'Overview' },
                    { label: 'Features' },
                    { label: 'Pricing' },
                    { label: 'Reviews' },
                  ]}
                  variant={v}
                  theme={theme as 'light' | 'dark'}
                />
              </div>
            ))}
          </div>
        )}
      </ComponentExampleSection>

      <h2>Vertical</h2>

      <ComponentExampleSection
        title="Vertical Tabs"
        desc="Vertical orientation with a left border indicator. Useful for side navigation patterns."
      >
        {({ theme }) => (
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', width: '100%' }}>
            {(['black', 'blue', 'dlv-red'] as const).map((v) => (
              <div key={v}>
                <p style={{ fontSize: 12, color: theme === 'dark' ? '#888' : '#666', marginBottom: 6 }}>
                  {variantLabels[v]}
                </p>
                <TabsDemo
                  items={[
                    { label: 'General' },
                    { label: 'Security' },
                    { label: 'Notifications' },
                    { label: 'Billing' },
                  ]}
                  variant={v}
                  orientation="vertical"
                  theme={theme as 'light' | 'dark'}
                />
              </div>
            ))}
          </div>
        )}
      </ComponentExampleSection>

      <h2>With Icons</h2>

      <ComponentExampleSection
        title="Tabs with Leading Icons"
        desc="Icons provide additional visual context alongside tab labels."
      >
        {({ theme }) => (
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: 20 }}>
              <TabsDemo
                items={[
                  { label: 'Home', icon: <HomeIcon /> },
                  { label: 'Favorites', icon: <StarIcon /> },
                  { label: 'Settings', icon: <GearIcon /> },
                  { label: 'Profile', icon: <UserIcon /> },
                ]}
                variant="blue"
                theme={theme as 'light' | 'dark'}
              />
            </div>
            <div>
              <TabsDemo
                items={[
                  { label: 'Home', icon: <HomeIcon /> },
                  { label: 'Favorites', icon: <StarIcon /> },
                  { label: 'Settings', icon: <GearIcon /> },
                  { label: 'Profile', icon: <UserIcon /> },
                ]}
                variant="dlv-red"
                orientation="vertical"
                theme={theme as 'light' | 'dark'}
              />
            </div>
          </div>
        )}
      </ComponentExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Small tabs for dense layouts, Large tabs as the default for standard interfaces."
      >
        {({ theme }) => (
          <div style={{ width: '100%' }}>
            <p style={{ fontSize: 12, color: theme === 'dark' ? '#888' : '#666', marginBottom: 6 }}>Small</p>
            <div style={{ marginBottom: 20 }}>
              <TabsDemo
                items={[
                  { label: 'Overview' },
                  { label: 'Details' },
                  { label: 'History' },
                ]}
                size="sm"
                variant="blue"
                theme={theme as 'light' | 'dark'}
              />
            </div>
            <p style={{ fontSize: 12, color: theme === 'dark' ? '#888' : '#666', marginBottom: 6 }}>Large</p>
            <TabsDemo
              items={[
                { label: 'Overview' },
                { label: 'Details' },
                { label: 'History' },
              ]}
              size="lg"
              variant="blue"
              theme={theme as 'light' | 'dark'}
            />
          </div>
        )}
      </ComponentExampleSection>

      <h2>Disabled</h2>

      <ComponentExampleSection
        title="Disabled Tabs"
        desc="Individual tabs can be disabled to prevent interaction while keeping them visible."
      >
        {({ theme }) => (
          <div style={{ width: '100%' }}>
            <TabsDemo
              items={[
                { label: 'Active Tab' },
                { label: 'Normal Tab' },
                { label: 'Disabled Tab', disabled: true },
                { label: 'Also Disabled', disabled: true },
              ]}
              variant="black"
              theme={theme as 'light' | 'dark'}
            />
          </div>
        )}
      </ComponentExampleSection>
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
      <pre><code>{`import { Tabs } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface TabsProps {
  items: {
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
  }[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  variant?: 'black' | 'blue' | 'dlv-red' | 'coal' | 'green';
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'lg';
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default horizontal tabs
<Tabs
  items={[
    { label: 'Overview' },
    { label: 'Features' },
    { label: 'Pricing' },
  ]}
  onChange={(index) => console.log('Active:', index)}
/>

// Vertical orientation
<Tabs
  items={[
    { label: 'General' },
    { label: 'Security' },
    { label: 'Notifications' },
  ]}
  orientation="vertical"
  variant="blue"
/>

// With icons
<Tabs
  items={[
    { label: 'Home', icon: <HomeIcon /> },
    { label: 'Settings', icon: <GearIcon /> },
    { label: 'Profile', icon: <UserIcon /> },
  ]}
  variant="dlv-red"
/>

// With disabled tabs
<Tabs
  items={[
    { label: 'Active' },
    { label: 'Normal' },
    { label: 'Disabled', disabled: true },
  ]}
/>

// Small size
<Tabs
  items={[
    { label: 'Tab 1' },
    { label: 'Tab 2' },
  ]}
  size="sm"
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>tab-height-sm</td><td>36px</td></tr>
          <tr><td>tab-height-lg</td><td>48px</td></tr>
          <tr><td>tab-indicator-height</td><td>2px</td></tr>
          <tr><td>tab-font-size-sm</td><td>13px</td></tr>
          <tr><td>tab-font-size-lg</td><td>15px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Active Color</th></tr></thead>
        <tbody>
          <tr><td>Black</td><td>#0D0D0D</td></tr>
          <tr><td>Blue</td><td>#2396FB</td></tr>
          <tr><td>DLV Red</td><td>#ED1B36</td></tr>
          <tr><td>Coal</td><td>#525252</td></tr>
          <tr><td>Green</td><td>#1BA86E</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all tab variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-tabs--playground" target="_blank" rel="noopener noreferrer">
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
          <tr><td>1</td><td>Tab List</td><td>Container for all tab triggers with role=&quot;tablist&quot;</td></tr>
          <tr><td>2</td><td>Tab Button</td><td>Individual clickable tab trigger</td></tr>
          <tr><td>3</td><td>Icon</td><td>Optional leading icon for visual context</td></tr>
          <tr><td>4</td><td>Label</td><td>Text label for the tab</td></tr>
          <tr><td>5</td><td>Active Indicator</td><td>2px border line showing the active tab</td></tr>
          <tr><td>6</td><td>Tab Panel</td><td>Content area for the active tab</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To organize related content into separate views</li>
        <li>When only one content panel should be visible at a time</li>
        <li>For settings pages with multiple categories</li>
        <li>To switch between data views (table, chart, list)</li>
        <li>For product detail pages with sections</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="tabs"
        doItems={[
          'Use tabs for switching between related content views',
          'Keep tab labels short and scannable (1–2 words)',
          'Show the active tab clearly with the indicator line',
          'Use consistent icon sizing when using icons',
          'Maintain tab content state when switching between tabs',
        ]}
        dontItems={[
          'Don\'t use tabs for sequential steps — use a Stepper instead',
          'Don\'t use more than 6 tabs without scrollable behavior',
          'Don\'t nest tabs inside tabs',
          'Don\'t use tabs for primary navigation — use a Navigation component',
          'Don\'t mix icon tabs and text-only tabs in the same group',
        ]}
      />

      <h2>Orientation Guide</h2>
      <table>
        <thead><tr><th>Orientation</th><th>Use Case</th><th>Indicator</th></tr></thead>
        <tbody>
          <tr><td>Horizontal</td><td>Primary content switching, top of content area</td><td>Bottom border (2px)</td></tr>
          <tr><td>Vertical</td><td>Side navigation, settings panels, filters</td><td>Left border (2px)</td></tr>
        </tbody>
      </table>

      <h2>Content Guidelines</h2>
      <ul>
        <li>Labels should be 1–2 words maximum</li>
        <li>Use title case for tab labels (e.g., &quot;My Account&quot;)</li>
        <li>Icons should reinforce the label meaning, not replace it</li>
        <li>Disabled tabs should have a clear reason communicated to the user</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>tablist / tab / tabpanel</td><td>ARIA tabs pattern</td></tr>
          <tr><td>aria-selected</td><td>true | false</td><td>Indicates the active tab</td></tr>
          <tr><td>aria-disabled</td><td>true | false</td><td>Indicates a disabled tab</td></tr>
          <tr><td>aria-orientation</td><td>horizontal | vertical</td><td>Orientation of the tab list</td></tr>
          <tr><td>Keyboard</td><td>Arrow Left / Right</td><td>Navigate horizontal tabs</td></tr>
          <tr><td>Keyboard</td><td>Arrow Up / Down</td><td>Navigate vertical tabs</td></tr>
          <tr><td>Keyboard</td><td>Home / End</td><td>Jump to first or last tab</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Navigation</strong> — For primary app-level navigation</li>
        <li><strong>Stepper</strong> — For sequential multi-step flows</li>
        <li><strong>Accordion</strong> — For expandable content sections</li>
        <li><strong>Breadcrumbs</strong> — For hierarchical page navigation</li>
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
        <li>Added vertical orientation with left border indicator</li>
        <li>Added 5 color variants: Black, Blue, DLV Red, Coal, Green</li>
        <li>Added small and large size options</li>
        <li>Added icon support for tab items</li>
        <li>Added disabled state for individual tabs</li>
        <li>Added scrollable tab behavior for overflow</li>
        <li>Added editable tab labels</li>
        <li>Improved ARIA support with aria-orientation and aria-disabled</li>
        <li>Smooth transition animations on tab switch</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with horizontal underline tabs</li>
        <li>Basic active/inactive states</li>
        <li>Keyboard navigation with arrow keys</li>
        <li>Single color variant</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function TabsPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Tabs"
      description="Tabs organize content into separate views where only one view is visible at a time. They provide navigation between content panels with an active indicator."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
