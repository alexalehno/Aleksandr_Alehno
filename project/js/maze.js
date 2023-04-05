"use strict";

const WALL_COLOR = "black";
const TUNNEL_COLOR = "white";
const WORM_COLOR = "rgb(153, 2, 2)";
const BACKGROUND_COLOR = "black";

let DELAY_TIMEOUT = levelStore[currentLevel].delayTime;
let WORM_NUMBER = levelStore[currentLevel].wormNum;
let ROWS = levelStore[currentLevel].quantityCells;
let COLUMNS = ROWS;
let CELL_SIZE = levelStore[currentLevel].sizeCell;
let PADDING = CELL_SIZE;

let matrix = null;
let canvas = null;
let ctx = null;

// .....................................

const delay = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const getRandomItem = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

const drawSquare = (x, y, width, height, color) => {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
};

const isValidMaze = () => {
  for (let y = 0; y < COLUMNS; y += 2) {
    for (let x = 0; x < ROWS; x += 2) {
      if (!matrix[y][x]) {
        return false;
      }
    }
  }
  return true;
};

// .....................................
const drawMaze = () => {
  canvas.width = PADDING * 2 + COLUMNS * CELL_SIZE;
  canvas.height = PADDING * 2 + ROWS * CELL_SIZE;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSquare(0, 0, canvas.width, canvas.height, BACKGROUND_COLOR);

  for (let y = 0; y < COLUMNS; y++) {
    for (let x = 0; x < ROWS; x++) {
      const color = matrix[y][x] ? TUNNEL_COLOR : WALL_COLOR;

      drawSquare(
        PADDING + x * CELL_SIZE,
        PADDING + y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE,
        color
      );
    }
  }

  drawSquare(
    0,
    0 + PADDING,
    CELL_SIZE,
    CELL_SIZE,
    "rgb(151, 151, 150)"
  );

  drawSquare(
    PADDING * 2 + (matrix.length - 1) * CELL_SIZE,
    PADDING + (matrix.length - 1) * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE,
    "rgb(153, 2, 2)"
  );
};

const moveWorm = (worm) => {
  const directions = [];

  if (worm.x > 0) directions.push([-2, 0]);
  if (worm.x < COLUMNS - 1) directions.push([2, 0]);
  if (worm.y > 0) directions.push([0, -2]);
  if (worm.y < ROWS - 1) directions.push([0, 2]);

  const [dx, dy] = getRandomItem(directions);

  worm.x += dx;
  worm.y += dy;

  if (!matrix[worm.y][worm.x]) {
    matrix[worm.y][worm.x] = true;
    matrix[worm.y - dy / 2][worm.x - dx / 2] = true;
  }
};

const createMatrix = (columns, rows) => {

  const matrix = [];

  for (let y = 0; y < rows; y++) {
    const row = [];

    for (let x = 0; x < columns; x++) {
      row.push(false);
    }

    matrix.push(row);
  }

  return matrix;
};
// ///////////////////////////////////////////////

async function buildMaze() {
  let worms = null;
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  matrix = createMatrix(COLUMNS, ROWS);
  matrix[0][0] = true;

  worms = [];

  for (let i = 0; i < WORM_NUMBER; i++) {
    worms.push({ x: 0, y: 0 });
  }

  while (!isValidMaze()) {
    for (const worm of worms) {
      moveWorm(worm);
    }

    drawMaze();

    for (const worm of worms) {
      drawSquare(
        PADDING + worm.x * CELL_SIZE,
        PADDING + worm.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE,
        WORM_COLOR
      );
    }

    await delay(DELAY_TIMEOUT);
  }
  
  drawMaze();
}

buildMaze();
