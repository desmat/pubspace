'use client'

import Link from "@/app/_components/Link";
import useUser from "@/app/_hooks/user";

export default function Page() {
  const [user, userLoaded] = useUser((state: any) => [state.user, state.loaded]);
  console.log('>> app.page.render()');

  return (
    <main className="flex flex-col items-left lg:items-center lg:max-w-4xl lg:mx-auto px-4">
      <h1 className="text-center">PubSpace: The app for public spaces!</h1>
      <p>A &ldquo;toy&ldquo; web app exploring AI-powered utilities for public spaces (pubs, cafés, etc): manage and publish bulletin boards, menus, event calendars, trivia and other pub games.</p>
      <p>Single tenant, a basic bulletin board and trivia game generator for now, more to come soon!</p>
      {userLoaded && !user &&
        <p><Link href="/profile">Signup now!</Link></p>
      }
    </main>
  )
}
