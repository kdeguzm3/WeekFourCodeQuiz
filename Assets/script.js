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
    questionInv = shuffleQuestions();
    console.log(questionInv);
}

function shuffleQuestions() {
    questionInv = questions;
    var shuffleItem;
    var shuffleNum;
    for (let i = 0; i < 15; i++) {
        shuffleNum = Math.floor(Math.random() * questionInv.length);
        shuffleItem = questionInv.splice(shuffleNum, 1);
        questionInv = questionInv.concat(shuffleItem);
    }
    questions = questionInv;
    return questionInv;
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