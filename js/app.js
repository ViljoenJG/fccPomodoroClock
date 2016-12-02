const DEFAULT_TIMER = 25;
const DEFAULT_REST = 5;
const RUNNING_INTERVAL = 100;
const MILLIS_PER_HOUR = (1000*60*60);
const MILLIS_PER_MINUTE = (1000*60);
const MILLIS_PER_SECOND = 1000;

let timerMinutes = DEFAULT_TIMER;
let restMinutes = DEFAULT_REST;
let timer = null;
let isTimer = true;
let isRunning = false;
let timeLeft = null;

function toggle() {
    if (isRunning) {
        window.clearInterval(timer);
        isRunning = false;
    } else {
        isRunning = true;

        if (isTimer) {
            startTimer(true, timerMinutes);
        } else {
            startTimer(false, restMinutes);
        }
    }
}

function startTimer(timerMode, time) {
    timeLeft = (timeLeft !== null) ? timeLeft : time * 60000;
    document.getElementById('timerName').innerText = (timerMode) ? 'Timer' : 'Rest';
    timer = setInterval(updateTimer, RUNNING_INTERVAL);
}

function resetClock() {
    isTimer = true;
    timeLeft = null;
    window.clearTimeout(timer);
    document.getElementById('timeLeft').innerText = timerMinutes + '-' + restMinutes;
    document.getElementById('timerName').innerText = 'Timer';
}

function resetDefaults() {
    isTimer = true;
    timeLeft = null;
    window.clearTimeout(timer);
    timerMinutes = DEFAULT_TIMER;
    restMinutes = DEFAULT_REST;

    document.getElementById('timeLeft').innerText = DEFAULT_TIMER + '-' + DEFAULT_REST;
    document.getElementById('time').innerText = '' + timerMinutes;
    document.getElementById('rest').innerText = '' + restMinutes;
    document.getElementById('timerName').innerText = 'Timer';
}

function updateTimer() {
    timeLeft -= RUNNING_INTERVAL;

    if (timeLeft <= 0) {
        window.clearTimeout(timer);
        timeLeft = null;
        isTimer = !isTimer;

        if (isTimer) {
            startTimer(true, timerMinutes);
        } else {
            startTimer(false, restMinutes);
        }

        return;
    }

    document.getElementById('timeLeft').innerText = getTimeFromMillis(timeLeft);
}

function getTimeFromMillis(millis) {
    let hours, minutes, seconds = null;
    let time = '';

    hours = (millis >= MILLIS_PER_HOUR)
        ? Math.floor(millis / MILLIS_PER_HOUR)
        : null;

    minutes = (millis >= MILLIS_PER_MINUTE)
        ? Math.floor((millis % MILLIS_PER_HOUR) / MILLIS_PER_MINUTE)
        : null;

    seconds = (millis >= MILLIS_PER_SECOND)
        ? Math.floor((millis % MILLIS_PER_MINUTE) / MILLIS_PER_SECOND)
        : null;

    time += (hours !== null) ? hours + ':' : '';

    time += (minutes !== null)
        ? (hours !== null && minutes < 10) ? '0' + minutes + ':' : minutes + ':'
        : '0:';

    time += (seconds !== null)
        ? (seconds < 10) ? '0' + seconds : seconds
        : '00';

    return time;
}

function changeTimer(val) {
    if (val < 0 && timerMinutes == 1) {
        return;
    }

    timerMinutes += val;
    document.getElementById('time').innerText = '' + timerMinutes;

    if (isTimer && timeLeft !== null && timeLeft > 0) {
        timeLeft += val * 60000;
    } else if (timeLeft == null) {
        document.getElementById('timeLeft').innerText = timerMinutes + '-' + restMinutes;
    }
}

function changeRest(val) {
    if (val < 0 && restMinutes == 1) {
        return;
    }

    restMinutes += val;
    document.getElementById('rest').innerText = '' + restMinutes;

    if (!isTimer && timeLeft !== null && timeLeft > 0) {
        timeLeft += val * 60000;
    } else if (timeLeft == null) {
        document.getElementById('timeLeft').innerText = timerMinutes + '-' + restMinutes;
    }
}