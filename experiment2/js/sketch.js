// sketch.js - purpose and description here
// Author: William Klunder
// Date: 1/20/2025


// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

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
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);

  // Variables for wave control
  let frequency = map(mouseX, 0, width, 1, 10); // Frequency controlled by mouseX
  let modFrequency = map(mouseY, 0, height, 0.5, 5); // Modulating frequency controlled by mouseY
  let phi = frameCount % 360; // Phase shift over time

  // Draw the wave with combined sine and cosine oscillation
  strokeWeight(2);
  noFill();
  beginShape();
  for (let x = 0; x <= width; x++) {
    stroke(100,100,100);

    // Calculate the combined oscillation
    let angle = map(x, 0, width, 0, TWO_PI);
    let sinWave = sin(angle * frequency + radians(phi));
    let cosWave = cos(angle * modFrequency);
    let y = sinWave * cosWave;
    y *= height / 4; // Scale the amplitude

    // Draw the vertex
    vertex(x, height / 2 + y);
  }
  endShape();

  // Display instructions
  fill(0);
  noStroke();
  textSize(16);
  text('Move your mouse to control the oscillation.', 10, 30);
  text('Horizontal: Frequency | Vertical: Amplitude', 10, 50);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  
}