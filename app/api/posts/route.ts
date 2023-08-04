import { NextResponse } from 'next/server'
import { getPosts, getPost, addPost } from '@/services/posts';

// export const revalidate = 0
// false | 'force-cache' | 0 | number

export async function GET(request: Request) {
    console.log('>> app.api.posts.GET');
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');

    if (id) {
        const post = await getPost(id);
        return NextResponse.json({ post });   
    }

    const posts = await getPosts();
    return NextResponse.json({ posts });
}

export async function POST(request: Request) {
    console.log('>> app.api.posts.POST', request);
    const data: any = await request.json();
    const post = await addPost(data.content, data.postedBy);
    return NextResponse.json({ post });
}
