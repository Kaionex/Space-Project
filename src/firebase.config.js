// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER,
  appId: import.meta.env.VITE_APP_ID,
  VITE_WEB_CLIENT_ID: import.meta.env.VITE_WEB_CLIENT_ID,
  VITE_WEB_CLIENT_SECRET: import.meta.env.VITE_WEB_CLIENT_SECRET,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
// const provider = new GoogleAuthProvider();
// provider.setCustomParameters({
//   prompt: 'select_account'
// });



export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
// export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
