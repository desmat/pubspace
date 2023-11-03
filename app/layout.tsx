import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import Nav from '@/app/_components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pubspace',
  description: 'Billboard, calendar, games and other things for coffee shops/bars/public houses/etc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col lg:flex-row">
          <Nav />
          <div className="_bg-blue-500 ml-0 mt-10 lg:ml-32 lg:mt-0 w-screen min-h-[calc(100vh-2.5rem)] lg:min-h-screen">
            {children}
          </div>
        </div>
      </body>
      <Analytics />
    </html>
  )
}
