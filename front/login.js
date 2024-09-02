let loginButton = document.getElementById('login');

loginButton.onclick = async function() {
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    let data = { email, senha };

    const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(data)
    });

    let content = await response.json();
    
    if (content.success) {
        showAlert('success-alert');
        setTimeout(() => {
            window.location.href = 'paginadeinicio.html';  // Redireciona para a página inicial
        }, 2000); // Tempo para exibir o alerta antes do redirecionamento
    } else {
        showAlert('error-alert');
    }
}

function showAlert(alertId) {
    document.getElementById(alertId).style.display = 'block';
}

function closeAlert(alertId) {
    document.getElementById(alertId).style.display = 'none';
}
