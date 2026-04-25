'use client';

import { useState } from 'react';
import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="pagination" />
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
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

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
