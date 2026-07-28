'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

export default function HeroFold() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  // Theme-aware colors
  const colors = isDark
    ? {
        bg: '#0A0A0B',
        text: '#FFFFFF',
        muted: 'rgba(255,255,255,0.62)',
        border: 'rgba(255,255,255,0.16)',
        isoT: '#3E3E44',
        isoL: '#2E2E33',
        isoR: '#242429',
        isoGrid: 'rgba(255,255,255,0.09)',
        hoverFill: 'rgba(232,25,44,0.14)',
      }
    : {
        bg: '#FFFFFF',
        text: '#101012',
        muted: 'rgba(16,16,18,0.64)',
        border: 'rgba(16,16,18,0.18)',
        isoT: '#DEDEE2',
        isoL: '#C4C4CB',
        isoR: '#ACACB4',
        isoGrid: 'rgba(16,16,18,0.1)',
        hoverFill: 'rgba(232,25,44,0.1)',
      };

  // Generate grid cells for the SVG
  const gridCells = useCallback(() => {
    const cells: { x: number; y: number; key: string }[] = [];
    const W = 120, H = 60;
    for (let row = 0; row <= 14; row++) {
      for (let col = 0; col <= 12; col++) {
        cells.push({ x: col * W + W / 2, y: row * H + H / 2, key: `a-${row}-${col}` });
      }
      for (let col = 0; col <= 11; col++) {
        cells.push({ x: col * W + W, y: row * H + H, key: `b-${row}-${col}` });
      }
    }
    return cells;
  }, []);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: colors.bg,
        fontFamily: "'Archivo', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Custom cursor */}
      {/* CSS Animations */}
      <style>{`
        @keyframes tmIsoMove {
          0% { transform: translate(-900px, 450px); }
          100% { transform: translate(1500px, -750px); }
        }
        @keyframes tmIsoGrey {
          0%, 58% { opacity: 1; }
          62%, 100% { opacity: 0; }
        }
        @keyframes tmIsoRed {
          0%, 58% { opacity: 0; }
          62%, 100% { opacity: 1; }
        }
        @keyframes tmIsoFront {
          0%, 24% { opacity: 1; }
          26%, 100% { opacity: 0; }
        }
        .iso-cell:hover {
          background: ${isDark ? 'rgba(232,25,44,0.14)' : 'rgba(232,25,44,0.08)'} !important;
        }
      `}</style>

      {/* Full-page isometric SVG — grid + animations + hoverable cells */}
      <svg
        viewBox="0 0 1440 830"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          minHeight: '100vh',
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="isoGrid"
            width="120"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M60 0 L120 30 L60 60 L0 30 Z"
              fill="none"
              stroke={colors.isoGrid}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        {/* Grid background */}
        <rect x="0" y="0" width="1440" height="830" fill="url(#isoGrid)" />

        {/* Road running diagonally — wider, covers left side of page */}
        {/* Road background to cover grid lines */}
        <polygon points="0,550 1440,-50 1440,30 0,730" fill={colors.bg} />
        {/* Road surface */}
        <polygon points="0,550 1440,-50 1440,30 0,730" fill={isDark ? 'rgba(255,255,255,0.06)' : '#E8EBF0'} />
        {/* Road event blocker — prevents grid hover on road area */}
        <polygon points="0,550 1440,-50 1440,30 0,730" fill="transparent" style={{ pointerEvents: 'all' }} onMouseEnter={() => setHoveredCell(null)} />
        <polyline points="0,640 1440,-20" stroke={isDark ? 'rgba(255,255,255,0.15)' : '#FFFFFF'} strokeWidth="4" strokeDasharray="26 30" fill="none" style={{ pointerEvents: 'none' }} />

        {/* Hoverable diamond cells — inside SVG so they align perfectly */}
        {gridCells().map((cell) => (
          <polygon
            key={cell.key}
            points={`${cell.x},${cell.y - 30} ${cell.x + 60},${cell.y} ${cell.x},${cell.y + 30} ${cell.x - 60},${cell.y}`}
            fill={hoveredCell === cell.key ? colors.hoverFill : 'transparent'}
            style={{ transition: 'fill 0.2s ease', cursor: 'default' }}
            onMouseEnter={() => setHoveredCell(cell.key)}
            onMouseLeave={() => setHoveredCell(null)}
          />
        ))}

        {/* Tunnel interior (drawn beneath cubes so they pass through) */}
        <g transform="translate(180,10) scale(0.8)">
        <clipPath id="tmTunnel"><polygon points="930,535 1010,575 1010,675 930,635" /></clipPath>
        <g clipPath="url(#tmTunnel)">
          <polygon points="930,535 1010,575 1010,675 930,635" fill="#570810" />
          <polygon points="930,635 1010,675 1046,657 966,617" fill="#9A1122" />
          <polygon points="930,535 1010,575 1046,557 966,517" fill="#43060C" />
          <polygon points="930,535 930,635 966,617 966,517" fill="#7E0B19" />
        </g>

        {/* Travelling cubes — 4 boxes with staggered delays */}
        {[0, -3, -6, -9].map((delay, i) => (
          <g key={i} transform="translate(600,788)">
            <g style={{ animation: `tmIsoMove 12s linear infinite`, animationDelay: `${delay}s` }}>
              <g style={{ animation: `tmIsoGrey 12s linear infinite`, animationDelay: `${delay}s` }}>
                <polygon points="0,0 26,13 0,26 -26,13" fill={colors.isoT} />
                <polygon points="-26,13 0,26 0,52 -26,39" fill={colors.isoL} />
                <polygon points="26,13 0,26 0,52 26,39" fill={colors.isoR} />
              </g>
              <g style={{ animation: `tmIsoRed 12s linear infinite`, animationDelay: `${delay}s` }}>
                <polygon points="0,0 26,13 0,26 -26,13" fill="#F4626C" />
                <polygon points="-26,13 0,26 0,52 -26,39" fill="#E8192C" />
                <polygon points="26,13 0,26 0,52 26,39" fill="#B01020" />
              </g>
            </g>
          </g>
        ))}

        {/* HUB: isometric cube with tunnel */}
        <g>
          {/* Front-left face with tunnel cut out */}
          <path fillRule="evenodd" d="M880,440 L1060,530 L1060,700 L880,610 Z M930,535 L1010,575 L1010,675 L930,635 Z" fill="#DB1F33" />
          {/* Front-right face */}
          <polygon points="1060,530 1240,440 1240,610 1060,700" fill="#B01020" />
          {/* Top face */}
          <polygon points="880,440 1060,350 1240,440 1060,530" fill="#F04352" />
        </g>
        </g>
      </svg>

      {/* Hero content group — pointer-events: none so grid hover works through it */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        justifyContent: 'center', textAlign: 'left',
        maxWidth: 1024, margin: '0 auto',
        minHeight: 'calc(100vh - 64px)', padding: '40px 24px 0',
        pointerEvents: 'none',
      }}>
        <h1 style={{
          margin: 0, color: colors.text,
          fontSize: 'clamp(32px, 3.8vw, 52px)',
          lineHeight: 1.1, letterSpacing: '-0.03em', fontWeight: 800,
        }}>
          Build great experiences<br />with{' '}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={isDark ? '/tarmac-hero-dark.svg' : '/tarmac-hero-light.svg'}
            alt="TARMAC"
            style={{ height: '0.75em', width: 'auto', display: 'inline', verticalAlign: 'baseline', position: 'relative', top: '-0.03em' }}
          />
        </h1>
        <p style={{
          margin: '20px 0 0', color: colors.muted,
          fontSize: 16, lineHeight: 1.6, maxWidth: 480,
        }}>
          Delhivery&apos;s unified design system — the single source of truth
          for design decisions, UI components, and interaction patterns.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, pointerEvents: 'auto' }}>
          <Link
            href="/about/overview"
            style={{
              background: '#E8192C', color: '#fff', fontWeight: 700,
              fontSize: 14, padding: '12px 24px', borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            Get started <span>→</span>
          </Link>
          <Link
            href="/components/button"
            style={{
              border: `1px solid ${colors.border}`, color: colors.text,
              fontWeight: 600, fontSize: 14, padding: '12px 24px',
              borderRadius: 999,
            }}
          >
            Browse components
          </Link>
        </div>
      </div>
    </div>
  );
}
