// Constants
const playGround = document.querySelector(".playground");
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const buttons = document.querySelectorAll("a");

// Variables
let computerScore = 0;
let playerScore = 0;
let playerSelection;
let computerSelection;
let winner;
let round = 0;

eventListeners();

// Event listeners
function eventListeners() {
   playGround.addEventListener("click", function (e) {
      // console.log(e.target.id);
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
      winner = "player";
      return winner;
   } else if (
      computerSelection === "rock" && playerSelection === "scissors" ||
      computerSelection === "scissors" && playerSelection === "paper" ||
      computerSelection === "paper" && playerSelection === "rock") {
      //resolve
      computerScore++;
      winner = "computer";
      return winner;
   } else if (playerSelection === computerSelection) {
      winner = "tie";
      return winner;
   }
}

function game() {
   getComputerChoice();
   playRound(playerSelection, computerSelection);
   if (winner === "player") {
      console.log(`You win. ${playerSelection} wins over ${computerSelection}. 
      Player score: ${playerScore}, Computer score: ${computerScore}.`);
   } else if (winner === "computer") {
      console.error(`You lose. ${computerSelection} wins over ${playerSelection}. 
      Player score: ${playerScore}, Computer score: ${computerScore}.`);
   } else if (winner === "tie") {
      console.warn(`It's a tie. ${computerSelection} ties with ${playerSelection}. 
      Player score: ${playerScore}, Computer score: ${computerScore}.`);

   }
   gameScoreCount(playerScore, computerScore);
}

function gameScoreCount(playerScore, computerScore) {
   for (let i = 0; i < buttons.length; i++) {
      const element = buttons[i];
      element.addAttribute("disabled", true);
      console.log(element)
   }
   // if (playerScore === 5 || computerScore === 5) {
      
   // }
}

