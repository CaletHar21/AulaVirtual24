// recuperarController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Controlador para verificar si el usuario existe
const verificarUsuario = async (req, res) => {
    const { username } = req.body;

    try {
        // Buscar el usuario por nombre de usuario
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si el usuario existe, devolver una respuesta positiva
        res.json({ message: 'Usuario encontrado. Ahora puedes cambiar la contraseña.' });

    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Controlador para cambiar la contraseña del usuario
const cambiarContrasena = async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        // Buscar el usuario por nombre de usuario
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword; // Actualizar la contraseña del usuario

        await user.save(); // Guardar los cambios en la base de datos
        res.json({ message: 'Contraseña actualizada con éxito' });

    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

module.exports = { verificarUsuario, cambiarContrasena };
