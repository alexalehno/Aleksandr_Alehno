"use strict";

let images = document.querySelectorAll("img");
let zIndx = 999;
let placeArr = [];

for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("mousedown", down);
  images[i].addEventListener("dragstart", (e) => e.preventDefault());

  placeArr.push(images[i].offsetLeft + images[i].width * i);
  images[i].style.position = "absolute";
  images[i].style.left = `${placeArr[i]}px`;
}

function down(e) {
  let self = this;
  let shiftX = e.clientX - self.getBoundingClientRect().left;
  let shiftY = e.clientY - self.getBoundingClientRect().top;

  self.style.cursor = "grabbing";
  self.style.zIndex = zIndx;

  document.addEventListener("mousemove", move);
  self.addEventListener("mouseup", up);

  function move(e) {
    self.style.zIndex = zIndx++;
    self.style.left = e.pageX - shiftX + "px";
    self.style.top = e.pageY - shiftY + "px";
  }

  function up() {
    self.style.cursor = "";
    document.removeEventListener("mousemove", move);
    self.removeEventListener("mouseup", up);
  }
}
