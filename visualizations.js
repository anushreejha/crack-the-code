// Base Animation Class
class DataStructureAnimation {
    constructor(containerId) {
        this.canvas = document.getElementById(containerId);
        if (!this.canvas) {
            console.error(`Canvas not found: ${containerId}`);
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;
        this.isRunning = false;
    }

    start() {
        if (!this.canvas || !this.ctx) return;
        this.isRunning = true;
        this.reset();
        this.animate();
    }

    animate() {
        if (!this.isRunning) return;
        this.time++;
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    stop() {
        this.isRunning = false;
    }
}

// Array Animation Implementation
class ArrayAnimation extends DataStructureAnimation {
    constructor(containerId) {
        super(containerId);
    }

    reset() {
        this.array = [1, 2, 3, 4, 5];
        this.currentOperation = 'insert';
        this.newValue = 6;
        this.isAnimating = false;
        this.animationProgress = 0;
        this.highlightIndex = -1;
    }

    draw() {
        if (!this.ctx || !this.canvas) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw title
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.getOperationTitle(), this.canvas.width / 2, 50);

        // Draw array
        const elementWidth = 60;
        const elementHeight = 60;
        const startX = (this.canvas.width - this.array.length * elementWidth) / 2;
        const startY = this.canvas.height / 2 - elementHeight / 2;

        this.array.forEach((value, index) => {
            const x = startX + index * elementWidth;
            const y = startY;

            // Draw element background
            this.ctx.fillStyle = this.highlightIndex === index ? '#e74c3c' : '#3498db';
            this.ctx.fillRect(x, y, elementWidth, elementHeight);

            // Draw element border
            this.ctx.strokeStyle = '#2c3e50';
            this.ctx.strokeRect(x, y, elementWidth, elementHeight);

            // Draw value
            this.ctx.fillStyle = 'white';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(value.toString(), x + elementWidth / 2, y + elementHeight / 2);

            // Draw index
            this.ctx.fillStyle = '#2c3e50';
            this.ctx.font = '16px Arial';
            this.ctx.fillText(index.toString(), x + elementWidth / 2, y - 20);
        });

        // Auto switch operation
        if (this.time % 180 === 0 && !this.isAnimating) {
            this.switchOperation();
        }
    }

    switchOperation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentOperation = this.currentOperation === 'insert' ? 'remove' : 'insert';
        
        if (this.currentOperation === 'insert') {
            this.newValue = Math.floor(Math.random() * 9) + 1;
            this.highlightIndex = this.array.length;
            this.array.push(this.newValue);
        } else {
            this.highlightIndex = this.array.length - 1;
            setTimeout(() => {
                this.array.pop();
                this.highlightIndex = -1;
            }, 1000);
        }
        
        setTimeout(() => {
            this.isAnimating = false;
            this.highlightIndex = -1;
        }, 1500);
    }

    getOperationTitle() {
        if (this.currentOperation === 'insert') {
            return this.newValue !== null ? `Array - Inserting ${this.newValue}` : 'Array';
        } else {
            return 'Array - Removing last element';
        }
    }
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize all animations
        const animations = {
            array: new ArrayAnimation('array-viz')
        };

        // Start animation loops for each visualization
        Object.values(animations).forEach(animation => {
            animation.start();
        });

        // Store animations globally (for debugging if needed)
        window.dsAnimations = animations;

        console.log('All animations initialized successfully');
    } catch (error) {
        console.error('Error initializing animations:', error);
        console.error(error.stack);
    }
}); 