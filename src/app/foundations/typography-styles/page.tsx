'use client';
import { PageShell } from '@/components/PageShell';

export default function TypographyStylesPage() {
  return (
    <PageShell title="Typography Styles" description="Visual examples of all TARMAC typography styles.">
      <h2>Display</h2>
      <div className="p-6 rounded-xl border border-neutral-200 mb-6">
        <p style={{ fontSize: '36px', fontWeight: 700, lineHeight: '44px' }}>The quick brown fox jumps over the lazy dog</p>
        <p className="text-xs text-neutral-400 mt-2">36px / Bold / 44px line-height</p>
      </div>
      <h2>Heading 1</h2>
      <div className="p-6 rounded-xl border border-neutral-200 mb-6">
        <p style={{ fontSize: '30px', fontWeight: 700, lineHeight: '38px' }}>The quick brown fox jumps over the lazy dog</p>
        <p className="text-xs text-neutral-400 mt-2">30px / Bold / 38px line-height</p>
      </div>
      <h2>Heading 2</h2>
      <div className="p-6 rounded-xl border border-neutral-200 mb-6">
        <p style={{ fontSize: '24px', fontWeight: 600, lineHeight: '32px' }}>The quick brown fox jumps over the lazy dog</p>
        <p className="text-xs text-neutral-400 mt-2">24px / Semibold / 32px line-height</p>
      </div>
      <h2>Body</h2>
      <div className="p-6 rounded-xl border border-neutral-200 mb-6">
        <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: '22px' }}>The quick brown fox jumps over the lazy dog. TARMAC provides a consistent type system across all Delhivery products.</p>
        <p className="text-xs text-neutral-400 mt-2">14px / Regular / 22px line-height</p>
      </div>
    </PageShell>
  );
}
