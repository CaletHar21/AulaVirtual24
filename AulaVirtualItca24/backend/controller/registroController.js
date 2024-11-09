const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async (req, res) => {
  // Desestructurar todos los campos necesarios desde req.body
  const { username, password, nombres, apellidos, correo, telefono, rol } = req.body;

  try {
    // Verificar si el usuario ya existe con el mismo nombre de usuario o correo
    const existingUser = await User.findOne({ $or: [{ username }, { correo }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario o correo ya existen' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario con todos los campos
    const newUser = new User({
      username,
      password: hashedPassword,
      nombres,
      apellidos,
      correo,
      telefono,
      rol: rol || 0, // Si no se pasa rol, por defecto será 0 (usuario normal)
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();
    
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { registerUser };
