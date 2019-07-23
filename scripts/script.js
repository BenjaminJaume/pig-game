/*
GAME RULES:

- The game has 2 players, playing in rounds
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* Variables */

var scores, roundScore, activePlayer, dice, messages, scoreWin;

scores = [0, 0];
roundScore = 0;
activePlayer = false; // false for player 1 and true for player 2
scoreWin = 50;
messages = [
  'New game started',
  'You lose. Player 1, your turn',
  'You lose. Player 2, your turn',
  'Score holded. Player 1, your turn',
  'Score holded. Player 2, your turn',
  'Player 1 win!',
  'Player 2 win!'
];

/* HTML elements */

var buttonRoll = document.querySelector('.btn-roll');
var buttonHold = document.querySelector('.btn-hold');

const imgDice = document.querySelector('.dice');
const displayScoreWin = document.querySelector('#scoreWin');
const score1 = document.querySelector('#score-1');
const score2 = document.querySelector('#score-2');
const current1 = document.querySelector('#current-1');
const current2 = document.querySelector('#current-2');
const p1Panel = document.querySelector('.player-1-panel');
const p2Panel = document.querySelector('.player-2-panel');

$(document).ready(function() {
  displayScoreWin.textContent = scoreWin;
});

function animate(element) {
  var animation = 'fadeIn';
  var speed = 'faster';

  element.classList.add('animated', animation, speed);
  element.addEventListener('animationend', function() {
    element.classList.remove('animated', animation, speed);
  });
}

function displayScores() {
  if (!activePlayer) {
    score1.textContent = scores[0];
    current1.textContent = roundScore;
    animate(current1);
  } else {
    score2.textContent = scores[1];
    current2.textContent = roundScore;
    animate(current2);
  }
}

function displayToast(number) {
  var animation = 'fadeInDown';
  const toast = document.querySelector('.display-message');
  toast.classList.add('animated', animation);

  toast.addEventListener('animationend', function() {
    toast.classList.remove('animated', animation);
  });

  toast.textContent = messages[number];
  setTimeout(function() {
    toast.textContent = '';
  }, 2000);
}

function changePlayer(activePlayer) {
  if (!activePlayer) {
    p1Panel.classList.remove('active');
    p2Panel.classList.add('active');
  } else {
    p1Panel.classList.add('active');
    p2Panel.classList.remove('active');
  }
  return !activePlayer;
}

function playerWin(activePLayer) {
  buttonHold.innerHTML = '';
  buttonRoll.setAttribute('disabled', 'disabled');
  buttonHold.setAttribute('disabled', 'disabled');

  displayScores();

  if (!activePLayer) {
    buttonRoll.innerHTML = 'Player 1 win!';
    displayToast(5);
  } else {
    buttonRoll.innerHTML = 'Player 2 win!';
    displayToast(6);
  }
}

function newGame() {
  buttonRoll.innerHTML = `<i class="material-icons"> cached </i>Roll dice`;
  buttonHold.innerHTML = `<i class="material-icons"> get_app </i>Hold`;
  buttonRoll.removeAttribute('disabled');
  buttonHold.removeAttribute('disabled');

  scores = [0, 0];
  roundScore = 0;
  activePlayer = false;
  p1Panel.classList.add('active');
  p2Panel.classList.remove('active');
  imgDice.src = `images/dice/0.png`;

  score1.textContent = '0';
  score2.textContent = '0';
  current1.textContent = '0';
  current2.textContent = '0';

  animate(buttonRoll);
  animate(buttonHold);
  animate(score1);
  animate(score2);
  animate(current1);
  animate(current2);
  displayToast(0);
}

function roll() {
  dice = Math.floor(Math.random() * 6) + 1;
  imgDice.src = `images/dice/${dice}.png`;

  if (dice === 1) {
    roundScore = 0;
    displayScores();
    !activePlayer ? displayToast(2) : displayToast(1);
    activePlayer = changePlayer(activePlayer);
  } else {
    roundScore += dice;
    displayScores();
  }
}

function hold() {
  animate(event.target);

  if (!activePlayer) {
    scores[0] += roundScore;
    if (scores[0] >= scoreWin) {
      playerWin(activePlayer);
    } else {
      roundScore = 0;
      displayScores();
      activePlayer = changePlayer(activePlayer);
      displayToast(4);
    }
  } else {
    scores[1] += roundScore;
    if (scores[1] >= scoreWin) {
      playerWin(activePlayer);
    } else {
      roundScore = 0;
      displayScores();
      activePlayer = changePlayer(activePlayer);
      displayToast(3);
    }
  }

  displayScores();
}
