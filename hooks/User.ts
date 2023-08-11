import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth, init } from "@/services/auth";

export default function useUser() {
    const [user, setUser] = useState<User | undefined>();

    const onAuthStateChanged = function (user: User) {
        if (user) {
            // // User is signed in, see docs for a list of available properties
            // // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid
            console.log('>> hooks.User.useUser.onAuthStateChanged', { uid: user.uid });
            setUser(user);
        } else {
            // // User is signed out
            console.log('>> hooks.User.useUser.onAuthStateChanged signed out');
            setUser(undefined);
        }
    };

    const onSignInAnonymously = function (...params: any) {
        // // Signed in..
        console.log('>> hooks.User.useUser: Signed in anonymously to firebase auth params:', params);
    };

    const onSignInAnonymouslyError = function (error: any) {
        console.error('>> hooks.User.useUser.: Firestore signing error', { error })
    };

    useEffect(() => {
        init({ onAuthStateChanged, onSignInAnonymously, onSignInAnonymouslyError });
    }, []);

    return user;
}