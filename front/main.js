function adicionarComentario() {
    // Cria o elemento do card de comentário
    var commentCard = document.createElement('div');
    commentCard.className = 'comment-card';
    commentCard.innerHTML = `
        <span class="close-btn" onclick="fecharComentario(this.parentNode)">X</span>
        <textarea rows="4" cols="50" placeholder="Digite seu comentário aqui..."></textarea>
    `;

    // Adiciona o card de comentário ao body do documento
    document.body.appendChild(commentCard);
}

function fecharComentario(commentCard) {
    // Remove o card de comentário
    commentCard.remove();
}

function adicionarComentario() {
    // Cria o elemento do card de comentário
    var commentCard = document.createElement('div');
    commentCard.className = 'comment-card';
    commentCard.innerHTML = `
        <span class="close-btn" onclick="fecharComentario(this.parentNode)">X</span>
        <textarea rows="4" cols="50" placeholder="Digite seu comentário aqui..."></textarea>
    `;

    // Adiciona o card de comentário ao body do documento
    document.body.appendChild(commentCard);
}

function fecharComentario(commentCard) {
    // Remove o card de comentário
    commentCard.remove();
}



function ativarDesenho(event) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var corCaneta = document.getElementById('corCaneta').value; // Obtém a cor selecionada

    var desenhoAtivo = false;

    canvas.addEventListener('mousedown', function(event) {
        desenhoAtivo = true;
        context.beginPath();
        context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        context.strokeStyle = corCaneta; // Define a cor da caneta
    });

    canvas.addEventListener('mousemove', function(event) {
        if (desenhoAtivo) {
            context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
            context.stroke();
        }
    });

    canvas.addEventListener('mouseup', function() {
        desenhoAtivo = false;
    });

    canvas.addEventListener('mouseleave', function() {
        desenhoAtivo = false;
    });
}