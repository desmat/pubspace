'use client'

import Link from "next/link";
import { useEffect } from "react";
import useUser from "@/hooks/User";

function doInit(e: any, initFn: any) {
  console.log("** app.profile.page.doInit");
  e.preventDefault();
  initFn();
}

function doLogin(e: any, loginFn: any) {
  console.log("** app.profile.page.doLogin");
  e.preventDefault();
  loginFn();
}

function doSigningAnonymously(e: any, signInAnonymouslyFn: any) {
  console.log("** app.profile.page.doSigningAnonymously");
  e.preventDefault();
  signInAnonymouslyFn();
}

function doLogout(e: any, logoutFn: any) {
  console.log("** app.profile.page.doLogout");
  e.preventDefault();
  logoutFn();
}

export default function Page() {
  console.log('>> app.profile.page.render()');
  const { user, init, signInAnonymously, login, logout } = useUser();

  useEffect(() => {
    console.log("** app.profile.page.useEffect user:", user);
  }, []);

  return (
    <main className="flex flex-col items-center _justify-between _p-24">
      <h1>Profile</h1>
      {!user &&
        <p className='italic text-center animate-pulse'>Loading...</p>
      }
      {user &&
        <>
          <p>uid: {user.uid}</p>
          <p>isAnonymous: {user.isAnonymous ? "true" : "false"}</p>
          <p>email: {user.email}</p>
          <p>displayName: {user.displayName}</p>
          <p className="flex whitespace-nowrap">photoURL: <img className="max-w-10 max-h-10" src={user.photoURL as string | undefined}></img></p>
        </>
      }
      <div className="flex justify-center space-x-4 p-2">
        {/* <div className="text-dark-2">
          <Link href="/" onClick={(e) => doInit(e, init)}>Init</Link>
        </div> */}
        {/* <div className="text-dark-2">
          <Link href="/" onClick={(e) => doSigningAnonymously(e, signInAnonymously)}>Signin Anonymously</Link>
        </div> */}
        {user && user.isAnonymous &&
          <div className="text-dark-2">
            <Link href="/" onClick={(e) => doLogin(e, login)}>Login with Google</Link>
          </div>
        }
        {user && !user.isAnonymous &&
          <div className="text-dark-2 hover:text-light-2">
            <Link href="/" onClick={(e) => doLogout(e, logout)}>Logout</Link>
          </div>
        }
      </div>

    </main>
  )
}
