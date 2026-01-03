const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const workModeBtn = document.querySelector(".work");
const breakModeBtn = document.querySelector(".break");
const historyLog = document.getElementById("historyLog");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const timerState = {
  timeLeft: 1500,
  isRunning: false,
  mode: "work",
  intervalId: null
};

let sessionHistory = [];

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timerState.timeLeft);
}

function startTimer() {
  if (timerState.isRunning) return;
  if (timerState.timeLeft == 0) return;

  timerState.isRunning = true;
  timerState.intervalId = setInterval(() => {
    if(timerState.timeLeft >= 0) timerState.timeLeft--;

    if (timerState.timeLeft <= 0) {
      clearInterval(timerState.intervalId);
      timerState.isRunning = false;

      if (timerState.timeLeft == 0 && timerState.mode === "work") {
        sessionHistory.push("🍅");
        clearHistoryBtn.removeAttribute("hidden");
        renderHistory();
        }
    }

    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerState.intervalId);
  timerState.isRunning = false;
}

function resetTimer() {
  pauseTimer();
  timerState.timeLeft = timerState.mode === "work" ? 1500 : 300;
  updateDisplay();
}

const clearHistory = () => {
    sessionHistory = [];
    renderHistory()
    clearHistoryBtn.setAttribute("hidden", "");
}

function switchMode(mode) {
  timerState.mode = mode;
  resetTimer();

  workModeBtn.classList.toggle("active", mode === "work");
  breakModeBtn.classList.toggle("active", mode === "break");
}

function renderHistory() {
  historyLog.textContent = sessionHistory.join(" ");
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
clearHistoryBtn.addEventListener("click", clearHistory);

workModeBtn.addEventListener("click", () => switchMode("work"));
breakModeBtn.addEventListener("click", () => switchMode("break"));
