'use client';
import { PageShell } from '@/components/PageShell';

export default function GridSystemPage() {
  return (
    <PageShell title="Grid System" description="TARMAC uses a responsive 12-column grid system.">
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
      <p>Content areas are defined by the number of columns they span. Common patterns include:</p>
      <ul>
        <li><strong>Full width</strong> — 12 columns</li>
        <li><strong>Two-thirds</strong> — 8 columns</li>
        <li><strong>Half</strong> — 6 columns</li>
        <li><strong>One-third</strong> — 4 columns</li>
        <li><strong>One-quarter</strong> — 3 columns</li>
      </ul>
    </PageShell>
  );
}
