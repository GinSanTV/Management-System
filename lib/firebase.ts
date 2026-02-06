
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase configuration.
 * The apiKey is now pulled from process.env.API_KEY to ensure a valid key is used 
 * instead of the placeholder that caused the authentication error.
 */
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "neonguard-cyber.firebaseapp.com",
  projectId: "neonguard-cyber",
  storageBucket: "neonguard-cyber.appspot.com",
  messagingSenderId: "999999999999",
  appId: "1:999999999999:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
