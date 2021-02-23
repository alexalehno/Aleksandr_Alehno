"use strict";

class HachStorageClass {
  addValue(key, value) {
    this[key] = value;
  }

  getValue(key) {
    return this[key];
  }

  deleteValue(key) {
    if (this[key]) {
      delete this[key];
      return true;
    } else return false;
  }

  getKeys() {
    return Object.keys(this);
  }
}

let drinkStorage = new HachStorageClass();

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
