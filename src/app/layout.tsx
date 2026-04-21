import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { TopBar } from '@/components/TopBar';
import { Sidebar } from '@/components/Sidebar';
import { GeometricPattern } from '@/components/GeometricPattern';

export const metadata: Metadata = {
  title: 'TARMAC Design System',
  description: 'Design system documentation for Delhivery',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.NODE_ENV === 'production' ? '/TDS' : '';
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={`${basePath}/favicon.png`} type="image/png" />
      </head>
      <body>
        <ThemeProvider>
          <GeometricPattern />
          <TopBar />
          <div className="relative z-10 flex pt-[var(--topbar-offset)]">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
