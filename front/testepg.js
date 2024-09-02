// Função para alternar a visibilidade do contêiner de comentários
function toggleComment() {
    // Obtém o elemento do contêiner de comentários pelo ID
    var commentContainer = document.getElementById("comment-container");

    // Verifica se o contêiner está atualmente visível
    if (commentContainer.style.display === "block") {
        // Se estiver visível, oculta o contêiner
        commentContainer.style.display = "none";
    } else {
        // Caso contrário, torna o contêiner visível
        commentContainer.style.display = "block";
    }
}

// Função para ocultar o contêiner de comentários
function hideComment() {
    // Define a exibição do contêiner de comentários como "none" para escondê-lo
    document.getElementById("comment-container").style.display = "none";
}

// Variável para rastrear se o canvas está ativado
let canvasActivated = false;
// Obtém o elemento canvas pelo ID
const canvas = document.getElementById("myCanvas");
// Obtém o contexto de desenho 2D do canvas
const ctx = canvas.getContext("2d");

// Define as dimensões do canvas para ocupar toda a janela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Função para alternar a ativação do canvas
function toggleCanvas() {
    // Se o canvas estiver ativado, envia-o para o fundo e desativa
    if (canvasActivated) {
        sendCanvasBack(); // Envia o canvas para o fundo
        canvasActivated = false; // Marca o canvas como desativado
    } else {
        // Caso contrário, traz o canvas para frente e ativa
        bringCanvasForward(); // Traz o canvas para frente
        canvasActivated = true; // Marca o canvas como ativado
    }
}

// Função para trazer o canvas para frente
function bringCanvasForward() {
    // Define a z-index do canvas para 1, trazendo-o para frente
    canvas.style.zIndex = "1";
    // Habilita a interação com o canvas
    canvas.style.pointerEvents = "auto";
}

// Função para enviar o canvas para o fundo
function sendCanvasBack() {
    // Define a z-index do canvas para -1, enviando-o para o fundo
    canvas.style.zIndex = "-1";
    // Desabilita a interação com o canvas
    canvas.style.pointerEvents = "none";
}

// Variável para rastrear se o usuário está desenhando
let isDrawing = false;
// Variáveis para armazenar a última posição do cursor
let lastX = 0;
let lastY = 0;

// Função para ativar a ferramenta de desenho
function activateDrawingTool(e) {
    // Marca que o usuário está desenhando
    isDrawing = true;
    // Muda o cursor para um indicador de cruz
    document.body.style.cursor = "crosshair";
    // Armazena a posição atual do cursor
    [lastX, lastY] = [e.clientX, e.clientY];
}

// Função para desativar a ferramenta de desenho
function deactivateDrawingTool() {
    // Marca que o usuário não está mais desenhando
    isDrawing = false;
    // Restaura o cursor padrão
    document.body.style.cursor = "auto";
}

// Função para desenhar no canvas
function draw(e) {
    // Se o usuário não estiver desenhando, não faz nada
    if (!isDrawing) return;

    // Obtém a nova posição do cursor
    const newX = e.clientX;
    const newY = e.clientY;

    // Inicia um novo caminho no canvas
    ctx.beginPath();
    // Move para a última posição conhecida do cursor
    ctx.moveTo(lastX, lastY);
    // Desenha uma linha até a nova posição do cursor
    ctx.lineTo(newX, newY);
    // Desenha a linha no canvas
    ctx.stroke();

    // Atualiza a última posição do cursor
    [lastX, lastY] = [newX, newY];
}

// Adiciona listeners para iniciar, parar e processar o desenho
document.addEventListener('mousedown', activateDrawingTool); // Inicia o desenho
document.addEventListener('mouseup', deactivateDrawingTool); // Para o desenho
document.addEventListener('mousemove', draw); // Desenha enquanto o mouse se move

// Ajusta o tamanho do canvas quando a janela é redimensionada
window.addEventListener('resize', () => {
    // Redefine as dimensões do canvas para corresponder à nova dimensão da janela
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Função executada quando o DOM é carregado
window.addEventListener('DOMContentLoaded', () => {
    // Obtém a string de consulta da URL
    const queryString = window.location.search;
    // Analisa os parâmetros da URL
    const urlParams = new URLSearchParams(queryString);
    // Obtém o valor do parâmetro 'image'
    const imageData = urlParams.get('image');

    // Se houver dados de imagem na URL
    if (imageData) {
        // Define o atributo 'src' da imagem com os dados da imagem decodificada
        document.querySelector('.image').setAttribute('src', decodeURIComponent(imageData));
    }
});

// Função para manipulação do botão 4 com confirmação
function handleButton4Click() {
    // Exibe uma confirmação para o usuário
    const userConfirmed = confirm('Você tem certeza de que deseja sair?');
    // Se o usuário confirmar, volta para a página anterior
    if (userConfirmed) {
        window.history.back(); // Volta para a página anterior
    }
}
