'use client';
import { PageShell } from '@/components/PageShell';
import { CardGroup, Card } from '@/components/mdx';

export default function AccessibilityOverviewPage() {
  return (
    <PageShell title="Accessibility" description="Accessibility is a core value of TARMAC, not an afterthought.">
      <h2>Our Commitment</h2>
      <p>Every component is designed and tested to meet WCAG 2.1 Level AA standards, ensuring all users can interact with your applications regardless of ability, device, or context.</p>

      <CardGroup cols={4}>
        <Card title="WCAG 2.1 AA" icon="🛡️">All components meet minimum standards</Card>
        <Card title="Keyboard First" icon="⌨️">Full keyboard support throughout</Card>
        <Card title="Screen Readers" icon="🔊">Proper ARIA labels and semantics</Card>
        <Card title="Color Contrast" icon="👁️">4.5:1 minimum contrast ratios</Card>
      </CardGroup>

      <h2>What TARMAC Provides</h2>
      <p>Every TARMAC component ships with these accessibility features built in:</p>
      <table>
        <thead><tr><th>Feature</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Semantic HTML</td><td>Correct elements and roles for every component</td></tr>
          <tr><td>Keyboard navigation</td><td>Tab, arrow keys, Enter, Space, Escape support</td></tr>
          <tr><td>Focus management</td><td>Visible focus indicators, focus trapping in modals</td></tr>
          <tr><td>ARIA attributes</td><td>Labels, descriptions, states, and live regions</td></tr>
          <tr><td>Color contrast</td><td>All color combinations meet AA standards</td></tr>
          <tr><td>Responsive text</td><td>Components support text scaling and zoom</td></tr>
          <tr><td>Reduced motion</td><td>Animations respect prefers-reduced-motion</td></tr>
        </tbody>
      </table>

      <h2>Explore Accessibility</h2>
      <CardGroup cols={3}>
        <Card title="Keyboard Navigation" icon="⌨️" href="/accessibility/keyboard-navigation">Complete keyboard interaction patterns for all TARMAC components.</Card>
        <Card title="Screen Readers" icon="🔊" href="/accessibility/screen-readers">Guidelines for screen reader compatibility and ARIA usage.</Card>
        <Card title="Color Contrast" icon="👁️" href="/accessibility/color-contrast">Contrast requirements, testing tools, and color blindness support.</Card>
        <Card title="Focus Management" icon="🎯" href="/accessibility/focus-management">Focus indicators, trapping, restoration, and skip links.</Card>
        <Card title="Guidelines" icon="📋" href="/accessibility/guidelines">Practical rules for designers and developers.</Card>
        <Card title="Testing" icon="🧪" href="/accessibility/testing">How to test your application for accessibility compliance.</Card>
      </CardGroup>
    </PageShell>
  );
}
