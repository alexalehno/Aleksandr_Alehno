"use strict";

let arrData = [];
let basket = [];

function getData(arr) {
  event.preventDefault();
  let objData = {};
  document.forms.form
    .querySelectorAll("input")
    .forEach((el) => (objData[el.name] = el.value));
  arr.push(objData);
  arr.forEach((el, i) => (el.id = i));
  console.log(arr);
}

function render(arr) {
  event.preventDefault();

  document.querySelectorAll(".item").forEach((el) => el.remove());

  arr.forEach((el) => {
    let div = document.createElement("div");
    div.className = "item";
    let strData = `
      <div>id: ${el.id}</div>
      <img src = "${el.img}">
      <div><b>цена: ${el.price}</b></div>
      <hr>
      <div><b>описание:</b> ${el.description}</div>
    `;
    div.innerHTML = strData;
    document.querySelector(".container").append(div);

    let button = document.createElement("button");
    button.innerHTML = "add";
    div.append(button);

    div.addEventListener("click", function (event) {
      let basketDiv = document.querySelector(".basket");
      
      if (event.target === button && button.innerHTML === "add") {
        button.innerHTML === "add"
          ? (button.innerHTML = "delete")
          : (button.innerHTML = "add");
        basket.push(this);
        basketDiv.append(this);
      } else if (event.target === button && button.innerHTML === "delete") {
        basket.pop(this);
        this.remove();
      }

      console.log(basket);
    });
  });
}

function deleteItem(arr) {
  event.preventDefault();

  arr.pop();
  render(arrData);
  console.log(arr);
}

document.getElementById("saveBtn").addEventListener("click", () => {
  getData(arrData);
});
document.getElementById("renderBtn").addEventListener("click", () => {
  render(arrData);
});
document.getElementById("deleteBtn").addEventListener("click", () => {
  deleteItem(arrData);
});
