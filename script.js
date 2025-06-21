const video = document.getElementById("bg-video");
const audio = document.getElementById("meditation-audio");
const timerDisplay = document.querySelector(".time-display");
const playBtn = document.querySelector(".play");

let countdown;
let isPlaying = false;

const modes = {
  beach: {
    videoSrc: "Sounds/beach.mp4",
    audioSrc: "Sounds/beach.mp3",
  },
  rain: {
    videoSrc: "Sounds/rain.mp4",
    audioSrc: "Sounds/rain.mp3",
  },
};

let currentMode = "beach";
let totalDuration = 10 * 60 * 1000; // Default 10 mins

function switchMode(mode) {
  currentMode = mode;
  video.src = modes[mode].videoSrc;
  audio.src = modes[mode].audioSrc;
  audio.load();
  audio.play();
  isPlaying = true;
}

function startMeditation(minutes) {
  clearInterval(countdown);
  totalDuration = minutes * 60 * 1000;
  const now = Date.now();
  const end = now + totalDuration;

  updateTimerDisplay(minutes * 60);
  audio.play();
  isPlaying = true;

  countdown = setInterval(() => {
    const remaining = Math.round((end - Date.now()) / 1000);
    if (remaining <= 0) {
      clearInterval(countdown);
      updateTimerDisplay(0);
      audio.pause();
      isPlaying = false;
      return;
    }
    updateTimerDisplay(remaining);
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  timerDisplay.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function togglePlay() {
  if (!isPlaying) {
    audio.play();
    video.play();
    isPlaying = true;
  } else {
    audio.pause();
    video.pause();
    isPlaying = false;
  }
}

// Initialize
switchMode("beach");
updateTimerDisplay(600); // 10 mins default
