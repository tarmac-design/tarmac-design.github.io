'use client';
import { PageShell } from '@/components/PageShell';

export default function ColorContrastPage() {
  return (
    <PageShell title="Color Contrast" description="Contrast requirements, testing tools, and color blindness support.">
      <h2>WCAG Requirements</h2>
      <table>
        <thead><tr><th>Element</th><th>Minimum Ratio</th><th>Level</th></tr></thead>
        <tbody>
          <tr><td>Normal text</td><td>4.5:1</td><td>AA</td></tr>
          <tr><td>Large text (18px+ bold, 24px+)</td><td>3:1</td><td>AA</td></tr>
          <tr><td>UI components & graphics</td><td>3:1</td><td>AA</td></tr>
          <tr><td>Enhanced normal text</td><td>7:1</td><td>AAA</td></tr>
        </tbody>
      </table>

      <h2>TARMAC Color Pairings</h2>
      <table>
        <thead><tr><th>Foreground</th><th>Background</th><th>Ratio</th><th>Pass</th></tr></thead>
        <tbody>
          <tr><td>#0D0D0D</td><td>#FFFFFF</td><td>19.4:1</td><td>✅ AAA</td></tr>
          <tr><td>#737373</td><td>#FFFFFF</td><td>4.6:1</td><td>✅ AA</td></tr>
          <tr><td>#FFFFFF</td><td>#ED1B36</td><td>4.5:1</td><td>✅ AA</td></tr>
          <tr><td>#FFFFFF</td><td>#2396FB</td><td>3.2:1</td><td>✅ AA (large)</td></tr>
        </tbody>
      </table>

      <h2>Testing Tools</h2>
      <ul>
        <li><strong>Chrome DevTools</strong> — Built-in contrast checker in the color picker</li>
        <li><strong>axe DevTools</strong> — Browser extension for automated accessibility testing</li>
        <li><strong>Stark</strong> — Figma plugin for contrast checking</li>
        <li><strong>WebAIM Contrast Checker</strong> — Online tool for manual checks</li>
      </ul>
    </PageShell>
  );
}
