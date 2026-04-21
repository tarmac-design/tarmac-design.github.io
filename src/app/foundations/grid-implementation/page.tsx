'use client';
import { PageShell } from '@/components/PageShell';

export default function GridImplementationPage() {
  return (
    <PageShell title="Grid Implementation" description="Code examples for implementing the TARMAC grid system.">
      <h2>CSS Grid</h2>
      <pre><code>{`.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutter, 24px);
  max-width: var(--grid-max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--grid-margin, 48px);
}`}</code></pre>
      <h2>React Component</h2>
      <pre><code>{`import { Grid, GridItem } from '@tarmac/design-system';

<Grid columns={12} gap={24}>
  <GridItem span={8}>Main content</GridItem>
  <GridItem span={4}>Sidebar</GridItem>
</Grid>`}</code></pre>
    </PageShell>
  );
}
