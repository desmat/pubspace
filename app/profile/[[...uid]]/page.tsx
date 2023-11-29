'use client'

import Link from "next/link";
import { useEffect } from "react";
import useUser from "@/app/_hooks/user";
import usePosts from "@/app/_hooks/posts";
import useProfiles from "@/app/_hooks/profiles";
import { Profile } from "@/types/Profile";
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
  console.log('>> app.profile.page.render()', params.uid);
  const { user, signin, logout } = useUser();
  const [posts, loadPosts, postsLoaded] = usePosts((state: any) => [state.posts, state.load, state.loaded]);
  const { profiles, loaded, load } = useProfiles();
  const profile = params.uid && profiles && profiles[params.uid] as Profile;
  const profileUser = params.uid ? profile?.user : user;

  const myPosts = postsLoaded && loaded ? posts.filter((post: Post) => post.postedByUID == profileUser?.uid) : [];
  console.log('>> app.profile.page.render() myPosts', myPosts);

  useEffect(() => {
    console.log("** app.profile.page.useEffect profileUser:", { uid: params.uid, profileUser });
    load(params.uid);
    loadPosts();
  }, [params.uid]);

  if (params.uid && !loaded || !params.uid && !profileUser) { // TODO UNCRIPPLE
    return (
      <main className="flex flex-col items-center _justify-between _p-24">
        <h1>
          Profile
        </h1>
        <p className='italic text-center animate-pulse'>Loading...</p>
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
          <p>uid: {profileUser?.uid}</p>
        </>
      } */}
      {true && // profileUser && TODO UNCRIPLE
        <>
          <p>uid: {profileUser?.uid}</p>
          <p>isAnonymous: {profileUser?.isAnonymous ? "true" : "false"}</p>
          <p>isAdmin: {profileUser?.admin ? "true" : "false"}</p>
          <p>provider: {profileUser?.providerId}{profileUser?.providerData[0]?.providerId ? ` (${profileUser?.providerData[0]?.providerId})` : ''}</p>
          <p>email: {profileUser?.email}</p>
          <p>displayName: {profileUser?.displayName}</p>
          {/* <p className="flex whitespace-nowrap">photoURL: <img className="max-w-10 max-h-10" src={profileUser.photoURL as string | undefined}></img></p> */}
        </>
      }
      {params.uid && loaded &&
        <div className="flex flex-col lg:flex-row lg:space-x-4 items-center justify-center mt-4">
          <div className="text-dark-2">
            <Link href={`/posts?uid=${params.uid}`}>View Posts ({myPosts.length})</Link>
          </div>
        </div>
      }
      {!params.uid &&
        <div className="flex flex-col lg:flex-row lg:space-x-4 items-center justify-center mt-4">
          {!profileUser || !profileUser.isAnonymous && // TODO CRIPPLE
            <div className="text-dark-2">
              <Link href="/" onClick={(e) => doSigningAnonymously(e, signin)}>Signin Anonymously</Link>
            </div>
          }
          {profileUser && profileUser.isAnonymous && // TODO CRIPPLE
            <div className="text-dark-2 hover:text-light-2">
              <Link href="/" onClick={(e) => doLogout(e, logout)}>Logout</Link>
            </div>
          }
          {profileUser &&
            <div className="text-dark-2">
              <Link href={`/posts?uid=${profileUser.uid}`}>View Posts ({myPosts.length})</Link>
            </div>
          }
          {profileUser && profileUser.isAnonymous &&
            <div className="text-dark-2">
              <Link href="/auth?method=login-email">Login with Email</Link>
            </div>
          }
          {profileUser && profileUser.isAnonymous &&
            <div className="text-dark-2">
              <Link href="/auth?method=signup-email">Signup with Email</Link>
            </div>
          }
          {profileUser && profileUser.isAnonymous &&
            <div className="text-dark-2">
              <Link href="/" onClick={(e) => doSigninWithGoogle(e, signin)}>Signin with Google</Link>
            </div>
          }
          {profileUser && !profileUser.isAnonymous &&
            <div className="text-dark-2 hover:text-light-2">
              <Link href="/" onClick={(e) => doLogout(e, logout)}>Logout</Link>
            </div>
          }
        </div>
      }
    </main>
  )
}
