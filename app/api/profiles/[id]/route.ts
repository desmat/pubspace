import { NextResponse } from "next/server";
import { getUser } from "@/services/users";
import { Profile } from "@/types/Profile";


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    console.log('>> app.api.profiles.[id].GET', params);

    const user = await getUser(params.id);
    if (!user) {
        return NextResponse.json({ profiles: {} }, {status: 404});
    }

    const profile = {
        id: user.uid,
        user: user,
    }

    return NextResponse.json({ profiles: { [profile.id]: profile } });
}

// export async function PUT(request: Request) {
//     console.log('>> app.api.posts.[id].PUT', request);

//     const data: any = await request.json();
//     const post = data as Post;

//     if (!post.id) {
//         throw `Cannot update post with null id`;
//     }

//     const updatedPost = await editPost(post);
    
//     return NextResponse.json({ updatedPost });
// }

// export async function DELETE(
//     request: Request,
//     { params }: { params: { id: string } }
// ) {
//     console.log('>> app.api.posts.DELETE params', params);

//     if (!params.id) {
//         throw `Cannot delete post with null id`;
//     }

//     const post = await deletePost(params.id);
//     return NextResponse.json({ post });
// }
