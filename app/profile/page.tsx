'use client'

import Link from "next/link";
import { useEffect } from "react";
import useUser from "@/hooks/User";

function doSigninWithGoogle(e: any, signinFn: any) {
  console.log("** app.profile.page.doSigninWithGoogle");
  e.preventDefault();
  signinFn("google");
}

function doSigningAnonymously(e: any, signinFn: any) {
  console.log("** app.profile.page.doSigningAnonymously");
  e.preventDefault();
  signinFn("anonymous");
}

function doLogout(e: any, logoutFn: any) {
  console.log("** app.profile.page.doLogout");
  e.preventDefault();
  logoutFn();
}

export default function Page() {
  console.log('>> app.profile.page.render()');
  const { user, signin, logout } = useUser();

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
          <p>provider: {user.providerId}{user.providerData[0]?.providerId ? ` (${user.providerData[0]?.providerId})` : ''}</p>
          <p>email: {user.email}</p>
          <p>displayName: {user.displayName}</p>
          {/* <p className="flex whitespace-nowrap">photoURL: <img className="max-w-10 max-h-10" src={user.photoURL as string | undefined}></img></p> */}
        </>
      }
      <div className="flex flex-col lg:flex-row lg:space-x-4 items-center justify-center mt-4">
        {true && //user && !user.isAnonymous &&
          <div className="text-dark-2">
            <Link href="/" onClick={(e) => doSigningAnonymously(e, signin)}>Signin Anonymously</Link>
          </div>
        }
        {true && //user && user.isAnonymous &&
          <div className="text-dark-2">
            <Link href="/profile/auth?method=login-email">Login with Email</Link>
          </div>
        }
        {true && //user && user.isAnonymous &&
          <div className="text-dark-2">
            <Link href="/profile/auth?method=signup-email">Signup with Email</Link>
          </div>
        }
        {true && //user && user.isAnonymous &&
          <div className="text-dark-2">
            <Link href="/" onClick={(e) => doSigninWithGoogle(e, signin)}>Signin with Google</Link>
          </div>
        }
        {true && //user && !user.isAnonymous &&
          <div className="text-dark-2 hover:text-light-2">
            <Link href="/" onClick={(e) => doLogout(e, logout)}>Logout</Link>
          </div>
        }
      </div>

    </main>
  )
}
