// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getReactNativePersistence,initializeAuth} from "firebase/auth";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXUeLxYx0bDAESHOmPR3xNvsxF-GR-aeM",
  authDomain: "drive-smart-22b07.firebaseapp.com",
  projectId: "drive-smart-22b07",
  storageBucket: "drive-smart-22b07.appspot.com",
  messagingSenderId: "592461330239",
  appId: "1:592461330239:web:260ad6f2b057e86a24058a"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP,{
  persistence: getReactNativePersistence(AsyncStorage)
});



// Firestore database
export const db = getFirestore(FIREBASE_APP);
