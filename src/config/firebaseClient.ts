// import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_SECRET_KEY_FIREBASE_API_KEY,
    authDomain: process.env.API_SECRET_KEY_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.API_SECRET_KEY_FIREBASE_PROJECT_ID,
    storageBucket: process.env.API_SECRET_KEY_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.API_SECRET_KEY_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.API_SECRET_KEY_FIREBASE_APP_ID,
};


export const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);
export const db = getFirestore(app);