import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { BsFillPlusCircleFill } from "react-icons/bs"
import { BsLightningFill } from "react-icons/bs"
import { BsClipboardFill } from "react-icons/bs"
import { Analytics } from '@vercel/analytics/react';
import NavLink from '@/app/_components/NavLink'
import PostNavLink from '@/app/_components/PostNavLink'
import ProfileNavLink from '@/app/_components/ProfileNavLink'
import Nav from '@/app/_components/Menu'

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
        {/* <div className="bg-pink-500 w-full h-10">this is the header bar</div> */}
        <div className="flex flex-col lg:flex-row">
          <div className="bg-teal-600 text-slate-300 fixed z-10 w-full h-10 lg:w-32 lg:h-screen flex flex-row lg:flex-col">
            <div className="flex flex-grow-0 p-2 -ml-1 lg:ml-0 lg:-mt-1">
              <NavLink href="/" className="_bg-yellow-600 hover:no-underline">
                <div className="Logo my-auto">PubSpace</div>
              </NavLink>
            </div>
            <div className="flex flex-grow flex-row lg:flex-col space-x-4 lg:space-x-0 pl-2 pr-0 py-2 lg:py-0 lg:px-2 -mx-2 -my-0 lg:mx-0 lg:-my-2 _bg-yellow-100">
              <NavLink href="/feed" className="_bg-pink-300 hidden md:flex">
                <BsLightningFill className="my-auto text-right" />
                <div className="my-auto">Feed</div>
              </NavLink>
              <NavLink href="/posts" className="_bg-pink-300 hidden md:flex">
                <BsClipboardFill className="my-auto" />
                <div className="my-auto">Board</div>
              </NavLink>
              <PostNavLink className="_bg-pink-300 hidden md:flex">
                <BsFillPlusCircleFill className="my-auto" />
                <div className="my-auto">Post</div>
              </PostNavLink>
              <div className="md:hidden mt-1">
                <Nav />
              </div>
            </div>
            <div className="flex flex-col p-2 -mr-1 lg:mr-0 lg:-mb-1">
              <ProfileNavLink href="/profile" className="_bg-orange-600" />
            </div>
          </div>
          <div className="_bg-blue-500 ml-0 mt-10 lg:ml-32 lg:mt-0 w-screen min-h-[calc(100vh-2.5rem)] lg:min-h-screen">
            {children}
          </div>
        </div>
      </body>
      <Analytics />
    </html>
  )
}
