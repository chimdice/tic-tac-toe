function gameBoardFeature () {

    const choosePosition = (row, column, markerIn, board) => {
        row = Number(row);
        column = Number(column);

        board[row][column] = markerIn;

    };

    const checkGameOver = (row, column, markerIn, board) => {
        let win = false;

        const checkRowVictory = () => {
            let numMarkerInRow = board[row].filter((value) => value == markerIn ).length;
            if (numMarkerInRow == 3) {
                return true
            };
            return false
        };
    
        const checkColumnVictory = () => {
            let numMarkerInCol = 0;
            for (i=0;i<3;i++) {
                if (board[i][column] == markerIn) {
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
    
            if (combined%2 == 0) {
    
                /*check left diagonal*/
                let numMarkerLeft = 0;
                for (i=0;i<3;i++) {
                    if (board[i][i] == markerIn) {
                        numMarkerLeft++;
                    };
                };
               
                /*check right diagonal*/
                let numMarkerRight = 0;
                for (i=0;i<3;i++) {
                    if (board[i][2-i] == markerIn) {
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

    return {choosePosition, checkGameOver};
};


function player (name, marker) {
    return {name, marker};
};

function playGame(player1, player2) {

    let turn = true;
    let gameWin = false;
    let turns = 0

    const message = document.querySelector("#results-screen");
    const squares = document.querySelectorAll("#square");
    const {choosePosition, checkGameOver} =  gameBoardFeature();

    let board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

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

            turns = 0;
        };
    };

    squares.forEach((square) => {
        square.addEventListener("click", () => {
            square.setAttribute("style", "font-size:50px; display:flex; justify-content:center; align-items:center")
            console.log(gameWin)
            if (! gameWin) {
               if (square.textContent.length == 0) {
                    if (turn) {
                        let rowcol = square.className.split("");
                        square.textContent = player1.marker;
                        choosePosition(rowcol[0], rowcol[1], player1.marker, board);
                        gameWin = checkGameOver(rowcol[0], rowcol[1], player1.marker, board);
                        turns++
                        checkWin(gameWin, player1);

                    } else {
                        let rowcol = square.className.split("");
                        square.textContent = player2.marker;
                        choosePosition(rowcol[0], rowcol[1], player2.marker, board);
                        gameWin = checkGameOver(rowcol[0], rowcol[1], player2.marker, board);
                        turns++
                        checkWin(gameWin, player2);

                    };

                    turn = switchTurn(turn);
                }; 
            };
            
        });
    });

    const resetBtn = document.querySelector("button[type=reset]");
    resetBtn.addEventListener("click", (event) => {

        squares.forEach((square) => {
            square.textContent = ""
        });
        
        for (i=0;i<3;i++) {
            for (j=0;j<3;j++) {
                board[i][j] = 0
            };
        };

        turns = 0;

        event.preventDefault();
    });
};

function manageGame() {
    const startBtn = document.querySelector("button[type=submit]");
    const message = document.querySelector("#results-screen");
    const player1Name = document.querySelector("#player1");
    const player2Name = document.querySelector("#player2");
    const resetBtn = document.querySelector("button[type=reset]");

    let gameOff = true;

    startBtn.addEventListener("click", (event) => {
        if (gameOff) {
            if ((player1Name.value.length > 0) && (player2Name.value.length > 0)) {
                const player1 = player(player1Name.value, "o");
                const player2 = player(player2Name.value, "x");

                if (gameOff) {
                    message.textContent = "Game currently in session.";
                    gameOff = false;
            
                    playGame(player1, player2);

                    event.preventDefault();
                };
            } else {
                alert("Please input a player(s) name!");
            };
        };

        event.preventDefault();

    });

    resetBtn.addEventListener("click", (event) => {

        message.textContent = "Enter names to start playing.";
        gameOff = true;
    
        event.preventDefault();
    });

};



manageGame();