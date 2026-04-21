'use client';
import { PageShell } from '@/components/PageShell';

const palette = [
  { name: 'Red', shades: [{s:'50',h:'#FEF2F2'},{s:'100',h:'#FEE2E2'},{s:'200',h:'#FECACA'},{s:'300',h:'#FCA5A5'},{s:'400',h:'#F87171'},{s:'500',h:'#ED1B36'},{s:'600',h:'#DC2626'},{s:'700',h:'#B91C1C'},{s:'800',h:'#991B1B'},{s:'900',h:'#7F1D1D'}] },
  { name: 'Blue', shades: [{s:'50',h:'#EFF6FF'},{s:'100',h:'#DBEAFE'},{s:'200',h:'#BFDBFE'},{s:'300',h:'#93C5FD'},{s:'400',h:'#60A5FA'},{s:'500',h:'#2396FB'},{s:'600',h:'#2563EB'},{s:'700',h:'#1D4ED8'},{s:'800',h:'#1E40AF'},{s:'900',h:'#1E3A8A'}] },
  { name: 'Green', shades: [{s:'50',h:'#F0FDF4'},{s:'100',h:'#DCFCE7'},{s:'200',h:'#BBF7D0'},{s:'300',h:'#86EFAC'},{s:'400',h:'#4ADE80'},{s:'500',h:'#1BA86E'},{s:'600',h:'#16A34A'},{s:'700',h:'#15803D'},{s:'800',h:'#166534'},{s:'900',h:'#14532D'}] },
  { name: 'Neutral', shades: [{s:'50',h:'#FAFAFA'},{s:'100',h:'#F5F5F5'},{s:'200',h:'#E5E5E5'},{s:'300',h:'#D4D4D4'},{s:'400',h:'#A3A3A3'},{s:'500',h:'#737373'},{s:'600',h:'#525252'},{s:'700',h:'#404040'},{s:'800',h:'#262626'},{s:'900',h:'#0D0D0D'}] },
];

export default function ColorsPalettePage() {
  return (
    <PageShell title="Color Palette" description="The complete TARMAC color palette with all shades and values.">
      {palette.map((color) => (
        <div key={color.name}>
          <h2>{color.name}</h2>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-8">
            {color.shades.map((shade) => (
              <div key={shade.s} className="text-center">
                <div className="w-full aspect-square rounded-lg border border-neutral-200 mb-1" style={{ backgroundColor: shade.h }} />
                <div className="text-[10px] font-medium">{shade.s}</div>
                <div className="text-[10px] text-neutral-400">{shade.h}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </PageShell>
  );
}
