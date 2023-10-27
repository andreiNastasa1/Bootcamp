const gameBoard = document.querySelector('#gameboard')
const infoDisplay = document.querySelector('#info')

const startCells = [
    "", "", "", "", "", "", "", "", ""
]

let go = "cross"
infoDisplay.textContent = "Cross goes first"
function createBoard() {
    startCells.forEach((cell, index) => {

        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        gameBoard.append(cellElement)
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })
}

createBoard()



function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "it is now " + go + "'s go."
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    let crossWins = false;
    let circleWins = false;

    winningCombos.forEach(array => {
        if (array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'))) {
            crossWins = true;
        }
        if (array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'))) {
            circleWins = true;
        }
    });

    if (crossWins) {
        infoDisplay.textContent = "Cross Wins!";
        disableClicks();
    } else if (circleWins) {
        infoDisplay.textContent = "Circle Wins!";
        disableClicks();
    }
}

function disableClicks() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => square.removeEventListener("click", addGo));
}