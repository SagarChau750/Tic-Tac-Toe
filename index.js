const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];



//creating a function to initilize the game
function initGame(){
    currentPlayer="X";
    gameGrid=["" , "","","","","","","",""];

    boxes.forEach((box,index) =>{ //making ui empty
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;

        
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player-${currentPlayer}`;

}
initGame();

function checkGameOver(){
    let answer ="";

    winningPosition.forEach((position) => {
        if( (gameGrid[position[0]] !== "" ||gameGrid[position[1]] !== ""||gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) &&(gameGrid[position[1]] ===gameGrid[position[2]]) ){

            //check if winner is X
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else{
                answer = "O";
            }
            //diable pointer events 
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

            //adding bg green by adding the class
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");

            boxes[position[2]].classList.add("win");


        }

    });

    //now we have winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player-${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //if no winner is found
    let count = 0;
    gameGrid.forEach((box) =>{
        if(box !== "")
            count++;
    });

    if(count === 9){
        gameInfo.innerText= "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function swapTurn(){   //function to turn the change of player
    if(currentPlayer =="X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player = ${currentPlayer}`;
}

function handleClick(index){   //function to handle on clicking the box
    if(gameGrid[index] == ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //swaping the player
        swapTurn();

        //checking the winning condition
        checkGameOver();
    }
}

boxes.forEach((box , index) => {
    box.addEventListener("click" , () =>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);