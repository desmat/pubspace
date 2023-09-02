import moment from 'moment';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Profile } from "@/types/Profile"

const useProfiles: any = create(devtools((set: any, get: any) => ({
    profiles: {},
    loaded: false,
    
    load: async (uid?: string) => {
        console.log(">> hooks.profileStore.load");
        // // server action
        // TODO

        // rest api (optimistic: all or just the one)
        if (uid) {
            fetch(`/api/profiles/${uid}`).then(async (res) => {
                if (res.status != 200) {
                    console.error(`Error fetching profile ${uid}: ${res.status} (${res.statusText})`);
                    set({ profiles: { ...get().profiles, [uid]: undefined }, loaded: true });
                    return;
                }

                const data = await res.json();
                console.log(">> hooks.profileStore.get: RETURNED FROM FETCH, returning!", data);
                set({ profiles: { ...get().profiles, ...data.profiles }, loaded: true });
            });
        } else {
            fetch('/api/profiles').then(async (res) => {
                if (res.status != 200) {
                    console.error(`Error fetching profiles: ${res.status} (${res.statusText})`);
                    return;
                }

                const data = await res.json();
                const profiles = data.profiles;
                set({ profiles, loaded: true });
            });
        }
    },
})));

export default useProfiles;
