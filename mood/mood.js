"use strict";

function randomRange(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
  const colors = [
    "",
    "красный",
    "оранжевый",
    "жёлтый",
    "зелёный",
    "голубой",
    "синий",
    "фиолетовый",
  ];

  console.log("цветов: " + colorsCount);

  let usedColors = new Set();

  while (usedColors.size !== colorsCount) {
    if (colorsCount > colors.length - 1) {
      console.log(`Количество цветов не должно превышать ${colors.length - 1}`);
      break;
    }
    let colorName = colors[randomRange(1, 7)];
    usedColors.add(colorName);
  }

  usedColors.forEach((value) => console.log(value));
}

mood(4);
