//Variables
let questionInv = [];
let questionIndex = 0;
let score = 0;
let answer;
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
function startQuiz(){
    startBtn.classList.add("hide");
    startTimer();
    questionInv = shuffleQuestions();
    time = questions.length * 15;
    questionIndex = 0;
    score = 0;
    buildQuestion();
    
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
    clearInterval(timer);
    timer = setInterval(timerFn, 1000);
}

function timerFn() {
    time--;
    timerDiv.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function buildQuestion() {
    let newQuestion = document.createElement("h1");
    answer = questions[questionIndex].answer;
    newQuestion.textContent = questions[questionIndex].title;
    newQuestion.classList.add("question");
    questionDiv.innerHTML = "";
    choicesDiv.innerHTML = "";
    questionDiv.appendChild(newQuestion);
    let choiceArray = questions[questionIndex].choices;
    choiceArray.forEach(element => {
        let newChoice = document.createElement("div");
        newChoice.classList.add("choice");
        newChoice.setAttribute("data", element);
        newChoice.textContent = element;
        choicesDiv.appendChild(newChoice);
    })
    console.log(choiceArray);
}

startBtn.addEventListener("click", () => {startQuiz();});   

choicesDiv.addEventListener("click", (e) => {
    if(e.target.classList.contains("choice")){
        if (e.target.getAttribute("data") == answer){
            sfxRight.play();
            score++;
            console.log("correct");
        } else {
            sfxWrong.play();
            time = time - 15;
        }
    }
    questionIndex++;
    if (questionIndex == questions.length) {
        quizEnd();
    }
    else {
        buildQuestion();
    }
})

function quizEnd() {
    questionDiv.innerHTML = "";
    choicesDiv.innerHTML = "";
    startBtn.classList.remove("hide");
    clearInterval(timer);
}