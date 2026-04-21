'use client';
import { PageShell } from '@/components/PageShell';

export default function RadiusPage() {
  return (
    <PageShell title="Radius" description="Border radius tokens for consistent rounded corners across components.">
      <h2>Radius Scale</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>radius-none</td><td>0px</td><td>Sharp corners</td></tr>
          <tr><td>radius-sm</td><td>4px</td><td>Small elements, tags</td></tr>
          <tr><td>radius-md</td><td>6px</td><td>Buttons, inputs</td></tr>
          <tr><td>radius-lg</td><td>8px</td><td>Cards, dropdowns</td></tr>
          <tr><td>radius-xl</td><td>12px</td><td>Modals, large cards</td></tr>
          <tr><td>radius-2xl</td><td>16px</td><td>Hero sections</td></tr>
          <tr><td>radius-full</td><td>9999px</td><td>Pills, avatars</td></tr>
        </tbody>
      </table>
      <h2>Visual Examples</h2>
      <div className="flex gap-4 flex-wrap mb-6">
        {[{r:'0px',l:'none'},{r:'4px',l:'sm'},{r:'6px',l:'md'},{r:'8px',l:'lg'},{r:'12px',l:'xl'},{r:'16px',l:'2xl'},{r:'9999px',l:'full'}].map(({r,l}) => (
          <div key={l} className="text-center">
            <div className="w-16 h-16 bg-neutral-200 border border-neutral-300" style={{ borderRadius: r }} />
            <div className="text-xs mt-1 text-neutral-500">{l}</div>
            <div className="text-[10px] text-neutral-400">{r}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
