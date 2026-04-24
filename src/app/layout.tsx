import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LayoutShell } from '@/components/LayoutShell';

export const metadata: Metadata = {
  title: 'TARMAC Design System',
  description: 'Design system documentation for Delhivery — foundations, components, patterns & accessibility.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <div id="smooth-wrapper">
            <LayoutShell>{children}</LayoutShell>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
