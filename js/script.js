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