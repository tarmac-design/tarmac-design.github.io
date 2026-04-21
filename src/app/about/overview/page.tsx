'use client';
import { PageShell } from '@/components/PageShell';
import { CardGroup, Card } from '@/components/mdx';

export default function OverviewPage() {
  return (
    <PageShell title="TARMAC Design System" description="A complete, production-ready design system powering consistent and accessible experiences across Delhivery's product ecosystem.">
      <h2>What is TARMAC?</h2>
      <p>
        TARMAC is Delhivery's unified design system — the single source of truth for design decisions, UI components, and interaction patterns. It bridges the gap between design and engineering, ensuring every team builds with the same foundational building blocks.
      </p>
      <p>
        TARMAC provides a shared language across disciplines: designers work from a comprehensive Figma library, developers implement with production-grade React components, and product teams benefit from a consistent, high-quality user experience.
      </p>

      <CardGroup cols={3}>
        <Card title="Figma Library" icon="🎨">
          A complete component library in Figma with variants, auto-layout, and design tokens baked in. Designers can prototype at full fidelity.
        </Card>
        <Card title="React Components" icon="⚛️">
          TypeScript-first React components with built-in accessibility, theming support, and comprehensive documentation.
        </Card>
        <Card title="Design Tokens" icon="🎯">
          A unified token system that keeps design and code in sync — colors, typography, spacing, and more as CSS variables and JS constants.
        </Card>
      </CardGroup>

      <h2>Why Teams Choose TARMAC</h2>

      <h4>For Designers</h4>
      <ul>
        <li><strong>Figma Component Library</strong> — Full-featured components with variants and states</li>
        <li><strong>Design Tokens</strong> — Consistent color, type, and spacing decisions</li>
        <li><strong>Documentation</strong> — Usage guidelines and best practices for every component</li>
        <li><strong>Collaboration</strong> — Shared language with engineering for seamless handoff</li>
      </ul>

      <h4>For Developers</h4>
      <ul>
        <li><strong>React Components</strong> — TypeScript-first with full type safety</li>
        <li><strong>Accessibility Built-in</strong> — WCAG 2.1 AA compliance out of the box</li>
        <li><strong>Design Tokens</strong> — Available as CSS custom properties and JS constants</li>
        <li><strong>Documentation</strong> — Props, examples, and integration guides</li>
      </ul>

      <h4>For Product Teams</h4>
      <ul>
        <li><strong>Consistency</strong> — Unified experience across all Delhivery products</li>
        <li><strong>Efficiency</strong> — Up to 60% faster UI development with pre-built components</li>
        <li><strong>Quality</strong> — Tested, accessible, and production-hardened components</li>
        <li><strong>Maintainability</strong> — Centralized updates propagate across all products</li>
      </ul>

      <h2>Quick Start</h2>
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
          Browse the full component library with live examples, props documentation, and usage guidelines.
        </Card>
      </CardGroup>
    </PageShell>
  );
}
