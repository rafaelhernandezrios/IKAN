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
    
    // Country cards - show cities submenu (only for available countries)
    const countryCards = document.querySelectorAll('.tour-card[data-country]');
    countryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Check if the card is coming soon
            if (this.classList.contains('coming-soon')) {
                // Show coming soon notification
                showNotification('Este tour estará disponible próximamente', 'info');
                return;
            }
            
            const country = this.dataset.country;
            showCitiesSubmenu(country);
        });
    });

    // Back button to return to countries
    const backBtn = document.getElementById('backToCountries');
    if (backBtn) {
        backBtn.addEventListener('click', showCountriesMenu);
    }

    // Back button to return to cities
    const backToCitiesBtn = document.getElementById('backToCities');
    if (backToCitiesBtn) {
        backToCitiesBtn.addEventListener('click', showCitiesMenu);
    }
}

/**
 * Show cities submenu for selected country
 */
function showCitiesSubmenu(country) {
    const countriesGrid = document.getElementById('countriesGrid');
    const citiesSubmenu = document.getElementById('citiesSubmenu');
    const selectedCountryTitle = document.getElementById('selectedCountryTitle');
    const citiesGrid = document.getElementById('citiesGrid');

    if (countriesGrid && citiesSubmenu && selectedCountryTitle && citiesGrid) {
        // Hide countries grid
        countriesGrid.style.display = 'none';
        
        // Show cities submenu
        citiesSubmenu.style.display = 'block';
        
        // Update title
        const countryNames = {
            'japan': 'Japón',
            'mexico': 'México',
            'france': 'Francia'
        };
        selectedCountryTitle.textContent = `Ciudades de ${countryNames[country]}`;
        
        // Load and display cities
        loadCitiesForCountry(country, citiesGrid);
        
        // Setup city card event listeners
        setupCityCardListeners();
    }
}

/**
 * Show countries menu (go back)
 */
function showCountriesMenu() {
    const countriesGrid = document.getElementById('countriesGrid');
    const citiesSubmenu = document.getElementById('citiesSubmenu');

    if (countriesGrid && citiesSubmenu) {
        // Show countries grid
        countriesGrid.style.display = 'grid';
        
        // Hide cities submenu
        citiesSubmenu.style.display = 'none';
    }
}

/**
 * Show cities menu (go back)
 */
function showCitiesMenu() {
    const citiesSubmenu = document.getElementById('citiesSubmenu');
    const cityMapSubmenu = document.getElementById('cityMapSubmenu');

    if (citiesSubmenu && cityMapSubmenu) {
        // Show cities submenu
        citiesSubmenu.style.display = 'block';
        
        // Hide city map submenu
        cityMapSubmenu.style.display = 'none';
    }
}

/**
 * Show city map submenu for selected city
 */
function showCityMapSubmenu(cityName, cityTitle) {
    const citiesSubmenu = document.getElementById('citiesSubmenu');
    const cityMapSubmenu = document.getElementById('cityMapSubmenu');
    const selectedCityTitle = document.getElementById('selectedCityTitle');
    const cityMapContainer = document.getElementById('cityMapContainer');

    if (citiesSubmenu && cityMapSubmenu && selectedCityTitle && cityMapContainer) {
        // Hide cities submenu
        citiesSubmenu.style.display = 'none';
        
        // Show city map submenu
        cityMapSubmenu.style.display = 'block';
        
        // Update title
        selectedCityTitle.textContent = `Mapa de ${cityTitle}`;
        
        // Load and display city map
        loadCityMap(cityName, cityTitle, cityMapContainer);
        
        // Remove any existing info panel
        const existingInfoPanel = cityMapSubmenu.querySelector('.city-map-info');
        if (existingInfoPanel) {
            existingInfoPanel.remove();
        }
        
        // Add city info panel to submenu (not on map)
        const cityMapData = getCityMapData(cityName, cityTitle);
        const infoPanel = createCityInfoPanel(cityMapData);
        
        // Insert info panel after the submenu header
        const submenuHeader = cityMapSubmenu.querySelector('.submenu-header');
        if (submenuHeader && submenuHeader.nextSibling) {
            cityMapSubmenu.insertBefore(infoPanel, submenuHeader.nextSibling);
        } else {
            cityMapSubmenu.appendChild(infoPanel);
        }
        
        // Setup VR button event listeners
        setupVRButtonListeners();
    }
}

/**
 * Load city map with interactive VR buttons
 */
function loadCityMap(cityName, cityTitle, container) {
    const cityMapData = getCityMapData(cityName, cityTitle);
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create map container
    const mapContainer = document.createElement('div');
    mapContainer.className = 'city-map-container';
    
    // Add map image or placeholder
    if (cityMapData.mapImage) {
        const mapImage = document.createElement('img');
        mapImage.src = cityMapData.mapImage;
        mapImage.alt = `Mapa de ${cityTitle}`;
        mapImage.className = 'city-map';
        mapImage.onerror = () => {
            mapContainer.innerHTML = createMapPlaceholder(cityTitle, cityMapData.description);
            addVRButtonsToMap(mapContainer, cityMapData.vrLocations);
        };
        mapContainer.appendChild(mapImage);
    } else {
        mapContainer.innerHTML = createMapPlaceholder(cityTitle, cityMapData.description);
    }
    
    // Add VR buttons
    addVRButtonsToMap(mapContainer, cityMapData.vrLocations);
    
    container.appendChild(mapContainer);
}

/**
 * Create map placeholder
 */
function createMapPlaceholder(cityTitle, description) {
    return `
        <div class="map-placeholder">
            <i class="fas fa-map-marked-alt"></i>
            <h4>${cityTitle}</h4>
            <p>${description}</p>
        </div>
    `;
}

/**
 * Add VR buttons to map
 */
function addVRButtonsToMap(mapContainer, vrLocations) {
    vrLocations.forEach(location => {
        const vrButton = document.createElement('button');
        
        // Determine if location is coming soon
        const isComingSoon = isLocationComingSoon(location.id);
        vrButton.className = `vr-button ${isComingSoon ? 'coming-soon' : ''}`;
        vrButton.style.left = location.x + '%';
        vrButton.style.top = location.y + '%';
        vrButton.dataset.location = location.id;
        vrButton.dataset.city = location.city;
        
        // Add coming soon indicator to tooltip
        const tooltipText = isComingSoon ? `${location.name} (Coming Soon)` : location.name;
        
        vrButton.innerHTML = `
            <i class="${location.icon}"></i>
            <div class="button-tooltip">${tooltipText}</div>
            ${isComingSoon ? '<div class="coming-soon-indicator">⏳</div>' : ''}
        `;
        
        mapContainer.appendChild(vrButton);
    });
}

/**
 * Create city info panel
 */
function createCityInfoPanel(cityData) {
    const infoPanel = document.createElement('div');
    infoPanel.className = 'city-map-info';
    
    infoPanel.innerHTML = `
        <h4>${cityData.name}</h4>
        <p>${cityData.description}</p>
        <div class="city-map-stats">
            <span><i class="fas fa-map-marker-alt"></i> ${cityData.locations} ubicaciones</span>
            <span><i class="fas fa-clock"></i> ${cityData.totalDuration}</span>
        </div>
    `;
    
    return infoPanel;
}

/**
 * Setup VR button event listeners
 */
function setupVRButtonListeners() {
    const vrButtons = document.querySelectorAll('.vr-button');
    vrButtons.forEach(button => {
        button.addEventListener('click', function() {
            const locationId = this.dataset.location;
            const cityName = this.dataset.city;
            const locationName = this.querySelector('.button-tooltip').textContent;
            
            // Check if button is coming soon
            if (this.classList.contains('coming-soon')) {
                showNotification(`⏳ ${locationName} estará disponible próximamente`, 'info');
                return;
            }
            
            // Special case: osaka-research goes directly to VR
            if (locationId === 'osaka-research') {
                startVRSession(locationId, cityName, locationName);
            } else {
                // For other locations, show notification for now
                showNotification(`Próximamente: Tour VR de ${locationName}`, 'info');
                
                // TODO: When videos are ready, uncomment this line and comment out the notification above:
                // startVRSession(locationId, cityName, locationName);
            }
        });
    });
}

/**
 * Get city map data
 */
function getCityMapData(cityName, cityTitle) {
    const cityMaps = {
        'tokio-東京': {
            name: 'Tokio 東京',
            description: 'Capital tecnológica y centro de innovación de Japón',
            mapImage: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/tokyo-map.jpg',
            locations: 4,
            totalDuration: '45 min',
            vrLocations: [
                {
                    id: 'tokyo-lab',
                    name: 'Laboratorio Mirai',
                    city: 'tokio',
                    icon: 'fas fa-flask',
                    x: 30,
                    y: 40
                },
                {
                    id: 'tokyo-tech',
                    name: 'Centro Tecnológico',
                    city: 'tokio',
                    icon: 'fas fa-microchip',
                    x: 70,
                    y: 25
                },
                {
                    id: 'tokyo-robot',
                    name: 'Exhibición de Robots',
                    city: 'tokio',
                    icon: 'fas fa-robot',
                    x: 50,
                    y: 60
                },
                {
                    id: 'tokyo-ai',
                    name: 'Centro de IA',
                    city: 'tokio',
                    icon: 'fas fa-brain',
                    x: 80,
                    y: 70
                }
            ]
        },
        'osaka-大阪': {
            name: 'Osaka 大阪',
            description: 'Puntos de interes en Osaka',
            mapImage: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/osaka-map.jpg',
            locations: 3,
            totalDuration: '35 min',
            vrLocations: [
                {
                    id: 'osaka-industry',
                    name: 'Osaka Castle',
                    city: 'osaka',
                    icon: 'fas fa-landmark',
                    x: 13,
                    y: 15
                },
                {
                    id: 'osaka-research',
                    name: 'Mirai Innovation Research Institute',
                    city: 'osaka',
                    icon: 'fas fa-flask',
                    x: 15,
                    y: 65
                },
                {
                    id: 'osaka-innovation',
                    name: 'Torre de Tsutenkaku',
                    city: 'osaka',
                    icon: 'fas fa-building',
                    x: 80,
                    y: 15
                }
            ]
        },
        'kyoto-京都': {
            name: 'Kyoto 京都',
            description: 'Tradición y tecnología moderna en armonía',
            mapImage: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/kyoto-map.jpg',
            locations: 3,
            totalDuration: '30 min',
            vrLocations: [
                {
                    id: 'kyoto-temple',
                    name: 'Templo Tecnológico',
                    city: 'kyoto',
                    icon: 'fas fa-torii-gate',
                    x: 35,
                    y: 30
                },
                {
                    id: 'kyoto-garden',
                    name: 'Jardín Digital',
                    city: 'kyoto',
                    icon: 'fas fa-seedling',
                    x: 60,
                    y: 45
                },
                {
                    id: 'kyoto-culture',
                    name: 'Centro Cultural VR',
                    city: 'kyoto',
                    icon: 'fas fa-palette',
                    x: 75,
                    y: 60
                }
            ]
        },
        'ciudad-de-mexico': {
            name: 'Ciudad de México',
            description: 'Centro de innovación tecnológica de México',
            mapImage: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/mexico-city-map.jpg',
            locations: 4,
            totalDuration: '40 min',
            vrLocations: [
                {
                    id: 'cdmx-innovation',
                    name: 'Centro de Innovación',
                    city: 'ciudad-de-mexico',
                    icon: 'fas fa-rocket',
                    x: 30,
                    y: 35
                },
                {
                    id: 'cdmx-startup',
                    name: 'Hub de Startups',
                    city: 'ciudad-de-mexico',
                    icon: 'fas fa-chart-line',
                    x: 65,
                    y: 25
                },
                {
                    id: 'cdmx-tech',
                    name: 'Parque Tecnológico',
                    city: 'ciudad-de-mexico',
                    icon: 'fas fa-laptop-code',
                    x: 45,
                    y: 60
                },
                {
                    id: 'cdmx-future',
                    name: 'Museo del Futuro',
                    city: 'ciudad-de-mexico',
                    icon: 'fas fa-crystal-ball',
                    x: 80,
                    y: 70
                }
            ]
        },
        'monterrey': {
            name: 'Monterrey',
            description: 'Hub tecnológico del norte de México',
            mapImage: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/monterrey-map.jpg',
            locations: 3,
            totalDuration: '35 min',
            vrLocations: [
                {
                    id: 'monterrey-tech',
                    name: 'Centro Tecnológico',
                    city: 'monterrey',
                    icon: 'fas fa-microchip',
                    x: 40,
                    y: 40
                },
                {
                    id: 'monterrey-industry',
                    name: 'Parque Industrial 4.0',
                    city: 'monterrey',
                    icon: 'fas fa-cogs',
                    x: 70,
                    y: 30
                },
                {
                    id: 'monterrey-innovation',
                    name: 'Centro de Innovación',
                    city: 'monterrey',
                    icon: 'fas fa-lightbulb',
                    x: 55,
                    y: 65
                }
            ]
        },
        'guadalajara': {
            name: 'Guadalajara',
            description: 'Silicon Valley mexicano',
            mapImage: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/guadalajara-map.jpg',
            locations: 3,
            totalDuration: '38 min',
            vrLocations: [
                {
                    id: 'guadalajara-silicon',
                    name: 'Silicon Valley MX',
                    city: 'guadalajara',
                    icon: 'fas fa-building',
                    x: 35,
                    y: 35
                },
                {
                    id: 'guadalajara-software',
                    name: 'Centro de Software',
                    city: 'guadalajara',
                    icon: 'fas fa-code',
                    x: 65,
                    y: 45
                },
                {
                    id: 'guadalajara-digital',
                    name: 'Parque Digital',
                    city: 'guadalajara',
                    icon: 'fas fa-network-wired',
                    x: 50,
                    y: 65
                }
            ]
        },
        'paris': {
            name: 'París',
            description: 'Centro de investigación y desarrollo europeo',
            mapImage: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/paris-map.jpg',
            locations: 4,
            totalDuration: '50 min',
            vrLocations: [
                {
                    id: 'paris-research',
                    name: 'Centro de Investigación',
                    city: 'paris',
                    icon: 'fas fa-flask',
                    x: 30,
                    y: 30
                },
                {
                    id: 'paris-innovation',
                    name: 'Hub de Innovación',
                    city: 'paris',
                    icon: 'fas fa-lightbulb',
                    x: 65,
                    y: 25
                },
                {
                    id: 'paris-tech',
                    name: 'Parque Tecnológico',
                    city: 'paris',
                    icon: 'fas fa-microchip',
                    x: 45,
                    y: 60
                },
                {
                    id: 'paris-future',
                    name: 'Museo del Futuro',
                    city: 'paris',
                    icon: 'fas fa-crystal-ball',
                    x: 75,
                    y: 70
                }
            ]
        },
        'lyon': {
            name: 'Lyon',
            description: 'Polo tecnológico y científico francés',
            mapImage: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/lyon-map.jpg',
            locations: 3,
            totalDuration: '42 min',
            vrLocations: [
                {
                    id: 'lyon-science',
                    name: 'Centro Científico',
                    city: 'lyon',
                    icon: 'fas fa-atom',
                    x: 40,
                    y: 35
                },
                {
                    id: 'lyon-tech',
                    name: 'Parque Tecnológico',
                    city: 'lyon',
                    icon: 'fas fa-microchip',
                    x: 65,
                    y: 45
                },
                {
                    id: 'lyon-research',
                    name: 'Instituto de Investigación',
                    city: 'lyon',
                    icon: 'fas fa-microscope',
                    x: 50,
                    y: 65
                }
            ]
        },
        'toulouse': {
            name: 'Toulouse',
            description: 'Centro aeroespacial y tecnológico',
            mapImage: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/toulouse-map.jpg',
            locations: 3,
            totalDuration: '45 min',
            vrLocations: [
                {
                    id: 'toulouse-aerospace',
                    name: 'Centro Aeroespacial',
                    city: 'toulouse',
                    icon: 'fas fa-plane',
                    x: 35,
                    y: 30
                },
                {
                    id: 'toulouse-satellite',
                    name: 'Centro de Satélites',
                    city: 'toulouse',
                    icon: 'fas fa-satellite',
                    x: 65,
                    y: 40
                },
                {
                    id: 'toulouse-space',
                    name: 'Museo del Espacio',
                    city: 'toulouse',
                    icon: 'fas fa-rocket',
                    x: 55,
                    y: 65
                }
            ]
        }
    };
    
    return cityMaps[cityName] || {
        name: cityTitle,
        description: 'Explora esta ciudad en realidad virtual',
        mapImage: null,
        locations: 3,
        totalDuration: '30 min',
        vrLocations: [
            {
                id: 'default-location',
                name: 'Ubicación Principal',
                city: cityName,
                icon: 'fas fa-map-marker-alt',
                x: 50,
                y: 50
            }
        ]
    };
}

/**
 * Load cities for a specific country
 */
function loadCitiesForCountry(country, citiesGrid) {
    const citiesData = getCitiesData(country);
    
    // Clear existing cities
    citiesGrid.innerHTML = '';
    
    // Add city cards
    citiesData.forEach(city => {
        const cityCard = createCityCard(city);
        citiesGrid.appendChild(cityCard);
    });
}

/**
 * Get cities data for a country
 */
function getCitiesData(country) {
    const citiesByCountry = {
        'japan': [
            // Available cities
            {
                name: 'Osaka 大阪',
                description: 'Centro industrial y de investigación',
                image: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/osaka-preview.jpg',
                duration: '18 min',
                rating: '4.7',
                badge: 'Industrial',
                available: true
            },
            // Coming Soon cities
            {
                name: 'Tokio 東京',
                description: 'Capital tecnológica y centro de innovación',
                image: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/tokyo-preview.jpg',
                duration: '20 min',
                rating: 'Coming Soon',
                badge: 'Coming Soon',
                available: false
            },
            {
                name: 'Kyoto　京都',
                description: 'Tradición y tecnología moderna',
                image: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/kyoto-preview.jpg',
                duration: '15 min',
                rating: 'Coming Soon',
                badge: 'Coming Soon',
                available: false
            }
        ],
        'mexico': [
            {
                name: 'Ciudad de México',
                description: 'Centro de innovación tecnológica',
                image: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/mexico-preview.jpg',
                duration: '16 min',
                rating: '4.6',
                badge: 'Capital'
            },
            {
                name: 'Monterrey',
                description: 'Hub tecnológico del norte',
                image: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/monterrey-preview.jpg',
                duration: '14 min',
                rating: '4.5',
                badge: 'Tecnológico'
            },
            {
                name: 'Guadalajara',
                description: 'Silicon Valley mexicano',
                image: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/guadalajara-preview.jpg',
                duration: '17 min',
                rating: '4.7',
                badge: 'Innovación'
            }
        ],
        'france': [
            {
                name: 'París',
                description: 'Centro de investigación y desarrollo',
                image: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/paris-preview.jpg',
                duration: '22 min',
                rating: '4.8',
                badge: 'Capital'
            },
            {
                name: 'Lyon',
                description: 'Polo tecnológico y científico',
                image: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/lyon-preview.jpg',
                duration: '19 min',
                rating: '4.6',
                badge: 'Científico'
            },
            {
                name: 'Toulouse',
                description: 'Centro aeroespacial y tecnológico',
                image: 'https://ikan-bucket.s3.us-east-2.amazonaws.com/toulouse-preview.jpg',
                duration: '21 min',
                rating: '4.7',
                badge: 'Aeroespacial'
            }
        ]
    };
    
    return citiesByCountry[country] || [];
}

/**
 * Create city card element
 */
function createCityCard(city) {
    const cityCard = document.createElement('div');
    cityCard.className = `city-card ${city.available ? '' : 'coming-soon'}`;
    cityCard.dataset.city = city.name.toLowerCase().replace(/\s+/g, '-');
    
    // Determine icon and badge content based on availability
    const overlayIcon = city.available ? 'fas fa-play' : 'fas fa-clock';
    const badgeContent = city.available ? city.badge : 'Coming Soon';
    const ratingIcon = city.available ? 'fas fa-star' : 'fas fa-clock';
    const ratingText = city.available ? city.rating : 'Próximamente';
    
    cityCard.innerHTML = `
        <div class="city-image">
            <img src="${city.image}" alt="${city.name}" onerror="this.src='https://via.placeholder.com/300x200/1e293b/ffffff?text=${city.name}'">
            <div class="city-overlay ${city.available ? '' : 'coming-soon-overlay'}">
                <i class="${overlayIcon}"></i>
            </div>
            <div class="city-badge ${city.available ? '' : 'coming-soon-badge'}">${badgeContent}</div>
        </div>
        <div class="city-info">
            <h4>${city.name}</h4>
            <p>${city.description}</p>
            <div class="city-stats">
                <span><i class="fas fa-clock"></i> ${city.duration}</span>
                <span><i class="${ratingIcon}"></i> ${ratingText}</span>
            </div>
        </div>
    `;
    
    return cityCard;
}

/**
 * Setup city card event listeners
 */
function setupCityCardListeners() {
    const cityCards = document.querySelectorAll('.city-card');
    cityCards.forEach(card => {
        card.addEventListener('click', function() {
            // Check if the city is coming soon
            if (this.classList.contains('coming-soon')) {
                // Show coming soon notification
                showNotification('Esta ciudad estará disponible próximamente', 'info');
                return;
            }
            
            const cityName = this.dataset.city;
            const cityTitle = this.querySelector('h4').textContent;
            
            // Show city map submenu
            showCityMapSubmenu(cityName, cityTitle);
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
 * Start VR session with specific city
 */
function startVRSession(locationId, cityName, locationName) {
    // Show loading state
    const openVRToursBtn = document.getElementById('openVRToursBtn');
    if (openVRToursBtn) {
        const originalText = openVRToursBtn.innerHTML;
        openVRToursBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        openVRToursBtn.disabled = true;
        
        // Close modal
        closeVRToursModal();
        
        // Show notification
        showNotification(`Iniciando tour VR de ${locationName}...`, 'info');
        
        // Simulate loading and redirect
        setTimeout(() => {
            // Store selected city in localStorage for VR experience
            localStorage.setItem('gca_virtual_selected_city', cityName);
            localStorage.setItem('gca_virtual_selected_location', locationId);
            
                    // Redirect to VR experience selector
        window.location.href = 'vr/vr-experience-selector.html';
        }, 1500);
    }
}

/**
 * Get city display name
 */
function getCityDisplayName(cityName) {
    // Convert kebab-case to proper name
    const cityNames = {
        'tokio': 'Tokio',
        'osaka': 'Osaka',
        'kyoto': 'Kyoto',
        'ciudad-de-mexico': 'Ciudad de México',
        'monterrey': 'Monterrey',
        'guadalajara': 'Guadalajara',
        'paris': 'París',
        'lyon': 'Lyon',
        'toulouse': 'Toulouse'
    };
    return cityNames[cityName] || cityName;
}

/**
 * Get location display name
 */
function getLocationDisplayName(locationId) {
    const locationNames = {
        // Tokyo locations
        'tokyo-lab': 'Laboratorio Mirai',
        'tokyo-tech': 'Centro Tecnológico',
        'tokyo-robot': 'Exhibición de Robots',
        'tokyo-ai': 'Centro de IA',
        
        // Osaka locations
        'osaka-industry': 'Osaka Castle',
        'osaka-research': 'Mirai Innovation Research Institute',
        'osaka-innovation': 'Torre de Tsutenkaku',
        
        // Kyoto locations
        'kyoto-temple': 'Templo Tecnológico',
        'kyoto-garden': 'Jardín Digital',
        'kyoto-culture': 'Centro Cultural VR',
        
        // Mexico City locations
        'cdmx-innovation': 'Centro de Innovación',
        'cdmx-startup': 'Hub de Startups',
        'cdmx-tech': 'Parque Tecnológico',
        'cdmx-future': 'Museo del Futuro',
        
        // Monterrey locations
        'monterrey-tech': 'Centro Tecnológico',
        'monterrey-industry': 'Parque Industrial 4.0',
        'monterrey-innovation': 'Centro de Innovación',
        
        // Guadalajara locations
        'guadalajara-silicon': 'Silicon Valley MX',
        'guadalajara-software': 'Centro de Software',
        'guadalajara-digital': 'Parque Digital',
        
        // Paris locations
        'paris-research': 'Centro de Investigación',
        'paris-innovation': 'Hub de Innovación',
        'paris-tech': 'Parque Tecnológico',
        'paris-future': 'Museo del Futuro',
        
        // Lyon locations
        'lyon-science': 'Centro Científico',
        'lyon-tech': 'Parque Tecnológico',
        'lyon-research': 'Instituto de Investigación',
        
        // Toulouse locations
        'toulouse-aerospace': 'Centro Aeroespacial',
        'toulouse-satellite': 'Centro de Satélites',
        'toulouse-space': 'Museo del Espacio'
    };
    return locationNames[locationId] || 'Ubicación VR';
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
        background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
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

/**
 * Helper function to determine if a location is coming soon
 */
function isLocationComingSoon(locationId) {
    const comingSoonLocations = [
        'osaka-industry',    // Osaka Castle
        'osaka-innovation'   // Torre de Tsutenkaku
    ];
    return comingSoonLocations.includes(locationId);
}