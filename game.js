const DOM = {
    main: document.querySelector("main"),
    gameBoard: document.querySelector(".gameBoard"),
    boxSize: 20,
    scoreBox: document.querySelector("#scoreDiv"),
    highScoreBox: document.querySelector("#highScore"),
}

let boxes;
let gameBoxCordiantesArray = [];
let rows = Math.floor((DOM.gameBoard.getBoundingClientRect().height) / DOM.boxSize);
let cols = Math.floor((DOM.gameBoard.getBoundingClientRect().width) / DOM.boxSize);
let highScore = JSON.parse(localStorage.getItem("highestScore")) || 0;
DOM.highScoreBox.textContent = highScore;

let snake = [{
        x: 14, 
        y: 10
    }, {
        x: 14, 
        y: 11
    }, {
        x: 14, 
        y: 12
    }
];

let direction = "left";
let previousDirection = "left";
let food;
let score = 0;

const generateRandomBox = () => { 
    return {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
}

const spawnFood = () => {
    let previousFood = DOM.gameBoard.querySelector(".foodBox");
    if(previousFood) DOM.gameBoard.querySelector(".foodBox").classList.remove("foodBox");
    food = generateRandomBox();
    let foodBox = gameBoxCordiantesArray[`${food.x}, ${food.y}`]
    foodBox.classList.add("foodBox");
}

const makeBox = () => {
    DOM.gameBoard.innerHTML = "";

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            let box = document.createElement("div");
            box.classList.add("boxes");
            DOM.gameBoard.appendChild(box);
            gameBoxCordiantesArray[`${i}, ${j}`] = box;
            // box.textContent = `${i}, ${j}`;
        }
    }

    boxes = document.querySelectorAll('.boxes');
    spawnFood();
}

window.addEventListener('resize', () => {
    makeBox();
})

makeBox();

function increaseScore(){
    score += 10;
    DOM.scoreBox.textContent = score;
}

function gameOver(){
    clearInterval(snakeInterval);
    console.log("Game Over");
    if(score > highScore) {
        DOM.highScoreBox.textContent = score;
        localStorage.setItem("highestScore", JSON.stringify(score));
    }
}

function spawnSnake(){
    let snakeHead = {...snake[0]};

    // Game Over 
    if(snakeHead.x >= rows || snakeHead.y < 0 || snakeHead.y >= cols || snakeHead.x < 0){
        gameOver();
    } 

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
 
    snake.unshift(snakeHead);
    let popped = snake.pop();
    let cordinates = `${popped.x}, ${popped.y}`;
    gameBoxCordiantesArray[cordinates].classList.remove("snakeClass");

    snake.forEach(block => {
        if(block !== snake[0] && block.x == snakeHead.x && block.y == snakeHead.y){
            gameOver();
        }
        let cordinates = `${block.x}, ${block.y}`
        if(cordinates) gameBoxCordiantesArray[cordinates].classList.add("snakeClass");
    });
};

const snakeInterval = setInterval(() => {
    if(snake.length > 0){
        spawnSnake();
    }
}, 100);

window.addEventListener("keydown", (e) => {
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