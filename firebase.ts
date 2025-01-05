import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXj6a9ffQ17DlDwqXhF_vREwsI_kneZPM",
  authDomain: "ainotion-b19b3.firebaseapp.com",
  projectId: "ainotion-b19b3",
  storageBucket: "ainotion-b19b3.firebasestorage.app",
  messagingSenderId: "864061907263",
  appId: "1:864061907263:web:a694696b2804cd207fb38a",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
