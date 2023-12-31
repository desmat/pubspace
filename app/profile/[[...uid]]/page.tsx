'use client'

import Link from "next/link";
import { useEffect } from "react";
import useUser from "@/app/_hooks/user";
import usePosts from "@/app/_hooks/posts";
import useTrivia from "@/app/_hooks/trivia";
import useMenus from "@/app/_hooks/menus";
import * as users from "@/services/users";
import { Game } from "@/types/Trivia";
import { Menu } from "@/types/Menus";
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
  const [user, userLoaded, loadUser, signin, logout] = useUser((state: any) => [state.user, state.loaded, state.load, state.signin, state.logout]);
  const [posts, loadPosts, postsLoaded] = usePosts((state: any) => [state.posts, state.load, state.loaded]);
  const [games, gamesLoaded, loadGames] = useTrivia((state: any) => [state.games, state.loaded, state.loadGames]);
  const [menus, menusLoaded, loadMenus] = useMenus((state: any) => [state.menus, state.loaded, state.load]);
  const myPosts = postsLoaded && posts.filter((post: Post) => post.postedByUID == user?.uid);
  const myGames = gamesLoaded && games.filter((game: Game) => game.createdBy == user?.uid);
  const myMenus = menusLoaded && menus.filter((menu: Menu) => menu.createdBy == user?.uid);
  console.log('>> app.profile.page.render()', { uid: params.uid, user, userLoaded });

  useEffect(() => {
    // console.log("** app.profile.page.useEffect", { uid: params.uid, user });
    if (!userLoaded) loadUser();
    if (!postsLoaded) loadPosts();
    if (!gamesLoaded) loadGames();
    if (!menusLoaded) loadMenus();
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
      {user &&
        <>
          <h2>{users.getUserName(user)}{user.isAnonymous ? "" : ` (${users.getProviderName(user)})`}</h2>

          <div className="p-0.5">
            <span className="text-dark-3">User ID:</span> {user.uid}{user?.isAnonymous && " (Anonymous)"}{user.admin && " (Administrator)"}
          </div>
          {user.email &&
            <div className="p-0.5">
              <span className="text-dark-3">Email:</span> {user.email}
            </div>
          }
          {!user.isAnonymous &&
            <div className="p-0.5">
              <span className="text-dark-3">Provider:</span> {users.getProviderType(user)}
            </div>
          }

          {/* <p>isAnonymous: {user?.isAnonymous ? "true" : "false"}</p> */}
          {/* <p>isAdmin: {user?.admin ? "true" : "false"}</p> */}
          {/* <p>provider: {user?.providerId}{user?.providerData[0]?.providerId ? ` (${user?.providerData[0]?.providerId})` : ''}</p>
          <p>providerId: {user?.providerId}</p>
          <p>providerData: {JSON.stringify(user?.providerData)}</p> */}
          {/* <p>provider: {users.getProviderName(user)}</p> */}
          {/* <p>email: {user?.email}</p> */}
          {/* <p>displayName: {user?.displayName}</p> */}
          {/* <p>username: {users.getUserName(user)}</p> */}
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
          {user && myPosts.length > 0 && 
            <div className="text-dark-2">
              <Link href={`/posts?uid=${user.uid}`}>Posts ({myPosts.length})</Link>
            </div>
          }
          {user && myGames.length > 0 && 
            <div className="text-dark-2">
              <Link href={`/trivia?uid=${user.uid}`}>Trivia games ({myGames.length})</Link>
            </div>
          }
          {user && myMenus.length > 0 && 
            <div className="text-dark-2">
              <Link href={`/menus?uid=${user.uid}`}>Menus ({myMenus.length})</Link>
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
          {/* {user && user.isAnonymous && // TODO CRIPPLE
            <div className="text-dark-2 hover:text-light-2">
              <Link href="/" onClick={(e) => doLogout(e, logout)}>Logout</Link>
            </div>
          } */}
        </div>
      }
    </main>
  )
}
