import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { type ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });
inter.className += 'h-full scroll-smooth antialiased';

export const metadata: Metadata = {
  title: 'Parking Over Here',
  description: 'Your parking lot manager',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' className={inter.className}>
      <body className='flex h-full flex-col'>
        <Providers>
          <main className='grow'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
