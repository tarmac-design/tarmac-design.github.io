'use client';

interface GuidelineImageProps {
  title: string;
  slug: string;
  section: string;
  height?: number;
}

export function GuidelineImage({ title, slug, section, height = 200 }: GuidelineImageProps) {
  return (
    <div style={{ width: '100%', height: `${height}px`, backgroundColor: 'var(--color-surface-container, #f8f9fa)', border: '1px dashed var(--color-outline, #e2e8f0)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem' }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#94a3b8' }}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
      <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>{title}</span>
      <span style={{ fontSize: '11px', color: '#cbd5e1' }}>/assets/components/{slug}/{section}.png</span>
    </div>
  );
}
