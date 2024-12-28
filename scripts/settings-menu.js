class SettingsMenu {
    constructor() {
        this.width = SETTINGS_CONFIG.width;
        this.height = SETTINGS_CONFIG.height;
        this.x = 800/2 - this.width/2;
        this.y = 600/2 - this.height/2;
        
        this.controls = this.initializeControls();
    }

    initializeControls() {
        return SETTINGS_CONFIG.controls.map(config => ({
            ...config,
            value: settings?.[config.id] || config.defaultValue,
            onChange: (value) => this.handleSettingChange(config.id, value)
        }));
    }

    handleSettingChange(settingId, value) {
        if (!settings) return;
        
        settings[settingId] = value;
        if (settingId === 'playerSpeed') {
            player.speed = value;
        }
        console.log(`[Debug] Updated ${settingId}:`, value);
    }

    drawBackground(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    drawTitle(ctx) {
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Settings', canvas.width/2, this.y + 40);
    }

    drawSlider(ctx, control, index) {
        const yPos = this.y + 100 + (index * 60);
        const sliderWidth = 200;
        const sliderX = this.x + (this.width - sliderWidth)/2;
        const sliderY = yPos + 10;
        
        // Draw label and value
        ctx.textAlign = 'left';
        ctx.fillText(control.label, this.x + 30, yPos);
        ctx.textAlign = 'right';
        ctx.fillText(control.value, this.x + this.width - 30, yPos);
        
        // Draw slider
        this.drawSliderBar(ctx, sliderX, sliderY, sliderWidth, control);
    }

    drawSliderBar(ctx, x, y, width, control) {
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y, width, 4);
        
        const handlePos = x + (control.value - control.min)/(control.max - control.min) * width;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(handlePos, y + 2, 8, 0, Math.PI * 2);
        ctx.fill();
    }

    draw(ctx) {
        this.drawBackground(ctx);
        this.drawTitle(ctx);
        this.controls.forEach((control, index) => this.drawSlider(ctx, control, index));
        
        ctx.textAlign = 'center';
        ctx.fillText('Click outside to close', canvas.width/2, this.y + this.height - 30);
    }

    handleClick(x, y) {
        // Close menu if clicking outside
        if (x < this.x || x > this.x + this.width || 
            y < this.y || y > this.y + this.height) {
            settingsMenuActive = false;
            return;
        }

        // Handle slider interactions
        this.controls.forEach((control, index) => {
            const yPos = this.y + 100 + (index * 60);
            const sliderWidth = 200;
            const sliderX = this.x + (this.width - sliderWidth)/2;
            const sliderY = yPos + 10;
            
            if (y >= sliderY - 10 && y <= sliderY + 10) {
                if (x >= sliderX && x <= sliderX + sliderWidth) {
                    const percentage = (x - sliderX) / sliderWidth;
                    const value = Math.round((control.max - control.min) * percentage / control.step) * control.step + control.min;
                    control.value = Math.min(Math.max(value, control.min), control.max);
                    this.handleSettingChange(control.id, control.value);
                    console.log('[Debug] Slider updated:', {
                        setting: control.id,
                        value: control.value
                    });
                }
            }
        });
    }
}