const express = require('express');

const obtenerCursosPorUsuario = require('../controller/inscripcionController'); // Asegúrate de que la ruta sea correcta

const router = express.Router();
// Ruta para obtener los cursos por el userID
router.get('/cursos/:userId', obtenerCursosPorUsuario);

module.exports = router;
