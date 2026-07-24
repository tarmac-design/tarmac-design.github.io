'use client';

import { useState } from 'react';

type Role = 'designer' | 'developer';

export function RoleToggle({ children }: { children: (role: Role) => React.ReactNode }) {
  const [role, setRole] = useState<Role>('designer');
  const [hovered, setHovered] = useState<Role | null>(null);

  return (
    <div>
      {/* Content */}
      {children(role)}

      {/* Floating sticky toggle at bottom center */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        padding: '6px',
        borderRadius: '12px',
        backgroundColor: 'var(--color-surface-container-high, #262626)',
        border: '1px solid var(--color-outline)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}>
        {/* Designer button */}
        <button
          onClick={() => setRole('designer')}
          onMouseEnter={() => setHovered('designer')}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 10px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: role === 'designer' ? 'var(--color-primary)' : 'transparent',
            color: role === 'designer' ? '#fff' : 'var(--color-on-surface-variant)',
            transition: 'all 0.2s ease',
          }}
          aria-label="Designer view"
        >
          {/* Pen/design icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
          </svg>
          {(hovered === 'designer' || role === 'designer') && (
            <span style={{ fontSize: '11px', fontWeight: 500, whiteSpace: 'nowrap' }}>Designer</span>
          )}
        </button>

        {/* Developer button */}
        <button
          onClick={() => setRole('developer')}
          onMouseEnter={() => setHovered('developer')}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 10px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: role === 'developer' ? 'var(--color-primary)' : 'transparent',
            color: role === 'developer' ? '#fff' : 'var(--color-on-surface-variant)',
            transition: 'all 0.2s ease',
          }}
          aria-label="Developer view"
        >
          {/* Code icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
          </svg>
          {(hovered === 'developer' || role === 'developer') && (
            <span style={{ fontSize: '11px', fontWeight: 500, whiteSpace: 'nowrap' }}>Developer</span>
          )}
        </button>
      </div>
    </div>
  );
}
