import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import Alert from '@/app/_components/Alert';
import Auth from '@/app/_components/Auth'
import Nav from '@/app/_components/Nav'
import User from '@/app/_components/User'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pubspace',
  description: 'AI-powered utilities for public spaces (pubs, cafés, etc.)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta property="og:title" content="Pubspace: AI-powered utilities for public spaces (pubs, cafés, etc.)" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pubspace.desmat.ca/" />
        {/* <meta property="og:image" content="https://workout.desmat.ca/social_img.png" /> */}
      </head>
      <body className={inter.className}>
        <div className="flex flex-col lg:flex-row">
          <Nav />
          <div className="_bg-blue-500 ml-0 mt-10 lg:ml-32 lg:mt-0 w-screen min-h-[calc(100vh-2.5rem)] lg:min-h-screen">
            {children}
          </div>
        </div>
      </body>
      <Auth />
      <User />
      <Analytics />
      <Alert />
    </html>
  )
}
