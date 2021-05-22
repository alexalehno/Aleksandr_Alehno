"use strict";

const startBtn = document.querySelector("#start");
const levelBtn = document.querySelector("#level");

const mainBtn = document.querySelector("#main");
const newGameBtn = document.querySelector("#new__game");
const pauseBtn = document.querySelector("#pause");

const field = document.querySelector(".field");
const ball = document.querySelector(".ball");
const controlBtn = document.querySelectorAll(".control__btn");
const levelСhoiceBtn = document.querySelectorAll(".level__btn");

const levelBox = document.querySelector(".level__box");

const levelСhoice = {
  Easy: { quantityCell: 11, sizeCell: 55, sizeBall: 40 },
  Normal: { quantityCell: 17, sizeCell: 55, sizeBall: 40 },
  Hardcore: { quantityCell: 31, sizeCell: 38, sizeBall: 25 },
};

function setLevel(e) {
  function setChoice(p) {
    if (e.target.innerText === p) {
      for (let key in levelСhoice) {
        if (key === p) {
          CELL_SIZE = levelСhoice[key].sizeCell;
          ROWS = levelСhoice[key].quantityCell;
          COLUMNS = levelСhoice[key].quantityCell;
        }
      }

      levelСhoiceBtn.forEach((el) => el.classList.remove("active"));
      e.target.classList.toggle("active");
    }
  }

  console.log(levelСhoiceBtn);

  setChoice("Easy");
  setChoice("Normal");
  setChoice("Hardcore");
  newGame();
}

let x = null;
let y = null;

let incr = 2;
let timer = null;

function showHideLevelBox() {
  levelBox.style.opacity = 1;
  levelBox.style.zIndex = 99;

  document.querySelector(".close__level-box").addEventListener("click", () => {
    levelBox.style.opacity = "";
    levelBox.style.zIndex = "";
  });
}

function mouseClick() {
  this.style.backgroundColor = "black";

  this.addEventListener("mouseup", () => {
    this.style.backgroundColor = "";
  });
}

const stop = () => cancelAnimationFrame(timer);

const update = () => {
  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
};

function initialCoord() {
  x = 5 + PADDING;
  y = 5 + PADDING;
  update();
}

initialCoord();

const direction = (e) => {
  if (e.code) {
    switch (e.code) {
      case "ArrowUp":
        y += -incr;
        break;
      case "ArrowDown":
        y += incr;
        break;
      case "ArrowLeft":
        x += -incr;
        break;
      case "ArrowRight":
        x += incr;
        break;
    }
  }
};

const collisionBorder = (e) => {
  let cellX = Math.floor(x / CELL_SIZE) - 1;
  let cellY = Math.floor(y / CELL_SIZE) - 1;
  let offsetX = Math.floor((x + ball.clientWidth) / CELL_SIZE) - 1;
  let offsetY = Math.floor((y + ball.clientHeight) / CELL_SIZE) - 1;

  if (y <= CELL_SIZE + 2) {
    y += incr;
  }

  if (y >= ROWS * CELL_SIZE + CELL_SIZE - ball.clientWidth - 5) {
    y += -incr;
  }

  function collisionInnerWall(xy, arrow, incr) {
    if (
      (!matrix[cellY][cellX] ||
        !matrix[cellY][offsetX] ||
        !matrix[offsetY][cellX] ||
        !matrix[offsetY][offsetX]) &&
      e.code === arrow
    ) {
      xy === x ? (x += incr) : (y += incr);
    }
  }

  collisionInnerWall(y, "ArrowUp", incr);
  collisionInnerWall(y, "ArrowDown", -incr);
  collisionInnerWall(x, "ArrowLeft", incr);
  collisionInnerWall(x, "ArrowRight", -incr);
};

const motion = (e) => {
  direction(e);
  collisionBorder(e);
  update();

  if (timer) {
    cancelAnimationFrame(timer);
    timer = 0;
  }

  timer = requestAnimationFrame(() => motion(e));
};

update();

function newGame() {
  stop();
  initialCoord();
  buildMaze();
}

function switchPages() {
  let mainPage = document.querySelector(".main__page");
  let gamePage = document.querySelector(".game__page");

  mainPage.classList.toggle("hidden");
  gamePage.classList.toggle("hidden");
}

startBtn.addEventListener("click", switchPages);
mainBtn.addEventListener("click", switchPages);
newGameBtn.addEventListener("click", newGame);

levelBtn.addEventListener("click", showHideLevelBox);

pause.addEventListener("click", stop);

window.addEventListener("keydown", (e) => motion(e));
controlBtn.forEach((el) => el.addEventListener("mousedown", mouseClick));
levelBox.addEventListener("click", (e) => setLevel(e));
