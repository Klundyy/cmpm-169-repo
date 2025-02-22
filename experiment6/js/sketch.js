// sketch.js - purpose and description here
// Author: William Klunder
// Date:2/10/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts

// Globals
let canvasContainer;
var centerHorz, centerVert;

let poemGrammar, haikuGrammar, mode = 1; // 1 = Poem, 2 = Haiku

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

  background(255);
  textSize(18);
  noLoop();

  // Poem Grammar
  poemGrammar = {
    "<poem>": ["<line1>\n<line2>\n<line3>\n<line4>"],
    "<line1>": ["<subject> <verb> <object>", "Beneath the <adjective> <object>"],
    "<line2>": ["The <object> <verb> <adverb>", "A <adjective> <object> sings"],
    "<line3>": ["<subject> <verb> in the <adjective> night", "Soft whispers <verb> through <object>"],
    "<line4>": ["And dreams of <adjective> <object>", "A <adjective> tale unfolds"],
    
    "<subject>": ["The moon", "A bird", "A shadow", "The ocean", "A star"],
    "<verb>": ["dances", "whispers", "shines", "sleeps", "sings"],
    "<object>": ["river", "sky", "forest", "dreams", "echoes"],
    "<adjective>": ["silent", "golden", "lonely", "ancient", "twinkling"],
    "<adverb>": ["softly", "endlessly", "gently", "silently", "calmly"]
  };

  // Haiku Grammar (words sorted by syllables)
  haikuGrammar = {
    "1": [
      "moon", "sky", "rain", "wind", "leaf", "stone", "wave", "light", "night", "bird",
      "star", "mist", "flame", "dream", "cloud", "hush", "snow", "spring", "dawn", "fog",
      "heart", "shade", "breeze", "dust", "fire", "sound", "stream", "frost", "voice"
    ],
    
    "2": [
      "silent", "whisper", "golden", "gentle", "twilight", "silver", "fading", "melting",
      "falling", "floating", "glowing", "shimmer", "sparkling", "frosted", "softly",
      "distant", "morning", "shadows", "wandering", "hollow", "wistful", "echoing",
      "luminous", "drifting", "rustling", "hidden", "flowing", "trembling", "sleeping"
    ],
    
    "3": [
      "melodies", "mysterious", "beautiful", "delicate", "fragrance", "harmony", "whispering",
      "radiance", "solitude", "butterflies", "overgrown", "peacefully", "memories", "vanishing",
      "softest touch", "sunset glow", "winter’s breath", "loneliness", "morning light",
      "flickering", "ebbing tide", "rippling waves", "swaying trees", "cherry bloom"
    ],
  
    "4": [
      "everlasting", "overwhelming", "unexpected", "melancholy", "disappearing",
      "reflecting light", "tenderly frozen", "whispering winds", "translucent sky",
      "cascading down", "forgotten dreams", "crimson sunset", "fading echoes",
      "shimmering frost", "awakening earth", "silent morning", "wandering stars"
    ],
  
    "5": [
      "the autumn breeze", "shadows softly dance", "whispers in the night",
      "sunlight through the leaves", "waves crash on the shore", "a river flowing free",
      "snowflakes gently fall", "the fire flickers low", "a lone bird calls out",
      "soft wind in the trees", "memories drift away", "moonlight on the waves",
      "the scent of springtime", "mountains touch the sky", "footsteps on wet stone",
      "stars shine overhead", "a lantern glowing dim", "echoes of the past",
      "the whispering pines", "a shadow fades away", "raindrops on the lake"
    ]
  };
  

  generatePoem();
}

function generatePoem() {
  background(255);
  let textOutput = mode === 1 ? expand("<poem>") : generateHaiku();
  text(textOutput, 20, 50);
}

// Recursive grammar expansion
function expand(symbol) {
  if (poemGrammar[symbol]) {
    let expansion = random(poemGrammar[symbol]);
    return expansion.replace(/<[^>]+>/g, match => expand(match));
  }
  return symbol;
}

// Haiku Generation (5-7-5 syllables)
function generateHaiku() {
  return [
    constructLine(5),
    constructLine(7),
    constructLine(5)
  ].join("\n");
}

function constructLine(syllables) {
  let line = [];
  let remaining = syllables;

  while (remaining > 0) {
    let possible = Object.keys(haikuGrammar).map(Number).filter(n => n <= remaining);
    if (possible.length === 0) break;

    let chosen = random(possible);
    let word = random(haikuGrammar[chosen]);

    line.push(word);
    remaining -= chosen;
  }
  return line.join(" ");
}

// Mode switching via keyboard
function keyPressed() {
  if (key === '1') mode = 1;
  if (key === '2') mode = 2;
  generatePoem();
}
