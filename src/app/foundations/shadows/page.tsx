'use client';
import { PageShell } from '@/components/PageShell';

export default function ShadowsPage() {
  return (
    <PageShell title="Shadows" description="Elevation system using box shadows to create depth hierarchy.">
      <h2>Shadow Scale</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>shadow-sm</td><td>0 1px 2px rgba(0,0,0,0.05)</td><td>Subtle lift, cards at rest</td></tr>
          <tr><td>shadow-md</td><td>0 4px 6px rgba(0,0,0,0.07)</td><td>Hover states, dropdowns</td></tr>
          <tr><td>shadow-lg</td><td>0 10px 15px rgba(0,0,0,0.1)</td><td>Modals, popovers</td></tr>
          <tr><td>shadow-xl</td><td>0 20px 25px rgba(0,0,0,0.15)</td><td>Dialogs, overlays</td></tr>
        </tbody>
      </table>
      <h2>Visual Examples</h2>
      <div className="flex gap-6 flex-wrap mb-6">
        {[
          {l:'sm', s:'0 1px 2px rgba(0,0,0,0.05)'},
          {l:'md', s:'0 4px 6px rgba(0,0,0,0.07)'},
          {l:'lg', s:'0 10px 15px rgba(0,0,0,0.1)'},
          {l:'xl', s:'0 20px 25px rgba(0,0,0,0.15)'},
        ].map(({l,s}) => (
          <div key={l} className="text-center">
            <div className="w-24 h-24 bg-white rounded-lg border border-neutral-100" style={{ boxShadow: s }} />
            <div className="text-xs mt-2 text-neutral-500">shadow-{l}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
