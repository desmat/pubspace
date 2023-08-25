import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { init as doInit, logout as doLogout, signin as doSignin, signInAnonymously as doSignInAnonymously } from "@/services/auth";
import { SigninMethod } from "@/types/SigninMethod";

export default function useUser() {
    const [user, setUser] = useState<User | undefined>();

    const onAuthStateChanged = function (user: User) {
        if (user) {
            // // User is signed in, see docs for a list of available properties
            // // https://firebase.google.com/docs/reference/js/firebase.User
            // const uid = user.uid
            console.log('>> hooks.User.useUser.onAuthStateChanged', { user });
            setUser(user);
        } else {
            // // User is signed out
            console.log('>> hooks.User.useUser.onAuthStateChanged signed out');
            setUser(undefined);
            // when not signed in or logged out sign in anonymously
            doSignInAnonymously();
        }
    };

    useEffect(() => {
        console.log('>> hooks.User.useUser.useEffect', { user });
        doInit({ onAuthStateChanged });
    }, []);

    const signin = async (method: SigninMethod, params?: any) => {
        console.log(">> hooks.User.signin", { method, params });
        
        if (method == "anonymous") {
            return new Promise((resolve, reject) => {
                doSignInAnonymously().then((user) => {
                    setUser(user as User);
                    resolve(user);
                }).catch((error) => {
                    setUser(undefined);
                    reject(error);
                });                
            });
        } else {
            return new Promise((resolve, reject) => {
                doSignin(method).then((user) => {
                    setUser(user as User);
                    resolve(user);
                }).catch((error) => {
                    setUser(undefined);
                    reject(error);
                });                
            });
        }
    };

    const logout = async () => {
        console.log(">> hooks.User.login");

        return new Promise((resolve, reject) => {
            doLogout().then(() => {
                setUser(undefined);
                resolve(true);
            }).catch((error) => {
                setUser(undefined);
                reject(error);
            });
        });
    };

    return { user, signin, logout };
}