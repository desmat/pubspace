// 'use server'
'use client'

import Link from 'next/link';
import { useEffect } from 'react';
import { PostEntry } from "@/components/Post";
import { Post } from "@/types/Post"
import usePostStore from "@/hooks/postStore";
import hashCode from '@/utils/hashCode';
import Loading from './loading';

export default function Posts() {
  console.log('>> app.posts.page.render()');
  const [posts, load, loaded] = usePostStore((state: any) => [state.posts, state.load, state.loaded]);

  useEffect(() => {
    load(); // pull again if new data available
  }, []);

  if (!loaded) {
    return <Loading />
  }

  return (
    <main className="flex flex-col">
      {posts && posts.length > 0 &&
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
          {posts
            // .sort((a: Post, b: Post) => a.id.localeCompare(b.id))
            .sort((a: Post, b: Post) => hashCode(a.content) - hashCode(b.content))
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
      {(!posts || !posts.length) &&
        <p className='italic text-center'>No posts yet :(</p>
      }
    </main>
  )
}
