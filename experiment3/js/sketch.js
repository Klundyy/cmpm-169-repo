// sketch.js - purpose and description here
// Author: William Klunder
// Date:1/27/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

let cols, rows;
let cellSize = 20;
let grid = [];
let isExpansionActive = false;
let noiseScale = 0.1;

let expansionCenterX = 500;
let expansionCenterY = 500;
let expansionRadius = 150; 
let expansionIntensity = 0.1;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  initGrid();
  drawGrid();
}

function updateNoiseExpansion() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let distance = dist(x * cellSize, y * cellSize, expansionCenterX, expansionCenterY);
      let height = noise(x * noiseScale, y * noiseScale, millis() * 0.001);

      let expansionEffect = map(distance, 0, expansionRadius, expansionIntensity, 0);
      grid[y][x].height = height + expansionEffect;
    }

  }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  if(isExpansionActive){
    updateNoiseExpansion();
    drawGrid();
  }
}

// Create an array grid
function initGrid() {
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      row.push({
        height: random(1)
      });
    }
    grid.push(row);
  }
}

function initNoiseGrid() {
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      let height = noise(x * noiseScale, y * noiseScale);
      row.push({ height: height});
    }
    grid.push(row);
  }
}

// Visualize the array
function drawGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = grid[y][x];
      let cellColor = color(map(cell.height, 0, 1, 50, 255),0,255);
      fill(cellColor);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function drawLineGrid() {
  let time = millis() * 0.001;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = grid[y][x];
      let x1 = x * cellSize + cellSize / 2;
      let y1 = y * cellSize + cellSize / 2;

      let noiseOffsetX = noise(x * 0.1, time) * cellSize;
      let noiseOffsetY = noise(y * 0.1, time + 1000) * cellSize;

      let x2 = x1 + cos(cell.height + noiseOffsetX) * cellSize;
      let y2 = y1 + sin(cell.height + noiseOffsetY) * cellSize;
      let distToMouse = dist(mouseX, mouseY, x1, y1);
      let colorFactor = map(distToMouse, 0, width, 255, 50);

      stroke(lerpColor(color(0, 255, 255), color(255, 0, 255), (sin(time * 0.5) + 1) / 2), colorFactor);

      let lineThickness = map(noise(x * 0.1, y * 0.1), 0, 1, 0.5, 3);
      strokeWeight(lineThickness);

      line(x1, y1, x2, y2);
    }
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  expansionCenterX = mouseX;
  expansionCenterY = mouseY;
}

function keyPressed() {
  if (key === '1') {
    isExpansionActive = false;
    grid = [];
    initGrid();
    drawGrid();
    console.log("normal grid");
  }

  if (key === '2') {
    isExpansionActive = false;
    grid = [];
    initNoiseGrid();
    drawGrid();
    console.log("noise grid");
  }

  if(key === '3'){
    isExpansionActive = false;
    grid = [];
    initGrid();
    drawLineGrid();
  }

  if (key === '4') {
    isExpansionActive = !isExpansionActive;
  }

  if (key === '=') {
    expansionRadius += 10;
  }

  if (key === '-') {
    expansionRadius -= 10;
  }

  if (keyCode === ENTER) {
  }
}