import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoXXkNx77dw6r4bpSPromGJHzVRKVhmR0",
  authDomain: "gymothy-4f5b1.firebaseapp.com",
  projectId: "gymothy-4f5b1",
  storageBucket: "gymothy-4f5b1.appspot.com",
  messagingSenderId: "207885002428",
  appId: "1:207885002428:web:393456efd615effc55d2b9",
  measurementId: "G-JQ9TQVF0N7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
