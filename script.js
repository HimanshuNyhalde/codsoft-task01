let board;
const human = 'X';
const ai = 'O';
const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function startGame() {
  board = Array.from(Array(9).keys());
  document.getElementById("status").textContent = "Your turn! (You are X)";
  const cells = document.getElementById("board");
  cells.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i;
    cell.addEventListener("click", turnClick, false);
    cells.appendChild(cell);
  }
}

function turnClick(square) {
  if (typeof board[square.target.id] === 'number') {
    turn(square.target.id, human);
    if (!checkWin(board, human) && !checkTie()) {
      turn(bestSpot(), ai);
    }
  }
}

function turn(squareId, player) {
  board[squareId] = player;
  document.getElementById(squareId).textContent = player;
  let gameWon = checkWin(board, player);
  if (gameWon) gameOver(gameWon);
  checkTie();
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.includes(elem))) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player === human ? "#ffcdd2" : "#c8e6c9";
  }
  let message = gameWon.player === human ? "You win! 🎉" : "You lose! 🤖";
  document.getElementById("status").textContent = message;
  for (let cell of document.getElementsByClassName("cell")) {
    cell.removeEventListener("click", turnClick, false);
  }
}

function emptySquares() {
  return board.filter(s => typeof s === 'number');
}

function bestSpot() {
  return minimax(board, ai).index;
}

function checkTie() {
  if (emptySquares().length === 0) {
    document.getElementById("status").textContent = "It's a Tie!";
    for (let cell of document.getElementsByClassName("cell")) {
      cell.style.backgroundColor = "#eee";
      cell.removeEventListener("click", turnClick, false);
    }
    return true;
  }
  return false;
}

// Minimax Algorithm
function minimax(newBoard, player) {
  let availSpots = emptySquares();

  if (checkWin(newBoard, human)) return {score: -10};
  if (checkWin(newBoard, ai)) return {score: 10};
  if (availSpots.length === 0) return {score: 0};

  let moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player === ai) {
      let result = minimax(newBoard, human);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, ai);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }

  let bestMove;
  if (player === ai) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

startGame();
