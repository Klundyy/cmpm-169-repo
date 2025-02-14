// sketch.js - purpose and description here
// Author: William Klunder
// Date:2/10/2025

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
let spacing = 10;
let w = 400;
let h = 400;
let heights = [];





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
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  angleMode(DEGREES);
  cols = w / spacing;
  rows = h / spacing;
  
  // Initialize height values to 0
  for (let x = 0; x < cols; x++) {
    heights[x] = [];
    for (let y = 0; y < rows; y++) {
      heights[x][y] = 0;
    }
  }

  
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);
  rotateX(60);
  rotateZ(frameCount/5);
  translate(-w / 2, -h / 2); // Center the grid

  stroke(color(0,100,180));
  noFill();

  // Draw grid as lines
  for (let y = 0; y < rows - 1; y++) {
    beginShape();
    for (let x = 0; x < cols; x++) {
      let xPos = x * spacing;
      let yPos = y * spacing;
      let zPos = sin(frameCount+x*20)*60;
      vertex(xPos, yPos, zPos);
    }
    endShape();
  }
}



// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {

}

function keyPressed() {
 
}