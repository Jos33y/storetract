// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from  'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsIQtQFLbwTHYQ0or9Xh3BcSFfo5jTl18",
    authDomain: "packshop-packnow.firebaseapp.com",
    projectId: "packshop-packnow",
    storageBucket: "packshop-packnow.appspot.com",
    messagingSenderId: "579164028292",
    appId: "1:579164028292:web:ac2c332adc371e709771d1",
    measurementId: "G-L1XFL8Z85Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
// const analytics = getAnalytics(app);
