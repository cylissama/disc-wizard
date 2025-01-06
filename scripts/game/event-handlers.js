// event-handlers.js
export function initCanvasEvents(canvas, settingsMenu, gameMenu, menuItems, lootboxes, isMenuActive) {
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
    
        // Example logic
        if (settingsMenu.active) {
            settingsMenu.handleClick(mouseX, mouseY);
            return;
        }
    
        const clickedOption = gameMenu.handleClick(mouseX, mouseY);
        if (clickedOption === 'Spawn Lootbox') {
            const x = Math.random() * (canvas.width - 32);
            const y = Math.random() * (canvas.height - 32);
            lootboxes.push(new LootBox(x, y));
        } else if (clickedOption === 'Settings') {
            settingsMenu.toggle();
        }
    });

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
            // Handle settings menu clicks first if it's active
            if (settingsMenuActive) {
                settingsMenu.handleClick(mouseX, mouseY);
                return; // Exit early to prevent other click handling
            }
    
            const clickedOption = gameMenu.handleClick(mouseX, mouseY);
            if (clickedOption === "Spawn Lootbox") {
                const x = Math.random() * (canvas.width - 32);
                const y = Math.random() * (canvas.height - 32);
                lootboxes.push(new LootBox(x, y));
                console.log('[Debug] Spawned lootbox at:', {x, y});
                console.log('[Debug] Total lootboxes:', lootboxes.length);
            } else if (clickedOption === "Settings") {
                settingsMenuActive = !settingsMenuActive;
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

    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });
      
    window.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });
}