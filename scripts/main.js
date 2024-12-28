// scripts/main.js

// declare vars
let player;
let cdImg;
let playerImg;
let discs = [];
let enemies = [];

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const keys = {}; // Keep track of which keys are pressed

// Set some basic config
canvas.width = 800;
canvas.height = 800;

// menu items
const menuItems = [];
let isMenuActive = true;
const menuItemWidth = 200;
const menuItemHeight = 50;
const startX = canvas.width/2 - menuItemWidth/2;
const startY = canvas.height/2 - 100;

//listeners
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
  
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

menuItems.push(
    new MenuItem(startX, startY, menuItemWidth, menuItemHeight, "Start Game"),
    new MenuItem(startX, startY + 70, menuItemWidth, menuItemHeight, "Options"),
    new MenuItem(startX, startY + 140, menuItemWidth, menuItemHeight, "Credits")
);

// Add mouse event listeners
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    menuItems.forEach(item => {
        item.isHovered = item.isMouseOver(mouseX, mouseY);
    });
});

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    menuItems.forEach(item => {
        if (item.isMouseOver(mouseX, mouseY)) {
            switch(item.text) {
                case "Start Game":
                    isMenuActive = false;
                    break;
                case "Options":
                    // Handle options
                    break;
                case "Credits":
                    // Handle credits
                    break;
            }
        }
    });
});

function init() {
    // Load images
    cdImg = new Image();
    cdImg.src = 'assets/images/cd.png'; 
    
    playerImg = new Image();
    playerImg.src = 'assets/images/wizard.png';
    
    // Basic player object
    player = {
        x: 100,
        y: 100,
        speed: 5,
    };
}

// A simple game loop placeholder
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
  }
  

window.onload = () => {
    init();
    gameLoop();
  };