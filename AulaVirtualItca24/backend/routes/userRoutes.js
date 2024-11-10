// backend/routes/userRoutes.js
const express = require('express');
const { updateUserProfile } = require('../controller/userController');  // Importamos el controlador

const router = express.Router();

// Ruta para actualizar el perfil del usuario
router.put('/user/:id', updateUserProfile);  // Usamos el ID del usuario como parámetro en la URL

module.exports = router;
