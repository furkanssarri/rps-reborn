// Constants
const dateBox = document.querySelector(".date");
const playGround = document.querySelector(".playground");
const hands = document.querySelector(".hands");
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const buttons = document.querySelectorAll("button");
const announcer = document.getElementById("announcer")
const description = document.getElementById("description");
const para = document.querySelectorAll(".para");
const announceArea = document.querySelector(".announce-area");



// UI-Related Constants
const themeButtons = document.querySelectorAll("li");
const menu = document.querySelector('#menu');
const themeSelectors = menu.childNodes;
const hamburger = document.querySelector(".hamburger");
const menuIcon = hamburger.firstElementChild;
const closeIcon = hamburger.lastElementChild;

function toggleMenu() {
   if (menu.classList.contains("showMenu")) {
      menu.classList.remove("showMenu");
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
   } else {
      menu.classList.add("showMenu");
      closeIcon.style.display = "block";
      menuIcon.style.display = "none";
   }
}



hamburger.addEventListener("click", toggleMenu);

// Variables
let computerScore = 0;
let playerScore = 0;
let playerSelection;
let computerSelection;
let roundWinner;
let round = 0;
let isGameOver = false;
let winner;
let defaultTheme;

let date = new Date().toLocaleDateString();

dateBox.textContent = date;

// Theme Variables
const setTheme = (theme) => {
   document.documentElement.className = theme;
   localStorage.setItem('theme', theme);
};
const getTheme = () => {
   const theme = localStorage.getItem('theme');
   setTheme(theme);
}
getTheme();

// Event listeners
eventListeners();

function eventListeners() {
   // playGround.addEventListener("click", function (e) {
   //    if (e.target.id === "rock") {
   //       playerSelection = "rock";
   //    } else if (e.target.id === "paper") {
   //       playerSelection = "paper";
   //    } else if (e.target.id === "scissors") {
   //       playerSelection = "scissors";
   //    }
   //    else {
   //       if (isGameOver === true) {
   //          console.log(`You cannot select anymore hands because the game is over. Please refresh the page if you want to play again.`);
   //       }
   //    }
   //    game();
   // });
   buttons.forEach(button => {
      button.addEventListener("click", (e) => {
         if (e.target.id === "rock") {
            playerSelection = "rock";
         } else if (e.target.id === "paper") {
            playerSelection = "paper";
         } else if (e.target.id === "scissors") {
            playerSelection = "scissors";
         }
         else {
            if (isGameOver === true) {
               console.log(`You cannot select anymore hands because the game is over. Please refresh the page if you want to play again.`);
            }
         }
         game();
      })
   });
}


function convertHands(playerSelection, computerSelection) {
   let rock = "✊",
   paper = "✋",
   scissors = "✌️";
   switch (playerSelection) {
      case "rock":
         hands.firstChild.nextSibling.textContent = rock;
         break;
      case "paper":
         hands.firstChild.nextSibling.textContent = paper;
         break;
      case "scissors":
         hands.firstChild.nextSibling.textContent = scissors;
         break;
   }
   switch (computerSelection) {
      case "rock":
         hands.lastChild.previousSibling.textContent = rock;
         break;
      case "paper":
         hands.lastChild.previousSibling.textContent = paper;
         break;
      case "scissors":
         hands.lastChild.previousSibling.textContent = scissors;
         break;
   }
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
   convertHands(playerSelection, computerSelection);
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
   getComputerChoice();
   playRound(playerSelection, computerSelection);
   if (roundWinner === "player") {
      description.textContent = `You win. ${playerSelection} wins over ${computerSelection}.`
      para[0].textContent = playerScore;
   } else if (roundWinner === "computer") {
      description.textContent = `You lose. ${computerSelection} wins over ${playerSelection}.`
      para[1].textContent = computerScore;
   } else if (roundWinner === "tie") {
      description.textContent = `It's a tie. ${computerSelection} ties with ${playerSelection}. `
   }
   if (playerScore === 5 && computerScore < 5 && computerScore >= 0) {
      winner = "player";
   } else if (computerScore === 5 && playerScore < 5 && playerScore >= 0) {
      winner = "computer";
   }
   gameScoreCount(playerScore, computerScore, winner);
}

function gameScoreCount(playerScore, computerScore, winner) {
   if (playerScore === 5 || computerScore === 5) {
      for (let i = 0; i < buttons.length; i++) {
         const element = buttons[i];
         element.disabled = true;
         isGameOver = true;
         resolveGame(winner);
         let gameWinner = winner[0].toUpperCase() + winner.slice(1);
         announcer.textContent = "GAME OVER";
         description.textContent = `The winner is ${gameWinner}. Click the button to play again.`;
      };
      let replay = document.createElement("a");
      replay.classList.add("btn", "btn-dark");
      replay.textContent = "Replay";
      announceArea.appendChild(replay);
   };
}

function resolveGame(winner) {
   if (playerScore === 5) {
      winner = "player";
   } else if (computerScore === 5) {
      winner = "computer";
   };
}