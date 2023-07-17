const grid = document.querySelector('.grid')
const blockWidth = 100;
const blockHeight = 20;
const userStart = [230, 10];
let currentPosition = userStart;
let boardWidth = 560;
let boardHeight = 300;
let ballStart = [270, 30]
let ballCurrentPosition = ballStart;
let ballDiameter = 20;
let timerId;
let xDirection = -2;
let yDirection = 2;
let resultDisplay = document.querySelector('.result');
let scoreDisplay = document.querySelector('.score')
let score = 0;
//create Blocks
class Block {

    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];

    }
}
//All blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),

]
let addBlocks = () => {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}
addBlocks();

//draw user
const drawUser = () => {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';

}

//add User
let user = document.createElement("user");
user.classList.add('user');
drawUser();
grid.appendChild(user)



//move user

let moveUser = (e) => {
    switch (e.key) {

        case "ArrowLeft":
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
                break;
            }
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drawUser();
                break;
            }
    }
}

    document.addEventListener('keydown', moveUser)
//draw ball
let drawBall = () => {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

//add ball
const ball = document.createElement('div')
ball.classList.add('ball');
drawBall();
grid.appendChild(ball)


//move ball
const moveBall = () => {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    checkForCollisions();
    drawBall();
}

timerId = setInterval(moveBall, 30)

let checkForCollisions = () => {

    for (let i = 0; i < blocks.length; i++) {

        if (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            (ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].bottomRight[1]) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection();
            score++;
            scoreDisplay.innerHTML = score;

            //check for win
            if (allBlocks.length === 0) {
                resultDisplay.innerHTML = "you won"
                clearInterval(timerId)
                document.removeEventListener('keydown',moveUser)
            }
        }


    }
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0) {
        changeDirection();
    }
    // check for user collisions
    if (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
        ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight) {

        changeDirection();
    }


    //check game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        resultDisplay.innerHTML = "Game Over"
        document.removeEventListener('keydown', moveUser)
    }
}

let changeDirection = () => {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return
    }
}