'use client'

import { User } from "firebase/auth";
import { usePathname } from 'next/navigation'
import { useEffect } from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs"
import { BsLightningFill } from "react-icons/bs"
import { BsClipboardFill } from "react-icons/bs"
import { BsFillQuestionSquareFill } from 'react-icons/bs'
import NavLink from '@/app/_components/NavLink'
import NavProfileLink from '@/app/_components/NavProfileLink'
import NavPopup from '@/app/_components/NavPopup'
import usePosts from '@/app/_hooks/posts';
import useUser from '@/app/_hooks/user';

const placeHolderPost = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa culpa beatae, maiores asperiores quis veniam, minima laborum magni possimus impedit ipsam ad ullam aliquid earum incidunt voluptate eaque maxime repellat."

function isActive(pathname: string, href: string): boolean {
  return (href && (href == "/" && pathname == "/") || (href && href != "/" && pathname.startsWith(href))) as boolean;
}

function getUsername(user: User | undefined) {
  if (!user) return "";

  return user?.isAnonymous ? "Anonymous" : user?.displayName || user?.email || "Noname";
}

function menuItems({ pathname, user, addPost }: { pathname: string, user: User | undefined, addPost: any | undefined, postOnClick?: () => boolean }) {
  return [
    {
      name: "Feed",
      href: "/feed",
      icon: <BsLightningFill className="my-auto text-right" />
    },
    {
      name: "Board",
      href: "/posts",
      icon: <BsClipboardFill className="my-auto" />
    },
    {
      name: "Post",
      icon: <BsFillPlusCircleFill className="my-auto" />,
      title: user ? "Add a post" : "Login to add a post",
      className: user ? "" : "cursor-not-allowed",
      onClick: function () {
        if (user) {
          const content = window.prompt("Enter content", placeHolderPost);
          if (content) {
            const userName = getUsername(user);
            const post = addPost(content, userName, user?.uid);
            return post as boolean;
          }

          return false;
        }
      }
    },
    {
      name: "Trivia",
      href: "/trivia",
      icon: <BsFillQuestionSquareFill className="my-auto" />
    },

  ].map((menuItem: any) => {
    menuItem.isActive = isActive(pathname, menuItem.href);
    return menuItem;
  });
}

export default function Nav() {
  const pathname = usePathname();
  const addPost = usePosts((state: any) => state.add);
  const [user, userLoaded, loadUser] = useUser((state: any) => [state.user, state.loaded, state.load]);

  useEffect(() => {
    if (!userLoaded) loadUser();
  }, []);

  return (
    <div className="bg-teal-600 text-slate-300 fixed z-10 w-full h-10 lg:w-32 lg:h-screen flex flex-row lg:flex-col">
      <div className="flex flex-grow-0 p-2 -ml-1 lg:ml-0 lg:-mt-1">
        <NavLink href="/" className="_bg-yellow-600 hover:no-underline">
          <div className="Logo my-auto">PubSpace</div>
        </NavLink>
      </div>
      <div className="flex flex-grow flex-row lg:flex-col space-x-4 lg:space-x-0 pl-2 pr-0 py-2 lg:py-0 lg:px-2 -mx-2 -my-0 lg:mx-0 lg:-my-2 _bg-yellow-100">
        {menuItems({ pathname, user, addPost }).map((menuItem: any) => (
          <div key={menuItem.name}>
            <NavLink
              className={`_bg-pink-300 hidden md:flex ${menuItem.className}`}
              title={menuItem.title}
              href={menuItem.href}
              isActive={menuItem.isActive}
              onClick={menuItem.onClick}
            >
              {menuItem.icon}
              <div className="my-auto">{menuItem.name}</div>
            </NavLink>
          </div>
        ))}
        <div className="md:hidden mt-1">
          <NavPopup menuItems={menuItems({ pathname, user, addPost })} />
        </div>
      </div>
      <div className="flex flex-col p-2 -mr-1 lg:mr-0 lg:-mb-1">
        <NavProfileLink href="/profile" className="_bg-orange-600" />
      </div>
    </div>
  )
}
