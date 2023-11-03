'use client'

import { User } from "firebase/auth";
import { usePathname } from 'next/navigation'
import { BsFillPlusCircleFill } from "react-icons/bs"
import { BsLightningFill } from "react-icons/bs"
import { BsClipboardFill } from "react-icons/bs"
import NavLink from '@/app/_components/NavLink'
import NavProfileLink from '@/app/_components/NavProfileLink'
import NavPopup from '@/app/_components/NavPopup'
import usePosts from '@/app/_hooks/posts';
import useUser from '@/app/_hooks/user';
import { Post } from "@/types/Post";

function menuItems(user: any, addPostFn: any) {
  return [
  {name: "Feed", href: "/feed", icon: <BsLightningFill className="my-auto text-right" />},
  {name: "Board", href: "/posts", icon: <BsClipboardFill className="my-auto" />},
  {name: "Post", onClick: (addPost: any, user: User) => addPostAction(addPostFn, user), icon: <BsFillPlusCircleFill className="my-auto" />},
  ];
}

function addPostAction(addPost: any, user: User | undefined, onSuccess?: (post: Post) => void): boolean {
  const content = window.prompt("Enter content","Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa culpa beatae, maiores asperiores quis veniam, minima laborum magni possimus impedit ipsam ad ullam aliquid earum incidunt voluptate eaque maxime repellat.");
  if (content) {
    const userName = user?.isAnonymous ? "Anonymous" : user?.displayName || user?.email || "Noname";
    const post = addPost(content, userName, user?.uid);
    onSuccess && onSuccess(post);
    return true;
  }

  return false;
}

function isActive(pathname: string, href: string): boolean {
  return (href && (href == "/" && pathname == "/") || (href && href != "/" && pathname.startsWith(href))) as boolean;
}

export default function Nav() {
  const pathname = usePathname();
  const addPost = usePosts((state: any) => state.add);
  const { user } = useUser();

  return (
    <div className="bg-teal-600 text-slate-300 fixed z-10 w-full h-10 lg:w-32 lg:h-screen flex flex-row lg:flex-col">
      <div className="flex flex-grow-0 p-2 -ml-1 lg:ml-0 lg:-mt-1">
        <NavLink href="/" className="_bg-yellow-600 hover:no-underline">
          <div className="Logo my-auto">PubSpace</div>
        </NavLink>
      </div>
      <div className="flex flex-grow flex-row lg:flex-col space-x-4 lg:space-x-0 pl-2 pr-0 py-2 lg:py-0 lg:px-2 -mx-2 -my-0 lg:mx-0 lg:-my-2 _bg-yellow-100">
        {menuItems && menuItems(user, addPost).map((menuItem: any) => (
          <NavLink 
            className="_bg-pink-300 hidden md:flex"
            href={menuItem.href} 
            isActive={isActive(pathname, menuItem.href)}
            onClick={() => menuItem.onClick && menuItem.onClick(addPost, user, () => 42)}
          >
            {menuItem.icon}
            <div className="my-auto">{menuItem.name}</div>
          </NavLink>
        ))}
        <div className="md:hidden mt-1">
          <NavPopup menuItems={menuItems(user, addPost)}/>
        </div>
      </div>
      <div className="flex flex-col p-2 -mr-1 lg:mr-0 lg:-mb-1">
        <NavProfileLink href="/profile" className="_bg-orange-600" />
      </div>
    </div>
  )
}
