
/*computer picks random number between 0 and 1 using the math.random 
 then it it rounded up to the nearest whole number by math.floor to match the options indices 0,1,2 */
 const options = ["rock","paper","scissors"];
 function getComputerChoice(){
  return options[Math.floor(Math.random() * options.length)];
 }

 //start game
let humanScore = 0;
let computerScore = 0;
let roundPlayed = 0;
const maxRounds = 5;

//Human interractivity using the buttons
const btns = document.querySelectorAll('button')
btns.forEach((button) => {
  button.addEventListener('click', () =>{
    const humanChoice = button.textContent.toLowerCase();
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
  })
})

//playing logic
function playRound(humanChoice, computerChoice){
  roundPlayed++;
  if (humanChoice === computerChoice){
    message("IT'S A TIE")
  }
  else if (humanChoice === "paper" && computerChoice === "rock"){
    message("Paper covers Rock,YOU WIN!")
    humanScore++;
  }
  else if (humanChoice === "rock" && computerChoice === "scissors"){
    message("Rock breaks Scissors, YOU WIN!")
    humanScore++;
  }
  else if (humanChoice === "scissors" && computerChoice === "paper"){
    message("Scissors cuts Paper, YOU WIN!")
    humanScore++;
  }
  else{
    message("YOU LOSE")
    computerScore++;
  }
  roundScore();

  if(roundPlayed === maxRounds){
    displayWinner();
    disableBtns();
  }
  
}

const resultdisplay = document.createElement('div');
document.body.appendChild(resultdisplay);
//function to update and display score after each round
function roundScore(){
  const currentScore = document.createElement('h6');
  currentScore.textContent = `You: ${humanScore}  Computer: ${computerScore}`;
  resultdisplay.appendChild(currentScore);
}

//function to display play message
function message(text){
  const message = document.createElement('p');
  message.textContent = text;
  resultdisplay.appendChild(message);
}


//function to roundScore and display winner after the 5 rounds 
function displayWinner(){
  const finalScore = document.createElement('h2');
  if(humanScore === computerScore){
    finalScore.textContent = "IT'S A TIE!";
  }
  else if(humanScore > computerScore){
    finalScore.textContent = "CONGRATULATIONS, YOU WIN THE GAME!";
  }
  else{
    finalScore.textContent = "COMPUTER WINS THE GAME!";
  }
  resultdisplay.appendChild(finalScore);
}

// Disable buttons to stop the game
function disableBtns() {
  btns.forEach(button => {
    button.disabled = true;
  });
}



