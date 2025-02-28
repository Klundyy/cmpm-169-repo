// sketch.js - purpose and description here
// Author: William Klunder
// Date:2/20/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts

// Globals
let canvasContainer;
var centerHorz, centerVert;

let windSpeed = 0;
let windAngle = 0;
let latitude = 36.9741;
let longitude = -122.0308

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2;
  centerVert = canvasContainer.height() / 2;
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  $(window).resize(resizeScreen);
  resizeScreen();

  getWindData();
  setInterval(getWindData, 60000);
}


function draw() {
  background(30);

  // Display wind info
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text(`Wind Speed: ${windSpeed} m/s`, width / 2, height - 50);
  text(`Wind Direction: ${windAngle}°`, width / 2, height - 20);

  // Draw wind direction arrow
  push();
  translate(width / 2, height / 2);
  rotate(radians(windAngle)); // Rotate arrow to match wind direction
  drawArrow();
  pop();
}

function drawArrow() {
  stroke(255);
  strokeWeight(3);
  fill(255);

  let arrowSize = map(windSpeed, 0, 20, 20, 80); // Scale arrow size based on wind speed

  line(-arrowSize, 0, arrowSize, 0); // Main arrow shaft
  line(arrowSize, 0, arrowSize - 10, -10); // Arrowhead line 1
  line(arrowSize, 0, arrowSize - 10, 10);  // Arrowhead line 2
}

function getWindData() {
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=wind_speed_10m,wind_direction_10m`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      windSpeed = data.current.wind_speed_10m;
      windAngle = data.current.wind_direction_10m;
    })
    .catch(error => console.error("Error fetching wind data:", error));
}

// Mode switching via keyboard
function keyPressed() {
  if (key === '1') mode = 1;
  if (key === '2') mode = 2;
}
