'use client';
import { PageShell } from '@/components/PageShell';

export default function KeyboardNavigationPage() {
  return (
    <PageShell title="Keyboard Navigation" description="Complete keyboard interaction patterns for all TARMAC components.">
      <h2>Global Keys</h2>
      <table>
        <thead><tr><th>Key</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td><code>Tab</code></td><td>Move focus to next interactive element</td></tr>
          <tr><td><code>Shift + Tab</code></td><td>Move focus to previous interactive element</td></tr>
          <tr><td><code>Enter</code></td><td>Activate focused button or link</td></tr>
          <tr><td><code>Space</code></td><td>Activate focused button, toggle checkbox</td></tr>
          <tr><td><code>Escape</code></td><td>Close modal, dropdown, or popover</td></tr>
        </tbody>
      </table>

      <h2>Component-Specific Patterns</h2>
      <table>
        <thead><tr><th>Component</th><th>Keys</th></tr></thead>
        <tbody>
          <tr><td>Dropdown</td><td>Arrow keys to navigate, Enter to select, Escape to close</td></tr>
          <tr><td>Tabs</td><td>Arrow keys to switch tabs, Tab to move into content</td></tr>
          <tr><td>Modal</td><td>Tab trapped within modal, Escape to close</td></tr>
          <tr><td>Accordion</td><td>Enter/Space to toggle, Arrow keys between headers</td></tr>
          <tr><td>Slider</td><td>Arrow keys to adjust value</td></tr>
          <tr><td>Radio Group</td><td>Arrow keys to move selection</td></tr>
        </tbody>
      </table>
    </PageShell>
  );
}
