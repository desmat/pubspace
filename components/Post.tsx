'use client'

import moment from "moment";
import { Post } from "@/types/Post"

export function PostEntry({ id, postedBy, postedAt, content }: Post) {
  console.log(`>> components.PostEntry.render(${id})`);
  return (
    // <Post {...post} />
    <div className="flex flex-col text-left p-2 border border-solid border-neutral-400 bg-slate-100 drop-shadow-md">
      <p className="_bg-pink-200 h-20 line-clamp-3">{content.substring(0, 200) + (content.length > 200 ? "..." : "")}</p>
      <div className="text-center align-bottom first-letter:uppercase text-dark-1 text-sm">
        <span className="opacity-50 truncate">
          <span title={moment(postedAt).format("LLLL")} className="truncate text-ellipsis">{moment(postedAt).fromNow()}</span> by </span>
        <span className="_bg-pink-100 text-dark-2">{postedBy}</span>
      </div>
    </div>
  );
}

export default function Post({ id, postedBy, postedAt, content }: Post) {
  console.log(`>> components.Post.render(${id})`);
  return (
    <div className="flex flex-col text-left p-2 border border-solid border-neutral-400 bg-slate-100 drop-shadow-md">
      <p className="h-full text-clip">{content}</p>
      <div className="text-center align-bottom first-letter:uppercase text-dark-1">
        <span className="opacity-50">
          <span title={moment(postedAt).format("LLLL")}>{moment(postedAt).fromNow()}</span> by </span>
        <span className="_bg-pink-100 text-dark-2">{postedBy}</span>
      </div>
    </div>
  );
}
