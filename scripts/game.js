// scripts/game.js

function update() {
    handlePlayerMovement();

    lootboxes.forEach(lootbox => {
        if (lootbox.checkCollision(player) && !lootbox.isOpen) {
            openLootboxMenu(lootbox);
        }
    });
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw tiled background
    if (backgroundPattern) {
        ctx.fillStyle = backgroundPattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (isMenuActive) {
        // Draw menu
        menuItems.forEach(item => item.draw(ctx));
    } else {
        ctx.drawImage(playerImg, player.x, player.y, 48, 48);
        lootboxes.forEach(lootbox => lootbox.draw(ctx));
        gameMenu.draw(ctx);

        // Draw lootbox menu if active
        if (activeLootboxMenu) {
            const menu = activeLootboxMenu;
            const now = performance.now();
            const deltaTime = now - menu.lastFrame;
            menu.lastFrame = now;

            menu.lootbox.updateSpin(deltaTime);
            
            // Draw popup background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(menu.x, menu.y, menu.width, menu.height);
            
            // Draw border
            ctx.strokeStyle = '#fff';
            ctx.strokeRect(menu.x, menu.y, menu.width, menu.height);
            
            // Draw text
            ctx.fillStyle = '#fff';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Lootbox Contents', canvas.width/2, menu.y + 40);
            
            // Draw the content image
            const contentSize = 64;
            const contentX = menu.x + (menu.width - contentSize) / 2;
            const contentY = menu.y + 60;
            
            if (menu.lootbox.spinning) {
                const contentSize = 64;
                const contentX = menu.x + (menu.width - contentSize) / 2;
                const contentY = menu.y + 60;

                // Create and draw the spinning content image
                const tempImage = new Image();
                tempImage.src = `assets/images/lootbox-contents/${menu.lootbox.currentSpinContent}.png`;
                
                // Draw base image
                ctx.drawImage(tempImage, contentX, contentY, contentSize, contentSize);
                
                // Draw rotating overlay
                ctx.save();
                ctx.translate(contentX + contentSize/2, contentY + contentSize/2);
                ctx.rotate((menu.lootbox.spinTime / 200) * Math.PI * 2);
                ctx.translate(-(contentX + contentSize/2), -(contentY + contentSize/2));
                ctx.drawImage(tempImage, contentX, contentY, contentSize, contentSize);
                ctx.restore();
                
                // Show current spinning item name
                ctx.fillText(menu.lootbox.currentSpinContent, canvas.width/2, contentY + contentSize + 20);
            } else {
                // After spin, show final result
                ctx.drawImage(menu.lootbox.contentsImage, contentX, contentY, contentSize, contentSize);
                ctx.fillText(menu.lootbox.contents, canvas.width/2, contentY + contentSize + 20);
            }
            
            if (!menu.lootbox.spinning) {
                ctx.fillText('Click anywhere to close', canvas.width/2, menu.y + menu.height - 40);
            }
        }
    }
}

function openLootboxMenu(lootbox) {
    console.log('[Debug] Opening lootbox menu:', { x: lootbox.x, y: lootbox.y });
    lootbox.isOpen = true;
    lootbox.startSpinning();
    
    // Store the menu state instead of drawing immediately
    activeLootboxMenu = {
        width: 300,
        height: 200,
        x: canvas.width/2 - 150, // 300/2
        y: canvas.height/2 - 100, // 200/2
        lootbox: lootbox,
        lastFrameTime: performance.now()
    };

    // Draw the contents when menu opens
    const menu = activeLootboxMenu;
    const contentSize = 64; // Size of the content image in the popup
    
    // Center the content image
    const contentX = menu.x + (menu.width - contentSize) / 2;
    const contentY = menu.y + 60;
    
    // Draw the content image in the menu
    ctx.drawImage(lootbox.contentsImage, contentX, contentY, contentSize, contentSize);
    
    console.log('[Debug] Displaying lootbox content:', lootbox.contents);

    // Add close handler
    const closeHandler = () => {
        console.log('[Debug] Closing lootbox menu');
        canvas.removeEventListener('click', closeHandler);
        lootboxes = lootboxes.filter(b => b !== lootbox);
        activeLootboxMenu = null; // Clear the menu
        console.log('[Debug] Remaining lootboxes:', lootboxes.length);
    };
    canvas.addEventListener('click', closeHandler);
}

function handlePlayerMovement() {
    const oldPosition = { x: player.x, y: player.y };

    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;

    // Only log if position actually changed
    if (oldPosition.x !== player.x || oldPosition.y !== player.y) {
        // console.log('[Debug] Player moved:', {
        //     from: oldPosition,
        //     to: { x: player.x, y: player.y },
        //     speed: player.speed,
        //     activeKeys: Object.entries(keys)
        //         .filter(([_, value]) => value)
        //         .map(([key]) => key)
        // });
    }
}
