/* Mode Switch Logic */

function toggleMode() {
    const toggle = document.getElementById('mode-toggle');

    if (toggle.checked) {
        // Switch vers page RH
        window.location.href = 'index.html';
    } else {
        // Switch vers page Terminal
        window.location.href = 'terminal.html';
    }
}

// À l'arrivée sur welcome.html, le toggle doit être coché
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('mode-toggle');
    const pathname = window.location.pathname.toLowerCase();
    if (pathname.endsWith('index.html') || pathname.endsWith('index/')) {
        toggle.checked = true;
    } else {
        toggle.checked = false;
    }
});
