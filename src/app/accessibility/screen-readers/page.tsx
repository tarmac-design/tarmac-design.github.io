'use client';
import { PageShell } from '@/components/PageShell';

export default function ScreenReadersPage() {
  return (
    <PageShell title="Screen Readers" description="Guidelines for screen reader compatibility and ARIA usage.">
      <h2>ARIA Roles</h2>
      <table>
        <thead><tr><th>Role</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td><code>role="button"</code></td><td>Non-button elements acting as buttons</td></tr>
          <tr><td><code>role="dialog"</code></td><td>Modal dialogs</td></tr>
          <tr><td><code>role="alert"</code></td><td>Important messages requiring attention</td></tr>
          <tr><td><code>role="tablist"</code></td><td>Tab navigation containers</td></tr>
          <tr><td><code>role="navigation"</code></td><td>Navigation landmarks</td></tr>
        </tbody>
      </table>

      <h2>ARIA Properties</h2>
      <ul>
        <li><code>aria-label</code> — Provides an accessible name for elements without visible text</li>
        <li><code>aria-describedby</code> — Associates descriptive text with an element</li>
        <li><code>aria-expanded</code> — Indicates whether a collapsible section is open</li>
        <li><code>aria-hidden</code> — Hides decorative elements from screen readers</li>
        <li><code>aria-live</code> — Announces dynamic content changes</li>
      </ul>

      <h2>Testing</h2>
      <ul>
        <li><strong>macOS:</strong> VoiceOver (built-in, Cmd+F5)</li>
        <li><strong>Windows:</strong> NVDA (free) or JAWS</li>
        <li><strong>Mobile:</strong> TalkBack (Android), VoiceOver (iOS)</li>
      </ul>
    </PageShell>
  );
}
