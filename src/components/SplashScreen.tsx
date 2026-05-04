'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/*
  Splash Screen — TARMAC Design System

  - Dark background with static grid mesh
  - Orbiting glow reveals grid lines (connectivity with homepage)
  - TARMAC logo zooms out in center
  - Exit: shutter close (top/bottom halves slide to center) then open to reveal site
*/

const GLOW_SIZE = 400;
const SHUTTER_CLOSE_MS = 500;
const SHUTTER_OPEN_MS = 500;

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);
  // 0=init, 1=glow starts, 2=logo visible, 3=shutter closing, 4=shutter opening, 5=removed
  const [removed, setRemoved] = useState(false);
  const doneRef = useRef(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const rafRef = useRef(0);

  const exit = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    // Stage 3: shutter closes
    setStage(3);
    setTimeout(() => {
      // Stage 4: shutter opens to reveal site
      setStage(4);
      setTimeout(() => {
        setRemoved(true);
        onComplete();
      }, SHUTTER_OPEN_MS);
    }, SHUTTER_CLOSE_MS);
  }, [onComplete]);

  useEffect(() => {
    const t0 = setTimeout(() => setStage(1), 200);
    const t1 = setTimeout(() => setStage(2), 900);
    const t2 = setTimeout(() => exit(), 4000);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Orbiting glow */
  useEffect(() => {
    if (stage < 1 || stage > 2) return;
    const speed = 0.025;

    function tick() {
      angleRef.current += speed;
      const el = glowRef.current;
      if (el) {
        const orbitRadius = Math.min(window.innerWidth, window.innerHeight) * 0.45;
        const x = Math.cos(angleRef.current) * orbitRadius * (window.innerWidth / window.innerHeight);
        const y = Math.sin(angleRef.current) * orbitRadius;
        const cx = window.innerWidth / 2 + x;
        const cy = window.innerHeight / 2 + y;
        const mask = `radial-gradient(${GLOW_SIZE}px circle at ${cx}px ${cy}px, black 0%, transparent 70%)`;
        el.style.maskImage = mask;
        (el.style as unknown as Record<string, string>)['webkitMaskImage'] = mask;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [stage]);

  if (removed) return null;

  const glowActive = stage >= 1 && stage <= 2;
  const logoVisible = stage >= 2 && stage <= 2;
  const shutterClosed = stage >= 3;
  const shutterOpen = stage >= 4;

  return (
    <div
      onClick={exit}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99999,
        overflow: 'hidden', userSelect: 'none', cursor: 'pointer',
      }}
    >
      {/* Main splash content — hidden once shutter closes */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#0A0A0A',
        opacity: shutterClosed ? 0 : 1,
        transition: `opacity ${SHUTTER_CLOSE_MS * 0.6}ms ease-out`,
      }}>
        {/* Static dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: 0.04,
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />

        {/* Glow-revealed dot grid */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute', inset: 0,
            opacity: glowActive ? 1 : 0,
            transition: 'opacity 0.8s ease-out',
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(0px circle at 50% 50%, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(0px circle at 50% 50%, black 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* TARMAC logo */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/splash-logo.png"
            alt="TARMAC"
            draggable={false}
            style={{
              width: 'clamp(160px, 25vw, 360px)',
              height: 'auto',
              opacity: logoVisible ? 1 : 0,
              transform: logoVisible ? 'scale(1)' : 'scale(1.6)',
              transition: 'opacity 0.8s ease-out, transform 1.2s cubic-bezier(0.22,1,0.36,1)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Skip hint */}
        <span style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 11, letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: 'rgba(255,255,255,0.15)',
          zIndex: 11,
        }}>
          Click to skip
        </span>
      </div>

      {/* Shutter — top half */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '50%',
        background: '#0A0A0A',
        transform: shutterClosed
          ? (shutterOpen ? 'translateY(-100%)' : 'translateY(0)')
          : 'translateY(-100%)',
        transition: shutterClosed
          ? `transform ${shutterOpen ? SHUTTER_OPEN_MS : SHUTTER_CLOSE_MS}ms cubic-bezier(0.22,1,0.36,1)`
          : 'none',
        zIndex: 20,
      }} />

      {/* Shutter — bottom half */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '50%',
        background: '#0A0A0A',
        transform: shutterClosed
          ? (shutterOpen ? 'translateY(100%)' : 'translateY(0)')
          : 'translateY(100%)',
        transition: shutterClosed
          ? `transform ${shutterOpen ? SHUTTER_OPEN_MS : SHUTTER_CLOSE_MS}ms cubic-bezier(0.22,1,0.36,1)`
          : 'none',
        zIndex: 20,
      }} />
    </div>
  );
}
