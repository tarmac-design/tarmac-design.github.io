'use client';
import { PageShell } from '@/components/PageShell';

export default function IconographyPage() {
  return (
    <PageShell title="Iconography" description="TARMAC's icon system provides a consistent set of icons for use across all products.">
      <h2>Icon Style</h2>
      <p>TARMAC icons follow a consistent visual style: 24px default size, 1.5px stroke weight, rounded line caps and joins.</p>
      <h2>Sizes</h2>
      <table>
        <thead><tr><th>Size</th><th>Pixels</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>Small</td><td>16px</td><td>Inline with small text, badges</td></tr>
          <tr><td>Medium</td><td>20px</td><td>Buttons, form fields</td></tr>
          <tr><td>Default</td><td>24px</td><td>Navigation, standalone icons</td></tr>
          <tr><td>Large</td><td>32px</td><td>Empty states, feature highlights</td></tr>
        </tbody>
      </table>
      <h2>Usage Guidelines</h2>
      <ul>
        <li>Always pair icons with text labels when possible</li>
        <li>Use <code>aria-label</code> for icon-only buttons</li>
        <li>Maintain consistent icon sizes within the same context</li>
        <li>Don't mix icon styles (outlined vs filled) in the same interface</li>
      </ul>
    </PageShell>
  );
}
