/*
GAME RULES:

- The game has 2 players, playing in rounds
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, messages;

scores = [0, 0];
roundScore = 0;
activePlayer = false; // false for player 1 and true for player 2
messages = [
  'New game started',
  'You lose. Player 1, your turn',
  'You lose. Player 2, your turn',
  'Score holded. Player 1, your turn',
  'Score holded. Player 2, your turn'
];

function animateButton(element) {
  var animation = 'flipInX';
  var speed = 'fast';
  element.classList.add('animated', animation, speed);
  element.addEventListener('animationend', function() {
    element.classList.remove('animated', animation, speed);
  });
}

function displayScores(scores, roundScore, activePlayer) {
  document.querySelector('#score-1').textContent = scores[0];
  document.querySelector('#score-2').textContent = scores[1];

  !activePlayer
    ? (document.querySelector('#current-1').textContent = roundScore)
    : (document.querySelector('#current-2').textContent = roundScore);
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
  const p1Panel = document.querySelector('.player-1-panel');
  const p2Panel = document.querySelector('.player-2-panel');
  if (!activePlayer) {
    p1Panel.classList.remove('active');
    p2Panel.classList.add('active');
  } else {
    p1Panel.classList.add('active');
    p2Panel.classList.remove('active');
  }
  return !activePlayer;
}

function newGame() {
  animateButton(event.target);
  displayToast(0);
}

function roll() {
  animateButton(event.target);
  dice = Math.floor(Math.random() * 6) + 1;
  document.querySelector('.dice').src = `images/dice/${dice}.png`;

  if (dice === 1) {
    roundScore = 0;
    displayScores(scores, roundScore, activePlayer);
    !activePlayer ? displayToast(2) : displayToast(1);
    activePlayer = changePlayer(activePlayer);
  } else {
    roundScore += dice;
    displayScores(scores, roundScore, activePlayer);
  }
}

function hold() {
  animateButton(event.target);
  if (!activePlayer) {
    scores[0] += roundScore;
    displayToast(4);
  } else {
    scores[1] += roundScore;
    displayToast(3);
  }
  roundScore = 0;
  displayScores(scores, roundScore, activePlayer);
  activePlayer = changePlayer(activePlayer);
}
