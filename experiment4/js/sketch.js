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

let cols = 20, rows = 20;
let w, h;


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

  capture = createCapture(VIDEO);
  capture.size(cols, rows);
  capture.hide();
  w = width / cols;
  h = height / rows;
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  capture.loadPixels();

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



// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {

}

function keyPressed() {
 
}