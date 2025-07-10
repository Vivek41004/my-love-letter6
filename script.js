// Global array to hold memory image paths
const memoryImages = [
    'assets/memory1.jpg',
    'assets/memory2.jpg',
    'assets/memory3.jpg', // Add more memory images here
    'assets/memory4.jpg'
];
let currentMemoryIndex = 0;

function openLetter() {
    document.getElementById('envelope-section').classList.add('hidden');
    document.getElementById('letter-section').classList.remove('hidden');
    document.getElementById('memories').classList.remove('hidden');
    document.getElementById('question').classList.remove('hidden');
    launchHearts();
    scrollToSection('letter');
    startSparkleEffect(); // Start the sparkle animation
    showInitialMemory(); // Display the first memory image
}

function launchHearts() {
    const heartsAnim = document.getElementById('hearts-animation');
    for (let i = 0; i < 22; i++) {
        const heart = document.createElement('div');
        heart.textContent = ["💜", "💖", "💟", "💗", "💙"][Math.floor(Math.random() * 5)];
        heart.className = 'falling-heart';
        heart.style.left = Math.random() * 90 + 'vw';
        heart.style.animationDelay = (Math.random() * 2) + "s";
        heartsAnim.appendChild(heart);
        // Remove hearts after their animation to prevent DOM bloat
        setTimeout(() => heart.remove(), 5000);
    }
}

// Sparkle effect for the letter image
function startSparkleEffect() {
    const sparkleDiv = document.querySelector('.image-sparkle');
    if (sparkleDiv) {
        sparkleDiv.style.animation = 'none'; // Reset animation to re-trigger
        void sparkleDiv.offsetWidth; // Trigger reflow
        sparkleDiv.style.animation = 'twinkle 3s infinite ease-in-out';
    }
}

// Question section functionality
function checkAnswer() {
    const answerInput = document.getElementById('answer');
    const answer = answerInput.value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    const correctIndicator = document.getElementById('correct-indicator');

    if (answer === "my princess") {
        resultDiv.innerHTML = "<img src='assets/photo.jpg' alt='My Princess'>";
        correctIndicator.classList.remove('hidden');
        correctIndicator.style.animation = 'none'; // Reset animation
        void correctIndicator.offsetWidth; // Trigger reflow
        correctIndicator.style.animation = 'popInAndFadeOut 1.5s forwards';
        answerInput.disabled = true; // Disable input after correct answer
        document.querySelector('#question button').disabled = true; // Disable button
    } else {
        resultDiv.textContent = "Try again! Think about who means the most to you.";
    }
}

// Function to smoothly scroll to a section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add click event listeners to nav links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        const targetId = this.getAttribute('href').substring(1); // Get the section ID from the href
        scrollToSection(targetId); // Call the smooth scroll function
    });
});

// Mouse trail hearts
document.addEventListener('mousemove', function(e) {
    const mouseTrail = document.getElementById('mouse-trail');
    const heart = document.createElement('div');
    heart.textContent = '💖'; // Or '✨', '💜', etc.
    heart.className = 'trail-heart';
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    mouseTrail.appendChild(heart);

    // Remove the heart after its animation finishes
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
});

// Memories Section - Displaying images one by one
function showInitialMemory() {
    const memoryGrid = document.querySelector('.memory-grid');
    memoryGrid.innerHTML = ''; // Clear existing images
    if (memoryImages.length > 0) {
        const img = document.createElement('img');
        img.src = memoryImages[currentMemoryIndex];
        img.alt = `Memory ${currentMemoryIndex + 1}`;
        memoryGrid.appendChild(img);
    }
}

document.getElementById('next-memory-btn').addEventListener('click', function() {
    currentMemoryIndex = (currentMemoryIndex + 1) % memoryImages.length;
    const memoryGrid = document.querySelector('.memory-grid');
    memoryGrid.innerHTML = ''; // Clear current image
    const img = document.createElement('img');
    img.src = memoryImages[currentMemoryIndex];
    img.alt = `Memory ${currentMemoryIndex + 1}`;
    img.style.animation = 'bounceIn 0.8s ease-out'; // Apply a new animation for new images
    memoryGrid.appendChild(img);
});

// New animation for memory images when they appear
// Add this to your CSS:
/*
@keyframes bounceIn {
    0% { transform: scale(0.5); opacity: 0; }
    60% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); }
}
*/