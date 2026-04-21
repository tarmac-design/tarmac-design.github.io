'use client';
import { PageShell } from '@/components/PageShell';

export default function FocusManagementPage() {
  return (
    <PageShell title="Focus Management" description="Focus indicators, trapping, restoration, and skip links.">
      <h2>Focus Indicators</h2>
      <p>All interactive elements must have a visible focus indicator. TARMAC uses a 2px blue outline with a 2px offset.</p>
      <pre><code>{`:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}`}</code></pre>

      <h2>Focus Trapping</h2>
      <p>Modal dialogs and overlays must trap focus within the component. Users should not be able to Tab outside the modal while it's open.</p>
      <ul>
        <li>First focusable element receives focus when modal opens</li>
        <li>Tab cycles through focusable elements within the modal</li>
        <li>Escape closes the modal and returns focus to the trigger</li>
      </ul>

      <h2>Focus Restoration</h2>
      <p>When a modal, dropdown, or popover closes, focus must return to the element that triggered it.</p>

      <h2>Skip Links</h2>
      <p>Provide a "Skip to main content" link as the first focusable element on every page. This allows keyboard users to bypass repetitive navigation.</p>
      <pre><code>{`<a href="#main-content" className="skip-link">
  Skip to main content
</a>`}</code></pre>
    </PageShell>
  );
}
