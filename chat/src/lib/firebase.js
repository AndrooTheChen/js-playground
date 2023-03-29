// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebaseConfig from './config.json'

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app)
