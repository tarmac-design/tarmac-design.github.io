'use client';
import { PageShell } from '@/components/PageShell';

export default function GridSystemPage() {
  return (
    <PageShell title="Grid System" description="TARMAC uses a responsive 12-column grid system with nested layouts and implementation guides.">
      <h2>Overview</h2>
      <p>The grid system provides a flexible foundation for laying out content across different screen sizes. It uses a 12-column structure with responsive breakpoints.</p>

      <h2>Breakpoints</h2>
      <table>
        <thead><tr><th>Name</th><th>Min Width</th><th>Columns</th><th>Gutter</th><th>Margin</th></tr></thead>
        <tbody>
          <tr><td>Mobile</td><td>0px</td><td>4</td><td>16px</td><td>16px</td></tr>
          <tr><td>Tablet</td><td>768px</td><td>8</td><td>24px</td><td>32px</td></tr>
          <tr><td>Desktop</td><td>1024px</td><td>12</td><td>24px</td><td>48px</td></tr>
          <tr><td>Wide</td><td>1440px</td><td>12</td><td>32px</td><td>64px</td></tr>
        </tbody>
      </table>

      <h2>Column Spans</h2>
      <ul>
        <li><strong>Full width</strong> — 12 columns</li>
        <li><strong>Two-thirds</strong> — 8 columns</li>
        <li><strong>Half</strong> — 6 columns</li>
        <li><strong>One-third</strong> — 4 columns</li>
        <li><strong>One-quarter</strong> — 3 columns</li>
      </ul>

      <h2>Advanced Patterns</h2>
      <h3>Nested Grids</h3>
      <p>Grids can be nested within columns to create complex layouts. Each nested grid inherits the gutter size of its parent.</p>

      <h3>Offset Columns</h3>
      <p>Use column offsets to create asymmetric layouts and visual breathing room.</p>

      <h3>Auto-fit and Auto-fill</h3>
      <p>For dynamic content, use CSS Grid's auto-fit and auto-fill to create responsive layouts without explicit breakpoints.</p>
      <pre><code>{`.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-24);
}`}</code></pre>

      <h2>Implementation</h2>
      <h3>CSS Grid</h3>
      <pre><code>{`.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutter, 24px);
  max-width: var(--grid-max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--grid-margin, 48px);
}`}</code></pre>

      <h3>React Component</h3>
      <pre><code>{`import { Grid, GridItem } from '@tarmac/design-system';

<Grid columns={12} gap={24}>
  <GridItem span={8}>Main content</GridItem>
  <GridItem span={4}>Sidebar</GridItem>
</Grid>`}</code></pre>
    </PageShell>
  );
}
