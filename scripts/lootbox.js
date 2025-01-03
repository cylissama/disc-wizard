class LootBox {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.image = new Image();
        this.image.src = 'assets/images/lootbox.png';
        this.isOpen = false;
        
        // Add contents
        this.contents = this.getRandomContent();
        this.contentsImage = new Image();
        this.contentsImage.src = `assets/images/lootbox-contents/${this.contents}.png`;
        console.log('[Debug] Lootbox created with content:', this.contents);

        // Add animation properties
        this.spinning = false;
        this.spinSpeed = 5; // Increased for better visibility
        this.spinTime = 0;
        this.spinDuration = 2000; // 3 seconds duration
        this.finalContent = null;
        this.lastFrameTime = performance.now(); // Add this
        this.currentSpinContent = null; // Add tracking for current content

        // Add explosion properties with default values
        this.showExplosion = false;
        this.explosionRadius = 0;
        this.explosionMaxRadius = 500;
        this.explosionDuration = 500;
        this.explosionStartTime = 0;
    }

    startSpinning() {
        this.spinning = true;
        this.spinTime = 0; // Start at 0 instead of 1
        this.lastFrameTime = performance.now(); // Reset frame time
        this.finalContent = this.getRandomContent(); // Pre-determine the result
        this.currentSpinContent = this.contents; // Initialize current content
        console.log('[Debug] Started spinning for content:', this.finalContent);
    }

    updateSpin(deltaTime) {
        if (!this.spinning) return;

        // Ensure deltaTime is a number
        if (typeof deltaTime !== 'number' || isNaN(deltaTime)) {
            deltaTime = performance.now() - this.lastFrameTime;
        }
        this.lastFrameTime = performance.now();

        this.spinTime += deltaTime;
        console.log('[Debug] Spin update:', {
            deltaTime: deltaTime,
            spinTime: this.spinTime,
            duration: this.spinDuration
        });

        // Update current spinning content
        const spinIndex = Math.floor(this.spinTime * this.spinSpeed / 200) % 10;
        const contents = this.getPossibleContents();
        this.currentSpinContent = contents[spinIndex];

        if (this.spinTime >= this.spinDuration) {
            this.spinning = false;
            this.contents = this.finalContent;
            this.contentsImage.src = `assets/images/lootbox-contents/${this.contents}.png`;
            this.startExplosion(); // Start explosion effect
            console.log('[Debug] Spin complete, landed on:', this.contents);
        }
    }

    getRandomContent() {
        const contents = [
            'cd1',
            'cd2',
            'cd3',
            'dvd1',
            'dvd2',
            'dvd3',
            'vinyl1',
            'vinyl2',
            'vinyl3',
            'laserdisc1'
        ];
        return contents[Math.floor(Math.random() * contents.length)];
    }

    getPossibleContents() {
        return [
            'cd1', 'cd2', 'cd3', 'dvd1', 'dvd2', 
            'dvd3', 'vinyl1', 'vinyl2', 'vinyl3', 'laserdisc1'
        ];
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    checkCollision(player) {
        return player.x < this.x + this.width &&
               player.x + 48 > this.x &&
               player.y < this.y + this.height &&
               player.y + 48 > this.y;
    }

    startExplosion() {
        this.showExplosion = true;
        this.explosionRadius = 200;
        this.explosionStartTime = performance.now();
        console.log('[Debug] Starting explosion effect');
    }

    updateExplosion(now) {
        if (!this.showExplosion) return;

        // Ensure we have valid numbers
        const elapsed = Math.max(0, now - this.explosionStartTime);
        const progress = Math.min(Math.max(0, elapsed / this.explosionDuration), 1);
        
        // Ensure radius is a finite number
        this.explosionRadius = Math.min(
            this.explosionMaxRadius * progress,
            this.explosionMaxRadius
        );

        console.log('[Debug] Explosion update:', {
            elapsed,
            progress,
            radius: this.explosionRadius
        });

        if (progress >= 1) {
            this.showExplosion = false;
        }
    }
}