'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { MdxProvider } from '@/components/MdxProvider';

/* ── Copy button injector for all <pre> code blocks ── */
function CopyCodeButtons({ containerRef, deps }: { containerRef: React.RefObject<HTMLDivElement | null>; deps?: unknown }) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Small delay to let React render the tab content
    const timer = setTimeout(() => {
      // Remove any previously injected buttons (on tab switch)
      container.querySelectorAll('.copy-code-btn').forEach(btn => btn.remove());

      const pres = container.querySelectorAll('pre');
      pres.forEach((pre) => {
        pre.style.position = 'relative';

        const btn = document.createElement('button');
        btn.className = 'copy-code-btn';
        btn.setAttribute('aria-label', 'Copy code');
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
        Object.assign(btn.style, {
          position: 'absolute', top: '8px', right: '8px', padding: '6px',
          borderRadius: '6px', border: '1px solid var(--color-outline)',
          background: 'var(--color-surface)', color: 'var(--color-on-surface-variant)',
          cursor: 'pointer', opacity: '0', transition: 'opacity 0.15s ease',
          zIndex: '5', display: 'flex', alignItems: 'center', justifyContent: 'center',
        });

        pre.addEventListener('mouseenter', () => { btn.style.opacity = '1'; });
        pre.addEventListener('mouseleave', () => { if (!btn.dataset.copied) btn.style.opacity = '0'; });

        btn.addEventListener('click', async () => {
          const code = pre.querySelector('code');
          const text = code ? code.textContent || '' : pre.textContent || '';
          try {
            await navigator.clipboard.writeText(text);
          } catch {
            const ta = document.createElement('textarea');
            ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta); ta.select(); document.execCommand('copy');
            document.body.removeChild(ta);
          }
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1BA86E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
          btn.dataset.copied = '1'; btn.style.opacity = '1';
          setTimeout(() => {
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
            delete btn.dataset.copied; btn.style.opacity = '0';
          }, 1500);
        });

        pre.appendChild(btn);
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [containerRef, deps]);

  return null;
}

export function PageShell({
  title,
  description,
  tabs,
  children,
}: {
  title: string;
  description?: string;
  tabs?: { label: string; content: React.ReactNode }[];
  children: React.ReactNode;
}) {
  const allTabs = tabs && tabs.length > 0
    ? tabs
    : [{ label: 'Overview', content: children }];

  const [activeTab, setActiveTab] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!bannerRef.current || !glowRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.maskImage = `radial-gradient(250px circle at ${x}px ${y}px, black 0%, transparent 70%)`;
    (glowRef.current.style as unknown as Record<string, string>)['webkitMaskImage'] = `radial-gradient(250px circle at ${x}px ${y}px, black 0%, transparent 70%)`;
    glowRef.current.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  return (
    <div>
      {/* Title banner */}
      <div
        ref={bannerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden flex flex-col min-h-[25vh] sm:min-h-[35vh]"
        style={{
          background: 'var(--color-surface-container-low)',
        }}
      >
        {/* Subtle + pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        {/* Mouse glow on + pattern — 20% near cursor */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Top spacer — larger to push title below center */}
        <div style={{ flex: 3 }} />
        <div className="relative w-full px-5 sm:w-[75%] sm:mx-auto sm:px-6">
          <h1
            className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-tight mb-2 leading-tight"
            style={{ color: 'var(--color-on-surface)' }}
          >
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-[15px] leading-relaxed mb-6" style={{ color: 'var(--color-on-surface-variant)' }}>
              {description}
            </p>
          )}
        </div>
        {/* Bottom spacer — smaller */}
        <div style={{ flex: 2 }} />

        {/* Tabs — left aligned with title, pinned to bottom */}
        <div className="relative w-full px-5 sm:w-[75%] sm:mx-auto sm:px-6 overflow-x-auto">
          {allTabs.length > 1 ? (
            <div className="flex gap-0 border-b" style={{ borderColor: 'var(--color-outline)' }}>
              {allTabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className="px-4 py-2.5 text-sm font-medium transition-colors relative"
                  style={{ color: activeTab === i ? 'var(--color-primary)' : 'var(--color-on-surface-variant)' }}
                >
                  {tab.label}
                  {activeTab === i && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'var(--color-primary)' }} />
                  )}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Tab content — same constrained width */}
      <div className="w-full px-5 sm:w-[75%] sm:mx-auto sm:px-6 py-6 sm:py-8 mdx-content" ref={contentRef}>
        <MdxProvider>{allTabs[activeTab].content}</MdxProvider>
        <CopyCodeButtons containerRef={contentRef} deps={activeTab} />
      </div>
    </div>
  );
}
