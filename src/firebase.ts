import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "gen-lang-client-0341251218",
  appId: "1:939601148588:web:896112c437c5a665ba3d09",
  apiKey: "AIzaSyA7_11YBzHxrZrofqAvReTsGFbgJ5J0unw",
  authDomain: "gen-lang-client-0341251218.firebaseapp.com",
  storageBucket: "gen-lang-client-0341251218.firebasestorage.app",
  messagingSenderId: "939601148588"
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, { experimentalForceLongPolling: true }, ['a' + 'i', 'studio', '0a7f86b8-2fe5-4682-bcc8-8a467df76a70'].join('-'));
export const auth = getAuth(app);
