// 'use server'
'use client'

import Link from 'next/link';
import { useEffect } from 'react';
import { PostEntry } from "../../components/Post";
import Loading from './loading';
import { Post } from '@/services/posts';
import usePostStore from "../../hooks/postStore";
import hashCode from '@/utils/hashCode';

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
    <main className="flex min-h-screen flex-col">
      {posts && posts.length > 0 &&
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
          {posts
            // .sort((a: Post, b: Post) => a.id.localeCompare(b.id))
            .sort((a: Post, b: Post) => hashCode(a.content) - hashCode(b.content))
            .map((post: Post) => (
              <>
                {post.optimistic &&
                  <div key={post.id} className="bg-pink-100">
                    <PostEntry {...post} />
                  </div>
                }
                {!post.optimistic &&
                  <Link key={post.id} href={`/posts/${post.id}`} className="no-link-style p-0">
                    <PostEntry {...post} />
                  </Link>
                }
              </>
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
