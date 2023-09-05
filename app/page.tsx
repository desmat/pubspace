export default function Page() {
  console.log('>> app.page.render()');

  return (
    <main className="flex flex-col items-center _justify-between _p-24">
      <h1>PubSpace: The app for public spaces!</h1>
      <p>An app for public spaces (pubs, cafés, etc) to manage and publish bulletin boards, menus, event calendars, maybe even trivia and other pub games.</p>
      <p>Just a basic bulletin board for now, more to come soon!</p>
      <p>
        <a href="/profile">Signup</a> today!
      </p>
    </main>
  )
}
