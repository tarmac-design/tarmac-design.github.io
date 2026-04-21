'use client';
import { PageShell } from '@/components/PageShell';

export default function DividersPage() {
  return (
    <PageShell title="Dividers" description="Visual separators for organizing content sections.">
      <h2>Types</h2>
      <table>
        <thead><tr><th>Type</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>Full-width</td><td>Separating major sections</td></tr>
          <tr><td>Inset</td><td>Separating list items with left padding</td></tr>
          <tr><td>Middle</td><td>Centered divider with padding on both sides</td></tr>
        </tbody>
      </table>
      <h2>Specifications</h2>
      <ul>
        <li>Height: 1px</li>
        <li>Color: <code>var(--color-border-default)</code> (#E5E5E5)</li>
        <li>No margin by default — spacing is controlled by parent containers</li>
      </ul>
    </PageShell>
  );
}
