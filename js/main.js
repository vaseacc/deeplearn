// ========== GAMIFICATION & PERSISTENCE ==========

const STORAGE_KEYS = {
  XP: 'lucid_xp',
  LEVEL: 'lucid_level',
  ACHIEVEMENTS: 'lucid_achievements',
  STUDY_SESSIONS: 'lucid_study_sessions',
  SPACED_REPETITION: 'lucid_spaced_repetition',
  OVERSTIMULATION_LOG: 'lucid_overstimulation',
  FOCUS_LEVEL: 'lucid_focus_level',
  ATTENTION_STREAK: 'lucid_attention_streak',
  BRAIN_FOG_HISTORY: 'lucid_brain_fog'
};

// XP thresholds
const XP_PER_LEVEL = 100;
function getCurrentXP() { return parseInt(localStorage.getItem(STORAGE_KEYS.XP) || '0'); }
function getCurrentLevel() { return parseInt(localStorage.getItem(STORAGE_KEYS.LEVEL) || '1'); }

function addXP(amount) {
  let xp = getCurrentXP() + amount;
  let level = getCurrentLevel();
  let leveledUp = false;
  while (xp >= XP_PER_LEVEL) {
    xp -= XP_PER_LEVEL;
    level++;
    leveledUp = true;
  }
  localStorage.setItem(STORAGE_KEYS.XP, xp);
  localStorage.setItem(STORAGE_KEYS.LEVEL, level);
  if (leveledUp) {
    showNotification(`🎉 Level ${level} unlocked!`, 'success');
  }
  updateXPDisplay();
}

function updateXPDisplay() {
  const xpElem = document.getElementById('xpValue');
  const levelElem = document.getElementById('levelValue');
  const xpFill = document.getElementById('xpFill');
  if (xpElem) xpElem.innerText = getCurrentXP();
  if (levelElem) levelElem.innerText = getCurrentLevel();
  if (xpFill) {
    const percent = (getCurrentXP() / XP_PER_LEVEL) * 100;
    xpFill.style.width = percent + '%';
  }
}

// Achievements
const ACHIEVEMENTS_LIST = {
  first_focus: { name: 'First Focus', desc: 'Complete your first focus session', unlocked: false },
  streak_7: { name: 'Week Warrior', desc: '7 day streak', unlocked: false },
  streak_30: { name: 'Zen Master', desc: '30 day streak', unlocked: false },
  study_10: { name: 'Active Learner', desc: '10 study sessions', unlocked: false },
  distraction_free: { name: 'Laser Mind', desc: 'Session with 0 distractions', unlocked: false }
};
function loadAchievements() {
  const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
  if (saved) return JSON.parse(saved);
  return { ...ACHIEVEMENTS_LIST };
}
function unlockAchievement(key) {
  const ach = loadAchievements();
  if (!ach[key].unlocked) {
    ach[key].unlocked = true;
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(ach));
    showNotification(`🏆 Achievement: ${ach[key].name}`, 'success');
    addXP(20);
  }
}

// Helper: show a non-intrusive toast
function showNotification(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerText = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.backgroundColor = type === 'success' ? 'var(--success)' : 'var(--accent-primary)';
  toast.style.color = 'white';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = 'var(--radius-full)';
  toast.style.zIndex = '9999';
  toast.style.fontSize = '0.875rem';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Text-to-speech (Focus assistance)
function speakText(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// Low-stimulation mode toggle (add to settings)
function setLowStimulation(enabled) {
  if (enabled) document.body.classList.add('low-stimulation');
  else document.body.classList.remove('low-stimulation');
  localStorage.setItem('lucid_low_stimulation', enabled);
}

// Load settings on page
document.addEventListener('DOMContentLoaded', () => {
  updateXPDisplay();
  const lowStim = localStorage.getItem('lucid_low_stimulation') === 'true';
  if (lowStim) document.body.classList.add('low-stimulation');
});
