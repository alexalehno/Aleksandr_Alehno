"use strict";

function HachStorageFunc() {
  this.addValue = function (key, value) {
    this[key] = value;
  };

  this.getValue = function (key) {
    return this[key];
  };

  this.deleteValue = function (key) {
    if (this[key]) {
      delete this[key];
      return true;
    } else return false;
  };

  this.getKeys = function () {
    return Object.keys(this);
  };

  Object.defineProperties(this, {
    addValue: { enumerable: false },
    getValue: { enumerable: false },
    deleteValue: { enumerable: false },
    getKeys: { enumerable: false },
  });
}

let drinkStorage = new HachStorageFunc();

addInfo.addEventListener("click", function () {
  let isAlcoholic;
  let drinkRecipe;
  let drinkName = prompt("введите название напитка", "сок").trim().toLowerCase();

  if (drinkName) isAlcoholic = prompt("алкогольный ?", "нет").trim().toLowerCase();
  else return;
  if (isAlcoholic) drinkRecipe = prompt("рецепт приготовления", "выжать апельсин").trim().toLowerCase();
  else return;
  if (!drinkRecipe) return;

  drinkStorage.addValue(drinkName, {
    drinkName,
    isAlcoholic,
    drinkRecipe,
  });
});

getInfo.addEventListener("click", function () {
  let drinkName = prompt("введите название напитка", "сок").trim().toLowerCase();
  if (drinkName in drinkStorage) {
    let drinkInfo = drinkStorage.getValue(drinkName);
    console.log(`    напиток: ${drinkInfo.drinkName}
    алкогольный: ${drinkInfo.isAlcoholic}
    рецепт приготовления: ${drinkInfo.drinkRecipe}`);
  } else alert(`такого напитка "${drinkName}" нет`);
});

deleteInfo.addEventListener("click", function () {
  let drinkName = prompt("введите название напитка", "сок").trim().toLowerCase();
  drinkStorage.deleteValue(drinkName)
    ? console.log(`напиток "${drinkName}" удален`)
    : alert(`такого напитка "${drinkName}" нет`);
});

allInfo.addEventListener("click", function () {
  let allName = drinkStorage.getKeys();
  allName.length !== 0
    ? allName.forEach((name, index) => console.log(`${index + 1}: ${name}`))
    : console.log("пусто");
});
