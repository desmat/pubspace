'use client'

import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import Post from "@/app/_components/Post";
import { Post as PostType } from "@/types/Post"
import usePosts from "@/app/_hooks/posts";
import Loading from "./loading";

function doEdit(e: any, post: PostType, editPost: any): any {
  e.preventDefault();

  const content = window.prompt("Update content", post.content);
  if (content) {
    post.content = content;
    editPost(post);
    // nav back to main page?
  }
}

function doDelete(e: any, post: PostType, router: any, deletePost: any) {
  e.preventDefault();

  const response = confirm("Delete post?");
  if (response) {
    deletePost(post.id)
    router.back();
  }
}

export default function Page({ params }: { params: { id: string } }) {
  console.log(`>> app.posts.[${params.id}].page.render()`);
  const [load, loaded, editPost, deletePost] = usePosts((state: any) => [state.load, state.loaded, state.edit, state.delete]);
  const post = usePosts((state: any) => state.posts.filter((post:any) => post.id == params.id)[0]);
  const router = useRouter();

  useEffect(() => {
    load(params.id); // pull again if new data available
  }, []);

  if (!loaded) return <Loading />

  if (!post) return (
    <main className="flex flex-col">
      <p className='italic text-center'>Post {params.id} not found :(</p>
    </main>
  )

  return (
    <main className="flex flex-col">
      <Post {...post} />
      <div className="flex justify-center space-x-4 p-2">
        {/* <div className="text-dark-2">
          <Link href="/" onClick={(e) => router.back()}>Back</Link>
        </div> */}
        <div className="text-dark-2">
          <Link href="/" onClick={(e) => doEdit(e, post, editPost)}>Edit</Link>
        </div>
        <div className="text-dark-2 hover:text-light-2">
          <Link href="/" onClick={(e) => doDelete(e, post, router, deletePost)}>Delete</Link>
        </div>
      </div>
    </main>
  );
}
