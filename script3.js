let score = 0;
let highScore = 0;
let timeLeft = 0;
let timerInterval;
let correctAnswer;
let isGameRunning = false;
let focusCount = 3;
let isFocusUsed = false;

const timeSelection = document.getElementById('time-selection');
const game = document.getElementById('game');
const evaluation = document.getElementById('evaluation');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('final-score');
const timeDisplay = document.getElementById('time');
const problemDisplay = document.getElementById('problem');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const focusButton = document.getElementById('focus-button');
const focusCountDisplay = document.getElementById('focus-count');
const warning = document.getElementById('warning');
const retryButton = document.getElementById('retry');
const backButton = document.getElementById('back');

// Selección de tiempo
document.getElementById('1-minute').addEventListener('click', () => startGame(60));
document.getElementById('3-minutes').addEventListener('click', () => startGame(180));
document.getElementById('6-minutes').addEventListener('click', () => startGame(360));
document.getElementById('10-minutes').addEventListener('click', () => startGame(600));
document.getElementById('15-minutes').addEventListener('click', () => startGame(900));

// Botón de foco
focusButton.addEventListener('click', () => {
    if (focusCount > 0 && !isFocusUsed) {
        focusCount--;
        focusCountDisplay.textContent = focusCount;
        highlightCorrectAnswer();
        isFocusUsed = true;
    }
});

// Botón de reintentar
retryButton.addEventListener('click', () => {
    evaluation.style.display = 'none';
    startGame(60); // Reiniciar con 1 minuto
});

// Botón de volver
backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Iniciar el juego
function startGame(seconds) {
    timeLeft = seconds;
    score = 0;
    focusCount = 3;
    scoreDisplay.textContent = score;
    focusCountDisplay.textContent = focusCount;
    timeSelection.style.display = 'none';
    game.style.display = 'block';
    evaluation.style.display = 'none';
    isGameRunning = true;
    startTimer();
    generateProblem();
}

// Generar problema matemático
function generateProblem() {
    let problem;
    const level = Math.floor(score / 10) + 1;

    if (level === 1) {
        // Problemas fáciles (sumas, restas, multiplicaciones)
        const a = Math.floor(Math.random() * 50) + 1;
        const b = Math.floor(Math.random() * 50) + 1;
        const operators = ['+', '-', '*'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        problem = `${a} ${operator} ${b} = ?`;
        correctAnswer = eval(`${a} ${operator} ${b}`);
    } else if (level === 2) {
        // Problemas intermedios (divisiones, fracciones)
        const a = Math.floor(Math.random() * 100) + 1;
        const b = Math.floor(Math.random() * 100) + 1;
        const operators = ['+', '-', '*', '/'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        problem = `${a} ${operator} ${b} = ?`;
        correctAnswer = operator === '/' ? (a / b).toFixed(2) : eval(`${a} ${operator} ${b}`);
    } else if (level === 3) {
        // Problemas avanzados (despejar "X")
        const a = Math.floor(Math.random() * 50) + 1;
        const b = Math.floor(Math.random() * 50) + 1;
        const c = Math.floor(Math.random() * 50) + 1;
        problem = `${a}x + ${b} = ${c}`;
        correctAnswer = ((c - b) / a).toFixed(2);
    } else {
        // Problemas complejos (combinaciones avanzadas)
        const a = Math.floor(Math.random() * 100) + 1;
        const b = Math.floor(Math.random() * 100) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        problem = `(${a} + ${b}) * ${c} - ${a} = ?`;
        correctAnswer = (a + b) * c - a;
    }

    const answers = [correctAnswer, correctAnswer + Math.floor(Math.random() * 10) + 1, correctAnswer - Math.floor(Math.random() * 10) + 1];
    answers.sort(() => Math.random() - 0.5);

    problemDisplay.textContent = problem;
    answer1.textContent = answers[0];
    answer2.textContent = answers[1];
    answer3.textContent = answers[2];

    // Remover la clase "correct" y "highlight" de los botones
    answer1.classList.remove('correct', 'highlight', 'disabled');
    answer2.classList.remove('correct', 'highlight', 'disabled');
    answer3.classList.remove('correct', 'highlight', 'disabled');

    // Habilitar los botones de respuesta
    answer1.disabled = false;
    answer2.disabled = false;
    answer3.disabled = false;

    // Reiniciar el uso del foco
    isFocusUsed = false;
}

// Resaltar la respuesta correcta
function highlightCorrectAnswer() {
    if (answer1.textContent == correctAnswer) answer1.classList.add('highlight');
    if (answer2.textContent == correctAnswer) answer2.classList.add('highlight');
    if (answer3.textContent == correctAnswer) answer3.classList.add('highlight');
}

// Verificar respuesta
function checkAnswer(selectedAnswer, correctAnswer) {
    if (!isGameRunning) return;

    if (selectedAnswer == correctAnswer) {
        score++;
        scoreDisplay.textContent = score;
        generateProblem();
    } else {
        timeLeft -= 15; // Restar 15 segundos por respuesta incorrecta
        if (timeLeft < 0) timeLeft = 0;
        timeDisplay.classList.add('time-penalty');
        setTimeout(() => timeDisplay.classList.remove('time-penalty'), 500);

        // Mostrar la respuesta correcta en verde
        if (answer1.textContent == correctAnswer) answer1.classList.add('correct');
        if (answer2.textContent == correctAnswer) answer2.classList.add('correct');
        if (answer3.textContent == correctAnswer) answer3.classList.add('correct');

        // Deshabilitar los botones de respuesta
        answer1.classList.add('disabled'); 
         answer2.classList.add('disabled');
          answer3.classList.add('disabled');

        setTimeout(() => {
            generateProblem();
        }, 1500); // Esperar 1.5 segundos antes de generar un nuevo problema
    }
}

// Temporizador
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isGameRunning = false;
            endGame();
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

// Finalizar el juego
function endGame() {
    game.style.display = 'none';
    evaluation.style.display = 'block';
    finalScoreDisplay.textContent = score;
}

// Eventos de los botones de respuesta
answer1.addEventListener('click', () => checkAnswer(answer1.textContent, correctAnswer));
answer2.addEventListener('click', () => checkAnswer(answer2.textContent, correctAnswer));
answer3.addEventListener('click', () => checkAnswer(answer3.textContent, correctAnswer));
