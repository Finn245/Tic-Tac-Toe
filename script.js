// Player factory function
const Player = (name, symbol) => {
  return {
    name,
    symbol,
  };
};

const start = document.querySelector("#start");
const board = document.querySelector(".board");
const result = document.querySelector(".result"); // Select the result div

const Game = (() => {
  let currentPlayerIndex;
  let players;
  let winner;
  let gameOver = false; // Flag to track game over state

  const initializeGame = () => {
    players = [
      Player("Player1", "X"),
      Player("Player2", "O"),
    ];
    currentPlayerIndex = 0;
    winner = null;
    gameOver = false; // Reset game over flag

    // Reset the game board
    Gameboard.resetBoard();

    // Adding event listeners to each cell
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      cell.addEventListener('click', (event) => handleClick(event));
    });
  };

  const handleClick = (event) => {
    // Check if the game is over
    if (gameOver) {
      result.innerHTML = "Game over. Please restart."; // Update result div
      return; // Exit early if the game is over
    }


    // Check if the cell is already occupied
    if (event.target.innerHTML !== "") {
      return; // Exit early if the cell is already occupied
    }

    // Add logic to handle the click and update the board
    updateDisplay(event.target, players[currentPlayerIndex].symbol);

    // Switch players for the next turn
    currentPlayerIndex = 1 - currentPlayerIndex;
  };

  const updateDisplay = (cell, value) => {
    // Update the clicked cell's innerHTML with the player's symbol
    if (cell.innerHTML == "") {
      // Disable the cell
      cell.innerHTML = value;
    }

    

    // Get the index of the clicked cell
    const index = parseInt(cell.id);

    // Update the game board using the Gameboard module's updateDisplay function
    Gameboard.updateDisplay(index, value);

    // Check for a winner after updating the display
    checkForWinner();
  };

  const restart = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
      cell.innerHTML = ""; // Clear the cell content
    });
    Gameboard.resetBoard(); // Call resetBoard function
    result.innerHTML = ""; // Clear the result div
    gameOver = false; // Reset game over flag
  };

  const isBoardFilled = () => {
    const board = Gameboard.getBoard();
    return board.every(cell => cell !== "");
  };

  const checkForWinner = () => {
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
      [0, 4, 8], [2, 4, 6]              // Diagonal
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      const board = Gameboard.getBoard();

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
        result.innerHTML = `${board[a]}  is the winner!`; // Update result div
        gameOver = true; // Set gameOver flag to true when a winner is found
        return;
      }
    }

    if (isBoardFilled()) {
      result.innerHTML = "It's a draw!"; // Update result div
      gameOver = true; // Set gameOver flag to true if the board is filled
    }
  };

  return {
    initializeGame,
    restart,
    handleClick,
    updateDisplay,
    checkForWinner,
  };
})();

start.addEventListener('click', function () {
  Game.initializeGame();
});

reset = document.querySelector("#reset");
reset.addEventListener('click', function () {
  Game.restart();
});

// Gameboard module
const Gameboard = (() => {
  const board = Array(9).fill("");

  const getBoard = () => board;

  const resetBoard = () => {
    board.fill("");
    // Call Game.updateDisplay here if you want to reset the display as well
  };

  const updateDisplay = (index, value) => {
    board[index] = value;
    // Add logic to update the actual display (HTML) based on the board state
  };

  return {
    getBoard,
    resetBoard,
    updateDisplay,
  };
})();


