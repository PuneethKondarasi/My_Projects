let boxes = document.querySelectorAll(".box");
let instructions = document.querySelector(".Instructions");
let player_chance = document.querySelector(".player-chance");
let player_msg = document.querySelector(".player-message");
let msg_box = document.querySelector(".message-box");
let resetbtn = document.querySelector(".reset");
let playAgainbtn = document.querySelector(".play-again");

let turnX = true;
let count = 0;

const win = [[0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        instructions.classList.add("hide");
        if(turnX){
            box.innerHTML = "X";
            turnX = false;
            box.disabled = true;
            count++;
        }
        else{
            box.innerHTML = "O";
            turnX = true;
            box.disabled = true;
            count++;
        }
        let isWinner = checkWinner();
        if(!isWinner){
            if(count === 1 || count === 3 || count === 5 || count === 7){
                player_chance.classList.remove("hide");
                player_msg.innerText = "Chance of Player O!";
            }
            else if(count === 2 || count === 4 || count === 6 || count === 8){
                player_chance.classList.remove("hide");
                player_msg.innerText = "Chance of Player X!";
            }
            else if(count === 9){
                gameDraw();
            }
        }
    });
});

const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    instructions.classList.remove("hide");
    player_chance.classList.add("hide");
    msg_box.classList.add("hide");
}

const gameDraw = () => {
    player_msg.innerText = `Game was a Draw`;
    msg_box.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    player_msg.innerText = `Winner is player ${winner}`;
    disableBoxes();
    msg_box.classList.remove("hide");
  };

const checkWinner = () => {
    for (let pattern of win) {
        let valueInPosition1 = boxes[pattern[0]].innerText;
        let valueInPosition2 = boxes[pattern[1]].innerText;
        let valueInPosition3 = boxes[pattern[2]].innerText;
        if (valueInPosition1 != "" && valueInPosition2 != "" && valueInPosition3 != "") {
            if (valueInPosition1 === valueInPosition2 && valueInPosition2 === valueInPosition3  ) {
                showWinner(valueInPosition1);
                return true;
            }
        }
    }
};

resetbtn.addEventListener("click", resetGame);
playAgainbtn.addEventListener("click", resetGame);