import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { init as doInit, signInAnonymously as doSignInAnonymously, login as doLogin, logout as doLogout } from "@/services/auth";

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
            signInAnonymously();

        }
    };

    const onSignInAnonymously = function (params: any) {
        // // Signed in..
        console.log('>> hooks.User.useUser: Signed in anonymously to firebase auth params:', params.user);

        setUser(params.user);
    };

    const onSignInAnonymouslyError = function (error: any) {
        console.error('>> hooks.User.useUser: Firestore signing error', { error })
        setUser(undefined);
    };

    useEffect(() => {
        console.log('>> hooks.User.useUser.useEffect', { user });
        doInit({ onAuthStateChanged, onSignInAnonymously, onSignInAnonymouslyError });
    }, []);

    const init = function() {
        console.log(">> hooks.User.init");

        doInit({ onAuthStateChanged, onSignInAnonymously, onSignInAnonymouslyError });
    }

    const signInAnonymously = function() {
        console.log(">> hooks.User.signInAnonymously");

        doSignInAnonymously({ onSignInAnonymously, onSignInAnonymouslyError })
    }

    const login = () => {
        console.log(">> hooks.User.login");

        const onLogin = (user: User) => {
            setUser(user);
        }

        doLogin({ onLogin });
    };

    const logout = () => {
        console.log(">> hooks.User.login");

        const onLogout = () => {
            setUser(undefined);
        }

        doLogout({ onLogout });
    };

    return { user, init, signInAnonymously, login, logout };
}