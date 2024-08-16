// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Define the Firebase configuration object
const firebaseConfig = {
  // apiKey: "AIzaSyDqsHsOtK0QSM4t3Hb08UPh2NBOwBB8YtM",
  // authDomain: "fir-blog-d0dcf.firebaseapp.com",
  // projectId: "fir-blog-d0dcf",
  // storageBucket: "fir-blog-d0dcf.appspot.com",
  // messagingSenderId: "23430314381",
  // appId: "1:23430314381:web:ebc4cf5b2e8c7ec75a65c4",
  // measurementId: "G-2KCT6X0X3G",

  apiKey: "AIzaSyAJH1hzBbYyHmo3mLg1UnxsJyQdgBq25_I",
  authDomain: "chatter-9b2b4.firebaseapp.com",
  projectId: "chatter-9b2b4",
  storageBucket: "chatter-9b2b4.appspot.com",
  messagingSenderId: "1085860566139",
  appId: "1:1085860566139:web:735bbb0278e97d34f37ede",
  measurementId: "G-ZL8F6B2B41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
