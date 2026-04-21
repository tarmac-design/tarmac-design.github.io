'use client';
import { PageShell } from '@/components/PageShell';

export default function MovementMetaphorsPage() {
  return (
    <PageShell title="Movement Metaphors" description="Motion in TARMAC is a functional tool that guides users, provides feedback, and creates a sense of quality.">
      <h2>Overview</h2>
      <p>
        Motion in TARMAC is a functional tool that guides users, provides feedback, and creates a sense of quality. Every animation serves a purpose — it's never decorative.
      </p>

      <h2>Core Motion Patterns</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-6 rounded-xl border border-neutral-200 text-center">
          <h4 className="font-semibold">The Runway — Smooth Acceleration</h4>
        </div>
        <div className="p-6 rounded-xl border border-neutral-200 text-center">
          <h4 className="font-semibold">The Bounce — Subtle Spring</h4>
        </div>
        <div className="p-6 rounded-xl border border-neutral-200 text-center">
          <h4 className="font-semibold">The Fade — Gentle Opacity</h4>
        </div>
        <div className="p-6 rounded-xl border border-neutral-200 text-center">
          <h4 className="font-semibold">The Slide — Directional Movement</h4>
        </div>
      </div>

      <h2>Motion Tokens</h2>
      <pre><code>{`const motion = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};`}</code></pre>

      <h2>Testing Motion</h2>
      <table>
        <thead><tr><th>Scenario</th><th>How to Test</th></tr></thead>
        <tbody>
          <tr><td>Reduced motion</td><td>Enable prefers-reduced-motion in OS settings</td></tr>
          <tr><td>Slower devices</td><td>Test on low-end hardware or throttle CPU</td></tr>
          <tr><td>Interaction blocking</td><td>Verify animations don't block user input</td></tr>
          <tr><td>Cross-browser</td><td>Test in Chrome, Firefox, Safari, Edge</td></tr>
        </tbody>
      </table>
    </PageShell>
  );
}
