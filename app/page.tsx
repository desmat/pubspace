'use client'

import { BsGithub } from "react-icons/bs";
import { MdMail, MdHome } from "react-icons/md";
import Link from "@/app/_components/Link";
import useUser from "@/app/_hooks/user";

export default function Page() {
  const [user, userLoaded] = useUser((state: any) => [state.user, state.loaded]);
  console.log('>> app.page.render()');

  return (
    <main className="flex flex-col items-left md:items-center lg:max-w-4xl lg:mx-auto px-4">
      <h1 className="text-center">PubSpace: The AI-powered app for public spaces!</h1>
      <div className="lg:self-center flex flex-col gap-4">
        <p>A tech demo app exploring utilities for public spaces (pubs, cafés, etc.) powered by OpenAI&apos;s ChatGPT.</p>
        <div className="flex flex-col gap-0">
          <p>&#8226;&nbsp;<Link href="/menus" style="plain" className="group"><Link style="child">Food and drink menus</Link> for both patrons to peruse and preparation instructions for staff.</Link></p>
          <p>&#8226;&nbsp;<Link href="/trivia" style="plain" className="group"><Link style="child">Trivia games</Link> for weekly game nights or for your own entertainment!</Link></p>
          <p>&#8226;&nbsp;<Link href="/posts" style="parent" className="group"><Link style="child">Bulletin board</Link> for announcements, community use, etc.</Link></p>
        </div>
        {userLoaded && !user &&
          <p className="text-center"><Link href="/profile">Signup now!</Link></p>
        }
        {!(userLoaded && !user) &&
          <p className="text-center">More to come soon!</p>
        }
      </div>
      <div className="fixed left-0 lg:left-16 bottom-4 lg:bottom-6 w-full _bg-orange-300 flex flex-row justify-center gap-4">
        <Link key="web" href="https://www.desmat.ca" target="_blank" className="_bg-yellow-200 flex flex-row gap-0.5 items-center">
          {/* <MdHome className=" _mt-[0.1rem] _mr-[-0.2rem] text-xl" /> */}
          www.desmat.ca
        </Link>
        <Link key="email" href="mailto:pubspace@desmat.ca" target="_blank" className="_bg-yellow-200 flex flex-row gap-1 items-center">
          {/* <MdMail className="_mt-[0.05rem] _mr-[-0.25rem] text-xl" /> */}
          @desmat.ca
        </Link>
        <Link key="github" href="https://github.com/desmat/pubspace" target="_blank" className="_bg-yellow-200 flex flex-row gap-0.5 items-center">
          <BsGithub className="mt-[0.1rem] text-md" />
          desmat
        </Link>
      </div>
    </main>
  )
}
