'use client';
import { PageShell } from '@/components/PageShell';

export default function GridAdvancedPage() {
  return (
    <PageShell title="Grid Advanced" description="Advanced grid patterns and nested layouts.">
      <h2>Nested Grids</h2>
      <p>Grids can be nested within columns to create complex layouts. Each nested grid inherits the gutter size of its parent.</p>
      <h2>Offset Columns</h2>
      <p>Use column offsets to create asymmetric layouts and visual breathing room.</p>
      <h2>Auto-fit and Auto-fill</h2>
      <p>For dynamic content, use CSS Grid's auto-fit and auto-fill to create responsive layouts without explicit breakpoints.</p>
      <pre><code>{`.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-24);
}`}</code></pre>
    </PageShell>
  );
}
