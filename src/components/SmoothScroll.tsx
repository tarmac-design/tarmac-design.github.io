'use client';

import { useEffect, useRef } from 'react';

export function SmoothScroll() {
  const current = useRef(0);
  const target = useRef(0);
  const cleanupRef = useRef<(() => void) | null>(null);
  const ease = 0.18;

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 768 || 'ontouchstart' in window) return;

    const wrapper = document.getElementById('smooth-wrapper');
    if (!wrapper) return;

    // Wait a tick for content to render before measuring
    const timer = setTimeout(() => {
      document.body.style.height = `${document.documentElement.scrollHeight}px`;

      wrapper.style.position = 'fixed';
      wrapper.style.top = '0';
      wrapper.style.left = '0';
      wrapper.style.width = '100%';
      wrapper.style.willChange = 'transform';

      const onScroll = () => {
        target.current = window.scrollY;
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      let raf: number;
      const animate = () => {
        current.current += (target.current - current.current) * ease;
        wrapper.style.transform = `translateY(${-current.current}px)`;
        document.body.style.height = `${wrapper.scrollHeight}px`;
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);

      cleanupRef.current = () => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(raf);
        wrapper.style.position = '';
        wrapper.style.top = '';
        wrapper.style.left = '';
        wrapper.style.width = '';
        wrapper.style.transform = '';
        wrapper.style.willChange = '';
        document.body.style.height = '';
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return null;
}
