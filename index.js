"use strict";

const elements = {
  rock: 1,
  paper: 2,
  scissors: 3,
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
  let countElements = elements.length;
  let choiceDifference = playerSelection - computerSelection;
  // Positive Remainder:
  let choiceDifferenceModulo =
    choiceDifference % elements.length < 0
      ? choiceDifference
      : choiceDifference * -1;
  if (choiceDifferenceModulo % countElements === 0) {
  } else {
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

game();
