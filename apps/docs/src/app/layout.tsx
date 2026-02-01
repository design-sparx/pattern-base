import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';

export const metadata: Metadata = {
  title: 'AI Vory - AI UX Pattern Library',
  description: 'A multi-framework component library for AI user experience patterns based on shapeof.ai',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Sidebar />
        <main className="ml-[var(--sidebar-width)] mt-[var(--header-height)] min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
