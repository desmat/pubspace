'use client'

import { useEffect } from "react";
import useUser from "@/hooks/User";

export default function Page() {
  console.log('>> app.profile.page.render()');
  const user = useUser();

  useEffect(() => {
    console.log("** app.profile.page.useEffect user:", user);
  }, []);

  return (
    <main className="flex flex-col items-center _justify-between _p-24">
      <h1>Profile</h1>
      {!user &&
        <p>(Not logged in)</p>
      }
      {user &&
        <>
          <p>uid: {user.uid}</p>
          <p>isAnonymous: {user.isAnonymous ? "true" : "false"}</p>
          <p>displayName: {user.displayName}</p>
        </>
      }
    </main>
  )
}
