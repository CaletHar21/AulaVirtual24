const express = require('express');
const { recuperarContrasena } = require('../controller/recuperarController');

const router = express.Router();

// Ruta para recuperar la contraseña
router.post('/recuperar', recuperarContrasena);

module.exports = router;
