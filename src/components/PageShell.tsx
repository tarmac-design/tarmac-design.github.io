'use client';

import { useState, useRef, useEffect } from 'react';
import { MdxProvider } from '@/components/MdxProvider';
import { motion, AnimatePresence } from 'motion/react';

/* ── Copy button injector ── */
function CopyCodeButtons({ containerRef, deps }: { containerRef: React.RefObject<HTMLDivElement | null>; deps?: unknown }) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const timer = setTimeout(() => {
      container.querySelectorAll('.copy-code-btn').forEach(btn => btn.remove());
      const pres = container.querySelectorAll('pre');
      pres.forEach((pre) => {
        pre.style.position = 'relative';
        const btn = document.createElement('button');
        btn.className = 'copy-code-btn';
        btn.setAttribute('aria-label', 'Copy code');
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
        Object.assign(btn.style, { position: 'absolute', top: '8px', right: '8px', padding: '6px', borderRadius: '6px', border: '1px solid var(--color-outline)', background: 'var(--color-surface)', color: 'var(--color-on-surface-variant)', cursor: 'pointer', opacity: '0', transition: 'opacity 0.15s ease', zIndex: '5', display: 'flex', alignItems: 'center', justifyContent: 'center' });
        pre.addEventListener('mouseenter', () => { btn.style.opacity = '1'; });
        pre.addEventListener('mouseleave', () => { if (!btn.dataset.copied) btn.style.opacity = '0'; });
        btn.addEventListener('click', async () => {
          const code = pre.querySelector('code');
          const text = code ? code.textContent || '' : pre.textContent || '';
          try { await navigator.clipboard.writeText(text); } catch { /* fallback */ }
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1BA86E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
          btn.dataset.copied = '1'; btn.style.opacity = '1';
          setTimeout(() => { btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`; delete btn.dataset.copied; btn.style.opacity = '0'; }, 1500);
        });
        pre.appendChild(btn);
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [containerRef, deps]);
  return null;
}

/* ── Right anchor nav (sticky TOC) ── */
function AnchorNav({ title, containerRef, deps }: { title: string; containerRef: React.RefObject<HTMLDivElement | null>; deps?: unknown }) {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let attempts = 0;
    const findHeadings = () => {
      const els = container.querySelectorAll('h2');
      if (els.length === 0 && attempts < 5) { attempts++; setTimeout(findHeadings, 200); return; }
      const items: { id: string; text: string }[] = [];
      els.forEach((el, i) => {
        const slug = (el.textContent || `section-${i}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        el.id = slug || `section-${i}`;
        items.push({ id: el.id, text: el.textContent || '' });
      });
      setHeadings(items);
      if (items.length > 0) setActiveId(items[0].id);
    };
    const timer = setTimeout(findHeadings, 400);
    return () => clearTimeout(timer);
  }, [containerRef, deps]);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length > 0) setActiveId(visible[0].target.id);
    }, { rootMargin: '-140px 0px -60% 0px', threshold: 0 });
    headings.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div>
      <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-on-surface)', margin: '0 0 14px', paddingLeft: '16px', lineHeight: 1.3 }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {headings.map(({ id, text }) => (
          <a key={id} href={`#${id}`}
            onClick={(e) => { e.preventDefault(); setActiveId(id); const t = document.getElementById(id); if (t) { window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' }); } }}
            style={{ display: 'block', fontSize: '12px', lineHeight: '16px', padding: '6px 0 6px 14px', borderLeft: `2px solid ${activeId === id ? 'var(--color-primary)' : 'var(--color-outline)'}`, color: activeId === id ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', textDecoration: 'none', fontWeight: activeId === id ? 600 : 400, transition: 'color 0.2s, border-color 0.2s' }}
          >{text}</a>
        ))}
      </div>
    </div>
  );
}

const NAV_HEIGHT = 64;

export function PageShell({ title, description, tabs, children, version, hideVersion, subHeader }: {
  title: string; description?: string; tabs?: { label: string; content: React.ReactNode }[]; children: React.ReactNode; version?: string; hideVersion?: boolean; subHeader?: React.ReactNode;
}) {
  const allTabs = tabs && tabs.length > 0 ? tabs : [{ label: 'Overview', content: children }];
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => { setIsScrolled(!entry.isIntersecting); }, { threshold: 0, rootMargin: `-${NAV_HEIGHT}px 0px 0px 0px` });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* ─── Hero banner ─── */}
      <div ref={bannerRef} className="relative overflow-hidden flex flex-col min-h-[25vh] sm:min-h-[35vh]" style={{ background: 'var(--color-surface-container-low)' }}>
        {/* Pattern on right */}
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%', backgroundImage: 'url(/hero-pattern.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: 'cover', opacity: 0.12, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '60%', background: 'linear-gradient(to right, var(--color-surface-container-low) 25%, transparent 85%)', pointerEvents: 'none' }} />

        <div style={{ flex: 3 }} />
        <div className="relative px-5 lg:pl-24 lg:pr-[240px]">
          <motion.h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-tight mb-2 leading-tight" style={{ color: 'var(--color-on-surface)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            {title}
            {!hideVersion && <span style={{ marginLeft: '12px', fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '14px', border: '1px solid #00A2BD', color: '#00A2BD', verticalAlign: 'middle', letterSpacing: '0.02em' }}>{version || 'v1.1.2'}</span>}
          </motion.h1>
          {description && <motion.p className="text-sm sm:text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-on-surface-variant)' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>{description}</motion.p>}
          {subHeader && <div style={{ marginTop: '12px' }}>{subHeader}</div>}
        </div>
        <div style={{ flex: 2 }} />

        {/* Inline tabs */}
        <div className="overflow-x-auto scrollbar-hide px-5 lg:pl-24 lg:pr-[240px]">
          {allTabs.length > 1 && (
            <div className="flex gap-0 border-b min-w-max" style={{ borderColor: 'var(--color-outline)' }}>
              {allTabs.map((tab, i) => (
                <button key={tab.label} onClick={() => setActiveTab(i)} className="px-4 py-2.5 text-sm font-medium transition-all relative whitespace-nowrap rounded-t-md hover:bg-[var(--color-surface-container)]" style={{ color: activeTab === i ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', marginBottom: '-1px' }}>
                  {tab.label}
                  {activeTab === i && <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-sm" style={{ background: 'var(--color-primary)' }} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sentinel */}
      <div ref={sentinelRef} style={{ height: 0 }} />

      {/* ─── Sticky tabs ─── */}
      {isScrolled && allTabs.length > 1 && (
        <div className="fixed top-16 left-0 lg:left-[var(--sidebar-width)] right-0 z-[35]" style={{ backgroundColor: 'var(--color-surface, #1a1a1a)', borderBottom: '1px solid var(--color-outline)' }}>
          <div className="overflow-x-auto scrollbar-hide px-5 lg:pl-24 lg:pr-[240px]">
            <div className="flex gap-0 min-w-max">
              {allTabs.map((tab, i) => (
                <button key={tab.label} onClick={() => setActiveTab(i)} style={{ padding: '10px 16px', fontSize: '14px', fontWeight: 500, color: activeTab === i ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', background: 'none', border: 'none', borderBottom: activeTab === i ? '2px solid var(--color-primary)' : '2px solid transparent', borderRadius: '6px 6px 0 0', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.15s, border-color 0.15s, background 0.15s', marginBottom: '-1px' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-surface-container)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Content ─── */}
      <div className="px-5 lg:pl-24 lg:pr-[240px] pt-6 pb-12">
        <div className="mdx-content" ref={contentRef}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <MdxProvider>{allTabs[activeTab].content}</MdxProvider>
            </motion.div>
          </AnimatePresence>
          <CopyCodeButtons containerRef={contentRef} deps={activeTab} />
        </div>
      </div>

      {/* ─── Right anchor nav (desktop) ─── */}
      <div className="hidden xl:block" style={{ position: 'fixed', top: '50%', transform: 'translateY(-50%)', right: '32px', width: '170px', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', zIndex: 20 }}>
        <AnchorNav title={title} containerRef={contentRef} deps={activeTab} />
      </div>
    </div>
  );
}
