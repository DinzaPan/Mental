let score = 0;
let highScore = 0;
let timeLeft = 0;
let timerInterval;
let correctAnswer;
let isGameRunning = false;

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
const retryButton = document.getElementById('retry');
const backButton = document.getElementById('back');

// Selección de tiempo
document.getElementById('1-minute').addEventListener('click', () => startGame(60));
document.getElementById('3-minutes').addEventListener('click', () => startGame(180));
document.getElementById('6-minutes').addEventListener('click', () => startGame(360));
document.getElementById('10-minutes').addEventListener('click', () => startGame(600));
document.getElementById('15-minutes').addEventListener('click', () => startGame(900));

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
    scoreDisplay.textContent = score;
    timeSelection.style.display = 'none';
    game.style.display = 'block';
    evaluation.style.display = 'none';
    isGameRunning = true;
    startTimer();
    generateProblem();
}

// Generar problema matemático con dificultad progresiva
function generateProblem() {
    let problem;
    const level = Math.floor(score / 10) + 1; // Aumenta la dificultad cada 10 puntos

    if (level <= 3) {
        // Dificultad media (sumas, restas, multiplicaciones y divisiones con números mayores)
        const a = Math.floor(Math.random() * 100) + 50;
        const b = Math.floor(Math.random() * 100) + 50;
        const operators = ['+', '-', '*', '/'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        problem = `${a} ${operator} ${b} = ?`;
        correctAnswer = operator === '/' ? (a / b).toFixed(2) : eval(`${a} ${operator} ${b}`);
    } else if (level <= 6) {
        // Dificultad alta (combinaciones de operaciones con raíces cuadradas y potencias)
        const a = Math.floor(Math.random() * 100) + 50;
        const b = Math.floor(Math.random() * 20) + 10;
        const operations = [
            { problem: `√${a} + ${b} * 2 = ?`, answer: (Math.sqrt(a) + b * 2).toFixed(2) },
            { problem: `(${a} + ${b})^2 = ?`, answer: Math.pow(a + b, 2) },
            { problem: `${a} / ${b} + ${a} = ?`, answer: (a / b + a).toFixed(2) },
            { problem: `${a} * ${b} - ${a} = ?`, answer: (a * b - a) },
            { problem: `√(${a} + ${b}) = ?`, answer: Math.sqrt(a + b).toFixed(2) },
            { problem: `${a}^${b} - ${a} = ?`, answer: Math.pow(a, b) - a }
        ];
        const selected = operations[Math.floor(Math.random() * operations.length)];
        problem = selected.problem;
        correctAnswer = selected.answer;
    } else if (level <= 10) {
        // Dificultad muy alta (combinaciones avanzadas con logaritmos y trigonometría)
        const a = Math.floor(Math.random() * 100) + 50;
        const b = Math.floor(Math.random() * 100) + 50;
        const c = Math.floor(Math.random() * 10) + 5;
        const operations = [
            { problem: `log(${a}) + ${b} = ?`, answer: (Math.log10(a) + b).toFixed(2) },
            { problem: `sin(${a}°) + ${b} = ?`, answer: (Math.sin((a * Math.PI) / 180) + b).toFixed(2) },
            { problem: `${a}x + ${b} = ${c}`, answer: ((c - b) / a).toFixed(2) },
            { problem: `e^${a} / ${b} = ?`, answer: (Math.exp(a) / b).toFixed(2) },
            { problem: `(${a} + ${b})^2 = ?`, answer: Math.pow(a + b, 2) },
            { problem: `√(${a} + ${b}) = ?`, answer: Math.sqrt(a + b).toFixed(2) }
        ];
        const selected = operations[Math.floor(Math.random() * operations.length)];
        problem = selected.problem;
        correctAnswer = selected.answer;
    } else {
        // Dificultad extrema (Modo Experto: integrales, derivadas, límites, combinaciones avanzadas)
        const a = Math.floor(Math.random() * 100) + 50;
        const b = Math.floor(Math.random() * 100) + 50;
        const c = Math.floor(Math.random() * 10) + 5;
        const operations = [
            { problem: `∫(${a}x + ${b}) dx`, answer: `${(a / 2).toFixed(2)}x^2 + ${b}x + C` },
            { problem: `d/dx (${a}x^2 + ${b}x)`, answer: `${2 * a}x + ${b}` },
            { problem: `lim(x -> ${a}) (x^2 - ${b})`, answer: (Math.pow(a, 2) - b).toFixed(2) },
            { problem: `${a} * e^${b} = ?`, answer: (a * Math.exp(b)).toFixed(2) },
            { problem: `cos(${a}°) + ${b} = ?`, answer: (Math.cos((a * Math.PI) / 180) + b).toFixed(2) },
            { problem: `ln(${a}) + ${b} = ?`, answer: (Math.log(a) + b).toFixed(2) },
            { problem: `(${a} + ${b}) * √${c} = ?`, answer: ((a + b) * Math.sqrt(c)).toFixed(2) },
            { problem: `${a}^${b} / ${c} = ?`, answer: (Math.pow(a, b) / c).toFixed(2) }
        ];
        const selected = operations[Math.floor(Math.random() * operations.length)];
        problem = selected.problem;
        correctAnswer = selected.answer;
    }

    // Generar respuestas únicas y no muy parecidas
    const answers = new Set();
    answers.add(correctAnswer);
    while (answers.size < 3) {
        const randomOffset = Math.floor(Math.random() * 50) - 25; // Variación de -25 a +25
        const fakeAnswer = parseFloat(correctAnswer) + randomOffset;
        if (fakeAnswer !== correctAnswer && !answers.has(fakeAnswer.toFixed(2))) {
            answers.add(fakeAnswer.toFixed(2));
        }
    }

    const answerArray = Array.from(answers);
    answerArray.sort(() => Math.random() - 0.5);

    problemDisplay.textContent = problem;
    answer1.textContent = answerArray[0];
    answer2.textContent = answerArray[1];
    answer3.textContent = answerArray[2];

    // Remover la clase "correct" y "disabled" de los botones
    answer1.classList.remove('correct', 'disabled');
    answer2.classList.remove('correct', 'disabled');
    answer3.classList.remove('correct', 'disabled');
}

// Verificar respuesta
function checkAnswer(selectedAnswer, correctAnswer) {
    if (!isGameRunning) return;

    if (selectedAnswer == correctAnswer) {
        score++;
        scoreDisplay.textContent = score;
        generateProblem(); // Generar un nuevo problema después de cada respuesta correcta
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
            generateProblem(); // Generar un nuevo problema después de 1.5 segundos
        }, 1500);
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
