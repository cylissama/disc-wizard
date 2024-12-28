// scripts/main.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set some basic config
canvas.width = 800;
canvas.height = 800;

// A simple game loop placeholder
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Call the game loop once the page is fully loaded
window.onload = () => {
  init();
  gameLoop();
};

// Basic initialization function
function init() {
  // e.g., load assets, set up player, enemies, etc.
}

// scripts/main.js
const keys = {}; // Keep track of which keys are pressed

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});