// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {derived, writable, type Readable} from 'svelte/store'

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
// export const analytics = getAnalytics(app); // prob need to enable analytics in firebase console if i want this
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

/*
 * @returns a store with the current firebase user.
 */
function userStore() {
  // this is just a function that is used to unsubscribe from the onAuthStateChanged listener.
  // it doesn't take any args and doesn't return anything. 
  let unsubscribe: () => void;


  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    }
  }

  // This creates a writable store in Svelte. The first argument is the default value which in our case
  // here is the currently loged in user (if any, otherwise null).
  // The second argument of the writable function is a callback function that is executed when a 
  // subscriber subscribes to the store. Inside this callback function, it calls the onAuthStateChanged 
  // function with auth and a callback function as arguments.
  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    // unsubscribe from the Auth state when the store is no longer in use.
    return () => unsubscribe();
  });

  return {
    subscribe,
  }
}

// Let this store be used by anywhere else in our application
export const user = userStore();

// NOT USED
// this is just an example of how we can quickly prototypoe logging in without good safeguards.
// const currentUser = writable<User | null>(null);
// onAuthStateChanged(auth, (user) => {
//   currentUser.set(user);
// });

/**
 * @param  {string} path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(
  path: string,
) {
  let unsubscribe: () => void;

  const docRef = doc(db, path);

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}

// Use this derived store to automatically sub to both user's auth state and Firestore data at the
// same time.
interface UserData {
  username: string;
  bio: string;
  photoURL: string;
  links: any[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => { 
  if ($user) {
    return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
  } else {
    set(null); 
  }
});  