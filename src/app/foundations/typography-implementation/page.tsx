'use client';
import { PageShell } from '@/components/PageShell';

export default function TypographyImplementationPage() {
  return (
    <PageShell title="Typography Implementation" description="How to use TARMAC typography tokens in code.">
      <h2>CSS Custom Properties</h2>
      <pre><code>{`:root {
  --font-family-primary: 'Noto Sans', system-ui, sans-serif;
  --font-size-display: 36px;
  --font-size-h1: 30px;
  --font-size-h2: 24px;
  --font-size-h3: 20px;
  --font-size-h4: 16px;
  --font-size-body-lg: 16px;
  --font-size-body: 14px;
  --font-size-body-sm: 12px;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}`}</code></pre>

      <h2>React Usage</h2>
      <pre><code>{`import { Text, Heading } from '@tarmac/design-system';

<Heading level={1}>Page Title</Heading>
<Text size="body">Body content here</Text>
<Text size="sm" color="secondary">Helper text</Text>`}</code></pre>
    </PageShell>
  );
}
