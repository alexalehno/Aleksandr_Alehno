"use strict";

const mainPage = document.querySelector(".main__page");
const gamePage = document.querySelector(".game__page");
const levelBox = document.querySelector(".level__box");

const startBtn = document.querySelector("#start");
const levelGamePageBtn = document.querySelector("#game__page_level");

const mainPageBtn = document.querySelector("#main__page_btn");
const newGameBtn = document.querySelector("#new__game_btn");
const stopBtn = document.querySelector("#stop_btn");

const controlBtn = document.querySelectorAll(".control__btn");
const levelСhoiceBtn = document.querySelectorAll(".level__btn");

const field = document.querySelector(".field");
const ball = document.querySelector(".ball");
const scoreBox = document.querySelector(".score");
const soundBtn = document.querySelector("#sound");

const gamerNameBtn = document.querySelector("#your__name");
const gamerNameBox = document.querySelector(".gamer__name");

 
const BgLvel1 = new Audio("./media/level1.mp3");
const BgLvel2 = new Audio("./media/level2.mp3");
const BgLvel3 = new Audio("./media/level3.mp3");

/////////////////////////////////////////////////////////////

// function showNameBox() {
//   gamerNameBox.classList.toggle("hidden");
// }

// gamerNameBtn.addEventListener("click", showNameBox);

// ////////////////////////////////////////////////////////

const levelСhoiceStore = {
  Silence: { quantityCells: 11, sizeCell: 55, sizeBall: 40, incr: 2 },
  Nightmare: { quantityCells: 19, sizeCell: 50, sizeBall: 30, incr: 3 },
  "Death Metal": { quantityCells: 27, sizeCell: 44, sizeBall: 25, incr: 4 },
};

let timer = null;
let cellX = null;
let cellY = null;
let x = null;
let y = null;

let sizeBall = 40;
let incr = 2;
let score = 0;

// ////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////

const stop = () => cancelAnimationFrame(timer);

const update = () => {
  ball.style.width = `${sizeBall}px`;
  ball.style.height = `${sizeBall}px`;

  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
};

const rebuild = () => {
  stop();
  initialSet();
  buildMaze();
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
  cellX = Math.floor(x / CELL_SIZE) - 1;
  cellY = Math.floor(y / CELL_SIZE) - 1;
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

  keepСount();
};

// ...........................................................

function mouseClick() {
  this.style.backgroundColor = "black";

  this.addEventListener("mouseup", () => {
    this.style.backgroundColor = "";
  });
}

function keepСount() {
  if (cellX === ROWS - 1 && cellY === COLUMNS - 1) {
    ROWS += 2;
    COLUMNS += 2;
    incr += 0.2;
    scoreBox.innerText = ++score;
    rebuild();
    stop();
  }
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

  levelBox.style.top = `${45}%`;
  levelBox.style.left = `${295}px`;

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
          incr = levelСhoiceStore[key].incr;
        }
      }

      levelСhoiceBtn.forEach((el) => el.classList.remove("active"));
      e.target.classList.toggle("active");
      rebuild();
    }
  }

  setChoice("Silence");
  setChoice("Nightmare");
  setChoice("Death Metal");
}

function newGame() {
  score = 0;
  scoreBox.innerText = "";
  rebuild();
}

initialSet();

update();

function soundControl() {
  BgLvel1.loop = true;
  BgLvel1.volume = 0.2;
  BgLvel1.currentTime = 0;

  if (mainPage.classList.contains("hidden")) {
    BgLvel1.play();
    soundBtn.classList.remove("sound__pause");
  } else {
    BgLvel1.pause();
  }
}

function soundPause() {
  soundBtn.classList.toggle("sound__pause");
  if (soundBtn.classList.contains("sound__pause")) {
    BgLvel1.pause();
  } else BgLvel1.play();
}
// ........................................................

soundBtn.addEventListener("click", soundPause);

window.addEventListener("keydown", (e) => motion(e));

levelGamePageBtn.addEventListener("click", showHideLevelBox);

startBtn.addEventListener("click", () => {
  switchPages();
  soundControl();
  rebuild();
});

mainPageBtn.addEventListener("click", () => {
  switchPages();
  soundControl();
});

newGameBtn.addEventListener("click", newGame);
stopBtn.addEventListener("click", stop);

levelBox.addEventListener("click", (e) => setLevel(e));
controlBtn.forEach((el) => el.addEventListener("mousedown", mouseClick));
