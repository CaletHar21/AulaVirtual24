const express = require('express');
const {
  createCourse, 
  getAllCourses, 
  getCourseById, 
  updateCourse, 
  deleteCourse 
} = require('../controller/cursoController');  // Asegúrate de que la ruta al controlador es correcta

const router = express.Router();

// Ruta para crear un nuevo curso
router.post('/courses', createCourse);

// Ruta para obtener todos los cursos
router.get('/courses', getAllCourses);

// Ruta para obtener un curso por ID
router.get('/courses/:id', getCourseById);

// Ruta para actualizar un curso por ID
router.put('/courses/:id', updateCourse);

// Ruta para eliminar un curso por ID
router.delete('/courses/:id', deleteCourse);

module.exports = router;
