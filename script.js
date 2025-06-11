const app = document.getElementById("app");
const video = document.getElementById("bgVideo");
const audio = document.getElementById("meditationSound");
const playButton = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll(".time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600;
let currentTime = duration;
let isPlaying = false;
let timer;

const updateDisplay = () => {
  const mins = Math.floor(currentTime / 60);
  const secs = currentTime % 60;
  timeDisplay.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const togglePlay = () => {
  if (isPlaying) {
    clearInterval(timer);
    audio.pause();
    playButton.textContent = "Play";
  } else {
    timer = setInterval(() => {
      if (currentTime > 0) {
        currentTime--;
        updateDisplay();
      } else {
        clearInterval(timer);
        audio.pause();
        audio.currentTime = 0;
        playButton.textContent = "Play";
        isPlaying = false;
      }
    }, 1000);
    audio.play();
    playButton.textContent = "Pause";
  }
  isPlaying = !isPlaying;
};

playButton.addEventListener("click", togglePlay);

timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    duration = parseInt(button.getAttribute("data-time"));
    currentTime = duration;
    updateDisplay();
  });
});

soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const sound = button.getAttribute("data-sound");
    const vid = button.getAttribute("data-video");
    audio.src = sound;
    video.querySelector("source").src = vid;
    video.load();
    if (isPlaying) {
      audio.play();
    }
  });
});

// Initial Display
updateDisplay();
