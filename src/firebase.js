// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAywjRxvOlGiUj5ldIi7u3bs-PkVpKMMcg",
  authDomain: "beautycare-7b443.firebaseapp.com",
  projectId: "beautycare-7b443",
  storageBucket: "beautycare-7b443.appspot.com", // corrected `.app` to `.appspot.com`
  messagingSenderId: "556385733295",
  appId: "1:556385733295:web:912a5b30ad7e927cb2225a"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// ✅ Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const Storage = getStorage(app);