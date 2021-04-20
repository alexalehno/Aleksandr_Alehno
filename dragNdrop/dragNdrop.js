"use strict";

let images = document.querySelectorAll("img");
let zIndx = 999;

images.forEach((el) => {
  el.addEventListener("mousedown", down);
  el.addEventListener("dragstart", (e) => e.preventDefault());
});

function down(e) {
  let self = this;
  let shiftX = e.clientX - self.getBoundingClientRect().left;
  let shiftY = e.clientY - self.getBoundingClientRect().top;

  move(e);

  self.style.position = "absolute";
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
