'use client'

import Link from "@/app/_components/Link";
import useUser from "@/app/_hooks/user";

export default function Page() {
  const [user, userLoaded] = useUser((state: any) => [state.user, state.loaded]);
  console.log('>> app.page.render()');

  return (
    <main className="flex flex-col items-left lg:items-center lg:max-w-4xl lg:mx-auto px-4">
      <h1 className="text-center">PubSpace: The AI-powered app for public spaces!</h1>
      <p>A tech demo app exploring utilities for public spaces (pubs, cafés, etc.) powered by OpenAI&apos;s ChatGPT.</p>
      <p>&#8226;&nbsp;<Link href="/posts" style="parent" className="group"><Link style="child">Bulletin board</Link> for announcements, community use, etc.</Link></p>
      <p>&#8226;&nbsp;<Link href="/menus" style="plain" className="group"><Link style="child">Food and drink menus</Link> for both patrons to peruse and preparation instructions for staff.</Link></p>
      <p>&#8226;&nbsp;<Link href="/trivia" style="plain" className="group"><Link style="child">Trivia games</Link> for weekly game nights or for your own entertainment!</Link></p>
      <p>More to come soon!</p>
      {userLoaded && !user &&
        <p><Link href="/profile">Signup now!</Link></p>
      }
    </main>
  )
}
