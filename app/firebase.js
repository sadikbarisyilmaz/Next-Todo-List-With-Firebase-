// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS3FOeRg5SQAWiEMSo8AmLZM8OofU9U-0",
  authDomain: "todo-list-7f34e.firebaseapp.com",
  projectId: "todo-list-7f34e",
  storageBucket: "todo-list-7f34e.appspot.com",
  messagingSenderId: "54775648214",
  appId: "1:54775648214:web:a2eabc354ef0e724379e77",
  measurementId: "G-V6NDJYDBCH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
