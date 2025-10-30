// NASA API configuration
const NASA_API_KEY = config.apiKey;
const NASA_API_BASE = 'https://api.nasa.gov';

document.addEventListener('DOMContentLoaded', function() {
    createStarfield();
    setTodaysDate();
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
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 0.3; }
        25%, 75% { opacity: 1; }
        100% { opacity: 0.3; }
    }
    
    @keyframes moveAsteroid {
        0% {
            transform: translateX(0) translateY(0) rotate(0deg);
        }
        100% {
            transform: translateX(calc(100vw + 20px)) translateY(-50px) rotate(360deg);
        }
    }
    
    .asteroid {
        box-shadow: 0 0 3px rgba(138, 105, 20, 0.8);
    }
    
    .star.large {
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
    }
    
    .star.medium {
        box-shadow: 0 0 3px rgba(255, 255, 255, 0.6);
    }
`;
document.head.appendChild(style);

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
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        displayAPOD(data);
    } catch (error) {
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
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        displayAPOD(data);
    } catch (error) {
        displayError('apodContent', 'Failed to load APOD for selected date: ' + error.message);
    } finally {
        hideLoader(loader);
    }
}

function displayAPOD(data) {
    const content = document.getElementById('apodContent');
    
    let mediaHtml = '';
    if (data.media_type === 'image') {
        mediaHtml = `<img src="${data.url}" alt="${data.title}" loading="lazy">`;
    } else if (data.media_type === 'video') {
        if (data.url.includes('youtube.com') || data.url.includes('vimeo.com')) {
            mediaHtml = `<iframe src="${data.url}" frameborder="0" allowfullscreen style="width: 100%; height: 400px;"></iframe>`;
        } else {
            mediaHtml = `<video controls style="width: 100%; max-height: 600px;">
                            <source src="${data.url}" type="video/mp4">
                            Your browser does not support the video tag.
                         </video>`;
        }
    }
    
    content.innerHTML = `
        <div class="media-container">
            ${mediaHtml}
            <div class="media-info">
                <h3>${data.title}</h3>
                <p><strong>Date:</strong> ${data.date}</p>
                <p>${data.explanation}</p>
                ${data.copyright ? `<p><strong>Copyright:</strong> ${data.copyright}</p>` : ''}
                ${data.hdurl ? `<p><a href="${data.hdurl}" target="_blank" style="color: #64b5f6;">View HD Version</a></p>` : ''}
            </div>
        </div>
    `;
}

// Mars Rover functions
async function loadMarsPhotos() {
    const roverSelect = document.getElementById('roverSelect');
    const selectedRover = roverSelect.value;
    const loader = document.getElementById('marsLoader');
    const content = document.getElementById('marsContent');
    
    showLoader(loader);
    content.innerHTML = '';
    
    try {
        const response = await fetch(`${NASA_API_BASE}/mars-photos/api/v1/rovers/${selectedRover}/latest_photos?api_key=${NASA_API_KEY}`);
        const data = await response.json();
        
        if (data.latest_photos && data.latest_photos.length > 0) {
            displayMarsPhotos(data.latest_photos.slice(0, 12)); // Show first 12 photos
        } else {
            throw new Error('No photos available for this rover');
        }
    } catch (error) {
        displayError('marsContent', 'Failed to load Mars photos: ' + error.message);
    } finally {
        hideLoader(loader);
    }
}

function displayMarsPhotos(photos) {
    const content = document.getElementById('marsContent');
    
    const photosHtml = photos.map(photo => `
        <div class="media-container" style="display: flex; align-items: center; margin-bottom: 1rem; gap: 1rem; flex-wrap: wrap;">
            <div class="image-container" style="flex: 0 0 30%; max-width: 30%; height: auto;">
                <img src="${photo.img_src}" alt="Mars photo by ${photo.rover.name}" loading="lazy" 
                     onclick="openImageModal('${photo.img_src}', '${photo.rover.name} - Sol ${photo.sol}')"
                     style="width: 100%; height: auto; object-fit: contain; border-radius: 8px;">
            </div>
            <div class="media-info" style="flex: 1; padding: 1rem; display: flex; flex-direction: column; justify-content: space-between;">
                <h4 style="margin: 0 0 0.5rem;">${photo.rover.name}</h4>
                <p><strong>Sol:</strong> ${photo.sol}</p>
                <p><strong>Camera:</strong> ${photo.camera.full_name}</p>
                <p><strong>Date:</strong> ${photo.earth_date}</p>
            </div>
        </div>
    `).join('');
    
    content.innerHTML = `
        <div class="media-gallery" style="display: flex; flex-direction: column; gap: 1rem;">
            ${photosHtml}
        </div>
    `;
}


// EPIC Earth Images functions
async function loadEPICImages() {
    const loader = document.getElementById('epicLoader');
    const content = document.getElementById('epicContent');
    
    showLoader(loader);
    content.innerHTML = '';
    
    try {
        const response = await fetch(`${NASA_API_BASE}/EPIC/api/natural?api_key=${NASA_API_KEY}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
            displayEPICImages(data.slice(0, 6)); // Show first 6 images
        } else {
            throw new Error('No EPIC images available');
        }
    } catch (error) {
        displayError('epicContent', 'Failed to load EPIC images: ' + error.message);
    } finally {
        hideLoader(loader);
    }
}

function displayEPICImages(images) {
    const content = document.getElementById('epicContent');
    
    const imagesHtml = images.map(image => {
        const date = image.date.split(' ')[0].replace(/-/g, '/');
        const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${date.replace(/\//g, '/')}/png/${image.image}.png?api_key=${NASA_API_KEY}`;
        
        return `
            <div class="media-container" style="display: flex; align-items: center; margin-bottom: 1rem; gap: 1rem; flex-wrap: wrap;">
                <!-- Image Container -->
                <div class="image-container" style="flex: 0 0 30%; max-width: 30%; height: auto;">
                    <img src="${imageUrl}" alt="Earth from EPIC" loading="lazy"
                         onclick="openImageModal('${imageUrl}', 'Earth - ${image.date}')"
                         style="width: 100%; height: auto; object-fit: contain; border-radius: 8px;">
                </div>

                <!-- Text Information Container -->
                <div class="media-info" style="flex: 1; padding: 1rem; display: flex; flex-direction: column; justify-content: space-between;">
                    <h4 style="margin: 0 0 0.5rem;">Earth from Space</h4>
                    <p><strong>Date:</strong> ${image.date}</p>
                    <p><strong>Caption:</strong> ${image.caption || 'Earth as seen from the EPIC camera'}</p>
                </div>
            </div>
        `;
    }).join('');
    
    content.innerHTML = `
        <div class="media-gallery" style="display: flex; flex-direction: column; gap: 1rem;">
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
        const data = await response.json();
        
        if (data.collection && data.collection.items && data.collection.items.length > 0) {
            displayLibraryResults(data.collection.items);
        } else {
            displayError('libraryContent', 'No results found for your search query.');
        }
    } catch (error) {
        displayError('libraryContent', 'Failed to search NASA library: ' + error.message);
    } finally {
        hideLoader(loader);
    }
}

function displayLibraryResults(items) {
    const content = document.getElementById('libraryContent');
    
    const resultsHtml = items.map(item => {
        const data = item.data[0];
        const imageUrl = item.links && item.links[0] ? item.links[0].href : '';
        
        return `
            <div class="media-container" style="display: flex; align-items: center; margin-bottom: 1rem; gap: 1rem; flex-wrap: wrap;">
                <!-- Image Container -->
                <div class="image-container" style="flex: 0 0 30%; max-width: 30%; height: auto;">
                    ${imageUrl ? `<img src="${imageUrl}" alt="${data.title}" loading="lazy" 
                                   onclick="openImageModal('${imageUrl}', '${data.title}')"
                                   style="width: 100%; height: auto; object-fit: contain; border-radius: 8px;">` : ''}
                </div>

                <!-- Text Information Container -->
                <div class="media-info" style="flex: 1; padding: 1rem; display: flex; flex-direction: column; justify-content: space-between;">
                    <h4 style="margin: 0 0 0.5rem;">${data.title}</h4>
                    <p><strong>Date:</strong> ${data.date_created ? new Date(data.date_created).toLocaleDateString() : 'Unknown'}</p>
                    <p>${data.description ? data.description.substring(0, 150) + '...' : 'No description available'}</p>
                    ${data.keywords ? `<p><strong>Keywords:</strong> ${data.keywords.slice(0, 5).join(', ')}</p>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    content.innerHTML = `
        <div class="media-gallery" style="display: flex; flex-direction: column; gap: 1rem;">
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
            <div style="text-align: center; padding: 2rem; background: rgba(255, 0, 0, 0.1); border: 1px solid rgba(255, 0, 0, 0.3); border-radius: 10px;">
                <h3 style="color: #ff6b6b; margin-bottom: 1rem;">⚠️ Error</h3>
                <p style="color: #ff9999;">${message}</p>
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
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
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
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    }
    
    .modal-content img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
        box-shadow: 0 0 30px rgba(100, 181, 246, 0.5);
    }
    
    .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10001;
        background: rgba(0, 0, 0, 0.5);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    }
    
    .modal-close:hover {
        background: rgba(255, 0, 0, 0.7);
    }
    
    .modal-title {
        color: white;
        margin-top: 1rem;
        font-size: 1.2rem;
        font-weight: 500;
    }
`;
document.head.appendChild(modalStyle);

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
}, 500);