import { User } from 'firebase/auth';
import { NextResponse } from 'next/server'
import { getPosts, getPost, addPost } from '@/services/posts';
import { validateUserSession } from '@/services/users';

// export const revalidate = 0
// false | 'force-cache' | 0 | number

export async function GET(request: Request) {
  console.log('>> app.api.posts.GET');
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // console.log("app.api.posts.GET", { userClaims: await validateUserSession(request) }); // for debugging

  if (id) {
    const post = await getPost(id);
    return NextResponse.json({ post });
  }

  const posts = await getPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  console.log('>> app.api.posts.POST', request);

  const { user } = await validateUserSession(request);
  if (!user) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  const data: any = await request.json();
  const post = await addPost({
    content: data.content, 
    position: data.position,
  }, user as any);
  return NextResponse.json({ post });
}
