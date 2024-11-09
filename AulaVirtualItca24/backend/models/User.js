const mongoose = require('mongoose');

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Asegura que no haya dos usuarios con el mismo nombre de usuario
  },
  password: {
    type: String,
    required: true, // La contraseña debe ser obligatoria
  },
  apellidos: {
    type: String,
    required: true, // El apellido del usuario
  },
  correo: {
    type: String,
    required: true,
    unique: true, // Correo único
  },
  nombres: {
    type: String,
    required: true, // El nombre del usuario
  },
  rol: {
    type: Number,
    required: true,
    default: 0, // Rol por defecto 0 (usuario normal), puedes asignar otro número si prefieres
  }, 
  telefono: {
    type: String,
    required: false, // El teléfono no es obligatorio (puedes hacerlo opcional si prefieres)
  },
  
});

module.exports = mongoose.model('User', userSchema);
