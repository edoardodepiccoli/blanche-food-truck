// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcjoU0qsp7iVXFy39_oS72jxtR0xCGxck",
    authDomain: "blanche-food-truck.firebaseapp.com",
    projectId: "blanche-food-truck",
    storageBucket: "blanche-food-truck.firebasestorage.app",
    messagingSenderId: "729166571429",
    appId: "1:729166571429:web:8ebc71b605c5ae00d66a4c",
    measurementId: "G-EHJ3K3JD29"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);