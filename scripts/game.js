// scripts/game.js

function update() {
    console.log(player.x);
    handlePlayerMovement();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isMenuActive) {
        // Draw menu
        menuItems.forEach(item => item.draw(ctx));
    } else {
        // Draw game
        ctx.drawImage(playerImg, player.x, player.y, 48, 48);
    }
}

function handlePlayerMovement() {

    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
}
