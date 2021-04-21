"use strict";

const field = document.querySelector(".field");
const square = document.querySelector(".square");
const btnMove = document.querySelector("#move");
const btnStop = document.querySelector("#stop");

let fieldStyle = getComputedStyle(field);
let squareStyle = getComputedStyle(square);

const stop = (timer) => clearInterval(timer);

const update = () => {
  square.style.left = initialCoordX + "px";
  square.style.top = initialCoordY + "px";
};

let initialCoordX = parseInt(fieldStyle.width) / 2 - parseInt(squareStyle.width) / 2;
let initialCoordY = parseInt(fieldStyle.height) / 2 - parseInt(squareStyle.height) / 2;
let increase = 5;

// window.addEventListener("keydown", move);
btnMove.addEventListener("click", move);


function move() {
  let timer = setInterval(start , 1000 / 60);  
  btnStop.addEventListener("click", () => stop(timer));
}


function start() {
  // if (e.code === 'ArrowLeft') {
  //   initialCoordX += increase;
  // }
  // console.log(e.code)

  initialCoordX += increase;
  // initialCoordY += increase;

  if (initialCoordX > parseInt(fieldStyle.width) - parseInt(squareStyle.width)) increase = -increase;
  if (initialCoordX < 0) increase = -increase;
  if (initialCoordY > parseInt(fieldStyle.height) - parseInt(squareStyle.height)) increase = -increase;
  if (initialCoordY < 0) increase = -increase;

  update();
}

update();
