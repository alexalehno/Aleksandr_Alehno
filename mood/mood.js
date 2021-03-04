function randomDiap(n, m) {
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

  let usedColors = {};

  console.log("цветов: " + colorsCount);

  for (let i = 1; i <= colorsCount; i++) {
    let colorName = colors[randomDiap(1, 7)];
    if (!(colorName in usedColors))
      (usedColors[colorName] = true), console.log(colorName);
  }
}

mood(5);