const defaultTimer = 25;
const defaultRest = 5;

let timerMinutes = defaultTimer;
let restMinutes = defaultRest;
let timer = null;

function startTimer() {
    const timerStartTime = Date.now();
    timer = setTimeout(updateTimer, 100, timerStartTime, true);
}

function startRest() {
    const restStartTime = Date.now();
    timer = setTimeout(updateTimer, 100, restStartTime, false);
}

function resetClock() {
    window.clearTimeout(timer);
    timerMinutes = defaultTimer;
    restMinutes = defaultRest;

    document.getElementById('minutes').innerText = '' + defaultTimer;
    document.getElementById('seconds').innerText = '00';
    document.getElementById('time').innerText = '' + timerMinutes;
    document.getElementById('rest').innerText = '' + restMinutes;
}

function updateTimer(startTime, isTimer) {
    let diff = Date.now() - startTime;
    let minutesDiff = Math.ceil(diff / 60000);
    let secondsDiff = Math.ceil((diff % 60000) / 1000);

    let minuteVal = (isTimer)
        ? timerMinutes - minutesDiff : restMinutes - minutesDiff;

    let secondsVal = (60 - secondsDiff < 10)
        ? '0' + (60 - secondsDiff) : 60 - secondsDiff;

    minuteVal = (minuteVal <= 0) ? minuteVal = '00' : minuteVal;
    secondsVal = (secondsVal <= 0) ? secondsVal = '00' : secondsVal;

    document.getElementById('minutes').innerText = '' + minuteVal;
    document.getElementById('seconds').innerText = '' + secondsVal;

    if (minuteVal == '00' && secondsVal == '00') {
        if (isTimer) {
            startRest();
        } else {
            startTimer();
        }

        return;
    }

    timer = setTimeout(updateTimer, 100, startTime, isTimer);
}

function changeTimer(val) {
    timerMinutes += val;
    document.getElementById('time').innerText = '' + timerMinutes;
}

function changeRest(val) {
    restMinutes += val;
    document.getElementById('rest').innerText = '' + restMinutes;
}