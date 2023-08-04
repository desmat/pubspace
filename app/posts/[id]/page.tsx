'use client'

import Loading from "./loading";
import Post from "@/components/Post";
import usePostStore from "../../../hooks/postStore";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  console.log(`>> app.posts.[${params.id}].page.render()`);
  const [load, loaded] = usePostStore((state: any) => [state.load, state.loaded]);
  const post = usePostStore((state: any) => state.posts.filter((post:any) => post.id == params.id)[0]);

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
    </main>
  );
}
