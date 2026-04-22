'use client';

import { usePathname } from 'next/navigation';
import { TopBar } from '@/components/TopBar';
import { Sidebar } from '@/components/Sidebar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { PageFooter } from '@/components/PageFooter';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      <GeometricPattern />
      <TopBar />
      <div className="relative z-10 flex pt-[var(--topbar-offset)]">
        {!isHome && <Sidebar />}
        <div className="flex-1 flex flex-col min-h-[calc(100vh-var(--topbar-offset))]">
          <main className="flex-1">{children}</main>
          <PageFooter />
        </div>
      </div>
    </>
  );
}
