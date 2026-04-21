'use client';
import { PageShell } from '@/components/PageShell';

export default function SpacingPage() {
  return (
    <PageShell title="Spacing" description="TARMAC's spacing system uses a consistent scale based on 4px increments.">
      <h2>Spacing Scale</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>spacing-2</td><td>2px</td><td>Hairline gaps</td></tr>
          <tr><td>spacing-4</td><td>4px</td><td>Tight inline spacing</td></tr>
          <tr><td>spacing-8</td><td>8px</td><td>Related element gaps</td></tr>
          <tr><td>spacing-12</td><td>12px</td><td>Compact component padding</td></tr>
          <tr><td>spacing-16</td><td>16px</td><td>Standard component padding</td></tr>
          <tr><td>spacing-20</td><td>20px</td><td>Medium gaps</td></tr>
          <tr><td>spacing-24</td><td>24px</td><td>Section gaps</td></tr>
          <tr><td>spacing-32</td><td>32px</td><td>Major section separation</td></tr>
          <tr><td>spacing-40</td><td>40px</td><td>Large section gaps</td></tr>
          <tr><td>spacing-48</td><td>48px</td><td>Page-level separation</td></tr>
          <tr><td>spacing-64</td><td>64px</td><td>Hero section padding</td></tr>
        </tbody>
      </table>
      <h2>Guidelines</h2>
      <ul>
        <li>Use smaller values (4–8px) for related elements within a component</li>
        <li>Use medium values (16–24px) for padding within components</li>
        <li>Use larger values (32–64px) for separating sections and page-level spacing</li>
      </ul>
    </PageShell>
  );
}
