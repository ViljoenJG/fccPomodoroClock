const defaultTimer = 25;
const defaultRest = 5;

let timerMinutes = defaultTimer;
let restMinutes = defaultRest;
let timer = null;

function startTimer() {
    const timerStartTime = Date.now();
    timer = setTimeout(updateTimer, 100, timerStartTime, timerMinutes, true);
}

function startRest() {
    const restStartTime = Date.now();
    timer = setTimeout(updateTimer, 100, restStartTime, restMinutes, false);
}

function updateTimer(startTime, interval, isTimer) {
    let diff = Date.now() - startTime;
    let minutesDiff = Math.ceil(diff / 60000);
    let secondsDiff = Math.ceil((diff % 60000) / 1000);
    
    let minuteVal =  interval - minutesDiff;
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
    
    timer = setTimeout(updateTimer, 100, startTime, interval, isTimer);
}

function resetClock() {
    window.clearTimeout(timer);
    document.getElementById('minutes').innerText = '' + timerMinutes;
    document.getElementById('seconds').innerText = '00';
}