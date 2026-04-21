'use client';
import { PageShell } from '@/components/PageShell';

export default function BordersPage() {
  return (
    <PageShell title="Borders" description="Border styles and tokens for consistent component outlines.">
      <h2>Border Widths</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>border-none</td><td>0px</td><td>No border</td></tr>
          <tr><td>border-thin</td><td>1px</td><td>Default borders, dividers</td></tr>
          <tr><td>border-medium</td><td>1.5px</td><td>Secondary buttons, active states</td></tr>
          <tr><td>border-thick</td><td>2px</td><td>Focus rings, emphasis</td></tr>
        </tbody>
      </table>
      <h2>Border Colors</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>border-default</td><td>#E5E5E5</td><td>Standard borders</td></tr>
          <tr><td>border-hover</td><td>#D4D4D4</td><td>Hover state borders</td></tr>
          <tr><td>border-focus</td><td>#2396FB</td><td>Focus state borders</td></tr>
          <tr><td>border-error</td><td>#DC143C</td><td>Error state borders</td></tr>
        </tbody>
      </table>
    </PageShell>
  );
}
