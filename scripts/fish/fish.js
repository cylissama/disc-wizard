// this will be a class that contains different types of fish and their properties

class Fish {
    static TYPES = {
        GOLDFISH: 'Goldfish',
        TUNA: 'Tuna',
        SALMON: 'Salmon',
        SHARK: 'Shark',
        WHALE: 'Whale'
    };

    static RARITY = {
        COMMON: { level: 1, color: '#808080' },
        UNCOMMON: { level: 2, color: '#00FF00' },
        RARE: { level: 3, color: '#0000FF' },
        EPIC: { level: 4, color: '#800080' },
        LEGENDARY: { level: 5, color: '#FFD700' }
    };

    constructor(type, size) {
        this.type = type || this.getRandomType();
        this.size = size || this.generateRandomSize();
        this.rarity = this.calculateRarity();
        this.color = this.generateColor();
        this.value = this.calculateValue();
        
        console.log('[Debug] Created new fish:', {
            type: this.type,
            size: this.size,
            rarity: this.rarity,
            value: this.value
        });
    }

    getRandomType() {
        const types = Object.values(Fish.TYPES);
        return types[Math.floor(Math.random() * types.length)];
    }

    generateRandomSize() {
        const baseSize = {
            [Fish.TYPES.GOLDFISH]: { min: 5, max: 15 },
            [Fish.TYPES.TUNA]: { min: 30, max: 200 },
            [Fish.TYPES.SALMON]: { min: 20, max: 150 },
            [Fish.TYPES.SHARK]: { min: 150, max: 600 },
            [Fish.TYPES.WHALE]: { min: 500, max: 3000 }
        };

        const range = baseSize[this.type];
        return Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
    }

    calculateRarity() {
        const rarityChance = Math.random() * 100;
        if (rarityChance < 50) return Fish.RARITY.COMMON;
        if (rarityChance < 75) return Fish.RARITY.UNCOMMON;
        if (rarityChance < 90) return Fish.RARITY.RARE;
        if (rarityChance < 98) return Fish.RARITY.EPIC;
        return Fish.RARITY.LEGENDARY;
    }

    generateColor() {
        return this.rarity.color;
    }

    calculateValue() {
        return Math.floor(this.size * this.rarity.level * 10);
    }

    toString() {
        return `${this.rarity.level}★ ${this.type} (${this.size}cm) - ${this.value} coins`;
    }
}
