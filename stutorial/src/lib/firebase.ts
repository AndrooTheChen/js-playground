// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFW3FO1u-1__RTh-MJTamYmD33bQRyupk",
  authDomain: "stutorial.firebaseapp.com",
  projectId: "stutorial",
  storageBucket: "stutorial.appspot.com",
  messagingSenderId: "310314507217",
  appId: "1:310314507217:web:c55a0b58acac029b6a1ef0",
  measurementId: "G-SZW4KS0DJJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();