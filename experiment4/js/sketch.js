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

let cols = 10, rows = 10;
let w, h;
let mode = 1;
let tiles = [];
let draggingTile = null;


class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}
// Tile Class
class Tile {
  constructor(x, y, w, h, gridX, gridY) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.gridX = gridX;
    this.gridY = gridY;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  update() {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  display() {
    let col = capture.get(this.gridX, this.gridY);
    fill(col);
    rect(this.x, this.y, this.w, this.h);
  }

  displayWebcam(){
    image(capture, this.x, this.y, this.w, this.h);
  }

  isMouseOver() { // Helper function to get mouse position to nearest tile
    return mouseX > this.x && mouseX < this.x + this.w &&
           mouseY > this.y && mouseY < this.y + this.h;
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

  capture = createCapture(VIDEO);
  capture.size(cols, rows);
  capture.hide();
  w = width / cols;
  h = height / rows;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      tiles.push(new Tile(x * w, y * h, w, h, x, y));
    }
  }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  capture.loadPixels();

  if(mode == 1){
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let i = (y * cols + x) * 4;
        let sx = x * w;
        let sy = y * h;
        
        let col = capture.get(x, y);
        fill(col);
        rect(sx, sy, w, h);
      }
    }
  }
  if(mode == 2){
    for (let tile of tiles) {
      tile.update();
      tile.display();
    }
  }
  if(mode == 3){
    for (let tile of tiles) {
      tile.update();
      tile.displayWebcam();
    }
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  if (mode == 2 || mode == 3) {
    for (let tile of tiles) {
      if (tile.isMouseOver()) {
        tile.dragging = true;
        tile.offsetX = tile.x - mouseX;
        tile.offsetY = tile.y - mouseY;
        draggingTile = tile;
        break;
      }
    }
  }
}

function mouseReleased(){
  if (draggingTile) {
    draggingTile.dragging = false;
    draggingTile = null;
  }
}

function keyPressed() {
  if (key === '1') {
    mode = 1;
  }
  if (key === '2') {
    mode = 2;
  }
  if (key === '3') {
    mode = 3;
  }
}