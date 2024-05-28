function gameBoard () {
    let board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    const choosePosition = (row, column, markerIn) => {
        row = Number(row);
        column = Number(column);

        board[row][column] = markerIn;
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

    return {board, choosePosition};
};


function player (name, marker) {
    return {name, marker};
};

function playGame(player1, player2, board, choosePosition) {

    let turn = true;
    let gameWin = false;
    let turns = 0
    const resetBtn = document.querySelector("button[type=reset]");
    const message = document.querySelector("#results-screen");


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
            board = [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ];

        } else if (turns == 9) {
            message.textContent = "Game ends in a draw. Please press reset to play again.";
            gameWin = true;
            board = [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ];

            turn = 0;
        };
    };

    const squares = document.querySelectorAll("#square");

    resetBtn.addEventListener("click", (event) => {
        gameOff = true;

        board = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];

        squares.forEach((square) => {
            square.textContent = ""
        });

        player1Name.value = "";
        player2Name.value = "";
    
        message.textContent = "Enter names to start playing.";
    
        event.preventDefault();
    });

    squares.forEach((square) => {
        square.addEventListener("click", () => {
            square.setAttribute("style", "font-size:50px; display:flex; justify-content:center; align-items:center")
            if (! gameWin) {
               if (square.textContent.length == 0) {
                    if (turn) {
                        let rowcol = square.className.split("");
                        square.textContent = player1.marker;
                        gameWin = choosePosition(rowcol[0], rowcol[1], player1.marker);
                        turns++
                        checkWin(gameWin, player1);

                    } else {
                        let rowcol = square.className.split("");
                        square.textContent = player2.marker;
                        gameWin = choosePosition(rowcol[0], rowcol[1], player2.marker);
                        turns++
                        checkWin(gameWin, player2);

                    };

                    turn = switchTurn(turn);
                }; 
            };
            
        });
    });   
};

function manageGame() {
    const startBtn = document.querySelector("button[type=submit]");
    const message = document.querySelector("#results-screen");
    let {board, choosePosition} =  gameBoard();

    let gameOff = true;

    startBtn.addEventListener("click", (event) => {
        const player1Name = document.querySelector("#player1");
        const player2Name = document.querySelector("#player2");
        if ((player1Name.value.length > 0) && (player2Name.value.length > 0)) {
            const player1 = player(player1Name.value, "o");
            const player2 = player(player2Name.value, "x");

            if (gameOff) {
                message.textContent = "Game currently in session.";
                gameOff = false;
        
                playGame(player1, player2, board, choosePosition);
        
                event.preventDefault();
            };
        } else {
            alert("Please input a player(s) name!");
        }
        
    });

};



manageGame();