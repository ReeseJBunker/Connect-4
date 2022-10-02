
const board = new Array(7);
var turn = 1;
const width = 448;
var over = 0;
initializeBoard();
drawBoard();


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
                if (board[x][y] == 1)
                {
                    ctx.fillStyle = "rgb(249, 219, 109)";
                }
                else if (board[x][y] == 2)
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
        board[x] = new Array(6);
        for (let y = 0; y < 6; y++)
        {
            board[x][y] = 0;
        }
    }
}

function makeMove(x)
{
    if (board[x][0] != 0 || over == 1)
    {
        return -1;
    }
    for (let y = 5; y >= 0; y--)
    {
        if (board[x][y] == 0)
        {
            board[x][y] = turn;
            drawBoard();
            
            if (turn == 1)
            {
                turn = 2;
            }else{
                turn = 1;
            }
            over = checkBoard();
            return 0;
        }
    }
}
function drawWinner()
{
    ctx.beginPath();
    ctx.arc((x * diameter) + (diameter/2), (y * diameter)+(diameter/2), diameter*.375, 0, 2 * Math.PI)
    if (board[x][y] == 1)
    {
        ctx.fillStyle = "rgb(249, 219, 109)";
    }
    else if (board[x][y] == 2)
    {
        ctx.fillStyle = "rgb(232, 49, 81)";
    }
    else
    {
        ctx.fillStyle = "rgb(225, 242, 254)";
    }
    ctx.fill();
}

function checkBoard()
{
    for (let x = 0; x < 7; x++)
    {
        for(let y = 0; y < 6; y++)
        {
            var winner = board[x][y];
            if (winner != 0)
            {
                if (x < 4)
                {
                    if (board[x+1][y] == winner && board[x+2][y] == winner && board[x+3][y] == winner)
                    {
                        document.getElementById("Score").innerHTML = "winner: p" + winner;
                        return 1;   //1 means game is over
                    }
                }
                if (y < 3)
                {
                    if (board[x][y+1] == winner && board[x][y+2] == winner && board[x][y+3] == winner)
                    {
                        document.getElementById("Score").innerHTML = "winner: p" + winner;
                        return 1;
                    }
                }
                if (y < 3 && x < 4)
                {
                    if (board[x+1][y+1] == winner && board[x+2][y+2] == winner && board[x+3][y+3] == winner)
                    {
                        document.getElementById("Score").innerHTML = "winner: p" + winner;
                        return 1;
                    }
                }
                if (y < 3 && x > 2)
                {
                    if (board[x-1][y+1] == winner && board[x-2][y+2] == winner && board[x-3][y+3] == winner)
                    {
                        document.getElementById("Score").innerHTML = "winner: p" + winner;
                        return 1;
                    }
                }
            }
        }
    }
    return 0;
}