/**
 * Badges System
 * Manages user achievements and badges using LocalStorage
 */

class BadgeSystem {
    constructor() {
        this.storageKey = 'gca_virtual_badges';
        this.badges = this.loadBadges();
    }

    /**
     * Load badges from LocalStorage or create default ones
     * @returns {Array}
     */
    loadBadges() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            return JSON.parse(stored);
        }

        // Default badges based on mockup
        const defaultBadges = [
            {
                id: 'explorer',
                name: 'Explorador Global',
                icon: '🌍',
                unlocked: true,
                category: 'explorer',
                description: 'Completaste tu primera sesión global'
            },
            {
                id: 'louvre',
                name: 'Héroe del Louvre',
                icon: '🏛️',
                unlocked: true,
                category: 'louvre',
                description: 'Exploraste el Museo del Louvre'
            },
            {
                id: 'thinker',
                name: 'Pensador Crítico',
                icon: '🧠',
                unlocked: true,
                category: 'thinker',
                description: 'Completaste ejercicios de pensamiento crítico'
            },
            {
                id: 'collaborator',
                name: 'Colaborador Estrella',
                icon: '🤝',
                unlocked: true,
                category: 'collaborator',
                description: 'Participaste en actividades colaborativas'
            },
            {
                id: 'champion',
                name: 'Campeón Semestral',
                icon: '🏆',
                unlocked: true,
                category: 'champion',
                description: 'Completaste todas las sesiones del semestre'
            },
            {
                id: 'innovator',
                name: 'Innovador Digital',
                icon: '💡',
                unlocked: false,
                category: 'innovator',
                description: 'Crea tu primera experiencia VR'
            },
            {
                id: 'traveler',
                name: 'Viajero Virtual',
                icon: '✈️',
                unlocked: false,
                category: 'traveler',
                description: 'Visita 10 ubicaciones virtuales'
            },
            {
                id: 'mentor',
                name: 'Mentor Experto',
                icon: '👨‍🏫',
                unlocked: false,
                category: 'mentor',
                description: 'Ayuda a otros estudiantes'
            }
        ];

        // Save default badges
        this.saveBadges(defaultBadges);
        return defaultBadges;
    }

    /**
     * Save badges to LocalStorage
     * @param {Array} badges 
     */
    saveBadges(badges) {
        localStorage.setItem(this.storageKey, JSON.stringify(badges));
        this.badges = badges;
    }

    /**
     * Get all badges
     * @returns {Array}
     */
    getAllBadges() {
        return this.badges;
    }

    /**
     * Get unlocked badges
     * @returns {Array}
     */
    getUnlockedBadges() {
        return this.badges.filter(badge => badge.unlocked);
    }

    /**
     * Unlock a badge
     * @param {string} badgeId 
     */
    unlockBadge(badgeId) {
        const badge = this.badges.find(b => b.id === badgeId);
        if (badge && !badge.unlocked) {
            badge.unlocked = true;
            badge.unlockedAt = new Date().toISOString();
            this.saveBadges(this.badges);
            
            // Show notification
            this.showUnlockNotification(badge);
        }
    }

    /**
     * Show unlock notification
     * @param {Object} badge 
     */
    showUnlockNotification(badge) {
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        notification.innerHTML = `
            <div class="badge-notification-content">
                <div class="badge-notification-icon">${badge.icon}</div>
                <div class="badge-notification-text">
                    <h4>¡Nuevo logro desbloqueado!</h4>
                    <p>${badge.name}</p>
                </div>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            padding: 16px;
            z-index: 1000;
            animation: slideInBadge 0.5s ease-out;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutBadge 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }

    /**
     * Render badges in container
     * @param {HTMLElement} container 
     * @param {boolean} showLocked - Whether to show locked badges
     */
    renderBadges(container, showLocked = false) {
        if (!container) return;

        const badgesToShow = showLocked ? this.badges : this.getUnlockedBadges();
        
        container.innerHTML = '';

        badgesToShow.forEach(badge => {
            const badgeElement = this.createBadgeElement(badge);
            container.appendChild(badgeElement);
        });

        // Add animation
        container.classList.add('fade-in');
    }

    /**
     * Create badge element
     * @param {Object} badge 
     * @returns {HTMLElement}
     */
    createBadgeElement(badge) {
        const badgeEl = document.createElement('div');
        badgeEl.className = `badge-item badge-${badge.category}`;
        badgeEl.dataset.badgeId = badge.id;

        badgeEl.innerHTML = `
            <div class="badge-icon ${!badge.unlocked ? 'locked' : ''}">
                ${badge.unlocked ? badge.icon : '🔒'}
            </div>
            <div class="badge-name">${badge.name}</div>
        `;

        // Add tooltip for description
        if (badge.description) {
            badgeEl.title = badge.description;
        }

        // Add click handler for locked badges
        if (!badge.unlocked) {
            badgeEl.style.opacity = '0.6';
            badgeEl.style.cursor = 'default';
        } else {
            badgeEl.addEventListener('click', () => {
                this.showBadgeDetails(badge);
            });
        }

        return badgeEl;
    }

    /**
     * Show badge details modal
     * @param {Object} badge 
     */
    showBadgeDetails(badge) {
        const modal = document.createElement('div');
        modal.className = 'badge-modal';
        modal.innerHTML = `
            <div class="badge-modal-content">
                <div class="badge-modal-header">
                    <h3>${badge.name}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="badge-modal-body">
                    <div class="badge-modal-icon">${badge.icon}</div>
                    <p>${badge.description}</p>
                    ${badge.unlockedAt ? `<small>Desbloqueado: ${new Date(badge.unlockedAt).toLocaleDateString()}</small>` : ''}
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
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        const content = modal.querySelector('.badge-modal-content');
        content.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            text-align: center;
        `;

        document.body.appendChild(modal);

        // Close handlers
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
}

// Create global badge system instance
const badgeSystem = new BadgeSystem();

// Add badge notification animations
const badgeStyles = document.createElement('style');
badgeStyles.textContent = `
    @keyframes slideInBadge {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutBadge {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .badge-item.locked .badge-icon {
        filter: grayscale(100%);
    }
    
    .badge-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    }
    
    .badge-modal-icon {
        font-size: 48px;
        margin-bottom: 16px;
    }
`;
document.head.appendChild(badgeStyles); 