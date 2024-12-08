let boxes = document.querySelectorAll(".box");

let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let newGameBtn_draw = document.querySelector(".new-btn-draw");

let winMsg = document.querySelector("#msg-win");
let winMsgContainer = document.querySelector(".win-msg");

let drawMsg = document.querySelector("#msg-draw");
let drawMsgContainer = document.querySelector(".draw-msg");

// 2 players -> O and X 
// alternate turns -> first O then X ....
let turn_O = true;
let clicks = 0; // no of clicks

// all win patterns
let winPat = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

const disableGame = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}
const showWinner = (winner)=>{
    winMsg.innerText = `Congratulations! we have a winner\n${winner}`;
    winMsgContainer.classList.remove("hide");
    // once winner is chosen game is disabled
    disableGame();
}
const showDraw = ()=>{
    drawMsg.innerText = `No Winner, it's a draw`;
    drawMsgContainer.classList.remove("hide");
    // once game is drawn it is disabled
    disableGame();
}
const checkWinner = ()=>{
    for(let ptn of winPat){
        // values are either X or O
        let pos1Val = boxes[ptn[0]].innerText;
        let pos2Val = boxes[ptn[1]].innerText;
        let pos3Val = boxes[ptn[2]].innerText;

        // if any of the above 3 positions is empty we won't check -> check next ptn
        if(pos1Val != "" && pos2Val != "" & pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                // we have a winner
                // console.log("winner");
                showWinner(pos1Val);
            }
        }
    }
    if(clicks === 9){
        // draw
        // console.log("draw");
        showDraw();
    }
}
boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turn_O){
            box.style.color = "#c9d4d6";
            box.innerText = "O";
            turn_O = false;
        }else{
            box.style.color = "red";
            box.innerText = "X";
            turn_O = true;
        }
        clicks++;
        // console.log(`clicks = ${clicks}`)
        // once a box is filled it can't be re-filled in a game
        box.disabled = true;
        // in each turn check whether a winning pattern is achieved or not
        checkWinner();
    })
})
const enableGame = ()=>{
    for(let box of boxes){
        box.innerText = "";
        box.disabled = false;
    }
    winMsgContainer.classList.add("hide");
    drawMsgContainer.classList.add("hide");
}
const resetGame = ()=>{
    turn_O = true;
    clicks = 0;
    enableGame();
}
resetBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);
newGameBtn_draw.addEventListener("click",resetGame);