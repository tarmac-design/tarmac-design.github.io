'use client';
import { PageShell } from '@/components/PageShell';
import { Tabs, Tab } from '@/components/mdx';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';

export default function BrandLanguagePage() {
  return (
    <PageShell title="Brand Language" description="How we communicate is as important as what we communicate. TARMAC's brand language reflects our values and connects with our audience.">
      <h2>Overview</h2>
      <p>
        TARMAC's brand language reflects our values and connects with our audience — across documentation, UI copy, error messages, and marketing. It's the verbal expression of the same principles that drive our visual design: clarity, consistency, and human connection.
      </p>

      <ImagePlaceholder label="Brand language overview — Voice, tone, and writing style" path="/assets/images/brand-language-hero.png" height={348} />

      <h2>Voice</h2>
      <p>Our voice is consistent across all communications:</p>
      <div className="space-y-3 mb-6">
        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>Professional Yet Approachable</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>We're experts, but we don't talk down. We explain complex concepts clearly without oversimplifying.</p>
        </div>
        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>Confident But Humble</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>We're proud of what we've built, but we acknowledge there's always room to improve.</p>
        </div>
        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>Clear and Direct</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>We value clarity over cleverness. We say what we mean without jargon or fluff.</p>
        </div>
        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>Helpful and Supportive</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>We're here to help teams succeed. Our tone is encouraging and solution-oriented.</p>
        </div>
      </div>

      <ImagePlaceholder label="Voice attributes — Clear, Confident, Human, Precise" path="/assets/images/voice-attributes.png" height={348} />

      <h2>Tone by Context</h2>
      <Tabs>
        <Tab title="Documentation">
          <p>Clear and instructional. Step-by-step guidance, technical but accessible.</p>
          <p>Example: <em>"Use the <code>variant</code> prop to change the button style."</em></p>
        </Tab>
        <Tab title="Marketing">
          <p>Inspiring and aspirational. Benefit-focused, energetic but not hyperbolic.</p>
          <p>Example: <em>"Build better products, faster."</em></p>
        </Tab>
        <Tab title="Error Messages">
          <p>Helpful and actionable. Never blaming, always solution-oriented.</p>
          <p>Example: <em>"The size prop expects 'small', 'medium', or 'large'. You provided 'tiny'."</em></p>
        </Tab>
        <Tab title="Release Notes">
          <p>Informative and concise. Highlight impact, technical when needed.</p>
          <p>Example: <em>"Added dark mode support to all components."</em></p>
        </Tab>
      </Tabs>

      <h2>Writing Guidelines</h2>
      <table>
        <thead><tr><th>Guideline</th><th>What It Means</th></tr></thead>
        <tbody>
          <tr><td>Be Concise</td><td>Short sentences and paragraphs. Remove unnecessary words. Get to the point.</td></tr>
          <tr><td>Be Specific</td><td>Use concrete examples, exact values, and measurements. Show, don't just tell.</td></tr>
          <tr><td>Be Consistent</td><td>Same terms for same concepts. Follow established patterns. Consistent formatting.</td></tr>
          <tr><td>Be Inclusive</td><td>Gender-neutral language. Avoid idioms that don't translate. Consider global audiences.</td></tr>
        </tbody>
      </table>

      <h2>Terminology</h2>
      <table>
        <thead><tr><th>Use This</th><th>Not This</th></tr></thead>
        <tbody>
          <tr><td>Component</td><td>Widget, element</td></tr>
          <tr><td>Design token</td><td>Variable, constant</td></tr>
          <tr><td>Pattern</td><td>Template, layout</td></tr>
          <tr><td>Variant</td><td>Type, style</td></tr>
          <tr><td>Prop</td><td>Property, attribute</td></tr>
        </tbody>
      </table>

      <h3>Capitalization Rules</h3>
      <table>
        <thead><tr><th>Context</th><th>Rule</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Brand name</td><td>UPPERCASE</td><td>TARMAC</td></tr>
          <tr><td>Component names</td><td>PascalCase</td><td>Button, TextField</td></tr>
          <tr><td>Prop names</td><td>camelCase</td><td>variant, isDisabled</td></tr>
          <tr><td>Token names</td><td>kebab-case</td><td>color-primary, spacing-md</td></tr>
        </tbody>
      </table>

      <h2>Voice Checklist</h2>
      <p>Before publishing any content, verify:</p>
      <ul>
        <li>Is it clear and easy to understand?</li>
        <li>Is it helpful and actionable?</li>
        <li>Is it consistent with our voice?</li>
        <li>Is it free of jargon and buzzwords?</li>
        <li>Is it inclusive and accessible?</li>
      </ul>
    </PageShell>
  );
}
