// 1. Listener para carregar as imagens do localStorage quando a página for carregada
document.addEventListener('DOMContentLoaded', function() {
    const images = loadImagesFromLocalStorage(); // Carrega imagens existentes do localStorage
    renderImages(images); // Renderiza as imagens
});

// 2. Listener para o input de arquivo para lidar com mudanças (arquivos selecionados)
document.getElementById('file_imagem').addEventListener('change', function(event) {
    const files = event.target.files; // Obtém os arquivos selecionados
    const images = loadImagesFromLocalStorage(); // Carrega imagens existentes do localStorage

    // Para cada arquivo selecionado
    Array.from(files).forEach(file => {
        const reader = new FileReader(); // Cria um FileReader para ler o conteúdo do arquivo

        // Função chamada quando a leitura do arquivo é concluída
        reader.onload = function(e) {
            const imageData = e.target.result; // Dados da imagem
            // Adiciona a nova imagem à lista de imagens
            images.push({ src: imageData, name: file.name, size: file.size });
            // Salva as imagens no localStorage
            saveImagesToLocalStorage(images);
            // Renderiza as imagens atualizadas
            renderImages(images);
        };

        // Lê o arquivo como uma URL de dados
        reader.readAsDataURL(file);
    });
});

// 3. Função para salvar imagens no localStorage
function saveImagesToLocalStorage(images) {
    // Salva a lista de imagens no localStorage convertendo-a para uma string JSON
    localStorage.setItem('images', JSON.stringify(images));
}

// 4. Função para carregar imagens do localStorage
function loadImagesFromLocalStorage() {
    // Carrega a lista de imagens do localStorage e a converte de volta para um objeto JavaScript
    // Se não houver imagens armazenadas, retorna uma lista vazia
    const images = localStorage.getItem('images');
    return images ? JSON.parse(images) : [];
}

// 5. Função para renderizar imagens
function renderImages(images) {
    // Referência ao contêiner de imagens
    const container = document.getElementById('image-container');
    
    // Limpa imagens anteriores
    container.innerHTML = '';
    
    // Para cada imagem na lista de imagens
    images.forEach(image => {
        // Cria um contêiner para a imagem
        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper';
        
        // Cria um elemento de imagem
        const img = document.createElement('img');
        img.src = image.src; // Define a fonte da imagem
        img.alt = image.name; // Define o texto alternativo da imagem
        img.className = 'image'; // Define a classe da imagem

        // Cria um elemento para exibir informações do arquivo (nome e tamanho)
        const info = document.createElement('div');
        info.className = 'file-info';
        info.innerHTML = `<p>${image.name}</p><p>${(image.size / 1024).toFixed(2)} KB</p>`;

        // Cria um botão de exclusão para remover a imagem
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = 'X';

        // Define o comportamento do botão de exclusão
        deleteButton.onclick = function() {
            // Remove o contêiner da imagem
            container.removeChild(wrapper);
            // Remove a imagem do localStorage
            const updatedImages = loadImagesFromLocalStorage().filter(img => img.src !== image.src);
            saveImagesToLocalStorage(updatedImages);
        };

        // Adiciona a imagem, as informações do arquivo e o botão de exclusão ao contêiner
        wrapper.appendChild(img);
        wrapper.appendChild(info);
        wrapper.appendChild(deleteButton);
        container.appendChild(wrapper);

        // Define o comportamento ao clicar na imagem
        img.addEventListener('click', function() {
            window.location.href = 'testepg.html?image=' + encodeURIComponent(image.src);
        });
    });
}

// 6. Listener para o botão de fechar para retornar à página anterior
document.getElementById('close-button').addEventListener('click', function() {
    // Ao clicar no botão de fechar, pergunta se o usuário deseja sair
    if (confirm('Você tem certeza de que deseja sair?')) {
        window.history.back(); // Volta à página anterior
    }
});
