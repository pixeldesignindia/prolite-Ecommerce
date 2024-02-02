import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB4zug8bcgWSK-x5eKKtOM7pnJdq3zAaDY",
    authDomain: "pixel-ecommerce-34ff9.firebaseapp.com",
    projectId: "pixel-ecommerce-34ff9",
    storageBucket: "pixel-ecommerce-34ff9.appspot.com",
    messagingSenderId: "59452393509",
    appId: "1:59452393509:web:a25c56d2579384027ed7cc"
};

// const firebaseConfig = {
//   apiKey:import.meta.env.VITE_FIREBASE_KEY,
// authDomain:import.meta.env.VITE_DOMAIN ,
//   projectId:import.meta.env.VITE_PROJECT_ID,
//   storageBucket:import.meta.env.VITE_BUCKET,
//   messagingSenderId:import.meta.env.VITE_MESSAGE_ID,
//   appId: import.meta.env.VITE_APP_ID
// };

export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)