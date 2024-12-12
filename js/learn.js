class DataStructureAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.isPlaying = false;
        this.currentStep = 0;
        this.animationSteps = [];
        this.setupCanvas();
    }

    setupCanvas() {
        this.canvas.width = 600;
        this.canvas.height = 300;
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
    }

    play() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.currentStep = 0;
        this.playNextStep();
    }

    playNextStep() {
        if (!this.isPlaying || this.currentStep >= this.animationSteps.length) {
            this.isPlaying = false;
            return;
        }

        const step = this.animationSteps[this.currentStep];
        this.drawStep(step);
        this.currentStep++;

        setTimeout(() => this.playNextStep(), 1000);
    }

    drawStep(step) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        step.draw(this.ctx);
    }
}

class ArrayAnimation extends DataStructureAnimation {
    constructor(canvasId) {
        super(canvasId);
        this.setupAnimations();
    }

    setupAnimations() {
        // Insertion Animation
        const insertSteps = [
            {
                draw: (ctx) => {
                    this.drawArray(ctx, [1, 2, 3], -1);
                    ctx.fillText("Initial Array", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawArray(ctx, [1, 2, 3], 3);
                    ctx.fillText("Inserting 4", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawArray(ctx, [1, 2, 3, 4], -1);
                    ctx.fillText("Element Inserted", 300, 50);
                }
            }
        ];

        // Deletion Animation
        const deleteSteps = [
            {
                draw: (ctx) => {
                    this.drawArray(ctx, [1, 2, 3, 4], -1);
                    ctx.fillText("Initial Array", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawArray(ctx, [1, 2, 3, 4], 3);
                    ctx.fillText("Deleting Last Element", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawArray(ctx, [1, 2, 3], -1);
                    ctx.fillText("Element Deleted", 300, 50);
                }
            }
        ];

        this.animations = {
            'insert': insertSteps,
            'delete': deleteSteps
        };
    }

    drawArray(ctx, array, highlightIndex) {
        const boxSize = 50;
        const startX = (this.canvas.width - array.length * boxSize) / 2;
        const startY = this.canvas.height / 2;

        array.forEach((value, index) => {
            ctx.beginPath();
            ctx.rect(startX + index * boxSize, startY, boxSize, boxSize);
            ctx.fillStyle = index === highlightIndex ? '#FF69B4' : '#8A2BE2';
            ctx.fill();
            ctx.strokeStyle = '#E6E6FA';
            ctx.stroke();

            ctx.fillStyle = 'white';
            ctx.fillText(value.toString(), startX + index * boxSize + boxSize/2, startY + boxSize/2);
        });
    }

    playAnimation(type) {
        this.animationSteps = this.animations[type] || [];
        this.play();
    }
}

class StackAnimation extends DataStructureAnimation {
    constructor(canvasId) {
        super(canvasId);
        this.setupAnimations();
    }

    setupAnimations() {
        // Push Animation
        const pushSteps = [
            {
                draw: (ctx) => {
                    this.drawStack(ctx, [1, 2], -1);
                    ctx.fillText("Initial Stack", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawStack(ctx, [1, 2, 3], 2);
                    ctx.fillText("Pushing 3", 300, 50);
                }
            }
        ];

        // Pop Animation
        const popSteps = [
            {
                draw: (ctx) => {
                    this.drawStack(ctx, [1, 2, 3], -1);
                    ctx.fillText("Initial Stack", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawStack(ctx, [1, 2, 3], 2);
                    ctx.fillText("Popping top element", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawStack(ctx, [1, 2], -1);
                    ctx.fillText("Element Popped", 300, 50);
                }
            }
        ];

        this.animations = {
            'push': pushSteps,
            'pop': popSteps
        };
    }

    drawStack(ctx, stack, highlightIndex) {
        const boxSize = 50;
        const startX = (this.canvas.width - boxSize) / 2;
        const startY = this.canvas.height - 50;

        stack.forEach((value, index) => {
            const y = startY - index * boxSize;
            ctx.beginPath();
            ctx.rect(startX, y, boxSize, boxSize);
            ctx.fillStyle = index === highlightIndex ? '#FF69B4' : '#8A2BE2';
            ctx.fill();
            ctx.strokeStyle = '#E6E6FA';
            ctx.stroke();

            ctx.fillStyle = 'white';
            ctx.fillText(value.toString(), startX + boxSize/2, y + boxSize/2);
        });
    }

    playAnimation(type) {
        this.animationSteps = this.animations[type] || [];
        this.play();
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    const arrayViz = new ArrayAnimation('array-viz');
    const stackViz = new StackAnimation('stack-viz');

    // Add click handlers for buttons
    document.querySelectorAll('.viz-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const operation = e.target.dataset.operation;
            const vizId = e.target.closest('.ds-visualization').querySelector('canvas').id;
            
            if (vizId === 'array-viz') {
                arrayViz.playAnimation(operation);
            } else if (vizId === 'stack-viz') {
                stackViz.playAnimation(operation);
            }
        });
    });
}); 