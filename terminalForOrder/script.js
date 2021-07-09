"use strict";

let type = document.querySelector("#type");
let size = document.querySelector("#size");
let sauce = document.querySelector("#sauce");
let typeValue = null;
let sizeValue = null;
let sauceValue = null;

let price = {
  pricePizza: {
    Пепперони: 10,
    Деревенская: 20,
    Гавайская: 30,
    Грибная: 40,
  },
  priceSize: {
    21: 100,
    26: 200,
    31: 300,
    45: 400,
  },
  priceSauce: {
    сырный: 1,
    "кисло-сладкий": 2,
    чесночный: 3,
    барбекю: 4,
  },
};

function chooseItem(dropDn, nextDropDn) {
  let value = dropDn.value;
  if (value && nextDropDn) nextDropDn.removeAttribute("disabled");
  return value;
}

function getOrder() {
  let innerCheque = `
  <ul>
  <li><b>Пицца: </b>${typeValue}</li>
  <li><b>Размер: </b>${sizeValue}</li>
  <li><b>Соус: </b>${sauceValue}</li>
  <ul/>
  <p>Цена: <b>${
    price.pricePizza[typeValue] +
    price.priceSize[sizeValue] +
    price.priceSauce[sauceValue]
  }</b></p>
  `;

  document.querySelector(".inner").innerHTML = innerCheque;
  document.querySelector(".cheque").classList.remove("hidden");
  document.querySelector(".ok_btn").addEventListener("click", () => {
    document.querySelector(".cheque").classList.add("hidden");
  });
}

type.addEventListener("click", () => (typeValue = chooseItem(type, size)));
size.addEventListener("click", () => (sizeValue = chooseItem(size, sauce)));
sauce.addEventListener("click", () => (sauceValue = chooseItem(sauce)));

document.querySelector(".order_btn").addEventListener("click", (e) => {
  e.preventDefault();
  if (typeValue && sizeValue && sauceValue) {
    getOrder();
  } else alert("нужно выбрать все поля");
});
