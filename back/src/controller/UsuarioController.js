const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeUsuario(request, response) {
    const params = [
        request.body.email,
        request.body.senha
    ];

    let emailSplit = request.body.email.split('@')
    if(!emailSplit[0].length > 1 && !emailSplit[1].includes('.com')) {
        response.status(400).json({
            success: false,
            message: "Email inválido"
        });
    }

    const query = 'INSERT INTO usuarios(email,senha) VALUES(?,?)';

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                data: results
            });
            
        } else {
            response.status(400).json({
                success: false,
                message: "Ops, deu problema!",
                data: err
            });
        }
    });
}



// LOGIN

async function loginUsuario(request, response) {
    const { email, senha } = request.body;

    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    const params = [email, senha];

    connection.query(query, params, (err, results) => {
        if (results && results.length > 0) {
            response.status(200).json({
                success: true,
                message: "Login realizado com sucesso!",
                data: results[0]
            });
        } else {
            response.status(401).json({
                success: false,
                message: "Credenciais inválidas!"
            });
        }
    });
}

module.exports = {
    storeUsuario,
    loginUsuario
};
