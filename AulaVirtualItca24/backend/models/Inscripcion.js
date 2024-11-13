const mongoose = require('mongoose');


// Definir el esquema para la colección
const cursoSchema = new Schema({
  cursoID: {
    type: String, // Usamos String porque parece ser un identificador en texto
    required: true, // Asegura que cursoID sea obligatorio
    default: '', // Valor por defecto en caso de que no se asigne
  },
  userID: {
    type: String, // También un identificador en texto
    required: true, // UserID también es obligatorio
    default: '', // Valor por defecto
  },
  cursoNombre: {
    type: String,
    required: true, // Es obligatorio tener un nombre de curso
    default: 'React Native', // Valor por defecto
  }
}, { timestamps: true }); // `timestamps: true` agrega automáticamente createdAt y updatedAt

// Crear el modelo a partir del esquema
module.exports = mongoose.model('Inscripcion', cursoSchema);


