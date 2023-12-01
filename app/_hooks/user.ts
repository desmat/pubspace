import { User } from "firebase/auth";
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { init as doInit, logout as doLogout, signin as doSignin, signInAnonymously as doSignInAnonymously } from "@/services/auth";
import { SigninMethod } from "@/types/SigninMethod";

const useUser: any = create(devtools((set: any, get: any) => ({
  user: undefined,
  loaded: false,

  load: async () => {
    console.log(">> hooks.user.load",);

    const onAuthStateChanged = async function (user: User) {
      const savedUser = get().user;
      const loaded = get().loaded;
      if (user) {
        console.log('>> hooks.User.useUser.onAuthStateChanged', { user });
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (user.uid != savedUser?.uid || !loaded) {
          fetch('/api/user', {
            method: "GET"
          }).then(async (response: any) => {
            if (response.status != 200) {
              console.error(`Error fetching user ${user.uid}: ${response.status} (${response.statusText})`);
              set({ loaded: true });
              return;
            }
    
            const updatedUser = await response.json();
            console.log('>> hooks.User.useUser.onAuthStateChanged', { user, updatedUser });
            // user.customClaims = updatedUser.customClaims;
            set({ user: { ...user, admin: updatedUser.customClaims?.admin }, loaded: true });
          });
    
          // set({ user: user });
        }
        // set({ loaded: true });
      } else {
        // User is signed out
        console.log('>> hooks.User.useUser.onAuthStateChanged signed out', { });
        set({ user: undefined, loaded: true });
    
        // when not signed in or logged out sign in anonymously
        // doSignInAnonymously(); // TODO UNCRIPPLE
      }
    };    

    return doInit({ onAuthStateChanged }).then((user: any) => {
      console.log('>> hooks.User.useUser.doInit', { user });
      // set({ user, loaded: true });
    });
  },

  signin: async (method: SigninMethod, params?: any) => {
    console.log(">> hooks.User.signin", { method, params });

    const signinFn = async () => {
      if (method == "anonymous") {
        const ret = (await doSignInAnonymously()) as any;
        return ret?.user;
      } else {
        return doSignin(method, params);
      }
    };

    return new Promise((resolve, reject) => {
      signinFn()
        .then(async (user: any) => {
          // console.log(">> hooks.User.signin", { user });
          // setUser(user as User);
          // resolve(user);

          const authToken = await user.getIdToken();
          // console.log(">> hooks.User.signin", { authToken });

          fetch('/api/user', {
            method: "POST",
            body: JSON.stringify({ uid: user.uid, authToken }),
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }).then(async (response: any) => {
            const updatedUser = await response.json();
            // console.log('>> hooks.User.signin', { updatedUser });
            set({ user: { ...user, admin: updatedUser.customClaims?.admin }, loaded: true });
            resolve(user);
          });
        }).catch((error) => {
          console.warn('>> hooks.User.signin', { error });
          set({ user: undefined, loaded: true });
          reject(error);
        });
    });
  },


  logout: async () => {
    console.log(">> hooks.User.logout");

    return new Promise((resolve, reject) => {
      doLogout().then(() => {
        if (get().user) {
          fetch('/api/user', {
            method: "DELETE",
          }).then(() => {
            console.warn(">> hooks.User.logout success")
            set({ user: undefined });
            resolve(true);
          }).catch((error) => {
            console.warn(">> hooks.User.logout error", { error })
            reject(error);
          })
        }
      });
    });
  },
})));

export default useUser;
