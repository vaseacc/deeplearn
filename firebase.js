// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config from environment variables (Vercel injects them at build time)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function defaultState() {
  return {
    xp: 0,
    level: 0,
    totalSessions: 0,
    streak: 0,
    lastSessionDate: null,
    metrics: { focus: 0, memory: 0, stability: 0, endurance: 0, resistance: 0 },
    evolutionStage: 0,
    sessionHistory: [],
    forgeItems: []
  };
}

async function loadUserState(userId) {
  const docRef = doc(db, "users", userId);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return { ...defaultState(), ...snap.data() };
  }
  return defaultState();
}

async function saveUserState(userId, state) {
  const docRef = doc(db, "users", userId);
  await setDoc(docRef, state, { merge: true });
}

export { auth, db, defaultState, loadUserState, saveUserState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged };
