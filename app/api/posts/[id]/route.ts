import { NextResponse } from 'next/server'
import { getPost, editPost, deletePost } from '@/services/posts';
import { validateUserSession } from '@/services/users';
import { Post } from "@/types/Post"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('>> app.api.posts.[id].GET', params);

  const post = await getPost(params.id);
  if (!post) {
    return NextResponse.json({ post: {} }, { status: 404 });
  }

  console.log('>> app.api.posts.DELETE', { post, byUUI: post?.postedByUID });

  return NextResponse.json({ post });
}

export async function PUT(request: Request) {
  console.log('>> app.api.posts.[id].PUT', request);

  const data: any = await request.json();
  const post = data as Post;

  if (!post.id) {
    throw `Cannot update post with null id`;
  }

  const { user } = await validateUserSession(request)
  // console.log('>> app.api.posts.PUT', { user });
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const updatedPost = await editPost(post, user);
  return NextResponse.json({ updatedPost });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('>> app.api.posts.DELETE params', params);

  if (!params.id) {
    throw `Cannot delete post with null id`;
  }


  const { user } = await validateUserSession(request)
  console.log('>> app.api.posts.DELETE', { user });
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const post = await deletePost(params.id, user);
  return NextResponse.json({ post });
}
