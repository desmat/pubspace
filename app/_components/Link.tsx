import { default as NextLink } from 'next/link'

export default function Link({
  children, href, className, isActive, onClick, style
}: {
  children: React.ReactNode,
  href?: string,
  className?: string,
  isMenu?: boolean,
  isActive?: boolean
  onClick?: (e?: any) => void,
  style?: string
}) {
  // console.log('>> components.NavLink.render()', { isActive });

  const styleSet = new Set(style && style.split(/\s+/));

  return (
    <NextLink
      href={href || "#"}
      onClick={(e) => { if (onClick) {e.preventDefault(); onClick(e);} else if (!href) {e.preventDefault();} }}
      className={
        className + " text-dark-2 active:text-light-1 px-1" + (
          styleSet.has("warning")
            ? " text-dark-2 hover:text-light-2 active:text-light-1 px-1"
            : "") + (
          styleSet.has("light")
            ? " opacity-40 hover:opacity-100"
            : "") + (
          isActive
            ? " cursor-default hover:no-underline"
            : " cursor-pointer hover:underline")
      }
    >
      {children}
    </NextLink>
  )
}
