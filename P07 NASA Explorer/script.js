// NASA API configuration
const NASA_API_KEY = config.apiKey;
const NASA_API_BASE = 'https://api.nasa.gov';

document.addEventListener('DOMContentLoaded', function() {
    createStarfield();
    setTodaysDate();
    setAsteroidDates();
    setupEventListeners();
});

// Create animated starfield with blinking stars and moving asteroids
function createStarfield() {
    const starfield = document.getElementById('starfield');
    const numStars = 200;
    const numAsteroids = 8;
    
    // Create stars
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size class
        const sizes = ['small', 'medium', 'large'];
        const weights = [0.6, 0.3, 0.1]; // More small stars, fewer large ones
        const randomSize = getWeightedRandom(sizes, weights);
        star.classList.add(randomSize);
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration for blinking
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        // Add some stars with different blinking patterns
        if (Math.random() < 0.3) {
            star.style.animation = `twinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate, blink ${3 + Math.random() * 4}s ease-in-out infinite`;
        }
        
        starfield.appendChild(star);
    }
    
    // Create moving asteroids
    for (let i = 0; i < numAsteroids; i++) {
        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';
        
        // Random size and shape
        const size = 2 + Math.random() * 4;
        asteroid.style.width = size + 'px';
        asteroid.style.height = size + 'px';
        asteroid.style.background = `radial-gradient(circle, #8a6914, #5a4409)`;
        asteroid.style.borderRadius = Math.random() < 0.5 ? '50%' : '30%';
        asteroid.style.position = 'absolute';
        asteroid.style.opacity = '0.6';
        
        // Random starting position (off-screen)
        asteroid.style.left = '-10px';
        asteroid.style.top = Math.random() * 100 + '%';
        
        // Random animation duration and delay
        const duration = 15 + Math.random() * 25;
        const delay = Math.random() * 10;
        
        asteroid.style.animation = `moveAsteroid ${duration}s linear ${delay}s infinite`;
        
        starfield.appendChild(asteroid);
    }
}

// Add CSS animations for enhanced space effects
// Styles moved to styles.css


// Weighted random selection helper
function getWeightedRandom(items, weights) {
    const cumulativeWeights = [];
    for (let i = 0; i < weights.length; i++) {
        cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
    }
    
    const random = Math.random() * cumulativeWeights[cumulativeWeights.length - 1];
    
    for (let i = 0; i < cumulativeWeights.length; i++) {
        if (random < cumulativeWeights[i]) {
            return items[i];
        }
    }
}

// Set today's date in APOD date picker
function setTodaysDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('apodDate');
    if (dateInput) {
        dateInput.value = today;
        dateInput.max = today; // Prevent future dates
    }
}

// Set default dates for Asteroids (Today and Tomorrow)
function setAsteroidDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const startDateInput = document.getElementById('asteroidStartDate');
    const endDateInput = document.getElementById('asteroidEndDate');
    
    if (startDateInput && endDateInput) {
        startDateInput.value = today.toISOString().split('T')[0];
        endDateInput.value = tomorrow.toISOString().split('T')[0];
    }
}

// Setup event listeners
function setupEventListeners() {
    // Enter key support for search
    const searchInput = document.getElementById('searchQuery');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchNASALibrary();
            }
        });
    }
    
    // Enter key support for APOD date
    const apodDateInput = document.getElementById('apodDate');
    if (apodDateInput) {
        apodDateInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loadAPODByDate();
            }
        });
    }
}

// Navigation functions
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// APOD functions
async function loadAPOD() {
    const loader = document.getElementById('apodLoader');
    const content = document.getElementById('apodContent');
    
    showLoader(loader);
    content.innerHTML = '';
    
    try {
        const response = await fetch(`${NASA_API_BASE}/planetary/apod?api_key=${NASA_API_KEY}`);
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`API Error (${response.status}): ${text}`);
        }
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        displayAPOD(data);
    } catch (error) {
        console.error('APOD Error:', error);
        displayError('apodContent', 'Failed to load APOD: ' + error.message);
    } finally {
        hideLoader(loader);
    }
}

async function loadAPODByDate() {
    const dateInput = document.getElementById('apodDate');
    const selectedDate = dateInput.value;
    
    if (!selectedDate) {
        alert('Please select a date');
        return;
    }
    
    const loader = document.getElementById('apodLoader');
    const content = document.getElementById('apodContent');
    
    showLoader(loader);
    content.innerHTML = '';
    
    try {
        const response = await fetch(`${NASA_API_BASE}/planetary/apod?api_key=${NASA_API_KEY}&date=${selectedDate}`);
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`API Error (${response.status}): ${text}`);
        }
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        displayAPOD(data);
    } catch (error) {
        console.error('APOD Date Error:', error);
        displayError('apodContent', 'Failed to load APOD for selected date: ' + error.message);
    } finally {
        hideLoader(loader);
    }
}

function displayAPOD(data) {
    const content = document.getElementById('apodContent');
    
    let mediaHtml = '';
    if (data.media_type === 'image') {
        mediaHtml = `<img src="${data.url}" alt="${data.title}" loading="lazy" class="media-content">`;
    } else if (data.media_type === 'video') {
        if (data.url.includes('youtube.com') || data.url.includes('vimeo.com')) {
            mediaHtml = `<iframe src="${data.url}" frameborder="0" allowfullscreen class="media-content video-frame"></iframe>`;
        } else {
            mediaHtml = `<video controls class="media-content video-player">
                            <source src="${data.url}" type="video/mp4">
                            Your browser does not support the video tag.
                         </video>`;
        }
    }
    
    content.innerHTML = `
        <div class="media-card full-width">
            <div class="media-content-wrapper">
                ${mediaHtml}
            </div>
            <div class="media-info">
                <h2>${data.title}</h2>
                <p class="date">${data.date}</p>
                <p class="explanation">${data.explanation}</p>
                ${data.copyright ? `<p class="copyright">© ${data.copyright}</p>` : ''}
            </div>
        </div>
    `;
}

async function loadAsteroids() {
    const startDate = document.getElementById('asteroidStartDate').value;
    const endDate = document.getElementById('asteroidEndDate').value;
    const loader = document.getElementById('asteroidsLoader');
    const content = document.getElementById('asteroidsContent');
    
    if (!startDate || !endDate) {
        alert('Please select both start and end dates');
        return;
    }

    showLoader(loader);
    content.innerHTML = '';
    
    try {
        const response = await fetch(`${NASA_API_BASE}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`);
        
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`API Error (${response.status}): ${text}`);
        }

        const data = await response.json();
        displayAsteroids(data);
    } catch (error) {
        console.error('Asteroids Error:', error);
        displayError('asteroidsContent', 'Failed to load Asteroid data: ' + error.message);
    } finally {
        hideLoader(loader);
    }
}

function displayAsteroids(data) {
    const content = document.getElementById('asteroidsContent');
    const elementCount = data.element_count;
    const nearEarthObjects = data.near_earth_objects;
    
    let asteroidsHtml = `<div class="results-summary" style="width:100%; text-align:center; margin-bottom:20px; font-size:1.2em;"><p>Found <strong>${elementCount}</strong> Near Earth Objects</p></div>`;
    asteroidsHtml += '<div class="media-gallery">';
    
    // Flatten the object (dates are keys) into an array
    Object.keys(nearEarthObjects).sort().forEach(date => {
        nearEarthObjects[date].forEach(asteroid => {
            const isHazardous = asteroid.is_potentially_hazardous_asteroid;
            const diameter = asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2);
            const closeApproach = asteroid.close_approach_data[0];
            const velocity = parseFloat(closeApproach.relative_velocity.kilometers_per_hour).toFixed(0);
            const missDistance = parseFloat(closeApproach.miss_distance.kilometers).toFixed(0);
            
            asteroidsHtml += `
                <div class="media-card ${isHazardous ? 'hazardous' : ''}">
                    <div class="media-info">
                        <h4>${asteroid.name.replace(/[()]/g, '')}</h4>
                        <p><strong>Date:</strong> ${closeApproach.close_approach_date}</p>
                        <p><strong>Diameter:</strong> ${diameter} km</p>
                        <p><strong>Velocity:</strong> ${Number(velocity).toLocaleString()} km/h</p>
                        <p><strong>Miss Distance:</strong> ${Number(missDistance).toLocaleString()} km</p>
                        <p><strong>Hazardous:</strong> ${isHazardous ? '<span style="color:#ff4444; font-weight:bold;">YES ⚠️</span>' : '<span style="color:#44ff44">NO</span>'}</p>
                        <p><a href="${asteroid.nasa_jpl_url}" target="_blank" class="hd-link">View JPL Data</a></p>
                    </div>
                </div>
            `;
        });
    });
    
    asteroidsHtml += '</div>';
    content.innerHTML = asteroidsHtml;
}



// EPIC Earth Images functions
async function loadEPICImages() {
    const loader = document.getElementById('epicLoader');
    const content = document.getElementById('epicContent');
    
    showLoader(loader);
    content.innerHTML = '';
    
    try {
        // Fetch the latest images using the correct endpoint
        const response = await fetch(`${NASA_API_BASE}/EPIC/api/natural/images?api_key=${NASA_API_KEY}`);
        
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`API Error (${response.status}): ${text}`);
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
            displayEPICImages(data.slice(0, 12)); // Show first 12 images
        } else {
            throw new Error('No EPIC images available');
        }
    } catch (error) {
        console.error('EPIC Error:', error);
        displayError('epicContent', 'Failed to load EPIC images: ' + error.message);
    } finally {
        hideLoader(loader);
    }
}

async function loadEPICByDate() {
    const dateInput = document.getElementById('epicDate');
    const selectedDate = dateInput.value;
    
    if (!selectedDate) {
        alert('Please select a date');
        return;
    }
    
    const loader = document.getElementById('epicLoader');
    const content = document.getElementById('epicContent');
    
    showLoader(loader);
    content.innerHTML = '';
    
    try {
        // Fetch images for the selected date
        const response = await fetch(`${NASA_API_BASE}/EPIC/api/natural/date/${selectedDate}?api_key=${NASA_API_KEY}`);
        
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`API Error (${response.status}): ${text}`);
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
            displayEPICImages(data);
        } else {
            displayError('epicContent', 'No EPIC images available for this date.');
        }
    } catch (error) {
        console.error('EPIC Date Error:', error);
        displayError('epicContent', 'Failed to load EPIC images for selected date: ' + error.message);
    } finally {
        hideLoader(loader);
    }
}

function displayEPICImages(images) {
    const content = document.getElementById('epicContent');
    
    const imagesHtml = images.map(image => {
        // Fix date parsing and ensure HTTPS
        // Date format from API is "YYYY-MM-DD HH:MM:SS"
        // We need YYYY/MM/DD for the archive URL
        const dateParts = image.date.split(' ')[0].split('-');
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        
        const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${image.image}.png?api_key=${NASA_API_KEY}`;
        
        return `
            <div class="media-card">
                <!-- Image Container -->
                <div class="image-container">
                    <img src="${imageUrl}" alt="Earth from EPIC" loading="lazy"
                         onclick="openImageModal('${imageUrl}', 'Earth - ${image.date}')"
                         class="gallery-img">
                </div>

                <!-- Text Information Container -->
                <div class="media-info">
                    <h4>Earth from Space</h4>
                    <p><strong>Date:</strong> ${image.date}</p>
                    <p><strong>Caption:</strong> ${image.caption || 'Earth as seen from the EPIC camera'}</p>
                    ${image.centroid_coordinates ? `
                    <p class="small-text"><strong>Lat/Lon:</strong> ${image.centroid_coordinates.lat.toFixed(2)}, ${image.centroid_coordinates.lon.toFixed(2)}</p>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    content.innerHTML = `
        <div class="media-gallery">
            ${imagesHtml}
        </div>
    `;
}


// NASA Library search functions
async function searchNASALibrary() {
    const searchInput = document.getElementById('searchQuery');
    const query = searchInput.value.trim();
    
    if (!query) {
        alert('Please enter a search term');
        return;
    }
    
    const loader = document.getElementById('libraryLoader');
    const content = document.getElementById('libraryContent');
    
    showLoader(loader);
    content.innerHTML = '';
    
    try {
        const response = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page_size=20`);
        
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`API Error (${response.status}): ${text}`);
        }

        const data = await response.json();
        
        if (data.collection && data.collection.items && data.collection.items.length > 0) {
            displayLibraryResults(data.collection.items);
        } else {
            displayError('libraryContent', 'No results found for your search query.');
        }
    } catch (error) {
        console.error('Library Search Error:', error);
        displayError('libraryContent', 'Failed to search NASA library: ' + error.message);
    } finally {
        hideLoader(loader);
    }
}

function displayLibraryResults(items) {
    const content = document.getElementById('libraryContent');
    
    const resultsHtml = items.map(item => {
        const data = item.data[0];
        // Ensure HTTPS for library images
        let imageUrl = item.links && item.links[0] ? item.links[0].href : '';
        if (imageUrl && imageUrl.startsWith('http:')) {
            imageUrl = imageUrl.replace('http:', 'https:');
        }
        
        return `
            <div class="media-card">
                <!-- Image Container -->
                <div class="image-container">
                    ${imageUrl ? `<img src="${imageUrl}" alt="${data.title}" loading="lazy" 
                                   onclick="openImageModal('${imageUrl}', '${data.title}')"
                                   class="gallery-img">` : ''}
                </div>

                <!-- Text Information Container -->
                <div class="media-info">
                    <h4>${data.title}</h4>
                    <p><strong>Date:</strong> ${data.date_created ? new Date(data.date_created).toLocaleDateString() : 'Unknown'}</p>
                    <p>${data.description ? data.description.substring(0, 150) + '...' : 'No description available'}</p>
                    ${data.keywords ? `<p><strong>Keywords:</strong> ${data.keywords.slice(0, 5).join(', ')}</p>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    content.innerHTML = `
        <div class="media-gallery">
            ${resultsHtml}
        </div>
    `;
}


// Utility functions
function showLoader(loader) {
    if (loader) {
        loader.style.display = 'flex';
    }
}

function hideLoader(loader) {
    if (loader) {
        loader.style.display = 'none';
    }
}

function displayError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="error-container">
                <h3 class="error-title">⚠️ Error</h3>
                <p class="error-message">${message}</p>
            </div>
        `;
    }
}

// Image modal for full-screen viewing
function openImageModal(imageUrl, title) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close" onclick="closeImageModal()">&times;</span>
            <img src="${imageUrl}" alt="${title}">
            <div class="modal-title">${title}</div>
        </div>
    `;
    
    // Add modal styles
    // Styles are now in styles.css under .image-modal
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close on click outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Add modal CSS
// Styles moved to styles.css


// Auto-load content on page switch
document.addEventListener('click', function(e) {
    if (e.target.matches('[onclick*="showPage"]')) {
        const pageId = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
        
        // Auto-load content for certain pages
        setTimeout(() => {
            if (pageId === 'apod' && !document.getElementById('apodContent').innerHTML) {
                loadAPOD();
            }
        }, 100);
    }
});

// Initialize with some content on load
setTimeout(() => {
    if (document.getElementById('home').classList.contains('active')) {
        // Add some subtle animations to feature cards
        const cards = document.querySelectorAll('.feature-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.6s ease forwards';
            }, index * 200);
        });
    }
}, 500)