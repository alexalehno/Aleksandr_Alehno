"use strict";

let images = document.querySelectorAll("img");
let zIndx = 999;

for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("mousedown", down);
  images[i].addEventListener("dragstart", (e) => e.preventDefault());

  images[i].style.position = "absolute";
  images[i].style.zIndex = zIndx;
  images[i].style.left = `${images[i].width * i}px`;
}

function down(e) {
  let self = this;
  let shiftX = e.clientX - self.getBoundingClientRect().left;
  let shiftY = e.clientY - self.getBoundingClientRect().top;

  self.style.cursor = "grabbing";
  self.style.zIndex = ++zIndx;

  function move(e) {
    self.style.left = `${e.pageX - shiftX}px`;
    self.style.top = `${e.pageY - shiftY}px`;
  }

  function up() {
    self.style.cursor = "";
    document.removeEventListener("mousemove", move);
    self.removeEventListener("mouseup", up);
  }

  document.addEventListener("mousemove", move);
  self.addEventListener("mouseup", up);
}
