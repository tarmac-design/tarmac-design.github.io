'use client';
import { PageShell } from '@/components/PageShell';
import { Info } from '@/components/mdx';

export default function ColorsPage() {
  return (
    <PageShell title="Colors" description="TARMAC's color system is built on a 3-layer architecture — Core → Semantic → Usage.">
      <h2>Principles</h2>
      <Info>
        Always use semantic tokens in your UI code rather than raw hex values. Semantic tokens ensure your interfaces adapt correctly to themes and maintain consistent meaning across contexts.
      </Info>
      <ul>
        <li><strong>Purposeful</strong> — Every color has a defined role and communicates meaning</li>
        <li><strong>Accessible</strong> — All color pairings meet WCAG 2.1 AA contrast requirements (4.5:1 for text, 3:1 for UI elements)</li>
        <li><strong>Systematic</strong> — A layered architecture that scales from brand to component level</li>
      </ul>

      <h2>Color Architecture</h2>
      <p>TARMAC uses a 3-layer token system:</p>
      <ol>
        <li><strong>Core Tokens</strong> — Raw color values (hex codes). These are the palette.</li>
        <li><strong>Semantic Tokens</strong> — Purpose-driven aliases (e.g., <code>color.text.primary</code>). These describe what a color does.</li>
        <li><strong>Usage Tokens</strong> — Component-specific mappings (e.g., <code>button.background.primary</code>). These describe where a color is used.</li>
      </ol>
      <p>This layering means you can update the entire visual language by changing core values without touching component code.</p>

      <h2>Core Brand Colors</h2>
      <table>
        <thead><tr><th>Token</th><th>Name</th><th>Hex</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>brand.black</td><td>Black</td><td><code>#000000</code></td><td>Primary text, high-contrast elements</td></tr>
          <tr><td>brand.white</td><td>White</td><td><code>#FFFFFF</code></td><td>Backgrounds, inverse text</td></tr>
          <tr><td>brand.red</td><td>DLV Red</td><td><code>#ED1B36</code></td><td>Brand accent, primary actions</td></tr>
          <tr><td>brand.blue</td><td>Blue</td><td><code>#2396FB</code></td><td>Links, informational elements</td></tr>
          <tr><td>brand.success</td><td>Success</td><td><code>#1BA86E</code></td><td>Positive states, confirmations</td></tr>
          <tr><td>brand.warning</td><td>Warning</td><td><code>#CF9F02</code></td><td>Caution states, alerts</td></tr>
          <tr><td>brand.error</td><td>Error</td><td><code>#DC143C</code></td><td>Error states, destructive actions</td></tr>
        </tbody>
      </table>

      <h2>Neutral Scale</h2>
      <table>
        <thead><tr><th>Token</th><th>Hex</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>neutral.50</td><td><code>#FAFAFA</code></td><td>Subtle backgrounds</td></tr>
          <tr><td>neutral.100</td><td><code>#F5F5F5</code></td><td>Card backgrounds, hover states</td></tr>
          <tr><td>neutral.200</td><td><code>#E5E5E5</code></td><td>Borders, dividers</td></tr>
          <tr><td>neutral.300</td><td><code>#D4D4D4</code></td><td>Disabled borders</td></tr>
          <tr><td>neutral.400</td><td><code>#A3A3A3</code></td><td>Placeholder text</td></tr>
          <tr><td>neutral.500</td><td><code>#737373</code></td><td>Secondary text</td></tr>
          <tr><td>neutral.600</td><td><code>#525252</code></td><td>Icons, labels</td></tr>
          <tr><td>neutral.700</td><td><code>#404040</code></td><td>Body text</td></tr>
          <tr><td>neutral.800</td><td><code>#262626</code></td><td>Headings</td></tr>
          <tr><td>neutral.900</td><td><code>#0D0D0D</code></td><td>High-emphasis text</td></tr>
        </tbody>
      </table>

      <h2>Semantic Tokens</h2>
      <table>
        <thead><tr><th>Category</th><th>Tokens</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Surface</td><td><code>color.surface.primary</code>, <code>color.surface.secondary</code></td><td>Background colors for containers, cards, pages</td></tr>
          <tr><td>Text</td><td><code>color.text.primary</code>, <code>color.text.secondary</code>, <code>color.text.disabled</code></td><td>Foreground colors for text content</td></tr>
          <tr><td>Icon</td><td><code>color.icon.primary</code>, <code>color.icon.secondary</code></td><td>Colors for iconography</td></tr>
          <tr><td>Border</td><td><code>color.border.default</code>, <code>color.border.focus</code></td><td>Stroke colors for outlines and dividers</td></tr>
        </tbody>
      </table>

      <h2>Code Example</h2>
      <pre><code>{`/* Using TARMAC color tokens as CSS custom properties */
.card {
  background-color: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  color: var(--color-text-primary);
}

.card-title {
  color: var(--color-text-primary);
}

.card-description {
  color: var(--color-text-secondary);
}

.button-primary {
  background-color: var(--color-brand-red);
  color: var(--color-text-inverse);
}`}</code></pre>
    </PageShell>
  );
}
