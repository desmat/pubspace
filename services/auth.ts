import { FirebaseApp } from "firebase/app";
import { Auth, User } from "firebase/auth";

const firebaseConfig = {
    // apiKey: process.env.FIREBASE_API_KEY,
    // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.FIREBASE_PROJECT_ID,
    // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.FIREBASE_APP_ID,
    apiKey: "AIzaSyCfoZFKKOaxF-c0qZQCXrJSzHLe5nAmkBE",
    authDomain: "test-firestore-desmat-ca.firebaseapp.com",
    projectId: "test-firestore-desmat-ca",
    storageBucket: "test-firestore-desmat-ca.appspot.com",
    messagingSenderId: "279126390661",
    appId: "1:279126390661:web:f42dd60f352501985876ec"    
};

export let app: FirebaseApp; 
export let auth: Auth;

export function init(callbacks?: any) {
  console.log("*** services.auth.init callbacks:", callbacks);

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
  
      firebaseAuth.signInAnonymously(auth)
        .then(onSignInAnonymously)
        .catch(onSignInAnonymouslyError);
    });
  });
}