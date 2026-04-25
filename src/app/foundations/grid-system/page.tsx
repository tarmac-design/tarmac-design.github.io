'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { PageShell } from '@/components/PageShell';
import { Info, DoDont } from '@/components/mdx';

/* ─── Data from Figma ─── */

type BreakpointRow = { breakpoint: string; viewport: string; columns: string; gutter: string; width: string; type: string; offset?: string };

const contentGrid: BreakpointRow[] = [
  { breakpoint: 'Large', viewport: '1920 × 1080', columns: '12', gutter: '24px', width: '92px', type: 'Centre' },
  { breakpoint: 'Default', viewport: '1440 × 942', columns: '12', gutter: '16px', width: '92px', type: 'Centre' },
  { breakpoint: 'Medium', viewport: '1366 × 768', columns: '12', gutter: '16px', width: '92px', type: 'Centre' },
  { breakpoint: 'Small', viewport: '1280 × 832', columns: '12', gutter: '16px', width: '92px', type: 'Centre' },
];

const sideNavCollapsed: BreakpointRow[] = [
  { breakpoint: 'Large', viewport: '1920 × 1080', columns: '12', gutter: '24px', width: '94px', offset: '24px', type: 'Centre' },
  { breakpoint: 'Default', viewport: '1440 × 942', columns: '12', gutter: '16px', width: '94px', offset: '24px', type: 'Right' },
  { breakpoint: 'Medium', viewport: '1366 × 768', columns: '12', gutter: '16px', width: '88px', offset: '38px', type: 'Right' },
  { breakpoint: 'Small', viewport: '1280 × 832', columns: '12', gutter: '16px', width: '82px', offset: '24px', type: 'Right' },
];

const sideNavExpanded: BreakpointRow[] = [
  { breakpoint: 'Large', viewport: '1920 × 1080', columns: '12', gutter: '24px', width: '76px', offset: '24px', type: 'Centre' },
  { breakpoint: 'Default', viewport: '1440 × 942', columns: '12', gutter: '16px', width: '76px', offset: '24px', type: 'Right' },
  { breakpoint: 'Medium', viewport: '1366 × 768', columns: '12', gutter: '16px', width: '72px', offset: '38px', type: 'Right' },
  { breakpoint: 'Small', viewport: '1280 × 832', columns: '12', gutter: '16px', width: '68px', offset: '24px', type: 'Right' },
];

const topNav: BreakpointRow[] = [
  { breakpoint: 'Large', viewport: '1920 × 1080', columns: '1', gutter: '16px', width: '80px', type: 'Top' },
  { breakpoint: 'Default', viewport: '1440 × 942', columns: '1', gutter: '16px', width: '80px', type: 'Top' },
  { breakpoint: 'Medium', viewport: '1366 × 768', columns: '1', gutter: '16px', width: '72px', type: 'Top' },
  { breakpoint: 'Small', viewport: '1280 × 832', columns: '1', gutter: '16px', width: '68px', type: 'Top' },
];

const mobileContent: BreakpointRow[] = [
  { breakpoint: 'Large', viewport: '390 × 844', columns: '4', gutter: '16px', width: '16px', type: 'Margin' },
  { breakpoint: 'Default', viewport: '360 × 800', columns: '4', gutter: '16px', width: '16px', type: 'Margin' },
  { breakpoint: 'Small', viewport: '320 × 568', columns: '4', gutter: '16px', width: '16px', type: 'Margin' },
];

const mobileTopBottom: BreakpointRow[] = [
  { breakpoint: 'Large', viewport: '390 × 844', columns: '2', gutter: '16px', width: '24 & 16px', type: 'Offset' },
  { breakpoint: 'Default', viewport: '360 × 800', columns: '2', gutter: '16px', width: '24 & 16px', type: 'Offset' },
  { breakpoint: 'Small', viewport: '320 × 568', columns: '2', gutter: '16px', width: '16 & 12px', type: 'Offset' },
];

const mobileSideNav: BreakpointRow[] = [
  { breakpoint: 'Large', viewport: '390 × 844', columns: '3', gutter: '16px', width: '16px', type: 'Offset' },
  { breakpoint: 'Default', viewport: '360 × 800', columns: '3', gutter: '16px', width: '16px', type: 'Offset' },
  { breakpoint: 'Small', viewport: '320 × 568', columns: '3', gutter: '16px', width: '16px', type: 'Offset' },
];

const viewports = [
  { size: '1440 × 942', usage: 'Primary design frame & baseline grid' },
  { size: '1366 × 942', usage: 'Widespread enterprise resolution' },
  { size: '1280 × 832', usage: 'Compact laptop & workspace views' },
  { size: '1920+', usage: 'Grid locked to 1280px, centered' },
];

/* ─── Grid Table Component ─── */
function GridTable({ title, rows, hasOffset }: { title: string; rows: BreakpointRow[]; hasOffset?: boolean }) {
  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--color-on-surface)' }}>{title}</h3>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Breakpoint</th><th>Viewport</th><th>Columns</th><th>Gutter</th><th>Width</th>
              {hasOffset && <th>Offset</th>}
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.breakpoint + r.viewport}>
                <td><code>{r.breakpoint}</code></td>
                <td>{r.viewport}</td>
                <td>{r.columns}</td>
                <td>{r.gutter}</td>
                <td>{r.width}</td>
                {hasOffset && <td>{r.offset || '—'}</td>}
                <td>{r.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Visual Grid Demo ─── */
function GridDemo({ columns, label }: { columns: number; label: string }) {
  return (
    <div className="mb-6">
      <div className="text-xs font-medium mb-2" style={{ color: 'var(--color-on-surface-variant)' }}>{label}</div>
      <div className="grid gap-1 rounded-lg overflow-hidden p-3 border" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-16 rounded" style={{ background: 'var(--color-primary)', opacity: 0.15 }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Phone Frame with Grid Overlay ─── */
type PhoneFrameProps = {
  label: string; width: number; height: number; columns: number; margin: number; gutter: number;
  topBar?: boolean; bottomBar?: boolean; sideNavCols?: number;
};

function PhoneFrameInner({ width, height, columns, margin, gutter, topBar, bottomBar, sideNavCols, scale }: PhoneFrameProps & { scale: number }) {
  const w = width * scale;
  const h = height * scale;
  const m = margin * scale;
  const g = gutter * scale;
  const pad = m; // top/bottom padding same as margin
  const innerW = w - m * 2;
  const colW = (innerW - g * (columns - 1)) / columns;

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ width: w, height: h, borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)', position: 'relative' }}>
      {/* Top bar */}
      {topBar && <div className="absolute left-0 right-0" style={{ top: 0, height: h * 0.09, background: 'var(--color-primary)', opacity: 0.15, borderRadius: '0 0 4px 4px' }} />}
      {/* Bottom bar */}
      {bottomBar && <div className="absolute left-0 right-0" style={{ bottom: 0, height: h * 0.09, background: 'var(--color-primary)', opacity: 0.15, borderRadius: '4px 4px 0 0' }} />}
      {/* Side nav columns */}
      {sideNavCols && (
        <div className="absolute flex" style={{ left: m, top: pad, bottom: pad, gap: g }}>
          {Array.from({ length: sideNavCols }).map((_, i) => {
            const sideInner = innerW * 0.55;
            const sColW = (sideInner - g * (sideNavCols - 1)) / sideNavCols;
            return <div key={i} style={{ width: sColW, background: 'var(--color-primary)', opacity: 0.15, borderRadius: 3 }} />;
          })}
        </div>
      )}
      {/* Main columns */}
      {!topBar && !bottomBar && !sideNavCols && (
        <div className="absolute flex" style={{ left: m, top: pad, bottom: pad, gap: g }}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} style={{ width: colW, background: 'var(--color-primary)', opacity: 0.15, borderRadius: 3 }} />
          ))}
        </div>
      )}
    </div>
  );
}

function PhoneFrame({ onClick, ...props }: PhoneFrameProps & { onClick?: () => void }) {
  return (
    <button className="flex flex-col items-center cursor-pointer group" onClick={onClick}>
      <div className="text-[11px] font-semibold mb-1.5 text-center" style={{ color: 'var(--color-on-surface)' }}>
        {props.label} <span className="font-normal" style={{ color: 'var(--color-on-surface-variant)' }}>({props.width} × {props.height})</span>
      </div>
      <div className="transition-transform group-hover:scale-[1.02] group-hover:shadow-lg rounded-2xl">
        <PhoneFrameInner {...props} scale={0.6} />
      </div>
    </button>
  );
}

/* ─── Phone Popup (zoomed view) ─── */
function PhonePopup({ frames, index, onClose, onNav }: {
  frames: PhoneFrameProps[]; index: number; onClose: () => void; onNav: (dir: -1 | 1) => void;
}) {
  const frame = frames[index];

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && index > 0) onNav(-1);
    if (e.key === 'ArrowRight' && index < frames.length - 1) onNav(1);
  }, [onClose, onNav, index, frames.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {index > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onNav(-1); }}
          className="absolute left-4 sm:left-8 z-10 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}
          aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      {index < frames.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNav(1); }}
          className="absolute right-4 sm:right-8 z-10 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}
          aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}

      <div className="relative z-10 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <div className="text-sm font-semibold mb-3 text-center" style={{ color: '#fff' }}>
          {frame.label} <span className="font-normal opacity-70">({frame.width} × {frame.height})</span>
        </div>
        <PhoneFrameInner {...frame} scale={Math.min(0.85, (window.innerHeight - 120) / frame.height, (window.innerWidth - 120) / frame.width)} />
        <div className="text-[11px] font-mono mt-3" style={{ color: 'rgba(255,255,255,0.5)' }}>{index + 1} / {frames.length}</div>
      </div>

      <button onClick={onClose}
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  );
}

/* ─── Mobile Phone Grid Row ─── */
function MobilePhoneRow({ frames, onFrameClick }: { frames: PhoneFrameProps[]; onFrameClick: (index: number) => void }) {
  return (
    <div className="mb-12 pb-10 border-b" style={{ borderColor: 'var(--color-outline)' }}>
      <div className="grid grid-cols-3 gap-4 items-end">
        {frames.map((f, i) => <PhoneFrame key={f.label} {...f} onClick={() => onFrameClick(i)} />)}
      </div>
    </div>
  );
}

/* ─── Desktop Frame with Grid Overlay ─── */
type DesktopFrameProps = {
  label: string; width: number; height: number; columns: number; gutter: number;
  marginLeft: number; marginRight?: number;
  sidebarWidth?: number; sidebarSide?: 'left' | 'right';
  topBarHeight?: number;
};

function DesktopFrameInner({ width, height, columns, gutter, marginLeft, marginRight, sidebarWidth, sidebarSide, topBarHeight, scale }: DesktopFrameProps & { scale: number }) {
  const w = width * scale;
  const h = height * scale;
  const mL = marginLeft * scale;
  const mR = (marginRight ?? marginLeft) * scale;
  const g = gutter * scale;
  const sbW = (sidebarWidth ?? 0) * scale;
  const tbH = (topBarHeight ?? 0) * scale;

  const contentLeft = sidebarSide === 'left' ? mL + sbW : mL;
  const contentRight = sidebarSide === 'right' ? mR + sbW : mR;
  const contentW = w - contentLeft - contentRight;
  const colW = columns > 0 ? (contentW - g * (columns - 1)) / columns : 0;

  return (
    <div className="rounded-lg border overflow-hidden" style={{ width: w, height: h, borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)', position: 'relative' }}>
      {/* Top bar */}
      {tbH > 0 && <div className="absolute left-0 right-0 top-0" style={{ height: tbH, background: 'var(--color-primary)', opacity: 0.12 }} />}
      {/* Sidebar */}
      {sbW > 0 && sidebarSide === 'left' && (
        <div className="absolute top-0 bottom-0" style={{ left: 0, width: sbW * 1, background: 'var(--color-primary)', opacity: 0.08, borderRight: '1px solid var(--color-outline)' }} />
      )}
      {/* Grid columns */}
      {columns > 0 && (
        <div className="absolute flex" style={{ left: contentLeft, top: tbH || (mL * 0.5), bottom: mL * 0.5, gap: g }}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} style={{ width: colW, background: 'var(--color-primary)', opacity: 0.12, borderRadius: 2 }} />
          ))}
        </div>
      )}
    </div>
  );
}

function DesktopFrame({ onClick, uniformScale, ...props }: DesktopFrameProps & { onClick?: () => void; uniformScale?: number }) {
  const scale = uniformScale ?? (Math.min(400, props.width * 0.28) / props.width);

  return (
    <button className="flex flex-col items-center cursor-pointer group" onClick={onClick}>
      <div className="text-[10px] font-semibold mb-1 text-center" style={{ color: 'var(--color-on-surface)' }}>
        {props.label} <span className="font-normal" style={{ color: 'var(--color-on-surface-variant)' }}>({props.width}×{props.height})</span>
      </div>
      <div className="transition-transform group-hover:scale-[1.03] group-hover:shadow-lg rounded-lg">
        <DesktopFrameInner {...props} scale={scale} />
      </div>
    </button>
  );
}

/* ─── Desktop Popup (zoomed view) ─── */
function DesktopPopup({ frames, index, onClose, onNav }: {
  frames: DesktopFrameProps[]; index: number; onClose: () => void; onNav: (dir: -1 | 1) => void;
}) {
  const frame = frames[index];

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && index > 0) onNav(-1);
    if (e.key === 'ArrowRight' && index < frames.length - 1) onNav(1);
  }, [onClose, onNav, index, frames.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const popupScale = typeof window !== 'undefined'
    ? Math.min(0.55, (window.innerHeight - 140) / frame.height, (window.innerWidth - 200) / frame.width)
    : 0.4;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {index > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onNav(-1); }}
          className="absolute left-4 sm:left-8 z-10 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      {index < frames.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNav(1); }}
          className="absolute right-4 sm:right-8 z-10 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}
      <div className="relative z-10 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <div className="text-sm font-semibold mb-3 text-center" style={{ color: '#fff' }}>
          {frame.label} <span className="font-normal opacity-70">({frame.width} × {frame.height})</span>
        </div>
        <DesktopFrameInner {...frame} scale={popupScale} />
        <div className="text-[11px] font-mono mt-3" style={{ color: 'rgba(255,255,255,0.5)' }}>{index + 1} / {frames.length}</div>
      </div>
      <button onClick={onClose}
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  );
}

/* ─── Desktop Frame Row ─── */
function DesktopFrameRow({ frames, onFrameClick }: { frames: DesktopFrameProps[]; onFrameClick: (index: number) => void }) {
  const maxW = Math.max(...frames.map(f => f.width));
  const uniformScale = Math.min(420, maxW * 0.3) / maxW;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => { el.removeEventListener('scroll', checkScroll); window.removeEventListener('resize', checkScroll); };
  }, [checkScroll]);

  const scroll = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 400, behavior: 'smooth' });
  };

  return (
    <div className="mb-12 pb-10 border-b relative" style={{ borderColor: 'var(--color-outline)' }}>
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md"
          style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}
          aria-label="Scroll left"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md"
          style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}
          aria-label="Scroll right"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-5 items-center overflow-x-auto pb-3"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.desktop-scroll::-webkit-scrollbar { display: none; }`}</style>
        {frames.map((f, i) => (
          <div key={f.label} className="shrink-0" style={{ scrollSnapAlign: 'start' }}>
            <DesktopFrame {...f} uniformScale={uniformScale} onClick={() => onFrameClick(i)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Sub-nav ─── */
const sections = ['Mobile', 'Desktop', 'Anatomy', 'Principles'] as const;
type Section = typeof sections[number];

/* ─── Tab: Examples ─── */
function ExamplesTab() {
  const [section, setSection] = useState<Section>('Mobile');
  const [phonePopup, setPhonePopup] = useState<{ frames: PhoneFrameProps[]; index: number } | null>(null);
  const [desktopPopup, setDesktopPopup] = useState<{ frames: DesktopFrameProps[]; index: number } | null>(null);

  return (
    <div className="mdx-content">
      <div className="flex gap-2 mb-6 flex-wrap">
        {sections.map((s) => (
          <button key={s} onClick={() => setSection(s)}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              backgroundColor: section === s ? 'var(--color-on-surface)' : 'transparent',
              color: section === s ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
              border: `1px solid ${section === s ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
            }}>{s}</button>
        ))}
      </div>

      {/* Phone popup */}
      {phonePopup && (
        <PhonePopup
          frames={phonePopup.frames}
          index={phonePopup.index}
          onClose={() => setPhonePopup(null)}
          onNav={(dir) => {
            const newIdx = phonePopup.index + dir;
            if (newIdx >= 0 && newIdx < phonePopup.frames.length) setPhonePopup({ ...phonePopup, index: newIdx });
          }}
        />
      )}

      {/* Desktop popup */}
      {desktopPopup && (
        <DesktopPopup
          frames={desktopPopup.frames}
          index={desktopPopup.index}
          onClose={() => setDesktopPopup(null)}
          onNav={(dir) => {
            const newIdx = desktopPopup.index + dir;
            if (newIdx >= 0 && newIdx < desktopPopup.frames.length) setDesktopPopup({ ...desktopPopup, index: newIdx });
          }}
        />
      )}

      {section === 'Desktop' && (
        <>
          <h2>Desktop Grid System</h2>
          <p>Optimized around a default design frame of 1440 × 942px. Content stays centered within the grid on wider screens to maintain readability.</p>
          <h3>Supported Viewports</h3>
          <table>
            <thead><tr><th>Screen Size</th><th>Usage</th></tr></thead>
            <tbody>{viewports.map((v) => <tr key={v.size}><td>{v.size}</td><td>{v.usage}</td></tr>)}</tbody>
          </table>

          <h3>Content Grid</h3>
          <p>Full-width 12-column grid centered within the viewport. The baseline layout for all content areas.</p>
          <GridTable title="Content Grid" rows={contentGrid} />
          {(() => {
            const frames: DesktopFrameProps[] = [
              { label: 'Large', width: 1920, height: 1080, columns: 12, gutter: 24, marginLeft: 80 },
              { label: 'Default', width: 1440, height: 942, columns: 12, gutter: 16, marginLeft: 80 },
              { label: 'Medium', width: 1366, height: 768, columns: 12, gutter: 16, marginLeft: 43 },
              { label: 'Small', width: 1280, height: 832, columns: 12, gutter: 16, marginLeft: 36 },
            ];
            return <DesktopFrameRow frames={frames} onFrameClick={(i) => setDesktopPopup({ frames, index: i })} />;
          })()}

          <h3>Side Navigation — Collapsed</h3>
          <p>Narrow sidebar (72–88px) with content grid shifted right. Content grid expands to fill remaining space.</p>
          <GridTable title="Side Nav Collapsed" rows={sideNavCollapsed} hasOffset />
          {(() => {
            const frames: DesktopFrameProps[] = [
              { label: 'Large', width: 1920, height: 1080, columns: 12, gutter: 24, marginLeft: 112, sidebarWidth: 88, sidebarSide: 'left' },
              { label: 'Default', width: 1440, height: 942, columns: 12, gutter: 16, marginLeft: 112, sidebarWidth: 88, sidebarSide: 'left' },
              { label: 'Medium', width: 1366, height: 768, columns: 12, gutter: 16, marginLeft: 96, sidebarWidth: 72, sidebarSide: 'left' },
              { label: 'Small', width: 1280, height: 832, columns: 12, gutter: 16, marginLeft: 96, sidebarWidth: 72, sidebarSide: 'left' },
            ];
            return <DesktopFrameRow frames={frames} onFrameClick={(i) => setDesktopPopup({ frames, index: i })} />;
          })()}

          <h3>Side Navigation — Expanded</h3>
          <p>Wide sidebar (240–280px) with content grid reduced proportionally. Primary focus remains on the working area.</p>
          <GridTable title="Side Nav Expanded" rows={sideNavExpanded} hasOffset />
          {(() => {
            const frames: DesktopFrameProps[] = [
              { label: 'Large', width: 1920, height: 1080, columns: 12, gutter: 24, marginLeft: 328, sidebarWidth: 280, sidebarSide: 'left' },
              { label: 'Default', width: 1440, height: 942, columns: 12, gutter: 16, marginLeft: 328, sidebarWidth: 280, sidebarSide: 'left' },
              { label: 'Medium', width: 1366, height: 768, columns: 12, gutter: 16, marginLeft: 288, sidebarWidth: 240, sidebarSide: 'left' },
              { label: 'Small', width: 1280, height: 832, columns: 12, gutter: 16, marginLeft: 264, sidebarWidth: 216, sidebarSide: 'left' },
            ];
            return <DesktopFrameRow frames={frames} onFrameClick={(i) => setDesktopPopup({ frames, index: i })} />;
          })()}

          <h3>Top Navigation</h3>
          <p>Grid anchors below header height. Ensures consistent vertical rhythm with a top bar of 68–80px.</p>
          <GridTable title="Top Navigation" rows={topNav} />
          {(() => {
            const frames: DesktopFrameProps[] = [
              { label: 'Large', width: 1920, height: 1080, columns: 0, gutter: 16, marginLeft: 80, topBarHeight: 80 },
              { label: 'Default', width: 1440, height: 942, columns: 0, gutter: 16, marginLeft: 80, topBarHeight: 80 },
              { label: 'Medium', width: 1366, height: 768, columns: 0, gutter: 16, marginLeft: 43, topBarHeight: 72 },
              { label: 'Small', width: 1280, height: 832, columns: 0, gutter: 16, marginLeft: 36, topBarHeight: 68 },
            ];
            return <DesktopFrameRow frames={frames} onFrameClick={(i) => setDesktopPopup({ frames, index: i })} />;
          })()}
        </>
      )}

      {section === 'Mobile' && (
        <>
          <h2>Mobile Grid System</h2>
          <p>Optimized for utility, clarity, and touch ergonomics. Uses consistent spacing intervals and interaction zones.</p>
          <table>
            <thead><tr><th>Screen Size</th><th>Usage</th></tr></thead>
            <tbody>
              <tr><td>390 × 844</td><td>Default reference size</td></tr>
              <tr><td>360 × 800</td><td>Secondary modern devices</td></tr>
              <tr><td>320 × 568</td><td>POS & constrained environments</td></tr>
            </tbody>
          </table>

          <h3>Main Content</h3>
          <p>4-column structure across all breakpoints. Maintains the same core anatomy: 4 columns, 16px gutters, and 16px margins.</p>
          <GridTable title="Main Content Grid" rows={mobileContent} />
          {(() => {
            const contentFrames: PhoneFrameProps[] = [
              { label: 'Large', width: 390, height: 844, columns: 4, margin: 16, gutter: 16 },
              { label: 'Default', width: 360, height: 800, columns: 4, margin: 16, gutter: 16 },
              { label: 'Small', width: 320, height: 568, columns: 4, margin: 16, gutter: 16 },
            ];
            return <MobilePhoneRow frames={contentFrames} onFrameClick={(i) => setPhonePopup({ frames: contentFrames, index: i })} />;
          })()}

          <h3>Top &amp; Bottom Nav</h3>
          <p>2-column structure for top bars and bottom bars. Ensures key navigation elements stay aligned and balanced.</p>
          <GridTable title="Top & Bottom Navigation" rows={mobileTopBottom} />
          {(() => {
            const navFrames: PhoneFrameProps[] = [
              { label: 'Large', width: 390, height: 844, columns: 2, margin: 16, gutter: 16, topBar: true, bottomBar: true },
              { label: 'Default', width: 360, height: 800, columns: 2, margin: 16, gutter: 16, topBar: true, bottomBar: true },
              { label: 'Small', width: 320, height: 568, columns: 2, margin: 16, gutter: 16, topBar: true, bottomBar: true },
            ];
            return <MobilePhoneRow frames={navFrames} onFrameClick={(i) => setPhonePopup({ frames: navFrames, index: i })} />;
          })()}

          <h3>Side Nav</h3>
          <p>3-column structure for slide-in menus, drawers, or persistent side panels. Standardized to 3 columns, 16px gutters, and 16px offset.</p>
          <GridTable title="Side Navigation" rows={mobileSideNav} />
          {(() => {
            const sideFrames: PhoneFrameProps[] = [
              { label: 'Large', width: 390, height: 844, columns: 3, margin: 16, gutter: 16, sideNavCols: 3 },
              { label: 'Default', width: 360, height: 800, columns: 3, margin: 16, gutter: 16, sideNavCols: 3 },
              { label: 'Small', width: 320, height: 568, columns: 3, margin: 16, gutter: 16, sideNavCols: 3 },
            ];
            return <MobilePhoneRow frames={sideFrames} onFrameClick={(i) => setPhonePopup({ frames: sideFrames, index: i })} />;
          })()}

          <p className="mt-4" style={{ color: 'var(--color-on-surface-variant)' }}>Together, the 4-column content grid, 2-column navigation grid, and 3-column side navigation grid form a flexible yet disciplined framework that adapts across Large, Default, and Small breakpoints.</p>
        </>
      )}

      {section === 'Anatomy' && (
        <>
          <h2>Grid Anatomy</h2>
          <p>The layout grid has three core elements:</p>
          <ul>
            <li><strong>Columns</strong> — Divide the page into equal vertical sections for organizing content</li>
            <li><strong>Gutters</strong> — Gaps between columns that separate content consistently</li>
            <li><strong>Margins</strong> — Outer edges that prevent content from spilling beyond viewable regions</li>
          </ul>
          <h3>Types of Grid</h3>
          <p><strong>Fluid</strong> — Stretches across the screen, columns and content scale to fill available space.</p>
          <p><strong>Fixed</strong> — Applies an ideal maximum width to page containers. Content stays within a fixed-width frame.</p>
          <h3>Column Span & Offset</h3>
          <p>Column Span defines how many columns a content block occupies (2–12). Offset adds empty space by skipping columns for precise positioning and visual balance.</p>
          <GridDemo columns={12} label="12 columns — full span" />
          <div className="grid grid-cols-12 gap-1 mb-2">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="col-span-2 h-10 rounded" style={{ background: 'var(--color-primary)', opacity: 0.2 }} />)}
          </div>
          <div className="text-[10px] font-mono mb-6" style={{ color: 'var(--color-on-surface-variant)' }}>6 × span-2</div>
          <div className="grid grid-cols-12 gap-1 mb-2">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="col-span-3 h-10 rounded" style={{ background: 'var(--color-primary)', opacity: 0.2 }} />)}
          </div>
          <div className="text-[10px] font-mono mb-6" style={{ color: 'var(--color-on-surface-variant)' }}>4 × span-3</div>
          <div className="grid grid-cols-12 gap-1 mb-2">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="col-span-4 h-10 rounded" style={{ background: 'var(--color-primary)', opacity: 0.2 }} />)}
          </div>
          <div className="text-[10px] font-mono mb-6" style={{ color: 'var(--color-on-surface-variant)' }}>3 × span-4</div>
        </>
      )}

      {section === 'Principles' && (
        <>
          <h2>General Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              ['Consistency over complexity', 'The same visual logic applies across all surfaces.'],
              ['Content-first alignment', "Grids support meaning — they don't compete with it."],
              ['Predictable navigation zones', 'Users should always know where to look.'],
              ['Scalable spacing system', 'Built from the Tarmac spacing tokens.'],
              ['Clarity at operational scale', 'Interfaces must remain readable in real-world environments.'],
              ['Grid stability', "Layouts shouldn't jump, shift, or realign unexpectedly."],
            ].map(([title, desc]) => (
              <div key={title} className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>{title}</div>
                <div className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{desc}</div>
              </div>
            ))}
          </div>
          <h2>Layout Context</h2>
          <ul>
            <li><strong>Side Nav Expanded</strong> — Content grid reduces proportionally. Primary focus remains on working area.</li>
            <li><strong>Side Nav Collapsed</strong> — Content grid expands. Maintains alignment with baseline column structure.</li>
            <li><strong>Top & Bottom Nav</strong> — Grid anchors below header / above footer. Ensures consistent vertical rhythm.</li>
            <li><strong>Side Drawer</strong> — Drawer overlays or compresses content. Grid alignment preserved under interaction.</li>
          </ul>
          <h2>Accessibility & Readability</h2>
          <ul>
            <li>Maintain consistent reading widths</li>
            <li>Prevent line lengths from becoming too long on wider screens</li>
            <li>Ensure predictable scan-patterns for high-density UIs</li>
            <li>Support clear typographic hierarchy</li>
            <li>Preserve contrast & whitespace balance</li>
            <li>Enable comfortable spacing for motor interactions</li>
          </ul>
          <Info>On desktop, content remains within the 1440px grid frame to avoid eye-strain caused by overly wide layouts.</Info>
        </>
      )}
    </div>
  );
}

/* ─── Tab: Usage ─── */
function UsageTab() {
  return (
    <div className="mdx-content">
      <h2>When to Use</h2>
      <ul>
        <li>Page-level layouts and content structure</li>
        <li>Dashboard and workspace views</li>
        <li>Forms and data-heavy interfaces</li>
        <li>Navigation-heavy workflows with side panels</li>
      </ul>
      <h2>Do&apos;s &amp; Don&apos;ts</h2>
      <DoDont slug="grid-system"
        doItems={[
          "Use the 12-column grid for desktop page layouts",
          "Use 4-column grid for mobile content areas",
          "Follow breakpoint definitions for responsive design",
          "Use consistent gutters and margins across breakpoints",
          "Center content within the 1440px frame on wider screens",
        ]}
        dontItems={[
          "Break out of the grid without good reason",
          "Use fixed pixel widths instead of grid columns",
          "Ignore mobile breakpoints",
          "Allow content to stretch beyond 1440px on wide screens",
          "Mix grid types (fluid/fixed) within the same layout context",
        ]}
      />
    </div>
  );
}

/* ─── Tab: Code ─── */
function CodeTab() {
  return (
    <div className="mdx-content">
      <h2>CSS Grid</h2>
      <pre><code>{`/* Desktop 12-column grid */
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutter, 16px);
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--grid-margin, 80px);
}

/* Mobile 4-column grid */
@media (max-width: 767px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 0 16px;
  }
}`}</code></pre>

      <h2>React Component</h2>
      <pre><code>{`import { Grid, GridItem } from '@tarmac/design-system';

// Desktop layout
<Grid columns={12} gap={16}>
  <GridItem span={8}>Main content</GridItem>
  <GridItem span={4}>Sidebar</GridItem>
</Grid>

// Mobile layout
<Grid columns={4} gap={16}>
  <GridItem span={4}>Full-width content</GridItem>
</Grid>`}</code></pre>

      <h2>Tailwind Utilities</h2>
      <pre><code>{`<!-- 12-column desktop grid -->
<div class="grid grid-cols-12 gap-4 max-w-[1280px] mx-auto px-20">
  <div class="col-span-8">Main</div>
  <div class="col-span-4">Sidebar</div>
</div>

<!-- 4-column mobile grid -->
<div class="grid grid-cols-4 gap-4 px-4">
  <div class="col-span-4">Full width</div>
</div>`}</code></pre>
    </div>
  );
}

/* ─── Main Page ─── */
export default function GridSystemPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Changelog', content: (
      <div className="mdx-content py-4">
        <p style={{ color: 'var(--color-on-surface-variant)' }}>No changelog entries yet. Updates will appear here as the grid system evolves.</p>
      </div>
    )},
  ];

  return (
    <PageShell
      title="Grid System"
      description="TARMAC's responsive grid framework — a 12-column desktop system and 4-column mobile system with support for side navigation, top navigation, and side drawer contexts across all breakpoints."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
