'use client';
import { PageShell } from '@/components/PageShell';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';

export default function PhilosophyPage() {
  return (
    <PageShell title="Philosophy" description="The principles and values that guide every design and development decision in TARMAC.">
      <h2>Designing for Tomorrow</h2>
      <p>
        TARMAC is built at the intersection of two forces: <strong>machine precision</strong> and <strong>human touch</strong>. Delhivery's design vision recognizes that logistics — often seen as cold and mechanical — is ultimately powered by people. Every interface we build must honor both the efficiency of technology and the warmth of human connection.
      </p>
      <p>
        This dual philosophy shapes everything from micro-interactions to system architecture. Components are engineered for performance and reliability, while their visual language communicates care, clarity, and approachability.
      </p>

      <ImagePlaceholder label="Philosophy hero — Machine precision meets human touch" path="/assets/images/philosophy-hero.png" height={260} />

      <h2>Core Principles</h2>
      <div className="space-y-4 mb-6">
        <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>♿ Accessibility First</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            Every component meets WCAG 2.1 AA standards. Keyboard navigation, screen reader support, and color contrast are built in from the start — never bolted on as an afterthought.
          </p>
        </div>
        <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>🔒 Consistency Through Constraints</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            Design tokens and component APIs provide guardrails that prevent drift. Patterns solve common problems in standard ways, so teams spend less time debating and more time building.
          </p>
        </div>
        <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>📈 Progressive Enhancement</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            Components work with sensible defaults out of the box. Advanced features are opt-in. Customization never breaks core functionality — you can extend without fear.
          </p>
        </div>
        <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>🛠️ Developer Experience</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            Clear documentation, TypeScript support, intuitive APIs, and helpful error messages. Happy developers build better products — DX is a feature, not a luxury.
          </p>
        </div>
        <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>🔄 Design–Development Parity</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            Figma components map 1:1 with code. Shared tokens, shared terminology, shared workflows — what designers see is what developers build.
          </p>
        </div>
      </div>

      <ImagePlaceholder label="Core principles visual — Clarity, Consistency, Accessibility, Efficiency" path="/assets/images/core-principles.png" height={348} />

      <h2>Deriving Our Principles</h2>
      <p>
        TARMAC's design principles are derived from three pillars that reflect Delhivery's broader vision:
      </p>

      <h3>🌐 Ecosystem Thinking</h3>
      <p>
        Delhivery operates a vast, interconnected network — from warehouses to last-mile delivery. TARMAC mirrors this by providing a cohesive system where every component, token, and pattern works together. No component exists in isolation; each is designed to compose naturally with others.
      </p>

      <h3>👥 People-Centered Design</h3>
      <p>
        Behind every shipment is a person — a customer tracking a package, a delivery partner navigating routes, an operations manager optimizing throughput. TARMAC designs for all of them, ensuring interfaces are intuitive regardless of technical expertise or context of use.
      </p>

      <h3>⚡ Speed &amp; Efficiency</h3>
      <p>
        In logistics, every second matters. TARMAC components are optimized for fast rendering, minimal bundle size, and efficient interaction patterns. The system reduces cognitive load so users can accomplish tasks with minimal friction.
      </p>

      <h2>Design Values</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold" style={{ color: 'var(--color-on-surface)' }}>Clarity Over Cleverness</h4>
          <p className="text-xs mt-2" style={{ color: 'var(--color-on-surface-variant)' }}>Simple, understandable interfaces that don't require a manual</p>
        </div>
        <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold" style={{ color: 'var(--color-on-surface)' }}>Function Over Form</h4>
          <p className="text-xs mt-2" style={{ color: 'var(--color-on-surface-variant)' }}>Every visual decision serves a functional purpose</p>
        </div>
        <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold" style={{ color: 'var(--color-on-surface)' }}>Inclusive By Default</h4>
          <p className="text-xs mt-2" style={{ color: 'var(--color-on-surface-variant)' }}>Accessibility and internationalization from day one</p>
        </div>
        <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold" style={{ color: 'var(--color-on-surface)' }}>Flexible Yet Opinionated</h4>
          <p className="text-xs mt-2" style={{ color: 'var(--color-on-surface-variant)' }}>Strong defaults with room for customization</p>
        </div>
      </div>

      <h2>How TARMAC Evolves</h2>
      <p>TARMAC is a living system. It evolves through continuous feedback loops:</p>
      <table>
        <thead><tr><th>Input</th><th>How It Shapes the System</th></tr></thead>
        <tbody>
          <tr><td>User feedback and research</td><td>Validates patterns, surfaces pain points, drives iteration</td></tr>
          <tr><td>Accessibility standards</td><td>Ensures compliance with WCAG updates and emerging best practices</td></tr>
          <tr><td>Emerging technologies</td><td>Adopts new patterns when they solve real problems, not for novelty</td></tr>
          <tr><td>Team needs</td><td>Responds to product requirements and developer workflows across Delhivery</td></tr>
          <tr><td>Industry benchmarks</td><td>Learns from leading design systems like Material Design, Carbon, and Polaris</td></tr>
        </tbody>
      </table>
      <p>We balance stability with innovation — ensuring the system remains relevant while maintaining the reliability teams depend on.</p>
    </PageShell>
  );
}
