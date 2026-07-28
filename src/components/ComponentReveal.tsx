'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

function Toggle({ on, isDark }: { on: boolean; isDark: boolean }) {
  const bg = on ? '#E8192C' : (isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)');
  return (
    <span style={{ width: 46, height: 26, borderRadius: 999, background: bg, position: 'relative', display: 'inline-block' }}>
      <span style={{ position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', ...(on ? { right: 3 } : { left: 3 }) }} />
    </span>
  );
}

function Checkbox({ checked, text, isDark }: { checked: boolean; text: string; isDark: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, color: isDark ? '#fff' : '#101012' }}>
      {checked ? (
        <span style={{ width: 18, height: 18, borderRadius: 4, background: '#E8192C', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</span>
      ) : (
        <span style={{ width: 18, height: 18, borderRadius: 4, border: '2px solid ' + (isDark ? 'rgba(255,255,255,0.16)' : 'rgba(16,16,18,0.14)') }} />
      )}
      {text}
    </span>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <span style={{ width: 140, height: 8, borderRadius: 999, background: 'rgba(127,127,132,0.2)', position: 'relative', display: 'block' }}>
      <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${value}%`, borderRadius: 999, background: '#E8192C', transition: 'width 0.8s ease' }} />
    </span>
  );
}

function Badge({ text, active }: { text: string; active: boolean }) {
  const style = active
    ? { background: 'rgba(232,25,44,0.14)', color: '#E8192C' }
    : { background: 'rgba(127,127,132,0.12)', color: 'rgba(127,127,132,0.7)' };
  return (
    <span style={{ ...style, fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', padding: '6px 14px', borderRadius: 999 }}>{text}</span>
  );
}

function Tabs({ active, isDark }: { active: number; isDark: boolean }) {
  const items = ['Overview', 'Specs', 'Code'];
  const muted = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(16,16,18,0.5)';
  const text = isDark ? '#fff' : '#101012';
  return (
    <span style={{ display: 'inline-flex', gap: 18, fontSize: 13, fontWeight: 600, color: muted }}>
      {items.map((item, i) => (
        <span key={item} style={i === active ? { color: text, borderBottom: '2px solid #E8192C', paddingBottom: 5 } : {}}>{item}</span>
      ))}
    </span>
  );
}

function Radio({ selected, isDark }: { selected: boolean; isDark: boolean }) {
  const border = isDark ? 'rgba(255,255,255,0.16)' : 'rgba(16,16,18,0.14)';
  const text = isDark ? '#fff' : '#101012';
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 8, fontSize: 13, color: text }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${border}` }} />
        Standard
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {selected ? (
          <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #E8192C', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8192C' }} />
          </span>
        ) : (
          <span style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${border}` }} />
        )}
        Express
      </span>
    </span>
  );
}

function ButtonTile({ active }: { active: boolean }) {
  return (
    <span style={{ background: active ? '#E8192C' : 'rgba(127,127,132,0.2)', color: '#fff', fontWeight: 700, fontSize: 13, padding: '10px 20px', borderRadius: 8, transition: 'background 0.4s ease' }}>
      {active ? 'Submit' : 'Submit'}
    </span>
  );
}

function OtpTile({ progress, isDark }: { progress: number; isDark: boolean }) {
  const digits = ['4', '7', '2', '1'];
  const border = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
  return (
    <span style={{ display: 'inline-flex', gap: 6 }}>
      {digits.map((v, i) => {
        const filled = progress > (i / 4);
        return (
          <span key={i} style={{
            width: 28, height: 34, borderRadius: 6,
            border: `2px solid ${filled ? '#E8192C' : border}`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700,
            color: isDark ? '#fff' : '#101012',
            transition: 'border-color 0.3s ease',
          }}>{filled ? v : ''}</span>
        );
      })}
    </span>
  );
}

function RatingTile({ progress }: { progress: number }) {
  const count = Math.round(progress * 5);
  return (
    <span style={{ display: 'inline-flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{
          fontSize: 18,
          color: star <= count ? '#E8192C' : 'rgba(127,127,132,0.3)',
          transition: 'color 0.2s ease',
        }}>★</span>
      ))}
    </span>
  );
}

function SnackbarTile({ active, isDark }: { active: boolean; isDark: boolean }) {
  const bg = isDark ? '#1a1a1e' : '#333';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: bg, borderRadius: 8, padding: '8px 14px',
      opacity: active ? 1 : 0.4, transition: 'opacity 0.4s ease',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: active ? '#22C55E' : '#E8192C' }} />
      <span style={{ fontSize: 11, color: '#fff', fontWeight: 500 }}>
        {active ? 'Shipment updated' : 'Connection lost'}
      </span>
    </span>
  );
}

function SliderTile({ active }: { active: boolean }) {
  const val = active ? 72 : 30;
  return (
    <span style={{ width: 120, position: 'relative', display: 'block', height: 14 }}>
      <span style={{ position: 'absolute', left: 0, top: 5, right: 0, height: 4, borderRadius: 999, background: 'rgba(127,127,132,0.2)' }} />
      <span style={{ position: 'absolute', left: 0, top: 5, height: 4, borderRadius: 999, background: '#E8192C', width: `${val}%`, transition: 'width 0.8s ease' }} />
      <span style={{ position: 'absolute', top: 0, left: `${val}%`, width: 14, height: 14, borderRadius: '50%', background: '#E8192C', transform: 'translateX(-50%)', transition: 'left 0.8s ease' }} />
    </span>
  );
}

function StepperTile({ progress }: { progress: number }) {
  const step = Math.ceil(progress * 3); // 0, 1, 2, 3
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
      <span style={{ width: 20, height: 20, borderRadius: '50%', background: step >= 1 ? '#E8192C' : 'rgba(127,127,132,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, transition: 'background 0.3s ease' }}>1</span>
      <span style={{ width: 30, height: 2, background: step >= 2 ? '#E8192C' : 'rgba(127,127,132,0.3)', transition: 'background 0.3s ease' }} />
      <span style={{ width: 20, height: 20, borderRadius: '50%', background: step >= 2 ? '#E8192C' : 'rgba(127,127,132,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, transition: 'background 0.3s ease' }}>2</span>
      <span style={{ width: 30, height: 2, background: step >= 3 ? '#E8192C' : 'rgba(127,127,132,0.3)', transition: 'background 0.3s ease' }} />
      <span style={{ width: 20, height: 20, borderRadius: '50%', background: step >= 3 ? '#E8192C' : 'rgba(127,127,132,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: step >= 3 ? '#fff' : 'rgba(127,127,132,0.6)', fontSize: 10, fontWeight: 700, border: step >= 3 ? 'none' : '2px solid rgba(127,127,132,0.4)', boxSizing: 'border-box', transition: 'all 0.3s ease' }}>3</span>
    </span>
  );
}

export default function ComponentReveal() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const spacerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const SCROLL_DISTANCE = 3500;
  const [isPinned, setIsPinned] = useState(false);
  const [isBelow, setIsBelow] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (!spacerRef.current) return;
      const rect = spacerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolledIn = Math.max(0, -rect.top);
      const maxScroll = spacerRef.current.offsetHeight - vh;
      setProgress(maxScroll > 0 ? Math.min(1, scrolledIn / maxScroll) : 0);
      setIsPinned(rect.top <= 0 && rect.bottom >= vh);
      setIsBelow(rect.top > 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  // Phase 1: 0–8%   → frame rises
  // Phase 2: 10–30%  → first 6 appear (default state)
  // Phase 3: 33–36%  → first 6 flip state
  // Phase 4: 40–48%  → content scrolls inside frame
  // Phase 5: 50–68%  → second 6 appear (default state)
  // Phase 6: 72–75%  → second 6 flip state
  // Phase 7: 92–100% → frame exits up

  const frameY = progress <= 0.08
    ? 100 - clamp(progress / 0.08) * 100
    : progress >= 0.92
      ? -clamp((progress - 0.92) / 0.08) * 100
      : 0;

  const TILE_COUNT = 6;

  // First set
  const tile1Opacity = Array.from({ length: TILE_COUNT }, (_, i) => {
    const start = 0.10 + (i / TILE_COUNT) * 0.18;
    return clamp((progress - start) / 0.04);
  });
  const state1Flipped = progress >= 0.35;
  // Progressive fill for Stepper, Rating in first set (0→1 during 0.28–0.40)
  const fillProgress1 = clamp((progress - 0.28) / 0.12);

  // Content scroll (0 → 1 means shift from first page to second)
  const contentShift = clamp((progress - 0.40) / 0.08);

  // Second set
  const tile2Opacity = Array.from({ length: TILE_COUNT }, (_, i) => {
    const start = 0.50 + (i / TILE_COUNT) * 0.16;
    return clamp((progress - start) / 0.04);
  });
  const state2Flipped = progress >= 0.74;
  // Progressive fill for OTP, Rating, Stepper (0→1 during 0.67–0.88)
  const fillProgress = clamp((progress - 0.67) / 0.21);

  const colors = isDark
    ? { bg: '#0B0B0C', border: 'rgba(255,255,255,0.16)', panel: '#17171A' }
    : { bg: '#F5F4F1', border: 'rgba(16,16,18,0.14)', panel: '#FFFFFF' };

  const labels1 = ['TOGGLE', 'STEPPER', 'RATING', 'PROGRESS', 'BADGE', 'TABS'];
  const labels2 = ['BUTTON', 'OTP FIELD', 'SLIDER', 'CHECKBOX', 'RADIO', 'SNACKBAR'];

  return (
    <div ref={spacerRef} style={{
      height: `calc(100vh + ${SCROLL_DISTANCE}px)`,
      position: 'relative', background: colors.bg,
    }}>
      <div style={{
        position: isPinned ? 'fixed' : 'absolute',
        top: isPinned ? 0 : (isBelow ? 0 : undefined),
        bottom: (!isPinned && !isBelow) ? 0 : undefined,
        left: 0, right: 0, height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 5,
      }}>
        <div style={{
          width: '75%', maxWidth: 1000, borderRadius: 16,
          border: `1px solid ${colors.border}`,
          background: colors.panel,
          boxShadow: isDark ? '0 40px 120px rgba(0,0,0,0.6)' : '0 20px 60px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          transform: `translateY(${frameY}%)`,
        }}>
          {/* Browser chrome */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 16px',
            borderBottom: `1px solid ${colors.border}`,
          }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: colors.border }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: colors.border }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: colors.border }} />
            <span style={{
              marginLeft: 10, fontFamily: "'Space Mono', monospace",
              fontSize: 11.5,
              color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)',
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              padding: '4px 12px', borderRadius: 6,
            }}>
              tarmac.delhivery.design
            </span>
          </div>

          {/* Content area — fixed height, content scrolls inside */}
          <div style={{ height: 320, overflow: 'hidden', position: 'relative' }}>
            <div style={{ transform: `translateY(-${contentShift * 320}px)` }}>
              {/* First page — 6 components */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: 1, background: colors.border, height: 320,
              }}>
                {labels1.map((label, i) => (
                  <div key={label} style={{
                    background: colors.panel, opacity: tile1Opacity[i],
                    transition: 'opacity 0.4s ease',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 14, padding: 24,
                  }}>
                    <div style={{ transition: 'all 0.5s ease' }}>
                      {label === 'TOGGLE' && <Toggle on={state1Flipped} isDark={isDark} />}
                      {label === 'STEPPER' && <StepperTile progress={fillProgress1} />}
                      {label === 'RATING' && <RatingTile progress={fillProgress1} />}
                      {label === 'PROGRESS' && <Progress value={state1Flipped ? 78 : 15} />}
                      {label === 'BADGE' && <Badge text={state1Flipped ? 'IN TRANSIT' : 'PENDING'} active={state1Flipped} />}
                      {label === 'TABS' && <Tabs active={state1Flipped ? 0 : 2} isDark={isDark} />}
                    </div>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }}>{label}</span>
                  </div>
                ))}
              </div>
              {/* Second page — 6 more components */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: 1, background: colors.border, height: 320,
              }}>
                {labels2.map((label, i) => (
                  <div key={label} style={{
                    background: colors.panel, opacity: tile2Opacity[i],
                    transition: 'opacity 0.4s ease',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 14, padding: 24,
                  }}>
                    <div style={{ transition: 'all 0.5s ease' }}>
                      {label === 'BUTTON' && <ButtonTile active={state2Flipped} />}
                      {label === 'OTP FIELD' && <OtpTile progress={fillProgress} isDark={isDark} />}
                      {label === 'SLIDER' && <SliderTile active={state2Flipped} />}
                      {label === 'CHECKBOX' && <Checkbox checked={state2Flipped} text="Fragile handling" isDark={isDark} />}
                      {label === 'RADIO' && <Radio selected={state2Flipped} isDark={isDark} />}
                      {label === 'SNACKBAR' && <SnackbarTile active={state2Flipped} isDark={isDark} />}
                    </div>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
