"use strict";

const mainPage = document.querySelector(".main__page");
const gamePage = document.querySelector(".game__page");
const levelBox = document.querySelector(".level__box");

const startBtn = document.querySelector("#start");
const levelMainPageBtn = document.querySelector("#main__page_level");
const levelGamePageBtn = document.querySelector("#game__page_level");

const mainPageBtn = document.querySelector("#main__page_btn");
const newGameBtn = document.querySelector("#new__game_btn");
const pauseBtn = document.querySelector("#pause_btn");

const controlBtn = document.querySelectorAll(".control__btn");
const levelСhoiceBtn = document.querySelectorAll(".level__btn");

const field = document.querySelector(".field");
const ball = document.querySelector(".ball");

// ................................................................

const levelСhoiceStore = {
  Easy: { quantityCells: 11, sizeCell: 55, sizeBall: 40 },
  Normal: { quantityCells: 17, sizeCell: 55, sizeBall: 40 },
  Hardcore: { quantityCells: 31, sizeCell: 38, sizeBall: 25 },
};

let timer = null;
let x = null;
let y = null;

let sizeBall = 50;
let incr = 2;

// ...................................................................

const stop = () => cancelAnimationFrame(timer);

const update = () => {
  ball.style.width = `${sizeBall}px`;
  ball.style.height = `${sizeBall}px`;

  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
};

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

// ...........................................................

function mouseClick() {
  this.style.backgroundColor = "black";

  this.addEventListener("mouseup", () => {
    this.style.backgroundColor = "";
  });
}

function initialSet() {
  x = 5 + PADDING;
  y = 5 + PADDING;
  update();
}

function switchPages() {
  mainPage.classList.toggle("hidden");
  gamePage.classList.toggle("hidden");
}

function showHideLevelBox() {
  levelBox.style.opacity = 1;
  levelBox.style.zIndex = 99;

  levelBox.style.top = `${55}%`;

  if (mainPage.classList.contains("hidden")) {
    levelBox.style.left = `${15}%`;
  }

  document.querySelector(".close__level-box").addEventListener("click", () => {
    levelBox.style.opacity = "";
    levelBox.style.zIndex = "";
    levelBox.style.top = "";
    levelBox.style.left = "";
  });
}

function setLevel(e) {
  function setChoice(p) {
    if (e.target.innerText === p) {
      for (let key in levelСhoiceStore) {
        if (key === p) {
          CELL_SIZE = levelСhoiceStore[key].sizeCell;
          ROWS = levelСhoiceStore[key].quantityCells;
          COLUMNS = levelСhoiceStore[key].quantityCells;
          PADDING = levelСhoiceStore[key].sizeCell;
          sizeBall = levelСhoiceStore[key].sizeBall;
        }
      }

      levelСhoiceBtn.forEach((el) => el.classList.remove("active"));
      e.target.classList.toggle("active");
      newGame();
    }
  }

  setChoice("Easy");
  setChoice("Normal");
  setChoice("Hardcore");
}

function newGame() {
  stop();
  initialSet();
  buildMaze();
}

initialSet();

update();

// ........................................................

window.addEventListener("keydown", (e) => motion(e));

levelMainPageBtn.addEventListener("click", showHideLevelBox);
levelGamePageBtn.addEventListener("click", showHideLevelBox);

startBtn.addEventListener("click", switchPages);
mainPageBtn.addEventListener("click", switchPages);
newGameBtn.addEventListener("click", newGame);
pauseBtn.addEventListener("click", stop);

levelBox.addEventListener("click", (e) => setLevel(e));
controlBtn.forEach((el) => el.addEventListener("mousedown", mouseClick));
