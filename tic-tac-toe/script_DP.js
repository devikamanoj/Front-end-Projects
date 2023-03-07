let playerText = document.getElementById('player-text')
let restartBtn = document.getElementById('restartButton')
let boxes = Array.from(document.getElementsByClassName('cell'))
let undoBtn = document.getElementById('undoButton')
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let gameOver=false;
let ifTie=false;
let spaces = Array(9).fill(null)
let moves = [];
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) 
{
  const id = e.target.id
  if(!gameOver) 
  {
    if(!spaces[id])
    {
      spaces[id] = currentPlayer
      e.target.innerText = currentPlayer
      moves.push(id)
      if(playerHasWon() !==false)
      {
        playerText.innerHTML = `${currentPlayer} has won!`
        playerText.style.color = winnerIndicator
        let winning_blocks = playerHasWon()
        gameOver=true;
        //change the color of the block
        boxes[winning_blocks[0]].style.backgroundColor = winnerIndicator;
        boxes[winning_blocks[1]].style.backgroundColor = winnerIndicator;
        boxes[winning_blocks[2]].style.backgroundColor = winnerIndicator;
        return
      }
      else if(checkTie())
      {
        return
      }
      else
      {
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
      }      
    }
  }
}
// check if tie
function checkTie() 
{
  if(!spaces.includes(null)) 
  {
    playerText.innerHTML = `It's a Draw!`
    playerText.style.color = winnerIndicator
    gameOver=true;
    return true;
  }
}
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic-Tac-Toe'
    playerText.style.color = 'black'
    currentPlayer = X_TEXT
    gameOver=false;
}
//unfo function
undoBtn.addEventListener('click', undo)
function undo() {
  if(!gameOver && ifTie==false)
  {
    spaces[moves[moves.length-1]] = null
    boxes[moves[moves.length-1]].innerText = ''
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    undoBtn.style.backgroundColor = winnerIndicator;
  }
}
startGame()