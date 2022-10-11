"use strict";

const elements = {
  rock: 0,
  lizard: 1,
  spock: 2,
  scissors: 3,
  paper: 4,
};
const maxNumberOfGames = 5;
let currentGameNumber = 0;
let wins = 0

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
  if (++currentGameNumber > 5) {
    console.log("Game Over.");
    return;
  }
  const playerSelection = playerElement;
  const computerSelection = getComputerChoice();

  console.group("Round " + currentGameNumber);
  console.log(playRound(playerSelection, computerSelection));
  console.groupEnd();

  playedGames.innerText = currentGameNumber;
  stats.innerText = Math.round(wins / currentGameNumber * 100) + '%';
}

function playRound(playerSelection, computerSelection) {
  let winner = getWinner(playerSelection, computerSelection);
  return winner;
}

function getComputerChoice() {
  return getRandomElement();
}

function getRandomElement() {
  const keys = Object.keys(elements);
  return elements[keys[(keys.length * Math.random()) << 0]];
}

function getWinner(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "ties";
  }
  let countElements = Object.keys(elements).length;
  let choiceDifference = playerSelection - computerSelection;
  let positiveModulo = (choiceDifference + countElements) % countElements;
  if (positiveModulo % 2 === 0) {
    wins = wins + 1;
    return playerSelection + " < player wins " + computerSelection;
  } else {
    return playerSelection + " computer wins > " + computerSelection;
  }
}

reset.addEventListener('click', () => {
  stats.innerText = '-';
  playedGames.innerText = 0;
  wins = 0;
  currentGameNumber = 0;
});