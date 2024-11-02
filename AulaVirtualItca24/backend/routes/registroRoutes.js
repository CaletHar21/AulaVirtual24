const express = require('express');
const { registerUser} = require('../controller/registroController');

const router = express.Router();



// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

module.exports= router;