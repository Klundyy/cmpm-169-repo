// sketch.js - purpose and description here
// Author: William Klunder
// Date:2/10/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts

// Globals
let canvasContainer;
var centerHorz, centerVert;

let cols, rows;
let spacing = 10;
let w = 400;
let h = 400;
let currentOrigin, newOrigin;
let intervalAmount = 50;
let mode = 1;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2;
  centerVert = canvasContainer.height() / 2;
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  angleMode(DEGREES);
  cols = w / spacing;
  rows = h / spacing;

  // Random spawn point for wave
  let randomX = floor(random(cols));
  let randomY = floor(random(rows));
  currentOrigin = createVector(random(cols), random(rows));
  newOrigin = createVector(random(cols), random(rows));
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);
  rotateX(60);
  rotateZ(frameCount / 5);
  translate(-w / 2, -h / 2);

  stroke(color(0, 100, 180));
  noFill();

  currentOrigin.lerp(newOrigin, 0.005);
  // Make a new target location
  if (frameCount % intervalAmount === 0) {
    newOrigin = createVector(random(cols), random(rows));
  }
  // Draw grid as lines
  for (let y = 0; y < rows - 1; y++) {
    beginShape();
    for (let x = 0; x < cols; x++) {
      let xPos = x * spacing;
      let yPos = y * spacing;
      let distFromOrigin = dist(x, y, currentOrigin.x, currentOrigin.y);
      if(mode == 1){
        zPos = sin(frameCount - distFromOrigin * 10) * 60;
      } else if(mode == 2){
        zPos = sin(frameCount - distFromOrigin * random(0,5)) * 60;
      }

      vertex(xPos, yPos, zPos);
    }
    endShape();
  }
}




// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {

}

function keyPressed() {
  if (key === '1') {
    mode = 1;
  }
  if (key === '2') {
    mode = 2;
  }
}