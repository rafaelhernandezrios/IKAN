/**
 * Dashboard Functionality
 * Handles dashboard interactions and WebXR session management
 */

document.addEventListener('DOMContentLoaded', function() {
    // Protect route - redirect to login if not authenticated
    auth.protectRoute();

    // Initialize dashboard
    initializeDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load user data
    loadUserData();
    
    // Load badges
    loadBadges();
});

/**
 * Initialize dashboard components
 */
function initializeDashboard() {
    // Add fade-in animation to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            auth.logout();
        });
    }

    // VR Session button
    const vrSessionBtn = document.getElementById('enterVRSession');
    if (vrSessionBtn) {
        vrSessionBtn.addEventListener('click', function() {
            startVRSession();
        });
    }

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

/**
 * Load and display user data
 */
function loadUserData() {
    const user = auth.getCurrentUser();
    if (user) {
        // Update points display
        const pointsElement = document.getElementById('userPoints');
        if (pointsElement) {
            pointsElement.textContent = user.points;
        }

        // Update session information (could be loaded from API in real app)
        updateSessionInfo();
    }
}

/**
 * Update session information
 */
function updateSessionInfo() {
    // In a real app, this would come from an API
    const currentSession = {
        title: 'Futuro del Trabajo',
        location: 'TOKIO',
        type: 'Video',
        description: 'Explora las tendencias del futuro del trabajo en Tokio',
        webxrUrl: 'https://example.com/webxr-session' // Replace with actual WebXR URL
    };

    // Update session card if elements exist
    const sessionTitle = document.querySelector('.session-title');
    const sessionLocation = document.querySelector('.session-location');
    
    if (sessionTitle) sessionTitle.textContent = currentSession.title;
    if (sessionLocation) sessionLocation.textContent = currentSession.location;
}

/**
 * Load and display badges
 */
function loadBadges() {
    const badgesContainer = document.getElementById('badgesContainer');
    if (badgesContainer) {
        badgeSystem.renderBadges(badgesContainer, false); // Only show unlocked badges
    }
}

/**
 * Start VR session
 */
function startVRSession() {
    // Show loading state
    const vrBtn = document.getElementById('enterVRSession');
    const originalText = vrBtn.textContent;
    vrBtn.textContent = 'Cargando...';
    vrBtn.disabled = true;

            // Check WebXR support and redirect to VR experience
        setTimeout(() => {
            if (navigator.xr) {
                // Redirect to VR experience with simple hand detection for Quest 3
                window.location.href = 'quest3-vr-simple-hands.html';
            } else {
                // Fallback for browsers without WebXR support
                showWebXRNotSupported();
            }

        // Restore button
        vrBtn.textContent = originalText;
        vrBtn.disabled = false;
    }, 1500);
}

/**
 * Open WebXR experience
 */
function openWebXRExperience() {
    // Create modal for WebXR experience
    const modal = document.createElement('div');
    modal.className = 'webxr-modal';
    modal.innerHTML = `
        <div class="webxr-content">
            <div class="webxr-header">
                <h3>Experiencia WebXR - Futuro del Trabajo</h3>
                <button class="webxr-close">&times;</button>
            </div>
            <div class="webxr-body">
                <div class="webxr-placeholder">
                    <div class="vr-icon-large">🥽</div>
                    <h4>Experiencia VR Inmersiva</h4>
                    <p>Explora el futuro del trabajo en Tokio a través de realidad virtual</p>
                    <div class="webxr-features">
                        <div class="feature">
                            <span class="feature-icon">🌍</span>
                            <span>360° Inmersivo</span>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">🎯</span>
                            <span>Interactivo</span>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">📚</span>
                            <span>Educativo</span>
                        </div>
                    </div>
                    <button class="webxr-launch-btn">Lanzar Experiencia</button>
                </div>
            </div>
        </div>
    `;

    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;

    const content = modal.querySelector('.webxr-content');
    content.style.cssText = `
        background: white;
        border-radius: 16px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(modal);

    // Close handlers
    const closeBtn = modal.querySelector('.webxr-close');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    // Launch button handler
    const launchBtn = modal.querySelector('.webxr-launch-btn');
    launchBtn.addEventListener('click', () => {
        // Simulate launching WebXR experience
        simulateWebXRExperience();
        modal.remove();
    });
}

/**
 * Show WebXR not supported message
 */
function showWebXRNotSupported() {
    const modal = document.createElement('div');
    modal.className = 'webxr-error-modal';
    modal.innerHTML = `
        <div class="webxr-error-content">
            <div class="error-icon">⚠️</div>
            <h3>WebXR no soportado</h3>
            <p>Tu navegador no soporta experiencias de realidad virtual.</p>
            <p>Para una experiencia completa, usa un navegador compatible con WebXR o un dispositivo VR.</p>
            <button class="error-close-btn">Entendido</button>
        </div>
    `;

    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    const content = modal.querySelector('.webxr-error-content');
    content.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 32px;
        text-align: center;
        max-width: 400px;
        width: 90%;
    `;

    document.body.appendChild(modal);

    // Close handler
    const closeBtn = modal.querySelector('.error-close-btn');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

/**
 * Simulate WebXR experience
 */
function simulateWebXRExperience() {
    // Create fullscreen VR experience simulation
    const vrExperience = document.createElement('div');
    vrExperience.className = 'vr-experience';
    vrExperience.innerHTML = `
        <div class="vr-hud">
            <div class="vr-info">
                <span class="vr-location">Tokio, Japón</span>
                <span class="vr-progress">Progreso: 0%</span>
            </div>
            <div class="vr-controls">
                <button class="vr-exit">Salir</button>
            </div>
        </div>
        <div class="vr-scene">
            <div class="vr-environment">
                <div class="vr-building">🏢</div>
                <div class="vr-people">👥</div>
                <div class="vr-technology">💻</div>
            </div>
            <div class="vr-overlay">
                <h2>Futuro del Trabajo</h2>
                <p>Explora las oficinas del futuro en Tokio</p>
                <div class="vr-quiz">
                    <h3>Pregunta 1:</h3>
                    <p>¿Qué tecnología será más importante en el trabajo del futuro?</p>
                    <div class="vr-options">
                        <button class="vr-option">Inteligencia Artificial</button>
                        <button class="vr-option">Realidad Virtual</button>
                        <button class="vr-option">Automatización</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add VR experience styles
    vrExperience.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 2000;
        overflow: hidden;
    `;

    document.body.appendChild(vrExperience);

    // Add VR-specific styles
    const vrStyles = document.createElement('style');
    vrStyles.textContent = `
        .vr-hud {
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            display: flex;
            justify-content: space-between;
            color: white;
            z-index: 10;
        }
        
        .vr-scene {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .vr-environment {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 200px;
            opacity: 0.3;
        }
        
        .vr-overlay {
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 40px;
            border-radius: 16px;
            text-align: center;
            max-width: 500px;
        }
        
        .vr-option {
            display: block;
            width: 100%;
            margin: 10px 0;
            padding: 15px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            border-radius: 8px;
            cursor: pointer;
        }
        
        .vr-option:hover {
            background: rgba(255,255,255,0.2);
        }
        
        .vr-exit {
            background: rgba(255,255,255,0.2);
            border: 1px solid white;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(vrStyles);

    // Exit VR experience
    const exitBtn = vrExperience.querySelector('.vr-exit');
    exitBtn.addEventListener('click', () => {
        vrExperience.remove();
        vrStyles.remove();
    });

    // Simulate progress
    let progress = 0;
    const progressElement = vrExperience.querySelector('.vr-progress');
    const progressInterval = setInterval(() => {
        progress += 10;
        if (progressElement) {
            progressElement.textContent = `Progreso: ${progress}%`;
        }
        if (progress >= 100) {
            clearInterval(progressInterval);
            // Unlock a badge for completing the experience
            badgeSystem.unlockBadge('innovator');
        }
    }, 2000);
} 