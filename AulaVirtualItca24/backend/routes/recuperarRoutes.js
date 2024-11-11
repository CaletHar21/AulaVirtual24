const express = require('express');
const { verificarUsuario, cambiarContrasena } = require('../controller/recuperarController');

const router = express.Router();

// Ruta para verificar si el usuario existe
router.post('/verificar-usuario', verificarUsuario);

// Ruta para cambiar la contraseña
router.post('/cambiar-contrasena', cambiarContrasena);

module.exports = router;
