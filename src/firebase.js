// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, getfirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt9kcxOndail85gE-glcxiVjTwA0YklnU",
  authDomain: "myreact-firebase-1b78f.firebaseapp.com",
  projectId: "myreact-firebase-1b78f",
  storageBucket: "myreact-firebase-1b78f.appspot.com",
  messagingSenderId: "709833214592",
  appId: "1:709833214592:web:bdbf3f74f009c3cbddb465",
  measurementId: "G-TLB0QP57WP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()

 
