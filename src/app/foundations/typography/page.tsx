'use client';
import { PageShell } from '@/components/PageShell';

export default function TypographyPage() {
  return (
    <PageShell title="Typography" description="TARMAC's type system uses Noto Sans as the primary typeface, with a clear hierarchy for readability.">
      <h2>Typeface</h2>
      <p>TARMAC uses <strong>Noto Sans</strong> as the primary typeface across all products. It offers excellent readability, broad language support, and a clean, modern aesthetic.</p>

      <h2>Type Scale</h2>
      <table>
        <thead><tr><th>Name</th><th>Size</th><th>Weight</th><th>Line Height</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>Display</td><td>36px</td><td>700</td><td>44px</td><td>Hero headings</td></tr>
          <tr><td>Heading 1</td><td>30px</td><td>700</td><td>38px</td><td>Page titles</td></tr>
          <tr><td>Heading 2</td><td>24px</td><td>600</td><td>32px</td><td>Section headings</td></tr>
          <tr><td>Heading 3</td><td>20px</td><td>600</td><td>28px</td><td>Subsection headings</td></tr>
          <tr><td>Heading 4</td><td>16px</td><td>600</td><td>24px</td><td>Card titles</td></tr>
          <tr><td>Body Large</td><td>16px</td><td>400</td><td>24px</td><td>Introductory text</td></tr>
          <tr><td>Body</td><td>14px</td><td>400</td><td>22px</td><td>Default body text</td></tr>
          <tr><td>Body Small</td><td>12px</td><td>400</td><td>18px</td><td>Captions, helper text</td></tr>
          <tr><td>Label</td><td>12px</td><td>600</td><td>16px</td><td>Form labels, badges</td></tr>
        </tbody>
      </table>

      <h2>Font Weights</h2>
      <table>
        <thead><tr><th>Weight</th><th>Value</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>Light</td><td>300</td><td>Large display text</td></tr>
          <tr><td>Regular</td><td>400</td><td>Body text</td></tr>
          <tr><td>Medium</td><td>500</td><td>Emphasis, buttons</td></tr>
          <tr><td>Semibold</td><td>600</td><td>Headings, labels</td></tr>
          <tr><td>Bold</td><td>700</td><td>Display, strong emphasis</td></tr>
        </tbody>
      </table>
    </PageShell>
  );
}
