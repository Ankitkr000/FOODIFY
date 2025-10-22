// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"   // ADDED✅
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "foodify-79c5c.firebaseapp.com",
  projectId: "foodify-79c5c",
  storageBucket: "foodify-79c5c.firebasestorage.app",
  messagingSenderId: "694611632959",
  appId: "1:694611632959:web:907a46efe55e9b8d2be98a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app) //ADDDED ✅


// module.exports={app,auth}
export {app,auth}

