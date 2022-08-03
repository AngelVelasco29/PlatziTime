//obtencion de los spans
const minutes = document.querySelector("#chronometer-minutes");
const seconds = document.querySelector("#chronometer-seconds");
const timerMinutes = document.querySelector("#timer-minutes");
const timerSeconds = document.querySelector("#timer-seconds");
const pomodoroMinutes = document.querySelector("#pomodoro-minutes");
const pomodoroSeconds = document.querySelector("#pomodoro-seconds");


//obtencion de las secciones
const chronometer = document.querySelector("#chronometer");
const timer = document.querySelector("#timer");
const pomodoro = document.querySelector("#pomodoro");

//variables iniciales
let secondsValue = 0;
let minutesValue = 0;
let currentChronometer;
let currentPomodoro;
let currentTimer;
let currentButton;
let i = 0;
const pomodoroTime = [{
    "texto": "Tiempo de Trabajar",
    "minutes": 25,
    "seconds": 0,
},
{
    "texto": "Descansar",
    "minutes": 5,
    "seconds": 0,
},
{
    "texto": "Tiempo de Trabajar",
    "minutes": 25,
    "seconds": 0,
},
{
    "texto": "Descansar",
    "minutes": 5,
    "seconds": 0,
},
{
    "texto": "Tiempo de Trabajar",
    "minutes": 25,
    "seconds": 0,
},
{
    "texto": "Descansar",
    "minutes": 30,
    "seconds": 0,
},
];

//barras de carga
const progresBar = document.querySelector(".progres-bar");
const pomodoroProgresBar = document.querySelector(".pomodoro-progres-bar");

// inputs del Timer
const inputMinutes = document.querySelector("#input-minutes");
const inputSeconds = document.querySelector("#input-seconds");

// mensajes
const timerEnd = document.querySelector(".display-timer-end");
const alertPomodoro = document.querySelector(".alert-pomodoro");

function startChronometer() {
    currentButton = event.target;
    currentButton.disabled = true;

    currentChronometer = setInterval(() => {
        secondsValue += 1;
        if (secondsValue === 60) {
            secondsValue = 0;
            minutesValue += 1;
            minutes.textContent = formatValue(minutesValue);
        }
        seconds.textContent = formatValue(secondsValue);
    }, 1000)
}

function stopChronometer() {
    if (currentButton) {
        currentButton.disabled = false
        clearInterval(currentChronometer);
    }
    if (currentTimer) {
        clearInterval(currentTimer);
    }
    if (currentPomodoro) {
        clearInterval(currentPomodoro);
    }
}

function resetChronometer() {
    secondsValue = 0;
    minutesValue = 0;
    seconds.textContent = "00";
    minutes.textContent = "00";
    timerSeconds.textContent = "00";
    timerMinutes.textContent = "00";
}


function formatValue(value) {
    return ("0" + value).slice(-2);
}

function executeChronometer() {
    chronometer.classList.remove("display-section");
    timer.classList.add("display-section");
    pomodoro.classList.add("display-section");
    stopChronometer();
    resetChronometer();
}

function executeTimer() {
    chronometer.classList.add("display-section");
    timer.classList.remove("display-section");
    pomodoro.classList.add("display-section");
    timerEnd.classList.add("display-timer-end");
    stopChronometer();
    resetChronometer();
}

function executePomodoro() {
    chronometer.classList.add("display-section");
    timer.classList.add("display-section");
    pomodoro.classList.remove("display-section");
    pomodoroMinutes.textContent = formatValue(pomodoroTime[0].minutes);
    pomodoroSeconds.textContent = formatValue(pomodoroTime[0].seconds);
    i = 0;
    stopChronometer();
    resetChronometer();
}

function loadingBar() {
    return 100 / (minutesValue * 60 + secondsValue * 1);
}

function timeDown(minutes, seconds){
    secondsValue -= 1;
    if (secondsValue === -1) {
        secondsValue = 59;
        minutesValue -= 1;
        minutes.textContent = formatValue(minutesValue);
    }
    seconds.textContent = formatValue(secondsValue);
}

function startTimer() {
    let totalprogres = 0;
    timerEnd.classList.add("display-timer-end");
    minutesValue = inputMinutes.value;
    secondsValue = inputSeconds.value;
    bar = loadingBar()
    timerMinutes.textContent = formatValue(minutesValue);
    timerSeconds.textContent = formatValue(secondsValue);

    currentTimer = setInterval(() => {
        timeDown(timerMinutes,timerSeconds);
        totalprogres += bar;
        progresBar.setAttribute("style", "width:" + parseInt(totalprogres) + "%");
        if (secondsValue === 0 && minutesValue == 0) {
            clearInterval(currentTimer);
            timerEnd.classList.remove("display-timer-end");
            progresBar.setAttribute("style", "width:100%");
        }
    }, 1000)

}

pomodoroMinutes.textContent = formatValue(pomodoroTime[0].minutes);
pomodoroSeconds.textContent = formatValue(pomodoroTime[0].seconds);

function startPomodoro(i = 0) {
    let totalprogres = 0;
    alertPomodoro.textContent = pomodoroTime[i].texto;
    minutesValue = pomodoroTime[i].minutes;
    secondsValue = pomodoroTime[i].seconds;
    pomodoroMinutes.textContent = formatValue(minutesValue);
    pomodoroSeconds.textContent = formatValue(secondsValue);
    bar = loadingBar();
    currentPomodoro = setInterval(() => {
        timeDown(pomodoroMinutes,pomodoroSeconds);
        totalprogres += bar;
        pomodoroProgresBar.setAttribute("style", "width:" + parseInt(totalprogres) + "%");
        if (secondsValue === 0 && minutesValue == 0) {
            clearInterval(currentPomodoro);
            pomodoroProgresBar.setAttribute("style", "width:100%");
            i++;
            if (i < pomodoroTime.length) {
                startPomodoro(i);
            } else {
                i = 0;
            }
        }
    }, 1000)
}