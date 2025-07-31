
//message display module
const messageDisplayer = (() =>{
  const displayMessage = (message) =>{
    document.querySelector("#message").innerHTML = message;
  }
  return {
    displayMessage
  };
})();

//creating IIFE for the gameboard handle all game logics
/*const iife = ((){
   secret functions and methods
})();*/

const gameBoard = (() =>{
  let board = ["", "", "", "", "", "", "", "", ""];

  //display the game board
  const displayBoard = () =>{
    let boardHTML = "";
    board.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`
    })
    document.querySelector("#board").innerHTML= boardHTML

    //making each of the squares clickable
    const squares = document.querySelectorAll(".square")
    //attaching a click event to each of the squares
    squares.forEach((square)=>{
      square.addEventListener("click", gameController.handleClick); //passes a known function no need for ()
    }) 
  }
  const update = (index, value) =>{
      board[index] = value;
      displayBoard();
    }
      
    //creating the gameBoard accessor function
    const getgameBoard = () => board;

    return {
      displayBoard,
      update,
      getgameBoard      
    }
})(); 


//player module
//creating a function for the players
const createPlayer = (name, mark) =>{
  return {
    name,
    mark
  }
}



//creating the IIFE for the game controller
const gameController = (() => {
  let players = []; //aray for the players
  let currentPlayerIndex;  //picks current player by array index
  let gameOver; //flag for the game over
  
  //function to create logic for the game to start
  const startGame = () =>{
    //taking player values from the input
    const player1 = document.querySelector("#player1").value.trim();
    const player2 = document.querySelector("#player2").value.trim();

    // Ensure games only starts if both players are named
    if (!player1 || !player2) {
      alert("PLEASE ENTER NAME OF BOTH PLAYERS TO START THE GAME!")
      return;
    }

    //factory to create player so it can be used multiple time
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O")
    ]

    currentPlayerIndex = 0;
    gameOver = false;
    gameBoard.displayBoard();
    
  }

  //creating the handle click function
  const handleClick = (e) =>{
    if (gameOver){
      return;
    }
    let index = parseInt(e.target.id.split("-")[1]);

    // prevent overwriting an already filled square
    if (gameBoard.getgameBoard()[index] !== "")return;

    //update the board with the currentplayer mark
    gameBoard.update(index, players[currentPlayerIndex].mark);

    //checking for winner
    if(checkforWin(gameBoard.getgameBoard(),players[currentPlayerIndex].mark)){
      gameOver = true;
    //dsplaying the winner an tie  
      messageDisplayer.displayMessage(`${players[currentPlayerIndex].name} WINS!`)
    }else if (checkfortie(gameBoard.getgameBoard())){
      gameOver = true;
      messageDisplayer.displayMessage(`IT'S A TIE`);
    }
    //allow switching between players 
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  //restart the game
  const restartGame = () =>{
    for (let i=0; i<9; i++){
      gameBoard.update(i,"");
    }
    gameBoard.displayBoard();
    gameOver = false;
    //make message from previous game disappear when you restart game
    document.querySelector("#message").innerHTML= "";
  }
  return{
    startGame,
    restartGame,
    handleClick
  }
})();

function checkforWin (board){
  const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

  ]
  for( let i=0; i<winningCombination.length; i++){
    const [a, b, c] = winningCombination [i];
    if (board[a] && board[a] === board[b] && board[b] === board[c] && board){
      return true;
    }
  }
  return false; 
}
function checkfortie(board){
  return board.every(cell =>cell !== "")
}


//DOM for startBtn
const startBtn = document.querySelector("#startBtn");
//Adding event listener for the startBtn
startBtn.addEventListener("click", () =>{ //passess an anonymous function hence the ()
  gameController.startGame();
})

//DOM for restartBtn
const restartBtn = document.querySelector("#restartBtn");
//Adding event listener for the restartBtn
restartBtn.addEventListener ("click", () =>{
  gameController.restartGame();
})

