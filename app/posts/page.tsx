// 'use server'
'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';
import { PostEntry } from "@/app/_components/Post";
import { Post } from "@/types/Post"
import usePostStore from "@/app/_hooks/postStore";
import hashCode from '@/utils/hashCode';
import Loading from './loading';

export default function Posts() {
  console.log('>> app.posts.page.render()');
  const [posts, load, loaded] = usePostStore((state: any) => [state.posts, state.load, state.loaded]);
  const params = useSearchParams();
  const uidFilter = params.get("uid");
  const filteredPosts = uidFilter ? posts.filter((post: Post) => post.postedByUID == uidFilter) : posts

  useEffect(() => {
    load(); // pull again if new data available
  }, []);

  if (!loaded) {
    return <Loading />
  }

  return (
    <main className="flex flex-col">
      {uidFilter && 
      <Link href="/posts" className="flex flex-row-reverse pb-2 text-dark-2 hover:text-light-3 cursor-zoom-out">
        User: {uidFilter}
      </Link>
      }
      {filteredPosts && filteredPosts.length > 0 &&
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
          {filteredPosts
            // .sort((a: Post, b: Post) => a.id.localeCompare(b.id))
            .sort((a: Post, b: Post) => hashCode(a?.content || "") - hashCode(b?.content || ""))
            .map((post: Post) => (
              <div key={post.id}>
                {post.optimistic &&
                 <PostEntry {...post} />
                }
                {!post.optimistic &&
                  <Link href={`/posts/${post.id}`} className="no-link-style p-0">
                    <PostEntry {...post} />
                  </Link>
                }
              </div>
            ))
          }
        </div>
      }
      {(!filteredPosts || !filteredPosts.length) &&
        <p className='italic text-center'>No posts yet :(</p>
      }
    </main>
  )
}
