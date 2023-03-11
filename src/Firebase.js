import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmG3P-f890o7kTZcGQDYV3Hru2c8czhqE",
  authDomain: "realestateapp-546d8.firebaseapp.com",
  projectId: "realestateapp-546d8",
  storageBucket: "realestateapp-546d8.appspot.com",
  messagingSenderId: "782428999037",
  appId: "1:782428999037:web:190f9c5831dac3383a5014",
};

initializeApp(firebaseConfig);
export const db = getFirestore()
