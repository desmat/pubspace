// 'use server'

import moment from 'moment';
import * as store from "./stores/firestore";
// import * as store from "./stores/redis";
// import * as store from "./stores/memory";
import { Post } from "@/types/Post"

export async function getPosts(): Promise<Post[]> {
    console.log('>> services.post.getPosts()');
    
    const posts = store.getPosts();
    return new Promise((resolve, reject) => resolve(posts));
}

export async function getPost(id: string): Promise<Post | null> {
    console.log(`>> services.post.getPost(${id})`);

    const post = store.getPost(id);
    return new Promise((resolve, reject) => resolve(post));
}

export async function addPost(content: string, postedBy: string, postedByUID?: string): Promise<Post> {
    console.log(">> services.post.addPost content:", { content, postedBy });

    const post = {
        id: crypto.randomUUID(),
        postedBy,
        postedByUID,
        postedAt: moment().valueOf(),
        content
    };

    store.addPost(content, postedBy, postedByUID);
    return new Promise((resolve, reject) => resolve(post));
}

export async function editPost(post: Post): Promise<Post> {
    console.log(">> services.post.editPost post:", post);

    if (!post.id) {
        throw `Cannot delete post with null id`;
    } 

    const updatedPost = store.editPost(post);
    return new Promise((resolve, reject) => resolve(updatedPost));
}

export async function deletePost(id: string): Promise<void> {
    console.log(">> services.post.deletePost id:", id);

    if (!id) {
        throw `Cannot delete post with null id`;
    }

    store.deletePost(id);
    return new Promise((resolve, reject) => resolve());
}
