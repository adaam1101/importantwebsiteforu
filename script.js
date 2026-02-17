/*
 * script.js
 *
 * This script adds interactivity to the reconnect page. It handles the
 * behaviour of the Yes and No buttons, reveals the appropriate sections,
 * spawns animated hearts when 'No' is clicked, and ensures the
 * background music starts at a gentle volume. All event listeners are
 * attached after the DOM is ready.
 */

document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const backBtn = document.getElementById('back-btn');
    const messageSection = document.getElementById('message-section');
    const yesSection = document.getElementById('yes-section');
    const noMessage = document.getElementById('no-message');
    const heartContainer = document.querySelector('.heart-container');
    const audio = document.getElementById('background-music');
    const rainContainer = document.getElementById('heart-rain');
    const overlayMessage = document.getElementById('overlay-message');

    // Set a gentle starting volume so the music isn't jarring
    if (audio) {
        audio.volume = 0.3;
    }

    /**
     * Generates a random pastel colour for the falling hearts. Providing
     * variety makes the rain look more whimsical.
     */
    function randomPastelColor() {
        const colours = ['#ff9fb7', '#f8b5e9', '#ffd2e6', '#f4a5cf', '#deaaf5', '#e6c6fa'];
        return colours[Math.floor(Math.random() * colours.length)];
    }

    /**
     * Spawns a heart that falls from the top of the screen to the bottom.
     * Hearts are appended to the rain container and removed after the
     * animation duration expires to avoid memory leaks.
     */
    function spawnRainingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        // Random size between 12 and 30 pixels
        const size = Math.floor(Math.random() * 18) + 12;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        // Random horizontal starting position
        heart.style.left = `${Math.random() * 100}vw`;
        // Random duration so hearts fall at different speeds (4–8 seconds)
        const duration = 4 + Math.random() * 4;
        heart.style.animationDuration = `${duration}s`;
        // Random delay so hearts don't all start together
        const delay = Math.random() * 4;
        heart.style.animationDelay = `${delay}s`;
        // Assign random pastel background colour
        heart.style.backgroundColor = randomPastelColor();
        rainContainer.appendChild(heart);
        // Remove after fall completes (duration + delay)
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    }

    // Start spawning raining hearts continuously
    setInterval(spawnRainingHeart, 600);

    /**
     * Creates a heart element at a random horizontal position and size
     * and appends it to the heart container. Hearts float upward and
     * disappear after their animation ends.
     */
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        // Random size between 15 and 30px
        const size = Math.floor(Math.random() * 15) + 15;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        // Random horizontal position within the container
        const containerWidth = heartContainer.clientWidth || 300;
        const leftPos = Math.random() * (containerWidth - size);
        heart.style.left = `${leftPos}px`;
        // Append and remove after animation ends (3s)
        heartContainer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }

    // Show the heartfelt message when 'Yes' is clicked
    yesBtn.addEventListener('click', () => {
        messageSection.classList.add('hidden');
        yesSection.classList.remove('hidden');
        // Hide any "No" message when switching to the yes section
        noMessage.classList.add('hidden');
    });

    // Reveal the playful message and spawn a heart when 'No' is clicked
    noBtn.addEventListener('click', () => {
        // Show overlay message to make the rejection playful and prominent
        overlayMessage.classList.remove('hidden');
        // Also create a small heart rising near the buttons to add cuteness
        createHeart();
        // Hide the overlay after a short delay so the user can try again
        setTimeout(() => {
            overlayMessage.classList.add('hidden');
        }, 2500);
    });

    // Go back to the main question from the yes section
    backBtn.addEventListener('click', () => {
        yesSection.classList.add('hidden');
        messageSection.classList.remove('hidden');
    });
});