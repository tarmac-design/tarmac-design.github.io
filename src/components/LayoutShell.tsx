'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { TopBar } from '@/components/TopBar';
import { Sidebar } from '@/components/Sidebar';
import { PageFooter } from '@/components/PageFooter';
import { SplashScreen } from '@/components/SplashScreen';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHome = pathname === '/';
  const isPreview = searchParams.get('preview') === 'splash';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Show splash only on homepage, once per session (or force with ?preview=splash)
  useEffect(() => {
    if (isHome && typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('tarmac-splash-seen');
      if (!seen || isPreview) {
        setShowSplash(true);
      }
    }
  }, [isHome, isPreview]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    try { sessionStorage.setItem('tarmac-splash-seen', '1'); } catch { /* private browsing */ }
  }, []);

  /* While splash is active, hide everything else so nothing bleeds through */
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <>
      <TopBar onMenuClick={() => setSidebarOpen(true)} />
      <div className={`flex ${isHome ? '' : 'pt-16'}`}>
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
