function disableButtons(){
    Array.from(answerButtons.children).forEach(btn=>{
        btn.disabled=true;
        if(btn.dataset.correct==="true"){
            btn.classList.add('correct');
        } else {
            btn.classList.add('wrong');
        }
        btn.classList.add('card-animate');
    });
}

function showConfetti(){
    for(let i=0;i<50;i++){
        const conf = document.createElement('div');
        conf.classList.add('confetti');
        conf.innerText = '🎉';
        conf.style.left = Math.random()*window.innerWidth+'px';
        conf.style.fontSize = Math.random()*24+16+'px';
        document.body.appendChild(conf);
        setTimeout(()=>{ conf.remove(); },2000);
    }
}

function nextQuestion(){
    quizQuestion.classList.add('fadeOut');
    setTimeout(()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex<quizData.length){
            quizQuestion.classList.remove('fadeOut');
            showQuestion();
        } else {
            showResult();
        }
    },400);
}
