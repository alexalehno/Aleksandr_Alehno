"use strict";

const mainPage = document.querySelector(".main__page");
const gamePage = document.querySelector(".game__page");
const levelBox = document.querySelector(".level__box");

const startBtn = document.querySelector("#start");
const showHideLevelBoxBtn = document.querySelector("#show_hide_level__box_btn");

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

const aboutBtn = document.querySelector("#about__bnt");
const aboutBox = document.querySelector(".about__box");
const closeAboutBox = document.querySelector("#close__about-box");

const winSound = new Audio("./media/win.mp3");
winSound.volume = 0.8;

const bgMusicLevel1 = new Audio("./media/level1.mp3");
const bgMusicLevel2 = new Audio("./media/level2.mp3");
const bgMusicLevel3 = new Audio("./media/level3.mp3");

bgMusicLevel1.volume = 0.15;
bgMusicLevel3.volume = 0.2;

/////////////////////////////////////////////////////////////




// ////////////////////////////////////////////////////////

const levelStore = {
  Silence: {
    quantityCells: 11,
    sizeCell: 55,
    sizeBall: 30,
    incr: 2,
    bgMusic: bgMusicLevel1,
  },
  Nightmare: {
    quantityCells: 19,
    sizeCell: 50,
    sizeBall: 30,
    incr: 3,
    bgMusic: bgMusicLevel2,
  },
  "Death Metal": {
    quantityCells: 27,
    sizeCell: 44,
    sizeBall: 25,
    incr: 3,
    bgMusic: bgMusicLevel3,
  },
};


let timer = null;
let cellX = null;
let cellY = null;
let x = null;
let y = null;

let score = 0;
let sizeBall = 30;
let incr = 2;
let bgMusic = bgMusicLevel1;

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

  if (y <= CELL_SIZE + 5) {
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

function stopMusic() {
  bgMusicLevel1.pause();
  bgMusicLevel2.pause();
  bgMusicLevel3.pause();
}

function soundControl(bgMusic) {
  bgMusic.loop = true;
  bgMusic.currentTime = 0;
  stopMusic();

  if (
    mainPage.classList.contains("hidden") &&
    !soundBtn.classList.contains("sound__pause")
  ) {
    bgMusic.play();
  }
}

function soundPause() {
  if (!bgMusic.paused) {
    stopMusic();
    soundBtn.classList.add("sound__pause");
  } else {
    soundBtn.classList.remove("sound__pause");
    bgMusic.play();
  }
}

function mouseClick() {
  this.style.backgroundColor = "black";

  this.addEventListener("mouseup", () => {
    this.style.backgroundColor = "";
  });
}

function setLevel(e) {
  function setChoice(p) {
    if (e.target.innerText === p) {
      for (let key in levelStore) {
        if (key === p) {
          CELL_SIZE = levelStore[key].sizeCell;
          ROWS = levelStore[key].quantityCells;
          COLUMNS = levelStore[key].quantityCells;
          PADDING = levelStore[key].sizeCell;
          sizeBall = levelStore[key].sizeBall;
          incr = levelStore[key].incr;
          bgMusic = levelStore[key].bgMusic;
        }
      }

      levelСhoiceBtn.forEach((el) => el.classList.remove("active"));
      e.target.classList.add("active");

      rebuild();
      soundControl(bgMusic);
    }
  }

  setChoice("Silence");
  setChoice("Nightmare");
  setChoice("Death Metal");
}

function keepСount() {
  if (cellX === ROWS - 1 && cellY === COLUMNS - 1) {
    ROWS += 2;
    COLUMNS += 2;
    incr += 0.3;

    scoreBox.innerText = ++score;
    winSound.play();
    rebuild();
    stop();
  }
}

function initialSet() {
  x = 10 + PADDING;
  y = 10 + PADDING;
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

  document.querySelector("#close__level-box").addEventListener("click", () => {
    levelBox.style.opacity = "";
    levelBox.style.zIndex = "";
    levelBox.style.top = "";
    levelBox.style.left = "";
  });
}

function newGame() {
  score = 0;
  scoreBox.innerText = "";
  rebuild();
}

initialSet();

update();

// ........................................................

aboutBtn.addEventListener("click", ()=>aboutBox.classList.remove("hidden__about"));
closeAboutBox.addEventListener("click", ()=>aboutBox.classList.add("hidden__about"));

soundBtn.addEventListener("click", soundPause);

window.addEventListener("keydown", (e) => motion(e));

showHideLevelBoxBtn.addEventListener("click", showHideLevelBox);

newGameBtn.addEventListener("click", newGame);
stopBtn.addEventListener("click", stop);

levelBox.addEventListener("click", (e) => setLevel(e));

controlBtn.forEach((el) => el.addEventListener("mousedown", mouseClick));

startBtn.addEventListener("click", () => {
  switchPages();
  rebuild();
  soundControl(bgMusic);
});

mainPageBtn.addEventListener("click", () => {
  switchPages();
  soundControl(bgMusic);
});