"use strict";

const score = document.querySelector("span");
const field = document.querySelector(".field");
const square = document.querySelector(".square");
const btnMove = document.querySelector("#move");
const btnStop = document.querySelector("#stop");

let fieldStyle = getComputedStyle(field);
let squareStyle = getComputedStyle(square);
let x = parseInt(fieldStyle.width) / 2 - parseInt(squareStyle.width) / 2;
let y = parseInt(fieldStyle.height) / 2 - parseInt(squareStyle.height) / 2;
let borderW = parseInt(fieldStyle.width) - parseInt(squareStyle.width);
let borderH = parseInt(fieldStyle.height) - parseInt(squareStyle.height);
let incr = 1;
let timer;


const stop = (timer) => clearInterval(timer);

const start = (e) => {
  timer = setInterval(() => direction(e), 1000 / 60);
} 

const increase = (e) => {
  if (e.code) incr++;
  if(!(field.style.backgroundColor === 'red')) score.innerHTML = incr - 1;
} 

const update = () => {
  square.style.left = `${x}px`;
  square.style.top = `${y}px`;
};

const direction = (e) => {
  if (x >= borderW || x <= 0 || y >= borderH || y <= 0) {
    field.style.backgroundColor = 'red';
    return;
  } 
  
  if (e.code) {
    stop(timer);
    start(e);

    switch (e.code) {
      case "ArrowUp": y += -incr;
      break;
      case "ArrowDown": y += incr;
      break;
      case "ArrowLeft": x += -incr;
      break;
      case "ArrowRight": x += incr;
      break;
    }
  } else x += incr; 
   
  update();
};

update();

btnStop.addEventListener("click", () => stop(timer));
btnMove.addEventListener("click", (e) => start(e));

window.addEventListener("keydown", (e) => {
  direction(e);
  increase(e);
});

