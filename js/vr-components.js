/**
 * Custom VR Components for GCA Virtual
 * Enhanced components for A-Frame VR experience
 */

// VR Detection and Fallback Controls Component
AFRAME.registerComponent('vr-fallback-controls', {
    schema: {
        movementSpeed: { type: 'number', default: 0.1 },
        rotationSpeed: { type: 'number', default: 2.0 },
        enableKeyboard: { type: 'boolean', default: true },
        enableMouse: { type: 'boolean', default: true }
    },
    
    init: function() {
        this.isVRSupported = false;
        this.isVRActive = false;
        this.keys = {};
        this.mouseX = 0;
        this.mouseY = 0;
        this.isPointerLocked = false;
        
        this.checkVRSupport();
        this.setupEventListeners();
        this.setupFallbackControls();
    },
    
    checkVRSupport: function() {
        if (navigator.xr) {
            navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                this.isVRSupported = supported;
                if (supported) {
                    this.showVRButton();
                    console.log('VR supported - VR mode available');
                } else {
                    this.enableFallbackMode();
                    console.log('VR not supported - Using fallback controls');
                }
            }).catch(() => {
                this.enableFallbackMode();
                console.log('VR check failed - Using fallback controls');
            });
        } else {
            this.enableFallbackMode();
            console.log('WebXR not available - Using fallback controls');
        }
    },
    
    showVRButton: function() {
        // Create VR entry button
        const vrButton = document.createElement('button');
        vrButton.id = 'vr-entry-button';
        vrButton.innerHTML = '🥽 ENTRAR VR';
        vrButton.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #1e3a8a;
            color: white;
            border: none;
            padding: 20px 40px;
            font-size: 24px;
            border-radius: 10px;
            cursor: pointer;
            z-index: 1000;
            font-family: 'Segoe UI', sans-serif;
        `;
        
        vrButton.addEventListener('click', () => {
            this.enterVR();
        });
        
        document.body.appendChild(vrButton);
        
        // Show instructions
        this.showInstructions('VR disponible - Haz clic en "ENTRAR VR" o usa WASD para moverte');
    },
    
    enableFallbackMode: function() {
        this.showInstructions('Modo teclado activo - Usa WASD para moverte, ratón para mirar');
        
        // Enable pointer lock for mouse look
        if (this.data.enableMouse) {
            this.enablePointerLock();
        }
    },
    
    showInstructions: function(message) {
        const instructions = document.createElement('div');
        instructions.id = 'vr-instructions';
        instructions.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-family: 'Segoe UI', sans-serif;
            font-size: 16px;
            z-index: 1000;
            text-align: center;
        `;
        instructions.textContent = message;
        
        document.body.appendChild(instructions);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (instructions.parentNode) {
                instructions.remove();
            }
        }, 5000);
    },
    
    setupEventListeners: function() {
        // Keyboard events
        document.addEventListener('keydown', (event) => {
            this.keys[event.code] = true;
        });
        
        document.addEventListener('keyup', (event) => {
            this.keys[event.code] = false;
        });
        
        // Mouse events for pointer lock
        document.addEventListener('click', () => {
            if (!this.isVRActive && this.data.enableMouse) {
                this.requestPointerLock();
            }
        });
        
        document.addEventListener('mousemove', (event) => {
            if (this.isPointerLocked && !this.isVRActive) {
                this.mouseX = event.movementX || 0;
                this.mouseY = event.movementY || 0;
            }
        });
        
        // Pointer lock events
        document.addEventListener('pointerlockchange', () => {
            this.isPointerLocked = document.pointerLockElement !== null;
        });
    },
    
    enablePointerLock: function() {
        const canvas = this.el.sceneEl.canvas;
        if (canvas) {
            canvas.style.cursor = 'crosshair';
        }
    },
    
    requestPointerLock: function() {
        const canvas = this.el.sceneEl.canvas;
        if (canvas && canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }
    },
    
    setupFallbackControls: function() {
        const camera = this.el;
        const speed = this.data.movementSpeed;
        const rotationSpeed = this.data.rotationSpeed;
        
        // Movement and rotation update function
        this.updateControls = () => {
            if (this.isVRActive) return; // Don't update if in VR
            
            const position = camera.getAttribute('position');
            const rotation = camera.getAttribute('rotation');
            
            // Keyboard movement
            if (this.keys['KeyW'] || this.keys['ArrowUp']) {
                position.z -= Math.cos(rotation.y * Math.PI / 180) * speed;
                position.x -= Math.sin(rotation.y * Math.PI / 180) * speed;
            }
            if (this.keys['KeyS'] || this.keys['ArrowDown']) {
                position.z += Math.cos(rotation.y * Math.PI / 180) * speed;
                position.x += Math.sin(rotation.y * Math.PI / 180) * speed;
            }
            if (this.keys['KeyA'] || this.keys['ArrowLeft']) {
                position.x -= Math.cos(rotation.y * Math.PI / 180) * speed;
                position.z += Math.sin(rotation.y * Math.PI / 180) * speed;
            }
            if (this.keys['KeyD'] || this.keys['ArrowRight']) {
                position.x += Math.cos(rotation.y * Math.PI / 180) * speed;
                position.z -= Math.sin(rotation.y * Math.PI / 180) * speed;
            }
            
            // Mouse look
            if (this.isPointerLocked) {
                rotation.y -= this.mouseX * rotationSpeed * 0.01;
                rotation.x -= this.mouseY * rotationSpeed * 0.01;
                
                // Clamp vertical rotation
                rotation.x = Math.max(-90, Math.min(90, rotation.x));
                
                this.mouseX = 0;
                this.mouseY = 0;
            }
            
            // Apply changes
            camera.setAttribute('position', position);
            camera.setAttribute('rotation', rotation);
        };
        
        // Start the control loop
        this.controlLoop = setInterval(this.updateControls, 16); // ~60fps
    },
    
    enterVR: async function() {
        if (!this.isVRSupported) {
            console.log('VR not supported');
            return;
        }
        
        try {
            this.isVRActive = true;
            
            // Hide VR button
            const vrButton = document.getElementById('vr-entry-button');
            if (vrButton) {
                vrButton.style.display = 'none';
            }
            
            // Request VR session
            const session = await navigator.xr.requestSession('immersive-vr', {
                optionalFeatures: ['local-floor', 'bounded-floor'],
                requiredFeatures: ['local']
            });
            
            // Set up VR session
            const scene = this.el.sceneEl;
            const renderer = scene.renderer;
            
            await renderer.xr.setSession(session);
            renderer.xr.setReferenceSpaceType('local');
            
            console.log('VR session started');
            
            // Handle VR session end
            session.addEventListener('end', () => {
                this.isVRActive = false;
                console.log('VR session ended');
                
                // Show VR button again
                if (vrButton) {
                    vrButton.style.display = 'block';
                }
            });
            
        } catch (error) {
            this.isVRActive = false;
            console.error('Failed to enter VR:', error);
            
            // Show VR button again on error
            const vrButton = document.getElementById('vr-entry-button');
            if (vrButton) {
                vrButton.style.display = 'block';
            }
        }
    },
    
    remove: function() {
        // Clean up
        if (this.controlLoop) {
            clearInterval(this.controlLoop);
        }
        
        // Remove UI elements
        const vrButton = document.getElementById('vr-entry-button');
        if (vrButton) {
            vrButton.remove();
        }
        
        const instructions = document.getElementById('vr-instructions');
        if (instructions) {
            instructions.remove();
        }
    }
});

AFRAME.registerComponent('vr-interaction', {
    schema: {
        type: { type: 'string', default: 'click' },
        action: { type: 'string', default: '' }
    },
    
    init: function() {
        this.el.addEventListener('click', this.onClick.bind(this));
        this.el.addEventListener('mouseenter', this.onMouseEnter.bind(this));
        this.el.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    },
    
    onClick: function() {
        const action = this.data.action;
        if (action) {
            // Trigger custom action
            this.el.emit('vr-action', { action: action });
        }
    },
    
    onMouseEnter: function() {
        this.el.setAttribute('scale', '1.1 1.1 1.1');
    },
    
    onMouseLeave: function() {
        this.el.setAttribute('scale', '1 1 1');
    }
});

// Progress tracking component
AFRAME.registerComponent('progress-tracker', {
    schema: {
        value: { type: 'number', default: 0 }
    },
    
    init: function() {
        this.updateProgress = this.updateProgress.bind(this);
        this.el.addEventListener('vr-action', this.updateProgress);
    },
    
    updateProgress: function() {
        this.data.value += 10;
        // Emit progress update event
        this.el.sceneEl.emit('progress-update', { value: this.data.value });
    }
});

// Floating text component
AFRAME.registerComponent('floating-text', {
    schema: {
        text: { type: 'string', default: '' },
        color: { type: 'color', default: '#ffffff' },
        size: { type: 'number', default: 0.5 }
    },
    
    init: function() {
        this.createText();
    },
    
    createText: function() {
        const textEl = document.createElement('a-text');
        textEl.setAttribute('value', this.data.text);
        textEl.setAttribute('color', this.data.color);
        textEl.setAttribute('width', this.data.size);
        textEl.setAttribute('align', 'center');
        this.el.appendChild(textEl);
    }
});

// Holographic effect component
AFRAME.registerComponent('holographic', {
    schema: {
        color: { type: 'color', default: '#00ff00' },
        opacity: { type: 'number', default: 0.7 }
    },
    
    init: function() {
        this.el.setAttribute('material', {
            shader: 'flat',
            transparent: true,
            opacity: this.data.opacity,
            color: this.data.color
        });
        
        // Add pulsing animation
        this.el.setAttribute('animation', {
            property: 'material.opacity',
            from: this.data.opacity * 0.5,
            to: this.data.opacity,
            dur: 2000,
            loop: true,
            direction: 'alternate'
        });
    }
});

// VR UI component for in-VR interface
AFRAME.registerComponent('vr-ui', {
    schema: {
        type: { type: 'string', default: 'panel' }
    },
    
    init: function() {
        this.createUI();
    },
    
    createUI: function() {
        if (this.data.type === 'panel') {
            // Create panel background
            const panel = document.createElement('a-plane');
            panel.setAttribute('width', '2');
            panel.setAttribute('height', '1.5');
            panel.setAttribute('color', '#333333');
            panel.setAttribute('material', 'shader: flat; transparent: true; opacity: 0.8');
            this.el.appendChild(panel);
            
            // Create text
            const text = document.createElement('a-text');
            text.setAttribute('value', 'VR Interface');
            text.setAttribute('color', '#ffffff');
            text.setAttribute('width', '1.8');
            text.setAttribute('align', 'center');
            text.setAttribute('position', '0 0 0.01');
            this.el.appendChild(text);
        }
    }
});

// Teleport component for VR navigation
AFRAME.registerComponent('teleport', {
    schema: {
        target: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }
    },
    
    init: function() {
        this.el.addEventListener('click', this.teleport.bind(this));
    },
    
    teleport: function() {
        const camera = document.querySelector('#camera');
        if (camera) {
            camera.setAttribute('position', this.data.target);
        }
    }
});

// Quiz component for interactive questions
AFRAME.registerComponent('quiz-element', {
    schema: {
        question: { type: 'string', default: '' },
        options: { type: 'array', default: [] },
        correctAnswer: { type: 'number', default: 0 }
    },
    
    init: function() {
        this.el.addEventListener('click', this.showQuiz.bind(this));
    },
    
    showQuiz: function() {
        // Create quiz UI in VR space
        const quizUI = document.createElement('a-entity');
        quizUI.setAttribute('position', '0 0 -2');
        
        // Add question text
        const questionText = document.createElement('a-text');
        questionText.setAttribute('value', this.data.question);
        questionText.setAttribute('color', '#ffffff');
        questionText.setAttribute('width', '3');
        questionText.setAttribute('align', 'center');
        questionText.setAttribute('position', '0 1 0');
        quizUI.appendChild(questionText);
        
        // Add options
        this.data.options.forEach((option, index) => {
            const optionEl = document.createElement('a-box');
            optionEl.setAttribute('width', '1.5');
            optionEl.setAttribute('height', '0.3');
            optionEl.setAttribute('depth', '0.1');
            optionEl.setAttribute('color', '#1e3a8a');
            optionEl.setAttribute('position', `0 ${0.5 - index * 0.4} 0`);
            optionEl.setAttribute('class', 'clickable');
            optionEl.setAttribute('data-answer', index);
            optionEl.addEventListener('click', this.selectAnswer.bind(this, index));
            
            const optionText = document.createElement('a-text');
            optionText.setAttribute('value', option);
            optionText.setAttribute('color', '#ffffff');
            optionText.setAttribute('width', '1.4');
            optionText.setAttribute('align', 'center');
            optionText.setAttribute('position', '0 0 0.06');
            optionEl.appendChild(optionText);
            
            quizUI.appendChild(optionEl);
        });
        
        this.el.appendChild(quizUI);
    },
    
    selectAnswer: function(answerIndex) {
        const isCorrect = answerIndex === this.data.correctAnswer;
        
        // Show feedback
        const feedback = document.createElement('a-text');
        feedback.setAttribute('value', isCorrect ? '¡Correcto!' : 'Incorrecto');
        feedback.setAttribute('color', isCorrect ? '#00ff00' : '#ff0000');
        feedback.setAttribute('width', '2');
        feedback.setAttribute('align', 'center');
        feedback.setAttribute('position', '0 2 0');
        
        this.el.appendChild(feedback);
        
        // Remove feedback after 3 seconds
        setTimeout(() => {
            feedback.remove();
        }, 3000);
        
        // Emit progress event
        this.el.sceneEl.emit('quiz-answered', { 
            correct: isCorrect, 
            answer: answerIndex 
        });
    }
});

// Environment component for dynamic scenes
AFRAME.registerComponent('environment', {
    schema: {
        type: { type: 'string', default: 'office' }
    },
    
    init: function() {
        this.createEnvironment();
    },
    
    createEnvironment: function() {
        switch(this.data.type) {
            case 'office':
                this.createOfficeEnvironment();
                break;
            case 'classroom':
                this.createClassroomEnvironment();
                break;
            case 'laboratory':
                this.createLaboratoryEnvironment();
                break;
        }
    },
    
    createOfficeEnvironment: function() {
        // Office environment is already created in the main scene
        console.log('Office environment loaded');
    },
    
    createClassroomEnvironment: function() {
        // Create classroom elements
        const classroom = document.createElement('a-entity');
        classroom.setAttribute('id', 'classroom-environment');
        
        // Add desks, blackboard, etc.
        // This would be implemented for classroom scenes
        
        this.el.appendChild(classroom);
    },
    
    createLaboratoryEnvironment: function() {
        // Create laboratory elements
        const laboratory = document.createElement('a-entity');
        laboratory.setAttribute('id', 'laboratory-environment');
        
        // Add lab equipment, tables, etc.
        // This would be implemented for laboratory scenes
        
        this.el.appendChild(laboratory);
    }
});

// Audio component for VR sound effects
AFRAME.registerComponent('vr-audio', {
    schema: {
        src: { type: 'string', default: '' },
        autoplay: { type: 'boolean', default: false },
        loop: { type: 'boolean', default: false }
    },
    
    init: function() {
        if (this.data.src) {
            this.el.setAttribute('sound', {
                src: this.data.src,
                autoplay: this.data.autoplay,
                loop: this.data.loop
            });
        }
    }
});

// Hand tracking component for Quest 3
AFRAME.registerComponent('hand-tracking', {
    init: function() {
        // Check if hand tracking is available
        if (navigator.xr) {
            navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                if (supported) {
                    this.setupHandTracking();
                }
            });
        }
    },
    
    setupHandTracking: function() {
        // Hand tracking implementation for Quest 3
        // This would integrate with WebXR hand tracking API
        console.log('Hand tracking available');
    }
});

// Performance optimization component
AFRAME.registerComponent('performance-optimizer', {
    schema: {
        level: { type: 'string', default: 'medium' }
    },
    
    init: function() {
        this.optimizePerformance();
    },
    
    optimizePerformance: function() {
        const scene = this.el.sceneEl;
        
        switch(this.data.level) {
            case 'low':
                scene.setAttribute('renderer', {
                    antialias: false,
                    colorManagement: false
                });
                break;
            case 'medium':
                scene.setAttribute('renderer', {
                    antialias: true,
                    colorManagement: true
                });
                break;
            case 'high':
                scene.setAttribute('renderer', {
                    antialias: true,
                    colorManagement: true,
                    physicallyCorrectLights: true
                });
                break;
        }
    }
});

console.log('GCA Virtual VR Components loaded successfully!'); 