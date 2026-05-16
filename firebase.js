import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let app;
let auth;
let db;

async function fetchConfig() {
  const response = await fetch('/api/config');
  if (!response.ok) {
    throw new Error('Failed to load Firebase configuration');
  }
  return response.json();
}

const initPromise = (async () => {
  const config = await fetchConfig();
  app = initializeApp(config);
  auth = getAuth(app);
  db = getFirestore(app);
})();

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
  await initPromise;
  const docRef = doc(db, "users", userId);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return { ...defaultState(), ...snap.data() };
  }
  return defaultState();
}

async function saveUserState(userId, state) {
  await initPromise;
  const docRef = doc(db, "users", userId);
  await setDoc(docRef, state, { merge: true });
}

// Export auth and db as async getters so consumers can await them
function getAuthInstance() {
  return initPromise.then(() => auth);
}

function getDbInstance() {
  return initPromise.then(() => db);
}

export {
  getAuthInstance as auth,
  getDbInstance as db,
  defaultState,
  loadUserState,
  saveUserState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
