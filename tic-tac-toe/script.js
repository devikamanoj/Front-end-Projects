// variables
let board;

// initialize the board
function init() 
{
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
}
// starting
function startGame() 
{
  init();
}

// handle click on reset button
function handleReset() 
{
  init();
}

