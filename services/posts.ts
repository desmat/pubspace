// 'use server'

import moment from 'moment';
import * as store from "./stores/firestore";
// import * as store from "./stores/redis";
// import * as store from "./stores/memory";
import { Post } from "@/types/Post";

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

export async function addPost(content: string, postedBy: string, postedByUID?: string, position?: number): Promise<Post> {
    console.log(">> services.post.addPost content:", { content, postedBy, position });

    const post = {
        id: crypto.randomUUID(),
        position,
        postedBy,
        postedByUID,
        postedAt: moment().valueOf(),
        content,
    };

    if (!post.position) {
        // figure out next available position
        const posts = await getPosts();
        const filteredPosts = posts.filter((post: Post) => post && !post.deletedAt);;
        const sortedPosts = filteredPosts.sort((a: Post, b: Post) => (a.position || 0) - (b.position || 0));
        const mappedPosts = new Map(sortedPosts.map((post: Post) => [post.position || 0, post]));
        const mappedPostKeys = Array.from(mappedPosts.keys()) as [];
        const maxPosition = mappedPosts && mappedPosts.size > 0 ? Math.max.apply(0, mappedPostKeys) : 0;
       
        // console.log(">> services.post.addPost mappedPosts", mappedPosts);
        // console.log(">> services.post.addPost maxPosition", maxPosition);
      
        // @ts-ignore
        const availableSlots = Array.from(Array(maxPosition).keys()).filter((key: number) => mappedPostKeys.indexOf(key) < 0);
        // console.log(">> services.post.addPost availableSlots", availableSlots);
        const nextPosition = availableSlots && availableSlots.length > 0 ? availableSlots[0] : maxPosition + 1;
        // console.log(">> services.post.addPost nextPosition", nextPosition);
      
        post.position = nextPosition;
    }

    store.addPost(content, postedBy, postedByUID, post.position);
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
