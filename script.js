let timer;
let timeLeft = 0;
let isRunning = false;
let isPaused = false;
let currentSession = "work";
let pomodorosCompleted = 0;

const timerDisplay = document.getElementById("timer");
const sessionType = document.getElementById("session-type");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const notificationSound = document.getElementById("notification-sound");

const workDurationInput = document.getElementById("work-duration");
const shortBreakInput = document.getElementById("short-break");
const longBreakInput = document.getElementById("long-break");
const pomodorosBeforeLongBreakInput = document.getElementById("pomodoros-before-long-break");

function startTimer() {
  if (!isRunning) {
    if (isPaused) {
      isPaused = false;
    } else {
      timeLeft = getSessionDuration(currentSession) * 60;
    }
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    isPaused = true;
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isPaused = false;
  currentSession = "work";
  pomodorosCompleted = 0;
  timeLeft = getSessionDuration(currentSession) * 60;
  updateDisplay();
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(timer);
    isRunning = false;
    notificationSound.play();
    switchSession();
  }
}

function switchSession() {
  if (currentSession === "work") {
    pomodorosCompleted++;
    if (pomodorosCompleted % pomodorosBeforeLongBreakInput.value === 0) {
      currentSession = "long-break";
    } else {
      currentSession = "short-break";
    }
  } else {
    currentSession = "work";
  }
  timeLeft = getSessionDuration(currentSession) * 60;
  updateDisplay();
  startTimer();
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  sessionType.textContent = currentSession === "work" ? "Work Session" : currentSession === "short-break" ? "Short Break" : "Long Break";
}

function getSessionDuration(session) {
  switch (session) {
    case "work":
      return parseInt(workDurationInput.value);
    case "short-break":
      return parseInt(shortBreakInput.value);
    case "long-break":
      return parseInt(longBreakInput.value);
    default:
      return 25;
  }
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initialize timer display
resetTimer();