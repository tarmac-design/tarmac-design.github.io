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
          0% { transform: translate(0px, 0px); }
          100% { transform: translate(920px, -460px); }
        }
        @keyframes tmIsoGrey {
          0%, 48% { opacity: 1; }
          52%, 100% { opacity: 0; }
        }
        @keyframes tmIsoRed {
          0%, 48% { opacity: 0; }
          52%, 100% { opacity: 1; }
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

        {/* Travelling cubes — 4 boxes with staggered delays */}
        {[0, -3, -6, -9].map((delay, i) => (
          <g key={i} transform="translate(600,840)">
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

        {/* HUB: isometric Delhivery facility */}
        <g transform="translate(680,220)">
          <polygon points="192,266 232,246 272,266 232,286" fill="#F4626C" />
          <polygon points="192,266 232,286 232,376 192,356" fill="#E8192C" />
          <polygon points="272,266 232,286 232,376 272,356" fill="#B01020" />
          <polygon points="448,374 488,354 528,374 488,394" fill="#F4626C" />
          <polygon points="448,374 488,394 488,484 448,464" fill="#E8192C" />
          <polygon points="528,374 488,394 488,484 528,464" fill="#B01020" />
          <polygon points="256,172 576,332 464,388 144,228" fill="#F4626C" />
          <polygon points="144,228 464,388 464,438 144,278" fill="#E8192C" />
          <polygon points="576,332 464,388 464,438 576,382" fill="#B01020" />
          <rect
            x="286" y="322" width="22" height="22"
            fill="#FFFFFF" opacity="0.92"
            transform="skewY(26.57) translate(0,-152)"
          />
        </g>
      </svg>

      {/* Hero content group — pointer-events: none so grid hover works through it */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        justifyContent: 'center', textAlign: 'left',
        maxWidth: 1024, margin: '0 auto',
        minHeight: 'calc(100vh - 64px)', padding: '0 24px',
        pointerEvents: 'none',
      }}>
        <h1 style={{
          margin: 0, color: colors.text,
          fontSize: 'clamp(36px, 4.5vw, 64px)',
          lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 800,
        }}>
          Build great experience<br />with{' '}
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
