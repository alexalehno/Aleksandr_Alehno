"use strict";

const field = document.querySelector(".field");
const square = document.querySelector(".square");
const btnMove = document.querySelector("#move");
const btnStop = document.querySelector("#stop");

btnMove.addEventListener("click", move);

function move() {
  btnStop.addEventListener("click", () => stop(timer));

  let fieldStyle = getComputedStyle(field);
  let squareStyle = getComputedStyle(square);
  let start = parseInt(squareStyle.left);
  const stop = (timer) => clearInterval(timer);

  const timer = setInterval(() => {
    if (start >= parseInt(fieldStyle.width) - parseInt(squareStyle.width)) {
      start = 0;
    }

    square.style.left = `${start}px`;
    start++;
  }, 0);
}
