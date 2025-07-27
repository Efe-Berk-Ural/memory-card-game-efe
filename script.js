
const cards = [
  '🍎', '🍌', '🍇', '🍓',
  '🍎', '🍌', '🍇', '🍓'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createCard(content) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.content = content;
  card.innerHTML = '';
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.innerHTML = this.dataset.content;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

function checkMatch() {
  lockBoard = true;
  if (firstCard.dataset.content === secondCard.dataset.content) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.innerHTML = '';
      secondCard.innerHTML = '';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function startGame() {
  const board = document.getElementById('gameBoard');
  board.innerHTML = '';
  const shuffledCards = shuffle([...cards]);
  shuffledCards.forEach(symbol => {
    const card = createCard(symbol);
    board.appendChild(card);
  });
}

startGame();
