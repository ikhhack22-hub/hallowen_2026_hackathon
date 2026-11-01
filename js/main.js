// Navbar: transparent at the top of the page, blurred background once scrolled
const nav = document.querySelector('.hero-nav');

function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Scroll reveal: gently fade story blocks in as they enter the viewport.
// Elements are only hidden via CSS when the 'js' class is present (set in
// <head>), and reduced-motion users always see content immediately.
const revealTargets = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!('IntersectionObserver' in window) || prefersReducedMotion) {
  revealTargets.forEach((el) => el.classList.add('revealed'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

// ===================== Trials =====================
// Trials unlock one after another: II opens once I is completed,
// III once II is completed. Progress lives in localStorage.
const TRIALS_STORAGE_KEY = 'witchcraft.trials.completed';
const TRIAL_ROMAN = { 1: 'I', 2: 'II', 3: 'III' };

function getCompletedTrials() {
  try {
    const stored = JSON.parse(localStorage.getItem(TRIALS_STORAGE_KEY) || '[]');
    return Array.isArray(stored) ? stored.map(Number) : [];
  } catch (error) {
    return [];
  }
}

function renderTrialStates() {
  const completed = getCompletedTrials();

  document.querySelectorAll('[data-trial]').forEach((card) => {
    const id = Number(card.dataset.trial);
    const status = card.querySelector('[data-trial-status]');
    const action = card.querySelector('[data-trial-action]');
    const hint = card.querySelector('[data-trial-hint]');
    const isComplete = completed.includes(id);
    const isUnlocked = id === 1 || completed.includes(id - 1);

    card.classList.toggle('is-complete', isComplete);
    card.classList.toggle('is-locked', !isComplete && !isUnlocked);

    // Reset button classes before applying the state's variant
    action.classList.remove('disabled', 'btn-gold', 'btn-outline-light');
    action.removeAttribute('aria-disabled');

    if (isComplete) {
      status.textContent = '\u2713 Completed';
      action.textContent = 'Review Trial';
      action.classList.add('btn-outline-light');
      hint.textContent = 'One step closer to the Eternal Spell.';
    } else if (isUnlocked) {
      status.textContent = 'Open';
      action.textContent = 'Begin Trial';
      action.classList.add('btn-gold');
      hint.textContent = 'Your trial awaits.';
    } else {
      status.textContent = 'Locked';
      action.textContent = 'Locked';
      action.classList.add('btn-gold', 'disabled');
      action.setAttribute('aria-disabled', 'true');
      hint.textContent = 'Complete Trial ' + TRIAL_ROMAN[id - 1] + ' to unlock.';
    }
  });
}

// Locked buttons stay inert even for keyboard navigation
document.addEventListener('click', (event) => {
  const action = event.target.closest('[data-trial-action]');
  if (action && action.closest('[data-trial]')?.classList.contains('is-locked')) {
    event.preventDefault();
  }
});

const resetTrialsBtn = document.getElementById('resetTrials');
if (resetTrialsBtn) {
  resetTrialsBtn.addEventListener('click', () => {
    localStorage.removeItem(TRIALS_STORAGE_KEY);
    renderTrialStates();
  });
}

renderTrialStates();
