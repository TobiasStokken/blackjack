// https://www.improvemagic.com/all-playing-cards-names-with-pictures/
let cardStack = [
  {
    value: 1,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/sa.png",
  },
  {
    value: 2,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/s2.png",
  },
  {
    value: 3,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/s3.png",
  },
  {
    value: 4,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/s4.png",
  },
  {
    value: 5,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/s5.png",
  },
  {
    value: 6,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/s6.png",
  },
  {
    value: 7,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/s7.png",
  },
  {
    value: 8,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/s8.png",
  },
  {
    value: 9,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/s9.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/s10.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/sj.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/sq.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/sk.png",
  },
];
let playerCards1 = [];
let playerCards11 = [];
const dealerSumEl = document.getElementById("dealer-sum-el");
const playerSumEl = document.getElementById("player-sum-el");
let playerSum = 0;
let playerSum11 = 0;
let gameOver = false;
let ace = false;
function startGame() {
  getNewPlayerCard();
}

function getNewPlayerCard() {
  if (!cardStack[0] || gameOver) return;

  playerCards1.push(cardStack[0]);
  playerSum = playerCards1.reduce((sum, card) => sum + card.value, 0);
  playerSum11 = playerSum + 10;

  if (ace || cardStack[0].value === 1) {
    playerSumEl.textContent = `Sum: ${playerSum}${
      playerSum11 <= 21 ? `/${playerSum11}` : ""
    }`;
    ace = true;
  } else {
    playerSumEl.textContent = `Sum: ${playerSum}`;
  }

  cardStack.shift();
  checkForWin();
}

function checkForWin() {
  if (playerSum === 21) {
    gameOver = true;
  } else if (playerSum > 21) {
    gameOver = true;
  }
}

function shuffleCards() {
  cardStack = cardStack
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
