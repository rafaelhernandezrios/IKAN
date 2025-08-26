/**
 * Modern Dashboard Functionality
 * Handles dashboard interactions and WebXR session management
 */

document.addEventListener('DOMContentLoaded', function() {
    // Protect route - redirect to login if not authenticated
    auth.protectRoute();

    // Reset badges on first load to ensure new structure
    if (!localStorage.getItem('gca_virtual_badges_reset')) {
        badgeSystem.resetBadges();
        localStorage.setItem('gca_virtual_badges_reset', 'true');
    }

    // Initialize dashboard
    initializeDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load user data
    loadUserData();
    
    // Load badges
    loadBadges();
    
    // Update badges display
    updateBadgesDisplay();
    
    // Initialize animations
    initializeAnimations();
});

/**
 * Initialize dashboard components
 */
function initializeDashboard() {
    // Add fade-in animation to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            mainContent.style.transition = 'all 0.6s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
}

/**
 * Initialize animations
 */
function initializeAnimations() {
    // Animate metric cards on load
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
    
    // Animate activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 600 + (index * 100));
    });
    
    // Animate badges
    const badgeItems = document.querySelectorAll('.badge-item');
    badgeItems.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            badge.style.transition = 'all 0.4s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
        }, 800 + (index * 150));
    });
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // VR Tours button
    const openVRToursBtn = document.getElementById('openVRToursBtn');
    if (openVRToursBtn) {
        openVRToursBtn.addEventListener('click', function() {
            openVRToursModal();
        });
    }

    // Sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            toggleSidebar();
        });
    }

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for internal dashboard links
            if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') {
                e.preventDefault();
                // Remove active class from all nav items
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                // Add active class to parent nav item
                this.closest('.nav-item').classList.add('active');
            }
            // For external links (like badges.html), let them navigate normally
        });
    });

    // Export CSV button
    const exportBtn = document.querySelector('.btn-secondary');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportUserData();
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
}

/**
 * Toggle sidebar visibility on mobile
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle i');
    
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        toggleBtn.className = 'fas fa-arrow-left';
    } else {
        sidebar.classList.add('open');
        toggleBtn.className = 'fas fa-arrow-right';
    }
}

/**
 * Load and display user data
 */
function loadUserData() {
    const user = auth.getCurrentUser();
    if (user) {
        // Update welcome message
        const welcomeTitle = document.querySelector('.welcome-title');
        if (welcomeTitle) {
            welcomeTitle.textContent = `Welcome, ${user.name || 'User'}`;
        }

        // Update metrics with real data (in a real app, this would come from API)
        updateMetrics();
    }
}

/**
 * Update dashboard metrics
 */
function updateMetrics() {
    // In a real app, these would come from an API
    const metrics = {
        sessions: 12,
        timeInVR: '6h45m',
        interactions: 134
    };

    // Update metric values
    const metricValues = document.querySelectorAll('.metric-value');
    if (metricValues.length >= 3) {
        metricValues[0].textContent = metrics.sessions;
        metricValues[1].textContent = metrics.timeInVR;
        metricValues[2].textContent = metrics.interactions;
    }
}

/**
 * Load badges
 */
function loadBadges() {
    // Badges are now loaded by the badgeSystem
    // This function is kept for compatibility
}

/**
 * Update badges display
 */
function updateBadgesDisplay() {
    const badgesGrid = document.getElementById('dashboardBadges');
    if (badgesGrid) {
        // Clear existing badges
        badgesGrid.innerHTML = '';
        
        // Get unlocked badges for dashboard display
        const unlockedBadges = badgeSystem.getUnlockedBadges().slice(0, 4); // Show up to 4 badges
        
        unlockedBadges.forEach(badge => {
            const badgeElement = createDashboardBadgeElement(badge);
            badgesGrid.appendChild(badgeElement);
        });
        
        // Add empty placeholder if less than 4 badges
        while (badgesGrid.children.length < 4) {
            const emptyBadge = document.createElement('div');
            emptyBadge.className = 'badge-item empty';
            emptyBadge.innerHTML = `
                <div class="badge-icon empty">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
                <div class="badge-name">Más badges</div>
            `;
            badgesGrid.appendChild(emptyBadge);
        }
    }
}

/**
 * Create dashboard badge element
 */
function createDashboardBadgeElement(badge) {
    const badgeItem = document.createElement('div');
    badgeItem.className = 'badge-item';
    
    const categoryColor = badgeSystem.categories[badge.category].color;
    
    badgeItem.innerHTML = `
        <div class="badge-icon" style="background: linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}dd 100%);">
            <i class="${badge.icon}"></i>
        </div>
        <div class="badge-name">${badge.name}</div>
    `;
    
    // Add tooltip with description
    badgeItem.title = `${badge.name}: ${badge.description}`;
    
    // Add click event for details
    badgeItem.addEventListener('click', () => {
        badgeSystem.showBadgeDetails(badge);
    });
    
    return badgeItem;
}

/**
 * Open VR Tours Modal
 */
function openVRToursModal() {
    const modal = document.getElementById('vrToursModal');
    if (modal) {
        modal.classList.add('active');
        
        // Setup modal event listeners
        setupModalEventListeners();
    }
}

/**
 * Setup modal event listeners
 */
function setupModalEventListeners() {
    // Close button
    const closeBtn = document.getElementById('closeVRToursModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVRToursModal);
    }
    
    // Close on overlay click
    const modal = document.getElementById('vrToursModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVRToursModal();
            }
        });
    }
    
    // Tour cards
    const tourCards = document.querySelectorAll('.tour-card');
    tourCards.forEach(card => {
        card.addEventListener('click', function() {
            const tourType = this.dataset.tour;
            startVRSession(tourType);
        });
    });
}

/**
 * Close VR Tours Modal
 */
function closeVRToursModal() {
    const modal = document.getElementById('vrToursModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Start VR session with specific tour
 */
function startVRSession(tourType = 'japan') {
    // Show loading state
    const openVRToursBtn = document.getElementById('openVRToursBtn');
    if (openVRToursBtn) {
        const originalText = openVRToursBtn.innerHTML;
        openVRToursBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        openVRToursBtn.disabled = true;
        
        // Close modal
        closeVRToursModal();
        
        // Show notification
        showNotification(`Iniciando tour de ${getTourName(tourType)}...`, 'info');
        
        // Simulate loading and redirect
        setTimeout(() => {
            // Store selected tour in localStorage for VR experience
            localStorage.setItem('gca_virtual_selected_tour', tourType);
            
            // Redirect to VR experience
            window.location.href = 'vr/quest3-vr-simple-hands.html';
        }, 1500);
    }
}

/**
 * Get tour name by type
 */
function getTourName(tourType) {
    const tourNames = {
        'japan': 'Japón',
        'mexico': 'México',
        'france': 'Francia'
    };
    return tourNames[tourType] || 'Japón';
}

/**
 * Export user data as CSV
 */
function exportUserData() {
    const user = auth.getCurrentUser();
    if (!user) return;

    // Create CSV content
    const csvContent = [
        ['User Data Export'],
        ['Name', user.name || 'User'],
        ['Email', user.email],
        ['Sessions', '12'],
        ['Time in VR', '6h45m'],
        ['Interactions', '134'],
        ['Export Date', new Date().toLocaleDateString()]
    ].map(row => row.join(',')).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gca-virtual-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Show success message
    showNotification('Data exported successfully!', 'success');
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Update activity feed
 */
function updateActivityFeed() {
    // In a real app, this would fetch recent activity from an API
    const activities = [
        { text: "Completed 'Introduction to AI'", time: "1h ago", color: "purple" },
        { text: "Visited Pepper Robot", time: "3h ago", color: "teal" },
        { text: "Session finished", time: "Yesterday", color: "grey" },
        { text: "Session started", time: "Yesterday", color: "grey" },
        { text: "Completed 'Basics of Robotics'", time: "2d ago", color: "blue" }
    ];

    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = '';
        
        activities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-dot ${activity.color}"></div>
                <div class="activity-content">
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            `;
            activityList.appendChild(activityItem);
        });
    }
}

// Update activity feed on load
document.addEventListener('DOMContentLoaded', function() {
    updateActivityFeed();
});

// Global function to reset badges (for testing)
window.resetBadges = function() {
    badgeSystem.resetBadges();
    updateBadgesDisplay();
    console.log('Badges reset to default state');
    console.log('Unlocked badges:', badgeSystem.getUnlockedBadges().map(b => b.name));
};

/**
 * Handle user logout
 */
function handleLogout() {
    // Show confirmation dialog
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Show loading state
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            const originalText = logoutBtn.innerHTML;
            logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Cerrando...</span>';
            logoutBtn.style.pointerEvents = 'none';
            
            // Simulate logout process
            setTimeout(() => {
                // Clear user data
                auth.logout();
                
                // Show success message
                showNotification('Sesión cerrada exitosamente', 'success');
                
                // Redirect to landing page after a short delay
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);
            }, 1000);
        }
    }
} 