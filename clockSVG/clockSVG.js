"use strict";


function createCircle(parent, r, cx, cy, bg) {
  let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("fill", bg);
  circle.setAttribute("r", r);
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  parent.appendChild(circle);
}

function createNumText(x, y, fontSize, content) {
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("font-size", fontSize);
  text.setAttribute("fill", "#2b2a29");
  text.setAttribute("font-family", "Arial, Helvetica, sans-serif");
  text.setAttribute("text-anchor", "middle");
  text.innerHTML = content;
  clock.appendChild(text);
  return text;
}

function createArrow(x1, y1, x2, y2, width) {
  let arrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arrow.setAttribute("x1", x1);
  arrow.setAttribute("y1", y1);
  arrow.setAttribute("x2", x2);
  arrow.setAttribute("y2", y2);
  arrow.setAttribute("stroke", "#2b2a29");
  arrow.setAttribute("stroke-linecap", "round");
  arrow.setAttribute("stroke-width", width);
  arrow.style.transformOrigin = "center";
  clock.appendChild(arrow);
  return arrow;
}


function createClock(numRadius) {
  let clock = document.querySelector("#clock");
  createCircle(clock, 200, 250, 250, "#fcca66");

  for (let i = 1; i <= 12; i++) {
    let x = Math.cos(30 * i * (Math.PI / 180) - 1.57) * numRadius;
    let y = Math.sin(30 * i * (Math.PI / 180) - 1.57) * numRadius;

    x = x + clock.clientWidth / 2;
    y = y + clock.clientHeight / 2;

    createCircle(clock, 25, x, y, "#48b382");
    createNumText(x, y + 5, 21, i);
  }
}

function start() {
  let timeDiv =  createNumText(250, 190, 35 );
  let arrowH = createArrow(250, 270, 250, 150, 10);
  let arrowM = createArrow(250, 270, 250, 110, 6);
  let arrowS = createArrow(250, 270, 250, 90, 3);

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
    
    timeDiv.innerHTML = `${formatTime(hours, 2)}:${formatTime(minutes,2)}:${formatTime(seconds, 2)}`;

    arrowS.style.transform = `rotate(${seconds * 6}deg)`;
    arrowM.style.transform = `rotate(${minutes * 6}deg)`;
    arrowH.style.transform = `rotate(${hours * 30 + minutes / 2}deg)`;

    requestAnimationFrame(showTime);
  }

  requestAnimationFrame(showTime);
}

createClock(160);
start() 
 


