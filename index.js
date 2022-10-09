"use strict";


const elements = {
  'rock': 1,
  'paper': 2,
  'scissors': 3
};


function getRandomElement() {
  return Math.floor(Math.random() * elements.length)
}


function getUserSelection() {
  let userInput = window.prompt();

  if (!(typeof userInput === "string" && userInput !== '' && userInput !== null)) {
    return 'error 1';
  }

  userInput = userInput.toLowerCase();

  if (!elements.hasOwnProperty(userInput)) {
    return 'error 2'
  }

  userElement = elements[userInput];
  return userElement;
}


function getComputerChoice() {
  return getRandomElement();
}


function playRound(playerSelection, computerSelection) {
  // your code here!
}


(function game() {
  for (let i = 0; i < 5; i++) {
    const playerSelection = getUserSelection();
    const computerSelection = getComputerChoice();
    console.log(playRound(playerSelection, computerSelection));
  }
})();