// Tu configuración de Firebase

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZaumGj3MGz31JUR62dQI5wNTCgKJsp0o",
  authDomain: "repositorio-puesto-de-salud.firebaseapp.com",
  projectId: "repositorio-puesto-de-salud",
  storageBucket: "repositorio-puesto-de-salud.appspot.com",
  messagingSenderId: "902352272355",
  appId: "1:902352272355:web:4a1626577509a1f4f8fed6",
  measurementId: "G-BDFFB094NE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Exporta `app` en lugar de `appFirebase`
export default app;
