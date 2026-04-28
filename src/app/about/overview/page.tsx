'use client';
import { PageShell } from '@/components/PageShell';
import { CardGroup, Card } from '@/components/mdx';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';

export default function OverviewPage() {
  return (
    <PageShell title="Introduction to TARMAC" description="The unified design system powering consistent, accessible, and scalable experiences across Delhivery's entire product ecosystem.">
      <h2>About Delhivery</h2>
      <p>
        Delhivery is India's largest fully integrated logistics provider, building the operating system for commerce through world-class infrastructure, high-quality logistics operations, and cutting-edge engineering. Since 2011, the team has fulfilled over 4 billion orders across India — servicing 18,850+ pin codes through 50 automated sort centres, 123 gateways, 4,500+ direct delivery centres, and a team of 74,000+ people.
      </p>
      <p>
        Delhivery's mission is to enable customers to operate flexible, reliable, and resilient supply chains at the lowest costs — serving a diverse base of 48K+ active customers including e-commerce marketplaces, D2C brands, and enterprises across FMCG, consumer durables, electronics, lifestyle, retail, automotive, and manufacturing.
      </p>

      <ImagePlaceholder label="Delhivery — Connecting India through logistics" path="/assets/images/about-delhivery-hero.png" height={280} />

      <h2>Brand Philosophy</h2>
      <p>
        While Delhivery takes pride in its technological expertise, it's the people behind the scenes who truly keep the world moving. The brand philosophy is captured in two words: <strong>Human-led, Machine-driven</strong>. By combining the precision of technology with the warmth of human ingenuity, Delhivery bridges the gap between cold logistics and meaningful connections.
      </p>
      <p>
        The brand tagline — <strong>"Small world"</strong> — reflects this human touch while speaking to Delhivery's purpose of making the world feel closer. It's a simple, everyday phrase that captures the essence of what logistics truly enables: connection.
      </p>

      <h3>The Tangram</h3>
      <p>
        Delhivery's visual identity draws inspiration from the <strong>tangram</strong> — an ancient Chinese puzzle made up of seven geometric pieces inside a square. Historically a cultural export that journeyed from China to every corner of Europe in the early 19th century carried by trade ships, the tangram's history of movement and reinvention makes it the perfect metaphor for Delhivery's story.
      </p>
      <p>
        Each of the tangram's seven pieces twists and turns into different forms, embodying the unseen complexity and adaptability of logistics. This system of iconography becomes a versatile toolkit — representing everything from data-driven solutions to seamless shipping, all while paying homage to the universal art of movement and connection.
      </p>

      <ImagePlaceholder label="Tangram geometric pieces — Delhivery's visual identity" path="/assets/images/tangram-identity.gif" height={240} />

      <h2>What is TARMAC?</h2>
      <p>
        TARMAC is more than a component library — it's Delhivery's complete, unified design system. It serves as the single source of truth for design decisions, UI components, and interaction patterns, bridging the gap between design and engineering so every team builds with the same foundational building blocks.
      </p>
      <p>
        TARMAC provides a shared language across disciplines: designers work from a comprehensive Figma library, developers implement with production-grade React components, and product teams benefit from a consistent, high-quality user experience across all Delhivery products.
      </p>

      <ImagePlaceholder label="TARMAC Design System overview — Figma, React, Tokens" path="/assets/images/tarmac-overview.png" height={260} />

      <CardGroup cols={3}>
        <Card title="Figma Library" icon="🎨">
          A complete component library in Figma with variants, auto-layout, and design tokens baked in. Designers can prototype at full fidelity.
        </Card>
        <Card title="React Components" icon="⚛️">
          TypeScript-first React components with built-in accessibility, theming support, and comprehensive documentation.
        </Card>
        <Card title="Design Tokens" icon="🎯">
          A unified token system keeping design and code in sync — colors, typography, spacing, and more as CSS variables and JS constants.
        </Card>
      </CardGroup>

      <h2>Why Teams Choose TARMAC</h2>

      <h3>For Designers</h3>
      <ul>
        <li><strong>Figma Component Library</strong> — Production-ready components with variants and states that match code exactly</li>
        <li><strong>Design Tokens</strong> — Consistent color, typography, and spacing decisions</li>
        <li><strong>Documentation</strong> — Clear guidelines and usage examples for every component</li>
        <li><strong>Collaboration</strong> — Shared language with engineering for seamless handoff</li>
      </ul>

      <h3>For Developers</h3>
      <ul>
        <li><strong>React Components</strong> — TypeScript-first with full type safety and excellent DX</li>
        <li><strong>Accessibility Built-in</strong> — WCAG 2.1 AA compliance out of the box</li>
        <li><strong>Design Tokens</strong> — Available as CSS custom properties and JavaScript exports</li>
        <li><strong>Documentation</strong> — Code examples, props, and API references</li>
      </ul>

      <h3>For Product Teams</h3>
      <ul>
        <li><strong>Consistency</strong> — Unified experience across all Delhivery products</li>
        <li><strong>Efficiency</strong> — Up to 60% faster UI development with pre-built components</li>
        <li><strong>Quality</strong> — Tested, accessible, and production-hardened components</li>
        <li><strong>Maintainability</strong> — Centralized updates propagate across all products</li>
      </ul>

      <h2>Design Vision</h2>
      <p>
        Delhivery's design vision is rooted in three core principles that guide every product decision:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-6 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <div className="text-2xl mb-3">🌐</div>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>Ecosystem</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            Building interconnected experiences that work seamlessly across the entire Delhivery product portfolio — from customer-facing apps to internal operations tools.
          </p>
        </div>
        <div className="p-6 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <div className="text-2xl mb-3">👥</div>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>People</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            Designing for the humans behind every interaction — from delivery partners on the ground to enterprise customers managing supply chains at scale.
          </p>
        </div>
        <div className="p-6 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <div className="text-2xl mb-3">⚡</div>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>Speed &amp; Efficiency</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            Optimizing every interface for speed and clarity — because in logistics, every second counts. Minimal friction, maximum throughput.
          </p>
        </div>
      </div>

      <h2>Quick Start</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>
      <pre><code>{`import { Button, Input, Card } from '@tarmac/design-system';

function LoginForm() {
  return (
    <Card>
      <Input label="Email" type="email" placeholder="you@delhivery.com" />
      <Input label="Password" type="password" />
      <Button variant="primary" fullWidth>
        Sign In
      </Button>
    </Card>
  );
}`}</code></pre>

      <h2>Explore TARMAC</h2>
      <CardGroup cols={2}>
        <Card title="Foundations" icon="📐" href="/foundations/colors">
          Colors, typography, spacing, iconography — the building blocks that underpin every component.
        </Card>
        <Card title="Components" icon="🧩" href="/components/button">
          Browse the full component library with live Storybook demos, props documentation, and usage guidelines.
        </Card>
      </CardGroup>
    </PageShell>
  );
}
