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

const elementsDiv = [
  document.querySelector("#a"),
  document.querySelector("#b"),
  document.querySelector("#c"),
  document.querySelector("#d"),
  document.querySelector("#e"),
];
elementsDiv.forEach((el, idx) => el.addEventListener("click", el => game(idx)));
  
function game(playerElement) {
    if (++currentGameNumber > 5) return 'Game Over.';
    console.group("Round " + currentGameNumber);
    // const playerSelection = getUserSelection();
    const playerSelection = playerElement;
    const computerSelection = getComputerChoice();
    console.log(playRound(playerSelection, computerSelection));
    console.groupEnd();
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

function getUserSelection() {
  let userInput = window.prompt();

  if (
    !(typeof userInput === "string" && userInput !== "" && userInput !== null)
  ) {
    return "error 1";
  }

  userInput = userInput.toLowerCase();

  if (!elements.hasOwnProperty(userInput)) {
    return "error 2";
  }

  userElement = elements[userInput];
  return userElement;
}

function getWinner(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "ties";
  }
  let countElements = Object.keys(elements).length;
  let choiceDifference = playerSelection - computerSelection;
  let positiveModulo = (choiceDifference + countElements) % countElements;
  if (positiveModulo % 2 === 0) {
    return playerSelection + " < player wins " + computerSelection;
  } else {
    return playerSelection + " computer wins > " + computerSelection;
  }
}


