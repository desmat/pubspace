import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { init as doInit, logout as doLogout, signin as doSignin, signInAnonymously as doSignInAnonymously } from "@/services/auth";
import { SigninMethod } from "@/types/SigninMethod";

export default function useUser() {
  const [savedUser, setUser] = useState<User & { admin?: boolean } | undefined>();
  const [idToken, setIdToken] = useState<string | undefined>();

  const onAuthStateChanged = async function (user: User) {
    if (user) {
      // console.log('>> hooks.User.useUser.onAuthStateChanged', { user, savedUser });
      // // User is signed in, see docs for a list of available properties
      // // https://firebase.google.com/docs/reference/js/firebase.User
      if (user.uid != savedUser?.uid) {
        fetch('/api/user', {
          method: "GET"
        }).then(async (response: any) => {
          if (response.status != 200) {
            console.error(`Error fetching user ${user.uid}: ${response.status} (${response.statusText})`);
            // set({ loaded: true });
            return;
          }

          const updatedUser = await response.json();
          // console.log('>> hooks.User.useUser.onAuthStateChanged', { user, updatedUser });
          // user.customClaims = updatedUser.customClaims;
          setUser({ ...user, admin: updatedUser.customClaims?.admin });
        });

        setUser(user);
      }
    } else {
      // // User is signed out
      // console.log('>> hooks.User.useUser.onAuthStateChanged signed out', { savedUser });
      setUser(undefined);

      // when not signed in or logged out sign in anonymously
      // doSignInAnonymously(); // TODO UNCRIPPLE
    }
  };

  useEffect(() => {
    console.log('>> hooks.User.useUser.useEffect', { savedUser });
    doInit({ onAuthStateChanged });
  }, []);

  const signin = async (method: SigninMethod, params?: any) => {
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
            // user.customClaims = updatedUser.customClaims;
            setUser({ ...user, admin: updatedUser.customClaims?.admin });
            setIdToken(authToken);
            resolve(user);
          });
        }).catch((error) => {
          setUser(undefined);
          setIdToken(undefined);
          reject(error);
        });
    });
  };

  const logout = async () => {
    console.log(">> hooks.User.login");

    return new Promise((resolve, reject) => {
      doLogout().then(() => {
        if (savedUser) {
          setUser(undefined);
          setIdToken(undefined);
          fetch('/api/user', {
            method: "DELETE",
          }).then(() => resolve(true));
        }
      }).catch((error) => {
        setUser(undefined);
        reject(error);
      });
    });
  };

  return { user: savedUser, idToken, signin, logout };
}