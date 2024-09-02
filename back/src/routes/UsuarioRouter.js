const { Router } = require('express');
const { storeUsuario, loginUsuario } = require('../controller/UsuarioController');

const router = Router();

router.post('/store/usuario', storeUsuario);
router.post('/login', loginUsuario);

module.exports = router;
