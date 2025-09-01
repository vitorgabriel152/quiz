const addQuestionBtn = document.getElementById('add-question-btn');
const questionsContainer = document.getElementById('questions-container');
const quizForm = document.getElementById('quiz-form');
let questionCount = 0;

// Cria bloco de pergunta
function createQuestionBlock() {
    questionCount++;
    const block = document.createElement('div');
    block.classList.add('question-block');
    block.dataset.id = questionCount;

    block.innerHTML = `
        <label>Pergunta ${questionCount}:</label>
        <input type="text" placeholder="Digite a pergunta" required>
        <select class="question-type">
            <option value="multiple">Múltipla Escolha</option>
            <option value="truefalse">Verdadeiro/Falso</option>
        </select>
        <div class="answers-container multiple">
            <div class="answer-input"><input type="text" placeholder="Resposta 1" required><input type="radio" name="correct-${questionCount}" required></div>
            <div class="answer-input"><input type="text" placeholder="Resposta 2" required><input type="radio" name="correct-${questionCount}" required></div>
            <div class="answer-input"><input type="text" placeholder="Resposta 3"><input type="radio" name="correct-${questionCount}"></div>
            <div class="answer-input"><input type="text" placeholder="Resposta 4"><input type="radio" name="correct-${questionCount}"></div>
        </div>
        <div class="answers-container truefalse hide">
            <div class="answer-input"><input type="radio" name="tf-${questionCount}" value="true"> Verdadeiro</div>
            <div class="answer-input"><input type="radio" name="tf-${questionCount}" value="false"> Falso</div>
        </div>
        <button type="button" class="card-btn remove-question-btn">Remover Pergunta</button>
    `;
    questionsContainer.appendChild(block);

    // Alterna visibilidade de acordo com tipo
    const selectType = block.querySelector('.question-type');
    selectType.addEventListener('change', () => {
        block.querySelector('.multiple').classList.toggle('hide', selectType.value === 'truefalse');
        block.querySelector('.truefalse').classList.toggle('hide', selectType.value !== 'truefalse');
    });

    // Remove pergunta
    block.querySelector('.remove-question-btn').addEventListener('click', () => {
        block.remove();
    });
}

// Adiciona pergunta
addQuestionBtn.addEventListener('click', createQuestionBlock);

// Salvar quiz
quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const quizName = document.getElementById('quiz-name').value;
    const questions = [];

    document.querySelectorAll('.question-block').forEach(block => {
        const questionText = block.querySelector('input[type="text"]').value;
        const type = block.querySelector('.question-type').value;
        let answers = [];

        if(type === "multiple"){
            const radios = block.querySelectorAll('input[type="radio"]');
            block.querySelectorAll('.answer-input input[type="text"]').forEach((ans, idx) => {
                if(ans.value.trim() !== ''){
                    answers.push({text: ans.value, correct: radios[idx].checked});
                }
            });
        } else {
            const selected = block.querySelector('input[type="radio"]:checked');
            if(selected){
                answers.push({text: selected.value, correct: selected.value === "true"});
            }
        }

        questions.push({question: questionText, type, answers});
    });

    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    savedQuizzes.push({name: quizName, date: new Date().toLocaleString(), questions});
    localStorage.setItem('quizzes', JSON.stringify(savedQuizzes));
    alert('Quiz salvo com sucesso!');
    window.location.href = 'index.html';
});

// Inicializa com uma pergunta
createQuestionBlock();
