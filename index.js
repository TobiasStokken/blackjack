let cardStack = [
  {
    value: [11, 1],
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
function showDealerCards(src, width) {
  var img = document.createElement("img");
  img.src = src;
  img.width = width;
  document.getElementById("dealer-cards-div").appendChild(img);
}
function showPlayerCards(src, width) {
  var img = document.createElement("img");
  img.src = src;
  img.width = width;
  document.getElementById("player-cards-div").appendChild(img);
}

let playerCards = [
  Math.floor(Math.random() * 13),
  Math.floor(Math.random() * 13),
];
let dealerCards = [Math.floor(Math.random() * 13)];
let gameOver = false;
let hasStanded = false;
const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const dealerCardsEl = document.getElementById("dealer-cards-el");
const dealerSumEl = document.getElementById("dealer-sum-el");
const betEl = document.getElementById("bet-el");
const chipsEl = document.getElementById("chips-el");
let gameStarted = false;
let chips = 200;
let bet = 0;

checkForIllegalValues(playerCards);
checkForIllegalValues(dealerCards);

function drawNewCard() {
  if (gameOver || hasStanded) {
    return;
  }

  checkForIllegalValues(playerCards);
  playerCards.push(Math.floor(Math.random() * 13));
  renderCards();
  checkForWin(playerCards.reduce((a, b) => a + b));
}

function startGame() {
  if (gameStarted) {
    return;
  }
  showDealerCards(cardStack[dealerCards[0]].img, 100);
  cardStack.splice(dealerCards[0]);
  showPlayerCards(cardStack[playerCards[0]].img, 100);
  cardStack.splice(playerCards[0]);
  showPlayerCards(cardStack[playerCards[1]].img, 100);
  cardStack.splice(playerCards[1]);
  renderCards();
  if (dealerCards.reduce((a, b) => a + b) === 21) {
    messageEl.textContent = "You lost. Dealer got 21";
    chips = chips - bet;
    return;
  }
  gameStarted = true;
  checkForWin(playerCards.reduce((a, b) => a + b));
}

function stand() {
  if (gameOver) {
    return;
  }
  hasStanded = true;
  checkForDealerWin();
}
function renderCards() {
  let dealerSum = 0;
  let playerSum = 0;
  for (i = 0; i < dealerCards.length; i++) {
    dealerSum = dealerSum + cardStack[dealerCards[i]].value;
  }
  for (i = 0; i < playerCards.length; i++) {
    playerSum = playerSum + cardStack[playerCards[i]].value;
  }

  dealerSumEl.textContent = "Dealer sum: " + dealerSum;
  sumEl.textContent = "Sum: " + playerSum;
}

async function checkForDealerWin() {
  if (dealerCards.reduce((a, b) => a + b) < 17) {
    dealerCards.push(Math.floor(Math.random() * 16) + 2);
    showDealerCards(cardStack[dealerCards.length].img, 100);

    checkForIllegalValues(dealerCards);
    renderCards();
    await new Promise((r) => setTimeout(r, 2000));
    checkForDealerWin();
  } else if (dealerCards.reduce((a, b) => a + b) > 17) {
    console.log("Dealer Cards Sum: " + dealerCards.reduce((a, b) => a + b));
    console.log("Player Cards Sum: " + playerCards.reduce((a, b) => a + b));
    if (dealerCards.reduce((a, b) => a + b) > 21) {
      messageEl.textContent = "Dealer busted";
      chips = chips + bet;
    } else if (
      dealerCards.reduce((a, b) => a + b) > playerCards.reduce((a, b) => a + b)
    ) {
      messageEl.textContent = "Dealer Wins";
      chips = chips - bet;
    } else if (
      dealerCards.reduce((a, b) => a + b) < playerCards.reduce((a, b) => a + b)
    ) {
      messageEl.textContent = "You win";
      chips = chips + bet;
    } else if (
      dealerCards.reduce((a, b) => a + b) ===
      playerCards.reduce((a, b) => a + b)
    ) {
      messageEl.textContent = "No one wins";
    } else {
      messageEl.textContent = "ERROR";
    }
    console.log(chips);
    betEl.textContent = "Current Bet: " + bet;
    bet = 0;
    gameOver = true;
    refreshGame();
  }
}

function checkForWin(sum) {
  if (sum <= 20) {
    messageEl.textContent = "Do you want to draw a new card?";
  } else if (sum === 21) {
    messageEl.textContent = "Youve got Blackjack!";
    chips = chips + bet + bet;
    refreshGame();
  } else if (
    playerCards.length > 5 &&
    playerCards.reduce((a, b) => a + b) > 22
  ) {
    messageEl.textContent = "You won by the five card rule";
    refreshGame();
  } else {
    messageEl.textContent = "Youre out of the game!";
    chips = chips - bet;
    refreshGame();
  }
}

function changeBet() {
  let newBet = prompt("How much do you want to bet");
  if (newBet === null) {
    newBet = 0;
  }
  if (newBet > chips) {
    bet = chips;
  } else {
    bet = newBet;
  }
  betEl.textContent = "Current Bet: " + bet;
}

async function refreshGame() {
  await new Promise((r) => setTimeout(r, 3000));
  document.getElementById("hide-onclick").style.display = "initial";
  document.getElementById("hide-onclick2").style.display = "Initial";
  document.getElementById("dealer-cards-div");
  document.getElementById("player-cards-div");

  messageEl.textContent = "Want to play a round?";
  dealerSumEl.textContent = "Dealer sum: ?";
  sumEl.textContent = "Sum: ?";
  bet = 0;
  playerCards = [
    Math.floor(Math.random() * 13) + 1,
    Math.floor(Math.random() * 13) + 1,
  ];
  dealerCards = [Math.floor(Math.random() * 13) + 1];
  gameOver = false;
  hasStanded = false;
  gameStarted = false;
  startGame();
}

function checkForIllegalValues(list) {
  for (i = 0; i < list.length; i++) {
    if (list[i] > 11) {
      list[i] = 10;
    }
  }
}

async function updateBets() {
  setInterval(() => {
    chipsEl.textContent = `Chips: ${chips}`;
    betEl.textContent = "Current Bet: " + bet;
  }, 1000);
}

updateBets();
