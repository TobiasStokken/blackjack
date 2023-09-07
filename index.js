let playerCards = [
  Math.floor(Math.random() * 13) + 2,
  Math.floor(Math.random() * 13) + 2,
];
let dealerCards = [Math.floor(Math.random() * 16) + 2];
let hasBlackJack = false;
let dealerBlackJack = false;
let isAlive = true;
let hasStanded = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let dealerCardsEl = document.getElementById("dealer-cards-el");
let dealerSumEl = document.getElementById("dealer-sum-el");
let betEl = document.getElementById("bet-el");
let chipsEl = document.getElementById("chips-el");
let gameStarted = false;
let chips = 200;
let bet = 0;

for (i = 0; i < playerCards.length; i++) {
  if (playerCards[i] > 11) {
    playerCards[i] = 10;
  }
}

for (i = 0; i < dealerCards.length; i++) {
  if (dealerCards[i] > 11) {
    dealerCards[i] = 10;
  }
}

function drawNewCard() {
  if (!isAlive || hasBlackJack || dealerBlackJack || hasStanded) {
    return;
  }
  for (i = 0; i < playerCards.length; i++) {
    if (playerCards[i] > 11) {
      playerCards[i] = 10;
    }
  }
  for (i = 0; i < dealerCards.length; i++) {
    if (dealerCards[i] > 11) {
      dealerCards[i] = 10;
    }
  }
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
    dealerBlackJack = true;
    chips = chips - bet;
    return;
  }
  gameStarted = true;
  checkForWin(playerCards.reduce((a, b) => a + b));
}

function stand() {
  if (!isAlive || hasBlackJack || dealerBlackJack) {
    return;
  }
  hasStanded = true;
  checkForDealerWin();
}

function renderCards() {
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

    for (i = 0; i < dealerCards.length; i++) {
      if (dealerCards[i] > 11) {
        dealerCards[i] = 10;
      }
    }
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
    isAlive = false;
    betEl.textContent = "Current Bet: " + bet;
    bet = 0;
  }
}

function checkForWin(sum) {
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "Youve got Blackjack!";
    hasBlackJack = true;
    chips = chips + bet + bet;
  } else if (
    playerCards.length > 5 &&
    playerCards.reduce((a, b) => a + b) > 22
  ) {
    message = "You won by the five card rule";
  } else {
    message = "Youre out of the game!";
    chips = chips - bet;
    isAlive = false;
  }
  messageEl.textContent = message;
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

async function updateBets() {
  setInterval(() => {
    chipsEl.textContent = "Chips: " + chips;
    betEl.textContent = "Current Bet: " + bet;
  }, 1000);
}

updateBets();
