'use client'

export default async function Loading() {
  console.log('>> app.feed.loading.render()');

  return (
    <main className="flex min-h-screen flex-col">
      <h1 className="text-center">Latest Posts</h1>
      <p className='italic text-center animate-pulse'>Loading...</p>
    </main>
  )
}
