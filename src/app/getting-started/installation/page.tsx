'use client';
import { PageShell } from '@/components/PageShell';
import { Info } from '@/components/mdx';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';

export default function InstallationPage() {
  return (
    <PageShell hideVersion title="Installation" description="Get TARMAC installed and configured in your project in under 5 minutes.">
      <h2>Overview</h2>
      <p>Get TARMAC installed and configured in your project in under 5 minutes. The system supports npm, yarn, and pnpm.</p>

      <ImagePlaceholder label="Installation setup — npm, yarn, project structure" path="/assets/images/installation-setup.png" height={200} />

      <h2>Requirements</h2>
      <table>
        <thead><tr><th>Dependency</th><th>Version</th></tr></thead>
        <tbody>
          <tr><td>React</td><td>18.0+</td></tr>
          <tr><td>React DOM</td><td>18.0+</td></tr>
          <tr><td>Node.js</td><td>16.0+</td></tr>
          <tr><td>TypeScript</td><td>4.7+ (optional)</td></tr>
        </tbody>
      </table>

      <Info>
        TARMAC is built with TypeScript and includes type definitions out of the box. No additional <code>@types</code> packages needed.
      </Info>
    </PageShell>
  );
}
