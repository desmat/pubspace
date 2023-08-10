export default function Page() {
  console.log('>> app.page.render()');

  return (
    <main className="flex flex-col items-center _justify-between _p-24">
      <h1>Welcome to PubSpace!</h1>
      <p>
        Things for pubs, coffee shops, public spaces, etc.
      </p>
      <p>
        <a href="/profile">Signup</a> today!
      </p>
    </main>
  )
}
