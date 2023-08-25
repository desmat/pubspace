'use client'

import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from "react";
import useUser from "@/hooks/User";
import { SigninMethod } from "@/types/SigninMethod";

function doLogin(e: any, signinFn: any) {
  console.log("** app.profile.auth.page.doLogin");
  e.preventDefault();

  signinFn("login-email", {}).then(() => {
    console.log("Success!!!");
    // TODO navigate or something
  })
}

function doSignup(e: any, signinFn: any) {
  console.log("** app.profile.auth.page.doSignup");
  e.preventDefault();

  signinFn("signup-email", {}).then(() => {
    console.log("Success!!!");
    // TODO navigate or something
  })
}

export default function Page() {
  console.log('>> app.profile.auth.page.render()');
  const { user, signin } = useUser();
  const router = useRouter();
  const params = useSearchParams();
  const method = params.get("method") as SigninMethod;

  useEffect(() => {
    console.log("** app.profile.auth.page.useEffect", { method });
  }, []);

  return (
    <main className="flex flex-col items-center _justify-between _p-24">
      <h1>
        {method == "login-email" ? "Login" : method == "signup-email" ? "Signup" : "(unknown method)"}
      </h1>
      {!user &&
        <p className='italic text-center animate-pulse'>Loading...</p>
      }
      {user &&
        <>
          <p>TODO</p>
        </>
      }
      <div className="flex flex-col lg:flex-row lg:space-x-4 items-center justify-center mt-4">
      <div className="text-dark-2">
          <Link 
            href="/" 
            onClick={(e) => method == "login-email" ? doLogin(e, signin) : method == "signup-email" ? doSignup(e, signin) : console.error("Unknown signing method", method)}
          >
            {method == "login-email" ? "Login" : method == "signup-email" ? "Signup" : "(unknown method)"}
          </Link>
        </div>
        <div className="text-dark-2 hover:text-light-2">
          <Link href="/profile">Cancel</Link>
        </div>
      </div>

    </main>
  )
}
