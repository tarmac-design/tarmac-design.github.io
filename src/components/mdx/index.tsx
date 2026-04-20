'use client';

import React from 'react';

// Info callout
export function Info({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200 mb-6">
      <span className="text-blue-500 text-lg shrink-0">ℹ️</span>
      <div className="text-sm text-blue-900">{children}</div>
    </div>
  );
}

// Warning callout
export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 mb-6">
      <span className="text-amber-500 text-lg shrink-0">⚠️</span>
      <div className="text-sm text-amber-900">{children}</div>
    </div>
  );
}

// Tip callout
export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-green-50 border border-green-200 mb-6">
      <span className="text-green-500 text-lg shrink-0">💡</span>
      <div className="text-sm text-green-900">{children}</div>
    </div>
  );
}

// Card
export function Card({ title, icon, children, href, color }: {
  title?: string; icon?: string; children?: React.ReactNode; href?: string; color?: string;
}) {
  const Wrapper = href ? 'a' : 'div';
  const props = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {};
  return (
    <Wrapper {...(props as any)} className={`block p-5 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all ${href ? 'cursor-pointer' : ''}`}>
      {title && (
        <div className="flex items-center gap-2 mb-2">
          {icon && <span className="text-lg">{icon}</span>}
          <h4 className="font-semibold text-sm" style={color ? { color } : undefined}>{title}</h4>
        </div>
      )}
      {children && <div className="text-sm text-neutral-600">{children}</div>}
    </Wrapper>
  );
}

// CardGroup
export function CardGroup({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div className={`grid gap-4 mb-6`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {children}
    </div>
  );
}

// Tabs
export function Tabs({ children }: { children: React.ReactNode }) {
  const [active, setActive] = React.useState(0);
  const tabs = React.Children.toArray(children) as React.ReactElement[];

  return (
    <div className="mb-6">
      <div className="flex gap-1 border-b border-neutral-200 mb-4">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              i === active
                ? 'border-tarmac-black text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      {tabs[active]}
    </div>
  );
}

// Tab
export function Tab({ children }: { title: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}

// Storybook embed — the key feature!
export function StorybookEmbed({ url, height = 400, title = 'Component Demo' }: {
  url: string; height?: number; title?: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-neutral-200 mb-6">
      <iframe
        src={url}
        style={{ width: '100%', height: `${height}px`, border: 'none' }}
        title={title}
        allow="clipboard-write"
      />
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 border-t border-neutral-200">
        <span className="text-xs text-neutral-500">Interactive preview from TARMAC Storybook</span>
        <a
          href={(() => {
            const idMatch = url.match(/[?&]id=([^&]+)/);
            if (idMatch) {
              const baseUrl = url.split('/sb/iframe.html')[0] || url.split('/iframe.html')[0];
              return `${baseUrl}/?path=/story/${idMatch[1]}`;
            }
            return url;
          })()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-tarmac-blue hover:underline font-medium"
        >
          Open in Storybook ↗
        </a>
      </div>
    </div>
  );
}

// CodeGroup
export function CodeGroup({ children }: { children: React.ReactNode }) {
  return <Tabs>{children}</Tabs>;
}

// Accordion
export function Accordion({ title, children }: { title: string; icon?: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-neutral-200 rounded-lg mb-2 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-neutral-50 transition-colors">
        <span>{title}</span>
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm text-neutral-700">{children}</div>}
    </div>
  );
}

export function AccordionGroup({ children }: { children: React.ReactNode }) {
  return <div className="mb-6">{children}</div>;
}

// Steps
export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="mb-6 space-y-4">{children}</div>;
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-7 h-7 rounded-full bg-tarmac-black text-white flex items-center justify-center text-xs font-bold shrink-0">•</div>
        <div className="w-px flex-1 bg-neutral-200 mt-1" />
      </div>
      <div className="pb-6">
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        <div className="text-sm text-neutral-600">{children}</div>
      </div>
    </div>
  );
}
