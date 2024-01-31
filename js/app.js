// Constants
const playGround = document.querySelector(".playground");
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const buttons = document.querySelectorAll(".btn");

// Variables
let computerScore = 0;
let playerScore = 0;
let playerSelection;
let computerSelection;
let roundWinner;
let round = 0;
let isGameOver = false;
let winner;

eventListeners();

// Event listeners
function eventListeners() {
   playGround.addEventListener("click", function (e) {
      if (e.target.id === "rock") {
         playerSelection = "rock";
      } else if (e.target.id === "paper") {
         playerSelection = "paper";
      } else if (e.target.id === "scissors") {
         playerSelection = "scissors";
      }
      else {
         console.log("please select a hand.")
      }
      game();
   });
}

function getComputerChoice() {
   let randomNumber = Math.floor(Math.random() * 100 + 1);
   if (randomNumber <= 33) {
      computerSelection = "rock";
   } else if (randomNumber <= 66 && randomNumber > 33) {
      computerSelection = "paper";
   }
   else if (randomNumber <= 100 && randomNumber > 66) {
      computerSelection = "scissors";
   }
}



function playRound(playerSelection, computerSelection) {
   if (playerSelection === "rock" && computerSelection === "scissors" ||
      playerSelection === "scissors" && computerSelection === "paper" ||
      playerSelection === "paper" && computerSelection === "rock") {
      //resolve
      playerScore++;
      roundWinner = "player";
      return roundWinner;
   } else if (
      computerSelection === "rock" && playerSelection === "scissors" ||
      computerSelection === "scissors" && playerSelection === "paper" ||
      computerSelection === "paper" && playerSelection === "rock") {
      //resolve
      computerScore++;
      roundWinner = "computer";
      return roundWinner;
   } else if (playerSelection === computerSelection) {
      roundWinner = "tie";
      return roundWinner;
   }
}

function game(winner) {
   if (isGameOver === false) {
      getComputerChoice();
      playRound(playerSelection, computerSelection);
      if (roundWinner === "player") {
         console.log(`You win. ${playerSelection} wins over ${computerSelection}. 
      Player score: ${playerScore}, Computer score: ${computerScore}.`);
      } else if (roundWinner === "computer") {
         console.error(`You lose. ${computerSelection} wins over ${playerSelection}. 
      Player score: ${playerScore}, Computer score: ${computerScore}.`);
      } else if (roundWinner === "tie") {
         console.warn(`It's a tie. ${computerSelection} ties with ${playerSelection}. 
      Player score: ${playerScore}, Computer score: ${computerScore}.`);
      }
      gameScoreCount(playerScore, computerScore);
   } else if (isGameOver === true) {
      resolveGame(winner);
      console.log(`The game is over.
      The winner is ${winner}. Feel free to refresh the page to play again.`)
   }
}

function gameScoreCount(playerScore, computerScore) {
   if (playerScore === 5 || computerScore === 5) {
      for (let i = 0; i < buttons.length; i++) {
         const element = buttons[i];
         element.disabled = true;
         isGameOver = true;
      };
   };
}

function resolveGame(winner) {
   if (playerScore === 5) {
      winner = "player";
   } else if (computerScore === 5) {
      winner = "computer";
   };
}
