'use client';
import { PageShell } from '@/components/PageShell';
import { Tabs, Tab } from '@/components/mdx';

export default function BrandLanguagePage() {
  return (
    <PageShell title="Brand Language" description="How we communicate is as important as what we communicate.">
      <h2>Overview</h2>
      <p>
        How we communicate is as important as what we communicate. TARMAC's brand language reflects our values and connects with our audience — across documentation, UI copy, error messages, and marketing.
      </p>

      <h2>Tone by Context</h2>
      <Tabs>
        <Tab title="Documentation">
          <p>Clear and instructional. Step-by-step guidance, technical but accessible.</p>
          <p>Example: "Use the <code>variant</code> prop to change the button style."</p>
        </Tab>
        <Tab title="Marketing">
          <p>Confident and inspiring. Highlight benefits and outcomes.</p>
        </Tab>
        <Tab title="Error Messages">
          <p>Helpful and specific. Tell users what went wrong and how to fix it.</p>
        </Tab>
        <Tab title="Release Notes">
          <p>Concise and factual. What changed, why, and what to do.</p>
        </Tab>
      </Tabs>

      <h2>Terminology</h2>
      <table>
        <thead><tr><th>Preferred</th><th>Avoid</th></tr></thead>
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
