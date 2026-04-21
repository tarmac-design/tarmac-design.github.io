'use client';
import { PageShell } from '@/components/PageShell';

export default function GuidelinesPage() {
  return (
    <PageShell title="Accessibility Guidelines" description="Practical rules for designers and developers building with TARMAC.">
      <h2>For Designers</h2>
      <ul>
        <li>Use semantic color tokens — never rely on color alone to convey meaning</li>
        <li>Ensure text meets 4.5:1 contrast ratio against its background</li>
        <li>Design focus states for all interactive elements</li>
        <li>Provide text alternatives for all images and icons</li>
        <li>Design for touch targets of at least 44×44px</li>
      </ul>

      <h2>For Developers</h2>
      <ul>
        <li>Use semantic HTML elements (<code>&lt;button&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>)</li>
        <li>Add ARIA labels to icon-only buttons and complex widgets</li>
        <li>Ensure all functionality is keyboard accessible</li>
        <li>Test with screen readers (VoiceOver, NVDA)</li>
        <li>Respect <code>prefers-reduced-motion</code> for animations</li>
        <li>Use <code>aria-live</code> regions for dynamic content updates</li>
      </ul>

      <h2>Checklist</h2>
      <table>
        <thead><tr><th>Requirement</th><th>Standard</th></tr></thead>
        <tbody>
          <tr><td>Text contrast</td><td>≥ 4.5:1 (AA)</td></tr>
          <tr><td>UI element contrast</td><td>≥ 3:1 (AA)</td></tr>
          <tr><td>Touch target size</td><td>≥ 44×44px</td></tr>
          <tr><td>Focus visible</td><td>2px outline, ≥ 3:1 contrast</td></tr>
          <tr><td>Alt text</td><td>All meaningful images</td></tr>
          <tr><td>Keyboard access</td><td>All interactive elements</td></tr>
        </tbody>
      </table>
    </PageShell>
  );
}
