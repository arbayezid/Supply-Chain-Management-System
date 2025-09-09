// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoR2KBpZTG5LaCnCsTtDR9ax_0atIwNkk",
  authDomain: "supply-chain-management-1b470.firebaseapp.com",
  projectId: "supply-chain-management-1b470",
  storageBucket: "supply-chain-management-1b470.firebasestorage.app",
  messagingSenderId: "335847858616",
  appId: "1:335847858616:web:33c2de899e96b492c06f4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Authentication export
