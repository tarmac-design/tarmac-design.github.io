'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/*
  Splash Screen — TARMAC Design System

  - Dark background with static grid mesh
  - Orbiting glow reveals grid lines (connectivity with homepage)
  - TARMAC logo zooms out in center (Motion-powered)
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
    setStage(3);
    setTimeout(() => {
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
      {/* Main splash content */}
      <motion.div
        style={{ position: 'absolute', inset: 0, background: '#0A0A0A' }}
        animate={{ opacity: shutterClosed ? 0 : 1 }}
        transition={{ duration: SHUTTER_CLOSE_MS * 0.6 / 1000, ease: 'easeOut' }}
      >
        {/* Static dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: 0.04,
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />

        {/* Glow-revealed dot grid */}
        <motion.div
          ref={glowRef}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(0px circle at 50% 50%, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(0px circle at 50% 50%, black 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
          animate={{ opacity: glowActive ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* TARMAC logo — Motion-powered zoom + fade */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
        }}>
          <AnimatePresence>
            {logoVisible && (
              <motion.img
                key="splash-logo"
                src="/assets/images/splash-logo.png"
                alt="TARMAC"
                draggable={false}
                initial={{ opacity: 0, scale: 1.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: 'clamp(160px, 25vw, 360px)',
                  height: 'auto',
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Skip hint */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{
            position: 'absolute', bottom: 28, left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 11, letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.15)',
            zIndex: 11,
          }}
        >
          Click to skip
        </motion.span>
      </motion.div>

      {/* Shutter — top half */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
          background: '#0A0A0A', zIndex: 20,
        }}
        initial={{ y: '-100%' }}
        animate={{
          y: shutterClosed ? (shutterOpen ? '-100%' : '0%') : '-100%',
        }}
        transition={{
          duration: (shutterOpen ? SHUTTER_OPEN_MS : SHUTTER_CLOSE_MS) / 1000,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Shutter — bottom half */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: '#0A0A0A', zIndex: 20,
        }}
        initial={{ y: '100%' }}
        animate={{
          y: shutterClosed ? (shutterOpen ? '100%' : '0%') : '100%',
        }}
        transition={{
          duration: (shutterOpen ? SHUTTER_OPEN_MS : SHUTTER_CLOSE_MS) / 1000,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  );
}
