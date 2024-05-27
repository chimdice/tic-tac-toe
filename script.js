function gameBoard () {
    let board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    return {board};
};


function player (name, marker) {
    const {board} =  gameBoard();
    let numTurns = 0;
    const addTurn = () => {
        numTurns++;
    };

    const displayTurns = () => {
        return numTurns;
    };

    const choosePosition = (row, column) => {
        row = Number(row);
        column = Number(column);

        board[row][column] = marker;
        console.log(board);
        let win = false;

        const checkRowVictory = () => {
            let numMarkerInRow = board[row].filter((value) => value == marker ).length;
            if (numMarkerInRow == 3) {
                return true
            };
            return false
        };
    
        const checkColumnVictory = () => {
            let numMarkerInCol = 0;
            for (i=0;i<3;i++) {
                if (board[i][column] == marker) {
                    numMarkerInCol++;
                };
            };
            if (numMarkerInCol == 3) {
                return true
            };
            return false
        };
    
        const checkDiagonalVictory = () => {
            let combined = row + column;
    
            console.log(combined);
            if (combined%2 == 0) {
    
                /*check left diagonal*/
                let numMarkerLeft = 0;
                for (i=0;i<3;i++) {
                    if (board[i][i] == marker) {
                        numMarkerLeft++;
                    };
                };
               
                /*check right diagonal*/
                let numMarkerRight = 0;
                for (i=0;i<3;i++) {
                    if (board[i][2-i] == marker) {
                        numMarkerRight++;
                    };
                };
                
                if (row == 1 && column == 1) {
                    if (numMarkerLeft == 3 || numMarkerRight == 3) {
                        return true
                    };
                } else if (row - column == 0) {
                    if (numMarkerLeft == 3) {
                        return true 
                    };
                } else if (row + column == 2) {
                    if (numMarkerRight == 3) {
                        return true
                    };
                };
    
            };
    
            return false
        };
    
        
        if (checkRowVictory()) {
            win = true;
        } else if (checkColumnVictory()) {
            win = true;
        } else if (checkDiagonalVictory()) {
            win = true
        } 

        return win
        
    };

    return {name, marker, board, addTurn, displayTurns, choosePosition};
};

function playGame(player1, player2) {
    
    let turn = true;
    let gameWin = false;
    let turns = 0

    function switchTurn (turn) {
        if (turn) {
            return false;
        } else {
            return true
        };
    };

    function checkWin (gameWin, player) {
        if (gameWin) {
            message.textContent = `${player.name} won! Please press reset to play again.`;
        
        } else if (turns == 9) {
            message.textContent = "Game ends in a draw. Please press reset to play again.";
            gameWin = true;
        };
    };

    const squares = document.querySelectorAll("#square");

    
    squares.forEach((square) => {
        square.addEventListener("click", () => {
            square.setAttribute("style", "font-size:50px; display:flex; justify-content:center; align-items:center")
            if (! gameWin) {
               if (square.textContent.length == 0) {
                    if (turn) {
                        let rowcol = square.className.split("");
                        square.textContent = player1.marker;
                        gameWin = player1.choosePosition(rowcol[0], rowcol[1]);
                        turns++
                        checkWin(gameWin, player1);
                    } else {
                        let rowcol = square.className.split("");
                        square.textContent = player2.marker;
                        gameWin = player2.choosePosition(rowcol[0], rowcol[1]);
                        turns++
                        checkWin(gameWin, player2);
                    };
                    
                    if (gameWin) {
                        player1.board = [
                            [0,0,0],
                            [0,0,0],
                            [0,0,0]
                        ];
                        console.log(player1.board)

                        player2.board = [
                            [0,0,0],
                            [0,0,0],
                            [0,0,0]
                        ];
                        console.log(player2.board)
                    };

                    turn = switchTurn(turn);
                }; 
            };
            
        });
    });   
};

const startBtn = document.querySelector("button[type=start]");
const resetBtn = document.querySelector("button[type=reset]");
const message = document.querySelector("#results-screen");
let gameOff = true;

startBtn.addEventListener("click", (event) => {
    if (gameOff) {
        message.textContent = "Game currently in session.";
        const player1Name = document.querySelector("#player1");
        const player2Name = document.querySelector("#player2");
        gameOff = false;

        const player1 = player(player1Name.value, "o");
        const player2 = player(player2Name.value, "x");

        player1Name.value = "";
        player2Name.value = "";

        playGame(player1, player2);

        event.preventDefault();
    };
})

resetBtn.addEventListener("click", (event) => {
    gameOff = true;
    const squares = document.querySelectorAll("#square");

    const player1Name = document.querySelector("#player1");
    player1Name.value = "";

    const player2Name = document.querySelector("#player2");
    player2Name.value = "";

    squares.forEach((square) => {
        square.textContent = ""
    });

    message.textContent = "Enter names to start playing.";

    event.preventDefault();
});