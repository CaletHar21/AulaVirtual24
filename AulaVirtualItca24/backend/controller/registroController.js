const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser= async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Usuario ya existe' });
      }
  
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear nuevo usuario
      const newUser = new User({
        username,
        password: hashedPassword,
      });
  
      // Guardar en la base de datos
      await newUser.save();
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };
  module.exports = { registerUser };