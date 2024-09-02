const { Router } = require('express');

const router = Router();

// importa a função storeImagem do controlador de imagens
const { storeImagem } = require('../controller/imagemController');

// rota pra armazenar imagens
router.post('/store/imagem', storeImagem);

// exporta pra usar em outros arquivos
module.exports = router;
