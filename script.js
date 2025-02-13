let hearts = 3;
let score = 0;
let highScore = 0;
let timeLeft = 120; // 2 minutos
let timerInterval;
let correctAnswer;
let isAnswerSelected = false; // Variable para controlar si ya se seleccionó una respuesta

const heart1 = document.getElementById('heart1');
const heart2 = document.getElementById('heart2');
const heart3 = document.getElementById('heart3');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const timeDisplay = document.getElementById('time');
const problemDisplay = document.getElementById('problem');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const gameOverScreen = document.querySelector('.game-over');
const restartButton = document.getElementById('restart');

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
        // Problemas avanzados (raíces cuadradas, potencias)
        const a = Math.floor(Math.random() * 100) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const operations = [
            { problem: `√${a} = ?`, answer: Math.sqrt(a).toFixed(2) },
            { problem: `${a}^${b} = ?`, answer: Math.pow(a, b) },
            { problem: `(${a} + ${b}) * ${b} = ?`, answer: (a + b) * b }
        ];
        const selected = operations[Math.floor(Math.random() * operations.length)];
        problem = selected.problem;
        correctAnswer = selected.answer;
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

    // Remover la clase "correct" de los botones
    answer1.classList.remove('correct');
    answer2.classList.remove('correct');
    answer3.classList.remove('correct');

    // Habilitar los botones de respuesta
    answer1.disabled = false;
    answer2.disabled = false;
    answer3.disabled = false;
    isAnswerSelected = false; // Reiniciar el estado de selección de respuesta

    return correctAnswer;
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (isAnswerSelected) return; // Si ya se seleccionó una respuesta, no hacer nada

    if (selectedAnswer == correctAnswer) {
        score++;
        scoreDisplay.textContent = score;
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
        }
        generateProblem();
    } else {
        hearts--;
        updateHearts();
        if (hearts === 0) {
            endGame();
        } else {
            // Mostrar la respuesta correcta en verde
            if (answer1.textContent == correctAnswer) answer1.classList.add('correct');
            if (answer2.textContent == correctAnswer) answer2.classList.add('correct');
            if (answer3.textContent == correctAnswer) answer3.classList.add('correct');

            // Deshabilitar los botones de respuesta
            answer1.disabled = true;
            answer2.disabled = true;
            answer3.disabled = true;

            isAnswerSelected = true; // Marcar que ya se seleccionó una respuesta

            setTimeout(() => {
                generateProblem();
            }, 1500); // Esperar 1.5 segundos antes de generar un nuevo problema
        }
    }
}

function updateHearts() {
    if (hearts === 3) {
        heart1.style.display = 'inline';
        heart2.style.display = 'inline';
        heart3.style.display = 'inline';
    } else if (hearts === 2) {
        heart1.style.display = 'inline';
        heart2.style.display = 'inline';
        heart3.style.display = 'none';
    } else if (hearts === 1) {
        heart1.style.display = 'inline';
        heart2.style.display = 'none';
        heart3.style.display = 'none';
        heart1.classList.add('heartbeat');
    } else {
        heart1.style.display = 'none';
        heart2.style.display = 'none';
        heart3.style.display = 'none';
        heart1.classList.remove('heartbeat');
    }
}

function endGame() {
    clearInterval(timerInterval);
    gameOverScreen.style.display = 'flex';
}

function restartGame() {
    hearts = 3;
    score = 0;
    timeLeft = 120; // Reiniciar a 2 minutos
    scoreDisplay.textContent = score;
    updateHearts();
    gameOverScreen.style.display = 'none';
    startTimer();
    generateProblem();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft === 0) {
            hearts--;
            updateHearts();
            if (hearts === 0) {
                endGame();
            } else {
                timeLeft = 120; // Reiniciar a 2 minutos
                generateProblem();
            }
        }
    }, 1000);
}

answer1.addEventListener('click', () => {
    checkAnswer(answer1.textContent, correctAnswer);
});

answer2.addEventListener('click', () => {
    checkAnswer(answer2.textContent, correctAnswer);
});

answer3.addEventListener('click', () => {
    checkAnswer(answer3.textContent, correctAnswer);
});

restartButton.addEventListener('click', restartGame);

startTimer();
generateProblem();