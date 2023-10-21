// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAej51U-FWdYIUhXcC2r_oIAMb2Urlr4FM",
    authDomain: "ipro-dev-fa980.firebaseapp.com",
    projectId: "ipro-dev-fa980",
    storageBucket: "ipro-dev-fa980.appspot.com",
    messagingSenderId: "453469097960",
    appId: "1:453469097960:web:10d81470dfb1b919fb1e5d",
    measurementId: "G-YLLRNFY9QG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, provider, app, db}