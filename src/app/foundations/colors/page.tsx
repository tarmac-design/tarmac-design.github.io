'use client';
import { PageShell } from '@/components/PageShell';
import { Info } from '@/components/mdx';

const palette = [
  { name: 'Red', shades: [{s:'50',h:'#FEF2F2'},{s:'100',h:'#FEE2E2'},{s:'200',h:'#FECACA'},{s:'300',h:'#FCA5A5'},{s:'400',h:'#F87171'},{s:'500',h:'#ED1B36'},{s:'600',h:'#DC2626'},{s:'700',h:'#B91C1C'},{s:'800',h:'#991B1B'},{s:'900',h:'#7F1D1D'}] },
  { name: 'Blue', shades: [{s:'50',h:'#EFF6FF'},{s:'100',h:'#DBEAFE'},{s:'200',h:'#BFDBFE'},{s:'300',h:'#93C5FD'},{s:'400',h:'#60A5FA'},{s:'500',h:'#2396FB'},{s:'600',h:'#2563EB'},{s:'700',h:'#1D4ED8'},{s:'800',h:'#1E40AF'},{s:'900',h:'#1E3A8A'}] },
  { name: 'Green', shades: [{s:'50',h:'#F0FDF4'},{s:'100',h:'#DCFCE7'},{s:'200',h:'#BBF7D0'},{s:'300',h:'#86EFAC'},{s:'400',h:'#4ADE80'},{s:'500',h:'#1BA86E'},{s:'600',h:'#16A34A'},{s:'700',h:'#15803D'},{s:'800',h:'#166534'},{s:'900',h:'#14532D'}] },
  { name: 'Neutral', shades: [{s:'50',h:'#FAFAFA'},{s:'100',h:'#F5F5F5'},{s:'200',h:'#E5E5E5'},{s:'300',h:'#D4D4D4'},{s:'400',h:'#A3A3A3'},{s:'500',h:'#737373'},{s:'600',h:'#525252'},{s:'700',h:'#404040'},{s:'800',h:'#262626'},{s:'900',h:'#0D0D0D'}] },
];

export default function ColorsPage() {
  return (
    <PageShell title="Colors" description="TARMAC's color system is built on a 3-layer architecture — Core → Semantic → Usage.">
      <h2>Principles</h2>
      <Info>Always use semantic tokens in your UI code rather than raw hex values. Semantic tokens ensure your interfaces adapt correctly to themes and maintain consistent meaning across contexts.</Info>
      <ul>
        <li><strong>Purposeful</strong> — Every color has a defined role and communicates meaning</li>
        <li><strong>Accessible</strong> — All color pairings meet WCAG 2.1 AA contrast requirements (4.5:1 for text, 3:1 for UI elements)</li>
        <li><strong>Systematic</strong> — A layered architecture that scales from brand to component level</li>
      </ul>

      <h2>Color Architecture</h2>
      <p>TARMAC uses a 3-layer token system:</p>
      <ol>
        <li><strong>Core Tokens</strong> — Raw color values (hex codes). These are the palette.</li>
        <li><strong>Semantic Tokens</strong> — Purpose-driven aliases (e.g., <code>color.text.primary</code>).</li>
        <li><strong>Usage Tokens</strong> — Component-specific mappings (e.g., <code>button.background.primary</code>).</li>
      </ol>

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

      <h2>Color Palette</h2>
      {palette.map((color) => (
        <div key={color.name}>
          <h3>{color.name}</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
            {color.shades.map((shade) => (
              <div key={shade.s} className="text-center">
                <div className="w-full aspect-square rounded-lg mb-1" style={{ backgroundColor: shade.h, border: '1px solid var(--color-outline)' }} />
                <div className="text-[10px] font-medium" style={{ color: 'var(--color-on-surface)' }}>{shade.s}</div>
                <div className="text-[10px]" style={{ color: 'var(--color-on-surface-variant)' }}>{shade.h}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

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

      <h2>Implementation</h2>
      <h3>CSS Custom Properties</h3>
      <pre><code>{`:root {
  --color-brand-red: #ED1B36;
  --color-brand-blue: #2396FB;
  --color-brand-success: #1BA86E;
  --color-brand-warning: #CF9F02;
  --color-brand-error: #DC143C;
  --color-surface-primary: #FFFFFF;
  --color-surface-secondary: #F5F5F5;
  --color-text-primary: #0D0D0D;
  --color-text-secondary: #737373;
  --color-text-disabled: #A3A3A3;
  --color-border-default: #E5E5E5;
  --color-border-focus: #2396FB;
}`}</code></pre>

      <h3>JavaScript Constants</h3>
      <pre><code>{`import { colors } from '@tarmac/design-system/tokens';

// colors.brand.red → '#ED1B36'
// colors.neutral[500] → '#737373'
// colors.semantic.text.primary → '#0D0D0D'`}</code></pre>

      <h3>Tailwind Integration</h3>
      <pre><code>{`// tailwind.config.ts
import { tarmacColors } from '@tarmac/design-system/tailwind';

export default {
  theme: {
    extend: {
      colors: tarmacColors,
    },
  },
};`}</code></pre>

      <h2>Code Example</h2>
      <pre><code>{`/* Using TARMAC color tokens as CSS custom properties */
.card {
  background-color: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  color: var(--color-text-primary);
}

.button-primary {
  background-color: var(--color-brand-red);
  color: var(--color-text-inverse);
}`}</code></pre>
    </PageShell>
  );
}
