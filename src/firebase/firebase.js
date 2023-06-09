
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from './firebaseConfig';
export const initializeFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  //const auth = getAuth(app);
  return { db };
}