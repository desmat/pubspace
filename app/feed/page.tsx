'use client'

import moment from "moment";
import usePostStore from "../../hooks/postStore";
import { Post } from "../../services/posts";
import Loading from "./loading";
import { useEffect } from "react";

function PostEntry({ postedBy, postedAt, content }: Post) {
  return (
    <p className="text-left pb-4">
      <span className="italic"><a href="TODO">{postedBy}</a> posted <span title={moment(postedAt).format("LLLL")}>{moment(postedAt).fromNow()}</span><br></br></span>
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
    <main className="flex min-h-screen flex-col">
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
