import { NextResponse } from 'next/server'
import { getPost } from '@/services/posts';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    console.log('>> app.api.posts.[id].GET', params);

    const post = await getPost(params.id);
    if (!post) {
        return NextResponse.json({ post: {} }, {status: 404});
    }
    
    return NextResponse.json({ post });
}
