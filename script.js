const mediaList = [
    { type: "video", src: "./Public/video1.mp4" },
    { type: "image", src: "./Public/image1.jpg" },
    { type: "image", src: "./Public/image2.jpg" },
  ];
  
  let index = 0;
  
  const enterBtn = document.getElementById("enterBtn");
  const viewer = document.getElementById("viewer");
  const mediaContainer = document.getElementById("mediaContainer");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const fsBtn = document.getElementById("fsBtn");
  
  enterBtn.onclick = () => {
    viewer.style.display = "flex";
    loadMedia();
  };
  
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
  
      // show all
      prevBtn.style.display = "flex";
      nextBtn.style.display = "flex";
      playPauseBtn.style.background = "#333"; // <= hide only play/pause
      playPauseBtn.style.display = "flex";
      playPauseBtn.style.color = "white"; // <= hide only play/pause
  
    } else {
      element = document.createElement("img");
      element.src = item.src;
  
      // images still show next/prev
      prevBtn.style.display = "flex";
      nextBtn.style.display = "flex";
      playPauseBtn.style.background = "transparent"; // <= hide only play/pause
      playPauseBtn.style.color = "transparent"; // <= hide only play/pause
    }
  
    mediaContainer.appendChild(element);
  }
  
  
  playPauseBtn.onclick = () => {
    const vid = mediaContainer.querySelector("video");
    if (!vid) return;
    if (vid.paused) vid.play(); else vid.pause();
    playPauseBtn.textContent = vid.paused ? "Play" : "Pause";
  };
  
  nextBtn.onclick = () => {
    index = (index + 1) % mediaList.length;
    loadMedia();
  };
  
  prevBtn.onclick = () => {
    index = (index - 1 + mediaList.length) % mediaList.length;
    loadMedia();
  };
  
  // keyboard arrows
  window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") {
      index = (index + 1) % mediaList.length;
      loadMedia();
    }
    if (e.key === "ArrowLeft") {
      index = (index - 1 + mediaList.length) % mediaList.length;
      loadMedia();
    }
  });
  
  // fullscreen toggle
  fsBtn.onclick = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      
    } else {
      await document.exitFullscreen();
    }
    fsBtn.textContent = "⛶";
  };
  