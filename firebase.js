// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseSignUp,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let app;
let auth;
let db;
let initPromise;

async function fetchConfig() {
  const res = await fetch('/api/config');
  if (!res.ok) throw new Error('Failed to load Firebase config');
  return res.json();
}

async function initFirebase() {
  if (!initPromise) {
    initPromise = (async () => {
      const config = await fetchConfig();
      app = initializeApp(config);
      auth = getAuth(app);
      db = getFirestore(app);
    })();
  }
  await initPromise;
}

// ── Auth wrappers (ensure Firebase is initialised before use) ──
async function onAuthStateChanged(callback) {
  await initFirebase();
  return firebaseOnAuthStateChanged(auth, callback);
}

async function signInWithEmailAndPassword(email, password) {
  await initFirebase();
  return firebaseSignIn(auth, email, password);
}

async function createUserWithEmailAndPassword(email, password) {
  await initFirebase();
  return firebaseSignUp(auth, email, password);
}

async function signOut() {
  await initFirebase();
  return firebaseSignOut(auth);
}

// Google sign‑in uses the imported provider class directly
async function signInWithGoogle() {
  await initFirebase();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

// ── Firestore helpers ──
function defaultState() {
  return {
    xp: 0,
    level: 0,
    totalSessions: 0,
    streak: 0,
    lastSessionDate: null,
    focusXP: 0,
    memoryXP: 0,
    stabilityXP: 0,
    enduranceXP: 0,
    resistanceXP: 0,
    metrics: { focus: 0, memory: 0, stability: 0, endurance: 0, resistance: 0 },
    evolutionStage: 0,
    sessionHistory: [],
    forgeItems: []
  };
}

async function loadUserState(userId) {
  await initFirebase();
  const docRef = doc(db, "users", userId);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const data = snap.data();
    // Ensure domain XP fields exist for backward compatibility
    return { 
      ...defaultState(), 
      ...data,
      focusXP: data.focusXP || 0,
      memoryXP: data.memoryXP || 0,
      stabilityXP: data.stabilityXP || 0,
      enduranceXP: data.enduranceXP || 0,
      resistanceXP: data.resistanceXP || 0
    };
  }
  return defaultState();
}

async function saveUserState(userId, state) {
  await initFirebase();
  const docRef = doc(db, "users", userId);
  await setDoc(docRef, state, { merge: true });
}

export {
  // Auth functions
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,       // class for creating providers (if needed elsewhere)
  signInWithPopup,         // generic popup function (if needed elsewhere)
  signInWithGoogle,        // convenient Google sign‑in helper
  // Firestore helpers
  defaultState,
  loadUserState,
  saveUserState
};
