const app = document.getElementById("app");
const video = document.querySelector(".video");
const audio = document.querySelector(".audio");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let fakeDuration = 600; // default 10 mins
let isPlaying = false;

// Update time display
function updateTimeDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Play/Pause toggle
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    video.play();
    playBtn.textContent = "Pause";
    isPlaying = true;
  } else {
    audio.pause();
    video.pause();
    playBtn.textContent = "Play";
    isPlaying = false;
  }
});

// Time select buttons
timeButtons.forEach(button => {
  button.addEventListener("click", function () {
    fakeDuration = this.getAttribute("data-time");
    updateTimeDisplay(fakeDuration);
  });
});

// Sound & Video picker
soundButtons.forEach(button => {
  button.addEventListener("click", function () {
    const sound = this.getAttribute("data-sound");
    const vid = this.getAttribute("data-video");

    audio.src = sound;
    video.src = vid;

    // Restart playing
    if (isPlaying) {
      audio.play();
      video.play();
    }
  });
});

// Time tracking
audio.ontimeupdate = () => {
  let currentTime = audio.currentTime;
  let remainingTime = fakeDuration - currentTime;
  updateTimeDisplay(remainingTime);

  if (currentTime >= fakeDuration) {
    audio.pause();
    video.pause();
    audio.currentTime = 0;
    video.currentTime = 0;
    playBtn.textContent = "Play";
    isPlaying = false;
  }
};

// Set initial time display
updateTimeDisplay(fakeDuration);
