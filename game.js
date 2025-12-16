const DOM = {
    main: document.querySelector("main"),
    gameBoard: document.querySelector(".gameBoard"),
    boxSize: 20,
    scoreBox: document.querySelector("#scoreDiv"),
    highScoreBox: document.querySelector("#highScore"),
    gameOverModal: document.querySelector(".restartModal"),
    startModal: document.querySelector(".startModal"),
    restartBtn: document.querySelector(".restartBtn"),
    startBtn: document.querySelector(".startBtn"),
    time: document.querySelector("#time"),
    gameOverScore: document.querySelector("#gameOverScore"),
    desktopModal: document.querySelector(".desktopOnlyModal"),
    levelSelector: document.querySelector(".levelSelector"),
}

let boxes;
let gameOverFlag = false;
let gameBoxCordiantesArray = [];

let rows = Math.floor((DOM.gameBoard.getBoundingClientRect().height) / DOM.boxSize);
let cols = Math.floor((DOM.gameBoard.getBoundingClientRect().width) / DOM.boxSize);

let highScore = JSON.parse(localStorage.getItem("highestScore")) || 0;
DOM.highScoreBox.textContent = highScore;

let snake = [];
let snakeHeadRow = Math.floor(rows / 2);
let snakeHeadCol = Math.floor(cols / 2);

function checkUserDevice(){
    if(window.innerWidth <= 1024){
        DOM.desktopModal.classList.add("visible");
        DOM.startModal.classList.remove("visible");
        document.body.classList.add("disable");
    }
}

checkUserDevice();

function calculateSnakeHead(){
    snake = [{
            x: snakeHeadRow, 
            y: snakeHeadCol
        }, {
            x: snakeHeadRow, 
            y: snakeHeadCol + 1
        }, {
            x: snakeHeadRow, 
            y: snakeHeadCol + 1
        }
    ];
}

let direction = "left";
let previousDirection = "left";
let food;
let score = 0;
let snakeInterval;
let timeIntervalId;

function timeIntervalFunction(){
    let [min, sec] = DOM.time.textContent.split(":").map(Number);
        if(sec >= 59){
            min += 1;
            sec = 0
        }
    sec += 1;
    DOM.time.textContent = `${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`;
}

DOM.startBtn.addEventListener("click", () => {
    DOM.startModal.classList.remove("visible");
    calculateSnakeHead();
    snakeInterval = setInterval(snakeIntervalFunction, DOM.levelSelector.value);
    timeIntervalId = setInterval(() => {
        timeIntervalFunction();
    }, 1000);
})

const generateRandomBox = () => { 
    return {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
}

const spawnFood = () => {
    let previousFood = DOM.gameBoard.querySelector(".foodBox");
    if(previousFood) DOM.gameBoard.querySelector(".foodBox").classList.remove("foodBox");

    food = generateRandomBox();
    let isInSnake = snake.filter((box) => box.x === food.x && box.y === food.y);
    if(isInSnake) food = generateRandomBox();
    let foodBox = gameBoxCordiantesArray[`${food.x}, ${food.y}`]
    foodBox.classList.add("foodBox");
}

function snakeIntervalFunction(){
    if(!gameOverFlag) spawnSnake();
}

const makeBox = () => {
    DOM.gameBoard.innerHTML = "";

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            let box = document.createElement("div");
            box.classList.add("boxes");
            DOM.gameBoard.appendChild(box);
            gameBoxCordiantesArray[`${i}, ${j}`] = box;
        }
    }

    boxes = document.querySelectorAll('.boxes');
    spawnFood();
}

makeBox();

window.addEventListener("resize", () => {
    makeBox();
})

function increaseScore(){
    score += 10;
    DOM.scoreBox.textContent = score;
}

function gameOver(){
    gameOverFlag = true;
    clearInterval(snakeInterval);
    clearInterval(timeIntervalId);
    if(score > highScore) {
        DOM.highScoreBox.textContent = score;
        localStorage.setItem("highestScore", JSON.stringify(score));
    }
    DOM.gameOverModal.classList.add("visible");
    DOM.gameOverScore.textContent = `Your Score Was - ${score}`
    score = 0;
    DOM.scoreBox.textContent = 0;
}

DOM.restartBtn.addEventListener("click", restartGame);

function restartGame(){
    DOM.gameOverModal.classList.remove("visible");
    gameOverFlag = false;
    direction = "left";
    previousDirection = "left";
    score = 0;
    time.textContent = "00:00";
    calculateSnakeHead();

    let previousSnakeBox = document.querySelectorAll(".snakeClass");
    previousSnakeBox.forEach(box => {
        box.classList.remove("snakeClass");
    });

    snakeInterval = setInterval(snakeIntervalFunction, DOM.levelSelector.value);
    timeIntervalId = setInterval(timeIntervalFunction, 1000);
}

function spawnSnake(){
    let snakeHead = {...snake[0]};

    // Eat Food
    if(snakeHead.x == food.x && snakeHead.y == food.y){
        snake.push({x: food.x, y: food.y});
        spawnFood();
        increaseScore();
    }

    if(direction == "left") snakeHead.y = snakeHead.y - 1;
    if(direction == "up") snakeHead.x = snakeHead.x - 1;
    if(direction == "down") snakeHead.x = snakeHead.x + 1
    if(direction == "right") snakeHead.y = snakeHead.y + 1;

     // Game Over 
    if(snakeHead.x >= rows || snakeHead.y < 0 || snakeHead.y >= cols || snakeHead.x < 0){
        gameOver();
        return;
    } 
    
    if(!gameOverFlag){
        snake.unshift(snakeHead);
        let popped = snake.pop();
        let cordinates = `${popped.x}, ${popped.y}`;
        gameBoxCordiantesArray[cordinates].classList.remove("snakeClass");

        snake.forEach(block => {
            if(block !== snake[0] && block.x == snakeHead.x && block.y == snakeHead.y) gameOver();
            let cordinates = `${block.x}, ${block.y}`
            if(cordinates) gameBoxCordiantesArray[cordinates].classList.add("snakeClass");
        });
    }
};

window.addEventListener("keydown", (e) => {
    if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)){
        e.preventDefault();
    }
    if(e.key == "ArrowUp") {
        previousDirection = direction;
        if(previousDirection !== "down") direction = "up";
    }
    if(e.key == "ArrowDown") {
        previousDirection = direction;
        if(previousDirection !== "up") direction = "down";
    }
    if(e.key == "ArrowLeft") {
        previousDirection = direction;
        if(previousDirection !== "right") direction = "left";
    }
    if(e.key == "ArrowRight") {
        previousDirection = direction;
        if(previousDirection !== "left") direction = "right";
    }
})