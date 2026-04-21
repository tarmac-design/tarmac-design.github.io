'use client';
import { PageShell } from '@/components/PageShell';

export default function TestingPage() {
  return (
    <PageShell title="Accessibility Testing" description="How to test your application for accessibility compliance.">
      <h2>Automated Testing</h2>
      <table>
        <thead><tr><th>Tool</th><th>Type</th><th>Coverage</th></tr></thead>
        <tbody>
          <tr><td>axe-core</td><td>Library</td><td>WCAG 2.1 A/AA rules</td></tr>
          <tr><td>eslint-plugin-jsx-a11y</td><td>Linter</td><td>JSX accessibility rules</td></tr>
          <tr><td>Lighthouse</td><td>Browser</td><td>Automated audit scoring</td></tr>
          <tr><td>Pa11y</td><td>CLI</td><td>CI/CD integration</td></tr>
        </tbody>
      </table>

      <h2>Manual Testing</h2>
      <ul>
        <li><strong>Keyboard-only navigation</strong> — Unplug your mouse and navigate the entire interface</li>
        <li><strong>Screen reader testing</strong> — Use VoiceOver (Mac) or NVDA (Windows)</li>
        <li><strong>Zoom testing</strong> — Zoom to 200% and verify layout doesn't break</li>
        <li><strong>Color blindness simulation</strong> — Use browser dev tools or Stark plugin</li>
        <li><strong>Reduced motion</strong> — Enable prefers-reduced-motion in OS settings</li>
      </ul>

      <h2>CI/CD Integration</h2>
      <pre><code>{`// jest + axe-core
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

test('Button has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});`}</code></pre>
    </PageShell>
  );
}
