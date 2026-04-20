import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'TARMAC Design System',
  description: 'Design system documentation for Delhivery',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-[var(--sidebar-width)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
