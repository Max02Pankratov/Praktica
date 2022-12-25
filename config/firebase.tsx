import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAezjY6kYskj5G3bCXGoxtA046yX-agLlY",
  authDomain: "test-next-f61bc.firebaseapp.com",
  projectId: "test-next-f61bc",
  storageBucket: "test-next-f61bc.appspot.com",
  messagingSenderId: "642600366205",
  appId: "1:642600366205:web:8a9439f27732527e89c114"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()