'use client'
import type { Metadata } from 'next';
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';


const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Talea - story time',
//   description: 'Magical stories with interactive sound effects for children',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  const [displayedPath, setDisplayedPath] = useState(pathname)

  useEffect(() => {
    setDisplayedPath(pathname)
  }, [pathname])
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div key={displayedPath} className="page-transition">
          {children}
        </div>
      </body>
    </html>
  );
}