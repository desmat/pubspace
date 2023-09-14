// 'use server'
'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';
import { BsPlusLg } from "react-icons/bs"
import { User } from 'firebase/auth';
import { PostEntry } from "@/app/_components/Post";
import { Post } from "@/types/Post"
import usePosts from "@/app/_hooks/posts";
import Loading from './loading';
import useUser from '../_hooks/user';

function addPostAction(addPostFn: any, user: User | undefined, position: number, onSuccess?: any) {
  const content = window.prompt("Enter content", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa culpa beatae, maiores asperiores quis veniam, minima laborum magni possimus impedit ipsam ad ullam aliquid earum incidunt voluptate eaque maxime repellat.");
  if (content) {
    const userName = user?.isAnonymous ? "Anonymous" : user?.displayName || user?.email || "Noname";
    const post = addPostFn(content, userName, user?.uid, position);
    onSuccess && onSuccess(post);
  }
}

function EmptySlot({ addPostFn, user, position }: any) {
  return (
    <div onClick={() => addPostAction(addPostFn, user, position)} className="relative cursor-pointer opacity-0 hover:opacity-30 p-0 border border-dashed border-black">
      <BsPlusLg className="m-auto absolute left-0 right-0 top-0 bottom-0" />
      {/* just to keep the right shape */}
      <div className="invisible">
        <PostEntry id="" postedBy="" postedByUID="" postedAt={0} content="ASDF" />
      </div>
    </div>
  );
}

export default function Posts() {
  console.log('>> app.posts.page.render()');
  const [posts, load, loaded, addPost] = usePosts((state: any) => [state.posts, state.load, state.loaded, state.add]);
  const { user } = useUser();
  const params = useSearchParams();
  const uidFilter = params.get("uid");
  const filteredPosts = uidFilter ? posts.filter((post: Post) => post.postedByUID == uidFilter) : posts
  const sortedPosts = filteredPosts.sort((a: Post, b: Post) => (a.position || 0) - (b.position || 0));
  const mappedPosts = new Map(sortedPosts.map((post: Post) => [post.position || 0, post]));
  const mappedPostKeys = Array.from(mappedPosts.keys()) as [];
  const maxPosition = mappedPosts && mappedPosts.size > 0 ? Math.max.apply(0, mappedPostKeys) : 0;

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
      {mappedPosts && mappedPosts.size > 0 &&
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
          {Array.from(Array(maxPosition + 2).keys()).map((position: number) => {
            let post = mappedPosts.get(position) as Post;

            if (!post) {
              return (
                <div key={position}>
                  <EmptySlot addPostFn={addPost} user={user} position={position} />
                </div>
              )
            }

            return (
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
            )
          })
          }
        </div>
      }
      {(!filteredPosts || !filteredPosts.length) &&
        <p className='italic text-center'>No posts yet :(</p>
      }
    </main>
  )
}
