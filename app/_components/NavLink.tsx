'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({
  children, href, className, menu, onClick,
}: {
  children: React.ReactNode,
  href: string,
  className?: string,
  menu?: boolean,
  onClick?: () => void,
}) {
  // console.log('>> components.NavLink.render()');
  const pathname = usePathname();
  const isActive = href && (href == "/" && pathname == "/") || (href && href != "/" && pathname.startsWith(href))

  return (
    <div className="flex w-max" onClick={() => onClick && onClick()}>
      <Link
        href={href}
        className={(
          isActive
            ? (menu ? "text-dark-1" : "text-slate-100") + " cursor-default hover:no-underline"
            : (menu ? "text-dark-2" : "text-slate-300") + " cursor-pointer hover:underline"
        ) + (menu
          ? ""
          : " hover:text-slate-100"
          ) + " flex flex-row ellipsis whitespace-nowrap lg:whitespace-normal space-x-2 h-full lg:h-fit my-0 lg:my-1 mx-1 lg:mx-0 align-middle " + className}
      >
        {children}
      </Link>
    </div>
  )
}
