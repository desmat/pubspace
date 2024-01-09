import { User } from 'firebase/auth';
import moment from 'moment';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Menu } from '@/types/Menus';
import { uuid } from '@/utils/misc';
import useAlert from './alert';

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
          useAlert.getState().error(`Error fetching menu ${id}: ${res.status} (${res.statusText})`);
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
          useAlert.getState().error(`Error fetching menus: ${res.status} (${res.statusText})`);
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

  createMenu: async (user: User, name: string, type: string, numItems: number) => {
    console.log(">> hooks.menu.createMenu", { name, type, numItems });

    // optimistic
    const tempId = uuid();
    const menu = {
      id: tempId,
      createdBy: user.uid,
      createdAt: moment().valueOf(),
      status: "generating",
      name,
      // prompt,
      items: [],
      optimistic: true,
    }
    set({ menus: [...get().menus, menu] });

    fetch('/api/menus', {
      method: "POST",
      body: JSON.stringify({ name, type, numItems }),
    }).then(async (res) => {
      if (res.status != 200) {
        useAlert.getState().error(`Error adding menu: ${res.status} (${res.statusText})`);
        const menus = get().menus.filter((menu: Menu) => menu.id != tempId);        
        set({ menus });
        return;
      }

      const data = await res.json();
      const menu = data.menu;
      // remove optimistic post
      const menus = get().menus.filter((menu: Menu) => menu.id != tempId);
      set({ menus: [...menus, menu] });
    });
  },

  deleteMenu: async (id: string) => {
    console.log(">> hooks.menu.deleteMenu id:", id);

    if (!id) {
      throw `Cannot delete menu with null id`;
    }

    const { menus, deletedMenus } = get();

    // optimistic
    set({
      menus: menus.filter((menu: Menu) => menu.id != id),
      deletedMenus: [...deletedMenus, menus.filter((menu: Menu) => menu.id == id)[0]],
    });

    fetch(`/api/menus/${id}`, {
      method: "DELETE",
    }).then(async (res) => {
      if (res.status != 200) {
        useAlert.getState().error(`Error deleting menus ${id}: ${res.status} (${res.statusText})`);
        set({ menus, deletedMenus });
        return;
      }

      set({ deletedMenus: deletedMenus.filter((menu: Menu) => menu.id == id) });
    });
  },
})));

export default useMenus;
