'use client';
import { useState } from 'react';
import { PageShell } from '@/components/PageShell';
import { Info, DoDont } from '@/components/mdx';
import {
  headings, body, captions,
  weightValues, getLetterSpacing, tokenName,
  type TypeStyle, type Weight,
} from './typographyData';

/* ─── Shared: single type specimen card ─── */
function TypeSpecimen({ style, weight }: { style: TypeStyle; weight: Weight }) {
  const ls = getLetterSpacing(style, weight);
  return (
    <div
      className="p-5 rounded-xl border mb-3"
      style={{ borderColor: 'var(--color-outline)' }}
    >
      <p
        style={{
          fontFamily: "'Noto Sans', system-ui, sans-serif",
          fontSize: `${style.size}px`,
          lineHeight: `${style.lineHeight}px`,
          fontWeight: weightValues[weight],
          letterSpacing: `${ls}px`,
          color: 'var(--color-on-surface)',
        }}
      >
        The quick brown fox jumps over the lazy dog
      </p>
      <div
        className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs"
        style={{ color: 'var(--color-on-surface-variant)' }}
      >
        <span className="font-mono">{tokenName(style, weight)}</span>
        <span>{style.size}px / {style.lineHeight}px</span>
        <span>{weight} ({weightValues[weight]})</span>
        <span>LS {ls}</span>
      </div>
    </div>
  );
}

/* ─── Section renderer: heading group with all weights ─── */
function TypeSection({ styles }: { styles: TypeStyle[] }) {
  return (
    <>
      {styles.map((s) => (
        <div key={s.label} className="mb-8">
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="text-base font-semibold" style={{ color: 'var(--color-on-surface)' }}>
              {s.label}
            </h3>
            <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
              {s.size}px / {s.lineHeight}px — {s.purpose}
            </span>
          </div>
          {s.weights.map((w) => (
            <TypeSpecimen key={w} style={s} weight={w} />
          ))}
        </div>
      ))}
    </>
  );
}

/* ─── Tab: Examples ─── */
const exampleSections = ['Headings', 'Body', 'Caption'] as const;
type ExampleSection = (typeof exampleSections)[number];

function ExamplesTab() {
  const [section, setSection] = useState<ExampleSection>('Headings');

  return (
    <div className="mdx-content">
      {/* Sub-nav pills */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {exampleSections.map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              backgroundColor: section === s ? 'var(--color-on-surface)' : 'transparent',
              color: section === s ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
              border: `1px solid ${section === s ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {section === 'Headings' && (
        <>
          <h2>Headings (H1–H5)</h2>
          <p>Five heading levels from 40px down to 20px. H1–H3 default to Medium weight; H4–H5 also include Light. Use heading levels sequentially to maintain document hierarchy.</p>
          <TypeSection styles={headings} />
        </>
      )}

      {section === 'Body' && (
        <>
          <h2>Body (B1–B2)</h2>
          <p>Two body sizes for primary and secondary content. B1 (16px) is the default reading size; B2 (14px) is for dense layouts, tables, and secondary text. Note: B1 uses tighter letter-spacing for heavier weights.</p>
          <TypeSection styles={body} />
        </>
      )}

      {section === 'Caption' && (
        <>
          <h2>Caption (C1–C2)</h2>
          <p>Small text for helper hints, timestamps, metadata, and legal notations. C2 (10px) should be used sparingly — only in constrained UI or technical contexts.</p>
          <TypeSection styles={captions} />
        </>
      )}
    </div>
  );
}

/* ─── Tab: Usage ─── */
function UsageTab() {
  return (
    <div className="mdx-content">
      <h2>Type Architecture</h2>
      <Info>Always use the defined type scale tokens rather than arbitrary font sizes. This ensures consistency across products and automatic adaptation to responsive breakpoints.</Info>
      <p>TARMAC&apos;s type system is built on <strong>Noto Sans</strong> with a structured 3-tier scale:</p>
      <ol>
        <li><strong>Headings (H1–H5)</strong> — Structural hierarchy from page titles to UI section labels. Sizes range from 40px to 20px.</li>
        <li><strong>Body (B1–B2)</strong> — Primary reading text. B1 (16px) for general content, B2 (14px) for dense or secondary contexts.</li>
        <li><strong>Caption (C1–C2)</strong> — Small supporting text for metadata, hints, and legal copy.</li>
      </ol>

      <h2>Weight Usage</h2>
      <table>
        <thead><tr><th>Weight</th><th>Value</th><th>When to Use</th></tr></thead>
        <tbody>
          <tr><td>Bold</td><td>700</td><td>Strong emphasis, key data points</td></tr>
          <tr><td>Semibold</td><td>600</td><td>Sub-headings, labels, navigation</td></tr>
          <tr><td>Medium</td><td>500</td><td>Default heading weight, buttons</td></tr>
          <tr><td>Regular</td><td>400</td><td>Body text, descriptions</td></tr>
          <tr><td>Light</td><td>300</td><td>Large display text, decorative use (H4+ and body only)</td></tr>
        </tbody>
      </table>

      <h2>Hierarchy Rules</h2>
      <ul>
        <li>Never skip heading levels (e.g., H1 → H3). Screen readers rely on sequential heading order.</li>
        <li>Limit to 2–3 font weights per screen to maintain visual clarity.</li>
        <li>Use <code>paragraph-spacing: 2</code> between heading blocks for consistent vertical rhythm.</li>
        <li>Body text should never be smaller than 14px (B2). Use C1/C2 only for non-essential metadata.</li>
      </ul>

      <h2>Accessibility Guidelines</h2>
      <ul>
        <li>Minimum body text size: 14px (B2). Avoid C2 (10px) for any critical content.</li>
        <li>Maintain WCAG AA contrast (4.5:1) for all text against its background.</li>
        <li>Large text (≥24px or ≥18.66px bold) requires minimum 3:1 contrast.</li>
        <li>Ensure text can be resized up to 200% without loss of content or functionality.</li>
        <li>Use semantic HTML heading elements (<code>&lt;h1&gt;</code>–<code>&lt;h5&gt;</code>) — not just visual styling.</li>
        <li>Line height should be at least 1.5× the font size for body text to aid readability.</li>
      </ul>

      <h2>Do&apos;s &amp; Don&apos;ts</h2>
      <DoDont slug="typography"
        doItems={[
          "Use the type scale tokens consistently across all pages",
          "Maintain sequential heading hierarchy (H1 → H2 → H3)",
          "Use Noto Sans as the primary typeface",
          "Keep body text at B1 (16px) or B2 (14px) minimum",
        ]}
        dontItems={[
          "Skip heading levels (e.g., H1 directly to H3)",
          "Use more than 3 font weights on a single screen",
          "Set body text smaller than 14px for readable content",
          "Use arbitrary font sizes outside the type scale",
        ]}
      />
    </div>
  );
}

/* ─── Tab: Code ─── */
function CodeTab() {
  return (
    <div className="mdx-content">
      <h2>CSS Custom Properties</h2>
      <pre><code>{`:root {
  --font-family-primary: 'Noto Sans', system-ui, sans-serif;

  /* Headings */
  --font-size-h1: 40px;
  --font-line-height-h1: 52px;
  --font-letter-spacing-h1: -0.5px;

  --font-size-h2: 34px;
  --font-line-height-h2: 44px;
  --font-letter-spacing-h2: -0.25px;

  --font-size-h3: 28px;
  --font-line-height-h3: 36px;
  --font-letter-spacing-h3: -0.15px;

  --font-size-h4: 24px;
  --font-line-height-h4: 32px;

  --font-size-h5: 20px;
  --font-line-height-h5: 26px;

  /* Body */
  --font-size-b1: 16px;
  --font-line-height-b1: 24px;

  --font-size-b2: 14px;
  --font-line-height-b2: 20px;

  /* Caption */
  --font-size-c1: 12px;
  --font-line-height-c1: 16px;

  --font-size-c2: 10px;
  --font-line-height-c2: 16px;

  /* Weights */
  --font-weight-bold: 700;
  --font-weight-semibold: 600;
  --font-weight-medium: 500;
  --font-weight-regular: 400;
  --font-weight-light: 300;
}`}</code></pre>

      <h2>JavaScript Constants</h2>
      <pre><code>{`import { typography } from '@tarmac/design-system/tokens';

// Type scale
typography.heading1.size       // 40
typography.heading1.lineHeight // 52
typography.heading1.default    // { weight: 500, letterSpacing: -0.5 }
typography.heading1.bold       // { weight: 700, letterSpacing: -0.5 }

typography.body1.size          // 16
typography.body1.default       // { weight: 500, letterSpacing: 0.2 }
typography.body1.bold          // { weight: 700, letterSpacing: 0.3 }

typography.caption1.size       // 12`}</code></pre>

      <h2>Tailwind Integration</h2>
      <pre><code>{`// tailwind.config.ts
import { tarmacTypography } from '@tarmac/design-system/tailwind';

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: tarmacTypography.fontSize,
      lineHeight: tarmacTypography.lineHeight,
      letterSpacing: tarmacTypography.letterSpacing,
    },
  },
};

// Usage in markup:
// <h1 class="text-h1 leading-h1 tracking-h1 font-medium">Title</h1>
// <p class="text-b1 leading-b1 font-regular">Body text</p>`}</code></pre>

      <h2>React Component Usage</h2>
      <pre><code>{`import { Text, Heading } from '@tarmac/design-system';

<Heading level={1}>Page Title</Heading>
<Heading level={3} weight="semibold">Sub-section</Heading>
<Text size="b1">Default body content</Text>
<Text size="b2" weight="light">Secondary description</Text>
<Text size="c1">Helper text or timestamp</Text>`}</code></pre>
    </div>
  );
}

/* ─── Main Page ─── */
export default function TypographyPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Changelog', content: (
      <div className="mdx-content py-4">
        <p style={{ color: 'var(--color-on-surface-variant)' }}>No changelog entries yet. Updates will appear here as the type system evolves.</p>
      </div>
    )},
  ];

  return (
    <PageShell
      title="Typography"
      description="TARMAC's type system is built on Noto Sans with a structured hierarchy of Headings (H1–H5), Body (B1–B2), and Caption (C1–C2) styles — each with defined sizes, weights, and spacing from Figma."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
