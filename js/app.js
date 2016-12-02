const defaultMinutes = 25;
const defaultSeconds = 0;

let minutes = defaultMinutes;
let startTime = null;
let timer = null;

function startTimer() {
    startTime = Date.now();
    timer = setTimeout(updateTimer, 100)
}

function updateTimer() {
    let diff = Date.now() - startTime;
    let minutesDiff = Math.ceil(diff / 60000);
    let secondsDiff = Math.ceil((diff % 60000) / 1000);
    
    let minuteVal =  minutes - minutesDiff;
    let secondsVal = (60 - secondsDiff < 10) 
        ? '0' + (60 - secondsDiff) : 60 - secondsDiff;
    
    if (minuteVal <= 0) {
        minuteVal = '00';
    }
    
    if (secondsVal <= 0) {
        secondsVal = '00';
    }
    
    document.getElementById('minutes').innerText = minuteVal;
    document.getElementById('seconds').innerText = secondsVal;
    
    timer = setTimeout(updateTimer, 100);
}

function resetClock() {
    window.clearTimeout(timer);
    document.getElementById('minutes').innerText = minutes;    
    document.getElementById('seconds').innerText = '00';
}