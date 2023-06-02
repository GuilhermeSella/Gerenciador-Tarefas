// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVRuLek8rTaXFLPbcWVSrSpG-DUOeYgoA",
  authDomain: "curso-react-3b844.firebaseapp.com",
  projectId: "curso-react-3b844",
  storageBucket: "curso-react-3b844.appspot.com",
  messagingSenderId: "1044955087055",
  appId: "1:1044955087055:web:ac8c292bc8bf8c1b1437ba",
  measurementId: "G-T7XJN73C9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export { db, auth }