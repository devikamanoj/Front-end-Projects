var height = 6; //number of guesses
var width = 5; //length of the word

var row = 0; //current guess (attempt #)
var col = 0; //current letter for that attempt

var gameOver = false;
//choose a random word from the txt file

var word = "";
fetch('words.txt')
  .then(response => response.text())
  .then(text => {
    const lines = text.split('\n');
    let words = []
    for (let i = 0; i < lines.length; i++) 
    {
        words = lines[i].split(' ');
       // console.log(words);
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    word = words[randomIndex]
    console.log(word);
    word=word.toUpperCase();
  });

console.log(word);
window.onload = function(){
    startGame();
}

function startGame()
{
    // Create the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("game").appendChild(tile);
        }
    }
   // Listen for Key Press
   document.addEventListener("keyup", (e) => 
    {
        if (gameOver) 
            return; 

        // alert(e.code);
        if ("KeyA" <= e.code && e.code <= "KeyZ") 
        {
            alerts.innerHTML = "";
            if (col < width) 
            {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") 
                {
                    currTile.innerText = e.code[3];
                    currTile.style.textAlign = "center";
                    currTile.style.fontSize = "30px";
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") 
        {
            if (0 < col && col <= width) 
            {
                col -=1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") 
        {
            //check if all the tile is filled
            let allFilled = true;
            for (let c = 0; c < width; c++) 
            {
                let currTile = document.getElementById(row.toString() + '-' + c.toString());
                if (currTile.innerText == "") 
                {
                    allFilled = false;
                }
            }
            if(!allFilled)
            {
                alerts.innerHTML = "Please fill all the tiles";
                return;
            } 
            else
            {
                update();
                row += 1;
                col = 0; 
            }
        }
        if (!gameOver && row == height) 
        {
            gameOver = true;
            answer.innerText = word;
            answer.style.color = "red";
        }
    })
}
function update() 
{
    let correct = 0;
    for (let c = 0; c < width; c++) 
    {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) 
        {
            currTile.classList.add("correct");
            correct += 1;
        } 
        // Is it in the word?
        else if (word.includes(letter)) 
        {
            currTile.classList.add("present");
        } 
        // Not in the word
        else 
        {
            currTile.classList.add("absent");
        }
        if (correct == width) 
        {
            gameOver = true;
            answer.innerHTML=  word;
        }
    }
}