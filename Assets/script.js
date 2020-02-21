//Variables
let questionInv = [];
let questionIndex = 0;
let score = 0;
let answer;
let userName;
let time = questions.length * 15;
let timer;

//DOM handlers
let questionDiv = document.querySelector("#questionBox");
let timerDiv = document.querySelector("#timer");
let choicesDiv = document.querySelector("#choicesBox");
let startBtn = document.querySelector("#startBtn");
let highscoreBtn = document.querySelector("#highscoreBtn");
let modalDiv = document.querySelector("#modal");
let modalContent = document.querySelector("#modalContent");
let submit = document.createElement("button");

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

}

startBtn.addEventListener("click", () => {startQuiz();});   

choicesDiv.addEventListener("click", (e) => {
    if(e.target.classList.contains("choice")){
        if (e.target.getAttribute("data") == answer){
            sfxRight.play();
            score++;
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
    showResult();
}

function showResult(){
    modalContent.innerHTML = "";
    let congrats = document.createElement("h1");
        congrats.textContent = "Your score is:";
        modalContent.appendChild(congrats);
    let scoreDisplay = document.createElement("h2");
        scoreDisplay.textContent = score;
        modalContent.appendChild(scoreDisplay);
    let label = document.createElement("p");
        label.textContent = "Please enter your initials:";
        modalContent.appendChild(label);
    let textArea = document.createElement("input");
        textArea.setAttribute("type", "text");
        textArea.setAttribute("id", "userInitials");
        textArea.style.color = "black";
        modalContent.appendChild(textArea);
        submit.style.cssText = "align-self: center; background-color: blue; width: 150px;";
        submit.textContent = "Submit";
        modalContent.appendChild(submit);
    modalDiv.style.display = "flex";
}

modalDiv.addEventListener("click", (e) => {
    if (e.target == modalDiv){
        modalDiv.style.display = "none";
    }
});

highscoreBtn.addEventListener("click", (e) => {
    showScores();
})

submit.addEventListener("click", () => {
    userName = document.querySelector("#userInitials").value.trim();
    if (userName != "") {
        storeScore();
        showScores();
    }
})

function storeScore() {
    let highscores = window.localStorage.getItem("highscores");
    if (highscores == null) {
        highscores = [];
        }
        else {
            highscores = JSON.parse(highscores);
        }
    let newScore = {"name": userName, "score": score};
    highscores.push(newScore);
    highscores.sort((a, b) => {return b.score - a.score});
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
}

function showScores() {
    modalContent.innerHTML = "";
    let x;
    let title = document.createElement("h1");
        title.textContent = "Top 5";
        modalContent.appendChild(title);
    let scoreList = document.createElement("ul");
        scoreList.style.listStyle = "none";
        modalContent.appendChild(scoreList);
    let highscores = JSON.parse(window.localStorage.getItem("highscores"));
    
    if (highscores.length <= 5) {
         x = highscores.length;
    } else {
         x = 5;
    }
    let newScore;
    for (let y = 0; y < x; y++) {
        newScore = document.createElement("li");
        newScore.textContent = "Name: " + highscores[y].name + "| score: " + highscores[y].score;
        scoreList.appendChild(newScore);
    }
    modalDiv.style.display = "flex";
}