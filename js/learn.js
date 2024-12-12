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

        // Search Animation
        const searchSteps = [
            {
                draw: (ctx) => {
                    this.drawArray(ctx, [5, 2, 7, 1, 9], -1);
                    ctx.fillText("Searching for 7", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawArray(ctx, [5, 2, 7, 1, 9], 0);
                    ctx.fillText("Checking 5", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawArray(ctx, [5, 2, 7, 1, 9], 1);
                    ctx.fillText("Checking 2", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawArray(ctx, [5, 2, 7, 1, 9], 2);
                    ctx.fillText("Found 7 at index 2!", 300, 50);
                }
            }
        ];

        this.animations = {
            'insert': insertSteps,
            'delete': deleteSteps,
            'search': searchSteps
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
            
            // Draw index
            ctx.fillStyle = '#2c3e50';
            ctx.font = '12px Arial';
            ctx.fillText(index.toString(), startX + index * boxSize + boxSize/2, startY - 10);
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
            },
            {
                draw: (ctx) => {
                    this.drawStack(ctx, [1, 2, 3], -1);
                    ctx.fillText("3 Pushed Successfully", 300, 50);
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

        // Peek Animation
        const peekSteps = [
            {
                draw: (ctx) => {
                    this.drawStack(ctx, [1, 2, 3], -1);
                    ctx.fillText("Initial Stack", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawStack(ctx, [1, 2, 3], 2);
                    ctx.fillText("Peeking Top Element (3)", 300, 50);
                }
            }
        ];

        this.animations = {
            'push': pushSteps,
            'pop': popSteps,
            'peek': peekSteps
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

            // Main value text (matching array style)
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(value.toString(), startX + boxSize/2, y + boxSize/2);
            
            // Index text (matching array style)
            ctx.fillStyle = '#2c3e50';
            ctx.font = '12px Arial';
            ctx.fillText(index.toString(), startX + boxSize/2, y - 10);
        });
    }

    playAnimation(type) {
        this.animationSteps = this.animations[type] || [];
        this.play();
    }
}

class QueueAnimation extends DataStructureAnimation {
    constructor(canvasId) {
        super(canvasId);
        this.setupAnimations();
    }

    setupAnimations() {
        // Enqueue Animation
        const enqueueSteps = [
            {
                draw: (ctx) => {
                    this.drawQueue(ctx, [1, 2], -1);
                    ctx.fillText("Initial Queue", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawQueue(ctx, [1, 2, 3], 2);
                    ctx.fillText("Enqueuing 3", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawQueue(ctx, [1, 2, 3], -1);
                    ctx.fillText("3 Enqueued Successfully", 300, 50);
                }
            }
        ];

        // Dequeue Animation
        const dequeueSteps = [
            {
                draw: (ctx) => {
                    this.drawQueue(ctx, [1, 2, 3], -1);
                    ctx.fillText("Initial Queue", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawQueue(ctx, [1, 2, 3], 0);
                    ctx.fillText("Dequeuing Front Element", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawQueue(ctx, [2, 3], -1);
                    ctx.fillText("Element Dequeued", 300, 50);
                }
            }
        ];

        this.animations = {
            'enqueue': enqueueSteps,
            'dequeue': dequeueSteps
        };
    }

    drawQueue(ctx, queue, highlightIndex) {
        const boxSize = 50;
        const startX = (this.canvas.width - queue.length * boxSize) / 2;
        const startY = this.canvas.height / 2;

        queue.forEach((value, index) => {
            ctx.beginPath();
            ctx.rect(startX + index * boxSize, startY, boxSize, boxSize);
            ctx.fillStyle = index === highlightIndex ? '#FF69B4' : '#8A2BE2';
            ctx.fill();
            ctx.strokeStyle = '#E6E6FA';
            ctx.stroke();

            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(value.toString(), startX + index * boxSize + boxSize/2, startY + boxSize/2);
            
            ctx.fillStyle = '#2c3e50';
            ctx.font = '12px Arial';
            ctx.fillText(index.toString(), startX + index * boxSize + boxSize/2, startY - 10);
        });

        // Add Front and Rear markers
        if (queue.length > 0) {
            ctx.fillStyle = '#2c3e50';
            ctx.font = '12px Arial';
            ctx.fillText("Front", startX + boxSize/2, startY + boxSize + 20);
            ctx.fillText("Rear", startX + (queue.length - 1) * boxSize + boxSize/2, startY + boxSize + 20);
        }
    }

    playAnimation(type) {
        this.animationSteps = this.animations[type] || [];
        this.play();
    }
}

class LinkedListAnimation extends DataStructureAnimation {
    constructor(canvasId) {
        super(canvasId);
        this.setupAnimations();
    }

    setupAnimations() {
        // Insertion Animation
        const insertSteps = [
            {
                draw: (ctx) => {
                    this.drawLinkedList(ctx, [1, 2, 3], -1);
                    ctx.fillText("Initial Linked List", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawLinkedList(ctx, [1, 2, 3], 2);
                    ctx.fillText("Inserting 4 after 2", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawLinkedList(ctx, [1, 2, 4, 3], -1);
                    ctx.fillText("4 Inserted Successfully", 300, 50);
                }
            }
        ];

        // Deletion Animation
        const deleteSteps = [
            {
                draw: (ctx) => {
                    this.drawLinkedList(ctx, [1, 2, 4, 3], -1);
                    ctx.fillText("Initial Linked List", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawLinkedList(ctx, [1, 2, 4, 3], 2);
                    ctx.fillText("Deleting 4", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    this.drawLinkedList(ctx, [1, 2, 3], -1);
                    ctx.fillText("4 Deleted Successfully", 300, 50);
                }
            }
        ];

        this.animations = {
            'insert': insertSteps,
            'delete': deleteSteps
        };
    }

    drawLinkedList(ctx, list, highlightIndex) {
        const boxSize = 50;
        const startX = (this.canvas.width - list.length * (boxSize + 30)) / 2;
        const startY = this.canvas.height / 2;

        list.forEach((value, index) => {
            // Draw node
            ctx.beginPath();
            ctx.rect(startX + index * (boxSize + 30), startY, boxSize, boxSize);
            ctx.fillStyle = index === highlightIndex ? '#FF69B4' : '#8A2BE2';
            ctx.fill();
            ctx.strokeStyle = '#E6E6FA';
            ctx.stroke();

            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(value.toString(), startX + index * (boxSize + 30) + boxSize/2, startY + boxSize/2);
            
            // Draw index
            ctx.fillStyle = '#2c3e50';
            ctx.font = '12px Arial';
            ctx.fillText(index.toString(), startX + index * (boxSize + 30) + boxSize/2, startY - 10);

            // Draw arrow between nodes (except for last node)
            if (index < list.length - 1) {
                ctx.beginPath();
                ctx.moveTo(startX + index * (boxSize + 30) + boxSize, startY + boxSize/2);
                ctx.lineTo(startX + (index + 1) * (boxSize + 30), startY + boxSize/2);
                ctx.strokeStyle = '#2c3e50';
                ctx.stroke();

                // Arrowhead
                ctx.beginPath();
                ctx.moveTo(startX + (index + 1) * (boxSize + 30) - 10, startY + boxSize/2 - 5);
                ctx.lineTo(startX + (index + 1) * (boxSize + 30), startY + boxSize/2);
                ctx.lineTo(startX + (index + 1) * (boxSize + 30) - 10, startY + boxSize/2 + 5);
                ctx.fillStyle = '#2c3e50';
                ctx.fill();
            }
        });
    }

    playAnimation(type) {
        this.animationSteps = this.animations[type] || [];
        this.play();
    }
}

// Binary Tree and BST Animations
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTreeAnimation extends DataStructureAnimation {
    constructor(canvasId) {
        super(canvasId);
        this.root = null;
        this.setupAnimations();
    }

    setupAnimations() {
        // Flexible Insertion Animation for Binary Tree
        const insertSteps = [
            {
                draw: (ctx) => {
                    // Simplified initial tree
                    this.root = new TreeNode(50);
                    this.root.left = new TreeNode(30);
                    this.root.right = new TreeNode(70);
                    this.drawTree(ctx, this.root);
                    ctx.fillStyle = 'black';
                    ctx.fillText("Initial Binary Tree", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    // Flexible insertion - can be anywhere
                    const newNode = new TreeNode(25);
                    this.flexibleInsert(this.root, newNode);
                    this.drawTree(ctx, this.root);
                    ctx.fillStyle = 'black';
                    ctx.fillText("Inserting 25 (Flexible Placement)", 300, 50);
                }
            }
        ];

        // Deletion Animation
        const deleteSteps = [
            {
                draw: (ctx) => {
                    // Initial tree
                    this.root = new TreeNode(50);
                    this.root.left = new TreeNode(30);
                    this.root.right = new TreeNode(70);
                    this.root.left.left = new TreeNode(25);
                    this.drawTree(ctx, this.root);
                    ctx.fillStyle = 'black';
                    ctx.fillText("Initial Binary Tree", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    // Delete a node
                    this.flexibleDelete(this.root, 30);
                    this.drawTree(ctx, this.root);
                    ctx.fillStyle = 'black';
                    ctx.fillText("Deleting Node 30", 300, 50);
                }
            }
        ];

        this.animations = {
            'insert': insertSteps,
            'delete': deleteSteps
        };
    }

    // Flexible insertion method for Binary Tree
    flexibleInsert(root, newNode) {
        if (!root) return newNode;

        // Random insertion strategy
        const choices = [
            () => {
                if (!root.left) root.left = newNode;
                else this.flexibleInsert(root.left, newNode);
            },
            () => {
                if (!root.right) root.right = newNode;
                else this.flexibleInsert(root.right, newNode);
            }
        ];

        choices[Math.floor(Math.random() * choices.length)]();
        return root;
    }

    // Flexible deletion for Binary Tree
    flexibleDelete(root, value) {
        if (!root) return null;

        // Find the node to delete
        if (root.value === value) {
            // If leaf node, simply remove
            if (!root.left && !root.right) return null;
            
            // If one child is null, return the other
            if (!root.left) return root.right;
            if (!root.right) return root.left;

            // If both children exist, replace with a child
            return Math.random() < 0.5 ? root.left : root.right;
        }

        // Recursively delete from left or right
        root.left = this.flexibleDelete(root.left, value);
        root.right = this.flexibleDelete(root.right, value);

        return root;
    }

    drawTree(ctx, root) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawNode(ctx, root, this.canvas.width / 2, 100, this.canvas.width / 4);
    }

    drawNode(ctx, node, x, y, hGap) {
        if (!node) return;

        const nodeRadius = 20;

        // Draw node
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#8A2BE2';
        ctx.fill();
        ctx.strokeStyle = '#E6E6FA';
        ctx.stroke();

        // Draw value
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.value.toString(), x, y);

        // Draw left child
        if (node.left) {
            const leftX = x - hGap;
            const leftY = y + 80;
            
            // Draw line
            ctx.beginPath();
            ctx.moveTo(x, y + nodeRadius);
            ctx.lineTo(leftX, leftY - nodeRadius);
            ctx.strokeStyle = '#2c3e50';
            ctx.stroke();

            this.drawNode(ctx, node.left, leftX, leftY, hGap / 2);
        }

        // Draw right child
        if (node.right) {
            const rightX = x + hGap;
            const rightY = y + 80;
            
            // Draw line
            ctx.beginPath();
            ctx.moveTo(x, y + nodeRadius);
            ctx.lineTo(rightX, rightY - nodeRadius);
            ctx.strokeStyle = '#2c3e50';
            ctx.stroke();

            this.drawNode(ctx, node.right, rightX, rightY, hGap / 2);
        }
    }

    playAnimation(type) {
        this.animationSteps = this.animations[type] || [];
        this.play();
    }
}

class BSTAnimation extends DataStructureAnimation {
    constructor(canvasId) {
        super(canvasId);
        this.root = null;
        this.setupAnimations();
    }

    setupAnimations() {
        // Strict Ordered Insertion Animation for BST
        const insertSteps = [
            {
                draw: (ctx) => {
                    // Create initial BST
                    this.root = null;
                    this.root = this.insertNode(this.root, 50);
                    this.drawTree(ctx, this.root);
                    ctx.fillStyle = 'black';
                    ctx.fillText("Initial Binary Search Tree", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    // Insert 30
                    this.root = this.insertNode(this.root, 30);
                    this.drawTree(ctx, this.root);
                    ctx.fillStyle = 'black';
                    ctx.fillText("Inserting 30", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    // Insert 70
                    this.root = this.insertNode(this.root, 70);
                    this.drawTree(ctx, this.root);
                    ctx.fillStyle = 'black';
                    ctx.fillText("Inserting 70", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    // Insert 40
                    this.root = this.insertNode(this.root, 40);
                    this.drawTree(ctx, this.root);
                    ctx.fillStyle = 'black';
                    ctx.fillText("Inserting 40", 300, 50);
                }
            }
        ];

        // Deletion Animation
        const deleteSteps = [
            {
                draw: (ctx) => {
                    // Recreate the tree
                    this.root = null;
                    this.root = this.insertNode(this.root, 50);
                    this.root = this.insertNode(this.root, 30);
                    this.root = this.insertNode(this.root, 70);
                    this.root = this.insertNode(this.root, 40);
                    this.root = this.insertNode(this.root, 20);
                    this.drawTree(ctx, this.root);
                    ctx.fillStyle = 'black';
                    ctx.fillText("Initial Binary Search Tree", 300, 50);
                }
            },
            {
                draw: (ctx) => {
                    // Delete 30 (node with one child)
                    this.root = this.deleteNode(this.root, 30);
                    this.drawTree(ctx, this.root);
                    ctx.fillStyle = 'black';
                    ctx.fillText("Deleting Node 30", 300, 50);
                }
            }
        ];

        this.animations = {
            'insert': insertSteps,
            'delete': deleteSteps
        };
    }

    // Correct BST Insertion
    insertNode(root, value) {
        // If tree is empty, create root
        if (!root) {
            return new TreeNode(value);
        }

        // Recursively insert based on BST rules
        if (value < root.value) {
            root.left = this.insertNode(root.left, value);
        } else if (value > root.value) {
            root.right = this.insertNode(root.right, value);
        }

        // Return the (unchanged) node
        return root;
    }

    // Correct BST Deletion
    deleteNode(root, value) {
        // If tree is empty
        if (!root) {
            return null;
        }

        // Find the node to delete
        if (value < root.value) {
            root.left = this.deleteNode(root.left, value);
        } else if (value > root.value) {
            root.right = this.deleteNode(root.right, value);
        } else {
            // Node with no child
            if (!root.left && !root.right) {
                return null;
            }
            
            // Node with only one child
            if (!root.left) {
                return root.right;
            }
            if (!root.right) {
                return root.left;
            }

            // Node with two children
            // Find inorder successor (smallest in right subtree)
            root.value = this.findMinValue(root.right);
            
            // Delete the inorder successor
            root.right = this.deleteNode(root.right, root.value);
        }

        return root;
    }

    // Helper method to find minimum value in a subtree
    findMinValue(node) {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current.value;
    }

    drawTree(ctx, root) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawNode(ctx, root, this.canvas.width / 2, 100, this.canvas.width / 4);
    }

    drawNode(ctx, node, x, y, hGap) {
        if (!node) return;

        const nodeRadius = 20;

        // Draw node
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#8A2BE2';
        ctx.fill();
        ctx.strokeStyle = '#E6E6FA';
        ctx.stroke();

        // Draw value
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.value.toString(), x, y);

        // Draw left child
        if (node.left) {
            const leftX = x - hGap;
            const leftY = y + 80;
            
            // Draw line
            ctx.beginPath();
            ctx.moveTo(x, y + nodeRadius);
            ctx.lineTo(leftX, leftY - nodeRadius);
            ctx.strokeStyle = '#2c3e50';
            ctx.stroke();

            this.drawNode(ctx, node.left, leftX, leftY, hGap / 2);
        }

        // Draw right child
        if (node.right) {
            const rightX = x + hGap;
            const rightY = y + 80;
            
            // Draw line
            ctx.beginPath();
            ctx.moveTo(x, y + nodeRadius);
            ctx.lineTo(rightX, rightY - nodeRadius);
            ctx.strokeStyle = '#2c3e50';
            ctx.stroke();

            this.drawNode(ctx, node.right, rightX, rightY, hGap / 2);
        }
    }

    playAnimation(type) {
        this.animationSteps = this.animations[type] || [];
        this.play();
    }
}

class HeapAnimation extends DataStructureAnimation {
    constructor(canvasId) {
        super(canvasId);
        this.heap = [];
        this.setupAnimations();
    }

    setupAnimations() {
        const insertSteps = [
            {
                draw: (ctx) => {
                    this.heap = [50, 30, 40, 10, 20];
                    this.drawHeap(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Initial Max Heap", this.canvas.width/2, 30);
                }
            },
            {
                draw: (ctx) => {
                    this.insertHeap(60);
                    this.drawHeap(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Inserting 60 - Heapify Up", this.canvas.width/2, 30);
                }
            }
        ];

        const deleteSteps = [
            {
                draw: (ctx) => {
                    this.heap = [50, 30, 40, 10, 20];
                    this.drawHeap(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Initial Max Heap", this.canvas.width/2, 30);
                }
            },
            {
                draw: (ctx) => {
                    this.deleteRoot();
                    this.drawHeap(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Deleting Root - Heapify Down", this.canvas.width/2, 30);
                }
            }
        ];

        this.animations = {
            'insert': insertSteps,
            'delete': deleteSteps
        };
    }

    insertHeap(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    deleteRoot() {
        if (this.heap.length === 0) return;
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.heapifyDown(0);
        }
    }

    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] > this.heap[parentIndex]) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    heapifyDown(index) {
        const lastIndex = this.heap.length - 1;
        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let largest = index;

            if (leftChild <= lastIndex && this.heap[leftChild] > this.heap[largest]) {
                largest = leftChild;
            }
            if (rightChild <= lastIndex && this.heap[rightChild] > this.heap[largest]) {
                largest = rightChild;
            }

            if (largest !== index) {
                [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
                index = largest;
            } else {
                break;
            }
        }
    }

    drawHeap(ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const nodeRadius = 25;
        const levels = Math.floor(Math.log2(this.heap.length)) + 1;

        this.heap.forEach((value, index) => {
            const level = Math.floor(Math.log2(index + 1));
            const nodesInLevel = Math.pow(2, level);
            const levelWidth = this.canvas.width;
            const horizontalSpacing = levelWidth / (nodesInLevel + 1);
            
            const posInLevel = index + 1 - Math.pow(2, level);
            const x = horizontalSpacing * (posInLevel + 1);
            const y = 80 + level * 60;

            // Draw node
            ctx.beginPath();
            ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
            ctx.fillStyle = '#8A2BE2';
            ctx.fill();
            ctx.strokeStyle = '#E6E6FA';
            ctx.stroke();

            // Draw value
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(value.toString(), x, y);

            // Draw connections to children
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;

            ctx.strokeStyle = '#2c3e50';
            if (leftChildIndex < this.heap.length) {
                const leftLevel = Math.floor(Math.log2(leftChildIndex + 1));
                const leftNodesInLevel = Math.pow(2, leftLevel);
                const leftLevelWidth = this.canvas.width;
                const leftHorizontalSpacing = leftLevelWidth / (leftNodesInLevel + 1);
                
                const leftPosInLevel = leftChildIndex + 1 - Math.pow(2, leftLevel);
                const leftX = leftHorizontalSpacing * (leftPosInLevel + 1);
                const leftY = 80 + leftLevel * 60;

                ctx.beginPath();
                ctx.moveTo(x, y + nodeRadius);
                ctx.lineTo(leftX, leftY - nodeRadius);
                ctx.stroke();
            }

            if (rightChildIndex < this.heap.length) {
                const rightLevel = Math.floor(Math.log2(rightChildIndex + 1));
                const rightNodesInLevel = Math.pow(2, rightLevel);
                const rightLevelWidth = this.canvas.width;
                const rightHorizontalSpacing = rightLevelWidth / (rightNodesInLevel + 1);
                
                const rightPosInLevel = rightChildIndex + 1 - Math.pow(2, rightLevel);
                const rightX = rightHorizontalSpacing * (rightPosInLevel + 1);
                const rightY = 80 + rightLevel * 60;

                ctx.beginPath();
                ctx.moveTo(x, y + nodeRadius);
                ctx.lineTo(rightX, rightY - nodeRadius);
                ctx.stroke();
            }
        });
    }

    playAnimation(type) {
        this.animationSteps = this.animations[type] || [];
        this.play();
    }
}

class GraphAnimation extends DataStructureAnimation {
    constructor(canvasId) {
        super(canvasId);
        this.nodes = [];
        this.edges = [];
        this.setupAnimations();
    }

    setupAnimations() {
        const addNodeSteps = [
            {
                draw: (ctx) => {
                    this.nodes = [
                        { id: 1, x: this.canvas.width/3, y: this.canvas.height/2, value: 'A' },
                        { id: 2, x: 2*this.canvas.width/3, y: this.canvas.height/2, value: 'B' }
                    ];
                    this.drawGraph(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Initial Graph", this.canvas.width/2, 30);
                }
            },
            {
                draw: (ctx) => {
                    this.addNode('C', this.canvas.width/2, this.canvas.height/3);
                    this.drawGraph(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Adding Node C", this.canvas.width/2, 30);
                }
            }
        ];

        const addEdgeSteps = [
            {
                draw: (ctx) => {
                    this.nodes = [
                        { id: 1, x: this.canvas.width/3, y: this.canvas.height/2, value: 'A' },
                        { id: 2, x: 2*this.canvas.width/3, y: this.canvas.height/2, value: 'B' },
                        { id: 3, x: this.canvas.width/2, y: this.canvas.height/3, value: 'C' }
                    ];
                    this.drawGraph(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Initial Graph", this.canvas.width/2, 30);
                }
            },
            {
                draw: (ctx) => {
                    this.addEdge(1, 3);
                    this.drawGraph(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Adding Edge A-C", this.canvas.width/2, 30);
                }
            }
        ];

        this.animations = {
            'addnode': addNodeSteps,
            'addedge': addEdgeSteps
        };
    }

    addNode(value, x, y) {
        const newId = this.nodes.length + 1;
        this.nodes.push({ id: newId, x, y, value });
    }

    addEdge(sourceId, destId) {
        this.edges.push({ source: sourceId, destination: destId });
    }

    drawGraph(ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw edges
        this.edges.forEach(edge => {
            const source = this.nodes.find(n => n.id === edge.source);
            const dest = this.nodes.find(n => n.id === edge.destination);
            
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(dest.x, dest.y);
            ctx.strokeStyle = '#2c3e50';
            ctx.stroke();

            // Arrowhead
            const angle = Math.atan2(dest.y - source.y, dest.x - source.x);
            ctx.beginPath();
            ctx.moveTo(
                dest.x - 10 * Math.cos(angle - Math.PI / 6), 
                dest.y - 10 * Math.sin(angle - Math.PI / 6)
            );
            ctx.lineTo(dest.x, dest.y);
            ctx.lineTo(
                dest.x - 10 * Math.cos(angle + Math.PI / 6), 
                dest.y - 10 * Math.sin(angle + Math.PI / 6)
            );
            ctx.strokeStyle = '#2c3e50';
            ctx.stroke();
        });

        // Draw nodes
        this.nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
            ctx.fillStyle = '#8A2BE2';
            ctx.fill();
            ctx.strokeStyle = '#E6E6FA';
            ctx.stroke();

            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.value, node.x, node.y);
        });
    }

    playAnimation(type) {
        this.animationSteps = this.animations[type] || [];
        this.play();
    }
}

class HashTableAnimation extends DataStructureAnimation {
    constructor(canvasId) {
        super(canvasId);
        this.hashTable = new Array(7).fill(null).map(() => []);
        this.setupAnimations();
    }

    setupAnimations() {
        const insertSteps = [
            {
                draw: (ctx) => {
                    this.hashTable = new Array(5).fill(null).map(() => []);
                    this.drawHashTable(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Empty Hash Table", this.canvas.width/2, 30);
                }
            },
            {
                draw: (ctx) => {
                    // Explicitly insert John
                    const johnIndex = this.hash('John');
                    this.hashTable[johnIndex].push({ key: 'John', value: 25 });
                    this.drawHashTable(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Inserting John: 25", this.canvas.width/2, 30);
                }
            },
            {
                draw: (ctx) => {
                    // Explicitly insert Alice
                    const johnIndex = this.hash('John');
                    const aliceIndex = this.hash('Alice');
                    this.hashTable[johnIndex] = [{ key: 'John', value: 25 }];
                    this.hashTable[aliceIndex].push({ key: 'Alice', value: 30 });
                    this.drawHashTable(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Inserting Alice: 30", this.canvas.width/2, 30);
                }
            }
        ];

        const deleteSteps = [
            {
                draw: (ctx) => {
                    // Preset hash table with three entries
                    this.hashTable = new Array(5).fill(null).map(() => []);
                    const johnIndex = this.hash('John');
                    const aliceIndex = this.hash('Alice');
                    const bobIndex = this.hash('Bob');
                    
                    this.hashTable[johnIndex].push({ key: 'John', value: 25 });
                    this.hashTable[aliceIndex].push({ key: 'Alice', value: 30 });
                    this.hashTable[bobIndex].push({ key: 'Bob', value: 35 });
                    
                    this.drawHashTable(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Initial Hash Table", this.canvas.width/2, 30);
                }
            },
            {
                draw: (ctx) => {
                    // Explicitly delete Alice
                    const johnIndex = this.hash('John');
                    const aliceIndex = this.hash('Alice');
                    const bobIndex = this.hash('Bob');
                    
                    this.hashTable[johnIndex] = [{ key: 'John', value: 25 }];
                    this.hashTable[bobIndex] = [{ key: 'Bob', value: 35 }];
                    this.hashTable[aliceIndex] = []; // Remove Alice
                    
                    this.drawHashTable(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Deleting Alice", this.canvas.width/2, 30);
                }
            }
        ];

        const searchSteps = [
            {
                draw: (ctx) => {
                    // Preset hash table
                    this.hashTable = new Array(5).fill(null).map(() => []);
                    const johnIndex = this.hash('John');
                    const aliceIndex = this.hash('Alice');
                    const bobIndex = this.hash('Bob');
                    
                    this.hashTable[johnIndex].push({ key: 'John', value: 25 });
                    this.hashTable[aliceIndex].push({ key: 'Alice', value: 30 });
                    this.hashTable[bobIndex].push({ key: 'Bob', value: 35 });
                    
                    this.drawHashTable(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Initial Hash Table", this.canvas.width/2, 30);
                }
            },
            {
                draw: (ctx) => {
                    // Highlight Alice during search
                    this.drawHashTable(ctx, 'Alice');
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Searching for Alice", this.canvas.width/2, 30);
                }
            }
        ];

        this.animations = {
            'insert': insertSteps,
            'delete': deleteSteps,
            'search': searchSteps
        };
    }

    // Modify hash method to ensure consistent hashing
    hash(key) {
        let total = 0;
        for (let i = 0; i < key.length; i++) {
            total += key.charCodeAt(i);
        }
        return total % 5;
    }

    drawHashTable(ctx, highlightKey = null) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Reduce number of buckets to 5
        const bucketCount = 5;
        const boxWidth = 80;
        const boxHeight = 50;
        const startX = (this.canvas.width - bucketCount * (boxWidth + 20)) / 2;
        const startY = 80;
        const spacing = 20;

        // Modify hash function to work with 5 buckets
        const modifiedHash = (key) => {
            let total = 0;
            for (let i = 0; i < key.length; i++) {
                total += key.charCodeAt(i);
            }
            return total % bucketCount;
        };

        // Create a new hash table with 5 buckets
        const hashTable = new Array(bucketCount).fill(null).map(() => []);

        // Reinsert existing entries
        ['John', 'Alice', 'Bob'].forEach(key => {
            const index = modifiedHash(key);
            const value = key === 'John' ? 25 : (key === 'Alice' ? 30 : 35);
            const bucket = hashTable[index];
            bucket.push({ key, value });
        });

        hashTable.forEach((bucket, index) => {
            // Draw bucket index
            ctx.fillStyle = 'black';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`[${index}]`, startX + index * (boxWidth + spacing) + boxWidth/2, startY - 10);

            // Draw bucket box
            ctx.beginPath();
            ctx.rect(startX + index * (boxWidth + spacing), startY, boxWidth, boxHeight);
            ctx.strokeStyle = '#2c3e50';
            ctx.stroke();

            // Draw bucket contents
            bucket.forEach((entry, bucketIndex) => {
                const entryY = startY + bucketIndex * 25;
                
                // Highlight if searching for this key
                const isHighlighted = entry.key === highlightKey;
                
                ctx.fillStyle = isHighlighted ? '#FF69B4' : 'black';
                ctx.font = '12px Arial';
                ctx.textAlign = 'left';
                ctx.fillText(`${entry.key}: ${entry.value}`, 
                    startX + index * (boxWidth + spacing) + 5, 
                    entryY + 20
                );
            });
        });
    }

    playAnimation(type) {
        this.animationSteps = this.animations[type] || [];
        this.play();
    }
}

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class TrieAnimation extends DataStructureAnimation {
    constructor(canvasId) {
        super(canvasId);
        this.root = new TrieNode();
        this.setupAnimations();
    }

    setupAnimations() {
        const insertSteps = [
            {
                draw: (ctx) => {
                    this.root = new TrieNode(); // Reset the Trie
                    this.drawTrie(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Empty Trie", this.canvas.width / 2, 30);
                }
            },
            {
                draw: (ctx) => {
                    this.insert("cat");
                    this.drawTrie(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Inserting 'cat'", this.canvas.width / 2, 30);
                }
            },
            {
                draw: (ctx) => {
                    this.insert("car");
                    this.drawTrie(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Inserting 'car'", this.canvas.width / 2, 30);
                }
            }
        ];

        const searchSteps = [
            {
                draw: (ctx) => {
                    this.insert("cat");
                    this.insert("car");
                    this.drawTrie(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Trie with 'cat' and 'car'", this.canvas.width / 2, 30);
                }
            },
            {
                draw: (ctx) => {
                    const result = this.search("cat");
                    this.drawTrie(ctx, "cat");
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(`Searching for 'cat': ${result ? 'Found' : 'Not Found'}`, this.canvas.width / 2, 30);
                }
            }
        ];

        const deleteSteps = [
            {
                draw: (ctx) => {
                    this.insert("cat");
                    this.insert("car");
                    this.drawTrie(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Trie with 'cat' and 'car'", this.canvas.width / 2, 30);
                }
            },
            {
                draw: (ctx) => {
                    this.delete("cat");
                    this.drawTrie(ctx);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Deleting 'cat'", this.canvas.width / 2, 30);
                }
            }
        ];

        this.animations = {
            'insert': insertSteps,
            'search': searchSteps,
            'delete': deleteSteps
        };
    }

    insert(word) {
        let currentNode = this.root;
        for (let char of word) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }
        currentNode.isEndOfWord = true;
    }

    search(word) {
        let currentNode = this.root;
        for (let char of word) {
            if (!currentNode.children[char]) {
                return false;
            }
            currentNode = currentNode.children[char];
        }
        return currentNode.isEndOfWord;
    }

    delete(word) {
        this.deleteHelper(this.root, word, 0);
    }

    deleteHelper(node, word, depth) {
        if (!node) return null;

        if (depth === word.length) {
            if (node.isEndOfWord) {
                node.isEndOfWord = false;
            }
            return Object.keys(node.children).length === 0 ? null : node;
        }

        const char = word[depth];
        node.children[char] = this.deleteHelper(node.children[char], word, depth + 1);

        return Object.keys(node.children).length === 0 && !node.isEndOfWord ? null : node;
    }

    drawTrie(ctx, highlightWord = null) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const startX = this.canvas.width / 2;
        const startY = 80;
        const spacing = 40;

        const drawNode = (node, x, y, word) => {
            ctx.fillStyle = 'black';
            ctx.fillText(word, x, y);
            const children = Object.keys(node.children);
            const childX = x - (children.length - 1) * spacing / 2;

            children.forEach((char, index) => {
                const childNode = node.children[char];
                const childWord = word + char;
                ctx.beginPath();
                ctx.moveTo(x, y + 5);
                ctx.lineTo(childX + index * spacing, y + spacing);
                ctx.stroke();

                drawNode(childNode, childX + index * spacing, y + spacing, childWord);
            });
        };

        drawNode(this.root, startX, startY, '');
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
    const queueViz = new QueueAnimation('queue-viz');
    const linkedListViz = new LinkedListAnimation('linkedlist-viz');
    const binaryTreeViz = new BinaryTreeAnimation('binarytree-viz');
    const bstViz = new BSTAnimation('bst-viz');
    const heapViz = new HeapAnimation('heap-viz');
    const graphViz = new GraphAnimation('graph-viz');
    const hashTableViz = new HashTableAnimation('hashtable-viz');
    const trieViz = new TrieAnimation('trie-viz');

    // Add click handlers for buttons
    document.querySelectorAll('.viz-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const operation = e.target.dataset.operation;
            const vizId = e.target.closest('.ds-visualization').querySelector('canvas').id;
            
            switch(vizId) {
                case 'array-viz':
                    arrayViz.playAnimation(operation);
                    break;
                case 'stack-viz':
                    stackViz.playAnimation(operation);
                    break;
                case 'queue-viz':
                    queueViz.playAnimation(operation);
                    break;
                case 'linkedlist-viz':
                    linkedListViz.playAnimation(operation);
                    break;
                case 'binarytree-viz':
                    binaryTreeViz.playAnimation(operation);
                    break;
                case 'bst-viz':
                    bstViz.playAnimation(operation);
                    break;
                case 'heap-viz':
                    heapViz.playAnimation(operation);
                    break;
                case 'graph-viz':
                    graphViz.playAnimation(operation);
                    break;
                case 'hashtable-viz':
                    hashTableViz.playAnimation(operation);
                    break;
                case 'trie-viz':
                    trieViz.playAnimation(operation);
                    break;
            }
        });
    });
}); 