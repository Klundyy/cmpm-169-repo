// sketch.js - purpose and description here
// Author: William Klunder
// Date:2/10/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts

// Globals
let canvasContainer;
var centerHorz, centerVert;

let grammar;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2;
  centerVert = canvasContainer.height() / 2;
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  background(255);
  textSize(18);
  noLoop();
  grammar = {
    "<sentence>": ["<subject> <verb> <object>."],
    "<subject>": ["The cat", "A robot", "An alien", "The wizard", "A scientist"],
    "<verb>": ["eats", "builds", "destroys", "creates", "analyzes"],
    "<object>": ["a sandwich", "a spaceship", "a time machine", "a mystery", "a program"]
  };
  let generatedSentence = expand("<sentence>");
  text(generatedSentence, 20, 100);
}

function expand(symbol) {
  if (grammar[symbol]) {
    let expansion = random(grammar[symbol]); // Pick a random rule
    return expansion.replace(/<[^>]+>/g, match => expand(match)); // Expand all placeholders
  }
  return symbol; // Return terminals as is
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {

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