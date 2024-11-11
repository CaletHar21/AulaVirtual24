const mongoose = require('mongoose');

// Definir el esquema para el Curso
const cursoSchema = new mongoose.Schema({
  nombreCurso: {
    type: String,
    required: true, // El nombre del curso es obligatorio
  },
  fechaInicio: {
    type: Date,
    required: true, // La fecha de inicio es obligatoria
  },
  fechaFin: {
    type: Date,
    required: true, // La fecha de fin es obligatoria
  },
  estatus: {
    type: String,
    default: '', // Puede estar vacío si no se especifica un estatus
  },
  abreviatura: {
    type: String,
    required: true, // La abreviatura es obligatoria
  },
  img: {
    type: String,
    default: '', // Puede estar vacío si no se especifica una imagen
  },
  cupoMaximo: {
    type: Number,
    required: true, // El cupo máximo es obligatorio
    min: 1, // Debe ser al menos 1
  },
});

// Crear el modelo basado en el esquema
module.exports = mongoose.model('Curso', cursoSchema);



