// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getReactNativePersistence,initializeAuth} from "firebase/auth";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Add your own key",
  authDomain: "Add your own",
  projectId: "drive-smart-22b07",
  storageBucket: "Add your own",
  messagingSenderId: "Add your own",
  appId: "Add your own"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP,{
  persistence: getReactNativePersistence(AsyncStorage)
});



// Firestore database
export const db = getFirestore(FIREBASE_APP);
