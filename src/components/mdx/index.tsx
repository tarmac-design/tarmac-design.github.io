'use client';

import React from 'react';

export function Info({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-xl mb-6"
      style={{
        background: 'color-mix(in srgb, var(--color-secondary) 8%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-secondary) 20%, transparent)',
      }}
    >
      <span className="text-lg shrink-0">ℹ️</span>
      <div className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{children}</div>
    </div>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-xl mb-6"
      style={{
        background: 'color-mix(in srgb, var(--color-warning) 8%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-warning) 20%, transparent)',
      }}
    >
      <span className="text-lg shrink-0">⚠️</span>
      <div className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{children}</div>
    </div>
  );
}

export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-xl mb-6"
      style={{
        background: 'color-mix(in srgb, var(--color-success) 8%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-success) 20%, transparent)',
      }}
    >
      <span className="text-lg shrink-0">💡</span>
      <div className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{children}</div>
    </div>
  );
}

export function Card({ title, icon, children, href, color }: {
  title?: string; icon?: string; children?: React.ReactNode; href?: string; color?: string;
}) {
  const Wrapper = href ? 'a' : 'div';
  const props = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {};
  return (
    <Wrapper
      {...(props as any)}
      className="block p-5 rounded-xl border transition-all hover:shadow-sm"
      style={{
        borderColor: 'var(--color-outline)',
        background: 'var(--color-surface)',
        cursor: href ? 'pointer' : 'default',
      }}
    >
      {title && (
        <div className="flex items-center gap-2 mb-2">
          {icon && <span className="text-lg">{icon}</span>}
          <h4 className="font-semibold text-sm" style={color ? { color } : { color: 'var(--color-on-surface)' }}>{title}</h4>
        </div>
      )}
      {children && <div className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{children}</div>}
    </Wrapper>
  );
}

export function CardGroup({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {children}
    </div>
  );
}

export function Tabs({ children }: { children: React.ReactNode }) {
  const [active, setActive] = React.useState(0);
  const tabs = React.Children.toArray(children) as React.ReactElement[];

  return (
    <div className="mb-6">
      <div className="flex gap-1 border-b mb-4" style={{ borderColor: 'var(--color-outline)' }}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
            style={{
              borderColor: i === active ? 'var(--color-primary)' : 'transparent',
              color: i === active ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)',
            }}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      {tabs[active]}
    </div>
  );
}

export function Tab({ children }: { title: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function StorybookEmbed({ url, height = 400, title = 'Component Demo' }: {
  url: string; height?: number; title?: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border mb-6" style={{ borderColor: 'var(--color-outline)' }}>
      <iframe
        src={url}
        style={{ width: '100%', height: `${height}px`, border: 'none' }}
        title={title}
        allow="clipboard-write"
      />
      <div
        className="flex items-center justify-between px-4 py-3 border-t"
        style={{
          background: 'var(--color-surface-container)',
          borderColor: 'var(--color-outline)',
        }}
      >
        <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
          Interactive preview from TARMAC Storybook
        </span>
        <a
          href={url.replace('/iframe.html', '').replace('&viewMode=story', '').replace('embed=true&', '')}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium hover:underline"
          style={{ color: 'var(--color-secondary)' }}
        >
          Open in Storybook ↗
        </a>
      </div>
    </div>
  );
}

export function CodeGroup({ children }: { children: React.ReactNode }) {
  return <Tabs>{children}</Tabs>;
}

export function Accordion({ title, children }: { title: string; icon?: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="border rounded-xl mb-2 overflow-hidden"
      style={{ borderColor: 'var(--color-outline)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors"
        style={{ color: 'var(--color-on-surface)' }}
      >
        <span>{title}</span>
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export function AccordionGroup({ children }: { children: React.ReactNode }) {
  return <div className="mb-6">{children}</div>;
}

export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="mb-6 space-y-4">{children}</div>;
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
        >
          •
        </div>
        <div className="w-px flex-1 mt-1" style={{ background: 'var(--color-outline)' }} />
      </div>
      <div className="pb-6">
        <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-on-surface)' }}>{title}</h4>
        <div className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{children}</div>
      </div>
    </div>
  );
}
