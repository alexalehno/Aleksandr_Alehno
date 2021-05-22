"use strict";

const TRACTOR_NUMBER = 5;
const DELAY_TIMEOUT = 0;

const WALL_COLOR = "black";
const TUNNEL_COLOR = "white";
const TRACTOR_COLOR = "red";
const BACKGROUND_COLOR = "black";


let ROWS = 11;
let COLUMNS = ROWS;
let CELL_SIZE = 55;
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

const moveTractor = (tractor) => {
  const directions = [];

  if (tractor.x > 0) directions.push([-2, 0]);
  if (tractor.x < COLUMNS - 1) directions.push([2, 0]);
  if (tractor.y > 0) directions.push([0, -2]);
  if (tractor.y < ROWS - 1) directions.push([0, 2]);

  const [dx, dy] = getRandomItem(directions);

  tractor.x += dx;
  tractor.y += dy;

  if (!matrix[tractor.y][tractor.x]) {
    matrix[tractor.y][tractor.x] = true;
    matrix[tractor.y - dy / 2][tractor.x - dx / 2] = true;
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

  drawSquare(0, 0 + PADDING, CELL_SIZE, CELL_SIZE, "rgb(151, 151, 150)");

  drawSquare(
    PADDING * 2 + (matrix.length - 1) * CELL_SIZE,
    PADDING + (matrix.length - 1) * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE,
    "rgb(153, 2, 2)"
  );
};

// ///////////////////////////////////////////////112
async function buildMaze() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  const tractors = [];

  for (let i = 0; i < TRACTOR_NUMBER; i++) {
    tractors.push({ x: 0, y: 0 });
  }

  matrix = createMatrix(COLUMNS, ROWS);

  matrix[0][0] = true;

  while (!isValidMaze()) {
    for (const tractor of tractors) {
      moveTractor(tractor);
    }

    drawMaze();

    for (const tractor of tractors) {
      drawSquare(
        PADDING + tractor.x * CELL_SIZE,
        PADDING + tractor.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE,
        TRACTOR_COLOR
      );
    }

    await delay(DELAY_TIMEOUT);
  }
  drawMaze();
}

buildMaze();
