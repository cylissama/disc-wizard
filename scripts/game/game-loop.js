export function gameLoop() {
    if (lootboxes.length > 0) {
        //console.log('[Debug] Active lootboxes:', lootboxes.length);
        //console.log('[Debug] Player position:', {x: player.x, y: player.y});
    }
    
    update();
    render();
    requestAnimationFrame(gameLoop);
}