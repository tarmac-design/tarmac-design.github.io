'use client';

import { useState, useEffect } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Pagination variant colors ── */
const variantColors: Record<string, { bg: string; text: string }> = {
  black:     { bg: '#0D0D0D', text: '#FFF' },
  blue:      { bg: '#2396FB', text: '#FFF' },
  'dlv-red': { bg: '#ED1B36', text: '#FFF' },
};

const variantLabels: Record<string, string> = {
  black: 'Black',
  blue: 'Blue',
  'dlv-red': 'DLV Red',
};

const sizeMap: Record<string, { height: number; fontSize: number; padding: number }> = {
  sm: { height: 28, fontSize: 12, padding: 6 },
  md: { height: 36, fontSize: 14, padding: 8 },
};

/* ── Helpers ── */
function getPageRange(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | 'ellipsis')[] = [];
  pages.push(1);
  if (current > 3) pages.push('ellipsis');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push('ellipsis');
  pages.push(total);
  return pages;
}

/* ── Chevron Icons ── */
function ChevronLeft({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 4L6 8l4 4" />
    </svg>
  );
}

function ChevronRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

/* ── PaginationDemo ── */
function PaginationDemo({
  totalPages = 10,
  initialPage = 1,
  variant = 'black',
  size = 'md',
  showPrevNext = true,
  showDivider = false,
  disabled = false,
  theme,
}: {
  totalPages?: number;
  initialPage?: number;
  variant?: string;
  size?: 'sm' | 'md';
  showPrevNext?: boolean;
  showDivider?: boolean;
  disabled?: boolean;
  theme: 'light' | 'dark';
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => { setCurrentPage(initialPage); }, [initialPage]);

  const colors = variantColors[variant] || variantColors.black;
  const sz = sizeMap[size] || sizeMap.md;
  const pages = getPageRange(currentPage, totalPages);
  const isDark = theme === 'dark';

  const baseBg = isDark ? '#2A2A2A' : '#FFF';
  const baseBorder = isDark ? '#444' : '#E0E0E0';
  const baseText = isDark ? '#CCC' : '#333';
  const hoverBg = isDark ? '#3A3A3A' : '#F0F0F0';
  const disabledColor = isDark ? '#555' : '#BBB';

  const cellStyle = (
    isActive: boolean,
    isDisabled: boolean,
    itemKey: string,
  ): React.CSSProperties => ({
    width: sz.height,
    height: sz.height,
    borderRadius: 6,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: sz.fontSize,
    fontWeight: isActive ? 700 : 500,
    cursor: isDisabled || disabled ? 'not-allowed' : 'pointer',
    background: isActive ? colors.bg : hoveredItem === itemKey && !isDisabled && !disabled ? hoverBg : baseBg,
    color: isActive ? colors.text : isDisabled || disabled ? disabledColor : baseText,
    border: `1px solid ${isActive ? colors.bg : baseBorder}`,
    transition: 'all 0.15s ease',
    opacity: disabled ? 0.5 : 1,
    userSelect: 'none',
  });

  const textCellStyle = (
    isDisabled: boolean,
    itemKey: string,
  ): React.CSSProperties => ({
    height: sz.height,
    borderRadius: 6,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `0 ${sz.padding + 4}px`,
    fontSize: sz.fontSize,
    fontWeight: 500,
    cursor: isDisabled || disabled ? 'not-allowed' : 'pointer',
    background: hoveredItem === itemKey && !isDisabled && !disabled ? hoverBg : baseBg,
    color: isDisabled || disabled ? disabledColor : baseText,
    border: `1px solid ${baseBorder}`,
    transition: 'all 0.15s ease',
    opacity: disabled ? 0.5 : 1,
    userSelect: 'none',
    gap: 4,
  });

  const handlePageClick = (page: number) => {
    if (disabled) return;
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const dividerEl = showDivider ? (
    <span style={{ width: 1, height: sz.height - 8, background: baseBorder, margin: '0 2px' }} />
  ) : null;

  return (
    <nav aria-label="Pagination" role="navigation" style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
      {showPrevNext && (
        <>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1 || disabled}
            aria-label="Previous page"
            aria-disabled={currentPage === 1 || disabled}
            style={textCellStyle(currentPage === 1, 'prev')}
            onMouseEnter={() => setHoveredItem('prev')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <ChevronLeft size={sz.fontSize} />
            Prev
          </button>
          {dividerEl}
        </>
      )}

      {pages.map((page, idx) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${idx}`}
            style={{
              width: sz.height,
              height: sz.height,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: sz.fontSize,
              color: baseText,
              userSelect: 'none',
            }}
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            style={cellStyle(page === currentPage, false, `page-${page}`)}
            onMouseEnter={() => setHoveredItem(`page-${page}`)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {page}
          </button>
        ),
      )}

      {showPrevNext && (
        <>
          {dividerEl}
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages || disabled}
            aria-label="Next page"
            aria-disabled={currentPage === totalPages || disabled}
            style={textCellStyle(currentPage === totalPages, 'next')}
            onMouseEnter={() => setHoveredItem('next')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Next
            <ChevronRight size={sz.fontSize} />
          </button>
        </>
      )}
    </nav>
  );
}

/* ── Custom example section with variant + divider controls ── */
function PaginationExampleSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: (props: { size: 'sm' | 'md'; theme: 'light' | 'dark'; variant: string; showDivider: boolean }) => React.ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState<'sm' | 'md'>('md');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState('black');
  const [showDivider, setShowDivider] = useState(false);

  useEffect(() => { setTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);

  const bg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';
  const selectStyle: React.CSSProperties = {
    padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
    background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>{title}</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>{desc}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12, alignItems: 'center' }}>
        <select value={size} onChange={e => setSize(e.target.value as 'sm' | 'md')} style={selectStyle}>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
        </select>
        <select value={variant} onChange={e => setVariant(e.target.value)} style={selectStyle}>
          {Object.keys(variantColors).map(v => (
            <option key={v} value={v}>{variantLabels[v]}</option>
          ))}
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-on-surface)', cursor: 'pointer' }}>
          <input type="checkbox" checked={showDivider} onChange={e => setShowDivider(e.target.checked)} />
          Divider
        </label>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        {children({ size, theme, variant, showDivider })}
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
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-pagination--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-pagination--playground"
        height={420}
        title="Pagination — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        Pagination provides page navigation controls for paginated content. It renders a row
        of page number buttons with optional prev/next arrows, ellipsis for large ranges, and
        supports multiple color variants and sizes.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Black, Blue, DLV Red</td></tr>
          <tr><td>Sizes</td><td>Small (28px), Medium (36px)</td></tr>
          <tr><td>Cell Types</td><td>Number cells, Text cells (Prev/Next)</td></tr>
          <tr><td>States</td><td>Default, Active, Hover, Disabled</td></tr>
          <tr><td>Features</td><td>Page numbers, Prev/Next arrows, Ellipsis, Divider toggle</td></tr>
        </tbody>
      </table>

      <h2>Default Pagination</h2>

      <PaginationExampleSection
        title="Standard Pagination"
        desc="Interactive pagination with page numbers and prev/next navigation. Click any page to navigate."
      >
        {({ size, theme, variant, showDivider }) => (
          <PaginationDemo totalPages={10} variant={variant} size={size} showPrevNext showDivider={showDivider} theme={theme} />
        )}
      </PaginationExampleSection>

      <h2>Color Variants</h2>

      <PaginationExampleSection
        title="All Variants"
        desc="Active page highlight color changes per variant. Black for neutral, Blue for informational, DLV Red for brand emphasis."
      >
        {({ size, theme, showDivider }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            {Object.keys(variantColors).map(v => (
              <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: theme === 'dark' ? '#999' : '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {variantLabels[v]}
                </span>
                <PaginationDemo totalPages={8} initialPage={3} variant={v} size={size} showDivider={showDivider} theme={theme} />
              </div>
            ))}
          </div>
        )}
      </PaginationExampleSection>

      <h2>Ellipsis for Large Ranges</h2>

      <PaginationExampleSection
        title="Large Page Count"
        desc="When total pages exceed 7, ellipsis (…) appears to truncate the range while keeping first, last, and nearby pages visible."
      >
        {({ size, theme, variant, showDivider }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <PaginationDemo totalPages={50} initialPage={1} variant={variant} size={size} showDivider={showDivider} theme={theme} />
            <PaginationDemo totalPages={50} initialPage={25} variant={variant} size={size} showDivider={showDivider} theme={theme} />
            <PaginationDemo totalPages={50} initialPage={50} variant={variant} size={size} showDivider={showDivider} theme={theme} />
          </div>
        )}
      </PaginationExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Small for compact layouts, Medium as the default size."
        sizes={['sm', 'md'] as ('sm' | 'md')[]}
      >
        {({ theme }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: (theme as string) === 'dark' ? '#999' : '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>Small</span>
              <PaginationDemo totalPages={8} initialPage={3} size="sm" theme={theme as 'light' | 'dark'} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: (theme as string) === 'dark' ? '#999' : '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>Medium</span>
              <PaginationDemo totalPages={8} initialPage={3} size="md" theme={theme as 'light' | 'dark'} />
            </div>
          </div>
        )}
      </ComponentExampleSection>

      <h2>States</h2>

      <PaginationExampleSection
        title="Default, Active & Disabled"
        desc="Active page is highlighted. Prev is disabled on page 1, Next is disabled on the last page. Disabled state dims the entire component."
      >
        {({ size, theme, variant, showDivider }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: theme === 'dark' ? '#999' : '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>First page (Prev disabled)</span>
              <PaginationDemo totalPages={8} initialPage={1} variant={variant} size={size} showDivider={showDivider} theme={theme} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: theme === 'dark' ? '#999' : '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>Last page (Next disabled)</span>
              <PaginationDemo totalPages={8} initialPage={8} variant={variant} size={size} showDivider={showDivider} theme={theme} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: theme === 'dark' ? '#999' : '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>Fully disabled</span>
              <PaginationDemo totalPages={8} initialPage={4} variant={variant} size={size} showDivider={showDivider} disabled theme={theme} />
            </div>
          </div>
        )}
      </PaginationExampleSection>

      <h2>Without Prev/Next</h2>

      <PaginationExampleSection
        title="Numbers Only"
        desc="Pagination without prev/next text buttons — just page numbers."
      >
        {({ size, theme, variant }) => (
          <PaginationDemo totalPages={10} initialPage={5} variant={variant} size={size} showPrevNext={false} theme={theme} />
        )}
      </PaginationExampleSection>
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
      <pre><code>{`import { Pagination } from '@tarmac/design-system';`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`<Pagination
  totalPages={20}
  currentPage={1}
  onChange={(page) => console.log(page)}
/>

// With variant and size
<Pagination
  totalPages={50}
  currentPage={5}
  variant="blue"
  size="sm"
  onChange={setPage}
/>

// Without prev/next buttons
<Pagination
  totalPages={10}
  currentPage={3}
  showPrevNext={false}
  onChange={setPage}
/>`}</code></pre>

      <h2>Developer Handoff</h2>

      <h3>TypeScript Interface</h3>
      <pre><code>{`interface PaginationProps {
  /** Total number of pages */
  totalPages: number;
  /** Currently active page (1-indexed). Defaults to 1 */
  currentPage?: number;
  /** Callback fired when a page is selected */
  onChange?: (page: number) => void;
  /** Color variant for the active page indicator */
  variant?: 'black' | 'blue' | 'dlv-red';
  /** Size of the pagination cells */
  size?: 'sm' | 'md';
  /** Whether to show Prev/Next text buttons */
  showPrevNext?: boolean;
}`}</code></pre>

      <h3>Prop Descriptions</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>totalPages</code></td><td><code>number</code></td><td>—</td><td>Total number of pages. Required.</td></tr>
          <tr><td><code>currentPage</code></td><td><code>number</code></td><td><code>1</code></td><td>The currently active page (1-indexed).</td></tr>
          <tr><td><code>onChange</code></td><td><code>(page: number) =&gt; void</code></td><td>—</td><td>Callback when a page button is clicked. Receives the new page number.</td></tr>
          <tr><td><code>variant</code></td><td><code>&apos;black&apos; | &apos;blue&apos; | &apos;dlv-red&apos;</code></td><td><code>&apos;black&apos;</code></td><td>Color variant for the active page highlight.</td></tr>
          <tr><td><code>size</code></td><td><code>&apos;sm&apos; | &apos;md&apos;</code></td><td><code>&apos;md&apos;</code></td><td>Cell size. Small (28px) or Medium (36px).</td></tr>
          <tr><td><code>showPrevNext</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Show or hide the Prev/Next text navigation buttons.</td></tr>
        </tbody>
      </table>

      <h3>Integration Examples</h3>
      <pre><code>{`// Controlled pagination with React state
function ProductList() {
  const [page, setPage] = useState(1);
  const { data } = useFetchProducts({ page, pageSize: 20 });

  return (
    <>
      <ProductGrid items={data.items} />
      <Pagination
        totalPages={data.totalPages}
        currentPage={page}
        onChange={setPage}
        variant="blue"
        size="md"
        showPrevNext
      />
    </>
  );
}`}</code></pre>

      <pre><code>{`// URL-driven pagination with Next.js
'use client';
import { useRouter, useSearchParams } from 'next/navigation';

function PaginatedTable() {
  const router = useRouter();
  const params = useSearchParams();
  const page = Number(params.get('page')) || 1;

  return (
    <Pagination
      totalPages={100}
      currentPage={page}
      onChange={(p) => router.push(\`?page=\${p}\`)}
      variant="dlv-red"
      size="sm"
    />
  );
}`}</code></pre>

      <pre><code>{`// Compact pagination without prev/next
<Pagination
  totalPages={5}
  currentPage={2}
  onChange={handleChange}
  showPrevNext={false}
  size="sm"
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>pagination-cell-sm</td><td>28px</td></tr>
          <tr><td>pagination-cell-md</td><td>36px</td></tr>
          <tr><td>pagination-border-radius</td><td>6px</td></tr>
          <tr><td>pagination-gap</td><td>4px</td></tr>
        </tbody>
      </table>

      <h3>Variant Colors</h3>
      <table>
        <thead><tr><th>Variant</th><th>Active BG</th><th>Active Text</th></tr></thead>
        <tbody>
          <tr><td>black</td><td>#0D0D0D</td><td>#FFFFFF</td></tr>
          <tr><td>blue</td><td>#2396FB</td><td>#FFFFFF</td></tr>
          <tr><td>dlv-red</td><td>#ED1B36</td><td>#FFFFFF</td></tr>
        </tbody>
      </table>
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
          <tr><td>1</td><td>Container</td><td>Navigation wrapper for the pagination controls</td></tr>
          <tr><td>2</td><td>Previous Button</td><td>Text cell with left chevron to go back one page</td></tr>
          <tr><td>3</td><td>Page Numbers</td><td>Number cells — clickable buttons for each page</td></tr>
          <tr><td>4</td><td>Active Page</td><td>Highlighted number cell indicating the current page</td></tr>
          <tr><td>5</td><td>Ellipsis</td><td>Truncation indicator for skipped page ranges</td></tr>
          <tr><td>6</td><td>Next Button</td><td>Text cell with right chevron to advance one page</td></tr>
          <tr><td>7</td><td>Divider</td><td>Optional vertical separator between nav buttons and page numbers</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To navigate through paginated data tables or lists</li>
        <li>To break long content into discrete, numbered pages</li>
        <li>When users need to jump to specific pages in a dataset</li>
        <li>For search results or product catalogs with many items</li>
      </ul>

      <h2>When Not to Use</h2>
      <ul>
        <li>For content that benefits from infinite scroll (feeds, timelines)</li>
        <li>When the total number of pages is unknown or dynamic</li>
        <li>For fewer than 2 pages of content</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="pagination"
        doItems={[
          'Clearly highlight the current active page',
          'Disable Prev on the first page and Next on the last page',
          'Use ellipsis for large page counts to keep the UI compact',
          'Place pagination at the bottom of the paginated content',
          'Use consistent variant colors within the same interface',
        ]}
        dontItems={[
          'Don\'t show pagination for fewer than 2 pages',
          'Don\'t use different variants for the same pagination instance',
          'Don\'t hide the current page number',
          'Don\'t make page buttons too small to tap on mobile',
          'Don\'t use pagination when infinite scroll is more appropriate',
        ]}
      />

      <h2>Content Guidelines</h2>
      <ul>
        <li>Prev/Next labels should be concise — &quot;Prev&quot; and &quot;Next&quot; are preferred</li>
        <li>Page numbers should always be 1-indexed</li>
        <li>Ellipsis should appear when there are more than 7 pages</li>
        <li>Always show the first and last page numbers for context</li>
      </ul>

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>navigation</td><td>Landmark for the pagination region</td></tr>
          <tr><td>aria-label</td><td>&quot;Pagination&quot;</td><td>Accessible name for the navigation</td></tr>
          <tr><td>aria-current</td><td>&quot;page&quot;</td><td>Marks the active page button</td></tr>
          <tr><td>aria-disabled</td><td>&quot;true&quot;</td><td>Applied to disabled Prev/Next buttons</td></tr>
          <tr><td>aria-label</td><td>&quot;Page N&quot;</td><td>Each page button has a descriptive label</td></tr>
          <tr><td>Keyboard</td><td>Tab / Enter</td><td>Navigate and activate page buttons</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Stepper</strong> — Sequential step navigation for multi-step flows</li>
        <li><strong>Tabs</strong> — Switch between content views without page reloads</li>
        <li><strong>Breadcrumbs</strong> — Hierarchical navigation showing the current location</li>
        <li><strong>Button</strong> — Standalone action triggers</li>
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
        <li>Added interactive pagination demo with live page switching</li>
        <li>Added color variants: Black, Blue, DLV Red</li>
        <li>Added size options: Small (28px), Medium (36px)</li>
        <li>Added ellipsis truncation for large page ranges</li>
        <li>Added optional divider between nav buttons and page numbers</li>
        <li>Added <code>showPrevNext</code> prop to toggle Prev/Next buttons</li>
        <li>Improved accessibility with <code>aria-current</code>, <code>aria-label</code>, and <code>role=&quot;navigation&quot;</code></li>
        <li>Added disabled state for the entire component</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with numbered page buttons and prev/next navigation</li>
        <li>Basic ellipsis support for large page counts</li>
        <li>Single size and color variant</li>
      </ul>
    </>
  );
}


/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function PaginationPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Pagination"
      description="Page navigation controls for paginated content with numbered pages, prev/next arrows, and ellipsis for large ranges."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
