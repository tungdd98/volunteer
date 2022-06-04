// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcgDjittcp75s84KuCupMCJ8TBM70pGno",
  authDomain: "volunteer-305007.firebaseapp.com",
  projectId: "volunteer-305007",
  storageBucket: "volunteer-305007.appspot.com",
  messagingSenderId: "637986262445",
  appId: "1:637986262445:web:9325c5619b98c18efbe524",
  measurementId: "G-58Z79MQ4M5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
