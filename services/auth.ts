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

// Initialize Firebase
export let app; // = initializeApp(firebaseConfig)
// export const db = firestore.getFirestore()
export let auth;

export function doAuth() {
  console.log("*** services.auth.doAuth");
  import("firebase/app").then((firebaseApp) => {
    app = firebaseApp.initializeApp(firebaseConfig);
    import("firebase/auth").then((firebaseAuth) => {
      auth = firebaseAuth.getAuth();

      firebaseAuth.onAuthStateChanged(auth, (user) => {
        if (user) {
          // // User is signed in, see docs for a list of available properties
          // // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid
          console.log('onAuthStateChanged', { uid: user.uid })
        } else {
          // // User is signed out
          console.log('onAuthStateChanged signed out')
        }
      })
  
      firebaseAuth.signInAnonymously(auth)
        .then(() => {
          // // Signed in..
          console.log('Signed in anonymously to firebase auth')
        })
        .catch((error) => {
          console.error('Firestore signing error', { error })
        });
    });
  });
}