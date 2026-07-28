'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

export default function HeroFoldOption2() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(true);
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 });
  const spacerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const SCROLL_DISTANCE = 3200; // more room for the extra phase

  useEffect(() => {
    const handleScroll = () => {
      if (!spacerRef.current) return;
      const spacerRect = spacerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolledInto = Math.max(0, -spacerRect.top);
      const maxScroll = spacerRef.current.offsetHeight - vh;
      const progress = Math.max(0, Math.min(1, scrolledInto / maxScroll));
      setScrollProgress(progress);
      setIsPinned(spacerRect.top <= 0 && spacerRect.bottom >= vh);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const clamp = (x: number) => Math.max(0, Math.min(1, x));

  // Phase 1: 0–0.15 → text fades, frame rises
  const heroOp = 1 - clamp(scrollProgress / 0.14);
  // Frame rises: starts at 75% (peeking at bottom of viewport), ends at 50% (centered)
  const rise = clamp(scrollProgress / 0.2);
  // Use percentage-based positioning for responsive centering
  const frameTopPercent = 75 - 25 * rise; // 75% → 50%

  // Phase 2: 0.2–0.55 → dim + tiles appear
  const dimOp = clamp((scrollProgress - 0.22) / 0.1) * 0.78;
  const tiles = Array.from({ length: 9 }, (_, i) =>
    scrollProgress >= 0.28 + i * 0.035 ? 1 : 0
  );

  // Phase 3: 0.6–0.75 → tiles dissolve, "35+ more" text appears
  const tilesDissolve = clamp((scrollProgress - 0.6) / 0.1);
  const moreTextOp = clamp((scrollProgress - 0.68) / 0.1);

  // Phase 4: 0.85–1.0 → "more" text fades, ready to release
  const finalFade = 1 - clamp((scrollProgress - 0.9) / 0.1);

  const colors = isDark
    ? { bg: '#0B0B0C', text: '#fff', muted: 'rgba(255,255,255,0.62)',
        border: 'rgba(255,255,255,0.16)', panel: '#17171A',
        gridLine: 'rgba(255,255,255,0.06)' }
    : { bg: '#F5F4F1', text: '#101012', muted: 'rgba(16,16,18,0.64)',
        border: 'rgba(16,16,18,0.18)', panel: '#FFFFFF',
        gridLine: 'rgba(16,16,18,0.08)' };

  const tileData = [
    { label: 'BUTTON', content: <span style={{ background: '#E8192C', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 22px', borderRadius: 8 }}>Get started</span> },
    { label: 'INPUT', content: <span style={{ border: `1px solid ${colors.border}`, color: colors.muted, fontSize: 13, padding: '10px 16px', borderRadius: 8, width: '60%', display: 'inline-block' }}>AWB number</span> },
    { label: 'TOGGLE', content: <span style={{ width: 46, height: 26, borderRadius: 999, background: '#E8192C', position: 'relative', display: 'inline-block' }}><span style={{ position: 'absolute', right: 3, top: 3, width: 20, height: 20, borderRadius: '50%', background: '#fff' }} /></span> },
    { label: 'BADGE', content: <span style={{ background: 'rgba(232,25,44,0.14)', color: '#E8192C', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', padding: '6px 14px', borderRadius: 999 }}>IN TRANSIT</span> },
    { label: 'PROGRESS', content: <span style={{ width: '62%', height: 8, borderRadius: 999, background: 'rgba(127,127,132,0.3)', position: 'relative', display: 'inline-block' }}><span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '70%', borderRadius: 999, background: '#E8192C' }} /></span> },
    { label: 'TABS', content: <span style={{ display: 'inline-flex', gap: 18, fontSize: 13, fontWeight: 600, color: colors.muted }}><span style={{ color: colors.text, borderBottom: '2px solid #E8192C', paddingBottom: 5 }}>Overview</span><span>Specs</span><span>Code</span></span> },
    { label: 'CHECKBOX', content: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, color: colors.text }}><span style={{ width: 18, height: 18, borderRadius: 4, background: '#E8192C', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</span>Fragile handling</span> },
    { label: 'TOAST', content: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${colors.border}`, borderRadius: 8, padding: '8px 14px', fontSize: 12.5, color: colors.text }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8192C' }} />AWB 128-4471 delivered</span> },
    { label: 'STEPPER', content: <span style={{ display: 'inline-flex', alignItems: 'center' }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#E8192C' }} /><span style={{ width: 52, height: 2, background: '#E8192C' }} /><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#E8192C' }} /><span style={{ width: 52, height: 2, background: 'rgba(127,127,132,0.35)' }} /><span style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(127,127,132,0.5)', boxSizing: 'border-box' }} /></span> },
  ];

  return (
    <>
      <div ref={spacerRef} style={{ height: `calc(100vh + ${SCROLL_DISTANCE}px)`, position: 'relative' }}>
        <div
          ref={heroRef}
          onMouseMove={handleMouseMove}
          style={{
            position: isPinned ? 'fixed' : 'absolute',
            top: isPinned ? 0 : undefined,
            bottom: isPinned ? undefined : 0,
            left: 0, right: 0, height: '100vh',
            overflow: 'hidden', background: colors.bg,
            fontFamily: "'Archivo', sans-serif", zIndex: 1,
          }}
        >
          {/* Grid background */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `linear-gradient(${colors.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${colors.gridLine} 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
          {/* Hover glow — illuminates ONLY grid lines near cursor using mask */}
          {mousePos.x > 0 && (
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.9)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.9)'} 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
              maskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
            }} />
          )}


          {/* Hero copy — centered, fades on scroll */}
          <div style={{
            position: 'absolute', left: 0, right: 0,
            top: '46%', transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', textAlign: 'center',
            zIndex: 2, opacity: heroOp,
            pointerEvents: heroOp > 0.1 ? 'auto' : 'none',
          }}>
            <h1 style={{
              margin: 0, color: colors.text,
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1.04, letterSpacing: '-0.035em', fontWeight: 800,
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
              margin: '22px 0 0', color: colors.muted,
              fontSize: 17, lineHeight: 1.55, maxWidth: 560,
            }}>
              The single source of truth for design decisions, UI
              components, and interaction patterns at Delhivery.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 32 }}>
              <Link href="/about/overview" style={{
                background: '#E8192C', color: '#fff', fontWeight: 700,
                fontSize: 15, padding: '14px 26px', borderRadius: 10,
                display: 'inline-flex', alignItems: 'center', gap: 10,
              }}>
                Get started <span>→</span>
              </Link>
              <Link href="/components/button" style={{
                border: `1px solid ${colors.border}`, color: colors.text,
                fontWeight: 600, fontSize: 15, padding: '14px 26px', borderRadius: 10,
              }}>
                Browse components
              </Link>
            </div>
          </div>

          {/* Browser frame — rises from below */}
          <div style={{
            position: 'absolute', left: '50%',
            transform: `translateX(-50%) translateY(-${Math.round(rise * 50)}%)`,
            width: '75%', maxWidth: 1080, zIndex: 2, top: `${frameTopPercent}%`,
            opacity: scrollProgress > 0.85 ? finalFade : 1,
          }}>
            <div style={{
              borderRadius: 16, border: `1px solid ${colors.border}`,
              background: colors.panel,
              boxShadow: isDark ? '0 40px 120px rgba(0,0,0,0.55)' : '0 20px 60px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '13px 18px', borderBottom: `1px solid ${colors.border}`,
              }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: colors.border }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: colors.border }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: colors.border }} />
                <span style={{
                  marginLeft: 14, fontFamily: "'Space Mono', monospace",
                  fontSize: 12.5, color: colors.muted,
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  padding: '5px 14px', borderRadius: 6,
                }}>tarmac.delhivery.design</span>
              </div>
              <div style={{ width: '100%', height: 480, position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/hero/facility.png" alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', inset: 0, background: colors.bg,
                  opacity: dimOp, pointerEvents: 'none',
                }} />
                {/* Component tiles — fade in then dissolve */}
                <div style={{
                  position: 'absolute', inset: 24, display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gridTemplateRows: 'repeat(3, 1fr)', gap: 14,
                  pointerEvents: 'none',
                  opacity: 1 - tilesDissolve,
                }}>
                  {tileData.map((tile, i) => (
                    <div key={tile.label} style={{
                      opacity: tiles[i], transition: 'opacity 0.3s ease',
                      background: colors.panel, border: `1px solid ${colors.border}`,
                      borderRadius: 12, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: 12,
                    }}>
                      {tile.content}
                      <span style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 10.5, letterSpacing: '0.14em', color: colors.muted,
                      }}>{tile.label}</span>
                    </div>
                  ))}
                </div>
                {/* "35+ more" text — appears INSIDE the browser frame after tiles dissolve */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                  opacity: moreTextOp,
                  pointerEvents: moreTextOp > 0.5 ? 'auto' : 'none',
                }}>
                  <h2 style={{
                    margin: 0, color: colors.text,
                    fontSize: 'clamp(24px, 3vw, 44px)',
                    fontWeight: 800, letterSpacing: '-0.02em',
                  }}>
                    35+ more components
                  </h2>
                  <p style={{
                    margin: '12px 0 0', color: colors.muted,
                    fontSize: 15, maxWidth: 400,
                  }}>
                    Every component is documented, accessible, and tokenized.
                  </p>
                  <Link href="/components/accordion" style={{
                    background: '#E8192C', color: '#fff', fontWeight: 700,
                    fontSize: 14, padding: '12px 24px', borderRadius: 10,
                    marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}>
                    Check out the Components <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>


          {/* End of hero content */}
        </div>
      </div>
    </>
  );
}
