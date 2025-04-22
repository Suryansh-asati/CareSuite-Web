// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Journal Entry Handling
function saveJournalEntry() {
    const journalText = document.getElementById('journal-text').value;
    const date = new Date().toLocaleDateString();
    
    if (journalText.trim() !== '') {
        let entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        entries.push({
            date: date,
            text: journalText
        });
        localStorage.setItem('journalEntries', JSON.stringify(entries));
        
        // Clear the textarea
        document.getElementById('journal-text').value = '';
        
        // Refresh the entries display
        displayJournalEntries();
        
        alert('Journal entry saved successfully!');
    }
}

function displayJournalEntries() {
    const entriesContainer = document.getElementById('journal-entries');
    if (!entriesContainer) return;

    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    entriesContainer.innerHTML = '';

    entries.reverse().forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'journal-entry';
        entryElement.innerHTML = `
            <h3>${entry.date}</h3>
            <p>${entry.text}</p>
        `;
        entriesContainer.appendChild(entryElement);
    });
}

// Mood Tracker Handling
function updateMood(mood) {
    const moodDisplay = document.getElementById('selected-mood');
    if (moodDisplay) {
        moodDisplay.textContent = `Current Mood: ${mood}`;
    }
}

// Fitness Tracker Handling
function markDayComplete() {
    const today = new Date().toLocaleDateString();
    const completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]');
    
    if (!completedDays.includes(today)) {
        completedDays.push(today);
        localStorage.setItem('completedDays', JSON.stringify(completedDays));
        alert('Great job! Day marked as complete.');
    } else {
        alert('You have already marked today as complete!');
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize journal entries display if on journal page
    if (document.getElementById('journal-entries')) {
        displayJournalEntries();
    }
});

// CareSuite - Main JavaScript File

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initAnimations();
    initSmoothScroll();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Initialize animations
function initAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.feature-card, .team-member, .testimonial-card');
    
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

// Form validation and submission
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // In a real application, you would send the form data to a server
            // For this demo, we'll just show a success message
            const formData = new FormData(form);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', formValues);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you! Your message has been sent.';
            
            form.innerHTML = '';
            form.appendChild(successMessage);
        }
    });
}

// Initialize form validation for all forms
document.addEventListener('DOMContentLoaded', function() {
    validateForm('contact-form');
    validateForm('journal-form');
    validateForm('workout-form');
});

// Mood tracker functionality
function saveMood() {
    const selectedMood = document.querySelector('.mood-option.selected');
    if (!selectedMood) {
        alert('Please select a mood first');
        return;
    }
    
    const moodType = selectedMood.getAttribute('data-mood');
    const moodNote = document.getElementById('mood-note').value;
    const moodList = document.getElementById('mood-list');
    
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
    moodList.insertBefore(moodEntry, moodList.firstChild);
    
    // Reset form
    document.querySelectorAll('.mood-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.getElementById('mood-note').value = '';
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Mood saved successfully!';
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// Helper function to get mood icon
function getMoodIcon(mood) {
    const icons = {
        'happy': 'smile',
        'sad': 'frown',
        'neutral': 'meh',
        'excited': 'laugh',
        'anxious': 'worried'
    };
    return icons[mood] || 'meh';
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
function handleSubmit(event) {
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