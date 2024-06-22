
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCK5mmI2fA1AYDtO588ltWTh6Xb1ImRLvs",
  authDomain: "qubix-346a4.firebaseapp.com",
  projectId: "qubix-346a4",
  storageBucket: "qubix-346a4.appspot.com",
  messagingSenderId: "668777642106",
  appId: "1:668777642106:web:b3ce46712267de006d23c3",
  measurementId: "G-LL8LP8F2M1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
