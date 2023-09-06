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
let gameStarted = false;

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
  dealerCardsEl.textContent = "Dealer Cards: " + dealerCards;
  dealerSumEl.textContent =
    "Dealer sum: " + dealerCards.reduce((a, b) => a + b);
  cardsEl.textContent = "Cards: " + playerCards;
  sumEl.textContent = "Sum: " + playerCards.reduce((a, b) => a + b);
}

async function checkForDealerWin() {
  if (dealerCards.reduce((a, b) => a + b) < 17) {
    dealerCards.push(Math.floor(Math.random() * 16) + 2);
    console.log(dealerCards);
    for (i = 0; i < dealerCards.length; i++) {
      if (dealerCards[i] > 11) {
        dealerCards[i] = 10;
      }
    }
    console.log(dealerCards);
    renderCards();
    await new Promise((r) => setTimeout(r, 2000));
    checkForDealerWin();
  } else if (dealerCards.reduce((a, b) => a + b) > 17) {
    if (
      22 > dealerCards.reduce((a, b) => a + b) &&
      dealerCards.reduce((a, b) => a + b) > playerCards.reduce((a, b) => a + b)
    ) {
      messageEl.textContent = "Dealer won";
    } else if (
      dealerCards.reduce((a, b) => a + b) ===
      playerCards.reduce((a, b) => a + b)
    ) {
      messageEl.textContent = "No one wins";
    } else {
      messageEl.textContent = "You won";
    }
  }
}

function checkForWin(sum) {
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "Youve got Blackjack!";
    console.log(playerCards.reduce((a, b) => a + b));
    hasBlackJack = true;
  } else if (
    playerCards.length > 5 &&
    playerCards.reduce((a, b) => a + b) > 22
  ) {
    message = "You won by the five card rule";
  } else {
    message = "Youre out of the game!";
    isAlive = false;
  }
  messageEl.textContent = message;
}
