'use client'

import moment from "moment";
import Link from "next/link";
import { useEffect } from "react";
import usePostStore from "@/app/_hooks/postStore";
import { Post } from "@/types/Post"
import Loading from "./loading";

function PostEntry({ postedBy, postedByUID, postedAt, content }: Post) {
  return (
    <p className="text-left pb-4">

      <span className="opacity-50 truncate">
        <span>Added </span>
        <span title={moment(postedAt).format("LLLL")} className="truncate text-ellipsis">{moment(postedAt).fromNow()}</span>
        <span> by </span>
      </span>
      {postedByUID &&
        <Link className=" text-dark-2 opacity-50 hover:opacity-100" href={`/profile/${postedByUID}`}>{postedBy}</Link>
      }
      {!postedByUID &&
        <span className="_bg-pink-100 _text-dark-2 opacity-50">{postedBy}</span>
      }
      <br />
      {content}
    </p>
  );
}

export default function Feed() {
  console.log('>> app.feed.page.render()');
  const [posts, load, loaded] = usePostStore((state: any) => [state.posts, state.load, state.loaded]);

  useEffect(() => {
    load(); // pull again if new data available
  }, []);

  if (!loaded) {
    return <Loading />
  }

  return (
    <main className="flex flex-col">
      <h1  className="text-center">Latest Posts</h1>
      {posts && posts.length > 0 &&
        <>
          {
            posts
              .sort((a: Post, b: Post) => b.postedAt.valueOf() - a.postedAt.valueOf())
              .map((post: Post) => <div key={post.id}><PostEntry {...post} /></div>)
          }
          <p className='italic text-center'>That&apos;s all folks!</p>
        </>
      }
      {(!posts || !posts.length) &&
        <p className='italic text-center'>No posts yet :(</p>
      }
    </main>
  )
}
