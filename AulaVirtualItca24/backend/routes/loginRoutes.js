const express = require('express');
const {loginUser} = require('../controller/loginController');

const router = express.Router();

router.post('/login', loginUser);

// Ruta para registrar un nuevo usuario


module.exports= router;