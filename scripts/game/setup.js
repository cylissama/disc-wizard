import { player } from './player.js';
import { LootBox } from './lootbox.js';

export function setupGame(canvas) {
    console.log('[Debug] Setting up game...');

    // Initialize player position and settings
    player.x = 100;
    player.y = 100;
    player.speed = 5;
    player.size = 48;
    console.log('[Debug] Player initialized:', player);

    // Initialize lootboxes
    const lootboxes = [];
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * (canvas.width - 32);
        const y = Math.random() * (canvas.height - 32);
        lootboxes.push(new LootBox(x, y));
    }
    console.log('[Debug] Lootboxes initialized:', lootboxes.length);

    // Load other resources if needed
    // Example: Load additional images, sounds, etc.

    // Set up initial game state
    // Example: Initialize enemies, set up game levels, etc.

    // Return initialized game state if needed
    return {
        player,
        lootboxes,
        // Add other game state variables here
    };
}