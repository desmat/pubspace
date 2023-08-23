import { FirebaseApp } from "firebase/app";
import { Auth, User, getAuth, signInWithPopup, GoogleAuthProvider, AuthProvider, signOut } from "firebase/auth";
import { firebaseConfig } from "@/firestore.config";

export let app: FirebaseApp; 
export let auth: Auth;

export function init(callbacks?: any) {
  console.log("*** services.auth.init firebaseConfig:", firebaseConfig);

  const authStateChanged = callbacks?.onAuthStateChanged || function(user: User) {
    if (user) {
      // // User is signed in, see docs for a list of available properties
      // // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid
      console.log('onAuthStateChanged', { uid: user.uid })
    } else {
      // // User is signed out
      console.log('onAuthStateChanged signed out')
    }
  };

  const onSignInAnonymously = callbacks?.onSignInAnonymously || function(...params:any) {
    // // Signed in..
    console.log('Signed in anonymously to firebase auth params:', params);
  };

  const onSignInAnonymouslyError = callbacks?.onSignInAnonymouslyError || function(error: any) {
    console.error('Firestore signing error', { error })
  };

  import("firebase/app").then((firebaseApp) => {
    app = firebaseApp.initializeApp(firebaseConfig);
    import("firebase/auth").then((firebaseAuth) => {
      auth = firebaseAuth.getAuth();

      firebaseAuth.onAuthStateChanged(auth, authStateChanged);
  
      // firebaseAuth.signInAnonymously(auth)
      //   .then(onSignInAnonymously)
        // .catch(onSignInAnonymouslyError);
    });
  });
}

export function signInAnonymously(callbacks?: any) {
  console.log("*** services.auth.signInAnonymously firebaseConfig:", firebaseConfig);

  const onSignInAnonymously = callbacks?.onSignInAnonymously || function(...params:any) {
    // // Signed in..
    console.log('Signed in anonymously to firebase auth params:', params);
  };

  const onSignInAnonymouslyError = callbacks?.onSignInAnonymouslyError || function(error: any) {
    console.error('Firestore signing error', { error })
  };

  import("firebase/auth").then((firebaseAuth) => {
  firebaseAuth.signInAnonymously(auth)
    .then(onSignInAnonymously)
    .catch(onSignInAnonymouslyError);
  });
}

export function login(callbacks?: any) {
  console.log("*** services.auth.login firebaseConfig:", firebaseConfig);

  const onLogin = callbacks?.onLogin || function(...params:any) {
    console.log('Logged in to firebase auth params:', params);
  };

  const onLoginError = callbacks?.onLoginError || function(error: any) {
    console.error('Firestore loggin error', { error })
  };

  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log("*** services.auth.login user:", user);
      onLogin(user);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log("*** services.auth.login error:", error);
      onLoginError(error);
    });  
}

export function logout(callbacks?: any) {
  console.log("*** services.auth.logout firebaseConfig:", firebaseConfig);

  const onLogout = callbacks?.onLogout || function(...params:any) {
    console.log('Logged out from firebase auth params:', params);
  };

  const onLogoutError = callbacks?.onLogoutError || function(error: any) {
    console.error('Firestore logout error', { error })
  };

  signOut(auth)
    .then((params: any) => {
      console.log("*** services.auth.logout params:", params);
      onLogout();
    }).catch((error) => {
      console.log("*** services.auth.logout error:", error);
      onLogoutError();
    });
}
