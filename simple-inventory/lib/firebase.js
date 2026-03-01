// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW3wrWIO3dGvjNvgEoJ7dGCov6xwBgexw",
  authDomain: "inventory-23fd2.firebaseapp.com",
  databaseURL: "https://inventory-23fd2-default-rtdb.firebaseio.com",
  projectId: "inventory-23fd2",
  storageBucket: "inventory-23fd2.firebasestorage.app",
  messagingSenderId: "57860150315",
  appId: "1:57860150315:web:c4b8a970ce978565cec66e",
  measurementId: "G-B7YJDXYVFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);