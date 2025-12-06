const DOM = {
    main: document.querySelector("main"),
    gameBoard: document.querySelector(".gameBoard"),
    boxSize: 30,
}

let boxes;

const generateRandomBox = (boxCount) => {
    return Math.floor(Math.random() * boxCount) + 1;
}

const spawnFood = (randomBox) => {
    let previousFood = DOM.gameBoard.querySelector(".foodBox");
    if(previousFood) DOM.gameBoard.querySelector(".foodBox").classList.remove("foodBox");
    randomBox.classList.add("foodBox");
}

const makeBox = () => {
    DOM.gameBoard.innerHTML = "";
    let gameBoardHeight = Math.floor((DOM.gameBoard.getBoundingClientRect().height) / DOM.boxSize);
    let gameBoardWidth = Math.floor((DOM.gameBoard.getBoundingClientRect().width) / DOM.boxSize);

    for(let i = 1; i <= gameBoardHeight * gameBoardWidth; i++){
        let box = document.createElement("div");
        box.classList.add("boxes");
        DOM.gameBoard.appendChild(box);
    }

    boxes = document.querySelectorAll('.boxes');
    let randomBox = generateRandomBox(boxes.length);
    spawnFood(boxes[randomBox]);
}

makeBox();

