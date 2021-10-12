// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2NDzKAwvynRPgpALaigLmXMwjzmgi2xM",
  authDomain: "instagram-nextjs-recoil.firebaseapp.com",
  projectId: "instagram-nextjs-recoil",
  storageBucket: "instagram-nextjs-recoil.appspot.com",
  messagingSenderId: "288269685148",
  appId: "1:288269685148:web:59170b2b645552dcaab859",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export { app, db, storage };
