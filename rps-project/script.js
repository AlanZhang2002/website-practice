let playerScore = 0, computerScore = 0;
let finished = false;

const buttons = document.querySelectorAll('button');
const result = document.querySelector('.result');
const score = document.querySelector('.score');
const resultFinal = document.querySelector('.result-final');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        result.textContent = playRound(button.textContent, computerPlay());
        score.textContent = playerScore + ' | ' + computerScore;
        if ((playerScore === 5 || computerScore === 5) && !finished) {
            finishGame(playerScore, computerScore);
        }
    });
})

// -=-=-=- Old code -=-=-=-
// function game() {
//     let wins = 0, losses = 0;
//     for (let i = 0; i < 5; i++) {
//         const input = prompt("Pick rock, paper, or scissors: ");
//         console.log(playRound(input, computerPlay()));
//         if (playRound(input, computerPlay()).includes("won", 4)) {
//             wins++;
//         } else if (playRound(input, computerPlay()).includes("lost", 4)) {
//             losses++;
//         }
//     }
//
//     finishGame(wins, losses);
// }

function finishGame(wins, losses) {
    if (wins > losses) {
        resultFinal.textContent = 'You beat the computer!';
    } else {
        resultFinal.textContent = 'The computer won!';
    }
    finished = true;
}

function playRound(playerSelection, computerSelection) {
    if (checkWin(playerSelection, computerSelection)) { // Win
        playerScore++;
        return "You won! Computer chose " + computerSelection;
    } else if (checkTie(playerSelection, computerSelection)) { // Tie
        return "It was a tie! You both chose " + computerSelection;
    } else { // Lose
        computerScore++;
        return "You lost! Computer chose " + computerSelection;
    }
}

function checkWin(playerSelection, computerSelection) {
    return (playerSelection.toLowerCase() === "rock" && computerSelection.toLowerCase() === "scissors") ||
        (playerSelection.toLowerCase() === "paper" && computerSelection.toLowerCase() === "rock") ||
        (playerSelection.toLowerCase() === "scissors" && computerSelection.toLowerCase() === "paper")
}

function checkTie(playerSelection, computerSelection) {
    return playerSelection.toLowerCase() === computerSelection.toLowerCase();
}

function computerPlay() {
    let pick = Math.floor(Math.random() * 3) + 1;
    if (pick === 1) {
        return "Rock";
    } else if (pick === 2) {
        return "Paper";
    } else {
        return "Scissors";
    }
}