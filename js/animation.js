// CareSuite Animation and Interaction Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavbar();
    initAnimations();
    initSmoothScroll();
    initMobileMenu();
    initMoodTracker();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Animation on scroll functionality
function initAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll('.feature-card, .team-member, .testimonial-card, .section-title, .hero-content');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class when element is in viewport
    function handleScroll() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.animation = 'fadeInUp 1s ease forwards';
            }
        });
    }
    
    // Initial check
    handleScroll();
    
    // Check on scroll
    window.addEventListener('scroll', handleScroll);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mood tracker functionality
function initMoodTracker() {
    const moodOptions = document.querySelectorAll('.mood-option');
    let selectedMood = null;

    moodOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            moodOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            selectedMood = this.getAttribute('data-mood');
        });
    });
}

function saveMood() {
    const selectedOption = document.querySelector('.mood-option.selected');
    if (!selectedOption) {
        alert('Please select a mood first');
        return;
    }

    const moodType = selectedOption.getAttribute('data-mood');
    const moodNote = document.getElementById('mood-note').value;
    const moodList = document.getElementById('mood-list');

    // Remove empty state message if it exists
    const emptyState = moodList.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }

    // Create new mood entry
    const moodEntry = document.createElement('div');
    moodEntry.className = 'mood-entry';
    moodEntry.innerHTML = `
        <div class="mood-entry-header">
            <i class="fas fa-${getMoodIcon(moodType)}"></i>
            <h3>${moodType.charAt(0).toUpperCase() + moodType.slice(1)}</h3>
            <span class="entry-date">${new Date().toLocaleDateString()}</span>
        </div>
        ${moodNote ? `<p class="mood-note">${moodNote}</p>` : ''}
    `;

    // Add to the beginning of the list
    if (moodList.firstChild) {
        moodList.insertBefore(moodEntry, moodList.firstChild);
    } else {
        moodList.appendChild(moodEntry);
    }

    // Reset form
    document.querySelectorAll('.mood-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.getElementById('mood-note').value = '';

    // Show success message
    showSuccessMessage('Mood saved successfully!');
}

// Helper function to get mood icon
function getMoodIcon(mood) {
    const icons = {
        'happy': 'smile',
        'calm': 'meh',
        'anxious': 'frown',
        'sad': 'sad-tear',
        'excited': 'laugh'
    };
    return icons[mood] || 'meh';
}

// Success message function
function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;
    
    // Add success message styles
    successMessage.style.position = 'fixed';
    successMessage.style.top = '20px';
    successMessage.style.right = '20px';
    successMessage.style.backgroundColor = 'var(--teal)';
    successMessage.style.color = 'white';
    successMessage.style.padding = '1rem 2rem';
    successMessage.style.borderRadius = 'var(--radius-md)';
    successMessage.style.boxShadow = 'var(--shadow-md)';
    successMessage.style.zIndex = '1000';
    
    document.body.appendChild(successMessage);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Journal functionality
function handleJournalSubmit(event) {
    event.preventDefault();
    
    const title = document.getElementById('entry-title').value;
    const content = document.getElementById('entry-content').value;
    const mood = document.getElementById('entry-mood').value;
    
    // Add to journal entries
    const entriesList = document.getElementById('entries-list');
    const entry = document.createElement('div');
    entry.className = 'journal-entry';
    entry.innerHTML = `
        <h3>${title}</h3>
        <p class="entry-date">${new Date().toLocaleDateString()} - Mood: ${mood}</p>
        <p class="entry-text">${content}</p>
    `;
    
    entriesList.insertBefore(entry, entriesList.firstChild);
    
    // Clear the form
    event.target.reset();
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Journal entry saved successfully!';
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// Fitness tracker functionality
function handleWorkoutSubmit(event) {
    event.preventDefault();
    
    const workoutType = document.getElementById('workout-type').value;
    const duration = document.getElementById('duration').value;
    const intensity = document.getElementById('intensity').value;
    
    // Update stats (in a real app, this would be more sophisticated)
    const steps = Math.floor(duration * 100);
    const calories = Math.floor(duration * 5);
    const activeMinutes = duration;
    
    document.getElementById('steps-count').textContent = steps;
    document.getElementById('calories-count').textContent = calories;
    document.getElementById('active-minutes').textContent = activeMinutes;
    
    // Add to workout history
    const workoutList = document.getElementById('workout-list');
    const workoutEntry = document.createElement('div');
    workoutEntry.className = 'workout-entry';
    workoutEntry.innerHTML = `
        <h3>${workoutType.charAt(0).toUpperCase() + workoutType.slice(1)}</h3>
        <p>Duration: ${duration} minutes</p>
        <p>Intensity: ${intensity}</p>
        <p>Time: ${new Date().toLocaleTimeString()}</p>
    `;
    
    workoutList.insertBefore(workoutEntry, workoutList.firstChild);
    
    // Clear the form
    event.target.reset();
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Workout logged successfully!';
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// Contact form functionality
function handleContactSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show an alert
    alert(`Thank you for your message, ${name}! We'll get back to you at ${email} soon.`);
    
    // Clear the form
    event.target.reset();
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Message sent successfully!';
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
} 