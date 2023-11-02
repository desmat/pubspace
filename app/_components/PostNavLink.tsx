'use client'

import { User } from "firebase/auth";
import { usePathname } from 'next/navigation'
import usePosts from '@/app/_hooks/posts';
import useUser from '@/app/_hooks/user';

function addPostAction(addPost: any, user: User | undefined, onSuccess: any) {
  const content = window.prompt("Enter content","Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa culpa beatae, maiores asperiores quis veniam, minima laborum magni possimus impedit ipsam ad ullam aliquid earum incidunt voluptate eaque maxime repellat.");
  if (content) {
    // const post = await _addPostAction(content);
    const userName = user?.isAnonymous ? "Anonymous" : user?.displayName || user?.email || "Noname";
    const post = addPost(content, userName, user?.uid);
    onSuccess(post);
  }
}

export default function PostNavLink({
  children, href, className, menu, onClick,
}: {
  children: React.ReactNode,
  href?: string,
  className?: string,
  menu?: boolean,
  onClick?: () => void
}) {
  console.log('>> components.PostNavLink.render()');
  const pathname = usePathname();
  const addPost = usePosts((state: any) => state.add);
  const { user } = useUser();
  
  const isActive = href && (href == "/" && pathname == "/") || (href && href != "/" && pathname.startsWith(href))  

  return (
    <div 
      onClick={() => { addPostAction(addPost, user, (post:any) => 42); onClick && onClick(); }} 
      className={(isActive 
          ? (menu ? "text-dark-2" : "text-slate-100")
          : (menu ? "text-dark-2" : "text-slate-300")
        ) + (menu 
          ? " hover:text-dark-2"
          : " hover:text-slate-100"
        ) + " flex flex-row space-x-2 h-full lg:h-fit my-0 lg:my-1 mx-1 lg:mx-0 cursor-pointer hover:underline " + className}
    >
      {children}
    </div>
  )
}
