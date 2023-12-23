import moment from 'moment';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Post } from "@/types/Post"
import useAlert from './alert';


// TODO PostState type

const usePosts: any = create(devtools((set: any, get: any) => ({
  posts: [],
  deletedPosts: [], // to smooth out visual glitches when deleting
  loaded: false,

  load: async (id?: string) => {
    console.log(">> hooks.postStore.load", { id });

    // rest api (optimistic: all or just the one)
    if (id) {
      fetch(`/api/posts/${id}`).then(async (res) => {
        if (res.status != 200) {
          useAlert.getState().error(`Error fetching post ${id}: ${res.status} (${res.statusText})`);
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
          useAlert.getState().error(`Error fetching posts: ${res.status} (${res.statusText})`);
          return;
        }

        const data = await res.json();
        const deleted = get().deletedPosts.map((post: Post) => post.id);
        set({
          posts: data.posts.filter((post: Post) => !deleted.includes(post.id)),
          loaded: true
        });
      });
    }
  },

  add: async (content: string, posterName: string, posterUID: string, position?: number) => {
    console.log(">> hooks.postStore.add content:", content);

    // optimistic
    const tempId = crypto.randomUUID();
    const post = {
      id: tempId,
      postedBy: posterName,
      postedByUID: posterUID,
      postedAt: moment().valueOf(),
      content,
      position,
      optimistic: true,
    };
    set({ posts: [...get().posts, post] });

    fetch('/api/posts', {
      method: "POST",
      body: JSON.stringify({ content, position }),
    }).then(async (res) => {
      if (res.status != 200) {
        useAlert.getState().error(`Error adding post: ${res.status} (${res.statusText})`);
        const posts = get().posts.filter((post: Post) => post.id != tempId);
        set({ posts });
        return;
      }

      const data = await res.json();
      const post = data.post;
      // remove optimistic post
      const posts = get().posts.filter((post: Post) => post.id != tempId);
      set({ posts: [...posts, post] });
    });
  },

  edit: async (post: Post) => {
    console.log(">> hooks.postStore.edit post:", post);

    if (!post.id) {
      throw `Cannot edit post with null id`;
    }

    // optimistic
    const posts = get().posts.filter((post: Post) => post.id != post.id);
    posts.push(post);
    set({ posts });

    fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify(post),
    }).then(async (res) => {
      if (res.status != 200) {
        useAlert.getState().error(`Error editing post ${post.id}: ${res.status} (${res.statusText})`);
      }

      // TODO bring back the thing here?
    });
  },

  delete: async (id: string) => {
    console.log(">> hooks.postStore.delete id:", id);

    if (!id) {
      throw `Cannot delete post with null id`;
    }

    const { posts, deletedPosts } = get();

    // optimistic
    set({
      posts: posts.filter((p: Post) => p.id != id),
      deletedPosts: [...deletedPosts, posts.filter((post: Post) => post.id == id)[0]],
    });

    fetch(`/api/posts/${id}`, {
      method: "DELETE",
    }).then(async (res) => {
      if (res.status != 200) {
        useAlert.getState().error(`Error deleting post ${id}: ${res.status} (${res.statusText})`);
        set({ posts, deletedPosts });
        return;
      }

      set({ deletedPosts: deletedPosts.filter((post: Post) => post.id == id) });
    });
  },
})));

export default usePosts;
