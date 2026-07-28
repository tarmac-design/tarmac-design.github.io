'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export default function CustomCursor() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const [isOnLink, setIsOnLink] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
      const target = e.target as HTMLElement;
      setIsOnLink(target.closest('a, button, [role="button"]') !== null);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Simple lerp — follows same path, just slightly behind
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isOnLink ? 16 : 10,
        height: isOnLink ? 16 : 10,
        borderRadius: 0,
        background: isOnLink ? (isDark ? '#ED1B36' : '#B01020') : (isDark ? '#fff' : '#000'),
        border: 'none',
        transition: 'width 0.15s ease, height 0.15s ease, background 0.15s ease, opacity 0.15s ease',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: isVisible ? 1 : 0,
        willChange: 'transform',
      }}
    />
  );
}
