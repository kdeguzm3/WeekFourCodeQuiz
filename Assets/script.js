//Variables
let questionInv = [];
let time = questions.length * 15;
let timer;

//DOM handlers
let questionDiv = document.querySelector("#questionBox");
let timerDiv = document.querySelector("#timer");
let choicesDiv = document.querySelector("#choicesBox");
let startBtn = document.querySelector("#startBtn");
let highscoreBtn = document.querySelector("#highscoreBtn");

//sfx
let sfxRight = new Audio("Assets/sfx/correct.wav");
let sfxWrong = new Audio("Assets/sfx/incorrect.wav");

//quiz script
function quiz(){
    startBtn.classList.add("hide");
    startTimer();


}

function startTimer() {
    timer = setInterval(timerFn, 1000);
}

function timerFn() {
    time--;
    timerDiv.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function quizEnd() {
    clearInterval(timer);
}