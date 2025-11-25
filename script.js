let mediaList = [];
let index = 0;
let hideTimeout;

const enterBtn = document.getElementById("enterBtn");
const viewer = document.getElementById("viewer");
const mediaContainer = document.getElementById("mediaContainer");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const fsBtn = document.getElementById("fsBtn");
const controls = document.getElementById("controls");

// Load JSON dynamically
fetch("./Public/media.json")
    .then(res => res.json())
    .then(data => {
        mediaList = data.files.map(name => {
            const lower = name.toLowerCase();
            const isVideo = lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.endsWith(".mov");
            return {
                type: isVideo ? "video" : "image",
                src: "./Public/" + name
            };
        });
    });

enterBtn.onclick = () => {
    viewer.style.display = "flex";
    loadMedia();
    startHideTimer();
};

// -----------------------
// Load media
function loadMedia() {
    mediaContainer.innerHTML = "";
    const item = mediaList[index];
    let element;

    if (item.type === "video") {
        element = document.createElement("video");
        element.src = item.src;
        element.controls = false;
        element.autoplay = true;
        element.play();

        prevBtn.style.display = "flex";
        nextBtn.style.display = "flex";
        playPauseBtn.style.display = "flex";
        playPauseBtn.style.background = "#333";
        playPauseBtn.style.color = "white";
        playPauseBtn.textContent = "Pause";

    } else {
        element = document.createElement("img");
        element.src = item.src;

        prevBtn.style.display = "flex";
        nextBtn.style.display = "flex";
        playPauseBtn.style.background = "transparent";
        playPauseBtn.style.color = "transparent";
        playPauseBtn.textContent = "";
    }

    mediaContainer.appendChild(element);

    showControls(); // reset hide timer
}

// -----------------------
// Play/Pause button
playPauseBtn.onclick = () => {
    const vid = mediaContainer.querySelector("video");
    if (!vid) return;
    if (vid.paused) vid.play(); else vid.pause();
    playPauseBtn.textContent = vid.paused ? "Play" : "Pause";
    showControls();
};

// -----------------------
// Next / Prev
nextBtn.onclick = () => { index = (index + 1) % mediaList.length; loadMedia(); };
prevBtn.onclick = () => { index = (index - 1 + mediaList.length) % mediaList.length; loadMedia(); };

// -----------------------
// Keyboard arrows
window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { index = (index + 1) % mediaList.length; loadMedia(); }
    if (e.key === "ArrowLeft") { index = (index - 1 + mediaList.length) % mediaList.length; loadMedia(); }
});

// -----------------------
// Fullscreen toggle
fsBtn.onclick = async () => {
    if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
    } else {
        await document.exitFullscreen();
    }
    fsBtn.textContent = "⛶";
    showControls();
};

// -----------------------
// Controls hide/show logic
function startHideTimer() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        controls.classList.add("hide");
        fsBtn.classList.add("hide");
    }, 2000);
}

function showControls() {
    controls.classList.remove("hide");
    fsBtn.classList.remove("hide");
    startHideTimer();
}

// -----------------------
// Show controls when screen clicked
viewer.addEventListener("click", () => {
    showControls();
});
