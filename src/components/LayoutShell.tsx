'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { TopBar } from '@/components/TopBar';
import { Sidebar } from '@/components/Sidebar';
import { PageFooter } from '@/components/PageFooter';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <TopBar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex pt-16">
        {!isHome && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
        <div
          className={`flex-1 flex flex-col min-h-[calc(100vh-64px)] ${!isHome ? 'lg:ml-[var(--sidebar-width)]' : ''}`}
        >
          <main className="flex-1">{children}</main>
          {!isHome && <PageFooter />}
        </div>
      </div>
    </>
  );
}
