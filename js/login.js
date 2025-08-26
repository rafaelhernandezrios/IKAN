/**
 * Login Page Functionality
 * Handles login form submission and validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already authenticated
    auth.redirectIfAuthenticated();

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signupLink = document.getElementById('signupLink');

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (!email || !password) {
            showError('Por favor completa todos los campos');
            return;
        }

        // Attempt login
        if (auth.login(email, password)) {
            // Show success message briefly
            showSuccess('Iniciando sesión...');
            
            // Redirect to dashboard after short delay
            setTimeout(() => {
                window.location.href = 'pages/dashboard.html';
            }, 1000);
        } else {
            showError('Credenciales inválidas. Intenta con un email válido.');
        }
    });

    // Handle signup link (for future implementation)
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        showInfo('Funcionalidad de registro próximamente disponible');
    });

    // Add input validation feedback
    emailInput.addEventListener('blur', function() {
        validateEmail(this.value);
    });

    passwordInput.addEventListener('blur', function() {
        validatePassword(this.value);
    });

    // Auto-focus email input
    emailInput.focus();
});

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    const emailInput = document.getElementById('email');
    if (email && !isValid) {
        emailInput.style.borderColor = '#ef4444';
    } else {
        emailInput.style.borderColor = '';
    }
    
    return isValid;
}

/**
 * Validate password
 * @param {string} password 
 * @returns {boolean}
 */
function validatePassword(password) {
    const isValid = password.length >= 1; // For demo, just check if not empty
    
    const passwordInput = document.getElementById('password');
    if (password && !isValid) {
        passwordInput.style.borderColor = '#ef4444';
    } else {
        passwordInput.style.borderColor = '';
    }
    
    return isValid;
}

/**
 * Show error message
 * @param {string} message 
 */
function showError(message) {
    showMessage(message, 'error');
}

/**
 * Show success message
 * @param {string} message 
 */
function showSuccess(message) {
    showMessage(message, 'success');
}

/**
 * Show info message
 * @param {string} message 
 */
function showInfo(message) {
    showMessage(message, 'info');
}

/**
 * Show message with type
 * @param {string} message 
 * @param {string} type 
 */
function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    // Add styles
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    // Set background color based on type
    switch(type) {
        case 'error':
            messageEl.style.backgroundColor = '#ef4444';
            break;
        case 'success':
            messageEl.style.backgroundColor = '#10b981';
            break;
        case 'info':
            messageEl.style.backgroundColor = '#3b82f6';
            break;
    }

    // Add to page
    document.body.appendChild(messageEl);

    // Remove after 3 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 3000);
}

// Add slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 