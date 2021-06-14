"use strict";

const mainPage = document.querySelector(".main__page");
const startBtn = document.querySelector("#start");
const recordsBox = document.querySelector(".records");
const recordsBtn = document.querySelector("#records");
const aboutBox = document.querySelector(".about__box");
const aboutBtn = document.querySelector("#about__bnt");

const gamePage = document.querySelector(".game__page");
const mainPageBtn = document.querySelector("#main__page_btn");
const newGameBtn = document.querySelector("#new__game_btn");
const levelBox = document.querySelector(".level__box");
const levelBtn = document.querySelector("#level__btn");
const levelСhoiceBtn = document.querySelectorAll(".level__choice_btn");
const saveBtn = document.querySelector("#save_btn");
const form = document.querySelector("#form");
const controlBtn = document.querySelectorAll(".control__btn");

const gamerScore = document.querySelector("#gamer__score");

const field = document.querySelector(".field");
const ball = document.querySelector(".ball");

const soundBtn = document.querySelector("#sound");

const burgerMenu = document.querySelector(".burger__menu");
const sideBar = document.querySelector(".sidebar");


const winSound = new Audio("./media/win.mp3");
winSound.volume = 0.8;

const bgMusicLevel1 = new Audio("./media/level1.mp3");
const bgMusicLevel2 = new Audio("./media/level2.mp3");
const bgMusicLevel3 = new Audio("./media/level3.mp3");

bgMusicLevel1.volume = 0.2;
bgMusicLevel3.volume = 0.4;


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
  Madness: {
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


const stop = () => cancelAnimationFrame(timer);

const update = () => {
  ball.style.width = `${sizeBall}px`;
  ball.style.height = `${sizeBall}px`;

  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
};

const direction = (e) => {
  if (e) {
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
      case "Space":
        stop();
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

const rebuild = () => {
  stop();
  initialSet();
  buildMaze();
};

function mouseClick() {
  this.style.backgroundColor = "red";
  this.style.color = "white";

  this.addEventListener("mouseup", () => {
    this.style.backgroundColor = "";
    this.style.color = "";
  });
}

function initialSet() {
  x = 10 + PADDING;
  y = 10 + PADDING;
  update();
}

function stopMusic() {
  bgMusicLevel1.pause();
  bgMusicLevel2.pause();
  bgMusicLevel3.pause();
}

function soundPause(bgMusic) {
  if (!bgMusic.paused) {
    stopMusic();
    soundBtn.classList.add("sound__pause");
  } else {
    soundBtn.classList.remove("sound__pause");
    bgMusic.play();
  }
}

function soundControl(bgMusic) {
  bgMusic.loop = true;
  bgMusic.currentTime = 0;
  stopMusic();

  if (!soundBtn.classList.contains("sound__pause")) {
    bgMusic.play();
  }
}

function showRecordsBox() {
  refreshMessages();

  document
    .querySelector("#close__records-box")
    .addEventListener("click", () => recordsBox.classList.add("hidden__box"));

  recordsBox.classList.toggle("hidden__box");
}

function showAboutBox() {
  document
    .querySelector("#close__about-box")
    .addEventListener("click", () => aboutBox.classList.add("hidden__box"));
  aboutBox.classList.toggle("hidden__box");
}

function showLevelBox() {
  document
    .querySelector("#close__level-box")
    .addEventListener("click", () => levelBox.classList.add("hidden__box"));
  levelBox.classList.toggle("hidden__box");
}

function showForm() {
  document.querySelector("#send__btn").addEventListener("click", () => {
    sendMessage();
    form.classList.add("hidden__box");
  });
  form.classList.toggle("hidden__box");
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
  setChoice("Madness");
}

function keepСount() {
  if (cellX === ROWS - 1 && cellY === COLUMNS - 1) {
    ROWS += 2;
    COLUMNS += 2;
    incr += 0.3;
    score++;
    gamerScore.innerText = score;
    winSound.play();
    rebuild();
    stop();
  }
}

function resetPoints() {
  score = 0;
  gamerScore.innerText = "";
}

function newGame() {
  resetPoints();
  rebuild();
}

initialSet();
update();

window.addEventListener("keydown", (e) => motion(e));
form.addEventListener("submit", (e) => e.preventDefault());
controlBtn.forEach((el) => el.addEventListener("mousedown", mouseClick));
levelBtn.addEventListener("click", showLevelBox);
levelBox.addEventListener("click", (e) => setLevel(e));
aboutBtn.addEventListener("click", showAboutBox);
recordsBtn.addEventListener("click", showRecordsBox);
newGameBtn.addEventListener("click", newGame);
soundBtn.addEventListener("click", () => soundPause(bgMusic));

saveBtn.addEventListener("click", () => {
  showForm();
});

document.querySelectorAll("a").forEach((el) => {
  el.addEventListener("click", (e) => e.preventDefault());
});

startBtn.addEventListener("click", () => {
  switchToGamePage();
  soundControl(bgMusic);
});

mainPageBtn.addEventListener("click", () => {
  stop();
  switchToMainPage();
  stopMusic();
});

burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("menu__active");
  sideBar.classList.toggle("sidebar__hidden");
});