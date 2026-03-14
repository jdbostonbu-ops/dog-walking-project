
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


if (audio) { audio.preservesPitch = false; }

const text = "Pawsibilities!";


textContainer.innerHTML = ""; 


text.split("").forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter === " " ? "\u00A0" : letter; 

    span.addEventListener("mouseenter", () => {
        showOverlay();

        
        const randomColor = `hsl(${Math.random() * 360}, 70%, 60%)`; 
        span.style.color = randomColor;
        span.classList.add("pop");

       
        if (audio) {
           
            const pitchScale = 1.0 + (index * 0.05);
            audio.playbackRate = pitchScale; 
            audio.currentTime = 0;
            audio.play().catch(() => console.log("Click page to enable sound"));
        }
    });

    span.addEventListener("mouseleave", () => {
        hideOverlay();
        span.style.color = ""; 
        span.classList.remove("pop");
    });

    textContainer.appendChild(span);
});





/*.   TEST.   */














