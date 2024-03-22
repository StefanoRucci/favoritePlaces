import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCyqnGYQijF8Y4qWwTKtlfueKlomirWnSs",
  authDomain: "mobileapplication-aaa97.firebaseapp.com",
  databaseURL: "https://mobileapplication-aaa97-default-rtdb.firebaseio.com",
  projectId: "mobileapplication-aaa97",
  storageBucket: "mobileapplication-aaa97.appspot.com",
  messagingSenderId: "16103210011",
  appId: "1:16103210011:web:647c8387d1b90ec71b0cbe",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
