
const board = new Array(42);
const width = 448;
var gameOver = false;
initializeBoard();
drawBoard();
 
function boardIndex(x, y)
{
    return (x * 7) + y;
}
function drawBoard()
{
    const canvas = document.getElementById("connect4");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(28, 119, 195)";
        ctx.fillRect(0, 0, width, (width/7) * 6);
        var diameter = width/7;
        for (let y = 0; y < 6; y++)
        {
            for (let x = 0; x < 7; x++)
            {
                ctx.beginPath();
                ctx.arc((x * diameter) + (diameter/2), (y * diameter)+(diameter/2), diameter*.375, 0, 2 * Math.PI)
                if (board[boardIndex(x, y)] == 1)
                {
                    ctx.fillStyle = "rgb(249, 219, 109)";
                }
                else if (board[boardIndex(x, y)] == 2)
                {
                    ctx.fillStyle = "rgb(232, 49, 81)";
                }
                else
                {
                    ctx.fillStyle = "rgb(225, 242, 254)";
                }
                ctx.fill();
            }
        }
    }
}

function initializeBoard()
{
    for (let x = 0; x < 7; x++)
    {
        for (let y = 0; y < 6; y++)
        {
            board[boardIndex(x, y)] = 0;
        }
    }
}
function makeMove(x, inBoard, turn)
{
    if (inBoard[boardIndex(x, 0)] != 0 || gameOver == 1)
    {
        return -1;
    }
    for (let y = 5; y >= 0; y--)
    {
        if (inBoard[boardIndex(x, y)] == 0)
        {
            inBoard[boardIndex(x, y)] = turn;
            drawBoard();
            return 0;
        }
    }
}
function opponentMove()
{
    bestScore = 100; // This score is definitely not possible
    bestRow = -1;
    var tempBoard = new Array(42);
    for (let x = 0; x < 7; x++) //Checking each possible move
    {
        tempBoard = board.slice();
        if (makeMove(x, tempBoard, 2) != -1)
        {
            var val = minMax(tempBoard, 4, true, 1);
            if (val < bestScore)
            {
                bestScore = val;
                bestRow = x;
            }
            console.log(x + ": " + val);
        }
        else 
        {
            console.log(x + " is not a valid move");
        }
        
    }
    
    return bestRow;
}
function minMax(inBoard, depth, maximize, turn)
{
    var max = -42;
    var min = 42;
    var tempBoard = inBoard.slice();
    var currentScore = score(inBoard)
    if (depth == 0 || currentScore > 30 || currentScore < -30)
    {
        return score(inBoard);
    }
    if (maximize)
    {
        for (let x = 0; x < 7; x++) //Checking each possible move
        {
            tempBoard = inBoard.slice();
            makeMove(x, tempBoard, turn);
            var tempMax = minMax(tempBoard, depth - 1, false, 2);
            if (tempMax > max)
            {
                max = tempMax;
            }
        }
        return max;
    }
    else
    {
        for (let x = 0; x < 7; x++) //Checking each possible move
        {
            tempBoard = inBoard.slice();
            makeMove(x, tempBoard, turn);
            var tempMin = minMax(tempBoard, depth - 1, true, 1);
            if (tempMin < min)
            {
                min = tempMin;
            }
        }
        return min;
    }
}
function drawWinner()
{
    ctx.beginPath();
    ctx.arc((x * diameter) + (diameter/2), (y * diameter)+(diameter/2), diameter*.375, 0, 2 * Math.PI)
    if (board[boardIndex(x, y)] == 1)
    {
        ctx.fillStyle = "rgb(249, 219, 109)";
    }
    else if (board[boardIndex(x, y)] == 2)
    {
        ctx.fillStyle = "rgb(232, 49, 81)";
    }
    else
    {
        ctx.fillStyle = "rgb(225, 242, 254)";
    }
    ctx.fill();
}
function doTurn(x)
{
    if (gameOver == 1)
    {
        document.getElementById("Score").innerHTML = "winner: p" + turn;
        return -1;
    }
    while (makeMove(x, board, 1) == -1)
    {
    }
    if (checkBoard(board) == 1)
    {
        document.getElementById("Score").innerHTML = "winner: p" + 1;
        gameOver = 1;
        return 1;
    }
    turn = 2
    makeMove(opponentMove(), board, 2);
    if (checkBoard(board) == 2)
    {
        document.getElementById("Score").innerHTML = "winner: p" + 2;
        gameOver = 1;
        return 1;
    }
    turn = 1;
    document.getElementById("Score").innerHTML = "score: " + score(board);
}
function score(testBoard)
{

    var score = 0;
    var winner = checkBoard(testBoard);
    if (winner == 1)
    {
        score = score + 42;
    }
    else if (winner == 2)
    {
        score = score - 42;
    }
    for (let x = 0; x < 42; x++)
    {
        if(testBoard[x] == 0)
        {
            testBoard[x] = 1;
            if(checkBoard(testBoard) == 1)
            {
                score++;
            }
            testBoard[x] = 2;
            if(checkBoard(testBoard) == 2)
            {
                score--;
            }
            testBoard[x] = 0;
        }
        
    }
    return score;
}
function checkBoard(inBoard)
{
    var winner = 0;
    for (let x = 0; x < 7; x++)
    {
        for(let y = 0; y < 6; y++)
        {
            winner = inBoard[boardIndex(x, y)];
            if (winner != 0)
            {
                if (x < 4)
                {
                    if (inBoard[boardIndex(x+1, y)] == winner && inBoard[boardIndex(x+2, y)] == winner && inBoard[boardIndex(x+3, y)] == winner)
                    {
                        return winner;
                    }
                }
                if (y < 3)
                {
                    if (inBoard[boardIndex(x, y+1)] == winner && inBoard[boardIndex(x, y+2)] == winner && inBoard[boardIndex(x, y+3)] == winner)
                    {
                        return winner;
                    }
                }
                if (y < 3 && x < 4)
                {
                    if (inBoard[boardIndex(x+1, y+1)] == winner && inBoard[boardIndex(x+2, y+2)] == winner && inBoard[boardIndex(x+3, y+3)] == winner)
                    {
                        return winner;
                    }
                }
                if (y < 3 && x > 2)
                {
                    if (inBoard[boardIndex(x-1, y+1)] == winner && inBoard[boardIndex(x-2, y+2)] == winner && inBoard[boardIndex(x-3, y+3)] == winner)
                    {
                        return winner;
                    }
                }
            }
        }
    }
    return -1;
}