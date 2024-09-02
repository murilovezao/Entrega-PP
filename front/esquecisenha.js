// SAIR

document.getElementById('close-button').addEventListener('click', function() {
    if (confirm('Você tem certeza de que deseja sair?')) {
        window.history.back();
    }
});
