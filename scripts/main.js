
// declare vars
let player;
let cdImg;
let playerImg;
let discs = [];
let enemies = [];

// background
let backgroundTexture = new Image();
backgroundTexture.src = 'assets/images/background-tile.png';
let backgroundPattern;

// lootbox
let activeLootbox = null;
let lootboxes = [];
let activeLootboxMenu = null;

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

const gameMenu = new GameMenu();


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

// Game Menu
gameMenu.addItem("Inventory");
gameMenu.addItem("Spawn Lootbox");
gameMenu.addItem("Skills");
gameMenu.addItem("Settings");

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

    if (!isMenuActive) {
        const clickedOption = gameMenu.handleClick(mouseX, mouseY);
        if (clickedOption === "Spawn Lootbox") {
            const x = Math.random() * (canvas.width - 32);
            const y = Math.random() * (canvas.height - 32);
            lootboxes.push(new LootBox(x, y));
            console.log('[Debug] Spawned lootbox at:', {x, y});
            console.log('[Debug] Total lootboxes:', lootboxes.length);
        }
    }

    // Main menu handler
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

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (!isMenuActive) {
        gameMenu.handleHover(mouseX, mouseY);
    } else {
        menuItems.forEach(item => {
            item.isHovered = item.isMouseOver(mouseX, mouseY);
        });
    }
});

// A simple game loop placeholder
function gameLoop() {
    if (lootboxes.length > 0) {
        //console.log('[Debug] Active lootboxes:', lootboxes.length);
        //console.log('[Debug] Player position:', {x: player.x, y: player.y});
    }
    
    update();
    render();
    requestAnimationFrame(gameLoop);
}

window.onload = () => {
    console.log('[Debug] Game starting...');
    init();
    gameLoop();
    console.log('[Debug] Game loop started');
};

function init() {
    console.log('[Debug] Initializing game...');

    backgroundTexture = new Image();
    backgroundTexture.src = 'assets/images/background-tile.png';
    backgroundTexture.onload = function() {
        backgroundPattern = ctx.createPattern(backgroundTexture, 'repeat');
        console.log('[Debug] Background texture loaded successfully');
    };
    backgroundTexture.onerror = () => console.error('[Debug] Failed to load background texture');

    
    // Load images
    cdImg = new Image();
    cdImg.src = 'assets/images/cd.png';
    cdImg.onload = () => console.log('[Debug] CD image loaded successfully');
    cdImg.onerror = () => console.error('[Debug] Failed to load CD image');
    
    playerImg = new Image();
    playerImg.src = 'assets/images/wizard.png';
    playerImg.onload = () => console.log('[Debug] Player image loaded successfully');
    playerImg.onerror = () => console.error('[Debug] Failed to load player image');

    
    // Basic player object
    player = {
        x: 100,
        y: 100,
        speed: 5,
    };
    console.log('[Debug] Player initialized:', player);
}