document.addEventListener('DOMContentLoaded', () => { // Add DOMContentLoaded event listener to wrap all code
  console.log('DOM fully loaded and parsed');
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1; // active player: 1 or 2 - Player 1 begins game
const playerOne = document.querySelector('#player1'); // player 1 div
const playerTwo = document.querySelector('#player2'); // player 2 div
console.log(`Current Player is: ${currPlayer}`);
const board = []; // array of rows, each row is array of cells  (board[y][x])
const resetButton = document.querySelector('#reset-button');
// Simple page reset for reload/start over button
resetButton.addEventListener('click', () => location.reload());

// makeBoard function to create in-memory game board structure and determine movement 
// board = array of rows, each row is array of cells (board[y][x])
const makeBoard = () => { // convert to arrow function
  // COMPLETE - TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) { // loop to build board, y (vertical) axis, 6 arrays
    // console.log('y is: ', y+1) // log to confirm understanding of y variable, confirm correct num of y (6)
    board.push(Array.from({ length: WIDTH }));  // Use Array.from method to push horizonal axis
  }
};

/** makeHtmlBoard: make HTML table and row of column tops. */
const makeHtmlBoard = () => {
  // COMPLETE - TODO: get "htmlBoard" variable from the item in HTML w/ID of "board" 
  const htmlBoard = document.querySelector('#board'); // Get the html element w/ID of 'board', assign to htmlBoard variable
  // COMPLETE - TODO: add comment for this code 
  const top = document.createElement("tr"); // Create tr element, assign to top variable - Where game pieces will 'drop' from
  top.setAttribute("id", "column-top"); // Set an ID of 'column-top' to tr(top) element
  top.addEventListener("click", handleClick); // Add click listener to tr(top) element to call the handleClick function

  for (let x = 0; x < WIDTH; x++) { // iterate over the game table rows and cells 
    // console.log('x is: ', x+1) // log to confirm correct num of x (7)
    const headCell = document.createElement("td"); // create td elements, assign to headCell variable
    headCell.setAttribute("id", x); // Add an ID of 0-6 to each headCell
    top.append(headCell); // Append headCell to top(tr)
  }
  htmlBoard.append(top); // Append top(tr) to the htmlBoard(table)

  // COMPLETE - TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { // Loop to create row based on HEIGHT variable
    const row = document.createElement("tr"); // Create tr elements, row variable
    for (let x = 0; x < WIDTH; x++) { // Loop to create game cells based on WIDTH variable
      const cell = document.createElement("td"); // create td elements, cell variable
      cell.setAttribute("id", `${y}-${x}`); // add IDs to cells, y (0-5), x (0-6)
      row.append(cell); // append cells to rows (tr elements)
    }
    htmlBoard.append(row);  // append rows to htmlBoard (table)
  }
}



/** findSpotForCol: given column x, return top empty y (null if filled) */
const findSpotForCol = (x) => {
  // COMPLETE - TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--){ // iterate over column, top to bottom, look for empty y
    if (!board[y][x]) { // if cell in column false, return y
      return y;
    }
  }
  return null; // return null if column is filled
}

/** placeInTable: update DOM to place piece into HTML table of board */
const placeInTable = (y, x) => {
  // COMPLETE - TODO: make a div and insert into correct table cell
  const piece = document.createElement('div'); // create the game play piece (div element)
  piece.classList.add('piece');
  (currPlayer === 1) ? piece.classList.add('p1') : piece.classList.add('p2'); // Use ternary operator to apply p1 or p2 class based on currPlayer val
  const cell = document.getElementById(`${y}-${x}`); // grab the table cell by y-x id coordinates built in makeHthmlBoard() 
  cell.append(piece); // append the play piece to the cell
}

/** endGame: announce game end */
const endGame = (msg) => {
  // COMPLETE - TODO: pop up alert message
  setTimeout(() => { // Add delay for win message to allow for winning drop to complete
    alert(msg)
  }, 200)
  // Remove the event listener from top table column to prevent additional moves after win:
  document.querySelector('#column-top').removeEventListener('click', handleClick);
}

/** handleClick: handle click of column top to play piece */
const handleClick = (evt) => {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // COMPLETE - TODO: add line to update in-memory board
  board[y][x] = currPlayer; // lock in the player piece based on board row coordinates
  placeInTable(y, x); // call placeInTable function to update the DOM with piece location
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} wins!`);
  }
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(arr => arr.every(cell => cell))){ // test if all array elements are taken
    return endGame('The game is a tie.');
  }
  // switch players
  // COMPLETE - TODO: switch currPlayer 1 <-> 2
  (currPlayer === 1) ? currPlayer = 2 : currPlayer = 1; // Use ternary function to switch the current player
  // Add simple player identiy switching logic:
  if (currPlayer === 2){
    playerOne.classList.remove('active-player');
    playerTwo.classList.add('active-player')
  } else {
    playerOne.classList.add('active-player');
    playerTwo.classList.remove('active-player');
  }
  console.log(`Current Player is: ${currPlayer}`) // log to confirm switch player working properly

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
const checkForWin = () => {
  const _win = (cells) => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // COMPLETE - TODO: read and understand this code. Add comments to help you.
  // loop to determine if win scenario is achieved 
  for (let y = 0; y < HEIGHT; y++) { // Outer loop through the board columns
    for (let x = 0; x < WIDTH; x++) { // Inner loop through the board rows
      const horiz = [ // horizontal win conditions
        [y, x], 
        [y, x + 1], 
        [y, x + 2], 
        [y, x + 3]
      ];
      const vert = [ // vertical win conditions
        [y, x], 
        [y + 1, x], 
        [y + 2, x], 
        [y + 3, x]
      ];
      const diagDR = [ // diagonal right win conditions
        [y, x], 
        [y + 1, x + 1], 
        [y + 2, x + 2], 
        [y + 3, x + 3]
      ];
      const diagDL = [ // diagonal left win conditions
        [y, x], 
        [y + 1, x - 1], 
        [y + 2, x - 2], 
        [y + 3, x - 3]
      ];
      // if any of the win conditions are true, return true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

});