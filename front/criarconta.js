let criarconta = document.getElementById('criarconta');

criarconta.onclick = async function() {
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let confirmSenha = document.getElementById('confirmSenha').value;

    // Validação dos campos
    if (!email || !senha || !confirmSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Verificação se as senhas coincidem
    if (senha !== confirmSenha) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    let data = { email, senha };

    const response = await fetch('http://localhost:3001/api/store/usuario', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(data)
    });

    let content = await response.json();

    if (content.success) {
        alert('Sucesso!');
        window.location.href = 'login.html';  // Redireciona para a página inicial
    } else {
        alert('Algo deu errado, tente novamente!');
    }
};

// SAIR
document.getElementById('close-button').addEventListener('click', function() {
    if (confirm('Você tem certeza de que deseja sair?')) {
        window.history.back();
    }
});
