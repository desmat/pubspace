'use client'

import Link from "next/link";
import { useEffect } from "react";
import useUser from "@/app/_hooks/user";
import usePosts from "@/app/_hooks/posts";
import { Post } from "@/types/Post";

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

export default function Page({ params }: { params: { uid?: string } }) {
  // console.log('>> app.profile.page.render()', params.uid);
  const [user, userLoaded, signin, logout] = useUser((state: any) => [state.user, state.loaded, state.signin, state.logout]);
  const [posts, loadPosts, postsLoaded] = usePosts((state: any) => [state.posts, state.load, state.loaded]);
  const myPosts = postsLoaded && posts.filter((post: Post) => post.postedByUID == user?.uid);
  // console.log('>> app.profile.page.render()', { uid: params.uid, user, userLoaded });

  useEffect(() => {
    // console.log("** app.profile.page.useEffect", { uid: params.uid, user });
    // if (!loaded) load(params.uid);
    if (!postsLoaded) loadPosts();
  }, [params.uid]);

  if (!userLoaded || !postsLoaded) {
    return (
      <main className="flex flex-col items-center _justify-between _p-24">
        <h1>
          Profile
        </h1>
        <p className='italic text-center animate-pulse'>Loading...</p>
      </main>
    );
  }

  if (params.uid || !params.uid && !user) { // TODO UNCRIPPLE
    return (
      <main className="flex flex-col items-center _justify-between _p-24">
        <h1>
          Profile
        </h1>
        {/* <p className='italic text-center animate-pulse'>Loading...</p> */}
        {/* TODO REMOVE */}
        <div className="flex flex-col lg:flex-row lg:space-x-4 items-center justify-center mt-4">
          <div className="text-dark-2">
            <Link href="/" onClick={(e) => doSigningAnonymously(e, signin)}>Signin Anonymously</Link>
          </div>
          <div className="text-dark-2">
            <Link href="/auth?method=login-email">Login with Email</Link>
          </div>
          <div className="text-dark-2">
            <Link href="/auth?method=signup-email">Signup with Email</Link>
          </div>
          <div className="text-dark-2">
            <Link href="/" onClick={(e) => doSigninWithGoogle(e, signin)}>Signin with Google</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center _justify-between _p-24">
      <h1>
        Profile
        {params.uid &&
          <span>: {params.uid}</span>
        }
      </h1>
      {/* {params.uid && loaded && 
        <>
          <p>uid: {user?.uid}</p>
        </>
      } */}
      {true && // user && TODO UNCRIPLE
        <>
          <p>uid: {user?.uid}</p>
          <p>isAnonymous: {user?.isAnonymous ? "true" : "false"}</p>
          <p>isAdmin: {user?.admin ? "true" : "false"}</p>
          <p>provider: {user?.providerId}{user?.providerData[0]?.providerId ? ` (${user?.providerData[0]?.providerId})` : ''}</p>
          <p>email: {user?.email}</p>
          <p>displayName: {user?.displayName}</p>
          {/* <p className="flex whitespace-nowrap">photoURL: <img className="max-w-10 max-h-10" src={user.photoURL as string | undefined}></img></p> */}
        </>
      }
      {params.uid &&
        <div className="flex flex-col lg:flex-row lg:space-x-4 items-center justify-center mt-4">
          <div className="text-dark-2">
            <Link href={`/posts?uid=${params.uid}`}>View Posts ({myPosts.length})</Link>
          </div>
        </div>
      }
      {!params.uid &&
        <div className="flex flex-col lg:flex-row lg:space-x-4 items-center justify-center mt-4">
          {/* {!user || !user.isAnonymous && // TODO CRIPPLE
            <div className="text-dark-2">
              <Link href="/" onClick={(e) => doSigningAnonymously(e, signin)}>Signin Anonymously</Link>
            </div>
          } */}
          {user &&
            <div className="text-dark-2">
              <Link href={`/posts?uid=${user.uid}`}>View Posts ({myPosts.length})</Link>
            </div>
          }
          {user && user.isAnonymous &&
            <div className="text-dark-2">
              <Link href="/auth?method=login-email">Login with Email</Link>
            </div>
          }
          {user && user.isAnonymous &&
            <div className="text-dark-2">
              <Link href="/auth?method=signup-email">Signup with Email</Link>
            </div>
          }
          {user && user.isAnonymous &&
            <div className="text-dark-2">
              <Link href="/" onClick={(e) => doSigninWithGoogle(e, signin)}>Signin with Google</Link>
            </div>
          }
          {user && !user.isAnonymous &&
            <div className="text-dark-2 hover:text-light-2">
              <Link href="/" onClick={(e) => doLogout(e, logout)}>Logout</Link>
            </div>
          }
          {user && user.isAnonymous && // TODO CRIPPLE
            <div className="text-dark-2 hover:text-light-2">
              <Link href="/" onClick={(e) => doLogout(e, logout)}>Logout</Link>
            </div>
          }
        </div>
      }
    </main>
  )
}
