const clearSFX = new Audio("./audio/clear.mp3");
const drop1SFX = new Audio("./audio/drop1.mp3");
const drop2SFX = new Audio("./audio/drop2.mp3");
const drop3SFX = new Audio("./audio/drop3.mp3");
const drop4SFX = new Audio("./audio/drop4.mp3");

const dealerSumEl = document.getElementById("dealer-sum-el");
const playerSumEl = document.getElementById("player-sum-el");
let table = document.getElementById("dropChips");
const messageEl = document.getElementById("message-el");
const dealerCardsEl = "dealer-cards-div";
const playerCardsEl = "player-cards-div";
// https://www.improvemagic.com/all-playing-cards-names-with-pictures/
let cardStack = [
  // Hearts =>
  {
    value: 1,
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
  // Clubs =>
  {
    value: 1,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/ka.png",
  },
  {
    value: 2,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/k2.png",
  },
  {
    value: 3,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/k3.png",
  },
  {
    value: 4,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/k4.png",
  },
  {
    value: 5,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/k5.png",
  },
  {
    value: 6,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/k6.png",
  },
  {
    value: 7,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/k7.png",
  },
  {
    value: 8,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/k8.png",
  },
  {
    value: 9,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/k9.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/k10.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/kj.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/kq.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/kk.png",
  },
  // Spades =>
  {
    value: 1,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/pa.png",
  },
  {
    value: 2,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/p2.png",
  },
  {
    value: 3,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/p3.png",
  },
  {
    value: 4,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/p4.png",
  },
  {
    value: 5,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/p5.png",
  },
  {
    value: 6,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/p6.png",
  },
  {
    value: 7,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/p7.png",
  },
  {
    value: 8,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/p8.png",
  },
  {
    value: 9,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/p9.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/p10.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/pj.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/pq.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/pk.png",
  },
  // Diamonds =>
  {
    value: 1,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/la.png",
  },
  {
    value: 2,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/l2.png",
  },
  {
    value: 3,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/l3.png",
  },
  {
    value: 4,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/l4.png",
  },
  {
    value: 5,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/l5.png",
  },
  {
    value: 6,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/l6.png",
  },
  {
    value: 7,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/l7.png",
  },
  {
    value: 8,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/l8.png",
  },
  {
    value: 9,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/l9.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/l10.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/lj.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/lq.png",
  },
  {
    value: 10,
    img: "https://www.improvemagic.com/wp-content/uploads/2020/11/lk.png",
  },
];
let playerCards = [];
let playerCards11 = [];
let dealerCards = [];
let dealerCards11 = [];
let dealerSum = 0;
let dealerSumAce = 0;
let playerSum = 0;
let playerSumAce = 0;
let gameOver = false;
let gameStarted = false;
let dealerAce = false;
let playerAce = false;
let usePlayerSumAce = false;
let useDealerSumAce = false;
let currentBet = 0;
let stats = {
  chips: 200,
  gamesPlayed: 0,
  gamesWon: 0,
  gamesLost: 0,
  gamesDrawn: 0,
};
if (JSON.parse(window.localStorage.getItem("stats"))) {
  stats = JSON.parse(window.localStorage.getItem("stats"));
}

function startGame() {
  gameStarted = true;
  document.getElementById("changeCurrentBet").classList.add("hidden");
  document.getElementById("bets").classList.add("hidden");
  cardStack = cardStack
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  getNewDealerCard();
  getNewPlayerCard();
  getNewPlayerCard();
}
function loadCard(image, appendTo) {
  // Create card image element
  const elem = document.createElement("img");
  elem.classList.add("card");
  elem.setAttribute("src", image);
  elem.setAttribute("width", "128");
  elem.setAttribute("alt", "Image not found");
  document.getElementById(appendTo).appendChild(elem);
}

function getNewPlayerCard() {
  if (!cardStack[0] || gameOver || !gameStarted) return;

  playerCards.push(cardStack[0]);
  playerSum = playerCards.reduce((sum, card) => sum + card.value, 0);

  if (playerAce || cardStack[0].value === 1) {
    playerSumAce = playerSum + 10;
    playerSumEl.textContent = `Sum: ${playerSum}${
      playerSumAce <= 21 ? `/${playerSumAce}` : ""
    }`;
    playerAce = true;
    usePlayerSumAce = true;
    if (playerSumAce > 21) usePlayerSumAce = false;
  } else {
    playerSumEl.textContent = `Sum: ${playerSum}`;
  }
  loadCard(cardStack[0].img, playerCardsEl);
  cardStack.shift();

  if (playerSum > 21) {
    messageEl.textContent = "You busted";

    stats.gamesPlayed++;
    stats.gamesLost++;
    currentBet = 0;
    gameOver = true;
    restartGame();
    return;
  } else if (playerSum === 21 || playerSumAce === 21) {
    messageEl.textContent = "Player wins with 21";
    stats.chips += currentBet * 3;
    currentBet = 0;
    stats.gamesPlayed++;
    stats.gamesWon++;
    gameOver = true;
    renderStats();
    restartGame();
    return;
  }
  checkForWin();
}

function getNewDealerCard() {
  if (!cardStack[0] || gameOver) return;

  dealerCards.push(cardStack[0]);
  dealerSum = dealerCards.reduce((sum, card) => sum + card.value, 0);

  if (dealerAce || cardStack[0].value === 1) {
    dealerSumAce = dealerSum + 10;
    dealerSumEl.textContent = `Dealer sum: ${dealerSum}${
      dealerSumAce <= 21 ? `/${dealerSumAce}` : ""
    }`;
    dealerAce = true;
    useDealerSumAce = true;
    if (dealerSumAce > 21) useDealerSumAce = false;
  } else {
    dealerSumEl.textContent = `Dealer sum: ${dealerSum}`;
  }
  loadCard(cardStack[0].img, dealerCardsEl);
  cardStack.shift();
  if (dealerSum > 21) {
    messageEl.textContent = "Dealer Busted";
    stats.chips += currentBet * 2;

    currentBet = 0;
    stats.gamesPlayed++;
    stats.gamesWon++;
    renderStats();
    gameOver = true;
    restartGame();
    return;
  } else if (dealerSumAce === 21 || dealerSum === 21) {
    messageEl.textContent = "Dealer wins with 21";

    stats.gamesPlayed++;
    stats.gamesLost++;
    renderStats();

    gameOver = true;
    restartGame();
    return;
  }
  checkForWin();
}
async function stand() {
  if (!cardStack[0] || gameOver || !gameStarted) return;
  // draws a new card until dealer has 17 or above
  if (dealerSum >= 17 || (dealerSumAce >= 17 && useDealerSumAce)) {
    gameOver = true;
    checkForWin();
  } else {
    getNewDealerCard();
    await new Promise((r) => setTimeout(r, 2000));
    stand();
  }
}

function checkForWin() {
  // Big check for who wins
  if (!gameOver) return;
  stats.gamesPlayed++;
  renderStats();

  if (playerSumAce === 21 || playerSum === 21) {
    messageEl.textContent = "You win with 21";
    stats.chips += currentBet * 2;

    stats.gamesWon;
  } else if (usePlayerSumAce) {
    if (useDealerSumAce) {
      if (playerSumAce > dealerSumAce) {
        messageEl.textContent = "You win";
        stats.chips += currentBet * 2;

        stats.gamesWon++;
      } else if (dealerSumAce > playerSumAce) {
        messageEl.textContent = "Dealer wins";

        stats.gamesLost++;
      } else {
        messageEl.textContent = "No one wins";
        stats.chips += currentBet;
      }
    } else if (!useDealerSumAce) {
      if (playerSumAce > dealerSum) {
        messageEl.textContent = "You win";
        stats.chips += currentBet * 2;

        stats.gamesWon++;
      } else if (dealerSum > playerSumAce) {
        messageEl.textContent = "Dealer wins";

        stats.gamesLost++;
      } else {
        messageEl.textContent = "No one wins";
        stats.chips += currentBet;
        stats.gamesDrawn++;
      }
    }
  } else if (!usePlayerSumAce) {
    if (useDealerSumAce) {
      if (playerSum > dealerSumAce) {
        messageEl.textContent = "You win";
        stats.chips += currentBet * 2;

        stats.gamesWon++;
      } else if (dealerSumAce > playerSum) {
        messageEl.textContent = "Dealer wins";

        stats.gamesLost++;
      } else {
        messageEl.textContent = "No one wins";
        stats.chips += currentBet;
        stats.gamesDrawn++;
      }
    } else if (!useDealerSumAce) {
      if (playerSum > dealerSum) {
        messageEl.textContent = "You win";
        stats.chips += currentBet * 2;
        stats.gamesWon++;
      } else if (dealerSum > playerSum) {
        messageEl.textContent = "Dealer wins";
        stats.gamesLost++;
      } else {
        messageEl.textContent = "No one wins";
        stats.chips += currentBet;
        stats.gamesDrawn++;
      }
    }
  }
  currentBet = 0;
  renderStats();
  restartGame();
}

async function restartGame() {
  if (gameOver) {
    for (i = 0; i < 3; i++) {
      document.getElementById("message2-el").textContent =
        "New Round in " + (3 - i);
      await new Promise((r) => setTimeout(r, 1000));
    }
    window.location.reload();
  }
}

function addBet(amount) {
  if (amount > stats.chips || stats.chips === 0 || gameStarted) return;
  if (amount === 0) {
    currentBet = stats.chips;
    stats.chips -= stats.chips;
  } else {
    stats.chips -= amount;
    currentBet += amount;
  }
  renderStats();
}

function clearBet() {
  table.innerText = "";
  stats.chips += currentBet;

  currentBet = 0;
  renderStats();
  clearSFX.play();
}

function freeChips() {
  alert("Ad coming soon");
  stats.chips += 200;
  renderStats();
}

addEventListener("beforeunload", () => {
  stats.chips += currentBet;
  renderStats();
});

function renderStats() {
  window.localStorage.setItem("stats", JSON.stringify(stats));
  document.getElementById("statsChips").textContent = stats.chips;
  document.getElementById("statsChips2").textContent = stats.chips;
  document.getElementById("statsGamesPlayed").textContent = stats.gamesPlayed;
  document.getElementById("statsGamesWon").textContent = stats.gamesWon;
  document.getElementById("statsGamesLost").textContent = stats.gamesLost;
  document.getElementById("statsGamesDrawn").textContent = stats.gamesDrawn;
  document.getElementById("currentBet").textContent = currentBet;
}
renderStats();

setInterval(() => {
  renderStats();
}, 1000);

function playDropSFX() {
  let rand = Math.floor(Math.random() * 4 + 1);
  if (rand === 1) {
    drop1SFX.play();
  } else if (rand === 2) {
    drop2SFX.play();
  } else if (rand === 3) {
    drop3SFX.play();
  } else if (rand === 4) {
    drop4SFX.play();
  } else {
    drop1SFX.play();
  }
}

function dragChips(amount, hasClicked) {
  playDropSFX();

  if (stats.chips < amount || stats.chips === 0) return;
  table = document.getElementById("dropChips");

  if (
    document.elementFromPoint(event.clientX, event.clientY).id ===
      "dropChips" ||
    hasClicked
  ) {
    addBet(amount);
    const element = document.createElement("img");
    if (amount === 50) {
      element.src = "images/chips/50.png";
    } else if (amount === 100) {
      element.src = "images/chips/100.png";
    } else if (amount === 200) {
      element.src = "images/chips/200.png";
    } else if (amount === 500) {
      element.src = "images/chips/500.png";
    } else if (amount === 1000) {
      element.src = "images/chips/1000.png";
    } else if (amount === 0) {
      element.src = "images/chips/all.png";
    }
    element.style.width = "100px";
    element.setAttribute("id", "addedChips" + amount);
    element.style.cursor = "pointer";
    element.onclick = () => {
      playDropSFX();
      if (gameStarted) return;
      document.getElementById("addedChips" + amount).remove();
      if (amount === 0) {
        stats.chips = currentBet;
        currentBet = 0;
      } else {
        stats.chips += amount;
        currentBet -= amount;
      }
      renderStats();
    };
    table.appendChild(element);
  }
}
