"use strict";

let canvas = document.querySelector("#clock");
let ctx = canvas.getContext("2d");
let centerX = canvas.clientWidth / 2;
let centerY = canvas.clientHeight / 2;

function createCircle(x, y, r, bg) {
  ctx.beginPath();
  ctx.fillStyle = bg;
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.fill();
}

function createNumText(content, x, y, fontSize) {
  ctx.fillStyle = "#2b2a29";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${fontSize}px Arial, Helvetica, sans-serif`;
  ctx.fillText(content, x, y);
}

function createArrow(x1, y1, x2, y2, width, deg, arrowOffset) {
  ctx.resetTransform();
  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate((Math.PI / 180) * deg);
  ctx.translate(-250, -250);
  ctx.strokeStyle = "#2b2a29";
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1 + arrowOffset);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function createClock(numRadius) {
  createCircle(centerX, centerY, 200, "#fcca66");

  for (let i = 1; i <= 12; i++) {
    let x = Math.cos(30 * i * (Math.PI / 180) - 1.57) * numRadius;
    let y = Math.sin(30 * i * (Math.PI / 180) - 1.57) * numRadius;

    x = x + centerX;
    y = y + centerY;
    
    createCircle(x, y, 25, "#48b382");
    createNumText(i, x, y, 21);
  }
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
    let time = `${formatTime(hours, 2)}:${formatTime(minutes, 2)}:${formatTime(seconds, 2)}`;

    createClock(160);

    createNumText(time, centerX, 190, 35);
    createArrow(centerX, centerY, centerX, 90, 3, seconds * 6, 20);
    createArrow(centerX, centerY, centerX, 110, 6, minutes * 6, 20);
    createArrow(centerX, centerY, centerX, 150, 10, hours * 30 + minutes / 2, 20);

    requestAnimationFrame(showTime);
  }

  requestAnimationFrame(showTime);
}

start();
