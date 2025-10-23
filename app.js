// Global Variables
let musicPlaying = false;
let countdownInterval;
const eventDate = new Date('2025-10-15T00:00:00').getTime();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen after a delay
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 2000);
    
    // Initialize all components
    initializeNavigation();
    initializeCountdown();
    initializeAnimations();
    initializeForm();
    initializeMusicToggle();
    initializeScrollAnimations();
    initializeEventCards();
}

// Navigation Functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const joinBtn = document.getElementById('join-now-btn');
    const exploreBtn = document.getElementById('explore-events-btn');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero button actions
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            scrollToSection('register');
        });
    }
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            scrollToSection('events');
        });
    }
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(11, 11, 11, 0.95)';
        } else {
            navbar.style.background = 'rgba(11, 11, 11, 0.9)';
        }
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Countdown Timer
function initializeCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = padZero(days);
        document.getElementById('hours').textContent = padZero(hours);
        document.getElementById('minutes').textContent = padZero(minutes);
        document.getElementById('seconds').textContent = padZero(seconds);
    } else {
        // Event has started
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Change countdown title
        document.querySelector('.countdown-section .section-title').textContent = 'Event is Live!';
        clearInterval(countdownInterval);
    }
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

// Animations
function initializeAnimations() {
    // Add floating animation variations
    const floatingElements = document.querySelectorAll('.floating-bat, .floating-ghost, .floating-pumpkin');
    
    floatingElements.forEach((element, index) => {
        const delay = Math.random() * 2;
        const duration = 4 + Math.random() * 4;
        element.style.animationDelay = delay + 's';
        element.style.animationDuration = duration + 's';
    });
    
    // Glowing effect for time numbers
    const timeNumbers = document.querySelectorAll('.time-number');
    setInterval(() => {
        timeNumbers.forEach(num => {
            num.style.textShadow = `0 0 ${20 + Math.random() * 10}px #FF7518`;
        });
    }, 1000);
}

// Form Handling
function initializeForm() {
    const form = document.getElementById('registration-form');
    const gameSelect = document.getElementById('game-selection');
    const gameIdInput = document.getElementById('game-id');
    const gameIdHelp = document.querySelector('.form-help');
    
    // Update game ID placeholder based on selection
    if (gameSelect && gameIdInput) {
        gameSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            
            if (selectedValue === 'E-5') {
                gameIdInput.placeholder = 'Portfolio link or contact info';
                gameIdHelp.textContent = 'Provide your portfolio link or contact information for the design contest';
            } else {
                gameIdInput.placeholder = 'Enter your in-game ID';
                gameIdHelp.textContent = 'Enter your game ID or portfolio link for design contest';
            }
        });
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                teamName: document.getElementById('team-name').value,
                gameSelection: document.getElementById('game-selection').value,
                gameId: document.getElementById('game-id').value
            };
            
            // Basic validation
            if (!formData.name || !formData.email || !formData.gameSelection || !formData.gameId) {
                showNotification('Please fill in all required fields!', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(formData.email)) {
                showNotification('Please enter a valid email address!', 'error');
                return;
            }
            
            // Simulate registration process
            showRegistrationLoading();
            
            setTimeout(() => {
                showNotification(`🎃 Registration successful! Welcome to THE HALLO_FEST, ${formData.name}! Check your email for payment instructions.`, 'success');
                form.reset();
                hideRegistrationLoading();
            }, 2000);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-text">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#FF7518' : '#6B1A8B',
        color: '#0B0B0B',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: `0 0 20px ${type === 'success' ? '#FF7518' : '#6B1A8B'}`,
        zIndex: '10000',
        maxWidth: '400px',
        fontSize: '14px',
        fontWeight: '600',
        transform: 'translateX(500px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(500px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function showRegistrationLoading() {
    const submitBtn = document.querySelector('.register-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
        <span style="display: inline-block; animation: spin 1s linear infinite;">⚡</span>
        Processing Registration...
    `;
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Store original content
    submitBtn.dataset.originalContent = originalText;
}

function hideRegistrationLoading() {
    const submitBtn = document.querySelector('.register-btn');
    const originalContent = submitBtn.dataset.originalContent;
    
    submitBtn.innerHTML = originalContent;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
}

// Music Toggle
function initializeMusicToggle() {
    const musicBtn = document.getElementById('music-toggle');
    
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }
}

function toggleMusic() {
    const musicBtn = document.getElementById('music-toggle');
    const icon = musicBtn.querySelector('i');
    
    musicPlaying = !musicPlaying;
    
    if (musicPlaying) {
        icon.className = 'fas fa-volume-mute';
        musicBtn.style.background = '#6B1A8B';
        musicBtn.style.borderColor = '#6B1A8B';
        musicBtn.style.color = '#FFFFFF';
        
        // Since we can't play actual audio files, we'll just show the visual feedback
        showNotification('🎵 Spooky music would be playing here! (Audio disabled in demo)', 'success');
    } else {
        icon.className = 'fas fa-volume-up';
        musicBtn.style.background = 'rgba(255, 117, 24, 0.2)';
        musicBtn.style.borderColor = '#FF7518';
        musicBtn.style.color = '#FF7518';
        
        showNotification('🔇 Music stopped', 'success');
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll(
        '.event-card, .timeline-item, .prize-calculator, .about-content'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Event Cards
function initializeEventCards() {
    const eventCards = document.querySelectorAll('.event-card');
    const registerButtons = document.querySelectorAll('.event-register-btn');
    
    // Add hover effects
    eventCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Add glow effect
            card.style.boxShadow = '0 15px 40px rgba(255, 117, 24, 0.6)';
            
            // Animate floating elements faster
            const floatingElements = document.querySelectorAll('.floating-bat, .floating-ghost, .floating-pumpkin');
            floatingElements.forEach(el => {
                el.style.animationDuration = '2s';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
            
            // Reset animation speed
            const floatingElements = document.querySelectorAll('.floating-bat, .floating-ghost, .floating-pumpkin');
            floatingElements.forEach(el => {
                el.style.animationDuration = '4s';
            });
        });
    });
    
    // Register button actions
    registerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const eventId = eventCard.dataset.event;
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            
            // Pre-fill form if user clicks register on specific event
            const gameSelect = document.getElementById('game-selection');
            if (gameSelect) {
                gameSelect.value = eventId;
                gameSelect.dispatchEvent(new Event('change'));
            }
            
            // Scroll to registration
            scrollToSection('register');
            
            // Show confirmation
            showNotification(`💀 Ready to register for ${eventTitle}? Fill out the form below!`, 'success');
        });
    });
}

// Prize Calculator (Dynamic Updates)
function updatePrizeCalculator() {
    // This would normally connect to a real backend
    // For demo purposes, we'll simulate dynamic updates
    const scenarios = document.querySelectorAll('.scenario');
    
    setInterval(() => {
        scenarios.forEach(scenario => {
            const winnerAmount = scenario.querySelector('.winner-amount');
            if (winnerAmount) {
                // Add subtle glow animation
                winnerAmount.style.animation = 'glow 1s ease-in-out';
                setTimeout(() => {
                    winnerAmount.style.animation = '';
                }, 1000);
            }
        });
    }, 5000);
}

// Utility Functions
function createSpookyParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    // Create floating particles
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.textContent = ['💀', '🕷️', '🦇', '👻'][Math.floor(Math.random() * 4)];
        particle.style.cssText = `
            position: absolute;
            font-size: 1rem;
            opacity: 0.3;
            animation: floatParticle ${10 + Math.random() * 20}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10%, 90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

// Initialize spooky particles
setTimeout(createSpookyParticles, 3000);

// Initialize prize calculator updates
setTimeout(updatePrizeCalculator, 5000);

// Add some interactive spooky effects
function addSpookyInteractions() {
    // Thunder effect on title click
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('click', () => {
            document.body.style.filter = 'brightness(2)';
            setTimeout(() => {
                document.body.style.filter = 'brightness(1)';
            }, 100);
            setTimeout(() => {
                document.body.style.filter = 'brightness(2)';
            }, 200);
            setTimeout(() => {
                document.body.style.filter = 'brightness(1)';
            }, 250);
        });
    }
    
    // Spooky hover effects for decorative elements
    const decorations = document.querySelectorAll('.decoration');
    decorations.forEach(decoration => {
        decoration.addEventListener('mouseenter', () => {
            decoration.style.transform = 'scale(1.5) rotate(360deg)';
            decoration.style.transition = 'transform 0.5s ease';
        });
        
        decoration.addEventListener('mouseleave', () => {
            decoration.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize spooky interactions
setTimeout(addSpookyInteractions, 2000);

// Handle window resize
window.addEventListener('resize', () => {
    // Adjust floating elements positions on resize
    const floatingElements = document.querySelectorAll('.floating-bat, .floating-ghost, .floating-pumpkin');
    floatingElements.forEach(el => {
        // Recalculate positions if needed
        el.style.animationPlayState = 'paused';
        setTimeout(() => {
            el.style.animationPlayState = 'running';
        }, 100);
    });
});

// Performance optimization: Pause animations when page is not visible
document.addEventListener('visibilitychange', () => {
    const animations = document.querySelectorAll('.floating-bat, .floating-ghost, .floating-pumpkin, .fog-layer');
    
    if (document.hidden) {
        animations.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
        clearInterval(countdownInterval);
    } else {
        animations.forEach(el => {
            el.style.animationPlayState = 'running';
        });
        countdownInterval = setInterval(updateCountdown, 1000);
    }
});