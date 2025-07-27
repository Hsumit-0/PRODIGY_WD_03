let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function makeMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  document.getElementsByClassName("cell")[index].textContent = currentPlayer;

  if (checkWinner()) {
    document.getElementById("status").textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    highlightWinner();
  } else if (board.every(cell => cell !== "")) {
    document.getElementById("status").textContent = "It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function highlightWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  winPatterns.forEach(pattern => {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      const cells = document.getElementsByClassName("cell");
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
    }
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  const cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.textContent = "";
    cell.classList.remove("winner");
  }
  document.getElementById("status").textContent = "Player X's Turn";
}