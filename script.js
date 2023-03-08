// Define the initial state of the chess board
const initialState = [
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
];

// Create the chess board
const board = document.getElementById('board');
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const square = document.createElement('div');
    square.classList.add('square');
    if ((i + j) % 2 === 0) {
      square.classList.add('white');
    } else {
      square.classList.add('black');
    }
    const piece = document.createElement('div');
    piece.classList.add('piece');
    if (initialState[i][j] !== ' ') {
      piece.textContent = initialState[i][j];
      if (initialState[i][j] === initialState[i][j].toUpperCase()) {
        piece.classList.add('piece-white');
      } else {
        piece.classList.add('piece-black');
      }
    }
    square.appendChild(piece);
    board.appendChild(square);
  }
}
