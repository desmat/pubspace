'use client'

import Image from 'next/image'

export default function Page() {
  console.log('>> app.profile.page.render()');

  return (
    <main className="flex min-h-screen flex-col items-center _justify-between _p-24">
      <h1>PROFILE HERE</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa culpa beatae, maiores asperiores quis veniam, minima laborum magni possimus impedit ipsam ad ullam aliquid earum incidunt voluptate eaque maxime repellat.
      </p>
    </main>
  )
}
