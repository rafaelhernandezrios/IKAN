/**
 * Custom VR Components for GCA Virtual
 * Enhanced components for A-Frame VR experience
 */

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