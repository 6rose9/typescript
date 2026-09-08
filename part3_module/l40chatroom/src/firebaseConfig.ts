// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBKHr2usdQYMTYYkMqj9mtu-viIL14WRYY",
    authDomain: "typescript-chatroom-27447.firebaseapp.com",
    projectId: "typescript-chatroom-27447",
    storageBucket: "typescript-chatroom-27447.firebasestorage.app",
    messagingSenderId: "700970392478",
    appId: "1:700970392478:web:b5c88bfcd2d89f52a6148f",
    measurementId: "G-ERMCEEJ4PE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();

