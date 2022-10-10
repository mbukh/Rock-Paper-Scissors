"use strict";

const elements = {
  rock: 0,
  lizard: 1,
  spock: 2,
  scissors: 3,
  paper: 4,
};

function getRandomElement() {
  return Math.floor(Math.random() * elements.length);
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

function getComputerChoice() {
  return getRandomElement();
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

function playRound(playerSelection, computerSelection) {
  let winner = getWinner(playerSelection, computerSelection);
  return winner;
}

function game() {
  for (let i = 0; i < 5; i++) {
    // const playerSelection = getUserSelection();
    const computerSelection = getComputerChoice();
    console.log(playRound(playerSelection, computerSelection));
  }
}

for (let i = 0; i < 5; i++) {
  console.group(i);
  for (let j = 0; j < 5; j++) {
    console.log(getWinner(i, j));
  }
  console.groupEnd();
}
