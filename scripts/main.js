// Create a dynamic scrolling gradient background for the hero section
const heroSection = document.querySelector('.hero');
let gradientPosition = 0;

function updateGradient() {
    gradientPosition += 0.9; // Gradient speed
    heroSection.style.background = `linear-gradient(${gradientPosition}deg, #ff007f, #8000ff)`;
    requestAnimationFrame(updateGradient);
}

// Start gradient
updateGradient();
