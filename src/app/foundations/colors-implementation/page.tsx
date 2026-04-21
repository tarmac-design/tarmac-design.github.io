'use client';
import { PageShell } from '@/components/PageShell';

export default function ColorsImplementationPage() {
  return (
    <PageShell title="Colors Implementation" description="How to use TARMAC color tokens in your codebase.">
      <h2>CSS Custom Properties</h2>
      <pre><code>{`:root {
  --color-brand-red: #ED1B36;
  --color-brand-blue: #2396FB;
  --color-brand-success: #1BA86E;
  --color-brand-warning: #CF9F02;
  --color-brand-error: #DC143C;

  --color-surface-primary: #FFFFFF;
  --color-surface-secondary: #F5F5F5;
  --color-text-primary: #0D0D0D;
  --color-text-secondary: #737373;
  --color-text-disabled: #A3A3A3;
  --color-border-default: #E5E5E5;
  --color-border-focus: #2396FB;
}`}</code></pre>

      <h2>JavaScript Constants</h2>
      <pre><code>{`import { colors } from '@tarmac/design-system/tokens';

// colors.brand.red → '#ED1B36'
// colors.neutral[500] → '#737373'
// colors.semantic.text.primary → '#0D0D0D'`}</code></pre>

      <h2>Tailwind Integration</h2>
      <pre><code>{`// tailwind.config.ts
import { tarmacColors } from '@tarmac/design-system/tailwind';

export default {
  theme: {
    extend: {
      colors: tarmacColors,
    },
  },
};`}</code></pre>
    </PageShell>
  );
}
