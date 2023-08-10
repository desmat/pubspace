'use client'

import moment from 'moment';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Post } from '@/services/posts';

// TODO PostState type

const usePostStore: any = create(devtools((set: any, get: any) => ({
    posts: [],
    loaded: false,
    
    load: async (id: string) => {
        console.log(">> hooks.postStore.load");
        // // server action
        // const posts = getPosts();

        // rest api (blocking)
        // const res = await fetch('/api/posts');
        // if (res.status != 200) {
        //     throw `Error fetching posts: ${res}`;
        // }

        // const data = await res.json();
        // const posts = data.posts;
        // set({ posts, loaded: true });
        // return posts;

        // rest api (optimistic: all or just the one)
        if (id) {
            fetch(`/api/posts/${id}`).then(async (res) => {
                if (res.status != 200) {
                    console.error(`Error fetching post ${id}: ${res.status} (${res.statusText})`);
                    set({ loaded: true });
                    return;
                }

                const data = await res.json();
                // console.log(">> hooks.postStore.get: RETURNED FROM FETCH, returning!");
                const post = data.post;
                const posts = get().posts.filter((post: Post) => post.id != id);
                set({ posts: [...posts, post], loaded: true });
            });
        } else {
            fetch('/api/posts').then(async (res) => {
                if (res.status != 200) {
                    console.error(`Error fetching posts: ${res.status} (${res.statusText})`);
                    return;
                }

                const data = await res.json();
                const posts = data.posts;
                set({ posts, loaded: true });
            });
        }
    },
    
    // get: async (id: string) => {
    //     console.log(">> hooks.postStore.get id:", id);
    //     // // server action
    //     // return await getPost(id);

    //     // // rest api (blocking)
    //     // const res = await fetch(`/api/posts/${id}`);
    //     // if (res.status != 200) {
    //     //     console.error(`Error fetching post ${id}: ${res.status} (${res.statusText})`);
    //     //     return null;
    //     // }

    //     // const data = await res.json();
    //     // return data.post;

    //     // rest api (optimistic)
    //     // const promise = new Promise((resolve, reject) => {
    //     const post = await Promise.any([
    //         fetch(`/api/posts/${id}`).then(async (res) => {
    //             if (res.status != 200) {
    //                 console.error(`Error fetching post ${id}: ${res.status} (${res.statusText})`);
    //                 return null;
    //             }

    //             const data = await res.json();
    //             console.log(">> hooks.postStore.get: RETURNED FROM FETCH, returning!");                
    //             // return data.post;
    //             const post = data.post;
    //             const posts = get().posts.filter((post: Post) => post.id != id);
    //             set({ posts: [...posts, post], loaded: true });
    //             return post;
    //         }),
    //         new Promise ((resolve) => {
    //             const post = get().posts.filter((post: Post) => post.id == id)[0];
    //             if (post) {
    //                 console.log(">> hooks.postStore.get: GOT IN MEM, resolving!");
    //                 resolve(post);
    //             }
    //         })
    //     ]);

    //     console.log(">> hooks.postStore.get: returning", { post });
    //     return post;
    // },
    
    add: async (content: string) => {
        console.log(">> hooks.postStore.add content:", content);
        // // server action
        // const post = await addPost(content);

        // // rest api (blocking)
        // const res = await fetch('/api/posts', {
        //     method: "POST",
        //     body: JSON.stringify({ content }),
        // });

        // if (res.status != 200) {
        //     console.error(`Error adding post: ${res.status} (${res.statusText})`);
        //     return null;
        // }

        // const data = await res.json();
        // const post = data.post;

        // set({ posts: [...get().posts, post] });
        // return post;


        // rest api (optimistic)
        
        const tempId = crypto.randomUUID();
        const postedBy = `POSTER${Math.floor(Math.random() * 10)}`;

        fetch('/api/posts', {
            method: "POST",
            body: JSON.stringify({ content, postedBy }),
        }).then(async (res) => {
            if (res.status != 200) {
                console.error(`Error adding post: ${res.status} (${res.statusText})`);
                const posts = get().posts.filter((post: Post) => post.id != tempId);
                set({ posts });
            }

            const data = await res.json();
            const post = data.post;
            // remove optimistic post
            const posts = get().posts.filter((post: Post) => post.id != tempId);
            set({ posts: [...posts, post] });
        });

        // optimistic post
        const post = {
            id: tempId,
            postedBy,
            postedAt: moment().valueOf(),
            content,
            optimistic: true,
        };

        set({ posts: [...get().posts, post] });
    },

    edit: async (post: Post) => {
        console.log(">> hooks.postStore.edit post:", post);

        if (!post.id) {
            throw `Cannot edit post with null id`;
        }

        fetch(`/api/posts/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
        }).then(async (res) => {
            if (res.status != 200) {
                console.error(`Error editing post ${post.id}: ${res.status} (${res.statusText})`);
            }

            // TODO bring back the thing here?
        });

        const posts = get().posts.filter((p: Post) => p.id != post.id);
        posts.push(post);
        set({ posts: posts});
    },    

    delete: async (id: string) => {
        console.log(">> hooks.postStore.delete id:", id);

        if (!id) {
            throw `Cannot delete post with null id`;
        }

        fetch(`/api/posts/${id}`, {
            method: "DELETE",
        }).then(async (res) => {
            if (res.status != 200) {
                console.error(`Error deleting post ${id}: ${res.status} (${res.statusText})`);
            }

            // TODO bring back the thing here?
        });

        set({ posts: get().posts.filter((p: Post) => p.id != id) });
    },
})));

export default usePostStore;
