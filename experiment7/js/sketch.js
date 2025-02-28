// sketch.js - purpose and description here
// Author: William Klunder
// Date:2/20/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
const PARTICLE_COUNT = 100;

// Globals
let canvasContainer;
var centerHorz, centerVert;
let inputBox;

let windSpeed = 0;
let windAngle = 0;
let latitude = 36.9741;
let longitude = -122.0308
let mode = 1;

let particles = [];
let currentLocation = "Santa Cruz, CA";

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

  createInputBox();
  // Setup for particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}


function draw() {

  drawBackground();

    // Display wind info
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text(`Location: ${currentLocation}`, width / 2, 30);
    text(`Wind Speed: ${windSpeed} m/s`, width / 2, height - 50);
    text(`Wind Direction: ${windAngle}°`, width / 2, height - 20);
  
    // Draw wind direction arrow
    if(mode == 1){
      push();
      translate(width / 2, height / 2);
      rotate(radians(windAngle)); // Rotate arrow to match wind direction
      drawArrow();
      pop();
    }else if (mode == 2){
      push();
      translate(width / 2, height / 2);
      rotate(radians(windAngle)); // Rotate arrow to match wind direction
      drawArrow();
      pop();
      for (let p of particles) {
        p.update();
        p.show();
      }
    }
}

function drawBackground() {
  let col1 = color(20, 20, 40);
  let col2 = color(20 + windSpeed * 5, 50, 100 + windSpeed * 10);

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(col1, col2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawArrow() {
  stroke(255);
  strokeWeight(3);
  fill(255);

  let arrowSize = map(windSpeed, 0, 20, 20, 80);

  line(-arrowSize, 0, arrowSize, 0);
  line(arrowSize, 0, arrowSize - 10, -10);
  line(arrowSize, 0, arrowSize - 10, 10);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(0.5, 2);
  }

  update() {
    let angle = radians(windAngle);
    this.x += cos(angle) * this.speed * windSpeed * 0.1;
    this.y += sin(angle) * this.speed * windSpeed * 0.1;

    if (this.x > width) this.x = 0;
    if (this.y > height) this.y = 0;
    if (this.x < 0) this.x = width;
    if (this.y < 0) this.y = height;
  }

  show() {
    noStroke();
    fill(255, 200);
    ellipse(this.x, this.y, 5, 5);
  }
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

function createInputBox() {
  inputBox = createInput("");
  inputBox.position(width/2-70, height-20);
  inputBox.size(200);
  inputBox.attribute("placeholder", "Enter city or lat,lon");
  inputBox.style("display", "none");

  let submitButton = createButton("Set Location");
  submitButton.position(width/2 + 140, height-20);
  submitButton.mousePressed(handleLocationInput);
  submitButton.style("display", "none");

  inputBox.show();
  submitButton.show();
}

function handleLocationInput() {
  let userInput = inputBox.value().trim();

  if (!userInput) return;

  if (userInput.includes(",")) {
    // User entered lat,lon
    let parts = userInput.split(",");
    if (parts.length === 2) {
      latitude = parseFloat(parts[0]);
      longitude = parseFloat(parts[1]);
      currentLocation = `Lat: ${latitude}, Lon: ${longitude}`;
      getWindData();
    }
  } else {
    // User entered a city name
    getCoordinates(userInput);
  }

  inputBox.value("");
}

function getCoordinates(cityName) {
  let geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`;

  fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        latitude = parseFloat(data[0].lat);
        longitude = parseFloat(data[0].lon);
        currentLocation = cityName;
        getWindData();
      } else {
        console.error("City not found");
      }
    })
    .catch(error => console.error("Error fetching city coordinates:", error));
}

// Mode switching via keyboard
function keyPressed() {
  if (key === '1') mode = 1;
  if (key === '2') mode = 2;
}
