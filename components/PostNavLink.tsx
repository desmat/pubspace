'use client'

import { usePathname } from 'next/navigation'
import usePostStore from '@/hooks/postStore';

function addPostAction(addPost: any, onSuccess: any) {
  const content = window.prompt("Enter content","Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa culpa beatae, maiores asperiores quis veniam, minima laborum magni possimus impedit ipsam ad ullam aliquid earum incidunt voluptate eaque maxime repellat.");
  if (content) {
    // const post = await _addPostAction(content);
    const post = addPost(content);
    onSuccess(post);
  }
}

export default function PostNavLink({
  children, href, className,
}: {
  children: React.ReactNode,
  href?: string,
  className?: string,
}) {
  console.log('>> components.PostNavLink.render()');
  const pathname = usePathname();
  const addPost = usePostStore((state: any) => state.add);
  
  const isActive = href && (href == "/" && pathname == "/") || (href && href != "/" && pathname.startsWith(href))  

  return (
    <div onClick={() => addPostAction(addPost, (post:any) => 42)} className={(isActive ? "text-slate-100" : "text-slate-300") + " flex flex-row space-x-2 h-full lg:h-fit my-0 lg:my-1 mx-1 lg:mx-0 hover:text-slate-100 cursor-pointer hover:underline " + className}>
      {children}
    </div>
  )
}
