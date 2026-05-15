const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X'; 
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    if (!clickedCell.classList.contains('cell') || currentPlayer !== 'X' || !isGameActive) return;

    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    if (gameState[clickedCellIndex] !== "") return;

    makeMove(clickedCellIndex, 'X');

    if (isGameActive) {
        currentPlayer = 'O';
        statusText.innerText = "電腦思考中...";
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    if (!isGameActive) return;

    let emptyCells = [];
    gameState.forEach((cell, index) => {
        if (cell === "") emptyCells.push(index);
    });

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerIndex = emptyCells[randomIndex];
        
        makeMove(computerIndex, 'O');

        if (isGameActive) {
            currentPlayer = 'X';
            statusText.innerText = "輪到你 (X) 了";
        }
    }
}

function makeMove(index, player) {
    gameState[index] = player;
    cells[index].innerText = player;
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") continue;
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = currentPlayer === 'X' ? "恭喜你贏了！🎉" : "你輸了，電腦獲勝！🤖";
        isGameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.innerText = "平手！雙方勢均力敵。";
        isGameActive = false;
        return;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    statusText.innerText = "遊戲開始！你拿 X，請先下。";
    cells.forEach(cell => cell.innerText = "");
}

board.addEventListener('click', handleCellClick);
restartBtn.addEventListener('click', restartGame);
