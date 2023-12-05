import moment from 'moment';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Post } from "@/types/Post"
import { Menu } from '@/types/Menus';

const useMenus: any = create(devtools((set: any, get: any) => ({
  menus: [],
  deletedMenus: [], // to smooth out visual glitches when deleting
  loaded: false,

  load: async (id?: string) => {
    console.log(">> hooks.menu.load", { id });

    // rest api (optimistic: all or just the one)
    if (id) {
      fetch(`/api/menus/${id}`).then(async (res) => {
        if (res.status != 200) {
          console.error(`Error fetching menu ${id}: ${res.status} (${res.statusText})`);
          set({ loaded: true });
          return;
        }

        const data = await res.json();
        // console.log(">> hooks.menu.get: RETURNED FROM FETCH, returning!");
        const menu = data.menu;
        const menus = get().menus.filter((menu: Menu) => menu.id != id);
        set({ menus: [...menus, menu], loaded: true });
      });
    } else {
      fetch('/api/menus').then(async (res) => {
        if (res.status != 200) {
          console.error(`Error fetching posts: ${res.status} (${res.statusText})`);
          return;
        }

        const data = await res.json();
        const deleted = get().deletedMenus.map((menu: Menu) => menu.id);
        set({
          menus: data.menus.filter((menu: Menu) => !deleted.includes(menu.id)),
          loaded: true
        });
      });
    }
  },

  // add: async (content: string, posterName: string, posterUID: string, position?: number) => {
  //   console.log(">> hooks.menu.add content:", content);

  //   // optimistic
  //   const tempId = crypto.randomUUID();
  //   const post = {
  //     id: tempId,
  //     postedBy: posterName,
  //     postedByUID: posterUID,
  //     postedAt: moment().valueOf(),
  //     content,
  //     position,
  //     optimistic: true,
  //   };
  //   set({ posts: [...get().posts, post] });

  //   fetch('/api/posts', {
  //     method: "POST",
  //     body: JSON.stringify({ content, position }),
  //   }).then(async (res) => {
  //     if (res.status != 200) {
  //       console.error(`Error adding post: ${res.status} (${res.statusText})`);
  //       const posts = get().posts.filter((post: Post) => post.id != tempId);
  //       set({ posts });
  //       return;
  //     }

  //     const data = await res.json();
  //     const post = data.post;
  //     // remove optimistic post
  //     const posts = get().posts.filter((post: Post) => post.id != tempId);
  //     set({ posts: [...posts, post] });
  //   });
  // },

  // edit: async (post: Post) => {
  //   console.log(">> hooks.menu.edit post:", post);

  //   if (!post.id) {
  //     throw `Cannot edit post with null id`;
  //   }

  //   // optimistic
  //   const posts = get().posts.filter((post: Post) => post.id != post.id);
  //   posts.push(post);
  //   set({ posts });

  //   fetch(`/api/posts/${post.id}`, {
  //     method: "PUT",
  //     body: JSON.stringify(post),
  //   }).then(async (res) => {
  //     if (res.status != 200) {
  //       console.error(`Error editing post ${post.id}: ${res.status} (${res.statusText})`);
  //     }

  //     // TODO bring back the thing here?
  //   });
  // },

  // delete: async (id: string) => {
  //   console.log(">> hooks.menu.delete id:", id);

  //   if (!id) {
  //     throw `Cannot delete post with null id`;
  //   }

  //   const { posts, deletedPosts } = get();

  //   // optimistic
  //   set({
  //     posts: posts.filter((p: Post) => p.id != id),
  //     deletedPosts: [...deletedPosts, posts.filter((post: Post) => post.id == id)[0]],
  //   });

  //   fetch(`/api/posts/${id}`, {
  //     method: "DELETE",
  //   }).then(async (res) => {
  //     if (res.status != 200) {
  //       console.error(`Error deleting post ${id}: ${res.status} (${res.statusText})`);
  //       set({ posts, deletedPosts });
  //       return;
  //     }

  //     set({ deletedPosts: deletedPosts.filter((post: Post) => post.id == id) });
  //   });
  // },
})));

export default useMenus;
