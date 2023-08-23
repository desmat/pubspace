'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import useUser from '@/hooks/User';

export default function ProfileNavLink({
  href, className,
}: {
  href: string,
  className?: string,
}) {
  console.log('>> components.PostNaProfileNavLinkvLink.render()');
  const pathname = usePathname();
  const { user } = useUser();
  
  const isActive = href && (href == "/" && pathname == "/") || (href && href != "/" && pathname.startsWith(href));
  const isLoggedIn = user && user.uid && !user.isAnonymous;
  const photoURL = isLoggedIn && user.photoURL;

  return (
    <Link href={href} className={(isActive ? "text-slate-100" : "text-slate-300") + " flex flex-row ellipsis whitespace-nowrap lg:whitespace-normal space-x-2 h-full lg:h-fit my-0 lg:my-1 mx-1 lg:mx-0 hover:text-slate-100 align-middle text-ellipsis " + className}>
      {!user && <FaRegUserCircle className="my-auto" />}
      {user && !photoURL && <FaUserCircle className="my-auto" />}
      {user && photoURL && <img className="rounded-full max-h-6 max-w-6" src={photoURL as string | undefined}></img>}
      {!user &&
        <div className="overflow-hidden text-ellipsis max-w-[160px] lg:max-w-[90px] whitespace-nowrap">(Not logged in)</div>
      }
      {user &&
        <div className="overflow-hidden text-ellipsis max-w-[160px] lg:max-w-[90px] whitespace-nowrap" title={user.uid}>{user.isAnonymous ? "(Anonymous)" : user.displayName}</div>
      }
    </Link>
  )
}
