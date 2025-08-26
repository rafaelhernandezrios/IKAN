/**
 * Authentication Module
 * Handles user authentication using LocalStorage
 */

class Auth {
    constructor() {
        this.storageKey = 'gca_virtual_user';
        this.isAuthenticated = this.checkAuth();
    }

    /**
     * Check if user is authenticated
     * @returns {boolean}
     */
    checkAuth() {
        const user = localStorage.getItem(this.storageKey);
        return user !== null;
    }

    /**
     * Get current user data
     * @returns {Object|null}
     */
    getCurrentUser() {
        const user = localStorage.getItem(this.storageKey);
        return user ? JSON.parse(user) : null;
    }

    /**
     * Login user
     * @param {string} email 
     * @param {string} password 
     * @returns {boolean}
     */
    login(email, password) {
        // Simple validation - in a real app, this would be server-side
        if (!email || !password) {
            return false;
        }

        // For demo purposes, accept any valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        // Create user object
        const user = {
            email: email,
            name: email.split('@')[0], // Use email prefix as name
            points: 125,
            loginTime: new Date().toISOString()
        };

        // Store in LocalStorage
        localStorage.setItem(this.storageKey, JSON.stringify(user));
        this.isAuthenticated = true;

        return true;
    }

    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem(this.storageKey);
        this.isAuthenticated = false;
        window.location.href = 'index.html';
    }

    /**
     * Update user points
     * @param {number} points 
     */
    updatePoints(points) {
        const user = this.getCurrentUser();
        if (user) {
            user.points = points;
            localStorage.setItem(this.storageKey, JSON.stringify(user));
        }
    }

    /**
     * Protect route - redirect to login if not authenticated
     */
    protectRoute() {
        if (!this.isAuthenticated) {
            window.location.href = 'index.html';
        }
    }

    /**
     * Redirect to dashboard if already authenticated
     */
    redirectIfAuthenticated() {
        if (this.isAuthenticated) {
            window.location.href = 'pages/dashboard.html';
        }
    }
}

// Create global auth instance
const auth = new Auth(); 