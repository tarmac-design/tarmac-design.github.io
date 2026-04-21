'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { TopBar } from '@/components/TopBar';
import { Sidebar } from '@/components/Sidebar';
import { GeometricPattern } from '@/components/GeometricPattern';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      <GeometricPattern />
      <TopBar
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main
        className={`min-h-screen transition-colors ${isHome ? '' : 'lg:pl-[calc(var(--sidebar-width)+24px+12px)]'}`}
        style={{
          paddingTop: 'var(--topbar-offset)',
          color: 'var(--color-on-surface)',
          background: 'var(--color-surface)',
        }}
      >
        {children}
      </main>
    </>
  );
}
