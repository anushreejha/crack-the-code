class DataStructureVisualization {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);

        // Set up camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Set up renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 10);
        this.scene.add(ambientLight, directionalLight);

        // Set up controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(), false);

        // Start animation loop
        this.animate();
    }

    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update controls
        this.controls.update();
        
        // Update TWEEN animations
        TWEEN.update();
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }

    addLabel(object, text) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 256;

        // Draw text
        context.fillStyle = '#000000';
        context.font = 'Bold 80px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 128, 128);

        // Create texture
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(1, 1, 1);

        // Add sprite to object
        object.add(sprite);
        return sprite;
    }
}

class ArrayVisualization extends DataStructureVisualization {
    constructor(containerId) {
        super(containerId);
        this.elements = [];
        this.initializeArray();
    }

    initializeArray() {
        const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        const material = new THREE.MeshPhongMaterial({ color: 0x3498db });

        for (let i = 0; i < 5; i++) {
            const cube = new THREE.Mesh(geometry, material);
            cube.position.x = i * 1.2 - 2;
            this.elements.push(cube);
            this.scene.add(cube);
        }
    }

    insert(index, value) {
        // Animation for insertion
        const newCube = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.8, 0.8),
            new THREE.MeshPhongMaterial({ color: 0x2ecc71 })
        );
        
        newCube.position.y = 3;
        newCube.position.x = index * 1.2 - 2;
        this.scene.add(newCube);

        // Animate the insertion
        new TWEEN.Tween(newCube.position)
            .to({ y: 0 }, 1000)
            .easing(TWEEN.Easing.Bounce.Out)
            .start();
    }
}

class LinkedListVisualization extends DataStructureVisualization {
    constructor(containerId) {
        super(containerId);
        this.nodes = [];
        this.initializeLinkedList();
    }

    initializeLinkedList() {
        const sphereGeometry = new THREE.SphereGeometry(0.4);
        const material = new THREE.MeshPhongMaterial({ color: 0xe74c3c });

        for (let i = 0; i < 4; i++) {
            const sphere = new THREE.Mesh(sphereGeometry, material);
            sphere.position.x = i * 2 - 3;
            this.nodes.push(sphere);
            this.scene.add(sphere);

            if (i > 0) {
                this.drawArrow(this.nodes[i-1], sphere);
            }
        }
    }

    drawArrow(fromNode, toNode) {
        const direction = new THREE.Vector3().subVectors(toNode.position, fromNode.position);
        const arrow = new THREE.ArrowHelper(
            direction.normalize(),
            fromNode.position,
            direction.length() * 0.8,
            0x2c3e50
        );
        this.scene.add(arrow);
    }
}

class HeapVisualization extends DataStructureVisualization {
    constructor(containerId) {
        super(containerId);
        this.nodes = [];
        this.connections = [];
        this.initializeHeap();
    }

    initializeHeap() {
        const sphereGeometry = new THREE.SphereGeometry(0.4);
        const material = new THREE.MeshPhongMaterial({ color: 0x9b59b6 });
        
        // Create a complete binary tree structure
        const levels = 3;
        let nodeIndex = 0;
        
        for (let level = 0; level < levels; level++) {
            const nodesInLevel = Math.pow(2, level);
            const levelWidth = nodesInLevel * 2;
            const startX = -(levelWidth - 1) / 2;
            
            for (let i = 0; i < nodesInLevel; i++) {
                const sphere = new THREE.Mesh(sphereGeometry, material);
                sphere.position.x = (startX + i * 2) * 0.8;
                sphere.position.y = (2 - level) * 1.5;
                sphere.userData.value = Math.floor(Math.random() * 100);
                
                // Add value label
                this.addLabel(sphere, sphere.userData.value.toString());
                
                this.nodes.push(sphere);
                this.scene.add(sphere);
                
                // Draw connections to parent
                if (nodeIndex > 0) {
                    const parentIndex = Math.floor((nodeIndex - 1) / 2);
                    this.drawConnection(this.nodes[parentIndex], sphere);
                }
                nodeIndex++;
            }
        }
    }

    addLabel(node, text) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = 'Bold 40px Arial';
        context.fillStyle = 'white';
        context.fillText(text, 0, 40);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.5, 0.5, 1);
        sprite.position.set(0, 0.5, 0);
        node.add(sprite);
    }

    drawConnection(fromNode, toNode) {
        const points = [];
        points.push(fromNode.position);
        points.push(toNode.position);
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x2c3e50 });
        const line = new THREE.Line(geometry, material);
        this.connections.push(line);
        this.scene.add(line);
    }

    heapify(index) {
        const node = this.nodes[index];
        const originalColor = node.material.color.getHex();
        
        // Highlight the current node
        node.material.color.setHex(0xe74c3c);
        
        // Animate the heapification process
        setTimeout(() => {
            node.material.color.setHex(originalColor);
        }, 1000);
    }
}

class HashTableVisualization extends DataStructureVisualization {
    constructor(containerId) {
        super(containerId);
        this.buckets = [];
        this.tableSize = 8;
        this.initializeHashTable();
    }

    initializeHashTable() {
        const boxGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        const material = new THREE.MeshPhongMaterial({ color: 0x3498db });
        
        // Create buckets
        for (let i = 0; i < this.tableSize; i++) {
            const bucket = new THREE.Mesh(boxGeometry, material);
            bucket.position.x = (i - this.tableSize/2) * 1.2;
            this.buckets.push(bucket);
            this.scene.add(bucket);
            
            // Add index label
            this.addLabel(bucket, i.toString());
        }
    }

    addLabel(bucket, text) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = 'Bold 40px Arial';
        context.fillStyle = 'white';
        context.fillText(text, 0, 40);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.5, 0.5, 1);
        sprite.position.set(0, -1, 0);
        bucket.add(sprite);
    }

    insert(key, value) {
        const hash = this.hashFunction(key);
        const bucket = this.buckets[hash];
        
        // Create new element
        const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
        const material = new THREE.MeshPhongMaterial({ color: 0x2ecc71 });
        const element = new THREE.Mesh(geometry, material);
        
        // Start position (above the table)
        element.position.copy(bucket.position);
        element.position.y = 3;
        
        this.scene.add(element);
        
        // Animate insertion
        new TWEEN.Tween(element.position)
            .to({ y: bucket.position.y }, 1000)
            .easing(TWEEN.Easing.Bounce.Out)
            .start();
    }

    hashFunction(key) {
        // Simple hash function for demonstration
        return key % this.tableSize;
    }
}

class StackVisualization extends DataStructureVisualization {
    constructor(containerId) {
        super(containerId);
        this.elements = [];
        this.maxSize = 6;
        this.spacing = 0.9;
        this.initializeStack();
    }

    initializeStack() {
        // Create stack container
        const geometry = new THREE.BoxGeometry(3, this.maxSize * this.spacing + 0.5, 1);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x2c3e50,
            opacity: 0.2,
            transparent: true 
        });
        this.container = new THREE.Mesh(geometry, material);
        this.scene.add(this.container);

        // Adjust camera
        this.camera.position.set(0, 0, 8);
    }

    push(value = Math.floor(Math.random() * 100)) {
        if (this.elements.length >= this.maxSize) return;

        const geometry = new THREE.BoxGeometry(2, 0.8, 0.8);
        const material = new THREE.MeshPhongMaterial({ color: 0x3498db });
        const element = new THREE.Mesh(geometry, material);

        // Start position (above stack)
        element.position.y = 5;
        element.position.x = 0;
        
        // Add label
        this.addLabel(element, value.toString());
        
        this.scene.add(element);
        this.elements.push(element);

        // Animate to final position
        new TWEEN.Tween(element.position)
            .to({ y: (this.elements.length - 1) * this.spacing - 2 }, 1000)
            .easing(TWEEN.Easing.Bounce.Out)
            .start();
    }

    pop() {
        if (this.elements.length === 0) return;

        const element = this.elements.pop();
        
        // Animate removal
        new TWEEN.Tween(element.position)
            .to({ x: 3 }, 500)
            .easing(TWEEN.Easing.Quadratic.In)
            .onComplete(() => {
                this.scene.remove(element);
            })
            .start();
    }
}

class QueueVisualization extends DataStructureVisualization {
    constructor(containerId) {
        super(containerId);
        this.elements = [];
        this.maxSize = 6;
        this.spacing = 1.2;
        this.initializeQueue();
    }

    initializeQueue() {
        // Create queue container
        const geometry = new THREE.BoxGeometry(this.maxSize * this.spacing + 0.5, 2, 1);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x2c3e50,
            opacity: 0.2,
            transparent: true 
        });
        this.container = new THREE.Mesh(geometry, material);
        this.scene.add(this.container);

        // Adjust camera
        this.camera.position.set(0, 0, 10);
    }

    enqueue(value = Math.floor(Math.random() * 100)) {
        if (this.elements.length >= this.maxSize) return;

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x3498db });
        const element = new THREE.Mesh(geometry, material);

        // Start position (left of queue)
        element.position.x = -5;
        element.position.y = 0;
        
        // Add label
        this.addLabel(element, value.toString());
        
        this.scene.add(element);
        this.elements.push(element);

        // Update positions of all elements
        this.elements.forEach((el, index) => {
            new TWEEN.Tween(el.position)
                .to({ x: index * this.spacing - (this.maxSize * this.spacing) / 2 }, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        });
    }

    dequeue() {
        if (this.elements.length === 0) return;

        const element = this.elements.shift();
        
        // Animate removal
        new TWEEN.Tween(element.position)
            .to({ y: 3 }, 500)
            .easing(TWEEN.Easing.Quadratic.In)
            .onComplete(() => {
                this.scene.remove(element);
            })
            .start();

        // Update positions of remaining elements
        this.elements.forEach((el, index) => {
            new TWEEN.Tween(el.position)
                .to({ x: index * this.spacing - (this.maxSize * this.spacing) / 2 }, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        });
    }
}

class TreeVisualization extends DataStructureVisualization {
    constructor(containerId) {
        super(containerId);
        this.nodes = [];
        this.edges = [];
        this.levels = 4;
        this.initializeTree();
    }

    initializeTree() {
        const sphereGeometry = new THREE.SphereGeometry(0.3);
        const material = new THREE.MeshPhongMaterial({ color: 0x3498db });

        // Create binary tree structure
        for (let level = 0; level < this.levels; level++) {
            const nodesInLevel = Math.pow(2, level);
            const levelWidth = nodesInLevel * 2;
            const startX = -(levelWidth - 1);

            for (let i = 0; i < nodesInLevel; i++) {
                const node = new THREE.Mesh(sphereGeometry, material);
                node.position.x = (startX + i * 4) * 0.5;
                node.position.y = (this.levels - level - 1) * 1.5;
                
                this.addLabel(node, Math.floor(Math.random() * 100).toString());
                
                this.nodes.push(node);
                this.scene.add(node);

                // Connect to parent
                if (level > 0) {
                    const parentIndex = Math.floor((this.nodes.length - 2) / 2);
                    this.createEdge(this.nodes[parentIndex], node);
                }
            }
        }

        // Adjust camera
        this.camera.position.set(0, 0, 12);
    }

    createEdge(fromNode, toNode) {
        const points = [fromNode.position, toNode.position];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x2c3e50 });
        const edge = new THREE.Line(geometry, material);
        this.edges.push(edge);
        this.scene.add(edge);
    }

    traverse(type = 'inorder') {
        let index = 0;
        const highlightNode = (node) => {
            const originalColor = node.material.color.getHex();
            node.material.color.setHex(0xe74c3c);
            
            setTimeout(() => {
                node.material.color.setHex(originalColor);
            }, 1000);
        };

        const traverseTree = (nodeIndex) => {
            if (nodeIndex >= this.nodes.length) return;
            
            setTimeout(() => {
                if (type === 'preorder') highlightNode(this.nodes[nodeIndex]);
                traverseTree(2 * nodeIndex + 1);
                if (type === 'inorder') highlightNode(this.nodes[nodeIndex]);
                traverseTree(2 * nodeIndex + 2);
                if (type === 'postorder') highlightNode(this.nodes[nodeIndex]);
            }, index++ * 1000);
        };

        traverseTree(0);
    }
}

class GraphVisualization extends DataStructureVisualization {
    constructor(containerId) {
        super(containerId);
        this.nodes = [];
        this.edges = [];
        this.initializeGraph();
    }

    initializeGraph() {
        // Create initial vertices
        for (let i = 0; i < 6; i++) {
            this.addVertex();
        }

        // Create some random edges
        for (let i = 0; i < 8; i++) {
            const from = Math.floor(Math.random() * this.nodes.length);
            const to = Math.floor(Math.random() * this.nodes.length);
            if (from !== to) {
                this.addEdge(from, to);
            }
        }

        // Adjust camera
        this.camera.position.set(0, 0, 15);
    }

    addVertex() {
        const geometry = new THREE.SphereGeometry(0.4);
        const material = new THREE.MeshPhongMaterial({ color: 0x3498db });
        const vertex = new THREE.Mesh(geometry, material);
        
        // Position in a circle
        const angle = (this.nodes.length / 6) * Math.PI * 2;
        vertex.position.x = Math.cos(angle) * 5;
        vertex.position.y = Math.sin(angle) * 5;
        
        this.addLabel(vertex, this.nodes.length.toString());
        
        this.nodes.push(vertex);
        this.scene.add(vertex);
    }

    addEdge(fromIndex, toIndex) {
        const from = this.nodes[fromIndex];
        const to = this.nodes[toIndex];
        
        const points = [from.position, to.position];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x2c3e50 });
        const edge = new THREE.Line(geometry, material);
        
        this.edges.push({ edge, from: fromIndex, to: toIndex });
        this.scene.add(edge);
    }

    bfs(startIndex = 0) {
        const visited = new Set();
        const queue = [startIndex];
        let index = 0;

        const processNode = () => {
            if (queue.length === 0 || visited.size === this.nodes.length) return;

            const nodeIndex = queue.shift();
            if (visited.has(nodeIndex)) {
                processNode();
                return;
            }

            visited.add(nodeIndex);
            const node = this.nodes[nodeIndex];
            
            // Highlight current node
            const originalColor = node.material.color.getHex();
            node.material.color.setHex(0xe74c3c);

            // Find adjacent nodes
            this.edges.forEach(({ from, to }) => {
                if (from === nodeIndex && !visited.has(to)) queue.push(to);
                if (to === nodeIndex && !visited.has(from)) queue.push(from);
            });

            setTimeout(() => {
                node.material.color.setHex(originalColor);
                processNode();
            }, 1000);
        };

        processNode();
    }
}

// Add this at the end of the file
function checkVisualizationsLoaded() {
    const containers = document.querySelectorAll('.visualization');
    containers.forEach(container => {
        if (!container.querySelector('canvas')) {
            console.error(`Visualization not loaded for: ${container.id}`);
        }
    });
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    try {
        const arrayViz = new ArrayVisualization('array-viz');
        const linkedListViz = new LinkedListVisualization('linkedlist-viz');
        const stackViz = new StackVisualization('stack-viz');
        const queueViz = new QueueVisualization('queue-viz');
        const treeViz = new TreeVisualization('tree-viz');
        const graphViz = new GraphVisualization('graph-viz');
        const heapViz = new HeapVisualization('heap-viz');
        const hashViz = new HashTableVisualization('hash-viz');

        // Check if visualizations are loaded
        setTimeout(checkVisualizationsLoaded, 1000);

        // Add event listeners for visualization controls
        document.querySelectorAll('.viz-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const vizType = e.target.dataset.viz;
                
                console.log(`Executing ${action} on ${vizType}`); // Debug log

                switch(vizType) {
                    case 'array':
                        if (action === 'insert') arrayViz.insert(Math.floor(Math.random() * 5));
                        if (action === 'delete') arrayViz.delete();
                        if (action === 'search') arrayViz.search();
                        break;
                    // ... other cases ...
                }
            });
        });
    } catch (error) {
        console.error('Error initializing visualizations:', error);
    }
});

// Add resize handler
window.addEventListener('resize', () => {
    const visualizations = document.querySelectorAll('.visualization');
    visualizations.forEach(viz => {
        const canvas = viz.querySelector('canvas');
        if (canvas) {
            canvas.style.width = '100%';
            canvas.style.height = '100%';
        }
    });
}); 