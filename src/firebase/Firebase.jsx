import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
    
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_KEY,
  authDomain: "e-commerce-7e748.firebaseapp.com",
  projectId: "e-commerce-7e748",
  storageBucket: "e-commerce-7e748.appspot.com",
  messagingSenderId: "1028654130054",
  appId: "1:1028654130054:web:7cc9c35581f07eb3724207"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb=getFirestore(app);
const auth=getAuth(app);

export {fireDb,auth};