// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5dU63VmK-ajrrLDW_dwn7PdQpWrlYkH4",
  authDomain: "goeverywhere-moda.firebaseapp.com",
  projectId: "goeverywhere-moda",
  storageBucket: "goeverywhere-moda.firebasestorage.app",
  messagingSenderId: "247127656713",
  appId: "1:247127656713:web:c1d21318325181c9556bd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();