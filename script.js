

function showOverlay() {
    const overlay = document.getElementById("overlayImage");
    if (overlay) overlay.style.display = "block";
}

function hideOverlay() {
    const overlay = document.getElementById("overlayImage");
    if (overlay) overlay.style.display = "none";
}

const textContainer = document.getElementById("animated-text");
const audio = document.getElementById("hoverSound");

if (audio) { 
    audio.preservesPitch = false; 
}

const text = "Our Prices!";
textContainer.innerHTML = ""; 

text.split("").forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter === " " ? "\u00A0" : letter; 

    // Helper function to trigger the "On" state
    const handleActive = () => {
        showOverlay();
        const randomColor = `hsl(${Math.random() * 360}, 70%, 60%)`; 
        span.style.color = randomColor;
        span.classList.add("pop");

        if (audio) {
            const pitchScale = 1.0 + (index * 0.05);
            audio.playbackRate = pitchScale; 
            audio.currentTime = 0;
            audio.play().catch(() => console.log("Interaction required for audio"));
        }
    };

    // Helper function to trigger the "Off" state
    const handleInactive = () => {
        hideOverlay();
        span.style.color = ""; 
        span.classList.remove("pop");
    };

    /**
     * DESKTOP EVENTS
     */
    span.addEventListener("mouseenter", handleActive);
    span.addEventListener("mouseleave", handleInactive);

    /**
     * MOBILE & IPAD EVENTS
     * We use 'touchstart' to trigger immediately.
     * Since there is no 'hover leave' on touch, we use a timer 
     * to reset the letter after a brief moment.
     */
    span.addEventListener("touchstart", (e) => {
        // Prevents the browser from triggering a simulated mouse event
        handleActive();
        
        // Reset the animation after 600ms so it doesn't stay colored
        setTimeout(() => {
            handleInactive();
        }, 600);
    }, { passive: true });

    textContainer.appendChild(span);
});

// LISTENING TO MY <TEMPLATE> //
document.addEventListener("DOMContentLoaded", () => {
    
    // Keeping your check (or forcing 'true' for testing)
    const isIphone = /iPhone|iPod/.test(navigator.userAgent);

    if (true) { // Set to 'true' to test on your computer first!
        const template = document.getElementById('iphone-warning-template');
        
        // FIX: Use document.importNode directly
        const clone = document.importNode(template.content, true); 
        
        document.body.appendChild(clone);
    }
});

function closeWarning() {
    const overlay = document.querySelector('.mobile-overlay');
    if (overlay) overlay.remove();
}


