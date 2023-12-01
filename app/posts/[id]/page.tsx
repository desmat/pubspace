'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import Link from "@/app/_components/Link"
import Post from "@/app/_components/Post";
import { Post as PostType } from "@/types/Post"
import usePosts from "@/app/_hooks/posts";
import useUser from "@/app/_hooks/user";
import Loading from "./loading";

function doEdit(post: PostType, editPost: any): any {
  const content = window.prompt("Update content", post.content);
  if (content) {
    post.content = content;
    editPost(post);
    // nav back to main page?
  }
}

function doDelete(post: PostType, router: any, deletePost: any) {
  const response = confirm("Delete post?");
  if (response) {
    deletePost(post.id)
    router.back();
  }
}

export default function Page({ params }: { params: { id: string } }) {
  console.log(`>> app.posts.[${params.id}].page.render()`);
  const [load, loaded, editPost, deletePost] = usePosts((state: any) => [state.load, state.loaded, state.edit, state.delete]);
  const { user } = useUser();
  const post = usePosts((state: any) => state.posts.filter((post: any) => post.id == params.id)[0]);
  const router = useRouter();

  useEffect(() => {
    load(params.id); // pull again if new data available
  }, []);

  useEffect(() => {
    console.log(`>> app.posts.[${params.id}].page.render()`, { user });
  }, [user]);

  if (!loaded) return <Loading />

  if (!post) return (
    <main className="flex flex-col">
      <p className='italic text-center'>Post {params.id} not found :(</p>
    </main>
  )

  return (
    <main className="flex flex-col">
      <Post {...post} />
      <div className="flex justify-center gap-2 p-2">
        <Link onClick={() => router.back()}>Back</Link>
        {post.postedByUID == user?.uid || user?.admin &&
          <>
            <Link onClick={() => doEdit(post, editPost)}>Edit</Link>
            <Link style="warning" onClick={() => doDelete(post, router, deletePost)}>Delete</Link>
          </>
        }
      </div>
    </main>
  );
}
