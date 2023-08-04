'use client'

import Post from "../../components/loading/Post";

export default async function Loading() {
  console.log('>> app.posts.loading.render()');

  const posts = [<Post />, <Post />, <Post />, ]

  return (
    <main className="flex min-h-screen flex-col">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
        {posts
          .map((post, index) => (
            <div key={index}>
              {post}
            </div>
        ))
        }
      </div>
    </main>
  )
}
