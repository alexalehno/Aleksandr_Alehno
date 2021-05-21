"use strict";

const fieldWidth = 800;
const fieldHeight = 500;
const btnStart = document.querySelector("#start");
const btnStop = document.querySelector("#stop");
const score = document.querySelector(".score");
const field = document.querySelector(".field");
const ball = document.querySelector(".ball");
const rackets = document.querySelectorAll(".racket");

let ballOffsetX;
let ballOffsetY;

let speedX;
let speedY;
let timer;

let incr = 5;
let leftRacketTop;
let rightRacketTop;

let leftGoal = 0;
let rightGoal = 0;

field.style.width = `${fieldWidth}px`;
field.style.height = `${fieldHeight}px`;

const randomRange = (n, m) => Math.floor(Math.random() * (m - n + 1)) + n;

const stop = () => cancelAnimationFrame(timer);

const start = () => {
  if (timer) stop();
  timer = 0;

  ball.style.display = "block";
  ballOffsetX = field.clientWidth / 2 - ball.clientWidth / 2;
  ballOffsetY = field.clientHeight / 2 - ball.clientHeight / 2;

  rackets.forEach(el => {
    el.style.top = `${fieldHeight/2 - el.clientHeight/2}px`;
    leftRacketTop = fieldHeight/2 - el.clientHeight/2;
    rightRacketTop = fieldHeight/2 - el.clientHeight/2;
  });

  speedX = randomRange(-3, 3);
  speedY = randomRange(-3, 3);

  timer = requestAnimationFrame(move);
};

const update = () => {
  ball.style.left = `${ballOffsetX}px`;
  ball.style.top = `${ballOffsetY}px`;
};

const move = () => {
  timer = requestAnimationFrame(move);

  if (speedX === 0) ballOffsetX += 1;

  ballOffsetX += speedX;
  ballOffsetY += speedY;

  // ....................................................//

  let ballTop = parseInt(ball.style.top);

  if (ballOffsetX + ball.clientWidth > fieldWidth - 10 &&
   !(ballTop <= rightRacketTop - 30 || ballTop >= rightRacketTop + 100)) {
    speedX = -speedX; 
    speedX += speedX;
  } 

  if (ballOffsetX < 0 + 10 && 
    !(ballTop <= leftRacketTop - 30 || ballTop >= leftRacketTop + 100)) {
    speedX = -speedX; 
    speedX += speedX;
  } 

  if (ballOffsetX + ball.clientWidth > fieldWidth) { 
    rightGoal++;
    stop();
    ballOffsetX = fieldWidth - ball.clientWidth;
  } 

  if (ballOffsetX < 0) { 
    leftGoal++;
    stop();
    ballOffsetX = 0;
  } 

  score.innerHTML = `${leftGoal} : ${rightGoal}`

  // ...............................................//
  
  if (ballOffsetY + ball.clientHeight > fieldHeight) {
    speedY = -speedY;
    ballOffsetY = fieldHeight - ball.clientHeight;
  }

  if (ballOffsetY < 0) {
    speedY = -speedY;
    ballOffsetY = 0;
  }

  update();
};

const moveRacket = (e) => {

  function outFromBorder(el, cls, i) {
    if ((parseInt(el.style.top) < 0 || parseInt(el.style.top) > fieldHeight - el.clientHeight) && el.className === cls) {
      switch (el.className) {
        case "racket left": el.style.top = `${(leftRacketTop -= i)}px`;
        break;
        case "racket right": el.style.top = `${(rightRacketTop -= i)}px`;
        break;
      }
    }  
  }

  function checkRacket(el, code, cls, i) {
    if (e.code === code && el.className === cls) {
      switch (el.className) {
        case "racket left":  el.style.top = `${(leftRacketTop += i)}px`;
        break;
        case "racket right":  el.style.top = `${(rightRacketTop += i)}px`;
        break;
      }
    }

    outFromBorder(el, "racket left", i);
    outFromBorder(el, "racket right", i);
  }

  rackets.forEach((el) => {
    checkRacket(el, "ControlLeft", "racket left", incr);
    checkRacket(el, "ShiftLeft", "racket left", -incr);
    checkRacket(el, "ArrowDown", "racket right", incr);
    checkRacket(el, "ArrowUp", "racket right", -incr);
  });
};

update();

btnStart.addEventListener("click", start);
btnStop.addEventListener("click", stop);
window.addEventListener("keydown", (e) => moveRacket(e));
