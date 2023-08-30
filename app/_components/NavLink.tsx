'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({
  children, href, className,
}: {
  children: React.ReactNode,
  href: string,
  className?: string,
}) {
  // console.log('>> components.NavLink.render()');
  const pathname = usePathname();
  const isActive = href && (href == "/" && pathname == "/") || (href && href != "/" && pathname.startsWith(href))

  return (
    <Link href={href} className={(isActive ? "text-slate-100" : "text-slate-300") + " flex flex-row ellipsis whitespace-nowrap lg:whitespace-normal space-x-2 h-full lg:h-fit my-0 lg:my-1 mx-1 lg:mx-0 hover:text-slate-100 align-middle " + className}>
      {children}
    </Link>
  )
}
