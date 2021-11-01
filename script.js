'use strict';

// Selectin elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnReset = document.querySelector('.btn--new');

const winningScore = 100;
let score, currentScore, activePlayer, playing, oldDiceRoll;
//Initial setup function
const init = () => {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  oldDiceRoll = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

init();

const rollDiceValue = () => {
  let newRoll = Math.trunc(Math.random() * 6) + 1;
  while (oldDiceRoll === newRoll) {
    newRoll = Math.trunc(Math.random() * 6) + 1;
  }
  oldDiceRoll = newRoll;
  return newRoll;
};
//Switch player function
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
//Setting up the function to roll the dice
const rollDiceFunction = () => {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = rollDiceValue();
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // console.log(dice);
    // 3. Check for a rolled 1: if true
    if (dice !== 1) {
      //Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
};
//Setting up the function to hold the score
const holdScoreFunction = () => {
  if (playing) {
    // 1. Add current score to active player's score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2. Check if player's score is >=100
    if (score[activePlayer] >= winningScore) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
};

// Rolling dice functionality
btnReset.addEventListener('click', init);
btnRoll.addEventListener('click', rollDiceFunction);
btnHold.addEventListener('click', holdScoreFunction);
document.addEventListener('keydown', e => {
  // console.log(e.code);
  if (e.code === 'ControlRight') rollDiceFunction();
  if (e.code === 'ControlLeft') holdScoreFunction();
  if (e.code === 'Backspace') init();
});
