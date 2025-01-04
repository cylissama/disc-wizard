class GameMenuItem {
    constructor(x, width, text) {
        this.x = x;
        this.width = width;
        this.text = text;
        this.isHovered = false;
        this.height = 40;
    }

    draw(ctx) {
        ctx.fillStyle = this.isHovered ? '#444' : '#333';
        ctx.fillRect(this.x, 0, this.width, this.height);
        
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(this.x, 0, this.width, this.height);

        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x + this.width/2, this.height/2);
    }

    isMouseOver(x, y) {
        return y <= this.height && x >= this.x && x < this.x + this.width;
    }
}

class GameMenu {
    constructor() {
        this.height = 40;
        this.items = [];
    }

    addItem(text) {
        const itemWidth = canvas.width / 4;
        const x = this.items.length * itemWidth;
        this.items.push(new GameMenuItem(x, itemWidth, text));
    }

    draw(ctx) {
        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, canvas.width, this.height);
        this.items.forEach(item => item.draw(ctx));
    }

    handleHover(x, y) {
        this.items.forEach(item => {
            item.isHovered = item.isMouseOver(x, y);
        });
    }

    handleClick(x, y) {
        const clickedItem = this.items.find(item => item.isMouseOver(x, y));
        if (clickedItem) {
            console.log('[Debug] Clicked game menu item:', clickedItem.text);
            return clickedItem.text;
        }
        return null;
    }
}