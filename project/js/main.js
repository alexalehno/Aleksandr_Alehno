"use strict";


const controlsMain = document.querySelector("#controls__main");
const controlsGame = document.querySelector("#controls__game");
const recordsBox = document.querySelector(".records");
const aboutBox = document.querySelector(".about");
const levelBox = document.querySelector(".levels");
const field = document.querySelector(".field");
const ball = document.querySelector(".ball");
const soundBtn = document.querySelector('#sound');
const gameScore = document.querySelector(".score__value");
const burgerMenu = document.querySelector(".burger-menu");
const sideBar = document.querySelector(".sidebar");
const form = document.querySelector(".save-form");
const sendBtn = form.querySelector(".save-form__btn");
const formInput = form.querySelector(".save-form__input");

const levelStore = {
  Silence: {
    delayTime: 0,
    wormNum: 2,
    quantityCells: 15,
    sizeCell: 42,
    sizeBall: 23,
    incr: 0.6,
    musSrc: './media/mus1.mp3',
  },

  Nightmare: {
    delayTime: 0,
    wormNum: 3,
    quantityCells: 21,
    sizeCell: 36,
    sizeBall: 20,
    incr: 0.7,
    musSrc: './media/mus2.mp3',
  },

  Madness: {
    delayTime: 0,
    wormNum: 10,
    quantityCells: 27,
    sizeCell: 30,
    sizeBall: 17,
    incr: 0.8,
    musSrc: './media/mus3.mp3',
  },
};

let timer = null;
let cellX = null;
let cellY = null;
let ballX = null;
let ballY = null;
let currentLevel = 'Silence';
let score = 0;
let selectedLevel = null;
let isMusPlay = false;
let isMusReady = true;
let playPromise;
let sizeBall = levelStore[currentLevel].sizeBall;
let incr = levelStore[currentLevel].incr;

const musBg = new Audio(levelStore[currentLevel].musSrc);
const musWin = new Audio('./media/mus0.mp3');

changeBallCoord();
setSizeBall();
updateBall();
setClassSoundBtn();

document.querySelectorAll('.levels-list__btn').forEach(el => {
  if (el.innerText === currentLevel) {
    el.classList.add('level-active');
    selectedLevel = el;
  }
});

// ...............................................................

form.addEventListener("submit", (e) => e.preventDefault());
formInput.addEventListener("keydown", (e) => e.stopPropagation());
sendBtn.addEventListener("click", () => sendMessage());

burgerMenu.addEventListener("click", function () {
  this.classList.toggle("menu-active");
  sideBar.classList.toggle("sidebar__hidden");
});

window.addEventListener("keydown", (e) => {
  e.preventDefault();
  motion(e);
});

// ...............main controls делегирование...........
controlsMain.addEventListener('click', (e) => {
  const btn = e.target.closest('a');

  if (!btn) {
    return;
  }

  e.preventDefault();

  switch (btn.id) {
    case 'start':
      switchToGamePage();
      musControl(musBg, true);
      break;

    case 'records':
      refreshMessages();
      showBox(recordsBox)
      break;

    case 'about':
      showBox(aboutBox)
      break;
  }
});

// ...............game controls делегирование...........
controlsGame.addEventListener('click', (e) => {
  const btn = e.target.closest('a');

  if (!btn) {
    return;
  }

  e.preventDefault();

  switch (btn.id) {
    case 'main__page':
      cancelAnimationFrame(timer);
      switchToMainPage();
      musControl(musBg, false);
      break;

    case 'new__game':
      newGame();
      break;

    case 'levels':
      showBox(levelBox);
      break;

    case 'sound':
      musControl(musBg, !isMusPlay);
      break;

    case 'save':
      showBox(form);
      break;
  }
});

// ...............level делегирование...................
levelBox.addEventListener('click', (e) => {
  const btn = e.target.closest('a');

  if (!btn) {
    return;
  }

  e.preventDefault();

  if (!isValidMaze()) {
    showNotification('p', 'notification', 'WAIT');
    return;
  }

  currentLevel = btn.innerText;

  DELAY_TIMEOUT = levelStore[currentLevel].delayTime;
  WORM_NUMBER = levelStore[currentLevel].wormNum;
  ROWS = levelStore[currentLevel].quantityCells;
  COLUMNS = ROWS;
  CELL_SIZE = levelStore[currentLevel].sizeCell;
  PADDING = CELL_SIZE;

  sizeBall = levelStore[currentLevel].sizeBall;
  incr = levelStore[currentLevel].incr;

  musBg.src = levelStore[currentLevel].musSrc;

  cancelAnimationFrame(timer);
  changeBallCoord();
  setSizeBall();
  updateBall();
  buildMaze();
  highlight(btn);
  musControl(musBg, isMusPlay);

  function highlight(el) {
    if (selectedLevel) {
      selectedLevel.classList.remove('level-active');
    }

    selectedLevel = el;
    selectedLevel.classList.add('level-active');
  }
});

// ......................................................
function direction(e) {
  switch (e.code) {
    case "ArrowUp":
      ballY += -incr;
      break;
    case "ArrowDown":
      ballY += incr;
      break;
    case "ArrowLeft":
      ballX += -incr;
      break;
    case "ArrowRight":
      ballX += incr;
      break;
    case "Space":
      setTimeout(() => cancelAnimationFrame(timer), 0); //<===????
      break;
  }
};

function collisionBorder(e) {
  cellX = Math.floor(ballX / CELL_SIZE) - 1;
  cellY = Math.floor(ballY / CELL_SIZE) - 1;

  let offsetX = Math.floor((ballX + ball.clientWidth) / CELL_SIZE) - 1;
  let offsetY = Math.floor((ballY + ball.clientHeight) / CELL_SIZE) - 1;

  if (ballY <= CELL_SIZE + 3) {  // <===???
    ballY += incr;
  }

  if (ballY >= ROWS * CELL_SIZE + CELL_SIZE - ball.clientWidth - 3) { // <===???
    ballY += -incr;
  }

  collisionInnerWall(ballY, "ArrowUp", incr);
  collisionInnerWall(ballY, "ArrowDown", -incr);
  collisionInnerWall(ballX, "ArrowLeft", incr);
  collisionInnerWall(ballX, "ArrowRight", -incr);

  function collisionInnerWall(xy, arrow, incr) {
    if (
      (!matrix[cellY][cellX] ||
        !matrix[cellY][offsetX] ||
        !matrix[offsetY][cellX] ||
        !matrix[offsetY][offsetX]) &&
      e.code === arrow
    ) {
      xy === ballX ? (ballX += incr) : (ballY += incr);
    }
  }
};

function motion(e) {
  direction(e);
  collisionBorder(e);
  updateBall();

  if (timer) {
    cancelAnimationFrame(timer);
    timer = 0;
  }

  timer = requestAnimationFrame(() => motion(e));

  keepScore();
};

// ......................................................

function keepScore() {
  if (cellX === ROWS - 1 && cellY === COLUMNS - 1) {

    if (isMusPlay) {
      musWin.play();
    }

    ROWS += 2;
    COLUMNS = ROWS;
    incr += 0.1;
    score++;
    gameScore.innerText = score;

    cancelAnimationFrame(timer);
    buildMaze();
    changeBallCoord();
    updateBall();
  }
};

function newGame() {
  if (!isValidMaze()) {
    showNotification('p', 'notification', 'WAIT');
    return;
  }

  cancelAnimationFrame(timer);
  changeBallCoord();
  updateBall();
  buildMaze();
  resetPoints();
};

function changeBallCoord() {
  let sizeC = levelStore[currentLevel].sizeCell;
  ballX = sizeC + sizeC / 2 - sizeBall / 2;
  ballY = ballX;
};

function setSizeBall() {
  ball.style.width = `${sizeBall}px`;
  ball.style.height = `${sizeBall}px`;
};

function updateBall() {
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
};

function resetPoints() {
  score = 0;
  gameScore.innerText = "";
};

function showBox(elem) {
  const close = elem.querySelector(".close-btn");

  elem.classList.toggle("hidden__box");
  close.addEventListener("click", () => elem.classList.add("hidden__box"));
};

//...............sound................

function musControl(mus, f) {
  if (!isMusReady) {
    return;
  }

  isMusPlay = f;
  isMusReady = false;

  if (isMusPlay) {
    mus.loop = true;
    mus.currentTime = 0;
    play(mus);
  }

  if (!isMusPlay && playPromise !== undefined) {
    playPromise.then(() => pause(mus));
  }

  setClassSoundBtn();
};

function play(mus) {
  mus.volume = 0;
  playPromise = mus.play()
    .then(() => smoothSound(mus, 0.02))
    .then(() => isMusReady = true);
};

function pause(mus) {
  smoothSound(mus, -0.02)
    .then(() => {
      mus.pause();
      isMusReady = true;
    });
};

async function smoothSound(mus, inc) {
  let vol = mus.volume;

  while (true) {
    await delay(0);

    vol = +(vol + inc).toFixed(2);

    if (vol > 1 || vol < 0) {
      return;
    }

    mus.volume = vol;
  }
};

function setClassSoundBtn() {
  if (isMusPlay) {
    soundBtn.classList.remove('sound-pause');
  } else {
    soundBtn.classList.add('sound-pause');
  }
};

//...............Notification................

async function showNotification(el, cls, t) {
  let element = document.createElement(el);
  element.classList.add(cls);
  element.innerText = t;
  document.querySelector('.field').append(element);

  await delay(0);
  element.classList.add('visibility');

  await delay(700);
  element.classList.remove('visibility');

  await delay(300);
  element.remove();
};
