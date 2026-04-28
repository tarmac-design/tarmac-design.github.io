'use client';
import { PageShell } from '@/components/PageShell';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';

export default function MovementMetaphorsPage() {
  return (
    <PageShell title="Movement Metaphors" description="TARMAC is Reliable, Fast, Precise, and Confident. This is the feeling users should have every time they interact with a product built on TARMAC.">
      <h2>Overview</h2>
      <p>
        Motion in TARMAC is a functional tool that guides users, provides feedback, and creates a sense of quality. Every animation serves a purpose — it's never decorative. The movement metaphors are drawn directly from the physical world of logistics — road markings, junctions, signage, and the kinetic energy of delivery itself.
      </p>

      <ImagePlaceholder label="Movement metaphors — How motion communicates in TARMAC" path="/assets/images/movement-metaphors-hero.png" height={348} />

      <h2>Nexus</h2>
      <div className="p-6 rounded-xl border mb-6" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
        <div className="flex items-start gap-4">
          <div className="text-3xl">🔗</div>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>The Central Hub of Connection</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--color-on-surface-variant)' }}>
              Signifying a central point of connection, Nexus references tarmac as the hub where everything links — representing how our system is structured and kept in motion.
            </p>
            <p className="text-sm mb-3" style={{ color: 'var(--color-on-surface-variant)' }}>
              Drawn from the road junction, this pattern embodies flexibility and directional clarity, showing how our system allows diverse components to move and interact purposefully within a single framework.
            </p>
            <p className="text-xs italic" style={{ color: 'var(--color-on-surface-variant)' }}>
              When four modular Nexus quadrants are assembled into a box, the resulting structure symbolizes a parcel box.
            </p>
          </div>
        </div>
      </div>

      <h2>Apex</h2>
      <div className="p-6 rounded-xl border mb-6" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
        <div className="flex items-start gap-4">
          <div className="text-3xl">🔺</div>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>Directional Signage &amp; Critical Turns</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--color-on-surface-variant)' }}>
              Inspired by tarmac signage, the Apex pattern signals critical direction changes and guides users smoothly through steps, hierarchies, and transitions. It acts as the visual cue for forward movement.
            </p>
            <p className="text-sm mb-3" style={{ color: 'var(--color-on-surface-variant)' }}>
              Apex represents controlled momentum and the critical decision point. The sharp, forward-pointing nature of the pattern signifies a peak of performance and a moment of decisive action.
            </p>
            <p className="text-sm mb-3" style={{ color: 'var(--color-on-surface-variant)' }}>
              The Apex pattern is omnipresent because its core elements — the sharp angle and directed point — are fundamental, universally understood symbols of movement, direction, and structural peak found across nature, design, and geometry.
            </p>
            <p className="text-xs italic" style={{ color: 'var(--color-on-surface-variant)' }}>
              When four modular Apex quadrants are assembled into a box, the resulting structure symbolizes a parcel box.
            </p>
          </div>
        </div>
      </div>

      <h2>Rhythm</h2>
      <div className="p-6 rounded-xl border mb-6" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
        <div className="flex items-start gap-4">
          <div className="text-3xl">🎵</div>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>Intuitive Guidance Through Structure</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--color-on-surface-variant)' }}>
              The Rhythm pattern guides users intuitively, inspired by the clarity of road lines and zebra crossings to ensure a smooth, effortless journey to their goal.
            </p>
            <p className="text-sm mb-3" style={{ color: 'var(--color-on-surface-variant)' }}>
              The lines on the tarmac create clear channels that segregate traffic and enforce linear, disciplined movement, ensuring that both people and equipment follow predictable, safe paths.
            </p>
            <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
              The Rhythm pattern's inherent modularity, based on repeatable, simple linear elements, allows it to be tiled, scaled, and layered continuously to construct diverse, complex structures such as borders, grids, or background textures.
            </p>
          </div>
        </div>
      </div>

      <h2>Velocity</h2>
      <div className="p-6 rounded-xl border mb-6" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
        <div className="flex items-start gap-4">
          <div className="text-3xl">⚡</div>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>Speed, Momentum &amp; Forward Force</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--color-on-surface-variant)' }}>
              The Velocity pattern is inspired by a delivery rider's sense of urgency and motion, shaping clear, directional cues that drive users forward efficiently toward a single, critical, and time-sensitive goal.
            </p>
            <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
              Velocity is a highly versatile visual component defined by angle and direction, making it a powerful atomic building block for constructing diverse and complex layouts simply through rotation and repetition.
            </p>
          </div>
        </div>
      </div>

      <h2>Motion Tokens</h2>

      <ImagePlaceholder label="Animation principles — Easing curves and timing" path="/assets/images/animation-principles.png" height={220} />

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
          <tr><td>Reduced motion</td><td>Enable <code>prefers-reduced-motion</code> in OS settings</td></tr>
          <tr><td>Slower devices</td><td>Test on low-end hardware or throttle CPU</td></tr>
          <tr><td>Interaction blocking</td><td>Verify animations don't block user input</td></tr>
          <tr><td>Cross-browser</td><td>Test in Chrome, Firefox, Safari, Edge</td></tr>
        </tbody>
      </table>
    </PageShell>
  );
}
