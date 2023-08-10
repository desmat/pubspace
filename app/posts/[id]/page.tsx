'use client'

import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import Loading from "./loading";
import Post from "@/components/Post";
import { Post as PostType } from "../../../services/posts";
import usePostStore from "../../../hooks/postStore";

function doEdit(e: any, post: PostType, editPost: any): any {
  // console.log("*** EDIT ***");
  e.preventDefault();

  const content = window.prompt("Update content", post.content);
  // console.log("*** EDIT *** content", content);
  if (content) {
    post.content = content;
    editPost(post);
    // nav back to main page?
  }
}

function doDelete(e: any, post: PostType, router: any, deletePost: any) {
  // console.log("*** DELETE ***");
  e.preventDefault();

  const response = confirm("Delete post?");
  // console.log("*** DELETE *** content", response);
  if (response) {
    // deletePost(post);
    deletePost(post.id)
    router.back();
  }
}

export default function Page({ params }: { params: { id: string } }) {
  console.log(`>> app.posts.[${params.id}].page.render()`);
  const [load, loaded, editPost, deletePost] = usePostStore((state: any) => [state.load, state.loaded, state.edit, state.delete]);
  const post = usePostStore((state: any) => state.posts.filter((post:any) => post.id == params.id)[0]);
  const router = useRouter();

  useEffect(() => {
    load(params.id); // pull again if new data available
  }, []);

  if (!loaded) return <Loading />

  if (!post) return (
    <main className="flex min-h-screen flex-col">
      <p className='italic text-center'>Post {params.id} not found :(</p>
    </main>
  )

  return (
    <main className="flex min-h-screen flex-col">
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
