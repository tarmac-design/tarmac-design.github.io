'use client';
import { PageShell } from '@/components/PageShell';

export default function LogoPage() {
  return (
    <PageShell title="Logo" description="Guidelines for using the TARMAC and Delhivery logos across products and documentation.">
      <h2>Logo Usage</h2>
      <p>The TARMAC logo represents the design system brand. Use it consistently across all touchpoints.</p>

      <h2>Clear Space</h2>
      <p>Maintain a minimum clear space around the logo equal to the height of the "T" character.</p>

      <h2>Color Variations</h2>
      <table>
        <thead><tr><th>Variant</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>Full color</td><td>Default usage on light backgrounds</td></tr>
          <tr><td>White</td><td>Dark backgrounds</td></tr>
          <tr><td>Black</td><td>Single-color print</td></tr>
        </tbody>
      </table>

      <h2>Don'ts</h2>
      <ul>
        <li>Don't stretch or distort the logo</li>
        <li>Don't change the logo colors</li>
        <li>Don't place the logo on busy backgrounds</li>
        <li>Don't add effects like shadows or gradients</li>
      </ul>
    </PageShell>
  );
}
