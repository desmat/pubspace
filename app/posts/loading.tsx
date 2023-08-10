import Post from "../../components/loading/Post";

export default async function Loading() {
  console.log('>> app.posts.loading.render()');

  const posts = [<Post key="1"/>, <Post key="2"/>, <Post key="3"/>];

  return (
    <main className="flex flex-col">
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
