// Redireccionar a las páginas correspondientes con animación
function redirectToPage(page) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = page;
    }, 500); // Duración de la animación
}

document.getElementById('normal-mode').addEventListener('click', () => {
    redirectToPage('juego1.html');
});

document.getElementById('record').addEventListener('click', () => {
    redirectToPage('juego2.html');
});

document.getElementById('settings').addEventListener('click', () => {
    redirectToPage('settings.html');
});

document.getElementById('trophy-icon').addEventListener('click', () => {
    redirectToPage('top.html');
});
