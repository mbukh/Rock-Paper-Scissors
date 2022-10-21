"use strict";

const elements = {
  rock: 0,
  lizard: 1,
  spock: 2,
  scissors: 3,
  paper: 4,
};
const maxNumberOfGames = 10;
let currentGameNumber = 0;
let wins = 0
let inGame = false;

const elementsDiv = [
  document.querySelector("#a"),
  document.querySelector("#b"),
  document.querySelector("#c"),
  document.querySelector("#d"),
  document.querySelector("#e"),
];
elementsDiv.forEach((el, idx) =>
  el.addEventListener("click", (el) => game(idx))
);

const playedGames = document.getElementById('played-games');
const stats = document.getElementById('luck-stats');
const reset = document.getElementById('reset')

function game(playerElement) {
  if (inGame === true) {
    console.log("wait...");
    return;
  }
  currentGameNumber += 1;
  if (currentGameNumber > maxNumberOfGames) {
    console.log("Game Over.");
    return;
  }
  inGame = true;
  const playerSelection = playerElement;
  const computerSelection = getComputerChoice();

  playRound(playerSelection, computerSelection);

  playedGames.innerText = currentGameNumber;
  stats.innerText = Math.round((wins / currentGameNumber) * 100) + "%";
}

function playRound(playerSelection, computerSelection) {
  let winner = getWinner(playerSelection, computerSelection);
  console.group("Round " + currentGameNumber);
  console.log(winner);
  console.groupEnd();
}

function getComputerChoice() {
  return getRandomElement();
}

function getRandomElement() {
  const keys = Object.keys(elements);
  return elements[keys[(keys.length * Math.random()) << 0]];
}

function getWinner(playerSelection, computerSelection) {
  let winner;

  if (playerSelection === computerSelection) {
    elementsDiv[playerSelection].classList.add("ties", "selected");
    setTimeout(() => {
      elementsDiv[playerSelection].classList.remove("ties", "selected");
    }, 2000);
    winner = `ties: ${playerSelection} == ${computerSelection}`;
    inGame = false;
    return winner;
  }

  showLine(elementsDiv[playerSelection], elementsDiv[computerSelection]);
  
  let countElements = Object.keys(elements).length;
  let choiceDifference = playerSelection - computerSelection;
  let positiveModulo = (choiceDifference + countElements) % countElements;
  if (positiveModulo % 2 === 0) {
    wins = wins + 1;
    elementsDiv[playerSelection].classList.add("win", "selected");
    elementsDiv[computerSelection].classList.add("lose", "selected");
    setTimeout(() => {
      elementsDiv[playerSelection].classList.remove("win", "selected");
      elementsDiv[computerSelection].classList.remove("lose", "selected");
    }, 2000);
    winner = playerSelection + " < player wins " + computerSelection;
  } else {
    elementsDiv[playerSelection].classList.add("lose", "selected");
    elementsDiv[computerSelection].classList.add("win", "selected");
    setTimeout(() => {
      elementsDiv[playerSelection].classList.remove("lose", "selected");
      elementsDiv[computerSelection].classList.remove("win", "selected");
    }, 2000);
    winner = playerSelection + " computer wins > " + computerSelection;
  }
  return winner;
}

function showLine(divStart, divEnd) {
  const connector =
    document.getElementById(`connector${divStart.id}${divEnd.id}`) ??
    document.getElementById(`connector${divEnd.id}${divStart.id}`);
  connector.classList.add("visible");
  // reset
  setTimeout(() => {
    connector.classList.remove("visible");
    inGame = false;
  }, 2500);
}

reset.addEventListener('click', () => {
  stats.innerText = '-';
  playedGames.innerText = 0;
  wins = 0;
  currentGameNumber = 0;
});