const settingsButton = document.querySelector('#settings');
const settings = document.querySelector('#settings-container');
const dark = document.querySelector('#dark');

function toggleVisibility() {
    for (let i = 0; i < arguments.length; i++) {
        (arguments[i].style.display === 'none' || !(arguments[i].style.display)) ? (arguments[i].style.display = 'block') : (arguments[i].style.display = 'none');
    }    
}

function updateDisplay() {
    let seconds = timeLeft;

    const title = document.querySelector('title');
    const time = document.querySelector('#time');

    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    const timeDisplayed = `${minutes}:${seconds}`

    title.textContent = timeDisplayed;

    if (timeLeft === baseTime) {
        title.textContent = 'Pomodoro Timer';
    }

    time.textContent = timeDisplayed;
}

let baseTime = 1500;
let timeLeft = 1500;
let timerMode = 0;

let timerRunning = null;

function tick() {
    if (timeLeft === 0) {
        completePomodoro();
        return;
    }
    timeLeft--;
    updateDisplay();
}

function startTimer() {
    if (timeLeft === 0) {
        resetTimer();
    }

    if (timerMode === 2) {
        const pomodoroChecks = document.querySelectorAll('div#pomodoro-tracker>span');
        pomodoroChecks.forEach((pomodoro) => pomodoro.textContent = '⚪');
    }
    
    timerRunning = window.setInterval(tick, 1000);
}

function stopTimer() {
    const title = document.querySelector('title');
    title.textContent += ' ==Timer Paused==';
    clearInterval(timerRunning);
}

function resetTimer() {
    timeLeft = baseTime;
    updateDisplay();
    clearInterval(timerRunning);

    const title = document.querySelector('title');
    title.textContent = 'Pomodoro Timer';
}

let pomodorosDone = 0;

function timerComplete() {
    clearInterval(timerRunning);

    const title = document.querySelector('title');
    title.textContent = "Time's up!";

    completePomodoro();
}

function completePomodoro() {
    if (timerMode !== 0) {
        return;
    }

    pomodorosDone++;
    if (pomodorosDone > 4) {
        pomodorosDone = 1;
    }
    const pomodoroCheck = document.querySelector(`#pomodoro-${pomodorosDone}`);
    pomodoroCheck.textContent = '🍅';
}

function changeToPomodoro() {
    timerMode = 0;
    baseTime = 1500;
    resetTimer();
    updateDisplay();
}

function changeToLong() {
    timerMode = 2;
    baseTime = 900;
    resetTimer();
    updateDisplay();
}

function changeToShort() {
    timerMode = 1;
    baseTime = 300;
    resetTimer();
    updateDisplay();
}