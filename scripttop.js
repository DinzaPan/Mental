// Datos de ejemplo (simulación de puntajes)
const normalScores = [
    { name: "Usuario 1", score: 150 },
    { name: "Usuario 2", score: 120 },
    { name: "Usuario 3", score: 100 },
    { name: "Usuario 4", score: 90 },
    { name: "Usuario 5", score: 80 },
    { name: "Usuario 6", score: 70 },
    { name: "Usuario 7", score: 60 },
    { name: "Usuario 8", score: 50 },
    { name: "Usuario 9", score: 40 },
    { name: "Usuario 10", score: 30 }
];

const recordScores = [
    { name: "Usuario A", score: 200 },
    { name: "Usuario B", score: 180 },
    { name: "Usuario C", score: 160 },
    { name: "Usuario D", score: 140 },
    { name: "Usuario E", score: 120 },
    { name: "Usuario F", score: 100 },
    { name: "Usuario G", score: 80 },
    { name: "Usuario H", score: 60 },
    { name: "Usuario I", score: 40 },
    { name: "Usuario J", score: 20 }
];

// Elementos del DOM
const exitButton = document.getElementById('exit-button');
const normalModeButton = document.getElementById('normal-mode');
const recordModeButton = document.getElementById('record-mode');
const normalScoresList = document.getElementById('normal-scores-list');
const recordScoresList = document.getElementById('record-scores-list');
const normalScoresSection = document.getElementById('normal-scores');
const recordScoresSection = document.getElementById('record-scores');

// Botón de salida
exitButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Cambiar a Modo Normal
normalModeButton.addEventListener('click', () => {
    normalModeButton.classList.add('active');
    recordModeButton.classList.remove('active');
    normalScoresSection.style.display = 'block';
    recordScoresSection.style.display = 'none';
    loadScores(normalScores, normalScoresList);
});

// Cambiar a Mi Récord
recordModeButton.addEventListener('click', () => {
    recordModeButton.classList.add('active');
    normalModeButton.classList.remove('active');
    recordScoresSection.style.display = 'block';
    normalScoresSection.style.display = 'none';
    loadScores(recordScores, recordScoresList);
});

// Cargar puntajes en la lista
function loadScores(scores, listElement) {
    listElement.innerHTML = ''; // Limpiar lista
    scores.forEach((user, index) => {
        const scoreItem = document.createElement('div');
        scoreItem.classList.add('score-item');

        // Icono de trofeo según la posición
        let trophyIcon = '';
        if (index === 0) trophyIcon = '<i class="fas fa-trophy trophy-gold"></i>';
        else if (index === 1) trophyIcon = '<i class="fas fa-trophy trophy-silver"></i>';
        else if (index === 2) trophyIcon = '<i class="fas fa-trophy trophy-bronze"></i>';

        // Nombre del usuario (o "Usuario anónimo" si no tiene nombre)
        const userName = user.name || "Usuario anónimo";

        // Estructura del elemento
        scoreItem.innerHTML = `
            <div class="rank">${trophyIcon || index + 1}</div>
            <div class="name">${userName}</div>
            <div class="score">${user.score} pts</div>
        `;

        listElement.appendChild(scoreItem);
    });
}

// Cargar puntajes iniciales (Modo Normal por defecto)
loadScores(normalScores, normalScoresList);