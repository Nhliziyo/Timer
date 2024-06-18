const display = document.getElementById("display");
let timeLeft;
let elapsedTime = 0;
let timer = null;
let isRunning = false;

function start() {
    const startTime = document.getElementById("time-given").value;
    timeLeft = toTime(startTime) - elapsedTime;
    if (!isRunning && timeLeft !== NaN) {
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = "00:00:00:00";
}

function update() {
    try {
        timeLeft -= 10;
        elapsedTime += 10;

        if (timeLeft < 0) {
            clearInterval(timer);
            isRunning = false;
        }else{
            const hours = String(Math.floor(timeLeft/(1000*60*60) % 24)).padStart(2, "0");
            const minutes = String(Math.floor(timeLeft/(1000*60) % 60)).padStart(2, "0");
            const seconds = String(Math.floor(timeLeft/(1000) % 60)).padStart(2, "0");
            const miliseconds = String(Math.floor(timeLeft%1000 / 10)).padStart(2, "0");

            display.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;
        }

    } catch (error) {
        alert("something went wrong");
    }
    
    
}

function toTime(stringTime) {
    try {
        const [hours, minutes, seconds] = stringTime.split(":").map(Number);
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            throw new Error("Invalid time format");
        }
        return (hours * 3600 + minutes * 60 + seconds) * 1000; // Converted to milliseconds
    } catch (error) {
        alert("give input in correct format");
        return NaN;
    }
}