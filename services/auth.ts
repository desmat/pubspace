import { FirebaseApp } from "firebase/app";
import { Auth, User, signInWithPopup, GoogleAuthProvider, AuthProvider, signOut } from "firebase/auth";
import { firebaseConfig } from "@/firestore.config";
import { SigninMethod } from "@/types/SigninMethod";

export let app: FirebaseApp; 
export let auth: Auth;

export function init(callbacks?: any) {
  console.log("*** services.auth.init firebaseConfig:", firebaseConfig);

  const authStateChanged = callbacks?.onAuthStateChanged || function(user: User) {
    if (user) {
      // // User is signed in, see docs for a list of available properties
      // // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      console.log('onAuthStateChanged', { user });
    } else {
      // // User is signed out
      console.log('onAuthStateChanged signed out');
    }
  };

  // try to avoid warnings when running on server side
  import("firebase/app").then((firebaseApp) => {
    app = firebaseApp.initializeApp(firebaseConfig);
    import("firebase/auth").then((firebaseAuth) => {
      auth = firebaseAuth.getAuth();
      firebaseAuth.onAuthStateChanged(auth, authStateChanged);
    });
  });
}

export function signInAnonymously() {
  console.log("*** services.auth.signInAnonymously firebaseConfig:", firebaseConfig);

  return new Promise((resolve, reject) => {
    // try to avoid warnings when running on server side
    import("firebase/auth").then((firebaseAuth) => {
      firebaseAuth.signInAnonymously(auth).then((user) => {
        console.log('Signed in anonymously to firebase', user);
        resolve(user);
      }).catch((error) => {
        console.error('Error signing in anonymously to firebase', error);
        reject(error);
      })});
    });
}

export async function signin(method: SigninMethod, params?: any) {
  console.log("*** services.auth.login firebaseConfig:", firebaseConfig);

  if (method != "google") {
    throw `Signing method not supported: ${method}`;
  }

  const provider = new GoogleAuthProvider();

  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("*** services.auth.signin user:", user);
        resolve(user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("*** services.auth.signin error:", error);
        reject(error);
      });  
    });
}

export async function logout(callbacks?: any) {
  console.log("*** services.auth.logout firebaseConfig:", firebaseConfig);

  return new Promise((resolve, reject) => {
    signOut(auth)
      .then((params: any) => {
        console.log("*** services.auth.logout params:", params);
        resolve(true);
      }).catch((error) => {
        console.log("*** services.auth.logout error:", error);
        reject(error);
      })
  });
}
