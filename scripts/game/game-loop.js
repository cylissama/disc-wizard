export function gameLoop(update, render) {
    update();
    render();
    requestAnimationFrame(() => gameLoop(update, render));
}