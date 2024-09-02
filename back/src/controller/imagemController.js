// Importação dos módulos necessários
const connection = require('../config/db'); 
const dotenv = require('dotenv').config();

const fs = require('fs'); // Módulo para lidar com sistema de arquivos
const path = require('path'); // Módulo para lidar com caminhos de arquivos

const uploadPath = path.join(__dirname, '..', 'uploads');

// Verifica se o diretório de uploads existe, se não, cria
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

async function storeImagem(request, response) {
    if (!request.files) {
        return response.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de foto."
        });
    }

    const imagem = request.files.imagem;

    const imagemNome = Date.now() + path.extname(imagem.name);

    // Move a imagem para o diretório de uploads
    imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
        if (erro) {
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo"
            });
        }

        const params = [imagemNome];

        const query = 'INSERT INTO imagem(imagem) VALUES(?)';

        // Executa no banco de dados
        connection.query(query, params, (err, results) => {
            if (results) {
                //  sucesso se for bem-sucedido
                response.status(201).json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                });
            } else {
                //  erro se a inserção falhar
                response.status(400).json({
                    success: false,
                    message: "Ops, deu problema!",
                    data: err
                });
            }
        });
    });
}

// Exporta a função storeImagem para uso em outros arquivos
module.exports = {
    storeImagem
};
