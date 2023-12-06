import { BsFilterCircle, BsFilterCircleFill } from "react-icons/bs"
import Link from "./Link"

export default function ({ href, userId, isFiltered }: any) {
  return (
    <>
      {isFiltered &&
        <Link
          href={href}
          className="fixed _lg:top-2 bottom-2 right-1 h-fit"
          title={`Show all`}
        >
          <BsFilterCircleFill className="text-2xl rounded-full shadow-md" />
        </Link>
      }
      {!isFiltered &&
        <Link
          href={`${href}?uid=${userId}`}
          className="fixed _lg:top-2 bottom-2 right-1 h-fit"
          title={`Show created by me`}>
          <BsFilterCircle className="text-2xl rounded-full opacity-30 hover:opacity-100 hover:shadow-md hover:backdrop-blur-sm" />
        </Link>
      }
    </>
  )
}
