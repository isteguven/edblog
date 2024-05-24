// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "esasdurus-39498.firebaseapp.com",
  projectId: "esasdurus-39498",
  storageBucket: "esasdurus-39498.appspot.com",
  messagingSenderId: "298693567347",
  appId: "1:298693567347:web:34a35725fcfe8d0dbd1b06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);