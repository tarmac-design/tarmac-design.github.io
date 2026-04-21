'use client';
import { PageShell } from '@/components/PageShell';

export default function PhilosophyPage() {
  return (
    <PageShell title="Philosophy" description="TARMAC is built on core principles that guide every design and development decision.">
      <h2>Overview</h2>
      <p>
        TARMAC is built on core principles that guide every design and development decision. These principles ensure the system remains consistent, accessible, and scalable as it evolves across products and teams.
      </p>

      <h2>Design Values</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-6 rounded-xl border border-neutral-200 text-center">
          <h4 className="font-semibold">Clarity Over Cleverness</h4>
        </div>
        <div className="p-6 rounded-xl border border-neutral-200 text-center">
          <h4 className="font-semibold">Function Over Form</h4>
        </div>
        <div className="p-6 rounded-xl border border-neutral-200 text-center">
          <h4 className="font-semibold">Inclusive By Default</h4>
        </div>
        <div className="p-6 rounded-xl border border-neutral-200 text-center">
          <h4 className="font-semibold">Flexible Yet Opinionated</h4>
        </div>
      </div>

      <h2>How TARMAC Evolves</h2>
      <p>TARMAC is a living system. It evolves through:</p>
      <table>
        <thead><tr><th>Input</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td>User feedback and research</td><td>Validates patterns, surfaces pain points</td></tr>
          <tr><td>Accessibility standards</td><td>Ensures compliance with WCAG updates</td></tr>
          <tr><td>Emerging technologies</td><td>Adopts new patterns when they solve real problems</td></tr>
          <tr><td>Team needs</td><td>Responds to product requirements and developer workflows</td></tr>
        </tbody>
      </table>
      <p>We balance stability with innovation — ensuring the system remains relevant while maintaining reliability.</p>
    </PageShell>
  );
}
