// Trial pages — Trial I (The Lost Ingredients) is the coded challenge page;
// Trial II (The Potion Factory) and Trial III (Protect the Grimoire) are build
// briefs that unlock in order. A trial that is still locked, or that has not
// been reached yet, falls back to a sealed-chapter panel. Marking a trial
// complete saves progress so the Trials section on the main page unlocks the
// next card.
const TRIALS_STORAGE_KEY = 'witchcraft.trials.completed';
const RECOVERED_KEY = 'witchcraft.trial1.ingredients';

const TRIALS = {
  1: { roman: 'I', title: 'The Lost Ingredients' },
  2: { roman: 'II', title: 'The Potion Factory' },
  3: { roman: 'III', title: 'Protect the Grimoire' }
};

const CHALLENGES = window.CHALLENGES || {};

function readStoredNumbers(key) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(stored) ? stored.map(Number) : [];
  } catch (error) {
    return [];
  }
}

function getCompletedTrials() {
  return readStoredNumbers(TRIALS_STORAGE_KEY);
}

function getRecoveredIngredients() {
  return readStoredNumbers(RECOVERED_KEY);
}

function saveRecoveredIngredients(list) {
  try {
    localStorage.setItem(RECOVERED_KEY, JSON.stringify(list));
  } catch (error) {
    /* storage unavailable — progress simply will not persist */
  }
}

const storyView = document.getElementById('trialStory');
const sealedPanel = document.getElementById('sealedPanel');
const trialTwoView = document.getElementById('trialTwo');
const trialThreeView = document.getElementById('trialThree');
const sealedLabel = document.getElementById('sealedLabel');
const sealedTitle = document.getElementById('sealedTitle');
const sealedText = document.getElementById('sealedText');
const sealedNote = document.getElementById('sealedNote');
const trialHint = document.getElementById('trialHint');
const completeButtons = document.querySelectorAll('[data-complete-trial]');

const requestedRaw = new URLSearchParams(window.location.search).get('id');
const requestedId = requestedRaw === null || requestedRaw === '' ? 1 : Number(requestedRaw);
const id = TRIALS[requestedId] ? requestedId : 1;
const completed = getCompletedTrials();

function markCompleteButtonsAsDone() {
  completeButtons.forEach((button) => {
    button.textContent = '\u2713 Trial Completed';
    button.classList.add('disabled');
    button.setAttribute('aria-disabled', 'true');
    button.disabled = true;
  });
}

function showSealedPanel(label, title, text, note, showComplete) {
  storyView.classList.add('d-none');
  sealedPanel.classList.remove('d-none');
  sealedLabel.textContent = label;
  sealedTitle.textContent = title;
  sealedText.textContent = text;
  sealedNote.textContent = note;

  if (!showComplete) {
    completeButtons.forEach((button) => button.classList.add('d-none'));
  }
}

if (!TRIALS[requestedId]) {
  // Unknown trial id: send the seeker back
  document.title = 'The Mists Swirl — WITCHCRAFT';
  showSealedPanel(
    'The Mists Swirl',
    'No Such Trial Exists',
    'Whichever path led you here, it was not one of Morgana\u2019s three trials. ' +
      'Return to the tower and choose a trial from the scrolls.',
    '',
    false
  );
} else if (id === 1) {
  // Trial I — the story page itself
  if (completed.includes(1)) {
    markCompleteButtonsAsDone();
  }
} else if (id === 2) {
  // Trial II — The Potion Factory, a frontend build brief
  document.title = 'Trial II \u2014 The Potion Factory \u2014 WITCHCRAFT';

  if (!completed.includes(1)) {
    showSealedPanel(
      'Trial II',
      TRIALS[2].title + ' \u2014 Sealed',
      'This chapter opens only after the previous trial has been completed.',
      'Complete Trial I (' + TRIALS[1].title + ') first.',
      false
    );
  } else {
    storyView.classList.add('d-none');
    sealedPanel.classList.add('d-none');
    trialTwoView.classList.remove('d-none');
    if (trialHint) {
      trialHint.textContent =
        'Demo control \u2014 the real trial completes when your page is submitted to the club.';
    }
    if (completed.includes(2)) {
      markCompleteButtonsAsDone();
    }
  }
} else {
  // Trial III — Protect the Grimoire, an auth build brief
  document.title = 'Trial III \u2014 Protect the Grimoire \u2014 WITCHCRAFT';

  if (!completed.includes(2)) {
    showSealedPanel(
      'Trial III',
      TRIALS[3].title + ' \u2014 Sealed',
      'This chapter opens only after the previous trial has been completed.',
      'Complete Trial II (' + TRIALS[2].title + ') first.',
      false
    );
  } else {
    storyView.classList.add('d-none');
    sealedPanel.classList.add('d-none');
    trialThreeView.classList.remove('d-none');
    if (trialHint) {
      trialHint.textContent =
        'Demo control \u2014 the real trial completes when your auth system passes review.';
    }
    if (completed.includes(3)) {
      markCompleteButtonsAsDone();
    }
  }
}

// Demo completion: records the trial and returns to the Trials section
completeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.disabled) return;

    const completedTrials = getCompletedTrials();
    if (!completedTrials.includes(id)) {
      completedTrials.push(id);
      localStorage.setItem(TRIALS_STORAGE_KEY, JSON.stringify(completedTrials));
    }
    window.location.href = 'index.html#trials';
  });
});

// ===================== Challenge editors =====================
// Every challenge has its own editor + output console. "Run" executes the
// apprentice's code inside WitchSandbox (see js/sandbox.js); "Submit" runs
// the hidden tests defined in js/challenges.js. Passing every hidden test
// recovers the challenge's ingredient.
function consoleLine(variant, text) {
  const line = document.createElement('p');
  line.className = 'code-console-line code-console-line--' + variant;
  line.textContent = text;
  return line;
}

function setConsole(output, lines) {
  output.textContent = '';
  lines.forEach((line) => output.appendChild(line));
}

function showValue(value) {
  try {
    return JSON.stringify(value);
  } catch (error) {
    return String(value);
  }
}

function updateIngredientUi(challengeId, recovered) {
  const badge = document.querySelector('#challengeHead' + challengeId + ' .challenge-badge');
  if (badge) {
    const challenge = CHALLENGES[challengeId] || {};
    badge.textContent = recovered ? '\u2713 Recovered' : challenge.difficulty || 'To Be Inscribed';
    badge.classList.toggle('is-recovered', recovered);
  }

  const status = document.querySelector(
    '#ingredient-' + challengeId + ' .ingredient-facts .is-lost, ' +
      '#ingredient-' + challengeId + ' .ingredient-facts .is-recovered'
  );
  if (status) {
    status.textContent = recovered ? 'Recovered' : 'Lost';
    status.classList.toggle('is-recovered', recovered);
    status.classList.toggle('is-lost', !recovered);
  }
}

function markIngredientRecovered(challengeId) {
  const recovered = getRecoveredIngredients();
  if (!recovered.includes(Number(challengeId))) {
    recovered.push(Number(challengeId));
    saveRecoveredIngredients(recovered);
  }
  updateIngredientUi(challengeId, true);
}

function renderTestLine(test) {
  const call = showValue(test.args);

  if (test.passed) {
    return consoleLine('success', '\u2713 Test ' + test.index + ' passed  ' + call + ' \u2192 ' + showValue(test.actual));
  }
  if (test.error) {
    return consoleLine('error', '\u2716 Test ' + test.index + ' threw an error: ' + test.error);
  }
  return consoleLine(
    'error',
    '\u2716 Test ' + test.index + ' failed  ' + call + ' \u2192 got ' +
      showValue(test.actual) + ', expected ' + showValue(test.expected)
  );
}

function runChallenge(challengeId, isSubmit) {
  const editor = document.querySelector('[data-editor="' + challengeId + '"]');
  const output = document.querySelector('[data-console="' + challengeId + '"]');
  const runButton = document.querySelector('[data-run-challenge="' + challengeId + '"]');
  const submitButton = document.querySelector('[data-submit-challenge="' + challengeId + '"]');
  if (!editor || !output) return;

  const code = editor.value.trim();
  const challenge = CHALLENGES[challengeId] || {};
  const tests = (isSubmit ? challenge.tests : challenge.samples) || [];

  if (!code) {
    setConsole(output, [
      consoleLine('warn', '\u26A0 The cauldron is empty \u2014 write a solution before ' + (isSubmit ? 'you submit it to the Grimoire.' : 'you run the spell.'))
    ]);
    return;
  }

  if (isSubmit && !tests.length) {
    setConsole(output, [
      consoleLine(
        'muted',
        '\u2726 ' + (challenge.ingredient || 'This ingredient') + ' is still hidden: the judging ' +
          'inscription for Challenge ' + challengeId + ' has not yet been written.'
      )
    ]);
    return;
  }

  const buttons = [runButton, submitButton].filter(Boolean);
  buttons.forEach((button) => {
    button.disabled = true;
  });
  const activeButton = isSubmit ? submitButton : runButton;
  const originalLabel = activeButton ? activeButton.textContent : '';
  if (activeButton) {
    activeButton.textContent = isSubmit ? 'Judging\u2026' : 'Casting\u2026';
  }

  setConsole(output, [consoleLine('muted', '\u2726 The archive stirs\u2026')]);

  if (!window.WitchSandbox || typeof window.WitchSandbox.run !== 'function') {
    setConsole(output, [
      consoleLine(
        'error',
        '\u2716 The sandbox engine (js/sandbox.js) did not load. Hard-refresh the page (Ctrl+Shift+R / Ctrl+F5) and try again.'
      )
    ]);
    return;
  }

  window.WitchSandbox.run({
    code: code,
    fn: challenge.fn || null,
    tests: tests,
    timeoutMs: 3000
  })
    .then((result) => {
      const lines = [];

      if (result.timedOut) {
        lines.push(consoleLine('error', '\u2716 ' + result.error));
      } else {
        (result.logs || []).forEach((log) => {
          lines.push(consoleLine(log.level, log.text));
        });

        if (result.error) {
          lines.push(consoleLine('error', '\u2716 ' + result.error));
        } else if (result.testResults) {
          result.testResults.forEach((test) => lines.push(renderTestLine(test)));

          const failed = result.testResults.filter((test) => !test.passed).length;
          if (failed) {
            lines.push(consoleLine('error', '\u2716 ' + failed + ' of ' + result.testResults.length + ' tests failed. The magic resists.'));
          } else {
            lines.push(consoleLine('success', '\u2713 All ' + result.testResults.length + ' tests passed \u2014 the spell holds. (' + result.durationMs + 'ms)'));
            if (isSubmit) {
              markIngredientRecovered(challengeId);
              lines.push(consoleLine('recovered', '\u2726 ' + (challenge.ingredient || 'The ingredient') + ' returns to Morgana\u2019s collection!'));
            }
          }
        } else if (lines.length) {
          lines.push(consoleLine('success', '\u2713 The spell held. (' + result.durationMs + 'ms)'));
        } else {
          lines.push(consoleLine('success', '\u2713 The spell held \u2014 no output. (' + result.durationMs + 'ms)'));
        }
      }

      setConsole(output, lines);
    })
    .catch((error) => {
      setConsole(output, [
        consoleLine('error', '\u2716 The sandbox shattered: ' + (error && error.message ? error.message : String(error)))
      ]);
    })
    .finally(() => {
      buttons.forEach((button) => {
        button.disabled = false;
      });
      if (activeButton) {
        activeButton.textContent = originalLabel;
      }
    });
}

document.querySelectorAll('[data-run-challenge]').forEach((button) => {
  button.addEventListener('click', () => runChallenge(button.dataset.runChallenge, false));
});

document.querySelectorAll('[data-submit-challenge]').forEach((button) => {
  button.addEventListener('click', () => runChallenge(button.dataset.submitChallenge, true));
});

// Ingredients recovered on an earlier visit are restored on load
getRecoveredIngredients().forEach((challengeId) => updateIngredientUi(challengeId, true));

// "Begin the First Challenge" scrolls down and opens the first editor
const beginFirstChallenge = document.getElementById('beginFirstChallenge');
if (beginFirstChallenge && typeof bootstrap !== 'undefined') {
  beginFirstChallenge.addEventListener('click', () => {
    const firstChallenge = document.getElementById('challenge1');
    if (firstChallenge && !firstChallenge.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(firstChallenge).show();
    }
  });
}
