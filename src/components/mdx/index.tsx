'use client';

import React from 'react';

// ─── Callouts ───
export function Info({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-blue-50/60 border border-blue-100 mb-6 not-prose">
      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
      </div>
      <div className="text-[13px] text-blue-900 leading-relaxed">{children}</div>
    </div>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-amber-50/60 border border-amber-100 mb-6 not-prose">
      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shrink-0 mt-0.5">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
      </div>
      <div className="text-[13px] text-amber-900 leading-relaxed">{children}</div>
    </div>
  );
}

export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-emerald-50/60 border border-emerald-100 mb-6 not-prose">
      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM4 11a1 1 0 100-2H3a1 1 0 000 2h1zM10 18a1 1 0 001-1v-1a1 1 0 10-2 0v1a1 1 0 001 1z" /></svg>
      </div>
      <div className="text-[13px] text-emerald-900 leading-relaxed">{children}</div>
    </div>
  );
}

// ─── Card ───
export function Card({ title, icon, children, href, color }: {
  title?: string; icon?: string; children?: React.ReactNode; href?: string; color?: string;
}) {
  const Wrapper = href ? 'a' : 'div';
  const props = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {};
  return (
    <Wrapper {...(props as any)} className={`block p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-all ${href ? 'cursor-pointer hover:shadow-sm' : ''}`}>
      {title && (
        <div className="flex items-center gap-2 mb-1.5">
          {icon && <span className="text-base">{icon}</span>}
          <h4 className="font-semibold text-[13px] text-neutral-900" style={color ? { color } : undefined}>{title}</h4>
        </div>
      )}
      {children && <div className="text-[13px] text-neutral-500 leading-relaxed">{children}</div>}
    </Wrapper>
  );
}

export function CardGroup({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: `repeat(${Math.min(cols, 3)}, minmax(0, 1fr))` }}>
      {children}
    </div>
  );
}

// ─── Tabs ───
export function Tabs({ children }: { children: React.ReactNode }) {
  const [active, setActive] = React.useState(0);
  const tabs = React.Children.toArray(children) as React.ReactElement[];
  return (
    <div className="mb-6">
      <div className="flex gap-0 border-b border-neutral-200 mb-4">
        {tabs.map((tab, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`px-3 py-2 text-[13px] font-medium border-b-2 -mb-px transition-colors ${
              i === active ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-600'
            }`}
          >{tab.props.title}</button>
        ))}
      </div>
      {tabs[active]}
    </div>
  );
}

export function Tab({ children }: { title: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}

// ─── Storybook Embed ───
export function StorybookEmbed({ url, height = 400, title = 'Component Demo' }: {
  url: string; height?: number; title?: string;
}) {
  const storybookUrl = (() => {
    const idMatch = url.match(/[?&]id=([^&]+)/);
    if (idMatch) {
      const baseUrl = url.split('/sb/iframe.html')[0] || url.split('/iframe.html')[0];
      return `${baseUrl}/?path=/story/${idMatch[1]}`;
    }
    return url;
  })();

  return (
    <div className="rounded-lg overflow-hidden border border-neutral-200 mb-8 bg-white">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-50 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          </div>
          <span className="text-[11px] text-neutral-400 font-medium ml-2">Live Preview</span>
        </div>
        <a href={storybookUrl} target="_blank" rel="noopener noreferrer"
          className="text-[11px] text-neutral-500 hover:text-neutral-900 font-medium flex items-center gap-1 transition-colors"
        >
          Open in Storybook
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      <iframe src={url} style={{ width: '100%', height: `${height}px`, border: 'none' }} title={title} allow="clipboard-write" />
    </div>
  );
}

// ─── Code Group ───
export function CodeGroup({ children }: { children: React.ReactNode }) {
  return <Tabs>{children}</Tabs>;
}

// ─── Accordion ───
export function Accordion({ title, children }: { title: string; icon?: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-neutral-200 rounded-lg mb-2 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-left text-[13px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
        <span>{title}</span>
        <svg className={`w-4 h-4 text-neutral-400 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-4 pb-4 text-[13px] text-neutral-600 border-t border-neutral-100">{children}</div>}
    </div>
  );
}

export function AccordionGroup({ children }: { children: React.ReactNode }) {
  return <div className="mb-6">{children}</div>;
}

// ─── Steps ───
export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="mb-6">{children}</div>;
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 pb-6 last:pb-0">
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">•</div>
        <div className="w-px flex-1 bg-neutral-200 mt-1" />
      </div>
      <div>
        <h4 className="font-semibold text-[13px] text-neutral-900 mb-1">{title}</h4>
        <div className="text-[13px] text-neutral-500">{children}</div>
      </div>
    </div>
  );
}
