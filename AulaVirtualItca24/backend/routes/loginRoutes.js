const express = require('express');
const { loginUser } = require('../controller/loginController');
const { registerUser } = require('../controller/registroController'); // Asegúrate de tener este controlador

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para registrar un nuevo usuario
router.post('/registro', registerUser); // Cambié la 'R' a minúscula para mantener la consistencia

module.exports = router;
