import Post from "@/components/loading/Post";

export default function Loading() {
  console.log(`>> app.posts.[id].loading.render()`);
  return (
    <main className="flex flex-col">
      <Post/>
    </main>
  )
}
