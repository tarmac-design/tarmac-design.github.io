'use client';
import { PageShell } from '@/components/PageShell';
import { Tabs, Tab, CardGroup, Card } from '@/components/mdx';

export default function LayoutPage() {
  return (
    <PageShell title="Layout Patterns" description="Layout patterns define how content is organized and structured across screens.">
      <CardGroup cols={3}>
        <Card title="Responsive Grid" icon="📐">12-column grid system with breakpoint-aware layouts</Card>
        <Card title="Content Regions" icon="📊">Header, sidebar, main, footer patterns</Card>
        <Card title="Spacing System" icon="↔️">Consistent spacing tokens for predictable layouts</Card>
      </CardGroup>

      <h2>Common Layouts</h2>
      <Tabs>
        <Tab title="Single Column">
          <p>Best for focused content like forms, articles, and detail views. Content is centered with a max-width constraint.</p>
          <pre><code>{`<div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px' }}>
  <Header />
  <main>{/* Primary content */}</main>
  <Footer />
</div>`}</code></pre>
          <p>Use when:</p>
          <ul>
            <li>Forms and wizards</li>
            <li>Article or documentation pages</li>
            <li>Mobile-first layouts</li>
            <li>Onboarding flows</li>
          </ul>
        </Tab>
        <Tab title="Sidebar + Content">
          <p>Navigation sidebar with main content area. The sidebar remains fixed while content scrolls.</p>
          <pre><code>{`<div style={{ display: 'flex', minHeight: '100vh' }}>
  <aside style={{ width: '280px', borderRight: '1px solid #E5E5E5' }}>
    {/* Navigation */}
  </aside>
  <main style={{ flex: 1, padding: '24px' }}>
    {/* Content */}
  </main>
</div>`}</code></pre>
        </Tab>
        <Tab title="Split View">
          <p>Two equal or proportional panels side by side. Useful for comparison views or master-detail layouts.</p>
        </Tab>
      </Tabs>

      <h2>Spacing Guidelines</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>spacing-4</td><td>4px</td><td>Tight inline spacing</td></tr>
          <tr><td>spacing-8</td><td>8px</td><td>Related element gaps</td></tr>
          <tr><td>spacing-12</td><td>12px</td><td>Compact component padding</td></tr>
          <tr><td>spacing-16</td><td>16px</td><td>Standard component padding</td></tr>
          <tr><td>spacing-24</td><td>24px</td><td>Section gaps</td></tr>
          <tr><td>spacing-32</td><td>32px</td><td>Major section separation</td></tr>
          <tr><td>spacing-48</td><td>48px</td><td>Page-level separation</td></tr>
        </tbody>
      </table>

      <h2>Stacking Order (Z-Index)</h2>
      <table>
        <thead><tr><th>Layer</th><th>Z-Index</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>Base</td><td>0</td><td>Page content</td></tr>
          <tr><td>Sticky</td><td>100</td><td>Sticky headers, floating buttons</td></tr>
          <tr><td>Dropdown</td><td>200</td><td>Dropdowns, popovers</td></tr>
          <tr><td>Overlay</td><td>300</td><td>Backdrop overlays</td></tr>
          <tr><td>Modal</td><td>400</td><td>Modals, dialogs</td></tr>
          <tr><td>Toast</td><td>500</td><td>Snackbars, notifications</td></tr>
          <tr><td>Tooltip</td><td>600</td><td>Tooltips</td></tr>
        </tbody>
      </table>
    </PageShell>
  );
}
