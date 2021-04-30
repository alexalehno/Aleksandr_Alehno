"use strict";

let clock = document.querySelector(".clock");
let stopBtn = document.querySelector(".stop");
let startBtn = document.querySelector(".start");

let arrowH = document.createElement("div");
let arrowM = document.createElement("div");
let arrowS = document.createElement("div");
let requestId = null;

function createClockNum(radius) {
  for (let i = 1; i <= 12; i++) {
    let num = document.createElement("div");
    clock.appendChild(num);
    num.className = "num";
    num.innerText = i;

    let x = Math.cos(30 * i * (Math.PI / 180) - 1.57) * radius;
    let y = Math.sin(30 * i * (Math.PI / 180) - 1.57) * radius;

    num.style.left = `${x + clock.offsetWidth / 2 - num.offsetWidth / 2}px`;
    num.style.top = `${y + clock.offsetWidth / 2 - num.offsetWidth / 2}px`;
  }
}

function createArrow(arrow, classN, arrowOffset) {
  clock.appendChild(arrow);
  arrow.className = classN;
  arrow.style.transformOrigin = `50% ${arrow.offsetHeight - arrowOffset}px`;
  arrow.style.left = `${clock.offsetWidth / 2 - arrow.offsetWidth / 2}px`;
  arrow.style.bottom = `${clock.offsetHeight / 2 - arrowOffset}px`;
}

function start() {
  function formatTime(value, size) {
    let strValue = value.toString();
    while (strValue.length < size) strValue = "0" + strValue;
    return strValue;
  }

  function showTime() {
    let date = new Date();
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();

    timeDiv.innerHTML = `${formatTime(hours, 2)}: ${formatTime(minutes,2)}: ${formatTime(seconds, 2)}`;

    arrowS.style.transform = `rotate(${seconds * 6}deg)`;
    arrowM.style.transform = `rotate(${minutes * 6}deg)`;
    arrowH.style.transform = `rotate(${hours * 30 + minutes / 2}deg)`;

    requestId = requestAnimationFrame(showTime)
  }

  let clearTimeDiv = document.querySelector(".time_div");
  if (clearTimeDiv) clearTimeDiv.remove();

  let timeDiv = document.createElement("div");
  timeDiv.className = "time_div";
  clock.appendChild(timeDiv);

  if (requestId) {
    cancelAnimationFrame(requestId);  
    requestId = 0;
  }  
    
  requestId = requestAnimationFrame(showTime);
  stopBtn.addEventListener("click", () => cancelAnimationFrame(requestId));
}

createClockNum(160);
createArrow(arrowH, "h_arrow", 20);
createArrow(arrowM, "m_arrow", 20);
createArrow(arrowS, "s_arrow", 20);

startBtn.addEventListener("click", start);

