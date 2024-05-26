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
    
        const checkDraw = () => {
            let fullrows = 0
    
            for (i=0;i<3;i++) {
                if (! board[i].includes(0)) {
                    fullrows++;
                };
            };
    
            if (fullrows == 3) {
                return true;
            } else {
                return false;
            };
        };
    
        
        if (checkRowVictory()) {
            win = true;
        } else if (checkColumnVictory()) {
            win = true;
        } else if (checkDiagonalVictory()) {
            win = true
        } else if (checkDraw()) {
            console.log("game ends as draw")
        }

        if (win) {
            console.log(name +" won the game")
        }
        
    };

    return {name, marker, addTurn, displayTurns, choosePosition};
};

function playGame(player1, player2) {
    
    let turn = true;
    let gameContinue = true;

    function switchTurn (turn) {
        if (turn) {
            return false;
        } else {
            return true
        };
    };

    const squares = document.querySelectorAll("#square");

    squares.forEach((square) => {
        square.addEventListener("click", () => {
            if (square.textContent.length == 0) {
                if (turn) {
                    let rowcol = square.className.split("");
                    square.textContent = player1.marker;
                    player1.choosePosition(rowcol[0], rowcol[1])
                } else {
                    let rowcol = square.className.split("");
                    square.textContent = player2.marker;
                    player2.choosePosition(rowcol[0], rowcol[1])
                };
                
                turn = switchTurn(turn);
            };
        });
    });

    
};


/*Eventual put everything in function*/

const player1 = player("joe", "o");
const player2 = player("shoe", "x")

playGame(player1, player2);