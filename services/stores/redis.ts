// 'use server'

import moment from 'moment';
import { kv } from "@vercel/kv";
import { Post } from "@/types/Post"
import { samplePosts } from './samples';


export async function getPosts(): Promise<Post[]> {
    console.log('>> services.stores.redis.getPosts()');

    let response = await kv.json.get("posts", "$[*]"); // y this not work? $[?(@.deletedAt==null)]
    console.log("REDIS response", JSON.stringify(response));

    if (!response || !response.length) {
        console.log('>> services.stores.redis.getPosts(): empty redis key, uploading samples');
        await kv.json.set("posts", "$", "[]");
        samplePosts.forEach(async (post: Post) => await kv.json.arrappend("posts", `$`, post));
        response = await kv.json.get("posts", "$[*]");
    }

    const posts = (response as Post[]).filter((post: Post) => post && !post.deletedAt);
    return posts;
}

export async function getPost(id: string): Promise<Post | null> {
    console.log(`>> services.stores.redis.getPost(${id})`);

    // let response = await kv.json.get("posts", "$");
    const response = await kv.json.get("posts", `$[?(@.id=='${id}')]`);

    let post: Post | null = null;
    if (response) {
        // const posts = response[0];
        // post = posts.filter((p: Post) => p.id == id)[0];
        post = response[0] as Post;
    }

    return post;
}

export async function addPost(content: string, postedBy: string, postedByUID?: string): Promise<Post> {
    console.log(">> services.stores.redis.addPost content:", { content, postedBy });

    const post = {
        id: crypto.randomUUID(),
        postedBy,
        postedByUID,
        postedAt: moment().valueOf(),
        content
    };

    const response = await kv.json.arrappend("posts", "$", post);
    console.log("REDIS response", response);

    return post;
}

export async function editPost(post: Post): Promise<Post> {
    console.log(">> services.stores.redis.editPost post:", post);

    if (!post.id) {
        throw `Cannot delete post with null id`;
    } 

    const response = await kv.json.set("posts", `$[?(@.id=='${post.id}')]`, post);
    console.log("REDIS response", response);
    
    return post
}

export async function deletePost(id: string): Promise<void> {
    console.log(">> services.stores.redis.deletePost id:", id);

    if (!id) {
        throw `Cannot delete post with null id`;
    }


    const response = await kv.json.set("posts", `$[?(@.id=='${id}')].deletedAt`, moment().valueOf());
    console.log("REDIS response", response);
}
