'use client'

import { User } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from "react";
import Link from "@/app/_components/Link"
import useMenus from '@/app/_hooks/menus';
import useUser from '@/app/_hooks/user';
import { Menu, MenuItem, SuggestedMenuTypes } from "@/types/Menus"
import Loading from "./loading";

function MenuEntry({ menu, user }: any) {
  const router = useRouter();
  const isReady = ["created"].includes(menu.status);
  const maxSummaryItems = 3;
  const summary = menu?.items?.length > maxSummaryItems
    ? menu.items.slice(0, maxSummaryItems).map((item: MenuItem) => item.name).join(", ") + ` and ${menu.items.length - maxSummaryItems} more`
    : menu?.items?.map((item: MenuItem) => item.name).join(", ") || "";
  console.log('>> app.menus.page.GameEntry.render()', { menu, user, summary });

  return (
    <p className="text-left py-2.5 group hover:cursor-pointer active:text-light-1" onClick={() => router.push(`/menus/${menu.id}`)}>
      <span className="m-0">
        <span className="capitalize">{menu.name}</span>
        {isReady &&
          <>
            {` (${summary})`}
            <Link style="light" className="group-hover:opacity-100 group-hover:underline group-active:text-light-1 ml-2" href={`/menus/${menu.id}`}>View</Link>
          </>
        }
        {!isReady &&
          <>
            {` (${menu.status})`}
          </>
        }
      </span>
    </p>
  );
}

async function handleCreateMenu(createMenu: any, router: any, user: User | undefined) {
  // console.log("*** handleCreateGame", { user, name: user.displayName?.split(/\s+/) });
  const userName = (user && !user.isAnonymous && user.displayName)
    ? `${user.displayName.split(/\s+/)[0]}'s`
    : "A";

  const type = window.prompt("What type of menu? Examples: Italian Pasta, Classic Cocktails, Fast Food", "");

  if (type) {
    const name = window.prompt("Name?", `${type}`);

    if (name) {
      const numString = window.prompt("How many items?", "5");

      if (numString) {
        const num = Number(numString);
        const id = await createMenu(user, name, type, num);

        if (id) {
          // router.push(`/menus/${id}`);
          return true
        }
      }
    }
  }

  return false;
}

export default function Page() {
  const router = useRouter();
  const [user] = useUser((state: any) => [state.user]);
  const [menus, loaded, load, createMenu] = useMenus((state: any) => [state.menus, state.loaded, state.load, state.createMenu]);
  const params = useSearchParams();
  const uidFilter = params.get("uid");
  const filteredMenus = uidFilter ? menus.filter((menu: Menu) => menu.createdBy == uidFilter) : menus;

  console.log('>> app.trivia.page.render()', { loaded, menus });

  useEffect(() => {
    load();
  }, []);

  const links = (
    <div className="flex flex-col lg:flex-row lg:gap-2 items-center justify-center mt-2 mb-4">
      <div title={user ? "" : "Login to create new menu"}>
        <Link className={user ? "" : "cursor-not-allowed"} onClick={() => /* user && */ handleCreateMenu(createMenu, router, user)}>
          Create New Menu
        </Link>
      </div>
      {/* <Link>View Leaderboard</Link> */}
    </div>
  );

  if (!loaded) {
    return <Loading />
  }

  return (
    <>
      {uidFilter &&
        <Link href="/menus" style="warning" className="absolute top-2 right-2 cursor-zoom-out">
          Filtered by user: {uidFilter}
        </Link>
      }

      <main className="flex flex-col items-left lg:max-w-4xl lg:mx-auto px-4">
        <h1 className="text-center">Menus</h1>

        <p className='italic text-center'>
          Let ChatGPT create menus for you!
        </p>
        <p className='italic text-center'>
          Try these: {SuggestedMenuTypes.join(", ")}
        </p>
        {links}
        {filteredMenus && filteredMenus.length > 0 &&
          <>
            {
              filteredMenus
                // .filter(...)
                .sort((a: Menu, b: Menu) => (a.createdAt || 0) - (b.createdAt || 0))
                .map((menu: any) => <div key={menu.id}><MenuEntry menu={menu} user={user} /></div>)
            }
          </>
        }
        {(!filteredMenus || filteredMenus.length == 0) &&
          <p className='italic text-center'>No menus yet :(</p>
        }
        {filteredMenus && filteredMenus.length > 4 && links}
      </main>
    </>
  )
}
