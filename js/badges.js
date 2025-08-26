/**
 * Modern Badges System
 * Manages user achievements and badges with detailed descriptions
 */

class BadgeSystem {
    constructor() {
        this.storageKey = 'gca_virtual_badges';
        this.badges = this.loadBadges();
        this.categories = this.getCategories();
    }

    /**
     * Get badge categories
     */
    getCategories() {
        return {
            explorer: { name: 'Explorador', color: '#10b981', icon: 'fas fa-compass' },
            special: { name: 'Especial', color: '#06b6d4', icon: 'fas fa-trophy' }
        };
    }

    /**
     * Load badges from LocalStorage or create default ones
     */
    loadBadges() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            return JSON.parse(stored);
        }

        // Only the two requested badges
        const defaultBadges = [
            {
                id: 'world_explorer',
                name: 'Explorador de Mundo',
                icon: 'fas fa-globe',
                category: 'explorer',
                unlocked: true,
                unlockedDate: new Date().toISOString(),
                description: 'Tu primer gran logro explorando el mundo en VR',
                longDescription: 'Has iniciado tu travesía global dentro de GCA Virtual. Este es el primer paso para descubrir nuevos horizontes y culturas.',
                requirements: 'Completar la primera experiencia de exploración mundial',
                rarity: 'common',
                points: 25
            },
            {
                id: 'mirai_japan_visit',
                name: 'Visita a Mirai Innovation Japan',
                icon: 'fas fa-torii-gate',
                category: 'special',
                unlocked: true,
                unlockedDate: new Date().toISOString(),
                description: 'Visitaste Mirai Innovation en Japón (experiencia virtual)',
                longDescription: 'Exploraste virtualmente Mirai Innovation en Japón, conociendo su visión, tecnología y aportes a la innovación educativa.',
                requirements: 'Completar la visita virtual a Mirai Innovation Japan',
                rarity: 'uncommon',
                points: 50
            }
        ];

        this.saveBadges(defaultBadges);
        return defaultBadges;
    }

    /**
     * Save badges to LocalStorage
     */
    saveBadges(badges) {
        localStorage.setItem(this.storageKey, JSON.stringify(badges));
    }

    /**
     * Get all badges
     */
    getAllBadges() {
        return this.badges;
    }

    /**
     * Get unlocked badges
     */
    getUnlockedBadges() {
        return this.badges.filter(badge => badge.unlocked);
    }

    /**
     * Get locked badges
     */
    getLockedBadges() {
        return this.badges.filter(badge => !badge.unlocked);
    }

    /**
     * Get badges by category
     */
    getBadgesByCategory(category) {
        return this.badges.filter(badge => badge.category === category);
    }

    /**
     * Get badge by ID
     */
    getBadgeById(id) {
        return this.badges.find(badge => badge.id === id);
    }

    /**
     * Unlock a badge
     */
    unlockBadge(badgeId) {
        const badge = this.getBadgeById(badgeId);
        if (badge && !badge.unlocked) {
            badge.unlocked = true;
            badge.unlockedDate = new Date().toISOString();
            this.saveBadges(this.badges);
            
            // Show notification
            this.showUnlockNotification(badge);
            
            return true;
        }
        return false;
    }

    /**
     * Show unlock notification
     */
    showUnlockNotification(badge) {
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, ${this.categories[badge.category].color} 0%, ${this.categories[badge.category].color}dd 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 300px;
            transform: translateX(100%);
            transition: transform 0.4s ease;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <i class="${badge.icon}" style="font-size: 24px;"></i>
                <div>
                    <div style="font-weight: 600; font-size: 16px;">¡Badge Desbloqueado!</div>
                    <div style="font-size: 14px; opacity: 0.9;">${badge.name}</div>
                </div>
            </div>
            <div style="font-size: 12px; opacity: 0.8;">${badge.description}</div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 400);
        }, 5000);
    }

    /**
     * Get total points
     */
    getTotalPoints() {
        return this.getUnlockedBadges().reduce((total, badge) => total + badge.points, 0);
    }

    /**
     * Get progress percentage
     */
    getProgressPercentage() {
        const unlocked = this.getUnlockedBadges().length;
        const total = this.badges.length;
        return Math.round((unlocked / total) * 100);
    }

    /**
     * Get rarity statistics
     */
    getRarityStats() {
        const stats = {};
        this.getUnlockedBadges().forEach(badge => {
            stats[badge.rarity] = (stats[badge.rarity] || 0) + 1;
        });
        return stats;
    }

    /**
     * Render badges in container
     */
    renderBadges(container, showLocked = true) {
        if (!container) return;

        container.innerHTML = '';
        
        const categories = Object.keys(this.categories);
        
        categories.forEach(category => {
            const categoryBadges = this.getBadgesByCategory(category);
            if (categoryBadges.length === 0) return;

            // Create category section
            const categorySection = document.createElement('div');
            categorySection.className = 'badge-category';
            categorySection.innerHTML = `
                <div class="category-header">
                    <i class="${this.categories[category].icon}"></i>
                    <h3>${this.categories[category].name}</h3>
                </div>
                <div class="category-badges"></div>
            `;

            const badgesContainer = categorySection.querySelector('.category-badges');
            
            categoryBadges.forEach(badge => {
                if (!showLocked && !badge.unlocked) return;
                
                const badgeElement = this.createBadgeElement(badge);
                badgesContainer.appendChild(badgeElement);
            });

            container.appendChild(categorySection);
        });
    }

    /**
     * Create badge element
     */
    createBadgeElement(badge) {
        const badgeElement = document.createElement('div');
        badgeElement.className = `badge-item ${badge.unlocked ? 'unlocked' : 'locked'}`;
        badgeElement.dataset.badgeId = badge.id;
        
        const categoryColor = this.categories[badge.category].color;
        
        badgeElement.innerHTML = `
            <div class="badge-icon ${badge.unlocked ? '' : 'locked'}" style="background: ${badge.unlocked ? `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}dd 100%)` : '#374151'}">
                <i class="${badge.icon}"></i>
                ${!badge.unlocked ? '<div class="lock-overlay"><i class="fas fa-lock"></i></div>' : ''}
            </div>
            <div class="badge-info">
                <div class="badge-name">${badge.name}</div>
                <div class="badge-description">${badge.description}</div>
                ${badge.unlocked ? `<div class="badge-points">+${badge.points} pts</div>` : ''}
            </div>
        `;
        
        // Add click event for details
        badgeElement.addEventListener('click', () => {
            this.showBadgeDetails(badge);
        });
        
        return badgeElement;
    }

    /**
     * Show badge details modal
     */
    showBadgeDetails(badge) {
        const modal = document.createElement('div');
        modal.className = 'badge-modal';
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
            z-index: 10000;
        `;
        
        const categoryColor = this.categories[badge.category].color;
        
        modal.innerHTML = `
            <div class="badge-modal-content" style="
                background: #1e293b;
                border-radius: 16px;
                padding: 32px;
                max-width: 500px;
                width: 90%;
                border: 1px solid #334155;
                position: relative;
            ">
                <button class="modal-close" style="
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    color: #94a3b8;
                    font-size: 24px;
                    cursor: pointer;
                ">&times;</button>
                
                <div class="badge-modal-header" style="text-align: center; margin-bottom: 24px;">
                    <div class="badge-modal-icon" style="
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        background: ${badge.unlocked ? `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}dd 100%)` : '#374151'};
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 16px;
                        font-size: 32px;
                        color: white;
                    ">
                        <i class="${badge.icon}"></i>
                    </div>
                    <h2 style="color: white; margin: 0;">${badge.name}</h2>
                    <div style="color: #94a3b8; font-size: 14px; margin-top: 4px;">${this.categories[badge.category].name}</div>
                </div>
                
                <div class="badge-modal-body">
                    <div style="color: #e2e8f0; margin-bottom: 16px;">${badge.longDescription}</div>
                    
                    <div style="background: #334155; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                        <div style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">REQUISITOS</div>
                        <div style="color: white;">${badge.requirements}</div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="color: #94a3b8; font-size: 14px;">
                            Rareza: <span style="color: white; text-transform: capitalize;">${badge.rarity}</span>
                        </div>
                        ${badge.unlocked ? `
                            <div style="color: ${categoryColor}; font-weight: 600;">
                                +${badge.points} puntos
                            </div>
                        ` : `
                            <div style="color: #94a3b8; font-size: 14px;">
                                Bloqueado
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close handlers
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    /**
     * Reset badges to default state (only the two requested badges unlocked)
     */
    resetBadges() {
        localStorage.removeItem(this.storageKey);
        this.badges = this.loadBadges();
        return this.badges;
    }
}

// Create global instance
const badgeSystem = new BadgeSystem();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BadgeSystem, badgeSystem };
} 