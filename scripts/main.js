// imports and setup
import { SettingsMenu } from './settings-menu.js';
import { GameMenu } from './game-menu.js';
import { initCanvasEvents } from './event-handlers.js';
import { setupGame } from './game-setup.js';
import { gameLoop } from './game-loop.js';

const canvas = documents.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const settingsMenu = new SettingsMenu();
const gameMenu = new GameMenu();
const lootboxes = [];

initCanvasEvents(canvas, settingsMenu, gameMenu, lootboxes);

let cdImg;
let playerImg;
let discs = [];
let enemies = [];

const settings = {
    playerSpeed: 5,
    playerSize: 48
};

let player = {
    x: 100,
    y: 100,
    speed: settings.playerSpeed
};

let settingsMenuActive = false;

// sounds
const spinSound = new Audio('assets/sounds/spin.mp3');

// background
let backgroundTexture = new Image();
backgroundTexture.src = 'assets/images/background-tile.png';
let backgroundPattern;

// lootbox
let activeLootbox = null;
let activeLootboxMenu = null;

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

// A simple game loop placeholder


window.onload = () => {
    console.log('[Debug] Game starting...');
    init();
    startGame();
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

function startGame() {
    setupGame();
    gameLoop();
}