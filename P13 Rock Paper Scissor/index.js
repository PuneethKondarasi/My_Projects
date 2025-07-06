let buttons_clicked = document.querySelectorAll("#button");
let player_chance = document.getElementById("player_default_img");
let computer_chance = document.getElementById("computer_default_img");
let player_win = document.querySelector(".player_win_count");
let tie_win = document.querySelector(".tie_win_count");
let computer_win = document.querySelector(".computer_win_count");
let winner_msg = document.querySelector(".winner");
let player_wins = 0;
let computer_wins = 0;
let tie_wins = 0;



buttons_clicked.forEach((button) => {
    button.addEventListener("click", () => {
        let random_number = Math.floor(Math.random() * 3) + 1;
        if(button.classList == "Rock"){
            player_chance.src = "./Assets/Rock.jpeg";
        }
        else if(button.classList == "Paper"){
            player_chance.src = "./Assets/Paper.jpeg";
        }
        else{
            player_chance.src = "./Assets/Scissor.jpeg";
        }
        if(random_number === 1){
            computer_chance.src = "./Assets/Rock.jpeg";
        }
        else if(random_number === 2){
            computer_chance.src = "./Assets/Paper.jpeg";
        }
        else{
            computer_chance.src = "./Assets/Scissor.jpeg";
        }
        let isWinner = checkWinner(button.classList, random_number);
    });
});

const checkWinner = (player, computer) => {
    if(player == "Rock" && computer === 2){
        computer_wins++;
        computer_win.innerHTML = computer_wins;
        winner_msg.innerHTML = `You lost!Paper beats ${player}`;
    }
    else if(player == "Paper" && computer === 1){
        player_wins++;
        player_win.innerHTML = player_wins;
        winner_msg.innerHTML = `You Won!${player} beats Rock`;
    }
    else if(player == "Scissor" && computer === 2){
        player_wins++;
        player_win.innerHTML = player_wins;
        winner_msg.innerHTML = `You Won!${player} beats Paper`;
    }
    else if(player == "Rock" && computer === 3){
        player_wins++;
        player_win.innerHTML = player_wins;
        winner_msg.innerHTML = `You Won!${player} beats Scissor`;
    }
    else if(player == "Paper" && computer === 3){
        computer_wins++;
        computer_win.innerHTML = computer_wins;
        winner_msg.innerHTML = `You lost!Scissor beats ${player}`;
    }
    else if(player == "Scissor" && computer === 1){
        computer_wins++;
        computer_win.innerHTML = computer_wins;
        winner_msg.innerHTML = `You lost!Rock beats ${player}`;
    }
    else{
        tie_wins++;
        tie_win.innerHTML = tie_wins;
        winner_msg.innerHTML = `It's a Draw!`;
    }
}