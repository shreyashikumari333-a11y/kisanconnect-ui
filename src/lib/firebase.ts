import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvCf6gLLULqvQUVGoTEeA16grmVUYPd4I",
  authDomain: "kisansetu-6d0bc.firebaseapp.com",
  projectId: "kisansetu-6d0bc",
  storageBucket: "kisansetu-6d0bc.firebasestorage.app",
  messagingSenderId: "978361116682",
  appId: "1:978361116682:web:f5c4486bef25fd218157f3",
  measurementId: "G-6BH3P0HW82"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);