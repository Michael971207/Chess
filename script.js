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
let selectedSquare = null;
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const square = document.createElement('div');
    square.classList.add('square');
    if ((i + j) % 2 === 0) {
      square.classList.add('white');
    } else {
      square.classList.add('black');
    }
    square.dataset.x = j;
    square.dataset.y = i;
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

    // Handle user input
    square.addEventListener('click', () => {
      if (selectedSquare === null) {
        if (piece.textContent !== '') {
          // Select the piece
          selectedSquare = square;
          selectedSquare.classList.add('selected');
        }
      } else {
        if (square === selectedSquare) {
          // Deselect the piece
          selectedSquare.classList.remove('selected');
          selectedSquare = null;
        } else {
          // Move the piece
          const fromX = parseInt(selectedSquare.dataset.x);
          const fromY = parseInt(selectedSquare.dataset.y);
          const toX = parseInt(square.dataset.x);
          const toY = parseInt(square.dataset.y);
          const piece = initialState[fromY][fromX];
          const target = initialState[toY][toX];
          if (isValidMove(piece, target, fromX, fromY, toX, toY)) {
            // Update the board state
            initialState[toY][toX] = piece;
            initialState[fromY][fromX] = ' ';
            // Move the piece on the board
            square.removeChild(square.firstChild);
            square.appendChild(selectedSquare.firstChild);
            // Deselect the piece
            selectedSquare.classList.remove('selected');
            selectedSquare = null;
            // Toggle the current player
            currentPlayer = currentPlayer === 'w' ? 'b' : 'w';
            // Check for checkmate or stalemate
            if (isCheckmate(currentPlayer)) {
              alert('Checkmate!');
            } else if (isStalemate(currentPlayer)) {
              alert('Stalemate!');
            }
          } else {
            alert('Invalid move!');
          }
        }
      }
    });
  }
}

// Determine if a move is valid
function isValidMove(piece, target, fromX, fromY, toX, toY) {
  // Check if the piece and target are on different teams
  if ((piece.toUpperCase() === piece && target.toUpperCase() === target) ||
      (piece.toLowerCase() === piece && target.toLowerCase() === target)) {
    return false;
  }
  // Check if the piece can move to the target position
  switch (piece.toLowerCase()) {
    case 'p':
      const dy = toY - fromY;
      const dx = Math.abs(toX - fromX);
      if (dy === -1 && dx === 0 && target === ' ') {
        // Move forward one square
        return true;
      } else if (dy === -2 && dx === 0 && fromY === 6 && target === ' ' &&
          initialState[toY + 1][toX] === ' ') {
        // Move forward two squares from the starting position
        return true;
      } else if (dy === -1 && dx === 1 && target !== ' ' &&
          target.toUpperCase() === target) {
        // Capture a piece diagonally
        return true;
      } else {
        return false;
      }
    case 'r':
      if (fromX !== toX && fromY !== toY) {
        // The rook can only move horizontally or vertically
        return false;
      }
      const dyR = toY - fromY;
      const dxR = toX - fromX;
      const signR = Math.sign(dxR) || Math.sign(dyR);
      for (let i = 1; i < Math.max(Math.abs(dyR), Math.abs(dxR)); i++) {
        const x = fromX + i * signR;
        const y = fromY + i * signR;
        if (initialState[y][x] !== ' ') {
          // There is a piece blocking the way
          return false;
        }
      }
      return true;
    case 'n':
      const dyN = Math.abs(toY - fromY);
      const dxN = Math.abs(toX - fromX);
      if ((dyN === 2 && dxN === 1) || (dyN === 1 && dxN === 2)) {
        // The knight moves in an L-shape
        return true;
      } else {
        return false;
      }
    case 'b':
      if (Math.abs(fromX - toX) !== Math.abs(fromY - toY)) {
        // The bishop can only move diagonally
        return false;
      }
      const dyB = toY - fromY;
      const dxB = toX - fromX;
      const signBx = Math.sign(dxB);
      const signBy = Math.sign(dyB);
      for (let i = 1; i < Math.abs(dyB); i++) {
        const x = fromX + i * signBx;
        const y = fromY + i * signBy;
        if (initialState[y][x] !== ' ') {
          // There is a piece blocking the way
          return false;
        }
      }
      return true;
    case 'q':
      if (fromX !== toX && fromY !== toY && Math.abs(fromX - toX) !== Math.abs(fromY - toY)) {
        // The queen can move horizontally, vertically, or diagonally
        return false;
      }
      const dyQ = toY - fromY;
      const dxQ = toX - fromX;
      const case 'q':
  if (fromX !== toX && fromY !== toY && Math.abs(fromX - toX) !== Math.abs(fromY - toY)) {
    // The queen can move horizontally, vertically, or diagonally
    return false;
  }
  const dyQ = toY - fromY;
  const dxQ = toX - fromX;
  const signQx = Math.sign(dxQ);
  const signQy = Math.sign(dyQ);
  if (fromX === toX) {
    // The queen is moving vertically
    for (let i = 1; i < Math.abs(dyQ); i++) {
      const y = fromY + i * signQy;
      if (initialState[y][fromX] !== ' ') {
        // There is a piece blocking the way
        return false;
      }
    }
    return true;
  } else if (fromY === toY) {
    // The queen is moving horizontally
    for (let i = 1; i < Math.abs(dxQ); i++) {
      const x = fromX + i * signQx;
      if (initialState[fromY][x] !== ' ') {
        // There is a piece blocking the way
        return false;
      }
    }
    return true;
  } else {
    // The queen is moving diagonally
    for (let i = 1; i < Math.abs(dyQ); i++) {
      const x = fromX + i * signQx;
      const y = fromY + i * signQy;
      if (initialState[y][x] !== ' ') {
        // There is a piece blocking the way
        return false;
      }
    }
    return true;
  }


