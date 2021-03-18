"use strict";

function getData(event) {
  event.preventDefault();

  let objData = {};
  document.querySelectorAll("input").forEach((el) => (objData[el.name] = el.value));

  let str = `
  <div>id: ${objData.id}</div>
  <img src = "${objData.img}">
  <div>цена: ${objData.price}</div>
  <div>описание: ${objData.description}</div>`;

  let div = document.createElement("div");
  div.className = "item";
  div.innerHTML = str;
  document.querySelector(".container").append(div);
}

function deleteItem() {
  document.querySelector(".item").remove(); 
}

document.getElementById("button").addEventListener("click", getData);
document.getElementById("buttonDelete").addEventListener("click", deleteItem);
