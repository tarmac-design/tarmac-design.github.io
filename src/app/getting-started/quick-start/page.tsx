'use client';
import { PageShell } from '@/components/PageShell';
import { CardGroup, Card } from '@/components/mdx';

export default function QuickStartPage() {
  return (
    <PageShell title="Quick Start" description="After installing TARMAC, you're ready to build.">
      <h2>Overview</h2>
      <p>After installing TARMAC, you're ready to build. This guide walks you through your first component and a simple form.</p>

      <h2>Build a Login Form</h2>
      <p>Combine multiple components to create a functional form:</p>
      <pre><code>{`import { Input, Button, Card } from '@tarmac/design-system';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="primary" fullWidth>
          Sign In
        </Button>
      </form>
    </Card>
  );
}`}</code></pre>

      <h2>Next Steps</h2>
      <CardGroup cols={3}>
        <Card title="Foundations" icon="📐" href="/foundations/colors">
          Colors, typography, spacing, and design tokens
        </Card>
        <Card title="Components" icon="🧩" href="/components/button">
          Explore all available components
        </Card>
        <Card title="Patterns" icon="🔷" href="/patterns/layout">
          Common UI patterns and layouts
        </Card>
      </CardGroup>
    </PageShell>
  );
}
