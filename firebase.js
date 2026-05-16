// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔴 REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Default empty state (same as your current defaultState)
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

// Load user state from Firestore
async function loadUserState(userId) {
  const docRef = doc(db, "users", userId);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return { ...defaultState(), ...snap.data() };
  }
  return defaultState();
}

// Save user state to Firestore
async function saveUserState(userId, state) {
  const docRef = doc(db, "users", userId);
  await setDoc(docRef, state, { merge: true });
}

export { auth, db, defaultState, loadUserState, saveUserState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged };
