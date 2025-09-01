const currentQuizIdx = localStorage.getItem('currentQuiz');
const quizzes = JSON.parse(localStorage.getItem('quizzes'));
if(currentQuizIdx === null || !quizzes || quizzes.length === 0){
    alert('Nenhum quiz disponível.');
    window.location.href = 'index.html';
}

const quizData = quizzes[currentQuizIdx].questions;

const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const quizQuestion = document.getElementById('quiz-question');
const quizResult = document.getElementById('quiz-result');
const scoreText = document.getElementById('score-text');
const rankingList = document.getElementById('ranking-list');
const restartBtn = document.getElementById('restart-btn');
const timerBarFill = document.getElementById('timer-bar-fill');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 20;
let timerInterval;

quizQuestion.classList.remove('hide');
showQuestion();

function showQuestion(){
    resetState();
    const q = quizData[currentQuestionIndex];
    questionText.innerText = q.question;

    q.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.classList.add('card-btn');
        btn.innerText = answer.text;
        if(answer.correct) btn.dataset.correct = answer.correct;
        btn.addEventListener('click', selectAnswer);
        answerButtons.appendChild(btn);
    });

    timeLeft = 20;
    updateTimerBar();
    timerInterval = setInterval(()=>{
        timeLeft -= 0.1;
        updateTimerBar();
        if(timeLeft <=0){
            clearInterval(timerInterval);
            disableButtons();
            setTimeout(nextQuestion,500);
        }
    },100);
}

function updateTimerBar(){
    timerBarFill.style.width = Math.max(0,(timeLeft/20)*100) + '%';
    if(timeLeft <=5) timerBarFill.style.backgroundColor = '#dc3545';
    else if(timeLeft <=10) timerBarFill.style.backgroundColor = '#ffc107';
    else timerBarFill.style.backgroundColor = '#28a745';
}

function resetState(){
    clearInterval(timerInterval);
    while(answerButtons.firstChild) answerButtons.removeChild(answerButtons.firstChild);
}

function selectAnswer(e){
    clearInterval(timerInterval);
    const correct = e.target.dataset.correct === "true";
    if(correct) {
        score += Math.floor(timeLeft*5);
        showConfetti();
    }
    disableButtons();
    setTimeout(nextQuestion,500);
}

function disableButtons(){
    Array.from(answerButtons.children).forEach(btn=>{
        btn.style.backgroundColor = btn.dataset.correct === "true" ? '#28a745':'#dc3545';
        btn.disabled = true;
        btn.classList.add('card-animate');
    });
}

function nextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < quizData.length){
        quizQuestion.classList.add('card-animate');
        showQuestion();
    } else {
        showResult();
    }
}

function showResult(){
    quizQuestion.classList.add('hide');
    quizResult.classList.remove('hide');
    scoreText.innerText = `Sua pontuação: ${score}`;

    const players = [
        {name:"Alice", score:Math.floor(Math.random()*100)},
        {name:"Bob", score:Math.floor(Math.random()*100)},
        {name:"Você", score}
    ];
    players.sort((a,b)=>b.score-b.score);
    rankingList.innerHTML = '';
    players.forEach((p,idx)=>{
        const li = document.createElement('li');
        li.innerText = `${idx+1}. ${p.name} - ${p.score} pts`;
        li.classList.add('card-animate');
        rankingList.appendChild(li);
    });
}

restartBtn.addEventListener('click',()=>{
    currentQuestionIndex=0;
    score=0;
    quizResult.classList.add('hide');
    quizQuestion.classList.remove('hide');
    showQuestion();
});

function showConfetti(){
    for(let i=0;i<30;i++){
        const conf = document.createElement('div');
        conf.innerText = '🎉';
        conf.style.position='fixed';
        conf.style.fontSize=Math.random()*24+12+'px';
        conf.style.left=Math.random()*window.innerWidth+'px';
        conf.style.top='0px';
        conf.style.zIndex=1000;
        conf.style.pointerEvents='none';
        document.body.appendChild(conf);
        let topPos=0;
        const fall = setInterval(()=>{
            topPos+=Math.random()*5+2;
            conf.style.top=topPos+'px';
            conf.style.left = parseFloat(conf.style.left) + Math.random()*4-2 + 'px';
            if(topPos>window.innerHeight){
                clearInterval(fall);
                conf.remove();
            }
        },16);
    }
}
