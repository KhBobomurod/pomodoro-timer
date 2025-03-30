const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const alarm = document.getElementById("alarm");
const tick = document.getElementById("tick"); // Yangi "chiq chiq" ovozi

let minutes = 25;
let seconds = 0;
let isRunning = false;
let isWorkMode = true;
let interval;

function updateDisplay() {
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startBtn.textContent = "Pauza";
    interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          isRunning = false;
          startBtn.textContent = "Boshlash";
          alarm.play(); // Vaqt tugaganda ovoz
          switchMode();
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      tick.currentTime = 0; // Ovozni har soniyada boshidan o‘ynatish
      tick.play(); // Har soniyada "chiq chiq" ovozi
      updateDisplay();
    }, 1000);
  } else {
    clearInterval(interval);
    isRunning = false;
    startBtn.textContent = "Boshlash";
  }
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  startBtn.textContent = "Boshlash";
  isWorkMode = true;
  minutes = 25;
  seconds = 0;
  updateDisplay();
}

function switchMode() {
  if (isWorkMode) {
    isWorkMode = false;
    minutes = 5; // 5 daqiqa dam olish
    seconds = 0;
  } else {
    isWorkMode = true;
    minutes = 25; // 25 daqiqa ish
    seconds = 0;
  }
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
