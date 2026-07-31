'use client';

export function ArchivedBanner() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 16px',
      borderRadius: '10px',
      border: '1px solid #F59E0B',
      background: 'rgba(245, 158, 11, 0.08)',
      marginBottom: '1.5rem',
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8v13H3V8" />
        <path d="M1 3h22v5H1z" />
        <path d="M10 12h4" />
      </svg>
      <span style={{ fontSize: '13px', color: '#F59E0B', fontWeight: 500 }}>
        This component has been archived and is no longer actively maintained.
      </span>
    </div>
  );
}
