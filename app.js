console.log('Connect Four Scripts Connected');
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
const currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

// makeBoard function to create in-memory game board structure and determine movement 
// board = array of rows, each row is array of cells (board[y][x])
function makeBoard() {
  // COMPLETE - TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y=0; y<HEIGHT; y++) { // loop to build board, y (vertical) axis, 6 arrays
    console.log(y)
    board.push(Array.from({ length: WIDTH }));  // Use Array.from method to push horizonal axis
  }
};

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // COMPLETE - TODO: get "htmlBoard" variable from the item in HTML w/ID of "board" 
  const htmlBoard = document.querySelector('#board'); // Get the html element w/ID of 'board', assign to htmlBoard variable
  // COMPLETE - TODO: add comment for this code 
  const top = document.createElement("tr"); // Create tr element, assign to top variable - Where game pieces will 'drop' from
  top.setAttribute("id", "column-top"); // Set an ID of 'column-top' to tr(top) element
  top.addEventListener("click", handleClick); // Add click listener to tr(top) element to call the handleClick function

  for (let x = 0; x < WIDTH; x++) { // iterate over the game table rows and cells 
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

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // COMPLETE - TODO: make a div and insert into correct table cell
  const piece = document.createElement('div'); // create the game play piece (div element)
  piece.classList.add('piece');
  currPlayer === 1 ? piece.classList.add('p1') : piece.classList.add('p2'); // Use ternary operator to apply p1 or p2 class based on currPlayer val
  const cell = document.getElementById(`${y}-${x}`); // grab the table cell by y-x id coordinates built in makeHthmlBoard() 
  cell.append(piece); // append the play piece to the cell
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
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

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();