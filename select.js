const quizList = document.getElementById('quiz-list');
const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

if(quizzes.length === 0){
    quizList.innerHTML = '<li>Nenhum quiz disponível. Crie um primeiro!</li>';
} else {
    quizzes.forEach((quiz, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${quiz.name}</strong> (${quiz.date}) <button class="card-btn" onclick="startQuiz(${idx})">Jogar</button>`;
        quizList.appendChild(li);
    });
}

function startQuiz(idx){
    localStorage.setItem('currentQuiz', idx);
    window.location.href = 'play-visual.html';
}
