let playerCards = [
  Math.floor(Math.random() * 13) + 2,
  Math.floor(Math.random() * 13) + 2,
];
let dealerCards = [Math.floor(Math.random() * 16) + 2];
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
  playerCards.push(Math.floor(Math.random() * 10) + 2);
  renderCards();
  checkForWin(playerCards.reduce((a, b) => a + b));
}

function startGame() {
  if (gameStarted) {
    return;
  }
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
  console.log(playerCards);

  if (dealerCards.length < 2) {
    dealerCardsEl.textContent = "Dealer Cards: " + dealerCards + ",?";
  } else {
    dealerCardsEl.textContent = "Dealer Cards: " + dealerCards;
  }
  dealerSumEl.textContent =
    "Dealer sum: " + dealerCards.reduce((a, b) => a + b);
  cardsEl.textContent = "Cards: " + playerCards;
  sumEl.textContent = "Sum: " + playerCards.reduce((a, b) => a + b);
}

async function checkForDealerWin() {
  if (dealerCards.reduce((a, b) => a + b) < 17) {
    dealerCards.push(Math.floor(Math.random() * 16) + 2);

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

  startGame();

  messageEl.textContent = "Want to play a round?";
  dealerCardsEl.textContent = "Dealer Cards: ?,?";
  dealerSumEl.textContent = "Dealer sum: ?";
  cardsEl.textContent = "Cards: ?,?";
  sumEl.textContent = "Sum: ?";
  bet = 0;
  playerCards = [
    Math.floor(Math.random() * 13) + 2,
    Math.floor(Math.random() * 13) + 2,
  ];
  dealerCards = [Math.floor(Math.random() * 16) + 2];
  gameOver = false;
  hasStanded = false;
  gameStarted = false;
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
